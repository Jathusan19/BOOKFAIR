"use strict";
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
exports.checkIn = exports.getAllReservations = exports.getAllStalls = void 0;
const Stall_1 = __importDefault(require("../models/Stall"));
const Reservation_1 = __importDefault(require("../models/Reservation"));
const getAllStalls = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stalls = yield Stall_1.default.find().populate('currentReservation');
        res.status(200).json(stalls);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getAllStalls = getAllStalls;
const getAllReservations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reservations = yield Reservation_1.default.find()
            .populate('user', 'name email businessName')
            .populate('stall', 'code size');
        res.status(200).json(reservations);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getAllReservations = getAllReservations;
const checkIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { qrToken } = req.params;
        const reservation = yield Reservation_1.default.findOne({ qrCodeToken: qrToken }).populate('user stall');
        if (!reservation) {
            return res.status(404).json({ message: 'Invalid QR Token' });
        }
        // Logic for check-in (e.g., update status)
        // For now just return valid
        res.status(200).json({ message: 'Valid Reservation', reservation });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.checkIn = checkIn;
