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
exports.sendReservationConfirmation = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const env_1 = require("../config/env");
const transporter = nodemailer_1.default.createTransport({
    host: env_1.config.emailHost,
    port: env_1.config.emailPort,
    secure: false, // true for 465, false for other ports
    auth: {
        user: env_1.config.emailUser,
        pass: env_1.config.emailPass,
    },
});
const sendReservationConfirmation = (userEmail, reservationDetails, qrCodeDataUrl) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const info = yield transporter.sendMail({
            from: '"Bookfair Team" <noreply@bookfair.com>',
            to: userEmail,
            subject: 'Stall Reservation Confirmation',
            html: `
        <h1>Reservation Confirmed!</h1>
        <p>Thank you for reserving a stall at the Colombo International Bookfair.</p>
        <p><strong>Stall Code:</strong> ${reservationDetails.stallCode}</p>
        <p><strong>Size:</strong> ${reservationDetails.stallSize}</p>
        <p>Please present the attached QR code at the entrance.</p>
        <br>
        <img src="${qrCodeDataUrl}" alt="QR Code" />
      `,
            attachments: [
                {
                    filename: 'qrcode.png',
                    content: qrCodeDataUrl.split('base64,')[1],
                    encoding: 'base64',
                },
            ],
        });
        console.log('Message sent: %s', info.messageId);
    }
    catch (error) {
        console.error('Error sending email:', error);
    }
});
exports.sendReservationConfirmation = sendReservationConfirmation;
