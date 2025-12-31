"use server";

import connectDB from "@/lib/db";
import Message from "@/models/Message";
import { revalidatePath } from "next/cache";

export async function submitContactForm(prevState: any, formData: FormData) {
    try {
        await connectDB();
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const message = formData.get("message") as string;

        await Message.create({ name, email, message });

        revalidatePath("/admin/messages");

        return { success: true, message: "Message sent successfully!" };
    } catch (error) {
        console.error("Contact Form Error:", error);
        return { success: false, message: "Failed to send message. Please try again." };
    }
}

export async function getMessages() {
    await connectDB();
    const messages = await Message.find().sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(messages));
}

export async function markMessageAsRead(id: string) {
    await connectDB();
    await Message.findByIdAndUpdate(id, { read: true });
    revalidatePath("/admin/messages");
}

export async function deleteMessage(id: string) {
    await connectDB();
    await Message.findByIdAndDelete(id);
    revalidatePath("/admin/messages");
}
