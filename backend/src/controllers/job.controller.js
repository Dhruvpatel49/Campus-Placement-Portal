import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { HTTP_STATUS } from '../utils/constants.js';
import * as jobService from '../services/job.service.js';

export const createJob = asyncHandler(async (req, res) => {
  const job = await jobService.createJob(req.user._id, req.body);
  return res
    .status(HTTP_STATUS.CREATED)
    .json(new ApiResponse(HTTP_STATUS.CREATED, job, 'Job posting created successfully'));
});

export const updateJob = asyncHandler(async (req, res) => {
  const job = await jobService.updateJob(req.user._id, req.params.id, req.body);
  return res
    .status(HTTP_STATUS.OK)
    .json(new ApiResponse(HTTP_STATUS.OK, job, 'Job posting updated successfully'));
});

export const publishJob = asyncHandler(async (req, res) => {
  const job = await jobService.publishJob(req.user._id, req.params.id);
  return res
    .status(HTTP_STATUS.OK)
    .json(new ApiResponse(HTTP_STATUS.OK, job, 'Job published successfully'));
});

export const closeJob = asyncHandler(async (req, res) => {
  const job = await jobService.closeJob(req.user._id, req.params.id);
  return res
    .status(HTTP_STATUS.OK)
    .json(new ApiResponse(HTTP_STATUS.OK, job, 'Job closed successfully'));
});

export const deleteJob = asyncHandler(async (req, res) => {
  await jobService.deleteJob(req.user._id, req.params.id);
  return res
    .status(HTTP_STATUS.OK)
    .json(new ApiResponse(HTTP_STATUS.OK, null, 'Job posting deleted successfully'));
});

export const getRecruiterJobs = asyncHandler(async (req, res) => {
  const result = await jobService.getRecruiterJobs(req.user._id, req.query);
  return res
    .status(HTTP_STATUS.OK)
    .json(new ApiResponse(HTTP_STATUS.OK, result, 'Recruiter jobs fetched successfully'));
});

export const getStudentJobs = asyncHandler(async (req, res) => {
  const result = await jobService.getStudentJobs(req.user?._id, req.query);
  return res
    .status(HTTP_STATUS.OK)
    .json(new ApiResponse(HTTP_STATUS.OK, result, 'Jobs list fetched successfully'));
});

export const getJobById = asyncHandler(async (req, res) => {
  const job = await jobService.getJobById(req.params.id, req.user?._id, req.user?.role);
  return res
    .status(HTTP_STATUS.OK)
    .json(new ApiResponse(HTTP_STATUS.OK, job, 'Job details fetched successfully'));
});
