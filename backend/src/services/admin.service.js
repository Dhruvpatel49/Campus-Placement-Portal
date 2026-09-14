import { User } from '../models/user.model.js';
import { StudentProfile } from '../models/studentProfile.model.js';
import { RecruiterProfile } from '../models/recruiterProfile.model.js';
import { Company } from '../models/company.model.js';
import { Job } from '../models/job.model.js';
import { Application } from '../models/application.model.js';
import { ApiError } from '../utils/ApiError.js';
import { JOB_STATUS } from '../utils/constants.js';
import { createNotification } from './notification.service.js';

export const getAdminDashboardStats = async () => {
  const [
    totalUsers,
    studentsCount,
    recruitersCount,
    companiesCount,
    jobsCount,
    activeJobsCount,
    applicationsCount,
    pendingRecruitersCount,
    pendingCompaniesCount,
  ] = await Promise.all([
    User.countDocuments(),
    StudentProfile.countDocuments(),
    RecruiterProfile.countDocuments(),
    Company.countDocuments(),
    Job.countDocuments(),
    Job.countDocuments({ status: JOB_STATUS.ACTIVE }),
    Application.countDocuments(),
    RecruiterProfile.countDocuments({ adminVerificationStatus: 'pending' }),
    Company.countDocuments({ verificationStatus: 'pending' }),
  ]);

  return {
    totalUsers,
    studentsCount,
    recruitersCount,
    companiesCount,
    jobsCount,
    activeJobsCount,
    applicationsCount,
    pendingRecruitersCount,
    pendingCompaniesCount,
  };
};

export const getUsers = async (queryParams = {}) => {
  const { role, search, page = 1, limit = 15 } = queryParams;
  const filter = {};

  if (role && role !== 'all') {
    filter.role = role;
  }

  if (search) {
    filter.$or = [
      { firstName: { $regex: search, $options: 'i' } },
      { lastName: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
    ];
  }

  const skip = (Number(page) - 1) * Number(limit);
  const users = await User.find(filter)
    .select('-password')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(Number(limit));

  const total = await User.countDocuments(filter);

  return {
    users,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      pages: Math.ceil(total / Number(limit)),
    },
  };
};

export const getRecruiters = async (queryParams = {}) => {
  const { status, page = 1, limit = 15 } = queryParams;
  const filter = {};

  if (status && status !== 'all') {
    filter.adminVerificationStatus = status;
  }

  const skip = (Number(page) - 1) * Number(limit);
  const recruiters = await RecruiterProfile.find(filter)
    .populate('userId', 'firstName lastName email isVerified')
    .populate('companyId', 'name logo industry')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(Number(limit));

  const total = await RecruiterProfile.countDocuments(filter);

  return {
    recruiters,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      pages: Math.ceil(total / Number(limit)),
    },
  };
};

export const verifyRecruiter = async (recruiterId, status, remarks = '') => {
  if (!['verified', 'rejected', 'pending'].includes(status)) {
    throw ApiError.badRequest('Invalid verification status');
  }

  const recruiter = await RecruiterProfile.findById(recruiterId).populate('userId');
  if (!recruiter) {
    throw ApiError.notFound('Recruiter profile not found');
  }

  recruiter.adminVerificationStatus = status;
  recruiter.adminVerificationRemarks = remarks;
  await recruiter.save();

  // Send in-app notification to recruiter
  if (recruiter.userId) {
    await createNotification({
      recipientId: recruiter.userId._id,
      title: `Recruiter Verification ${status.toUpperCase()}`,
      message: `Your recruiter profile has been ${status} by the administrator. ${remarks ? 'Remarks: ' + remarks : ''}`,
      type: status === 'verified' ? 'success' : 'warning',
      link: '/recruiter/dashboard',
    });
  }

  return recruiter;
};

export const getCompanies = async (queryParams = {}) => {
  const { status, search, page = 1, limit = 15 } = queryParams;
  const filter = {};

  if (status && status !== 'all') {
    filter.verificationStatus = status;
  }

  if (search) {
    filter.name = { $regex: search, $options: 'i' };
  }

  const skip = (Number(page) - 1) * Number(limit);
  const companies = await Company.find(filter)
    .populate('recruiters', 'designation phone companyEmail')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(Number(limit));

  const total = await Company.countDocuments(filter);

  return {
    companies,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      pages: Math.ceil(total / Number(limit)),
    },
  };
};

export const verifyCompany = async (companyId, status, remarks = '') => {
  if (!['verified', 'rejected', 'pending'].includes(status)) {
    throw ApiError.badRequest('Invalid verification status');
  }

  const company = await Company.findById(companyId).populate({
    path: 'recruiters',
    populate: { path: 'userId' },
  });

  if (!company) {
    throw ApiError.notFound('Company record not found');
  }

  company.verificationStatus = status;
  company.isVerified = status === 'verified';
  company.verificationRemarks = remarks;
  await company.save();

  // Notify associated recruiters
  if (company.recruiters && company.recruiters.length > 0) {
    for (const rec of company.recruiters) {
      if (rec.userId) {
        await createNotification({
          recipientId: rec.userId._id,
          title: `Organization Verification ${status.toUpperCase()}`,
          message: `Company '${company.name}' verification has been updated to ${status}.`,
          type: status === 'verified' ? 'success' : 'warning',
          link: '/recruiter/company',
        });
      }
    }
  }

  return company;
};

export const getJobs = async (queryParams = {}) => {
  const { status, search, page = 1, limit = 15 } = queryParams;
  const filter = {};

  if (status && status !== 'all') {
    filter.status = status;
  }

  if (search) {
    filter.title = { $regex: search, $options: 'i' };
  }

  const skip = (Number(page) - 1) * Number(limit);
  const jobs = await Job.find(filter)
    .populate('companyId', 'name logo industry city')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(Number(limit));

  const total = await Job.countDocuments(filter);

  return {
    jobs,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      pages: Math.ceil(total / Number(limit)),
    },
  };
};

export const getApplications = async (queryParams = {}) => {
  const { status, page = 1, limit = 15 } = queryParams;
  const filter = {};

  if (status && status !== 'all') {
    filter.status = status;
  }

  const skip = (Number(page) - 1) * Number(limit);
  const applications = await Application.find(filter)
    .populate({
      path: 'studentId',
      select: 'rollNumber branch cgpa',
      populate: { path: 'userId', select: 'firstName lastName email' },
    })
    .populate('jobId', 'title location ctc')
    .populate('companyId', 'name logo')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(Number(limit));

  const total = await Application.countDocuments(filter);

  return {
    applications,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      pages: Math.ceil(total / Number(limit)),
    },
  };
};
