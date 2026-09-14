import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { HTTP_STATUS } from '../utils/constants.js';
import * as adminService from '../services/admin.service.js';

export const getDashboard = asyncHandler(async (req, res) => {
  const stats = await adminService.getAdminDashboardStats();
  return res.status(HTTP_STATUS.OK).json(new ApiResponse(HTTP_STATUS.OK, stats, 'Admin stats retrieved successfully'));
});

export const getUsers = asyncHandler(async (req, res) => {
  const result = await adminService.getUsers(req.query);
  return res.status(HTTP_STATUS.OK).json(new ApiResponse(HTTP_STATUS.OK, result, 'Users fetched successfully'));
});

export const getRecruiters = asyncHandler(async (req, res) => {
  const result = await adminService.getRecruiters(req.query);
  return res.status(HTTP_STATUS.OK).json(new ApiResponse(HTTP_STATUS.OK, result, 'Recruiters list fetched successfully'));
});

export const verifyRecruiter = asyncHandler(async (req, res) => {
  const { status, remarks } = req.body;
  const profile = await adminService.verifyRecruiter(req.params.id, status, remarks);
  return res.status(HTTP_STATUS.OK).json(new ApiResponse(HTTP_STATUS.OK, profile, `Recruiter status set to ${status}`));
});

export const getCompanies = asyncHandler(async (req, res) => {
  const result = await adminService.getCompanies(req.query);
  return res.status(HTTP_STATUS.OK).json(new ApiResponse(HTTP_STATUS.OK, result, 'Companies list fetched successfully'));
});

export const verifyCompany = asyncHandler(async (req, res) => {
  const { status, remarks } = req.body;
  const company = await adminService.verifyCompany(req.params.id, status, remarks);
  return res.status(HTTP_STATUS.OK).json(new ApiResponse(HTTP_STATUS.OK, company, `Company verification status set to ${status}`));
});

export const getJobs = asyncHandler(async (req, res) => {
  const result = await adminService.getJobs(req.query);
  return res.status(HTTP_STATUS.OK).json(new ApiResponse(HTTP_STATUS.OK, result, 'Jobs list fetched successfully'));
});

export const getApplications = asyncHandler(async (req, res) => {
  const result = await adminService.getApplications(req.query);
  return res.status(HTTP_STATUS.OK).json(new ApiResponse(HTTP_STATUS.OK, result, 'Applications list fetched successfully'));
});
