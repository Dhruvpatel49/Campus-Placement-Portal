import mongoose from 'mongoose';

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Company name is required'],
      unique: true,
      trim: true,
      index: true,
    },
    logo: {
      type: String,
      default: '',
    },
    logoPublicId: {
      type: String,
      default: '',
    },
    industry: {
      type: String,
      required: [true, 'Industry type is required'],
      trim: true,
      index: true,
    },
    companyType: {
      type: String,
      default: 'Product',
      trim: true,
    },
    website: {
      type: String,
      trim: true,
      default: '',
    },
    description: {
      type: String,
      required: [true, 'Company description is required'],
    },
    foundedYear: {
      type: Number,
      default: new Date().getFullYear(),
    },

    // Contact Information
    officialEmail: {
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
    address: {
      type: String,
      default: '',
    },
    city: {
      type: String,
      default: '',
    },
    state: {
      type: String,
      default: '',
    },
    country: {
      type: String,
      default: 'India',
    },
    postalCode: {
      type: String,
      default: '',
    },

    // Social Links
    linkedin: { type: String, default: '' },
    twitter: { type: String, default: '' },
    facebook: { type: String, default: '' },
    instagram: { type: String, default: '' },

    // Status & Verification Managed by Admin
    isVerified: {
      type: Boolean,
      default: false,
      index: true,
    },
    verificationStatus: {
      type: String,
      enum: ['pending', 'verified', 'rejected'],
      default: 'pending',
      index: true,
    },
    verificationRemarks: {
      type: String,
      default: '',
    },
    companyActive: {
      type: Boolean,
      default: true,
    },
    profileCompletionPercentage: {
      type: Number,
      default: 20,
      min: 0,
      max: 100,
    },

    // Relationships
    recruiters: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RecruiterProfile',
      },
    ],
  },
  {
    timestamps: true,
  }
);

/**
 * Calculates company completion percentage based on filled sections
 */
companySchema.methods.calculateCompletion = function () {
  let score = 0;
  const totalSections = 5;

  // 1. Basic Info (20%)
  if (this.name && this.industry && this.description) score += 1;

  // 2. Contact Info (20%)
  if (this.officialEmail || this.phone || this.city) score += 1;

  // 3. Logo (20%)
  if (this.logo) score += 1;

  // 4. Website & Socials (20%)
  if (this.website || this.linkedin) score += 1;

  // 5. Verification Status (20%)
  if (this.verificationStatus === 'verified') score += 1;

  this.profileCompletionPercentage = Math.round((score / totalSections) * 100);
  return this.profileCompletionPercentage;
};

export const Company = mongoose.model('Company', companySchema);
