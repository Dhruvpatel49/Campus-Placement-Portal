import { Company } from '../models/company.model.js';
import { RecruiterProfile } from '../models/recruiterProfile.model.js';
import { ApiError } from '../utils/ApiError.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../utils/cloudinary.js';

export const createCompany = async (userId, companyData) => {
  const recruiter = await RecruiterProfile.findOne({ userId });
  if (!recruiter) {
    throw ApiError.notFound('Recruiter profile not found');
  }

  if (recruiter.companyId) {
    const existingCompany = await Company.findById(recruiter.companyId);
    if (existingCompany) {
      throw ApiError.badRequest('Recruiter is already associated with a company');
    }
  }

  const existingCompanyByName = await Company.findOne({ name: companyData.name.trim() });
  if (existingCompanyByName) {
    throw ApiError.conflict('A company with this name already exists');
  }

  const company = await Company.create({
    ...companyData,
    recruiters: [recruiter._id],
  });

  recruiter.companyId = company._id;
  await recruiter.save();

  company.calculateCompletion();
  await company.save();

  return company;
};

export const getCompany = async (userId) => {
  const recruiter = await RecruiterProfile.findOne({ userId });
  if (!recruiter) {
    throw ApiError.notFound('Recruiter profile not found');
  }

  if (!recruiter.companyId) {
    // If no company linked, return null so frontend can show Create Company form
    return null;
  }

  const company = await Company.findById(recruiter.companyId).populate('recruiters', 'designation department phone companyEmail');
  return company;
};

export const updateCompany = async (userId, updateData) => {
  const recruiter = await RecruiterProfile.findOne({ userId });
  if (!recruiter || !recruiter.companyId) {
    throw ApiError.notFound('Associated company record not found for this recruiter');
  }

  const company = await Company.findById(recruiter.companyId);
  if (!company) {
    throw ApiError.notFound('Company not found');
  }

  // Prevent modifying restricted administrative fields
  delete updateData.isVerified;
  delete updateData.verificationStatus;
  delete updateData.verificationRemarks;
  delete updateData.recruiters;

  Object.assign(company, updateData);
  company.calculateCompletion();
  await company.save();

  return company;
};

export const uploadCompanyLogo = async (userId, file) => {
  if (!file) {
    throw ApiError.badRequest('Logo image file is required');
  }

  const recruiter = await RecruiterProfile.findOne({ userId });
  if (!recruiter || !recruiter.companyId) {
    throw ApiError.notFound('Associated company record not found');
  }

  const company = await Company.findById(recruiter.companyId);
  if (!company) {
    throw ApiError.notFound('Company not found');
  }

  if (company.logoPublicId) {
    await deleteFromCloudinary(company.logoPublicId, 'image');
  }

  const result = await uploadToCloudinary(file.buffer, 'company_logos', 'image');

  company.logo = result.secure_url;
  company.logoPublicId = result.public_id;
  company.calculateCompletion();
  await company.save();

  return company;
};

export const getCompanyDashboard = async (userId) => {
  const company = await getCompany(userId);

  if (!company) {
    return {
      hasCompany: false,
      message: 'No company associated yet. Please create a company profile.',
    };
  }

  return {
    hasCompany: true,
    companyName: company.name,
    logo: company.logo,
    industry: company.industry,
    companyType: company.companyType,
    profileCompletionPercentage: company.profileCompletionPercentage,
    verificationStatus: company.verificationStatus,
    recruiterCount: company.recruiters ? company.recruiters.length : 1,
    quickActions: [
      { key: 'complete_profile', title: 'Complete Company Details', done: company.profileCompletionPercentage >= 80 },
      { key: 'upload_logo', title: 'Upload Official Logo', done: Boolean(company.logo) },
      { key: 'add_website', title: 'Add Website & Socials', done: Boolean(company.website && company.linkedin) },
    ],
  };
};
