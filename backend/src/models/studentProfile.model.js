import mongoose from 'mongoose';

const educationSchema = new mongoose.Schema({
  degree: { type: String, required: true },
  fieldOfStudy: { type: String, required: true },
  institution: { type: String, required: true },
  startYear: { type: Number, required: true },
  endYear: { type: Number, required: true },
  percentageOrCgpa: { type: Number, required: true },
});

const experienceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, default: '' },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  isCurrent: { type: Boolean, default: false },
  description: { type: String, default: '' },
});

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  technologies: [{ type: String }],
  githubUrl: { type: String, default: '' },
  liveUrl: { type: String, default: '' },
});

const studentProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
      index: true,
    },
    // Personal Details
    phone: { type: String, trim: true, default: '' },
    dateOfBirth: { type: Date, default: null },
    gender: { type: String, enum: ['male', 'female', 'other', 'prefer_not_to_say', ''], default: '' },
    profilePhoto: { type: String, default: '' },
    address: { type: String, default: '' },
    city: { type: String, default: '' },
    state: { type: String, default: '' },
    country: { type: String, default: 'India' },

    // Academic Details
    enrollmentNumber: { type: String, required: true, trim: true, index: true },
    college: { type: String, default: 'Engineering Institute' },
    department: { type: String, default: 'Computer Science' },
    degree: { type: String, default: 'B.Tech' },
    branch: { type: String, required: true, trim: true, index: true },
    batch: { type: Number, required: true, index: true },
    currentSemester: { type: Number, default: 7, min: 1, max: 10 },
    cgpa: { type: Number, required: true, min: 0, max: 10, index: true },
    backlogs: { type: Number, default: 0, min: 0 },
    placementEligibility: { type: Boolean, default: true, index: true },

    // Professional & Skills
    skills: [{ type: String, trim: true }],
    programmingLanguages: [{ type: String, trim: true }],
    frameworks: [{ type: String, trim: true }],
    tools: [{ type: String, trim: true }],
    certifications: [{ type: String, trim: true }],
    projects: [projectSchema],
    achievements: [{ type: String, trim: true }],
    experience: [experienceSchema],
    education: [educationSchema],

    // Social & Online Links
    linkedin: { type: String, default: '' },
    github: { type: String, default: '' },
    leetcode: { type: String, default: '' },
    codeforces: { type: String, default: '' },
    codechef: { type: String, default: '' },
    portfolio: { type: String, default: '' },

    // Resume Metadata
    resumeUrl: { type: String, default: '' },
    resumePublicId: { type: String, default: '' },
    resumeUploadedAt: { type: Date, default: null },

    // Completion Status
    profileCompletionPercentage: { type: Number, default: 20, min: 0, max: 100 },
    profileVisibility: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

/**
 * Calculates profile completion percentage based on filled sections
 */
studentProfileSchema.methods.calculateCompletion = function () {
  let score = 0;
  const totalSections = 6;

  // 1. Basic / Personal Info (20%)
  if (this.enrollmentNumber && this.phone) score += 1;

  // 2. Academic Info (20%)
  if (this.branch && this.batch && this.cgpa !== undefined) score += 1;

  // 3. Skills (15%)
  if (this.skills && this.skills.length > 0) score += 1;

  // 4. Projects / Experience (15%)
  if ((this.projects && this.projects.length > 0) || (this.experience && this.experience.length > 0)) score += 1;

  // 5. Resume (15%)
  if (this.resumeUrl) score += 1;

  // 6. Social Links (15%)
  if (this.linkedin || this.github || this.portfolio) score += 1;

  this.profileCompletionPercentage = Math.round((score / totalSections) * 100);
  return this.profileCompletionPercentage;
};

export const StudentProfile = mongoose.model('StudentProfile', studentProfileSchema);
