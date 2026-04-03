"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ShieldCheck, Users, Award, Star, Briefcase, Mail, Phone, ChevronRight } from "lucide-react";
import { useCloudinaryPool } from "@/hooks/useCloudinaryPool";

export default function ExecutivesPage() {
    const { getRandomImage } = useCloudinaryPool();
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 }
    };

    const mainExecutives = [
        { name: "Chibuzor Oko", role: "President", initials: "CO" },
        { name: "Emeka Onwuelo", role: "Vice President", initials: "EO" },
        { name: "Ralph Oranyelu Ezeudu", role: "Treasurer", initials: "RE" },
        { name: "Alex Molokwu", role: "General Secretary", initials: "AM" },
        { name: "Chris Onuigbo", role: "Financial Secretary", initials: "CO" },
        { name: "Tony Ezenwaka", role: "Publicity Secretary", initials: "TE" },
        { name: "Dan Onyenakorom", role: "Welfare Officer", initials: "DO" },
        { name: "John Aroh", role: "Legal Officer", initials: "JA" },
    ];

    const reunionCommittee = [
        { name: "Dr Ray Onwuelo", role: "Chairman", initials: "RO" },
        { name: "Dr (Engr) Vincent Amu", role: "Treasurer/Publicity & Media", initials: "VA" },
        { name: "Chief Eric Ume", role: "Program", initials: "EU" },
        { name: "Navy Captain Chuka Stanley Igwe (Rtd)", role: "Security & Logistics", initials: "CI" },
        { name: "Emmanuel Anaenugwu", role: "Food & Entertainment", initials: "EA" },
    ];

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="relative pt-20 pb-12 bg-[#0a1128] text-white">
                <div className="absolute inset-0 z-0 opacity-20">
                    <Image
                        src={getRandomImage(4)}
                        alt="Leadership"
                        fill
                        className="object-cover"
                        unoptimized
                    />
                </div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <motion.div {...fadeIn}>
                        <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-secondary/20 text-secondary text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] mb-4 sm:mb-6 border border-secondary/20">
                            Leadership & Governance
                        </span>
                        <h1 className="text-4xl sm:text-4xl sm:text-5xl md:text-6xl font-serif font-bold mb-4 sm:mb-6 italic leading-tight">Our <span className="font-light not-italic text-secondary">Leadership</span></h1>
                        <p className="text-sm sm:text-base md:text-lg text-white/60 max-w-2xl mx-auto font-medium leading-relaxed">
                            Meet the visionary team driving social change through the entertainment industry and coordinating ACF's global mission.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Main Executives Section */}
            <section className="py-12 md:py-16 md:py-16">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-20 gap-8">
                        <div className="max-w-2xl">
                            <div className="inline-flex items-center gap-4 text-secondary mb-4 sm:mb-6">
                                <ShieldCheck className="w-6 h-6 sm:w-8 sm:h-8" />
                                <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] sm:tracking-[0.3em]">Board of Trustees</span>
                            </div>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-gray-900 leading-tight">
                                Actors Charity Foundation <br className="hidden sm:block" /> Governing Council
                            </h2>
                        </div>
                        <p className="text-gray-400 font-medium italic text-right hidden lg:block max-w-xs">
                            Dedicated leaders committed to leveraging influence for sustainable social impact.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {mainExecutives.map((exec, i) => (
                            <motion.div
                                key={i}
                                {...fadeIn}
                                transition={{ delay: i * 0.05 }}
                                className="group relative bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:border-secondary/30 transition-all text-center"
                            >
                                <div className="relative w-24 h-24 mx-auto mb-6">
                                    <div className="w-full h-full bg-slate-50 rounded-[1.8rem] flex items-center justify-center font-serif text-3xl font-bold text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-inner">
                                        {exec.initials}
                                    </div>
                                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-secondary rounded-2xl flex items-center justify-center text-primary border-4 border-white shadow-lg">
                                        <Star className="w-4 h-4 fill-current" />
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-primary transition-colors">{exec.name}</h3>
                                <p className="text-xs font-black text-secondary uppercase tracking-[0.15em] mb-6">{exec.role}</p>

                                <div className="pt-6 border-t border-gray-50 flex items-center justify-center gap-4">
                                    <button className="p-2 text-gray-300 hover:text-primary transition-colors hover:scale-110">
                                        <Mail className="w-4 h-4" />
                                    </button>
                                    <button className="p-2 text-gray-300 hover:text-primary transition-colors hover:scale-110">
                                        <Phone className="w-4 h-4" />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Advisory Board Section */}
            <section className="py-12 md:py-16 md:py-16 bg-[#FAF9F6] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[40%] h-full bg-slate-100/50 -skew-x-12 translate-x-1/2" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-20">
                        <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] text-secondary mb-4 sm:mb-6 block">Industry Council</span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6 uppercase tracking-tight leading-tight">Advisory Board & <br className="hidden sm:block" /> <span className="text-primary">Global Ambassadors</span></h2>
                        <div className="w-16 sm:w-20 h-1 bg-secondary mx-auto rounded-full" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
                        {reunionCommittee.map((exec, i) => (
                            <motion.div
                                key={i}
                                {...fadeIn}
                                transition={{ delay: 0.2 + i * 0.05 }}
                                className="bg-white p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all"
                            >
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-secondary/10 text-secondary rounded-lg sm:rounded-xl flex items-center justify-center mb-4 sm:mb-6">
                                    <Briefcase className="w-5 h-5 sm:w-6 sm:h-6" />
                                </div>
                                <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-1 sm:mb-2 leading-tight">{exec.name}</h4>
                                <p className="text-[9px] sm:text-[10px] font-black text-gray-400 uppercase tracking-widest leading-relaxed">
                                    {exec.role}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final Join CTA */}
            <section className="py-12 sm:py-12 md:py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="bg-[#0a1128] rounded-[2.5rem] sm:rounded-[3rem] md:rounded-[4rem] p-8 sm:p-12 md:p-20 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary opacity-10 rounded-full -mr-48 -mt-48 blur-3xl" />

                        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-6 md:gap-8">
                            <div className="max-w-2xl text-center lg:text-left">
                                <h3 className="text-2xl sm:text-3xl md:text-5xl font-serif font-bold mb-4 sm:mb-6 leading-tight text-white">Join the Network</h3>
                                <p className="text-sm sm:text-base md:text-xl text-white/60 font-medium leading-relaxed">
                                    Be part of a community of creatives and philanthropists dedicated to driving real-world impact.
                                </p>
                            </div>
                            <div className="w-full sm:w-auto shrink-0">
                                <Link
                                    href="/community/register"
                                    className="w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-5 bg-secondary text-[#0a1128] rounded-full font-black uppercase tracking-[0.2em] shadow-2xl shadow-secondary/20 hover:scale-105 active:scale-95 transition-all text-xs sm:text-sm flex items-center justify-center gap-3"
                                >
                                    Get Started <ChevronRight className="w-5 h-5" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
