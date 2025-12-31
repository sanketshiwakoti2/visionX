import mongoose, { Schema, Document, Model } from 'mongoose';

// --- SPONSOR ---
export interface ISponsor extends Document {
    name: string;
    logoUrl: string;
    websiteUrl: string;
    tier: 'Diamond' | 'Gold' | 'Silver' | 'Partner';
    isActive: boolean;
}

const SponsorSchema: Schema = new Schema({
    name: { type: String, required: true },
    logoUrl: { type: String, required: true },
    websiteUrl: { type: String },
    tier: { type: String, enum: ['Diamond', 'Gold', 'Silver', 'Partner'], default: 'Partner' },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

export const Sponsor: Model<ISponsor> = mongoose.models.Sponsor || mongoose.model<ISponsor>('Sponsor', SponsorSchema);

// --- FAQ ---
export interface IFaq extends Document {
    question: string;
    answer: string;
    category: string;
    displayOrder: number;
    isActive: boolean;
}

const FaqSchema: Schema = new Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true },
    category: { type: String, default: 'General' },
    displayOrder: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

export const Faq: Model<IFaq> = mongoose.models.Faq || mongoose.model<IFaq>('Faq', FaqSchema);

// --- TESTIMONIAL ---
export interface ITestimonial extends Document {
    name: string;
    role: string;
    year: string;
    quote: string;
    photoUrl?: string; // Optional
    isActive: boolean;
}

const TestimonialSchema: Schema = new Schema({
    name: { type: String, required: true },
    role: { type: String, required: true },
    year: { type: String, required: true },
    quote: { type: String, required: true },
    photoUrl: { type: String },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

export const Testimonial: Model<ITestimonial> = mongoose.models.Testimonial || mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);

// --- GALLERY ---
export interface IGalleryImage extends Document {
    imageUrl: string;
    caption?: string;
    displayOrder: number;
}

const GalleryImageSchema: Schema = new Schema({
    imageUrl: { type: String, required: true },
    caption: { type: String },
    displayOrder: { type: Number, default: 0 },
}, { timestamps: true });

export const GalleryImage: Model<IGalleryImage> = mongoose.models.GalleryImage || mongoose.model<IGalleryImage>('GalleryImage', GalleryImageSchema);
