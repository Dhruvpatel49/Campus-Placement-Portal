import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { HTTP_STATUS } from '../utils/constants.js';
import * as applicationService from '../services/application.service.js';

export const applyForJob = asyncHandler(async (req, res) => {
  const { jobId, coverLetter } = req.body;
  const application = await applicationService.applyForJob(req.user._id, jobId, coverLetter);
  return res
    .status(HTTP_STATUS.CREATED)
    .json(new ApiResponse(HTTP_STATUS.CREATED, application, 'Applied for job drive successfully'));
});

export const withdrawApplication = asyncHandler(async (req, res) => {
  const application = await applicationService.withdrawApplication(req.user._id, req.params.id);
  return res
    .status(HTTP_STATUS.OK)
    .json(new ApiResponse(HTTP_STATUS.OK, application, 'Application withdrawn successfully'));
});

export const getStudentApplications = asyncHandler(async (req, res) => {
  const result = await applicationService.getStudentApplications(req.user._id, req.query);
  return res
    .status(HTTP_STATUS.OK)
    .json(new ApiResponse(HTTP_STATUS.OK, result, 'Student applications fetched successfully'));
});

export const getRecruiterApplications = asyncHandler(async (req, res) => {
  const result = await applicationService.getRecruiterApplications(req.user._id, req.query);
  return res
    .status(HTTP_STATUS.OK)
    .json(new ApiResponse(HTTP_STATUS.OK, result, 'Recruiter applicant list fetched successfully'));
});

export const updateApplicationStatus = asyncHandler(async (req, res) => {
  const { status, recruiterNotes } = req.body;
  const application = await applicationService.updateApplicationStatus(
    req.user._id,
    req.params.id,
    status,
    recruiterNotes
  );
  return res
    .status(HTTP_STATUS.OK)
    .json(new ApiResponse(HTTP_STATUS.OK, application, 'Applicant status updated successfully'));
});

export const getApplicationDetails = asyncHandler(async (req, res) => {
  const application = await applicationService.getApplicationDetails(req.user._id, req.user.role, req.params.id);
  return res
    .status(HTTP_STATUS.OK)
    .json(new ApiResponse(HTTP_STATUS.OK, application, 'Application details fetched successfully'));
});
