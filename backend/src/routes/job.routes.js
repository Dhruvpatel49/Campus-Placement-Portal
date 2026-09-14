import { Router } from 'express';
import {
  createJob,
  updateJob,
  publishJob,
  closeJob,
  deleteJob,
  getRecruiterJobs,
  getStudentJobs,
  getJobById,
} from '../controllers/job.controller.js';
import { validateJobCreate, validateJobUpdate } from '../validators/job.validator.js';
import { authenticate, authorize } from '../middlewares/auth.middleware.js';
import { USER_ROLES } from '../utils/constants.js';

const router = Router();

// Public / Authenticated Student Job Browsing
router.get('/', authenticate, getStudentJobs);
router.get('/recruiter', authenticate, authorize(USER_ROLES.RECRUITER), getRecruiterJobs);
router.get('/:id', authenticate, getJobById);

// Recruiter Job Management Routes
router.post('/', authenticate, authorize(USER_ROLES.RECRUITER), validateJobCreate, createJob);
router.put('/:id', authenticate, authorize(USER_ROLES.RECRUITER), validateJobUpdate, updateJob);
router.delete('/:id', authenticate, authorize(USER_ROLES.RECRUITER), deleteJob);
router.patch('/:id/publish', authenticate, authorize(USER_ROLES.RECRUITER), publishJob);
router.patch('/:id/close', authenticate, authorize(USER_ROLES.RECRUITER), closeJob);

export default router;
