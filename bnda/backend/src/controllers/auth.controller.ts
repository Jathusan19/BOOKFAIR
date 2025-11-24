import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser, UserRole } from '../models/User';
import { config } from '../config/env';

const signToken = (id: string) => {
    return jwt.sign({ id }, config.jwtSecret, {
        expiresIn: config.jwtExpiresIn,
    });
};

export const register = async (req: Request, res: Response) => {
    try {
        const { name, email, password, businessName, role } = req.body;

        // Default role is VENDOR if not specified, but allow creating EMPLOYEE/ADMIN if needed (maybe protect this in real app)
        // For this demo, we'll allow passing role, or default to VENDOR.
        // Ideally, ADMIN creation should be restricted.

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({
            name,
            email,
            password,
            businessName,
            role: role || UserRole.VENDOR,
        });

        const token = signToken(user._id as string);

        res.status(201).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                businessName: user.businessName,
                genres: user.genres,
            },
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password' });
        }

        const user = await User.findOne({ email });

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = signToken(user._id as string);

        res.status(200).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                businessName: user.businessName,
                genres: user.genres,
            },
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getMe = async (req: any, res: Response) => {
    try {
        const user = await User.findById(req.user.id);
        res.status(200).json({
            user: {
                id: user?._id,
                name: user?.name,
                email: user?.email,
                role: user?.role,
                businessName: user?.businessName,
                genres: user?.genres,
            },
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const updateGenres = async (req: any, res: Response) => {
    try {
        const { genres } = req.body;
        const user = await User.findByIdAndUpdate(req.user.id, { genres }, { new: true });

        res.status(200).json({
            user: {
                id: user?._id,
                name: user?.name,
                email: user?.email,
                role: user?.role,
                businessName: user?.businessName,
                genres: user?.genres,
            },
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
