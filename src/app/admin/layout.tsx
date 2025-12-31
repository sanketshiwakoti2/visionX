import AuthProvider from "@/components/providers/AuthProvider";
import AdminSidebar from "@/components/admin/Sidebar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);

    // If not accessing login page and no session, redirect will be handled by middleware
    // But we can double check here (though middleware is preferred)

    return (
        <AuthProvider>
            <div className="min-h-screen bg-neutral-950 text-white flex">
                {session ? <AdminSidebar /> : null}
                <main className={session ? "flex-1 ml-64 p-8" : "w-full"}>
                    {children}
                </main>
            </div>
        </AuthProvider>
    );
}
