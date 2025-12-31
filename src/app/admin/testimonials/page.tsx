"use client";

import { useEffect, useState } from "react";
import { getTestimonials, createTestimonial, deleteTestimonial } from "@/app/actions/content";
import AdminList from "@/components/admin/AdminList";
import { X } from "lucide-react";
import ImageUpload from "@/components/ui/ImageUpload";

export default function TestimonialsManager() {
    const [items, setItems] = useState<any[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [newItem, setNewItem] = useState({ name: "", role: "", year: "2024", quote: "", photoUrl: "" });

    const refresh = async () => setItems(await getTestimonials());
    useEffect(() => { refresh(); }, []);

    const handleAdd = async () => {
        await createTestimonial(newItem);
        setShowModal(false);
        refresh();
    };

    return (
        <>
            <AdminList
                title="Testimonials Manager"
                items={items}
                onAdd={() => setShowModal(true)}
                onDelete={async (id) => { if (confirm("Delete?")) { await deleteTestimonial(id); refresh(); } }}
                renderItem={(item) => (
                    <div className="flex items-center gap-4">
                        {item.photoUrl && (
                            <img src={item.photoUrl} alt={item.name} className="w-10 h-10 rounded-full object-cover" />
                        )}
                        <div>
                            <h3 className="text-white font-medium">{item.name} <span className="text-neutral-500 text-sm">({item.year})</span></h3>
                            <p className="text-indigo-400 text-xs mb-1">{item.role}</p>
                            <p className="text-neutral-500 text-sm italic">"{item.quote}"</p>
                        </div>
                    </div>
                )}
            />

            {showModal && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 w-full max-w-md">
                        <div className="flex justify-between mb-4">
                            <h2 className="text-xl font-bold text-white">Add Testimonial</h2>
                            <button onClick={() => setShowModal(false)}><X className="text-white" /></button>
                        </div>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <input className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-white" placeholder="Name" value={newItem.name} onChange={e => setNewItem({ ...newItem, name: e.target.value })} />
                                <input className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-white" placeholder="Year" value={newItem.year} onChange={e => setNewItem({ ...newItem, year: e.target.value })} />
                            </div>
                            <input className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-white" placeholder="Role (e.g. Winner)" value={newItem.role} onChange={e => setNewItem({ ...newItem, role: e.target.value })} />

                            <ImageUpload
                                label="Photo (Optional)"
                                value={newItem.photoUrl}
                                onChange={(url) => setNewItem({ ...newItem, photoUrl: url })}
                            />

                            <textarea className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-white h-24" placeholder="Quote" value={newItem.quote} onChange={e => setNewItem({ ...newItem, quote: e.target.value })} />
                            <button onClick={handleAdd} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg">Save</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
