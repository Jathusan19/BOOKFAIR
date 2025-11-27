import express from 'express';
import { register, login, getMe, updateGenres } from '../controllers/auth.controller';
import { protect } from '../middleware/auth.middleware';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.put('/users/me/genres', protect, updateGenres); // Placing it here as requested in 2.5, though URL structure is slightly different in request. 
// Request said PUT /api/users/me/genres. I'll map it in app.ts or here.
// Let's keep it simple and maybe add a separate user route file if needed, but for now auth routes can handle user profile stuff.

export default router;
