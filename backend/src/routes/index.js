import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import { createRequire } from 'module';
import healthRoutes from './health.routes.js';
import authRoutes from './auth.routes.js';
import studentRoutes from './student.routes.js';
import companyRoutes from './company.routes.js';
import jobRoutes from './job.routes.js';
import recruiterRoutes from './recruiter.routes.js';
import applicationRoutes from './application.routes.js';
import adminRoutes from './admin.routes.js';
import notificationRoutes from './notification.routes.js';

const require = createRequire(import.meta.url);
const swaggerDocument = require('../docs/swagger.json');

const router = Router();

// Version 1 API Documentation
router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Version 1 routes hub
router.use('/', healthRoutes);
router.use('/auth', authRoutes);
router.use('/student', studentRoutes);
router.use('/company', companyRoutes);
router.use('/job', jobRoutes);
router.use('/jobs', jobRoutes);
router.use('/recruiter', recruiterRoutes);
router.use('/application', applicationRoutes);
router.use('/applications', applicationRoutes);
router.use('/admin', adminRoutes);
router.use('/notification', notificationRoutes);
router.use('/notifications', notificationRoutes);

export default router;
