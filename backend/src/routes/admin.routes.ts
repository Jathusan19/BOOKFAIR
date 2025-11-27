import express from 'express';
import { getAllStalls, getAllReservations, checkIn } from '../controllers/admin.controller';
import { protect, authorize } from '../middleware/auth.middleware';
import { UserRole } from '../models/User';

const router = express.Router();

// All routes require EMPLOYEE or ADMIN role
router.use(protect, authorize(UserRole.EMPLOYEE, UserRole.ADMIN));

router.get('/stalls', getAllStalls);
router.get('/reservations', getAllReservations);
router.post('/checkin/:qrToken', checkIn);

export default router;
