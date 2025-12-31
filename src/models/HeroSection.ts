import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IHeroSection extends Document {
    titleLine1: string;
    titleLine2?: string;
    subtitle: string;
    ctaText: string;
    ctaLink: string;
    backgroundImageUrl?: string; // Dynamic Background Image
    heroLogo?: string; // URL from Cloudinary (optional secondary logo)
    backgroundVideo?: string; // URL
    showCountdown: boolean;
    isActive: boolean;
}

const HeroSectionSchema: Schema = new Schema({
    titleLine1: { type: String, required: true, default: 'Innovation' },
    titleLine2: { type: String, default: 'Unleashed' },
    subtitle: { type: String, default: 'The ultimate tech festival awaits.' },
    ctaText: { type: String, default: 'Register Now' },
    ctaLink: { type: String, default: '/register' },
    backgroundImageUrl: { type: String, default: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop' },
    heroLogo: { type: String },
    backgroundVideo: { type: String },
    showCountdown: { type: Boolean, default: true },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

const HeroSection: Model<IHeroSection> = mongoose.models.HeroSection || mongoose.model<IHeroSection>('HeroSection', HeroSectionSchema);

export default HeroSection;
