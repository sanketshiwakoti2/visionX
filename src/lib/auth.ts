import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "@/lib/db";
import Admin from "@/models/Admin";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Admin Login",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Missing email or password");
                }

                await connectDB();

                const admin = await Admin.findOne({ email: credentials.email }).select("+passwordHash");

                if (!admin) {
                    throw new Error("Invalid credentials");
                }

                if (!admin.isActive) {
                    throw new Error("Account is disabled");
                }

                const isValid = await bcrypt.compare(credentials.password, admin.passwordHash);

                if (!isValid) {
                    throw new Error("Invalid credentials");
                }

                return {
                    id: admin._id.toString(),
                    email: admin.email,
                    name: admin.name,
                    role: admin.role,
                };
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as any).role = token.role;
                (session.user as any).id = token.id;
            }
            return session;
        }
    },
    pages: {
        signIn: "/admin/login",
        error: "/admin/login",
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
};
