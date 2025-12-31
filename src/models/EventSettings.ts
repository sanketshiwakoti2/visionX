import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IEventSettings extends Document {
    eventName: string;
    startDate: Date;
    endDate?: Date;
    venue: string;
    registrationLink: string;
    discordLink: string;
    contactEmail: string;
    contactPhone: string; // Renamed from adminPhone for consistency, maintaining backward compat if needed or just using adminPhone
    contactAddress: string;
    primaryColor: string;
    logoUrl?: string;
    enableIntroAnimation: boolean;
    seoTitle: string;
    seoDescription: string;
    codeOfConductUrl?: string; // Optional URL field
    socialLinks: {
        instagram?: string;
        twitter?: string;
        linkedin?: string;
        facebook?: string;
    };
}

const EventSettingsSchema: Schema = new Schema({
    eventName: { type: String, required: true, default: 'MMC VisionX' },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    venue: { type: String, required: true, default: 'MMC Campus' },
    registrationLink: { type: String, default: '#' },
    discordLink: { type: String, default: '#' },
    contactEmail: { type: String, required: true },
    adminPhone: { type: String }, // Keeping database field name same to avoid migration issues for now, mapped to contactPhone
    contactAddress: { type: String, default: 'MMC Campus, Nepal' },
    primaryColor: { type: String, default: '#4c007d' }, // User New Main Color
    logoUrl: { type: String, default: '/logo.png' },
    enableIntroAnimation: { type: Boolean, default: true },
    seoDescription: { type: String, default: 'Join the biggest tech event of the year.' },
    codeOfConductUrl: { type: String, default: '#' },
    socialLinks: {
        instagram: String,
        twitter: String,
        linkedin: String,
        facebook: String,
    },
}, { timestamps: true });

// Prevent recompilation of model in hot reload
// @ts-ignore
if (process.env.NODE_ENV === 'development') {
    // @ts-ignore
    delete mongoose.models.EventSettings;
}

const EventSettings: Model<IEventSettings> = mongoose.models.EventSettings || mongoose.model<IEventSettings>('EventSettings', EventSettingsSchema);

export default EventSettings;
