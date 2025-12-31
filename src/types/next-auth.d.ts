import { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";
import { AdminRole } from "@/models/Admin";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            role: AdminRole;
        } & DefaultSession["user"];
    }

    interface User extends DefaultUser {
        role: AdminRole;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        role: AdminRole;
    }
}
