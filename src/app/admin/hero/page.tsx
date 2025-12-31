"use client";

import { useEffect, useState } from "react";
import { getHeroSection, updateHeroSection } from "@/app/actions/hero";
import { Loader2, Save, ExternalLink } from "lucide-react";
import Link from "next/link";
import ImageUpload from "@/components/ui/ImageUpload";

export default function HeroManagerPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [hero, setHero] = useState<any>(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        getHeroSection().then((data) => {
            setHero(data);
            setLoading(false);
        });
    }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setMessage("");

        try {
            await updateHeroSection(hero);
            setMessage("Hero section updated successfully.");
        } catch (error) {
            setMessage("Failed to update hero.");
        } finally {
            setSaving(false);
        }
    };

    const handleChange = (field: string, value: any) => {
        setHero((prev: any) => ({ ...prev, [field]: value }));
    };

    if (loading) return <div className="text-white p-8">Loading content...</div>;

    return (
        <div className="max-w-4xl">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Hero Section Manager</h1>
                    <p className="text-neutral-400">Control the first impression.</p>
                </div>
                <div className="flex gap-4">
                    <Link
                        href="/"
                        target="_blank"
                        className="flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors"
                    >
                        <ExternalLink size={18} />
                        Preview
                    </Link>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors disabled:opacity-50"
                    >
                        {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                        Save Changes
                    </button>
                </div>
            </div>

            {message && (
                <div className={`p-4 rounded-lg mb-6 ${message.includes("success") ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"}`}>
                    {message}
                </div>
            )}

            <form className="space-y-8">
                <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 space-y-6">
                    <h2 className="text-xl font-semibold text-white border-b border-neutral-800 pb-4">Main Typography</h2>

                    <div className="grid grid-cols-1 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-neutral-400 mb-2">Title Line 1 (Gradient)</label>
                            <input
                                type="text"
                                value={hero.titleLine1 || ""}
                                onChange={(e) => handleChange("titleLine1", e.target.value)}
                                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-4xl font-bold font-display"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-neutral-400 mb-2">Title Line 2 (Colored)</label>
                            <input
                                type="text"
                                value={hero.titleLine2 || ""}
                                onChange={(e) => handleChange("titleLine2", e.target.value)}
                                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-4xl font-bold font-display"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-neutral-400 mb-2">Subtitle</label>
                            <textarea
                                value={hero.subtitle || ""}
                                onChange={(e) => handleChange("subtitle", e.target.value)}
                                className="w-full h-24 bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 leading-relaxed resize-none"
                            />
                        </div>

                        <div>
                            <ImageUpload
                                label="Background Image"
                                value={hero.backgroundImageUrl || ""}
                                onChange={(url) => handleChange("backgroundImageUrl", url)}
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 space-y-6">
                    <h2 className="text-xl font-semibold text-white border-b border-neutral-800 pb-4">Call to Action</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-neutral-400 mb-2">Button Text</label>
                            <input
                                type="text"
                                value={hero.ctaText || ""}
                                onChange={(e) => handleChange("ctaText", e.target.value)}
                                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-neutral-400 mb-2">Button Link</label>
                            <input
                                type="text"
                                value={hero.ctaLink || ""}
                                onChange={(e) => handleChange("ctaLink", e.target.value)}
                                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 space-y-6">
                    <h2 className="text-xl font-semibold text-white border-b border-neutral-800 pb-4">Configuration</h2>
                    <div className="flex items-center gap-4">
                        <div
                            className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${hero.isActive ? "bg-green-600" : "bg-neutral-800"}`}
                            onClick={() => handleChange("isActive", !hero.isActive)}
                        >
                            <div className={`w-4 h-4 bg-white rounded-full transition-transform ${hero.isActive ? "translate-x-6" : ""}`} />
                        </div>
                        <span className="text-neutral-300 text-sm">Section Visible</span>
                    </div>
                </div>
            </form >
        </div >
    );
}
