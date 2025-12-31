"use client";

import { useState } from "react";
import { Plus, Trash2, Edit2 } from "lucide-react";

interface AdminListProps {
    title: string;
    items: any[];
    onAdd: () => void;
    onDelete: (id: string) => void;
    renderItem: (item: any) => React.ReactNode;
    emptyMessage?: string;
}

export default function AdminList({ title, items, onAdd, onDelete, renderItem, emptyMessage }: AdminListProps) {
    return (
        <div className="max-w-4xl">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-white">{title}</h1>
                <button
                    onClick={onAdd}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
                >
                    <Plus size={18} /> Add New
                </button>
            </div>

            <div className="space-y-4">
                {items.map((item) => (
                    <div key={item._id} className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl flex items-center justify-between group">
                        <div className="flex-1">{renderItem(item)}</div>
                        <button
                            onClick={() => onDelete(item._id)}
                            className="ml-4 p-2 hover:bg-red-500/10 text-neutral-400 hover:text-red-400 rounded-lg transition-colors"
                            title="Delete"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                ))}
                {items.length === 0 && (
                    <div className="text-center py-12 text-neutral-500">{emptyMessage || "No items found."}</div>
                )}
            </div>
        </div>
    );
}
