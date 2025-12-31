"use server";

import connectDB from "@/lib/db";
import EventSettings, { IEventSettings } from "@/models/EventSettings";
import { revalidatePath } from "next/cache";

export async function getEventSettings() {
    await connectDB();

    let settings = await EventSettings.findOne();

    if (!settings) {
        // Create default if not exists
        settings = await EventSettings.create({
            startDate: new Date(), // Placeholder
            contactEmail: 'admin@visionx.org',
        });
    }

    // Serialize for Client Component
    return JSON.parse(JSON.stringify(settings));
}

export async function updateEventSettings(data: Partial<IEventSettings>) {
    await connectDB();
    console.log("updateEventSettings RECEIVED:", data);

    // Serialize and remove _id from data to prevent immutable field error
    const { _id, ...updateData } = data;

    // Ensure we are updating the singleton
    const settings = await EventSettings.findOneAndUpdate({}, updateData, {
        new: true,
        upsert: true,
        runValidators: true
    });

    console.log("updateEventSettings SAVED:", settings);

    revalidatePath("/"); // Revalidate home page
    revalidatePath("/admin/settings");

    return JSON.parse(JSON.stringify(settings));
}
