import { Router } from 'express';
import {
  getProfile,
  updateProfile,
  getDashboard,
  uploadResume,
  deleteResume,
  updateSettings,
} from '../controllers/student.controller.js';
import { validateStudentProfileUpdate } from '../validators/student.validator.js';
import { authenticate, authorize } from '../middlewares/auth.middleware.js';
import { uploadResumeFile } from '../middlewares/upload.middleware.js';
import { USER_ROLES } from '../utils/constants.js';

const router = Router();

// Require Student Authentication for all routes below
router.use(authenticate);
router.use(authorize(USER_ROLES.STUDENT));

router.get('/profile', getProfile);
router.put('/profile', validateStudentProfileUpdate, updateProfile);
router.get('/dashboard', getDashboard);
router.post('/resume', uploadResumeFile, uploadResume);
router.delete('/resume', deleteResume);
router.put('/settings', updateSettings);

export default router;
