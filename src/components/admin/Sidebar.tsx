"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Settings,
    MonitorPlay,
    Info,
    Layers,
    Image as ImageIcon,
    MessageSquare,
    HelpCircle,
    Users,
    PanelBottom,
    LogOut,
    Trophy
} from "lucide-react";
import clsx from "clsx";
import { signOut } from "next-auth/react";

const navItems = [
    { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Messages", href: "/admin/messages", icon: MessageSquare }, // Replaced existing MessageSquare usage or just added
    { label: "Global Settings", href: "/admin/settings", icon: Settings },
    { label: "Hero Section", href: "/admin/hero", icon: MonitorPlay },
    { label: "About & VisionX", href: "/admin/about", icon: Info },
    { label: "Themes & Tracks", href: "/admin/tracks", icon: Layers },
    { label: "Prizes", href: "/admin/prizes", icon: Trophy }, // Helper must import Trophy
    { label: "Gallery", href: "/admin/gallery", icon: ImageIcon },
    { label: "Testimonials", href: "/admin/testimonials", icon: MessageSquare },
    { label: "FAQ", href: "/admin/faq", icon: HelpCircle },
    { label: "Sponsors", href: "/admin/sponsors", icon: Users },
    { label: "Footer", href: "/admin/footer", icon: PanelBottom },
];

export default function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 bg-neutral-900 border-r border-neutral-800 flex flex-col h-screen fixed left-0 top-0 overflow-y-auto">
            <div className="p-6 border-b border-neutral-800">
                <h2 className="text-xl font-bold text-white tracking-tight">VisionX <span className="text-indigo-500">Admin</span></h2>
            </div>

            <nav className="flex-1 p-4 space-y-1">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={clsx(
                                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all group",
                                isActive
                                    ? "bg-indigo-600/10 text-indigo-400 border border-indigo-600/20"
                                    : "text-neutral-400 hover:bg-neutral-800 hover:text-white"
                            )}
                        >
                            <Icon size={18} className={clsx(isActive ? "text-indigo-400" : "text-neutral-500 group-hover:text-white")} />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-neutral-800">
                <button
                    onClick={() => signOut({ callbackUrl: "/admin/login" })}
                    className="flex items-center gap-3 w-full px-4 py-3 text-neutral-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all text-sm font-medium"
                >
                    <LogOut size={18} />
                    Sign Out
                </button>
            </div>
        </aside>
    );
}
