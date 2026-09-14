import { Router } from 'express';
import {
  applyForJob,
  withdrawApplication,
  getStudentApplications,
  getRecruiterApplications,
  updateApplicationStatus,
  getApplicationDetails,
} from '../controllers/application.controller.js';
import { validateApplicationApply, validateApplicationStatusUpdate } from '../validators/application.validator.js';
import { authenticate, authorize } from '../middlewares/auth.middleware.js';
import { USER_ROLES } from '../utils/constants.js';

const router = Router();

// Require authentication for all application routes
router.use(authenticate);

// Student Application Routes
router.post('/', authorize(USER_ROLES.STUDENT), validateApplicationApply, applyForJob);
router.get('/', authorize(USER_ROLES.STUDENT), getStudentApplications);
router.delete('/:id', authorize(USER_ROLES.STUDENT), withdrawApplication);

// Recruiter Applicant Management Routes
router.get('/recruiter', authorize(USER_ROLES.RECRUITER), getRecruiterApplications);
router.patch(
  '/recruiter/:id/status',
  authorize(USER_ROLES.RECRUITER),
  validateApplicationStatusUpdate,
  updateApplicationStatus
);

// General Application Details Route
router.get('/:id', getApplicationDetails);

export default router;
