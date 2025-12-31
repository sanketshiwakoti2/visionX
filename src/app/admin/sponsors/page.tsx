"use client";

import { useEffect, useState } from "react";
import { getSponsors, createSponsor, deleteSponsor } from "@/app/actions/content";
import AdminList from "@/components/admin/AdminList";
import { X } from "lucide-react";
import ImageUpload from "@/components/ui/ImageUpload";

export default function SponsorsManager() {
    const [items, setItems] = useState<any[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [newItem, setNewItem] = useState({ name: "", logoUrl: "https://placehold.co/200x100?text=Logo", websiteUrl: "", tier: "Partner" });

    const refresh = async () => setItems(await getSponsors());
    useEffect(() => { refresh(); }, []);

    const handleAdd = async () => {
        await createSponsor(newItem);
        setShowModal(false);
        refresh();
    };

    return (
        <>
            <AdminList
                title="Sponsors Manager"
                items={items}
                onAdd={() => setShowModal(true)}
                onDelete={async (id) => { if (confirm("Del?")) { await deleteSponsor(id); refresh(); } }}
                renderItem={(item) => (
                    <div className="flex items-center gap-4">
                        <img src={item.logoUrl} alt={item.name} className="h-10 w-auto rounded object-contain bg-white/5 p-1" />
                        <div>
                            <h3 className="text-white font-medium">{item.name}</h3>
                            <span className="text-xs text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">{item.tier}</span>
                        </div>
                    </div>
                )}
            />

            {showModal && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 w-full max-w-md">
                        <div className="flex justify-between mb-4">
                            <h2 className="text-xl font-bold text-white">Add Sponsor</h2>
                            <button onClick={() => setShowModal(false)}><X className="text-white" /></button>
                        </div>
                        <div className="space-y-4">
                            <input className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-white" placeholder="Name" value={newItem.name} onChange={e => setNewItem({ ...newItem, name: e.target.value })} />

                            <ImageUpload
                                label="Logo"
                                value={newItem.logoUrl}
                                onChange={(url) => setNewItem({ ...newItem, logoUrl: url })}
                            />

                            <select className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-white" value={newItem.tier} onChange={e => setNewItem({ ...newItem, tier: e.target.value })}>
                                <option value="Diamond">Diamond</option>
                                <option value="Gold">Gold</option>
                                <option value="Silver">Silver</option>
                                <option value="Partner">Partner</option>
                            </select>
                            <button onClick={handleAdd} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg">Save</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
