import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

export const config = {
    mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/bookfair',
    jwtSecret: process.env.JWT_ACCESS_SECRET || 'default_secret',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
    emailHost: process.env.EMAIL_HOST,
    emailPort: parseInt(process.env.EMAIL_PORT || '587'),
    emailUser: process.env.EMAIL_USER,
    emailPass: process.env.EMAIL_PASS,
    clientVendorUrl: process.env.CLIENT_VENDOR_URL || 'http://localhost:5173',
    clientEmployeeUrl: process.env.CLIENT_EMPLOYEE_URL || 'http://localhost:5174',
    port: parseInt(process.env.PORT || '5000'),
};
