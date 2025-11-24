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
exports.getMyReservations = exports.createReservation = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Reservation_1 = __importDefault(require("../models/Reservation"));
const Stall_1 = __importDefault(require("../models/Stall"));
const qr_service_1 = require("../services/qr.service");
const email_service_1 = require("../services/email.service");
const createReservation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const { stallIds } = req.body; // Expecting array of stall IDs
        if (!req.user) {
            return res.status(401).json({ message: 'User not found' });
        }
        const userId = req.user._id;
        if (!stallIds || !Array.isArray(stallIds) || stallIds.length === 0) {
            return res.status(400).json({ message: 'Please select at least one stall.' });
        }
        // Check existing reservations count
        const existingReservationsCount = yield Reservation_1.default.countDocuments({ user: userId });
        if (existingReservationsCount + stallIds.length > 3) {
            return res.status(400).json({ message: 'You can reserve a maximum of 3 stalls.' });
        }
        const reservations = [];
        for (const stallId of stallIds) {
            const stall = yield Stall_1.default.findById(stallId).session(session);
            if (!stall) {
                throw new Error(`Stall not found: ${stallId}`);
            }
            if (stall.isReserved) {
                throw new Error(`Stall ${stall.code} is already reserved.`);
            }
            const qrToken = `RES-${userId}-${stallId}-${Date.now()}`;
            const qrCodeImageUrl = yield (0, qr_service_1.generateQrForReservation)(qrToken);
            const reservation = yield Reservation_1.default.create([{
                    user: userId,
                    stall: stallId,
                    qrCodeToken: qrToken,
                    qrCodeImageUrl
                }], { session });
            stall.isReserved = true;
            stall.currentReservation = reservation[0]._id;
            yield stall.save({ session });
            reservations.push(reservation[0]);
            if (req.user && req.user.email) {
                yield (0, email_service_1.sendReservationConfirmation)(req.user.email, {
                    stallCode: stall.code,
                    stallSize: stall.size
                }, qrCodeImageUrl);
            }
        }
        yield session.commitTransaction();
        res.status(201).json({ message: 'Reservations successful', reservations });
    }
    catch (error) {
        yield session.abortTransaction();
        res.status(400).json({ message: error.message });
    }
    finally {
        session.endSession();
    }
});
exports.createReservation = createReservation;
const getMyReservations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const reservations = yield Reservation_1.default.find({ user: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id }).populate('stall');
        res.status(200).json(reservations);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getMyReservations = getMyReservations;
