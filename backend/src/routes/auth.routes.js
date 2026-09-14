import { Router } from 'express';
import { register, login, logout, refreshToken, getMe } from '../controllers/auth.controller.js';
import { validateRegisterInput, validateLoginInput } from '../validators/auth.validator.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/register', validateRegisterInput, register);
router.post('/login', validateLoginInput, login);
router.post('/refresh-token', refreshToken);
router.post('/logout', logout);
router.get('/me', authenticate, getMe);

export default router;
