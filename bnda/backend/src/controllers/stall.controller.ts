import { Request, Response } from 'express';
import Stall from '../models/Stall';

export const getStalls = async (req: Request, res: Response) => {
    try {
        const { size } = req.query;
        const query: any = {};
        if (size) {
            query.size = size;
        }

        const stalls = await Stall.find(query).sort({ row: 1, col: 1 });
        res.status(200).json(stalls);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getStallsMap = async (req: Request, res: Response) => {
    try {
        const stalls = await Stall.find().sort({ row: 1, col: 1 });
        // Group by row for easier map rendering if needed, or just return flat list
        // Returning flat list is usually fine for frontend to grid, but let's see.
        res.status(200).json(stalls);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
