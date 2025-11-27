import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

export enum UserRole {
    VENDOR = 'VENDOR',
    EMPLOYEE = 'EMPLOYEE',
    ADMIN = 'ADMIN'
}

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    businessName?: string;
    role: UserRole;
    genres: string[];
    comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    businessName: { type: String },
    role: { type: String, enum: Object.values(UserRole), default: UserRole.VENDOR },
    genres: [{ type: String }]
}, { timestamps: true });

UserSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error as Error);
    }
});

UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IUser>('User', UserSchema);
