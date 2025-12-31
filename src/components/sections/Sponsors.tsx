"use client";

import { motion } from "framer-motion";
import { ISponsor } from "@/models/Content";

export default function Sponsors({ sponsors }: { sponsors: ISponsor[] }) {
    if (!sponsors || sponsors.length === 0) return null;

    const tiers = {
        Diamond: sponsors.filter(s => s.tier === 'Diamond'),
        Gold: sponsors.filter(s => s.tier === 'Gold'),
        Silver: sponsors.filter(s => s.tier === 'Silver'),
        Partner: sponsors.filter(s => s.tier === 'Partner'),
    };

    return (
        <section id="sponsors" className="py-24 relative">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-bold font-display text-white mb-16">
                    Supported by <span className="text-orange-400">Visionaries</span>
                </h2>

                {/* Diamond */}
                {tiers.Diamond.length > 0 && (
                    <div className="mb-20">
                        <div className="flex flex-wrap justify-center items-center gap-16">
                            {tiers.Diamond.map((s) => (
                                <motion.div
                                    key={String(s._id)}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    className="p-8 bg-white/5 rounded-3xl backdrop-blur-sm hover:bg-white/10 transition-colors"
                                >
                                    <img src={s.logoUrl} alt={s.name} className="h-20 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Gold & Others */}
                <div className="flex flex-wrap justify-center items-center gap-12">
                    {[...tiers.Gold, ...tiers.Silver, ...tiers.Partner].map((s) => (
                        <motion.img
                            key={String(s._id)}
                            src={s.logoUrl}
                            alt={s.name}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="h-10 md:h-12 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity"
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
