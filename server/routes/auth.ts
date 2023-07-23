import { register, login, verify } from '../controllers/auth';
import { Router } from 'express';

// Initialize a new router
const router = Router();

// Routes
router.post('/register', register);
router.post('/login', login);
router.get('/verify', verify);

export default router;
