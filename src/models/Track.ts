import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITrack extends Document {
    title: string;
    description: string;
    icon: string; // Lucide icon name or emoji
    imageUrl?: string; // Optional custom image
    prizeAmount?: string;
    displayOrder: number;
    isActive: boolean;
}

const TrackSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, default: 'Cpu' },
    imageUrl: { type: String },
    prizeAmount: { type: String, default: 'TBA' },
    displayOrder: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

const Track: Model<ITrack> = mongoose.models.Track || mongoose.model<ITrack>('Track', TrackSchema);

export default Track;
