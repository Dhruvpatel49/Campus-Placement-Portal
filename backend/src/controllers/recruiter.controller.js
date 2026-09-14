import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { HTTP_STATUS } from '../utils/constants.js';
import * as recruiterService from '../services/recruiter.service.js';

export const getProfile = asyncHandler(async (req, res) => {
  const profile = await recruiterService.getRecruiterProfile(req.user._id);
  return res
    .status(HTTP_STATUS.OK)
    .json(new ApiResponse(HTTP_STATUS.OK, profile, 'Recruiter profile fetched successfully'));
});

export const updateProfile = asyncHandler(async (req, res) => {
  const profile = await recruiterService.updateRecruiterProfile(req.user._id, req.body);
  return res
    .status(HTTP_STATUS.OK)
    .json(new ApiResponse(HTTP_STATUS.OK, profile, 'Recruiter profile updated successfully'));
});

export const getDashboard = asyncHandler(async (req, res) => {
  const dashboard = await recruiterService.getRecruiterDashboard(req.user._id);
  return res
    .status(HTTP_STATUS.OK)
    .json(new ApiResponse(HTTP_STATUS.OK, dashboard, 'Recruiter dashboard metrics fetched successfully'));
});

export const updateSettings = asyncHandler(async (req, res) => {
  const result = await recruiterService.updateRecruiterSettings(req.user._id, req.body);
  return res
    .status(HTTP_STATUS.OK)
    .json(new ApiResponse(HTTP_STATUS.OK, result, 'Settings updated successfully'));
});
