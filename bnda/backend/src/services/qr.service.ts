import QRCode from 'qrcode';

export const generateQrForReservation = async (token: string): Promise<string> => {
    try {
        return await QRCode.toDataURL(token);
    } catch (error) {
        console.error('Error generating QR code:', error);
        throw error;
    }
};
