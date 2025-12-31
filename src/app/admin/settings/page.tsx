"use client";

import { useEffect, useState } from "react";
import { getEventSettings, updateEventSettings } from "@/app/actions/settings";
import { Loader2, Save } from "lucide-react";
import ImageUpload from "@/components/ui/ImageUpload";

export default function SettingsPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [settings, setSettings] = useState<any>(null); // Use proper type normally
    const [message, setMessage] = useState("");

    useEffect(() => {
        getEventSettings().then((data) => {
            setSettings(data);
            setLoading(false);
        });
    }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setMessage("");

        try {
            await updateEventSettings(settings);
            setMessage("Settings saved successfully.");
        } catch (error) {
            setMessage("Failed to save settings.");
        } finally {
            setSaving(false);
        }
    };

    const handleChange = (field: string, value: any) => {
        setSettings((prev: any) => ({ ...prev, [field]: value }));
    };

    const handleSocialChange = (platform: string, value: string) => {
        setSettings((prev: any) => ({
            ...prev,
            socialLinks: { ...prev.socialLinks, [platform]: value }
        }));
    };

    if (loading) return <div className="text-white p-8">Loading settings...</div>;

    return (
        <div className="max-w-4xl">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Global Settings</h1>
                    <p className="text-neutral-400">Configure core event details.</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors disabled:opacity-50"
                >
                    {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                    Save Changes
                </button>
            </div>

            {message && (
                <div className={`p-4 rounded-lg mb-6 ${message.includes("success") ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"}`}>
                    {message}
                </div>
            )}

            <form className="space-y-8">
                {/* Core Info */}
                <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 space-y-6">
                    <h2 className="text-xl font-semibold text-white border-b border-neutral-800 pb-4">Event Identity</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-neutral-400 mb-2">Event Name</label>
                            <input
                                type="text"
                                value={settings.eventName || ""}
                                onChange={(e) => handleChange("eventName", e.target.value)}
                                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                            />
                        </div>
                        <div>
                            <ImageUpload
                                label="Logo (Cloudinary)"
                                value={settings.logoUrl || ""}
                                onChange={(url) => handleChange("logoUrl", url)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-neutral-400 mb-2">Venue</label>
                            <input
                                type="text"
                                value={settings.venue || ""}
                                onChange={(e) => handleChange("venue", e.target.value)}
                                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-neutral-400 mb-2">Start Date</label>
                            <input
                                type="datetime-local"
                                value={settings.startDate ? new Date(settings.startDate).toISOString().slice(0, 16) : ""}
                                onChange={(e) => handleChange("startDate", new Date(e.target.value))}
                                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-neutral-400 mb-2">End Date (Optional)</label>
                            <input
                                type="datetime-local"
                                value={settings.endDate ? new Date(settings.endDate).toISOString().slice(0, 16) : ""}
                                onChange={(e) => handleChange("endDate", new Date(e.target.value))}
                                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                            />
                        </div>
                    </div>
                </div>

                {/* Links */}
                <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 space-y-6">
                    <h2 className="text-xl font-semibold text-white border-b border-neutral-800 pb-4">External Links</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-neutral-400 mb-2">Registration Link</label>
                            <input
                                type="url"
                                value={settings.registrationLink || ""}
                                onChange={(e) => handleChange("registrationLink", e.target.value)}
                                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-neutral-400 mb-2">Discord Link</label>
                            <input
                                type="url"
                                value={settings.discordLink || ""}
                                onChange={(e) => handleChange("discordLink", e.target.value)}
                                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-neutral-400 mb-2">Contact Email</label>
                            <input
                                type="email"
                                value={settings.contactEmail || ""}
                                onChange={(e) => handleChange("contactEmail", e.target.value)}
                                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-neutral-400 mb-2">Contact Phone</label>
                            <input
                                type="text"
                                value={settings.contactPhone || settings.adminPhone || ""}
                                onChange={(e) => handleChange("contactPhone", e.target.value)}
                                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-neutral-400 mb-2">Address</label>
                            <input
                                type="text"
                                value={settings.contactAddress || ""}
                                onChange={(e) => handleChange("contactAddress", e.target.value)}
                                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-neutral-400 mb-2">Code of Conduct URL</label>
                            <input
                                type="url"
                                value={settings.codeOfConductUrl || ""}
                                onChange={(e) => handleChange("codeOfConductUrl", e.target.value)}
                                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                                placeholder="https://..."
                            />
                        </div>
                    </div>
                </div>

                {/* Social Media */}
                <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 space-y-6">
                    <h2 className="text-xl font-semibold text-white border-b border-neutral-800 pb-4">Social Media</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-neutral-400 mb-2">Instagram URL</label>
                            <input
                                type="url"
                                value={settings.socialLinks?.instagram || ""}
                                onChange={(e) => handleSocialChange("instagram", e.target.value)}
                                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-neutral-400 mb-2">Twitter (X) URL</label>
                            <input
                                type="url"
                                value={settings.socialLinks?.twitter || ""}
                                onChange={(e) => handleSocialChange("twitter", e.target.value)}
                                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-neutral-400 mb-2">LinkedIn URL</label>
                            <input
                                type="url"
                                value={settings.socialLinks?.linkedin || ""}
                                onChange={(e) => handleSocialChange("linkedin", e.target.value)}
                                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-neutral-400 mb-2">Facebook URL</label>
                            <input
                                type="url"
                                value={settings.socialLinks?.facebook || ""}
                                onChange={(e) => handleSocialChange("facebook", e.target.value)}
                                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                            />
                        </div>
                    </div>
                </div>

                {/* Configuration */}
                <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 space-y-6">
                    <h2 className="text-xl font-semibold text-white border-b border-neutral-800 pb-4">Configuration</h2>

                    <div className="flex items-center gap-4">
                        <div
                            className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${settings.enableIntroAnimation ? "bg-indigo-600" : "bg-neutral-800"}`}
                            onClick={() => handleChange("enableIntroAnimation", !settings.enableIntroAnimation)}
                        >
                            <div className={`w-4 h-4 bg-white rounded-full transition-transform ${settings.enableIntroAnimation ? "translate-x-6" : ""}`} />
                        </div>
                        <span className="text-neutral-300 text-sm">Enable Intro Animation</span>
                    </div>
                </div>
            </form>
        </div>
    );
}
