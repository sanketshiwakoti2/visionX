"use server";

import connectDB from "@/lib/db";
import Prize, { IPrize } from "@/models/Prize";
import { revalidatePath } from "next/cache";

export async function getPrizes() {
    await connectDB();
    const prizes = await Prize.find().sort({ displayOrder: 1, createdAt: 1 }).lean();
    return JSON.parse(JSON.stringify(prizes));
}

export async function createPrize(data: Partial<IPrize>) {
    await connectDB();
    await Prize.create(data);
    revalidatePath("/");
    revalidatePath("/admin/prizes");
}

export async function updatePrize(id: string, data: Partial<IPrize>) {
    await connectDB();
    const { _id, ...updateData } = data as any;
    await Prize.findByIdAndUpdate(id, updateData);
    revalidatePath("/");
    revalidatePath("/admin/prizes");
}

export async function deletePrize(id: string) {
    await connectDB();
    await Prize.findByIdAndDelete(id);
    revalidatePath("/");
    revalidatePath("/admin/prizes");
}
