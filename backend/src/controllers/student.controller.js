import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { HTTP_STATUS } from '../utils/constants.js';
import * as studentService from '../services/student.service.js';

export const getProfile = asyncHandler(async (req, res) => {
  const profile = await studentService.getStudentProfile(req.user._id);
  return res
    .status(HTTP_STATUS.OK)
    .json(new ApiResponse(HTTP_STATUS.OK, profile, 'Student profile fetched successfully'));
});

export const updateProfile = asyncHandler(async (req, res) => {
  const profile = await studentService.updateStudentProfile(req.user._id, req.body);
  return res
    .status(HTTP_STATUS.OK)
    .json(new ApiResponse(HTTP_STATUS.OK, profile, 'Student profile updated successfully'));
});

export const getDashboard = asyncHandler(async (req, res) => {
  const dashboard = await studentService.getStudentDashboard(req.user._id);
  return res
    .status(HTTP_STATUS.OK)
    .json(new ApiResponse(HTTP_STATUS.OK, dashboard, 'Student dashboard metrics fetched successfully'));
});

export const uploadResume = asyncHandler(async (req, res) => {
  const profile = await studentService.uploadStudentResume(req.user._id, req.file);
  return res
    .status(HTTP_STATUS.OK)
    .json(new ApiResponse(HTTP_STATUS.OK, profile, 'Resume uploaded successfully'));
});

export const deleteResume = asyncHandler(async (req, res) => {
  const profile = await studentService.deleteStudentResume(req.user._id);
  return res
    .status(HTTP_STATUS.OK)
    .json(new ApiResponse(HTTP_STATUS.OK, profile, 'Resume deleted successfully'));
});

export const updateSettings = asyncHandler(async (req, res) => {
  const result = await studentService.updateStudentSettings(req.user._id, req.body);
  return res
    .status(HTTP_STATUS.OK)
    .json(new ApiResponse(HTTP_STATUS.OK, result, 'Settings updated successfully'));
});
