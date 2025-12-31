"use client";

import Link from "next/link";
import { Github, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Facebook } from "lucide-react";
import { IEventSettings } from "@/models/EventSettings";
import ContactForm from "@/components/forms/ContactForm";

export default function Footer({ settings }: { settings: IEventSettings }) {
    if (!settings) return null;

    return (
        <footer className="relative pt-32 pb-12 overflow-hidden">
            {/* Background Glow */}
            <div className="absolute bottom-0 left-0 w-full h-[500px] bg-gradient-to-t from-indigo-950 to-transparent pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="glass-card rounded-[3rem] p-12 md:p-16 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                        <div className="col-span-1 md:col-span-2">
                            <Link href="/" className="flex items-center gap-4 mb-8 group">
                                <img src={settings.logoUrl || "/logo.png"} alt="MMC VisionX" className="h-24 w-auto object-contain group-hover:scale-110 transition-transform" />
                                <span className="text-4xl font-bold font-display tracking-tight text-white block">
                                    MMC <span className="text-orange-400">VisionX</span>
                                </span>
                            </Link>
                            <p className="text-indigo-200/80 max-w-sm mb-8 leading-relaxed font-sans">
                                Where innovation meets execution. Join us for the ultimate hackathon experience designed for the visionaries of tomorrow.
                            </p>
                            <div className="flex items-center gap-4">
                                <a href={settings.socialLinks?.twitter || "#"} target="_blank" className="bg-white/10 p-3 rounded-full hover:bg-white/20 hover:scale-110 transition-all text-white"><Twitter size={20} /></a>
                                <a href={settings.socialLinks?.instagram || "#"} target="_blank" className="bg-white/10 p-3 rounded-full hover:bg-white/20 hover:scale-110 transition-all text-white"><Instagram size={20} /></a>
                                <a href={settings.socialLinks?.linkedin || "#"} target="_blank" className="bg-white/10 p-3 rounded-full hover:bg-white/20 hover:scale-110 transition-all text-white"><Linkedin size={20} /></a>
                                <a href={settings.socialLinks?.facebook || "#"} target="_blank" className="bg-white/10 p-3 rounded-full hover:bg-white/20 hover:scale-110 transition-all text-white"><Facebook size={20} /></a>
                                <a href="https://github.com" target="_blank" className="bg-white/10 p-3 rounded-full hover:bg-white/20 hover:scale-110 transition-all text-white"><Github size={20} /></a>
                            </div>
                        </div>

                        {/* Navigation */}
                        <div>
                            <h4 className="text-white font-bold font-display mb-6 text-lg">Quick Links</h4>
                            <ul className="space-y-4 text-indigo-200/70">
                                <li><Link href="#about" className="hover:text-orange-300 transition-colors">About</Link></li>
                                <li><Link href="#tracks" className="hover:text-orange-300 transition-colors">Tracks</Link></li>
                                <li><Link href="#sponsors" className="hover:text-orange-300 transition-colors">Sponsors</Link></li>
                                <li><Link href="#faq" className="hover:text-orange-300 transition-colors">FAQ</Link></li>
                                {settings.codeOfConductUrl && (
                                    <li><a href={settings.codeOfConductUrl} target="_blank" className="hover:text-orange-300 transition-colors">Code of Conduct</a></li>
                                )}
                            </ul>
                        </div>

                        {/* Contact & Form - Stacked in last column */}
                        <div className="space-y-8">
                            <div>
                                <h4 className="text-white font-bold font-display mb-6 text-lg">Contact Us</h4>
                                <ul className="space-y-4 text-indigo-200/70">
                                    <li className="flex items-center gap-3">
                                        <Mail size={18} className="text-orange-400 shrink-0" />
                                        <a href={`mailto:${settings.contactEmail}`} className="hover:text-white transition-colors">{settings.contactEmail}</a>
                                    </li>
                                    {settings.contactPhone && (
                                        <li className="flex items-center gap-3">
                                            <Phone size={18} className="text-orange-400 shrink-0" />
                                            <span>{settings.contactPhone}</span>
                                        </li>
                                    )}
                                    <li className="flex items-start gap-3">
                                        <MapPin size={18} className="text-orange-400 shrink-0 mt-1" />
                                        <span>{settings.contactAddress || settings.venue}</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Contact Form Column (New) */}
                            <div>
                                <h4 className="text-white font-bold font-display mb-6 text-lg">Send a Message</h4>
                                <ContactForm />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-indigo-300/40 px-6">
                        <p>&copy; {new Date().getFullYear()} MMC VisionX. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
