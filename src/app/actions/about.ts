"use server";

import connectDB from "@/lib/db";
import AboutSection, { IAboutSection } from "@/models/AboutSection";
import { revalidatePath } from "next/cache";

export async function getAboutSection() {
    await connectDB();

    let about = await AboutSection.findOne().lean();

    if (!about) {
        const newAbout = await AboutSection.create({});
        about = newAbout.toObject();
    }

    return JSON.parse(JSON.stringify(about));
}

export async function updateAboutSection(data: Partial<IAboutSection>) {
    await connectDB();

    // Remove _id from data to prevent immutable field error
    const { _id, ...updateData } = data as any;

    const about = await AboutSection.findOneAndUpdate({}, updateData, {
        new: true,
        upsert: true,
        runValidators: true
    });

    revalidatePath("/");
    revalidatePath("/admin/about");

    return JSON.parse(JSON.stringify(about));
}
