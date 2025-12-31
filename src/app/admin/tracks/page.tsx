"use client";

import { useEffect, useState } from "react";
import { getTracks, createTrack, updateTrack, deleteTrack } from "@/app/actions/tracks";
import { Loader2, Plus, Trash2, Edit2, GripVertical, Save, X } from "lucide-react";
import ImageUpload from "@/components/ui/ImageUpload";

export default function TracksManagerPage() {
    const [loading, setLoading] = useState(true);
    const [tracks, setTracks] = useState<any[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentTrack, setCurrentTrack] = useState<any>({});

    const refresh = async () => {
        const data = await getTracks();
        setTracks(data);
        setLoading(false);
    };

    useEffect(() => { refresh(); }, []);

    const handleCreate = () => {
        setCurrentTrack({ title: "", description: "", icon: "Cpu", prizeAmount: "TBA", isActive: true, displayOrder: tracks.length });
        setIsEditing(true);
    };

    const handleEdit = (track: any) => {
        setCurrentTrack(track);
        setIsEditing(true);
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this track?")) {
            await deleteTrack(id);
            refresh();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (currentTrack._id) {
            await updateTrack(currentTrack._id, currentTrack);
        } else {
            await createTrack(currentTrack);
        }
        setIsEditing(false);
        refresh();
    };

    if (loading) return <div className="text-white p-8">Loading tracks...</div>;

    return (
        <div className="max-w-5xl">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Tracks Manager</h1>
                    <p className="text-neutral-400">Define the hackathon themes.</p>
                </div>
                <button
                    onClick={handleCreate}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                    <Plus size={18} />
                    Add Track
                </button>
            </div>

            {isEditing && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 w-full max-w-lg">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-white">{currentTrack._id ? "Edit Track" : "New Track"}</h2>
                            <button onClick={() => setIsEditing(false)} className="text-neutral-400 hover:text-white"><X /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm text-neutral-400 mb-1">Track Title</label>
                                <input className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-white" value={currentTrack.title} onChange={e => setCurrentTrack({ ...currentTrack, title: e.target.value })} required />
                            </div>
                            <div>
                                <label className="block text-sm text-neutral-400 mb-1">Description</label>
                                <textarea className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-white h-24" value={currentTrack.description} onChange={e => setCurrentTrack({ ...currentTrack, description: e.target.value })} required />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-neutral-400 mb-1">Icon Name (Lucide)</label>
                                    <input className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-white" value={currentTrack.icon} onChange={e => setCurrentTrack({ ...currentTrack, icon: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-sm text-neutral-400 mb-1">Prize Amount</label>
                                    <input className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-white" value={currentTrack.prizeAmount} onChange={e => setCurrentTrack({ ...currentTrack, prizeAmount: e.target.value })} />
                                </div>
                            </div>
                            <div>
                                <ImageUpload
                                    label="Track Image (Optional)"
                                    value={currentTrack.imageUrl || ""}
                                    onChange={(url) => setCurrentTrack({ ...currentTrack, imageUrl: url })}
                                />
                            </div>
                            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium">Save Track</button>
                        </form>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 gap-4">
                {tracks.map((track) => (
                    <div key={track._id} className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl flex items-center justify-between group">
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-neutral-800 rounded text-neutral-400">
                                <GripVertical size={20} />
                            </div>
                            <div>
                                <h3 className="text-white font-medium">{track.title}</h3>
                                <p className="text-neutral-500 text-sm truncate max-w-md">{track.description}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => handleEdit(track)} className="p-2 hover:bg-neutral-800 rounded text-indigo-400"><Edit2 size={18} /></button>
                            <button onClick={() => handleDelete(track._id)} className="p-2 hover:bg-neutral-800 rounded text-red-400"><Trash2 size={18} /></button>
                        </div>
                    </div>
                ))}
                {tracks.length === 0 && <div className="text-center py-12 text-neutral-500">No tracks found. Add one to get started.</div>}
            </div>
        </div>
    );
}
