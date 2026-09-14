import { Router } from 'express';
import {
  getProfile,
  updateProfile,
  getDashboard,
  updateSettings,
} from '../controllers/recruiter.controller.js';
import { validateRecruiterProfileUpdate } from '../validators/recruiter.validator.js';
import { authenticate, authorize } from '../middlewares/auth.middleware.js';
import { USER_ROLES } from '../utils/constants.js';

const router = Router();

// Require Recruiter Authentication for all routes below
router.use(authenticate);
router.use(authorize(USER_ROLES.RECRUITER));

router.get('/profile', getProfile);
router.put('/profile', validateRecruiterProfileUpdate, updateProfile);
router.get('/dashboard', getDashboard);
router.put('/settings', updateSettings);

export default router;
