import { Router } from 'express';
import {
  createCompany,
  getCompany,
  updateCompany,
  uploadLogo,
  getDashboard,
} from '../controllers/company.controller.js';
import { validateCompanyCreate, validateCompanyUpdate } from '../validators/company.validator.js';
import { authenticate, authorize } from '../middlewares/auth.middleware.js';
import { uploadLogoFile } from '../middlewares/upload.middleware.js';
import { USER_ROLES } from '../utils/constants.js';

const router = Router();

// Require Recruiter Authentication for all routes below
router.use(authenticate);
router.use(authorize(USER_ROLES.RECRUITER));

router.post('/', validateCompanyCreate, createCompany);
router.get('/', getCompany);
router.put('/', validateCompanyUpdate, updateCompany);
router.get('/dashboard', getDashboard);
router.post('/logo', uploadLogoFile, uploadLogo);

export default router;
