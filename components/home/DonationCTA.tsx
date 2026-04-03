"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ArrowRight, Shield, CheckCircle2 } from "lucide-react";

export function DonationCTA() {
    return (
        <section className="py-16 md:py-20 bg-gradient-to-br from-amber-500 via-amber-500 to-amber-600 text-slate-950 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-600/30 rounded-full blur-3xl" />
                {/* Dot grid pattern */}
                <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.15) 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                }} />
            </div>

            <div className="max-w-5xl mx-auto px-6 relative z-10">
                <div className="text-center space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/30">
                            <Heart className="w-8 h-8 text-slate-950" />
                        </div>

                        <h2 className="text-3xl md:text-5xl font-outfit font-bold leading-tight">
                            Every Donation Writes a<br />
                            <span className="italic font-medium">New Story of Hope</span>
                        </h2>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        className="text-slate-900/70 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-medium"
                    >
                        Join the growing network of change-makers who believe in the power of storytelling to transform lives. 100% of your donation goes directly to community impact programs.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
                    >
                        <Link
                            href="/donate"
                            className="px-10 py-4 bg-slate-950 text-white rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-800 transition-all shadow-xl flex items-center gap-2 group"
                        >
                            Donate Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            href="/contact"
                            className="px-10 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-white/30 transition-all"
                        >
                            Partner With Us
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6"
                    >
                        {[
                            { icon: Shield, text: "100% Transparent" },
                            { icon: CheckCircle2, text: "CAC Registered" },
                            { icon: Heart, text: "Tax Deductible" },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-2 text-slate-900/60 text-xs font-bold">
                                <item.icon className="w-4 h-4" />
                                {item.text}
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
