
"use client";

import { useEffect, useState } from "react";
import { getMessages, markMessageAsRead, deleteMessage } from "@/app/actions/contact";
import { Loader2, Trash2, MailOpen, Mail } from "lucide-react";

export default function MessagesPage() {
    const [messages, setMessages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const loadMessages = async () => {
        const data = await getMessages();
        setMessages(data);
        setLoading(false);
    };

    useEffect(() => {
        loadMessages();
    }, []);

    const handleMarkRead = async (id: string) => {
        await markMessageAsRead(id);
        loadMessages();
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this message?")) {
            await deleteMessage(id);
            loadMessages();
        }
    };

    if (loading) return <div className="text-white p-8">Loading messages...</div>;

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Inbox</h1>
                <p className="text-neutral-400">View messages from the community.</p>
            </div>

            <div className="space-y-4">
                {messages.length === 0 ? (
                    <div className="text-neutral-500 italic">No messages yet.</div>
                ) : (
                    messages.map((msg) => (
                        <div
                            key={msg._id}
                            className={`p-6 rounded-xl border transition-all ${msg.read ? 'bg-neutral-900/50 border-neutral-800 opacity-70' : 'bg-neutral-900 border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.1)]'}`}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-lg font-semibold text-white">{msg.name}</h3>
                                    <a href={`mailto:${msg.email}`} className="text-indigo-400 hover:text-indigo-300 text-sm">{msg.email}</a>
                                </div>
                                <div className="text-xs text-neutral-500">
                                    {new Date(msg.createdAt).toLocaleDateString()} at {new Date(msg.createdAt).toLocaleTimeString()}
                                </div>
                            </div>

                            <p className="text-neutral-300 whitespace-pre-wrap mb-6 bg-black/20 p-4 rounded-lg text-sm leading-relaxed font-mono">
                                {msg.message}
                            </p>

                            <div className="flex justify-end gap-3">
                                {!msg.read && (
                                    <button
                                        onClick={() => handleMarkRead(msg._id)}
                                        className="flex items-center gap-2 px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg text-xs transition-colors"
                                    >
                                        <MailOpen size={14} /> Mark Read
                                    </button>
                                )}
                                <button
                                    onClick={() => handleDelete(msg._id)}
                                    className="flex items-center gap-2 px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg text-xs transition-colors"
                                >
                                    <Trash2 size={14} /> Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
