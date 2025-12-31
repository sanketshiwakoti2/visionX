import mongoose, { Schema, Document, Model } from 'mongoose';

export enum AdminRole {
    SUPER_ADMIN = 'super_admin',
    EDITOR = 'editor',
}

export interface IAdmin extends Document {
    email: string;
    passwordHash: string;
    name: string;
    role: AdminRole;
    isActive: boolean;
}

const AdminSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true, index: true },
    passwordHash: { type: String, required: true, select: false }, // Store bcrypt hash
    name: { type: String, required: true },
    role: { type: String, enum: Object.values(AdminRole), default: AdminRole.EDITOR },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

const Admin: Model<IAdmin> = mongoose.models.Admin || mongoose.model<IAdmin>('Admin', AdminSchema);

export default Admin;
