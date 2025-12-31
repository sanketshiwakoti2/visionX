"use server";

import connectDB from "@/lib/db";
import { Sponsor, Faq, Testimonial, GalleryImage } from "@/models/Content";
import { revalidatePath } from "next/cache";

// --- SPONSORS ---
export async function getSponsors() {
    await connectDB();
    return JSON.parse(JSON.stringify(await Sponsor.find().sort({ createdAt: -1 }).lean()));
}
export async function createSponsor(data: any) {
    await connectDB();
    await Sponsor.create(data);
    revalidatePath("/");
    revalidatePath("/admin/sponsors");
}
export async function deleteSponsor(id: string) {
    await connectDB();
    await Sponsor.findByIdAndDelete(id);
    revalidatePath("/admin/sponsors");
}

// --- FAQS ---
export async function getFaqs() {
    await connectDB();
    return JSON.parse(JSON.stringify(await Faq.find().sort({ displayOrder: 1 }).lean()));
}
export async function createFaq(data: any) {
    await connectDB();
    await Faq.create(data);
    revalidatePath("/");
    revalidatePath("/admin/faq");
}
export async function deleteFaq(id: string) {
    await connectDB();
    await Faq.findByIdAndDelete(id);
    revalidatePath("/admin/faq");
}

// --- TESTIMONIALS ---
export async function getTestimonials() {
    await connectDB();
    return JSON.parse(JSON.stringify(await Testimonial.find().sort({ createdAt: -1 }).lean()));
}
export async function createTestimonial(data: any) {
    await connectDB();
    await Testimonial.create(data);
    revalidatePath("/");
    revalidatePath("/admin/testimonials");
}
export async function deleteTestimonial(id: string) {
    await connectDB();
    await Testimonial.findByIdAndDelete(id);
    revalidatePath("/admin/testimonials");
}

// --- GALLERY ---
export async function getGallery() {
    await connectDB();
    return JSON.parse(JSON.stringify(await GalleryImage.find().sort({ displayOrder: 1 }).lean()));
}
export async function createGalleryImage(data: any) {
    await connectDB();
    await GalleryImage.create(data);
    revalidatePath("/");
    revalidatePath("/admin/gallery");
}
export async function deleteGalleryImage(id: string) {
    await connectDB();
    await GalleryImage.findByIdAndDelete(id);
    revalidatePath("/admin/gallery");
}
