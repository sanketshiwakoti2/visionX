"use client";

import { useEffect, useState } from "react";
import { getFaqs, createFaq, deleteFaq } from "@/app/actions/content";
import AdminList from "@/components/admin/AdminList";
import { X } from "lucide-react";

export default function FaqManager() {
    const [items, setItems] = useState<any[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [newItem, setNewItem] = useState({ question: "", answer: "" });

    const refresh = async () => setItems(await getFaqs());
    useEffect(() => { refresh(); }, []);

    const handleAdd = async () => {
        await createFaq(newItem);
        setShowModal(false);
        refresh();
    };

    return (
        <>
            <AdminList
                title="FAQ Manager"
                items={items}
                onAdd={() => setShowModal(true)}
                onDelete={async (id) => { if (confirm("Delete FAQ?")) { await deleteFaq(id); refresh(); } }}
                renderItem={(item) => (
                    <div>
                        <h3 className="text-white font-medium">{item.question}</h3>
                        <p className="text-neutral-500 text-sm truncate">{item.answer}</p>
                    </div>
                )}
            />

            {showModal && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 w-full max-w-lg">
                        <div className="flex justify-between mb-4">
                            <h2 className="text-xl font-bold text-white">Add FAQ</h2>
                            <button onClick={() => setShowModal(false)}><X className="text-white" /></button>
                        </div>
                        <div className="space-y-4">
                            <input className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-white" placeholder="Question" value={newItem.question} onChange={e => setNewItem({ ...newItem, question: e.target.value })} />
                            <textarea className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-white h-24" placeholder="Answer" value={newItem.answer} onChange={e => setNewItem({ ...newItem, answer: e.target.value })} />
                            <button onClick={handleAdd} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg">Save FAQ</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
