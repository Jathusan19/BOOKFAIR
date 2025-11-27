import mongoose, { Document, Schema } from 'mongoose';

export enum StallSize {
    SMALL = 'SMALL',
    MEDIUM = 'MEDIUM',
    LARGE = 'LARGE'
}

export interface IStall extends Document {
    code: string;
    size: StallSize;
    row: number;
    col: number;
    isReserved: boolean;
    currentReservation?: mongoose.Types.ObjectId;
}

const StallSchema: Schema = new Schema({
    code: { type: String, required: true, unique: true },
    size: { type: String, enum: Object.values(StallSize), required: true },
    row: { type: Number, required: true },
    col: { type: Number, required: true },
    isReserved: { type: Boolean, default: false },
    currentReservation: { type: Schema.Types.ObjectId, ref: 'Reservation' }
}, { timestamps: true });

export default mongoose.model<IStall>('Stall', StallSchema);
