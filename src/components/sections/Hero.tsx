"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, MapPin, Sparkles } from "lucide-react";
import Link from "next/link";
import { IHeroSection } from "@/models/HeroSection";
import { IEventSettings } from "@/models/EventSettings";

interface HeroProps {
    data: IHeroSection;
    settings: IEventSettings;
}

export default function Hero({ data, settings }: HeroProps) {
    if (!data?.isActive) return null;

    return (
        <section className="min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden relative">
            {/* Hero Background Image */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-neutral-950/80 z-10" /> {/* Overlay for readability */}
                <img
                    src={data.backgroundImageUrl || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"}
                    alt="Hero Background"
                    className="w-full h-full object-cover opacity-60"
                />
            </div>

            {/* Organic Blobs Background */}
            <div className="absolute inset-0 pointer-events-none z-10">
                <motion.div
                    animate={{
                        x: [0, 50, -30, 0],
                        y: [0, -30, 50, 0],
                        rotate: [0, 10, -10, 0]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-[100px] opacity-60"
                />
                <motion.div
                    animate={{
                        x: [0, -40, 40, 0],
                        y: [0, 40, -40, 0],
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-orange-500/10 to-rose-500/10 rounded-full blur-[80px] opacity-50"
                />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16">

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex-1 text-center lg:text-left"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/20 text-indigo-200 mb-8 mx-auto lg:mx-0">
                            <Sparkles size={16} className="text-orange-400" />
                            <span className="font-semibold text-sm tracking-wide uppercase">{settings.eventName}</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold font-display leading-[1.1] mb-6">
                            <span className="block text-white">Innovation meets</span>
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-orange-400">
                                {data.titleLine2 || "Human Connection"}
                            </span>
                        </h1>

                        <p className="text-lg text-indigo-100/80 max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed font-sans">
                            {data.subtitle || "Join a community of dreamers and doers. Build technology that matters, together."}
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12">
                            <Link
                                href={data.ctaLink || "/register"}
                                className="px-8 py-4 bg-white text-indigo-950 rounded-full font-bold text-lg shadow-xl shadow-indigo-900/20 hover:scale-105 transition-transform flex items-center gap-2"
                            >
                                {data.ctaText}
                                <ArrowRight size={20} />
                            </Link>
                            <a
                                href={settings.discordLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-8 py-4 glass border border-white/20 text-white rounded-full font-bold text-lg hover:bg-white/10 transition-colors"
                            >
                                Join Community
                            </a>
                        </div>

                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-8 gap-y-4 text-indigo-200 font-medium text-sm">
                            <div className="flex items-center gap-2 bg-indigo-900/30 px-4 py-2 rounded-full border border-indigo-500/20">
                                <Calendar size={16} className="text-orange-400" />
                                <span>
                                    {settings.startDate
                                        ? new Date(settings.startDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
                                        : "Date TBA"}
                                </span>
                            </div>
                            <div className="flex items-center gap-2 bg-indigo-900/30 px-4 py-2 rounded-full border border-indigo-500/20">
                                <MapPin size={16} className="text-orange-400" />
                                <span>{settings.venue}</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Visual/Image Content */}
                    {/* Visual/Image Content - Dynamic Logo Animation */}
                    <div className="flex-1 relative h-[500px] flex items-center justify-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="relative w-full max-w-[500px] aspect-square flex items-center justify-center"
                        >
                            {/* Glow effect behind logo */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/30 to-purple-500/30 rounded-full blur-[100px] animate-pulse" />

                            <motion.img
                                src={settings.logoUrl || "/logo.png"}
                                alt="Event Logo"
                                className="w-full h-full object-contain relative z-10 drop-shadow-2xl"
                            />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
