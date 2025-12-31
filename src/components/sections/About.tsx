"use client";

import { motion } from "framer-motion";
import { Info, Zap } from "lucide-react";
import { IAboutSection } from "@/models/AboutSection";

export default function About({ data }: { data: IAboutSection }) {
    if (!data?.isActive) return null;

    return (
        <section id="about" className="py-32 relative">
            <div className="container mx-auto px-6 relative z-10">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Main Image Column */}
                    {data.mainImageUrl && (
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <div className="aspect-[4/3] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl relative group">
                                <div className="absolute inset-0 bg-indigo-500/10 group-hover:bg-transparent transition-colors z-10" />
                                <img
                                    src={data.mainImageUrl}
                                    alt="About VisionX"
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                            {/* Decorative elements behind image */}
                            <div className="absolute -top-10 -left-10 w-40 h-40 bg-orange-500/20 rounded-full blur-3xl -z-10" />
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl -z-10" />
                        </motion.div>
                    )}

                    {/* Cards Column */}
                    <div className={`flex flex-col gap-8 ${!data.mainImageUrl ? 'lg:col-span-2 lg:flex-row' : ''}`}>
                        {/* MMC Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="flex-1 glass-card p-10 rounded-[2.5rem] relative overflow-hidden group hover:bg-white/5 transition-colors"
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] -mr-32 -mt-32 transition-all group-hover:bg-indigo-500/20" />

                            <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-sm text-indigo-300 overflow-hidden">
                                {data.mmcCard.logoUrl ? (
                                    <img src={data.mmcCard.logoUrl} alt="MMC Logo" className="w-full h-full object-cover" />
                                ) : (
                                    <img src="/logo.png" alt="MMC Logo" className="w-full h-full object-contain p-4 opacity-50" />
                                )}
                            </div>

                            <h3 className="text-3xl font-bold font-display text-white mb-6 pr-10">{data.mmcCard.title}</h3>
                            <p className="text-indigo-100/70 leading-relaxed text-lg font-sans">
                                {data.mmcCard.description}
                            </p>
                        </motion.div>

                        {/* VisionX Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="flex-1 glass-card p-10 rounded-[2.5rem] relative overflow-hidden group hover:bg-white/5 transition-colors"
                        >
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px] -ml-32 -mb-32 transition-all group-hover:bg-orange-500/20" />

                            <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-sm text-orange-300 overflow-hidden">
                                {data.visionxCard.logoUrl ? (
                                    <img src={data.visionxCard.logoUrl} alt="VisionX Logo" className="w-full h-full object-cover" />
                                ) : (
                                    <img src="/logo.png" alt="VisionX Logo" className="w-full h-full object-contain p-4 opacity-50" />
                                )}
                            </div>

                            <h3 className="text-3xl font-bold font-display text-white mb-6 pr-10">{data.visionxCard.title}</h3>
                            <p className="text-indigo-100/70 leading-relaxed text-lg font-sans">
                                {data.visionxCard.description}
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
