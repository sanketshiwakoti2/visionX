"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar({ logoUrl }: { logoUrl?: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setScrolled(window.scrollY > 50);
                    ticking = false;
                });
                ticking = true;
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "About", href: "#about" },
        { name: "Tracks", href: "#tracks" },
        { name: "Prizes", href: "#prizes" },
        { name: "Community", href: "#sponsors" },
        { name: "FAQ", href: "#faq" },
    ];

    return (
        <div className="fixed top-0 left-0 w-full z-50 flex justify-center pt-4 px-4 pointer-events-none">
            <nav
                className={`pointer-events-auto transition-all duration-500 ease-in-out ${scrolled
                    ? "w-full max-w-5xl rounded-full glass-card py-3 px-6 backdrop-blur-xl bg-black/40 border border-white/10"
                    : "w-full max-w-7xl py-4 px-6"
                    }`}
            >
                <div className="flex items-center justify-between">
                    <Link href="/" className="group">
                        <div className="relative h-16 md:h-20 w-auto aspect-[3/1]">
                            <Image
                                src={logoUrl || "/logo.png"}
                                alt="MMC VisionX"
                                fill
                                className="object-contain object-left transition-transform duration-300 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, 200px"
                                priority
                            />
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="px-4 py-2 text-sm font-medium text-indigo-100 hover:text-white hover:bg-white/10 rounded-full transition-all"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            href="/register"
                            className="ml-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white px-6 py-2 rounded-full font-bold shadow-lg shadow-indigo-900/40 transition-all hover:scale-105"
                        >
                            Join Us
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden text-white w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X /> : <Menu />}
                    </button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -20 }}
                            className="absolute backdrop-blur-2xl top-full left-0 right-0 mt-4 p-4 mx-4 bg-neutral-900/95 border border-white/10 rounded-3xl md:hidden overflow-hidden shadow-2xl"
                        >
                            <div className="flex flex-col gap-2">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className="p-4 rounded-xl text-lg font-medium text-white hover:bg-white/10 text-center transition-colors"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                                <Link
                                    href="/register"
                                    className="bg-gradient-to-r from-orange-500 to-rose-500 w-full text-center py-4 rounded-xl font-bold mt-2 shadow-lg transition-transform active:scale-95"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Register Now
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </div>
    );
}
