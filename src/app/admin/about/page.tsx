"use client";

import { useEffect, useState } from "react";
import { getAboutSection, updateAboutSection } from "@/app/actions/about";
import { Loader2, Save, ExternalLink } from "lucide-react";
import Link from "next/link";
import ImageUpload from "@/components/ui/ImageUpload";

export default function AboutManagerPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [about, setAbout] = useState<any>(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        getAboutSection().then((data) => {
            setAbout(data);
            setLoading(false);
        });
    }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setMessage("");

        try {
            await updateAboutSection(about);
            setMessage("About section updated successfully.");
        } catch (error) {
            setMessage("Failed to update about section.");
        } finally {
            setSaving(false);
        }
    };

    const handleCardChange = (card: 'mmcCard' | 'visionxCard', field: string, value: string) => {
        setAbout((prev: any) => ({
            ...prev,
            [card]: {
                ...prev[card],
                [field]: value
            }
        }));
    };

    const handleChange = (field: string, value: any) => {
        setAbout((prev: any) => ({ ...prev, [field]: value }));
    };

    if (loading) return <div className="text-white p-8">Loading content...</div>;

    return (
        <div className="max-w-4xl">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">About Section Manager</h1>
                    <p className="text-neutral-400">Tell the story of MMC and VisionX.</p>
                </div>
                <div className="flex gap-4">
                    <Link
                        href="/#about"
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
                {/* General Settings */}
                <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 space-y-6">
                    <h2 className="text-xl font-semibold text-white border-b border-neutral-800 pb-4">General Settings</h2>
                    <ImageUpload
                        label="Main Section Image"
                        value={about.mainImageUrl || ""}
                        onChange={(url) => handleChange("mainImageUrl", url)}
                    />
                </div>

                {/* MMC Card */}
                <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 space-y-6">
                    <h2 className="text-xl font-semibold text-white border-b border-neutral-800 pb-4">MMC Details</h2>

                    <div className="grid grid-cols-1 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-neutral-400 mb-2">Title</label>
                            <input
                                type="text"
                                value={about.mmcCard.title || ""}
                                onChange={(e) => handleCardChange("mmcCard", "title", e.target.value)}
                                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-neutral-400 mb-2">Description</label>
                            <textarea
                                value={about.mmcCard.description || ""}
                                onChange={(e) => handleCardChange("mmcCard", "description", e.target.value)}
                                className="w-full h-32 bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none text-sm"
                            />
                        </div>
                        <ImageUpload
                            label="MMC Logo"
                            value={about.mmcCard.logoUrl || ""}
                            onChange={(url) => handleCardChange("mmcCard", "logoUrl", url)}
                        />
                    </div>
                </div>

                {/* VisionX Card */}
                <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 space-y-6">
                    <h2 className="text-xl font-semibold text-white border-b border-neutral-800 pb-4">VisionX Details</h2>

                    <div className="grid grid-cols-1 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-neutral-400 mb-2">Title</label>
                            <input
                                type="text"
                                value={about.visionxCard.title || ""}
                                onChange={(e) => handleCardChange("visionxCard", "title", e.target.value)}
                                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-neutral-400 mb-2">Description</label>
                            <textarea
                                value={about.visionxCard.description || ""}
                                onChange={(e) => handleCardChange("visionxCard", "description", e.target.value)}
                                className="w-full h-32 bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none text-sm"
                            />
                        </div>
                        <ImageUpload
                            label="VisionX Logo"
                            value={about.visionxCard.logoUrl || ""}
                            onChange={(url) => handleCardChange("visionxCard", "logoUrl", url)}
                        />
                    </div>
                </div>
            </form>
        </div>
    );
}
