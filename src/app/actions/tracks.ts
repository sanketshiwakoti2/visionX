"use server";

import connectDB from "@/lib/db";
import Track, { ITrack } from "@/models/Track";
import { revalidatePath } from "next/cache";

export async function getTracks() {
    await connectDB();
    // Sort by order
    const tracks = await Track.find().sort({ displayOrder: 1, createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(tracks));
}

export async function createTrack(data: Partial<ITrack>) {
    await connectDB();
    const track = await Track.create(data);
    revalidatePath("/");
    revalidatePath("/admin/tracks");
    return JSON.parse(JSON.stringify(track));
}

export async function updateTrack(id: string, data: Partial<ITrack>) {
    await connectDB();
    const track = await Track.findByIdAndUpdate(id, data, { new: true });
    revalidatePath("/");
    revalidatePath("/admin/tracks");
    return JSON.parse(JSON.stringify(track));
}

export async function deleteTrack(id: string) {
    await connectDB();
    await Track.findByIdAndDelete(id);
    revalidatePath("/");
    revalidatePath("/admin/tracks");
    return true;
}
