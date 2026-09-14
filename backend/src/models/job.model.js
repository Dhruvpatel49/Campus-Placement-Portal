import mongoose from 'mongoose';
import { JOB_STATUS } from '../utils/constants.js';

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Job title is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: true,
      index: true,
    },
    recruiterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    description: {
      type: String,
      required: [true, 'Job description is required'],
    },
    requirements: [{ type: String, trim: true }],
    jobType: {
      type: String,
      enum: ['full_time', 'internship', 'contract'],
      default: 'full_time',
      index: true,
    },
    employmentType: {
      type: String,
      default: 'Permanent',
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      index: true,
    },
    workMode: {
      type: String,
      enum: ['on_site', 'remote', 'hybrid'],
      default: 'on_site',
      index: true,
    },

    // Compensation
    ctc: {
      type: Number,
      required: [true, 'CTC is required'],
      min: 0,
      index: true,
    },
    stipend: {
      type: Number,
      default: 0,
      min: 0,
    },
    currency: {
      type: String,
      default: 'INR',
    },

    // Eligibility Criteria
    minCgpa: {
      type: Number,
      default: 0,
      min: 0,
      max: 10,
      index: true,
    },
    allowedBranches: [{ type: String, trim: true }],
    graduationBatch: {
      type: Number,
      default: new Date().getFullYear() + 1,
      index: true,
    },
    maxBacklogs: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Hiring Details
    openings: {
      type: Number,
      default: 1,
      min: 1,
    },
    deadline: {
      type: Date,
      required: [true, 'Application deadline is required'],
      index: true,
    },
    selectionProcess: {
      type: String,
      default: 'Aptitude Test -> Technical Interview -> HR Round',
    },

    // Status Lifecycle
    status: {
      type: String,
      enum: Object.values(JOB_STATUS),
      default: JOB_STATUS.DRAFT,
      index: true,
    },
    publishedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export const Job = mongoose.model('Job', jobSchema);
