import { Router } from 'express';
import {
  users,
  user,
  getUserLikes,
  postUserLikes,
  getUserMatches,
} from '../controllers/users';

// Initialize a new router
const router = Router();

// Routes
router.get('/', users);
router.get('/:id', user);
router.get('/:id/likes', getUserLikes);
router.post('/:id/likes', postUserLikes);
router.get('/:id/matches', getUserMatches);

export default router;
