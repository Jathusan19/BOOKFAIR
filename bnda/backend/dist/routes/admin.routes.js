"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_controller_1 = require("../controllers/admin.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const User_1 = require("../models/User");
const router = express_1.default.Router();
// All routes require EMPLOYEE or ADMIN role
router.use(auth_middleware_1.protect, (0, auth_middleware_1.authorize)(User_1.UserRole.EMPLOYEE, User_1.UserRole.ADMIN));
router.get('/stalls', admin_controller_1.getAllStalls);
router.get('/reservations', admin_controller_1.getAllReservations);
router.post('/checkin/:qrToken', admin_controller_1.checkIn);
exports.default = router;
