import { app } from '../controllers/chat';
import { Router } from 'express';

const router = Router();

router.get('/', app);
router.get('/:id', app);
router.post('/:id', app);
router.patch('/:id', app);

export default router;
