import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Admin, { AdminRole } from "@/models/Admin";
import { hash } from "bcryptjs";

export async function GET() {
    try {
        await connectDB();

        const existingAdmin = await Admin.findOne({ email: "admin@visionx.com" });
        if (existingAdmin) {
            return NextResponse.json({ message: "Admin already exists", email: "admin@visionx.com" });
        }

        const passwordHash = await hash("admin123", 10);

        await Admin.create({
            email: "admin@visionx.com",
            passwordHash,
            name: "Super Admin",
            role: AdminRole.SUPER_ADMIN,
        });

        return NextResponse.json({
            message: "Admin created successfully",
            credentials: {
                email: "admin@visionx.com",
                password: "admin123"
            }
        });
    } catch (error: any) {
        console.error("Seed Error:", error);
        return NextResponse.json({
            error: "Failed to seed admin",
            details: error.message,
            envCheck: {
                hasMongoURI: !!process.env.MONGODB_URI
            }
        }, { status: 500 });
    }
}
