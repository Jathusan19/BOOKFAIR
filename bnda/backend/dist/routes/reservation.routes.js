"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reservation_controller_1 = require("../controllers/reservation.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const User_1 = require("../models/User");
const router = express_1.default.Router();
router.post('/', auth_middleware_1.protect, (0, auth_middleware_1.authorize)(User_1.UserRole.VENDOR), reservation_controller_1.createReservation);
router.get('/my', auth_middleware_1.protect, reservation_controller_1.getMyReservations);
exports.default = router;
