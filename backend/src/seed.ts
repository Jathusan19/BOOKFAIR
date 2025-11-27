import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import Stall, { StallSize } from './models/Stall';
import User, { UserRole } from './models/User';
import { connectDB } from './config/db';

dotenv.config({ path: path.join(__dirname, '../.env') });

const seedData = async () => {
    await connectDB();

    try {
        await Stall.deleteMany({});
        await User.deleteMany({});

        console.log('Data cleared...');

        // Create Admin User
        await User.create({
            name: 'Admin User',
            email: 'admin@bookfair.com',
            password: 'password123',
            role: UserRole.ADMIN,
        });

        // Create Employee User
        await User.create({
            name: 'Employee User',
            email: 'employee@bookfair.com',
            password: 'password123',
            role: UserRole.EMPLOYEE,
        });

        console.log('Admin and Employee users created...');

        // Create Stalls
        const stalls = [];
        const rows = 5;
        const cols = 10;

        for (let r = 1; r <= rows; r++) {
            for (let c = 1; c <= cols; c++) {
                let size = StallSize.SMALL;
                if (r > 3) size = StallSize.MEDIUM;
                if (c > 8) size = StallSize.LARGE;

                stalls.push({
                    code: `${String.fromCharCode(64 + r)}${c}`,
                    size,
                    row: r,
                    col: c,
                });
            }
        }

        await Stall.insertMany(stalls);
        console.log('Stalls created...');

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedData();
