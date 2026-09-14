import { Router } from 'express';
import {
  getDashboard,
  getUsers,
  getRecruiters,
  verifyRecruiter,
  getCompanies,
  verifyCompany,
  getJobs,
  getApplications,
} from '../controllers/admin.controller.js';
import { authenticate, authorize } from '../middlewares/auth.middleware.js';
import { USER_ROLES } from '../utils/constants.js';

const router = Router();

// Require Admin Authentication & Role
router.use(authenticate);
router.use(authorize(USER_ROLES.ADMIN));

router.get('/dashboard', getDashboard);
router.get('/users', getUsers);
router.get('/recruiters', getRecruiters);
router.patch('/recruiters/:id/verify', verifyRecruiter);
router.get('/companies', getCompanies);
router.patch('/companies/:id/verify', verifyCompany);
router.get('/jobs', getJobs);
router.get('/applications', getApplications);

export default router;
