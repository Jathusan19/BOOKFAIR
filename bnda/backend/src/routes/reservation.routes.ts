import express from 'express';
import { createReservation, getMyReservations } from '../controllers/reservation.controller';
import { protect, authorize } from '../middleware/auth.middleware';
import { UserRole } from '../models/User';

const router = express.Router();

router.post('/', protect, authorize(UserRole.VENDOR), createReservation);
router.get('/my', protect, getMyReservations);

export default router;
