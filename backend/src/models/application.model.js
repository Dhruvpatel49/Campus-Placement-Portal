import mongoose from 'mongoose';
import { APPLICATION_STATUS } from '../utils/constants.js';

const timelineSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: Object.values(APPLICATION_STATUS),
    required: true,
  },
  note: { type: String, default: '' },
  updatedAt: { type: Date, default: Date.now },
});

const applicationSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'StudentProfile',
      required: true,
      index: true,
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: true,
      index: true,
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      index: true,
    },
    recruiterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      index: true,
    },

    // Preserved Resume Snapshot
    resumeUrl: {
      type: String,
      required: [true, 'Resume URL snapshot is required'],
    },
    resumePublicId: {
      type: String,
      default: '',
    },
    coverLetter: {
      type: String,
      default: '',
    },
    recruiterNotes: {
      type: String,
      default: '',
    },

    // Status Workflow
    status: {
      type: String,
      enum: Object.values(APPLICATION_STATUS),
      default: APPLICATION_STATUS.APPLIED,
      index: true,
    },
    appliedAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
    timeline: [timelineSchema],
  },
  {
    timestamps: true,
  }
);

// Compound unique index ensuring one application per student per job
applicationSchema.index({ studentId: 1, jobId: 1 }, { unique: true });

export const Application = mongoose.model('Application', applicationSchema);
