import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Reservation from '../models/Reservation';
import Stall from '../models/Stall';
import { generateQrForReservation } from '../services/qr.service';
import { sendReservationConfirmation } from '../services/email.service';
import { AuthRequest } from '../middleware/auth.middleware';

export const createReservation = async (req: AuthRequest, res: Response) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { stallIds } = req.body; // Expecting array of stall IDs

    if (!req.user) {
      return res.status(401).json({ message: 'User not found' });
    }
    const userId = req.user._id;

    if (!stallIds || !Array.isArray(stallIds) || stallIds.length === 0) {
      return res.status(400).json({ message: 'Please select at least one stall.' });
    }

    // Check existing reservations count
    const existingReservationsCount = await Reservation.countDocuments({ user: userId });
    if (existingReservationsCount + stallIds.length > 3) {
      return res.status(400).json({ message: 'You can reserve a maximum of 3 stalls.' });
    }

    const reservations = [];

    for (const stallId of stallIds) {
      const stall = await Stall.findById(stallId).session(session);

      if (!stall) {
        throw new Error(`Stall not found: ${stallId}`);
      }

      if (stall.isReserved) {
        throw new Error(`Stall ${stall.code} is already reserved.`);
      }

      const qrToken = `RES-${userId}-${stallId}-${Date.now()}`;
      const qrCodeImageUrl = await generateQrForReservation(qrToken);

      const reservation = await Reservation.create([{
        user: userId,
        stall: stallId,
        qrCodeToken: qrToken,
        qrCodeImageUrl
      }], { session });

      stall.isReserved = true;
      stall.currentReservation = reservation[0]._id as mongoose.Types.ObjectId;
      await stall.save({ session });

      reservations.push(reservation[0]);

      if (req.user && req.user.email) {
        await sendReservationConfirmation(req.user.email, {
          stallCode: stall.code,
          stallSize: stall.size
        }, qrCodeImageUrl);
      }
    }

    await session.commitTransaction();
    res.status(201).json({ message: 'Reservations successful', reservations });
  } catch (error: any) {
    await session.abortTransaction();
    res.status(400).json({ message: error.message });
  } finally {
    session.endSession();
  }
};

export const getMyReservations = async (req: AuthRequest, res: Response) => {
  try {
    const reservations = await Reservation.find({ user: req.user?._id }).populate('stall');
    res.status(200).json(reservations);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
