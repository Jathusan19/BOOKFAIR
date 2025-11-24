import mongoose, { Document, Schema } from 'mongoose';

export interface IReservation extends Document {
    user: mongoose.Types.ObjectId;
    stall: mongoose.Types.ObjectId;
    status: string;
    qrCodeToken: string;
    qrCodeImageUrl?: string;
}

const ReservationSchema: Schema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    stall: { type: Schema.Types.ObjectId, ref: 'Stall', required: true },
    status: { type: String, default: 'CONFIRMED' },
    qrCodeToken: { type: String, required: true, unique: true },
    qrCodeImageUrl: { type: String }
}, { timestamps: true });

export default mongoose.model<IReservation>('Reservation', ReservationSchema);
