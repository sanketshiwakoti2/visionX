
"use client";

import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { IPrize } from "@/models/Prize";

export default function Prizes({ prizes }: { prizes: IPrize[] }) {
    if (!prizes || prizes.length === 0) return null;

    return (
        <section id="prizes" className="py-32 relative">
            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-5xl font-bold font-display text-white mb-6">
                        Prizes & <span className="-clip-text ">Awards</span>
                    </h2>
                    <p className="text-indigo-200/60 text-lg max-w-2xl mx-auto">
                        Compete for a prize pool that rewards innovation and execution.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {prizes.map((prize, index) => {
                        // @ts-ignore
                        const IconComponent = LucideIcons[prize.icon] || LucideIcons.Trophy;

                        return (
                            <motion.div
                                key={String(prize._id)}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="glass-card p-10 rounded-3xl text-center group hover:bg-white/5 transition-all hover:-translate-y-2 border border-white/5 hover:border-orange-500/30"
                            >
                                <div className="w-20 h-20 bg-orange-500/10 rounded-2xl flex items-center justify-center mx-auto mb-8 text-white group-hover:scale-110 transition-transform duration-300">
                                    <IconComponent size={40} />
                                </div>

                                <h3 className="text-2xl font-bold font-display text-white mb-2">{prize.title}</h3>
                                <div className="text-3xl font-bold text-[#4c007d] [-webkit-text-stroke:1px_white] shadow-xl mb-6 font-display">{prize.amount}</div>
                                <p className="text-indigo-200/70 leading-relaxed font-sans">
                                    {prize.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
