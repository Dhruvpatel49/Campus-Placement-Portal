import { ApiError } from '../utils/ApiError.js';

export const validateJobCreate = (req, res, next) => {
  const { title, description, location, ctc, deadline, minCgpa } = req.body;
  const errors = [];

  if (!title || typeof title !== 'string' || !title.trim()) {
    errors.push('Job title is required');
  }

  if (!description || typeof description !== 'string' || !description.trim()) {
    errors.push('Job description is required');
  }

  if (!location || typeof location !== 'string' || !location.trim()) {
    errors.push('Job location is required');
  }

  if (ctc === undefined || typeof ctc !== 'number' || ctc < 0) {
    errors.push('Valid positive CTC / Salary amount is required');
  }

  if (!deadline || isNaN(Date.parse(deadline))) {
    errors.push('Valid application deadline date is required');
  } else if (new Date(deadline) < new Date()) {
    errors.push('Application deadline must be a future date');
  }

  if (minCgpa !== undefined && (typeof minCgpa !== 'number' || minCgpa < 0 || minCgpa > 10)) {
    errors.push('Minimum CGPA must be between 0 and 10');
  }

  if (errors.length > 0) {
    return next(ApiError.badRequest('Validation failed', errors));
  }

  next();
};

export const validateJobUpdate = (req, res, next) => {
  const { ctc, deadline, minCgpa } = req.body;
  const errors = [];

  if (ctc !== undefined && (typeof ctc !== 'number' || ctc < 0)) {
    errors.push('CTC amount must be a positive number');
  }

  if (deadline && isNaN(Date.parse(deadline))) {
    errors.push('Invalid application deadline date format');
  }

  if (minCgpa !== undefined && (typeof minCgpa !== 'number' || minCgpa < 0 || minCgpa > 10)) {
    errors.push('Minimum CGPA must be between 0 and 10');
  }

  if (errors.length > 0) {
    return next(ApiError.badRequest('Validation failed', errors));
  }

  next();
};
