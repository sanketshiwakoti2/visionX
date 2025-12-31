"use client";

import { useEffect, useState } from "react";
import { getGallery, createGalleryImage, deleteGalleryImage } from "@/app/actions/content";
import AdminList from "@/components/admin/AdminList";
import { X } from "lucide-react";
import ImageUpload from "@/components/ui/ImageUpload";

export default function GalleryManager() {
    const [items, setItems] = useState<any[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [newItem, setNewItem] = useState({ imageUrl: "", caption: "" });

    const refresh = async () => setItems(await getGallery());
    useEffect(() => { refresh(); }, []);

    const handleAdd = async () => {
        await createGalleryImage(newItem);
        setShowModal(false);
        refresh();
    };

    return (
        <>
            <AdminList
                title="Gallery Manager"
                items={items}
                onAdd={() => setShowModal(true)}
                onDelete={async (id) => { if (confirm("Delete Image?")) { await deleteGalleryImage(id); refresh(); } }}
                renderItem={(item) => (
                    <div className="flex items-center gap-4">
                        <img src={item.imageUrl} alt={item.caption} className="h-16 w-24 object-cover rounded" />
                        <p className="text-neutral-400 text-sm">{item.caption || "No caption"}</p>
                    </div>
                )}
            />

            {showModal && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 w-full max-w-md">
                        <div className="flex justify-between mb-4">
                            <h2 className="text-xl font-bold text-white">Add Image</h2>
                            <button onClick={() => setShowModal(false)}><X className="text-white" /></button>
                        </div>
                        <div className="space-y-4">
                            <ImageUpload
                                label="Gallery Image"
                                value={newItem.imageUrl}
                                onChange={(url) => setNewItem({ ...newItem, imageUrl: url })}
                            />

                            <input className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-white" placeholder="Caption" value={newItem.caption} onChange={e => setNewItem({ ...newItem, caption: e.target.value })} />
                            <button onClick={handleAdd} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg">Add to Gallery</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
