"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(__dirname, '../../.env') });
exports.config = {
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
