import { User } from '../models/user.model.js';
import { RefreshToken } from '../models/refreshToken.model.js';
import { StudentProfile } from '../models/studentProfile.model.js';
import { RecruiterProfile } from '../models/recruiterProfile.model.js';
import { ApiError } from '../utils/ApiError.js';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/jwt.js';
import { USER_ROLES } from '../utils/constants.js';

export const registerUser = async (userData) => {
  const { email, password, firstName, lastName, role, enrollmentNumber, branch, batch, cgpa, companyId, designation } = userData;

  // Check if user already exists
  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    throw ApiError.conflict('User with this email already exists');
  }

  // Create user
  const user = await User.create({
    email,
    password,
    firstName,
    lastName,
    role: role || USER_ROLES.STUDENT,
  });

  // Automatically seed profile if student or recruiter fields provided
  if (user.role === USER_ROLES.STUDENT && enrollmentNumber) {
    await StudentProfile.create({
      userId: user._id,
      enrollmentNumber,
      branch: branch || 'Computer Science',
      batch: batch || new Date().getFullYear() + 1,
      cgpa: cgpa || 8.0,
    });
  } else if (user.role === USER_ROLES.RECRUITER && companyId) {
    await RecruiterProfile.create({
      userId: user._id,
      companyId,
      designation: designation || 'HR Manager',
    });
  }

  // Generate tokens
  const payload = { id: user._id, email: user.email, role: user.role };
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  // Store refresh token
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  await RefreshToken.create({
    userId: user._id,
    token: refreshToken,
    expiresAt,
  });

  // Return clean user object without password
  const userJson = user.toObject();
  delete userJson.password;

  return { user: userJson, accessToken, refreshToken };
};

export const loginUser = async (email, password) => {
  const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
  if (!user) {
    throw ApiError.unauthorized('Invalid email or password');
  }

  if (!user.isActive) {
    throw ApiError.forbidden('Your account has been deactivated');
  }

  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    throw ApiError.unauthorized('Invalid email or password');
  }

  // Generate tokens
  const payload = { id: user._id, email: user.email, role: user.role };
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  // Store refresh token
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  await RefreshToken.create({
    userId: user._id,
    token: refreshToken,
    expiresAt,
  });

  const userJson = user.toObject();
  delete userJson.password;

  return { user: userJson, accessToken, refreshToken };
};

export const refreshAccessToken = async (token) => {
  if (!token) {
    throw ApiError.unauthorized('Refresh token is required');
  }

  const decoded = verifyRefreshToken(token);

  const storedToken = await RefreshToken.findOne({ token, isRevoked: false });
  if (!storedToken) {
    throw ApiError.unauthorized('Invalid or revoked refresh token');
  }

  const user = await User.findById(decoded.id);
  if (!user || !user.isActive) {
    throw ApiError.unauthorized('User associated with token is invalid or inactive');
  }

  const payload = { id: user._id, email: user.email, role: user.role };
  const newAccessToken = generateAccessToken(payload);
  const newRefreshToken = generateRefreshToken(payload);

  // Revoke old token and save new token (Token Rotation)
  storedToken.isRevoked = true;
  await storedToken.save();

  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  await RefreshToken.create({
    userId: user._id,
    token: newRefreshToken,
    expiresAt,
  });

  return { accessToken: newAccessToken, refreshToken: newRefreshToken };
};

export const logoutUser = async (token) => {
  if (token) {
    await RefreshToken.updateOne({ token }, { isRevoked: true });
  }
  return true;
};
