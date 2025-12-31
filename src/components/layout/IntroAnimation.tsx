"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function IntroAnimation({ enabled }: { enabled: boolean }) {
    const [show, setShow] = useState(enabled);

    useEffect(() => {
        if (enabled) {
            const timer = setTimeout(() => setShow(false), 2500);
            return () => clearTimeout(timer);
        }
    }, [enabled]);

    if (!show || !enabled) return null;

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
                exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
            >
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative"
                >
                    <h1 className="text-6xl md:text-8xl font-black font-display text-white tracking-tighter">
                        VISION<span className="text-indigo-600">X</span>
                    </h1>
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                        className="h-1 bg-gradient-to-r from-indigo-500 to-orange-500 mt-4"
                    />
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
