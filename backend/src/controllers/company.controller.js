import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { HTTP_STATUS } from '../utils/constants.js';
import * as companyService from '../services/company.service.js';

export const createCompany = asyncHandler(async (req, res) => {
  const company = await companyService.createCompany(req.user._id, req.body);
  return res
    .status(HTTP_STATUS.CREATED)
    .json(new ApiResponse(HTTP_STATUS.CREATED, company, 'Company profile created successfully'));
});

export const getCompany = asyncHandler(async (req, res) => {
  const company = await companyService.getCompany(req.user._id);
  return res
    .status(HTTP_STATUS.OK)
    .json(new ApiResponse(HTTP_STATUS.OK, company, 'Company details fetched successfully'));
});

export const updateCompany = asyncHandler(async (req, res) => {
  const company = await companyService.updateCompany(req.user._id, req.body);
  return res
    .status(HTTP_STATUS.OK)
    .json(new ApiResponse(HTTP_STATUS.OK, company, 'Company profile updated successfully'));
});

export const uploadLogo = asyncHandler(async (req, res) => {
  const company = await companyService.uploadCompanyLogo(req.user._id, req.file);
  return res
    .status(HTTP_STATUS.OK)
    .json(new ApiResponse(HTTP_STATUS.OK, company, 'Company logo uploaded successfully'));
});

export const getDashboard = asyncHandler(async (req, res) => {
  const dashboard = await companyService.getCompanyDashboard(req.user._id);
  return res
    .status(HTTP_STATUS.OK)
    .json(new ApiResponse(HTTP_STATUS.OK, dashboard, 'Company dashboard metrics fetched successfully'));
});
