import { Application } from '../models/application.model.js';
import { StudentProfile } from '../models/studentProfile.model.js';
import { RecruiterProfile } from '../models/recruiterProfile.model.js';
import { Job } from '../models/job.model.js';
import { ApiError } from '../utils/ApiError.js';
import { APPLICATION_STATUS, JOB_STATUS } from '../utils/constants.js';

export const applyForJob = async (userId, jobId, coverLetter = '') => {
  const student = await StudentProfile.findOne({ userId });
  if (!student) {
    throw ApiError.notFound('Student profile not found. Please complete your profile before applying.');
  }

  const resumeUrl = student.resume?.url || student.resumeUrl || '';
  if (!resumeUrl) {
    throw ApiError.badRequest('Resume required. Please upload your resume in the Resume section before applying.');
  }

  const job = await Job.findById(jobId);
  if (!job) {
    throw ApiError.notFound('Job posting not found');
  }

  if (job.status !== JOB_STATUS.ACTIVE) {
    throw ApiError.badRequest('This job drive is not accepting new applications');
  }

  if (new Date(job.deadline) < new Date()) {
    throw ApiError.badRequest('The application deadline for this job drive has passed');
  }

  // Enforce Backend Eligibility Criteria
  if (student.cgpa < job.minCgpa) {
    throw ApiError.badRequest(`Ineligible: Minimum CGPA required is ${job.minCgpa} (Your CGPA: ${student.cgpa})`);
  }

  if (student.backlogs > job.maxBacklogs) {
    throw ApiError.badRequest(`Ineligible: Maximum backlogs allowed is ${job.maxBacklogs} (Your backlogs: ${student.backlogs})`);
  }

  if (job.allowedBranches && job.allowedBranches.length > 0 && !job.allowedBranches.includes(student.branch)) {
    throw ApiError.badRequest(`Ineligible: Job is only open to branches: ${job.allowedBranches.join(', ')}`);
  }

  // Prevent Duplicate Applications
  const existingApplication = await Application.findOne({
    studentId: student._id,
    jobId: job._id,
  });

  if (existingApplication) {
    throw ApiError.conflict('You have already applied for this placement drive');
  }

  const application = await Application.create({
    studentId: student._id,
    jobId: job._id,
    companyId: job.companyId,
    recruiterId: job.recruiterId,
    resumeUrl,
    resumePublicId: student.resume?.publicId || '',
    coverLetter,
    status: APPLICATION_STATUS.APPLIED,
    timeline: [
      {
        status: APPLICATION_STATUS.APPLIED,
        note: 'Application submitted successfully',
        updatedAt: new Date(),
      },
    ],
  });

  return await Application.findById(application._id)
    .populate({
      path: 'jobId',
      select: 'title location ctc jobType',
      populate: { path: 'companyId', select: 'name logo industry' },
    });
};

export const withdrawApplication = async (userId, applicationId) => {
  const student = await StudentProfile.findOne({ userId });
  if (!student) {
    throw ApiError.notFound('Student profile not found');
  }

  const application = await Application.findById(applicationId);
  if (!application) {
    throw ApiError.notFound('Application record not found');
  }

  if (application.studentId.toString() !== student._id.toString()) {
    throw ApiError.forbidden('You do not own this application record');
  }

  const lockedStatuses = [APPLICATION_STATUS.SELECTED, APPLICATION_STATUS.OFFERED, APPLICATION_STATUS.REJECTED, APPLICATION_STATUS.WITHDRAWN];
  if (lockedStatuses.includes(application.status)) {
    throw ApiError.badRequest(`Cannot withdraw application in '${application.status}' status`);
  }

  application.status = APPLICATION_STATUS.WITHDRAWN;
  application.timeline.push({
    status: APPLICATION_STATUS.WITHDRAWN,
    note: 'Application withdrawn by student',
    updatedAt: new Date(),
  });

  await application.save();
  return application;
};

export const getStudentApplications = async (userId, queryParams = {}) => {
  const student = await StudentProfile.findOne({ userId });
  if (!student) {
    throw ApiError.notFound('Student profile not found');
  }

  const { status, page = 1, limit = 10 } = queryParams;
  const filter = { studentId: student._id };

  if (status && status !== 'all') {
    filter.status = status;
  }

  const skip = (Number(page) - 1) * Number(limit);
  const applications = await Application.find(filter)
    .populate({
      path: 'jobId',
      select: 'title location ctc jobType deadline status',
      populate: { path: 'companyId', select: 'name logo industry city' },
    })
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

export const getRecruiterApplications = async (userId, queryParams = {}) => {
  const recruiter = await RecruiterProfile.findOne({ userId });
  if (!recruiter || !recruiter.companyId) {
    throw ApiError.badRequest('Recruiter not associated with a company');
  }

  const { jobId, status, search, page = 1, limit = 10 } = queryParams;
  const filter = { companyId: recruiter.companyId };

  if (jobId) filter.jobId = jobId;
  if (status && status !== 'all') filter.status = status;

  const skip = (Number(page) - 1) * Number(limit);

  let applications = await Application.find(filter)
    .populate({
      path: 'studentId',
      select: 'rollNumber branch cgpa backlogs phone resumeUrl',
      populate: { path: 'userId', select: 'firstName lastName email' },
    })
    .populate('jobId', 'title location ctc jobType')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(Number(limit));

  if (search) {
    const searchLower = search.toLowerCase();
    applications = applications.filter((app) => {
      const studentUser = app.studentId?.userId;
      const fullName = studentUser ? `${studentUser.firstName} ${studentUser.lastName}`.toLowerCase() : '';
      const rollNumber = app.studentId?.rollNumber?.toLowerCase() || '';
      return fullName.includes(searchLower) || rollNumber.includes(searchLower);
    });
  }

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

export const updateApplicationStatus = async (userId, applicationId, status, recruiterNotes = '') => {
  const recruiter = await RecruiterProfile.findOne({ userId });
  if (!recruiter || !recruiter.companyId) {
    throw ApiError.forbidden('Recruiter not associated with a company');
  }

  const application = await Application.findById(applicationId);
  if (!application) {
    throw ApiError.notFound('Application record not found');
  }

  if (application.companyId.toString() !== recruiter.companyId.toString()) {
    throw ApiError.forbidden('You can only update applications for your own company jobs');
  }

  application.status = status;
  if (recruiterNotes) {
    application.recruiterNotes = recruiterNotes;
  }

  application.timeline.push({
    status,
    note: recruiterNotes || `Status updated to ${status.replace('_', ' ').toUpperCase()}`,
    updatedAt: new Date(),
  });

  await application.save();

  return await Application.findById(application._id)
    .populate({
      path: 'studentId',
      populate: { path: 'userId', select: 'firstName lastName email' },
    })
    .populate('jobId', 'title location ctc');
};

export const getApplicationDetails = async (userId, role, applicationId) => {
  const application = await Application.findById(applicationId)
    .populate({
      path: 'studentId',
      select: 'rollNumber branch cgpa backlogs phone resumeUrl',
      populate: { path: 'userId', select: 'firstName lastName email' },
    })
    .populate({
      path: 'jobId',
      populate: { path: 'companyId', select: 'name logo industry city' },
    });

  if (!application) {
    throw ApiError.notFound('Application record not found');
  }

  if (role === 'student') {
    const student = await StudentProfile.findOne({ userId });
    if (!student || application.studentId._id.toString() !== student._id.toString()) {
      throw ApiError.forbidden('You do not have permission to view this application');
    }
  } else if (role === 'recruiter') {
    const recruiter = await RecruiterProfile.findOne({ userId });
    if (!recruiter || application.companyId.toString() !== recruiter.companyId.toString()) {
      throw ApiError.forbidden('You do not have permission to view this application');
    }
  }

  return application;
};
