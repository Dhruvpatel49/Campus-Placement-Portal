import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { verifyAccessToken } from '../utils/jwt.js';
import { User } from '../models/user.model.js';

/**
 * Middleware to authenticate requests via JWT access token (Bearer or Cookie)
 */
export const authenticate = asyncHandler(async (req, res, next) => {
  let token;

  // Check Authorization header
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  } else if (req.cookies && req.cookies.accessToken) {
    token = req.cookies.accessToken;
  }

  if (!token) {
    throw ApiError.unauthorized('Authentication token is required');
  }

  // Verify token
  const decoded = verifyAccessToken(token);

  // Load user from database
  const user = await User.findById(decoded.id).select('-password');

  if (!user) {
    throw ApiError.unauthorized('User account no longer exists');
  }

  if (!user.isActive) {
    throw ApiError.forbidden('User account has been deactivated');
  }

  // Attach user to request object
  req.user = user;
  next();
});

/**
 * Middleware for Role-Based Access Control (RBAC)
 * @param  {...string} allowedRoles - List of allowed roles (e.g. 'student', 'recruiter', 'admin')
 */
export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(ApiError.unauthorized('Authentication required'));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(ApiError.forbidden(`Role '${req.user.role}' is not authorized to access this resource`));
    }

    next();
  };
};
