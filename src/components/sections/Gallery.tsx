"use client";

import { motion } from "framer-motion";
import { IGalleryImage } from "@/models/Content";

export default function Gallery({ images }: { images: IGalleryImage[] }) {
    if (!images || images.length === 0) return null;

    return (
        <section id="gallery" className="py-32 overflow-hidden">
            <div className="container mx-auto px-6 mb-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold font-display text-white mb-4">
                    Shared <span className="text-orange-400">Memories</span>
                </h2>
            </div>

            {/* Marquee Effect */}
            <div className="flex gap-8 overflow-hidden py-8">
                <motion.div
                    animate={{ x: "-50%" }}
                    transition={{ duration: 40, ease: "linear", repeat: Infinity }}
                    className="flex gap-8 min-w-max px-4"
                >
                    {[...images, ...images].map((img, i) => (
                        <div key={`${img._id}-${i}`} className="relative group w-[28rem] h-[20rem] rounded-[2rem] overflow-hidden flex-shrink-0 border-4 border-white/5 shadow-2xl">
                            <img
                                src={img.imageUrl}
                                alt={img.caption || "Gallery Image"}
                                className="w-full h-full object-cover transition-all duration-700 transform group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8 opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="text-white font-medium font-display">{img.caption}</span>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
