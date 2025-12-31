import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAboutCard {
    title: string;
    description: string;
    icon?: string; // Lucide icon name
    logoUrl?: string; // Custom logo
}

export interface IAboutSection extends Document {
    mmcCard: IAboutCard;
    visionxCard: IAboutCard;
    mainImageUrl?: string; // Dynamic main image
    isActive: boolean;
}

const AboutSectionSchema: Schema = new Schema({
    mmcCard: {
        title: { type: String, default: 'About MMC' },
        description: { type: String, default: 'Multimedia Club is a community of creators...' },
        logoUrl: { type: String },
        icon: { type: String },
    },
    visionxCard: {
        title: { type: String, default: 'About VisionX' },
        description: { type: String, default: 'VisionX is our flagship innovation festival...' },
        logoUrl: { type: String },
        icon: { type: String },
    },
    mainImageUrl: { type: String },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

// Prevent Mongoose model recompilation error in development
// @ts-ignore
if (process.env.NODE_ENV === 'development') {
    // @ts-ignore
    delete mongoose.models.AboutSection;
}

const AboutSection: Model<IAboutSection> = mongoose.models.AboutSection || mongoose.model<IAboutSection>('AboutSection', AboutSectionSchema);

export default AboutSection;
