"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Lock, Loader2 } from "lucide-react";

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (res?.error) {
                setError("Invalid credentials or access denied.");
            } else {
                router.push("/admin/dashboard");
            }
        } catch (err) {
            setError("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl p-8 shadow-2xl">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center mb-4 text-white">
                        <Lock size={24} />
                    </div>
                    <h1 className="text-2xl font-bold text-white">VisionX Control Room</h1>
                    <p className="text-neutral-400 text-sm mt-1">Authorized Personnel Only</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-neutral-300 mb-2">Email Access ID</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                            placeholder="admin@visionx.org"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-neutral-300 mb-2">Security Key</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-lg text-center">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? <Loader2 className="animate-spin" size={20} /> : "Authenticate"}
                    </button>
                </form>
            </div>
        </div>
    );
}
