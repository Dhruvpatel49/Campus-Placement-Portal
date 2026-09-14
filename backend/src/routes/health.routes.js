import { Router } from 'express';
import { checkHealth } from '../controllers/health.controller.js';

const router = Router();

router.get('/health', checkHealth);

export default router;
