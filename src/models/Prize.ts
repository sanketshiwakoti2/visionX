
import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPrize extends Document {
    title: string;
    description: string;
    amount: string; // e.g. "RS. 50,000"
    icon: string; // Lucide icon name
    displayOrder: number;
}

const PrizeSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    amount: { type: String, required: true },
    icon: { type: String, default: 'Trophy' },
    displayOrder: { type: Number, default: 0 },
}, { timestamps: true });

const Prize: Model<IPrize> = mongoose.models.Prize || mongoose.model<IPrize>('Prize', PrizeSchema);

export default Prize;
