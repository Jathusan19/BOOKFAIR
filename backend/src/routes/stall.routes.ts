import express from 'express';
import { getStalls, getStallsMap } from '../controllers/stall.controller';
import { protect } from '../middleware/auth.middleware';

const router = express.Router();

router.get('/', protect, getStalls);
router.get('/map', protect, getStallsMap);

export default router;
