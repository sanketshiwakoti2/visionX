
"use client";

import { useEffect, useState } from "react";
import { getPrizes, createPrize, updatePrize, deletePrize } from "@/app/actions/prizes";
import { Plus, Edit2, Trash2, Loader2, Trophy, DollarSign, GripVertical } from "lucide-react";
import * as LucideIcons from "lucide-react";

export default function PrizesPage() {
    const [prizes, setPrizes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);
    const [newItem, setNewItem] = useState({ title: "", description: "", amount: "", icon: "Trophy", displayOrder: 0 });

    useEffect(() => {
        loadPrizes();
    }, []);

    const loadPrizes = async () => {
        setLoading(true);
        const data = await getPrizes();
        setPrizes(data);
        setLoading(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (editingItem) {
            await updatePrize(editingItem._id, newItem);
        } else {
            await createPrize(newItem);
        }

        setIsModalOpen(false);
        setNewItem({ title: "", description: "", amount: "", icon: "Trophy", displayOrder: 0 });
        setEditingItem(null);
        loadPrizes();
    };

    const handleEdit = (item: any) => {
        setEditingItem(item);
        setNewItem(item);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this prize?")) {
            await deletePrize(id);
            loadPrizes();
        }
    };

    const availableIcons = ["Trophy", "Medal", "Award", "Star", "Crown", "Gift", "Zap", "Target", "Users"];

    if (loading && !isModalOpen) return <div className="text-white p-8">Loading prizes...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Prizes & Awards</h1>
                    <p className="text-neutral-400">Manage accolades for winners.</p>
                </div>
                <button
                    onClick={() => {
                        setEditingItem(null);
                        setNewItem({ title: "", description: "", amount: "", icon: "Trophy", displayOrder: 0 });
                        setIsModalOpen(true);
                    }}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                    <Plus size={18} /> Add Prize
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {prizes.map((prize) => {
                    // @ts-ignore
                    const IconComponent = LucideIcons[prize.icon] || LucideIcons.Trophy;

                    return (
                        <div key={prize._id} className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 relative group">
                            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => handleEdit(prize)} className="p-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-white">
                                    <Edit2 size={16} />
                                </button>
                                <button onClick={() => handleDelete(prize._id)} className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg">
                                    <Trash2 size={16} />
                                </button>
                            </div>

                            <div className="flex items-start justify-between mb-4">
                                <div className="p-3 bg-yellow-500/10 rounded-xl text-yellow-500">
                                    <IconComponent size={32} />
                                </div>
                                <span className="px-3 py-1 bg-neutral-800 rounded-full text-xs text-neutral-400 font-mono">
                                    {prize.displayOrder}
                                </span>
                            </div>

                            <h3 className="text-xl font-bold text-white mb-1">{prize.title}</h3>
                            <div className="text-indigo-400 font-bold mb-4 flex items-center gap-1">
                                <DollarSign size={16} /> {prize.amount}
                            </div>
                            <p className="text-neutral-400 text-sm leading-relaxed">{prize.description}</p>
                        </div>
                    );
                })}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-neutral-900 border border-neutral-800 w-full max-w-md rounded-2xl p-6">
                        <h2 className="text-xl font-bold text-white mb-6">{editingItem ? "Edit Prize" : "New Prize"}</h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm text-neutral-400 mb-1">Title</label>
                                <input
                                    type="text"
                                    value={newItem.title}
                                    onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-neutral-400 mb-1">Prize Amount</label>
                                <input
                                    type="text"
                                    value={newItem.amount}
                                    onChange={(e) => setNewItem({ ...newItem, amount: e.target.value })}
                                    placeholder="e.g. RS. 50,000 or MacBook Pro"
                                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-neutral-400 mb-1">Description</label>
                                <textarea
                                    value={newItem.description}
                                    onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                                    rows={3}
                                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm resize-none"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-neutral-400 mb-1">Icon</label>
                                    <select
                                        value={newItem.icon}
                                        onChange={(e) => setNewItem({ ...newItem, icon: e.target.value })}
                                        className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                                    >
                                        {availableIcons.map(icon => <option key={icon} value={icon}>{icon}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm text-neutral-400 mb-1">Display Order</label>
                                    <input
                                        type="number"
                                        value={newItem.displayOrder}
                                        onChange={(e) => setNewItem({ ...newItem, displayOrder: parseInt(e.target.value) })}
                                        className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 px-4 py-3 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg font-medium transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
                                >
                                    {editingItem ? "Update Prize" : "Create Prize"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
