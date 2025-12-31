"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { ITestimonial } from "@/models/Content";

export default function Testimonials({ testimonials }: { testimonials: ITestimonial[] }) {
    if (!testimonials || testimonials.length === 0) return null;

    return (
        <section id="testimonials" className="py-32">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl md:text-4xl font-bold font-display text-center text-white mb-20">
                    Voices of the <span className="text-purple-400">Community</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((t, index) => (
                        <motion.div
                            key={t._id as string}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-card p-10 rounded-[2.5rem] relative group hover:bg-white/10 transition-colors"
                        >
                            <Quote className="absolute top-8 right-8 text-white/10 w-12 h-12" />

                            <p className="text-indigo-100/80 leading-relaxed mb-8 relative z-10 text-lg font-sans italic">"{t.quote}"</p>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center text-white font-bold text-lg shadow-lg overflow-hidden">
                                    {t.photoUrl ? (
                                        <img src={t.photoUrl} alt={t.name} className="w-full h-full object-cover" />
                                    ) : (
                                        t.name.charAt(0)
                                    )}
                                </div>
                                <div>
                                    <h4 className="font-bold text-white font-display">{t.name}</h4>
                                    <p className="text-xs text-indigo-300 font-bold uppercase tracking-wider">{t.role} • {t.year}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
