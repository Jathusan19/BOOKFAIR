"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const Stall_1 = __importStar(require("./models/Stall"));
const User_1 = __importStar(require("./models/User"));
const db_1 = require("./config/db");
dotenv_1.default.config({ path: path_1.default.join(__dirname, '../.env') });
const seedData = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_1.connectDB)();
    try {
        yield Stall_1.default.deleteMany({});
        yield User_1.default.deleteMany({});
        console.log('Data cleared...');
        // Create Admin User
        yield User_1.default.create({
            name: 'Admin User',
            email: 'admin@bookfair.com',
            password: 'password123',
            role: User_1.UserRole.ADMIN,
        });
        // Create Employee User
        yield User_1.default.create({
            name: 'Employee User',
            email: 'employee@bookfair.com',
            password: 'password123',
            role: User_1.UserRole.EMPLOYEE,
        });
        console.log('Admin and Employee users created...');
        // Create Stalls
        const stalls = [];
        const rows = 5;
        const cols = 10;
        for (let r = 1; r <= rows; r++) {
            for (let c = 1; c <= cols; c++) {
                let size = Stall_1.StallSize.SMALL;
                if (r > 3)
                    size = Stall_1.StallSize.MEDIUM;
                if (c > 8)
                    size = Stall_1.StallSize.LARGE;
                stalls.push({
                    code: `${String.fromCharCode(64 + r)}${c}`,
                    size,
                    row: r,
                    col: c,
                });
            }
        }
        yield Stall_1.default.insertMany(stalls);
        console.log('Stalls created...');
        process.exit();
    }
    catch (error) {
        console.error(error);
        process.exit(1);
    }
});
seedData();
