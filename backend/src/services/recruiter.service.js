import { RecruiterProfile } from '../models/recruiterProfile.model.js';
import { User } from '../models/user.model.js';
import { ApiError } from '../utils/ApiError.js';

export const getRecruiterProfile = async (userId) => {
  let profile = await RecruiterProfile.findOne({ userId }).populate('userId', 'email firstName lastName role createdAt');

  if (!profile) {
    const user = await User.findById(userId);
    if (!user) {
      throw ApiError.notFound('User record not found');
    }

    profile = await RecruiterProfile.create({
      userId,
      designation: 'HR Manager & Recruiter',
      department: 'Talent Acquisition',
      companyEmail: user.email,
    });

    profile.calculateCompletion();
    await profile.save();
    profile = await RecruiterProfile.findById(profile._id).populate('userId', 'email firstName lastName role createdAt');
  }

  return profile;
};

export const updateRecruiterProfile = async (userId, updateData) => {
  const profile = await RecruiterProfile.findOne({ userId });
  if (!profile) {
    throw ApiError.notFound('Recruiter profile not found');
  }

  // Prevent modifying restricted administrative & system fields
  delete updateData.userId;
  delete updateData.companyId;
  delete updateData.verificationStatus;
  delete updateData.verifiedByAdmin;
  delete updateData.verificationDate;
  delete updateData.verificationRemarks;

  Object.assign(profile, updateData);
  profile.calculateCompletion();
  await profile.save();

  return await RecruiterProfile.findById(profile._id).populate('userId', 'email firstName lastName role createdAt');
};

export const getRecruiterDashboard = async (userId) => {
  const profile = await getRecruiterProfile(userId);

  return {
    profileCompletionPercentage: profile.profileCompletionPercentage,
    verificationStatus: profile.verificationStatus,
    verificationRemarks: profile.verificationRemarks || 'Pending admin review',
    designation: profile.designation,
    department: profile.department,
    yearsOfExperience: profile.yearsOfExperience,
    quickActions: [
      { key: 'complete_profile', title: 'Complete Professional Profile', done: profile.profileCompletionPercentage >= 80 },
      { key: 'verify_status', title: 'Check Admin Verification Status', done: profile.verificationStatus === 'verified' },
      { key: 'update_contact', title: 'Update Company Contact Info', done: Boolean(profile.phone && profile.companyEmail) },
    ],
  };
};

export const updateRecruiterSettings = async (userId, settingsData) => {
  const { currentPassword, newPassword } = settingsData;

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

  return { message: 'Recruiter settings updated successfully' };
};
