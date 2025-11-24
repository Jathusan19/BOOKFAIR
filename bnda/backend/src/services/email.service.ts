import nodemailer from 'nodemailer';
import { config } from '../config/env';

const transporter = nodemailer.createTransport({
    host: config.emailHost,
    port: config.emailPort,
    secure: false, // true for 465, false for other ports
    auth: {
        user: config.emailUser,
        pass: config.emailPass,
    },
});

export const sendReservationConfirmation = async (userEmail: string, reservationDetails: any, qrCodeDataUrl: string) => {
    try {
        const info = await transporter.sendMail({
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
    } catch (error) {
        console.error('Error sending email:', error);
    }
};
