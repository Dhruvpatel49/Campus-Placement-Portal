import { Job } from '../models/job.model.js';
import { RecruiterProfile } from '../models/recruiterProfile.model.js';
import { StudentProfile } from '../models/studentProfile.model.js';
import { Company } from '../models/company.model.js';
import { ApiError } from '../utils/ApiError.js';
import { JOB_STATUS } from '../utils/constants.js';

/**
 * Generate unique slug from title & company name
 */
const generateSlug = (title, companyName) => {
  const base = `${title}-${companyName}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return `${base}-${Date.now().toString().slice(-4)}`;
};

export const createJob = async (userId, jobData) => {
  const recruiter = await RecruiterProfile.findOne({ userId });
  if (!recruiter || !recruiter.companyId) {
    throw ApiError.badRequest('Recruiter must be associated with a valid company before creating jobs');
  }

  const company = await Company.findById(recruiter.companyId);
  if (!company) {
    throw ApiError.notFound('Company not found');
  }

  const slug = generateSlug(jobData.title, company.name);

  const job = await Job.create({
    ...jobData,
    companyId: company._id,
    recruiterId: userId,
    slug,
    status: jobData.status || JOB_STATUS.DRAFT,
    publishedAt: jobData.status === JOB_STATUS.ACTIVE ? new Date() : null,
  });

  return await Job.findById(job._id).populate('companyId', 'name logo industry website city');
};

export const updateJob = async (userId, jobId, updateData) => {
  const recruiter = await RecruiterProfile.findOne({ userId });
  if (!recruiter || !recruiter.companyId) {
    throw ApiError.forbidden('Recruiter not associated with a company');
  }

  const job = await Job.findById(jobId);
  if (!job) {
    throw ApiError.notFound('Job posting not found');
  }

  if (job.companyId.toString() !== recruiter.companyId.toString()) {
    throw ApiError.forbidden('You can only update job postings created by your company');
  }

  delete updateData.companyId;
  delete updateData.recruiterId;
  delete updateData.slug;

  Object.assign(job, updateData);
  await job.save();

  return await Job.findById(job._id).populate('companyId', 'name logo industry website city');
};

export const publishJob = async (userId, jobId) => {
  const recruiter = await RecruiterProfile.findOne({ userId });
  if (!recruiter || !recruiter.companyId) {
    throw ApiError.forbidden('Recruiter not associated with a company');
  }

  const job = await Job.findById(jobId);
  if (!job) {
    throw ApiError.notFound('Job posting not found');
  }

  if (job.companyId.toString() !== recruiter.companyId.toString()) {
    throw ApiError.forbidden('You do not own this job posting');
  }

  if (new Date(job.deadline) < new Date()) {
    throw ApiError.badRequest('Cannot publish job with a past application deadline');
  }

  job.status = JOB_STATUS.ACTIVE;
  job.publishedAt = new Date();
  await job.save();

  return job;
};

export const closeJob = async (userId, jobId) => {
  const recruiter = await RecruiterProfile.findOne({ userId });
  if (!recruiter || !recruiter.companyId) {
    throw ApiError.forbidden('Recruiter not associated with a company');
  }

  const job = await Job.findById(jobId);
  if (!job) {
    throw ApiError.notFound('Job posting not found');
  }

  if (job.companyId.toString() !== recruiter.companyId.toString()) {
    throw ApiError.forbidden('You do not own this job posting');
  }

  job.status = JOB_STATUS.CLOSED;
  await job.save();

  return job;
};

export const deleteJob = async (userId, jobId) => {
  const recruiter = await RecruiterProfile.findOne({ userId });
  if (!recruiter || !recruiter.companyId) {
    throw ApiError.forbidden('Recruiter not associated with a company');
  }

  const job = await Job.findById(jobId);
  if (!job) {
    throw ApiError.notFound('Job posting not found');
  }

  if (job.companyId.toString() !== recruiter.companyId.toString()) {
    throw ApiError.forbidden('You do not own this job posting');
  }

  await Job.deleteOne({ _id: jobId });
  return true;
};

export const getRecruiterJobs = async (userId, queryParams = {}) => {
  const recruiter = await RecruiterProfile.findOne({ userId });
  if (!recruiter || !recruiter.companyId) {
    throw ApiError.badRequest('Recruiter not associated with a company');
  }

  const { search, status, page = 1, limit = 10 } = queryParams;
  const filter = { companyId: recruiter.companyId };

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

export const getStudentJobs = async (userId, queryParams = {}) => {
  const { search, location, jobType, workMode, minCtc, branch, page = 1, limit = 10 } = queryParams;

  const filter = { status: JOB_STATUS.ACTIVE };

  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ];
  }

  if (location) filter.location = { $regex: location, $options: 'i' };
  if (jobType) filter.jobType = jobType;
  if (workMode) filter.workMode = workMode;
  if (minCtc) filter.ctc = { $gte: Number(minCtc) };
  if (branch) filter.allowedBranches = branch;

  const skip = (Number(page) - 1) * Number(limit);
  const jobs = await Job.find(filter)
    .populate('companyId', 'name logo industry website city')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(Number(limit));

  const total = await Job.countDocuments(filter);

  // Evaluate eligibility for student if userId is provided
  let studentProfile = null;
  if (userId) {
    studentProfile = await StudentProfile.findOne({ userId });
  }

  const enrichedJobs = jobs.map((jobDoc) => {
    const job = jobDoc.toObject();
    let isEligible = true;
    let ineligibilityReason = '';

    if (studentProfile) {
      if (studentProfile.cgpa < job.minCgpa) {
        isEligible = false;
        ineligibilityReason = `Minimum required CGPA is ${job.minCgpa} (Your CGPA: ${studentProfile.cgpa})`;
      } else if (studentProfile.backlogs > job.maxBacklogs) {
        isEligible = false;
        ineligibilityReason = `Maximum backlogs allowed is ${job.maxBacklogs} (Your backlogs: ${studentProfile.backlogs})`;
      } else if (
        job.allowedBranches &&
        job.allowedBranches.length > 0 &&
        !job.allowedBranches.includes(studentProfile.branch)
      ) {
        isEligible = false;
        ineligibilityReason = `Allowed branches: ${job.allowedBranches.join(', ')}`;
      }
    }

    return {
      ...job,
      isEligible,
      ineligibilityReason,
    };
  });

  return {
    jobs: enrichedJobs,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      pages: Math.ceil(total / Number(limit)),
    },
  };
};

export const getJobById = async (jobId, userId, role) => {
  const job = await Job.findById(jobId).populate('companyId', 'name logo industry website description city state');
  if (!job) {
    throw ApiError.notFound('Job posting not found');
  }

  const jobObject = job.toObject();

  if (role === 'student' && userId) {
    const studentProfile = await StudentProfile.findOne({ userId });
    let isEligible = true;
    let ineligibilityReason = '';

    if (studentProfile) {
      if (studentProfile.cgpa < job.minCgpa) {
        isEligible = false;
        ineligibilityReason = `Minimum required CGPA is ${job.minCgpa} (Your CGPA: ${studentProfile.cgpa})`;
      } else if (studentProfile.backlogs > job.maxBacklogs) {
        isEligible = false;
        ineligibilityReason = `Maximum backlogs allowed is ${job.maxBacklogs}`;
      } else if (
        job.allowedBranches &&
        job.allowedBranches.length > 0 &&
        !job.allowedBranches.includes(studentProfile.branch)
      ) {
        isEligible = false;
        ineligibilityReason = `Allowed branches: ${job.allowedBranches.join(', ')}`;
      }
    }

    jobObject.isEligible = isEligible;
    jobObject.ineligibilityReason = ineligibilityReason;
  }

  return jobObject;
};
