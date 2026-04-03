"use client";

import Link from "next/link";
import Image from "next/image";
import { Users, UserPlus, Globe, Search, ArrowRight, ShieldCheck, MessageCircle } from "lucide-react";
import { useCloudinaryPool } from "@/hooks/useCloudinaryPool";

export default function CommunityPage() {
    const { getRandomImage } = useCloudinaryPool();
    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="relative pt-20 pb-12 bg-[#0a1128] text-white">
                <div className="absolute inset-0 z-0 opacity-20">
                    <Image
                        src={getRandomImage(9)}
                        alt="Industry Hub"
                        fill
                        className="object-cover"
                        unoptimized
                    />
                </div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-secondary/20 text-secondary text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] mb-4 sm:mb-6 border border-secondary/20">
                        Industry Network
                    </span>
                    <h1 className="text-4xl sm:text-4xl sm:text-5xl md:text-6xl font-serif font-bold mb-4 sm:mb-6 italic leading-tight">Industry <span className="font-light not-italic text-secondary">Hub</span></h1>
                    <p className="text-sm sm:text-base md:text-lg text-white/60 max-w-2xl mx-auto font-medium leading-relaxed">
                        A global network of actors, filmmakers, artists, and creatives. Connect with industry partners dedicated to social change and sustainable impact.
                    </p>
                </div>
            </section>

            {/* Hub Actions */}
            <section className="py-12 md:py-16 container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-8 sm:gap-6 md:gap-8 max-w-6xl mx-auto">
                    {/* Register Card */}
                    <Link href="/community/register" className="group">
                        <div className="bg-slate-50 rounded-[2.5rem] sm:rounded-[3rem] p-8 sm:p-12 border border-slate-100 hover:bg-white hover:shadow-2xl hover:border-secondary/20 transition-all duration-500 h-full relative overflow-hidden">
                            <div className="relative z-10 space-y-4 sm:space-y-6">
                                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary text-white rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                    <UserPlus className="w-6 h-6 sm:w-8 sm:h-8" />
                                </div>
                                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 leading-tight">Join the Partner <br />Directory</h3>
                                <p className="text-sm sm:text-base text-gray-500 font-medium max-w-xs">Register your creative profile to be discovered by partners and stay updated on ACF initiatives.</p>
                                <div className="pt-2 sm:pt-4 flex items-center gap-3 text-primary font-black uppercase tracking-[0.2em] text-xs">
                                    Register Now <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                                </div>
                            </div>
                            <Users className="absolute -right-8 -bottom-8 sm:-right-10 sm:-bottom-10 w-48 h-48 sm:w-64 sm:h-64 text-slate-100 group-hover:text-primary/5 transition-colors" />
                        </div>
                    </Link>

                    {/* Directory Card */}
                    <Link href="/community/directory" className="group">
                        <div className="bg-[#0a1128] rounded-[2.5rem] sm:rounded-[3rem] p-8 sm:p-12 border border-white/5 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 h-full relative overflow-hidden">
                            <div className="relative z-10 space-y-4 sm:space-y-6">
                                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-secondary text-primary rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                    <Globe className="w-6 h-6 sm:w-8 sm:h-8" />
                                </div>
                                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white leading-tight">Browse Industry <br />Partners</h3>
                                <p className="text-sm sm:text-base text-white/40 font-medium max-w-xs">Search for actors, filmmakers, and creatives by role and expertise in our secure partner portal.</p>
                                <div className="pt-2 sm:pt-4 flex items-center gap-3 text-secondary font-black uppercase tracking-[0.2em] text-xs">
                                    Search Hub <Search className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                                </div>
                            </div>
                            <ShieldCheck className="absolute -right-8 -bottom-8 sm:-right-10 sm:-bottom-10 w-48 h-48 sm:w-64 sm:h-64 text-white/5 group-hover:text-secondary/5 transition-colors" />
                        </div>
                    </Link>
                </div>
            </section>

            {/* Newsletter / CTA */}
            <section className="pb-12 container mx-auto px-4">
                <div className="bg-primary rounded-[2.5rem] sm:rounded-[4rem] p-8 sm:p-12 md:p-20 text-center text-white relative overflow-hidden">
                    <div className="relative z-10 max-w-3xl mx-auto space-y-6 sm:space-y-8">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold leading-tight">Empower Change with ACF</h2>
                        <p className="text-white/60 text-base sm:text-lg font-medium leading-relaxed">Join our creative network to participate in humanitarian planning, project discussions, and social impact coordination.</p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 pt-4">
                            <button className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-white text-primary rounded-xl sm:rounded-2xl font-black uppercase tracking-[0.1em] shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3">
                                <MessageCircle className="w-5 h-5" /> ACF Partner Community
                            </button>
                            <button className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-secondary text-[#0a1128] rounded-xl sm:rounded-2xl font-black uppercase tracking-[0.1em] shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3">
                                Become an Ambassador
                            </button>
                        </div>
                    </div>
                    {/* Decorative element */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                </div>
            </section>
        </div>
    );
}
