import mongoose from 'mongoose';

const recruiterProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
      index: true,
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      default: null,
      index: true,
    },
    designation: {
      type: String,
      required: [true, 'Designation is required'],
      trim: true,
    },
    department: {
      type: String,
      trim: true,
      default: 'Human Resources',
    },
    companyEmail: {
      type: String,
      trim: true,
      lowercase: true,
      default: '',
    },
    phone: {
      type: String,
      trim: true,
      default: '',
    },
    profilePhoto: {
      type: String,
      default: '',
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other', 'prefer_not_to_say', ''],
      default: '',
    },
    yearsOfExperience: {
      type: Number,
      default: 0,
      min: 0,
    },
    bio: {
      type: String,
      default: '',
      maxlength: 1000,
    },
    linkedin: {
      type: String,
      default: '',
    },
    portfolio: {
      type: String,
      default: '',
    },
    // Verification Managed by Admin
    verificationStatus: {
      type: String,
      enum: ['pending', 'verified', 'rejected'],
      default: 'pending',
      index: true,
    },
    verifiedByAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    verificationDate: {
      type: Date,
      default: null,
    },
    verificationRemarks: {
      type: String,
      default: '',
    },
    profileCompletionPercentage: {
      type: Number,
      default: 20,
      min: 0,
      max: 100,
    },
    accountActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Calculates profile completion percentage based on filled sections
 */
recruiterProfileSchema.methods.calculateCompletion = function () {
  let score = 0;
  const totalSections = 5;

  // 1. Designation & Department (20%)
  if (this.designation && this.department) score += 1;

  // 2. Contact & Company Email (20%)
  if (this.companyEmail || this.phone) score += 1;

  // 3. Bio & Experience (20%)
  if (this.bio || this.yearsOfExperience > 0) score += 1;

  // 4. Online Links (20%)
  if (this.linkedin || this.portfolio) score += 1;

  // 5. Verification Status (20%)
  if (this.verificationStatus === 'verified') score += 1;

  this.profileCompletionPercentage = Math.round((score / totalSections) * 100);
  return this.profileCompletionPercentage;
};

export const RecruiterProfile = mongoose.model('RecruiterProfile', recruiterProfileSchema);
