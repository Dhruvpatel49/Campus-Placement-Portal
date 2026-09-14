import { StudentProfile } from '../models/studentProfile.model.js';
import { User } from '../models/user.model.js';
import { ApiError } from '../utils/ApiError.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../utils/cloudinary.js';

export const getStudentProfile = async (userId) => {
  let profile = await StudentProfile.findOne({ userId }).populate('userId', 'email firstName lastName role createdAt');

  // If student profile does not exist yet, auto-create default profile
  if (!profile) {
    const user = await User.findById(userId);
    if (!user) {
      throw ApiError.notFound('User record not found');
    }

    profile = await StudentProfile.create({
      userId,
      enrollmentNumber: `ENR${Math.floor(100000 + Math.random() * 900000)}`,
      branch: 'Computer Science',
      batch: new Date().getFullYear() + 1,
      cgpa: 8.0,
    });

    profile.calculateCompletion();
    await profile.save();
    profile = await StudentProfile.findById(profile._id).populate('userId', 'email firstName lastName role createdAt');
  }

  return profile;
};

export const updateStudentProfile = async (userId, updateData) => {
  const profile = await StudentProfile.findOne({ userId });
  if (!profile) {
    throw ApiError.notFound('Student profile not found');
  }

  // Prevent modifying restricted system fields
  delete updateData.userId;
  delete updateData.placementEligibility;
  delete updateData.resumeUrl;
  delete updateData.resumePublicId;

  Object.assign(profile, updateData);
  profile.calculateCompletion();
  await profile.save();

  return await StudentProfile.findById(profile._id).populate('userId', 'email firstName lastName role createdAt');
};

export const uploadStudentResume = async (userId, file) => {
  if (!file) {
    throw ApiError.badRequest('Resume file is required');
  }

  const profile = await StudentProfile.findOne({ userId });
  if (!profile) {
    throw ApiError.notFound('Student profile not found');
  }

  // Delete existing resume on Cloudinary if present
  if (profile.resumePublicId) {
    await deleteFromCloudinary(profile.resumePublicId, 'raw');
  }

  const result = await uploadToCloudinary(file.buffer, 'resumes', 'raw');

  profile.resumeUrl = result.secure_url;
  profile.resumePublicId = result.public_id;
  profile.resumeUploadedAt = new Date();
  profile.calculateCompletion();
  await profile.save();

  return profile;
};

export const deleteStudentResume = async (userId) => {
  const profile = await StudentProfile.findOne({ userId });
  if (!profile) {
    throw ApiError.notFound('Student profile not found');
  }

  if (profile.resumePublicId) {
    await deleteFromCloudinary(profile.resumePublicId, 'raw');
  }

  profile.resumeUrl = '';
  profile.resumePublicId = '';
  profile.resumeUploadedAt = null;
  profile.calculateCompletion();
  await profile.save();

  return profile;
};

export const getStudentDashboard = async (userId) => {
  const profile = await getStudentProfile(userId);

  return {
    profileCompletionPercentage: profile.profileCompletionPercentage,
    resumeUploaded: Boolean(profile.resumeUrl),
    resumeUrl: profile.resumeUrl,
    placementEligible: profile.placementEligibility,
    cgpa: profile.cgpa,
    backlogs: profile.backlogs,
    skillsCount: profile.skills ? profile.skills.length : 0,
    projectsCount: profile.projects ? profile.projects.length : 0,
    applicationStats: {
      applied: 0,
      shortlisted: 0,
      interviews: 0,
      offers: 0,
      rejected: 0,
    },
    quickActions: [
      { key: 'complete_profile', title: 'Complete Profile', done: profile.profileCompletionPercentage >= 80 },
      { key: 'upload_resume', title: 'Upload Resume', done: Boolean(profile.resumeUrl) },
      { key: 'add_skills', title: 'Add Technical Skills', done: Boolean(profile.skills && profile.skills.length > 0) },
      { key: 'add_projects', title: 'Add Projects', done: Boolean(profile.projects && profile.projects.length > 0) },
    ],
  };
};

export const updateStudentSettings = async (userId, settingsData) => {
  const { currentPassword, newPassword, profileVisibility } = settingsData;

  const user = await User.findById(userId).select('+password');
  if (!user) {
    throw ApiError.notFound('User not found');
  }

  if (currentPassword && newPassword) {
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      throw ApiError.unauthorized('Current password does not match');
    }
    user.password = newPassword;
    await user.save();
  }

  if (profileVisibility !== undefined) {
    const profile = await StudentProfile.findOne({ userId });
    if (profile) {
      profile.profileVisibility = profileVisibility;
      await profile.save();
    }
  }

  return { message: 'Settings updated successfully' };
};
