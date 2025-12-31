"use client";

import Link from "next/link";
import { ArrowRight, Settings } from "lucide-react";

export default function FooterManager() {
    return (
        <div className="max-w-4xl">
            <h1 className="text-3xl font-bold text-white mb-8">Footer Manager</h1>

            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8 text-center">
                <div className="w-16 h-16 bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Settings size={32} className="text-neutral-400" />
                </div>
                <h2 className="text-xl font-bold text-white mb-2">Managed via Global Settings</h2>
                <p className="text-neutral-400 max-w-md mx-auto mb-8">
                    The footer content (social links, contact email, venue) is pulled directly from your Global Event Settings to ensure consistency across the site.
                </p>
                <Link
                    href="/admin/settings"
                    className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                    Go to Global Settings
                    <ArrowRight size={18} />
                </Link>
            </div>
        </div>
    );
}
