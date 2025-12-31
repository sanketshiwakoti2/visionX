import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        const apiKey = process.env.IMGBB_API_KEY;
        if (!apiKey) {
            return NextResponse.json({ error: "Server configuration error: Missing API Key" }, { status: 500 });
        }

        // Convert file to base64
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const base64Image = buffer.toString('base64');

        const body = new FormData();
        body.append("image", base64Image);

        const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
            method: "POST",
            body: body,
        });

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.error?.message || "ImgBB Upload failed");
        }

        return NextResponse.json({ secure_url: data.data.url });
    } catch (error: any) {
        console.error("Upload Error:", error);
        return NextResponse.json({ error: "Upload failed", details: error.message }, { status: 500 });
    }
}
