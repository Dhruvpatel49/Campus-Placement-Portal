import { ApiError } from '../utils/ApiError.js';

export const validateRecruiterProfileUpdate = (req, res, next) => {
  const { companyEmail, yearsOfExperience, linkedin, portfolio, designation } = req.body;
  const errors = [];

  if (designation !== undefined && (typeof designation !== 'string' || !designation.trim())) {
    errors.push('Designation cannot be empty');
  }

  if (yearsOfExperience !== undefined && (typeof yearsOfExperience !== 'number' || yearsOfExperience < 0)) {
    errors.push('Years of experience cannot be negative');
  }

  if (companyEmail && typeof companyEmail === 'string' && companyEmail.trim() !== '' && !companyEmail.includes('@')) {
    errors.push('Please enter a valid company email address');
  }

  const urlRegex = /^(https?:\/\/)?([\w.-]+)+[\w\-_~:/?#[\]@!$&'()*+,;=.]+$/;
  if (linkedin && typeof linkedin === 'string' && linkedin.trim() !== '' && !urlRegex.test(linkedin.trim())) {
    errors.push('Invalid LinkedIn URL format');
  }

  if (portfolio && typeof portfolio === 'string' && portfolio.trim() !== '' && !urlRegex.test(portfolio.trim())) {
    errors.push('Invalid portfolio URL format');
  }

  if (errors.length > 0) {
    return next(ApiError.badRequest('Validation failed', errors));
  }

  next();
};
