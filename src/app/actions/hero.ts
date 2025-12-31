"use server";

import connectDB from "@/lib/db";
import HeroSection, { IHeroSection } from "@/models/HeroSection";
import { revalidatePath } from "next/cache";

export async function getHeroSection() {
    await connectDB();

    let hero = await HeroSection.findOne();

    if (!hero) {
        hero = await HeroSection.create({});
    }

    return JSON.parse(JSON.stringify(hero));
}

export async function updateHeroSection(data: Partial<IHeroSection>) {
    await connectDB();
    console.log("updateHeroSection RECEIVED:", data);

    const { _id, ...updateData } = data;

    const hero = await HeroSection.findOneAndUpdate({}, updateData, {
        new: true,
        upsert: true,
        runValidators: true
    });

    console.log("updateHeroSection SAVED:", hero);

    revalidatePath("/");
    revalidatePath("/admin/hero");

    return JSON.parse(JSON.stringify(hero));
}
