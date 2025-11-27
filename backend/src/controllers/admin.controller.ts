import { Request, Response } from 'express';
import Stall from '../models/Stall';
import Reservation from '../models/Reservation';

export const getAllStalls = async (req: Request, res: Response) => {
    try {
        const stalls = await Stall.find().populate('currentReservation');
        res.status(200).json(stalls);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllReservations = async (req: Request, res: Response) => {
    try {
        const reservations = await Reservation.find()
            .populate('user', 'name email businessName')
            .populate('stall', 'code size');
        res.status(200).json(reservations);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const checkIn = async (req: Request, res: Response) => {
    try {
        const { qrToken } = req.params;
        const reservation = await Reservation.findOne({ qrCodeToken: qrToken }).populate('user stall');

        if (!reservation) {
            return res.status(404).json({ message: 'Invalid QR Token' });
        }

        // Logic for check-in (e.g., update status)
        // For now just return valid
        res.status(200).json({ message: 'Valid Reservation', reservation });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
