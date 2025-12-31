"use client";

import { useState } from "react";
import { Loader2, Upload, X, Image as ImageIcon } from "lucide-react";

interface ImageUploadProps {
    value?: string;
    onChange: (url: string) => void;
    label: string;
}

export default function ImageUpload({ value, onChange, label }: ImageUploadProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setLoading(true);
        setError("");

        try {
            const formData = new FormData();
            formData.append("file", file);

            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.error || "Upload failed");

            onChange(data.secure_url);
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const handleRemove = () => {
        onChange("");
    };

    return (
        <div className="w-full">
            <label className="block text-sm font-medium text-neutral-400 mb-2">{label}</label>

            <div className="flex flex-col gap-4">
                {/* Preview Area */}
                {value ? (
                    <div className="relative w-full max-w-sm aspect-video bg-neutral-900 rounded-lg overflow-hidden border border-neutral-800 group">
                        <img src={value} alt="Preview" className="w-full h-full object-cover" />
                        <button
                            type="button"
                            onClick={handleRemove}
                            className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                        >
                            <X size={16} />
                        </button>
                    </div>
                ) : (
                    <div className="w-full max-w-sm aspect-video bg-neutral-900/50 border-2 border-dashed border-neutral-800 rounded-lg flex flex-col items-center justify-center text-neutral-500">
                        <ImageIcon size={48} className="mb-2 opacity-50" />
                        <span className="text-sm">No image selected</span>
                    </div>
                )}

                {/* Upload Button/Input */}
                <div className="relative">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleUpload}
                        disabled={loading}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                    />
                    <button
                        type="button"
                        disabled={loading}
                        className={`w-full max-w-sm flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-neutral-700 bg-neutral-800 hover:bg-neutral-700 text-white transition-colors ${loading ? "opacity-50" : ""}`}
                    >
                        {loading ? <Loader2 size={18} className="animate-spin" /> : <Upload size={18} />}
                        {loading ? "Uploading..." : "Upload Image"}
                    </button>
                </div>

                {error && <p className="text-red-400 text-sm">{error}</p>}
            </div>
        </div>
    );
}
