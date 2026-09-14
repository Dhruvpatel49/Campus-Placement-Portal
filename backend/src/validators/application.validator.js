import { ApiError } from '../utils/ApiError.js';
import { APPLICATION_STATUS } from '../utils/constants.js';

export const validateApplicationApply = (req, res, next) => {
  const { jobId } = req.body;
  const errors = [];

  if (!jobId || typeof jobId !== 'string' || !jobId.trim()) {
    errors.push('Job ID is required to submit an application');
  }

  if (errors.length > 0) {
    return next(ApiError.badRequest('Validation failed', errors));
  }

  next();
};

export const validateApplicationStatusUpdate = (req, res, next) => {
  const { status } = req.body;
  const errors = [];

  if (!status || !Object.values(APPLICATION_STATUS).includes(status)) {
    errors.push(`Invalid application status. Allowed values: ${Object.values(APPLICATION_STATUS).join(', ')}`);
  }

  if (errors.length > 0) {
    return next(ApiError.badRequest('Validation failed', errors));
  }

  next();
};
