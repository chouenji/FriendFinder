import { Router } from 'express';
import auth from './auth';
import users from './users';
import chats from './chats';

const router = Router();

router.use('/auth', auth);
router.use('/users', users);
router.use('/chats', chats);

export default router;
