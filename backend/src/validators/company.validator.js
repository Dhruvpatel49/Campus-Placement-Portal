import { ApiError } from '../utils/ApiError.js';

export const validateCompanyCreate = (req, res, next) => {
  const { name, industry, description } = req.body;
  const errors = [];

  if (!name || typeof name !== 'string' || !name.trim()) {
    errors.push('Company name is required');
  }

  if (!industry || typeof industry !== 'string' || !industry.trim()) {
    errors.push('Industry type is required');
  }

  if (!description || typeof description !== 'string' || !description.trim()) {
    errors.push('Company description is required');
  }

  if (errors.length > 0) {
    return next(ApiError.badRequest('Validation failed', errors));
  }

  next();
};

export const validateCompanyUpdate = (req, res, next) => {
  const { name, industry, website, officialEmail, linkedin, twitter, facebook, instagram } = req.body;
  const errors = [];

  if (name !== undefined && (typeof name !== 'string' || !name.trim())) {
    errors.push('Company name cannot be empty');
  }

  if (industry !== undefined && (typeof industry !== 'string' || !industry.trim())) {
    errors.push('Industry type cannot be empty');
  }

  if (officialEmail && typeof officialEmail === 'string' && officialEmail.trim() !== '' && !officialEmail.includes('@')) {
    errors.push('Please enter a valid official email address');
  }

  const urlRegex = /^(https?:\/\/)?([\w.-]+)+[\w\-_~:/?#[\]@!$&'()*+,;=.]+$/;
  const validateUrl = (url, name) => {
    if (url && typeof url === 'string' && url.trim() !== '' && !urlRegex.test(url.trim())) {
      errors.push(`Invalid URL format for ${name}`);
    }
  };

  validateUrl(website, 'Website');
  validateUrl(linkedin, 'LinkedIn');
  validateUrl(twitter, 'Twitter');
  validateUrl(facebook, 'Facebook');
  validateUrl(instagram, 'Instagram');

  if (errors.length > 0) {
    return next(ApiError.badRequest('Validation failed', errors));
  }

  next();
};
