"use client";

import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { ITrack } from "@/models/Track";

export default function Tracks({ tracks }: { tracks: ITrack[] }) {
    if (!tracks || tracks.length === 0) return null;

    return (
        <section id="tracks" className="py-32 relative">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <span className="text-orange-400 font-bold tracking-widest uppercase text-sm mb-4 block">Choose Your Path</span>
                    <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">
                        Themes of <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Creation</span>
                    </h2>
                </motion.div>

                <div className="flex flex-wrap justify-center gap-8">
                    {tracks.map((track, index) => {
                        // Helper to find icon case-insensitively
                        const findIcon = (name: string) => {
                            if (!name) return LucideIcons.Cpu;
                            const pascalName = name.charAt(0).toUpperCase() + name.slice(1);
                            // Try exact, PascalCase, or PascalCase + "Icon"
                            return (LucideIcons as any)[name] ||
                                (LucideIcons as any)[pascalName] ||
                                (LucideIcons as any)[pascalName + "Icon"] ||
                                LucideIcons.Cpu;
                        };

                        const IconComponent = findIcon(track.icon);

                        return (
                            <motion.div
                                key={String(track._id)}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -10 }}
                                className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-[2rem] hover:bg-white/10 transition-colors w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] flex flex-col items-center text-center group"
                            >
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform overflow-hidden">
                                    {track.imageUrl ? (
                                        <img src={track.imageUrl} alt={track.title} className="w-full h-full object-cover" />
                                    ) : (
                                        <IconComponent size={36} className="text-indigo-300 group-hover:text-white transition-colors" />
                                    )}
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-3 font-display">{track.title}</h3>
                                <p className="text-indigo-100/60 text-sm leading-relaxed mb-8 flex-grow">
                                    {track.description}
                                </p>

                                <div className="px-4 py-2 bg-white/5 rounded-full border border-white/5 text-sm font-medium text-orange-300">
                                    Prize: {track.prizeAmount}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
