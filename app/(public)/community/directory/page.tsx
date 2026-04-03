"use client";

import { useState, useEffect } from "react";
import {
    Search,
    Filter,
    MapPin,
    Briefcase,
    GraduationCap,
    Users,
    Loader2,
    Mail,
    ChevronRight,
    ArrowLeft
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCloudinaryPool } from "@/hooks/useCloudinaryPool";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function MemberDirectoryPage() {
    const { getRandomImage } = useCloudinaryPool();
    const [members, setMembers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeIndex, setActiveIndex] = useState<string | null>(null);

    const fetchDirectory = async () => {
        try {
            setLoading(true);
            const url = new URL("/api/directory", window.location.origin);
            if (searchQuery) url.searchParams.append("search", searchQuery);
            if (activeIndex) url.searchParams.append("index", activeIndex);

            const res = await fetch(url.toString());
            const data = await res.json();
            setMembers(data);
        } catch (err) {
            console.error("Failed to fetch directory");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchDirectory();
        }, 300);
        return () => clearTimeout(timer);
    }, [searchQuery, activeIndex]);

    return (
        <div className="bg-white min-h-screen">
            {/* Header */}
            <section className="relative pt-20 pb-16 bg-[#0a1128] text-white overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-10">
                    <Image
                        src={getRandomImage(6)}
                        alt="Directory"
                        fill
                        className="object-cover"
                        unoptimized
                    />
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <Link
                        href="/community"
                        className="inline-flex items-center gap-2 text-white/40 hover:text-secondary transition-colors mb-6 sm:mb-8 font-black uppercase tracking-[0.2em] text-[9px] sm:text-[10px]"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to Industry Hub
                    </Link>
                    <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold mb-4 sm:mb-6 italic leading-tight">Partner <span className="font-light not-italic text-secondary">Directory</span></h1>
                    <p className="text-sm sm:text-base text-white/40 max-w-xl font-medium leading-relaxed">Connecting the global entertainment industry for social good. Search the registry to find actors, filmmakers, and regional partners.</p>
                </div>
            </section>

            {/* Filter Bar */}
            <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm">
                <div className="container mx-auto px-4 py-4 sm:py-6">
                    <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 items-center">
                        <div className="relative flex-grow w-full max-w-2xl">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by name, role, location..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-6 py-3 sm:py-4 bg-slate-50 rounded-xl sm:rounded-2xl border border-gray-100 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/20 transition-all font-medium text-sm"
                            />
                        </div>
                        <div className="w-full lg:w-auto h-px lg:h-8 bg-gray-100 lg:w-px" />
                        <div className="w-full overflow-x-auto pb-2 sm:pb-0">
                            <div className="flex items-center min-w-max gap-1">
                                <button
                                    onClick={() => setActiveIndex(null)}
                                    className={`px-3 py-2 rounded-lg text-[9px] sm:text-[10px] font-black uppercase tracking-widest transition-all ${!activeIndex ? 'bg-primary text-white' : 'text-gray-400 hover:bg-slate-50'}`}
                                >
                                    All
                                </button>
                                {ALPHABET.map((letter) => (
                                    <button
                                        key={letter}
                                        onClick={() => setActiveIndex(letter === activeIndex ? null : letter)}
                                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-[9px] sm:text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center ${activeIndex === letter ? 'bg-primary text-white' : 'text-gray-400 hover:bg-slate-50'}`}
                                    >
                                        {letter}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <section className="py-12 container mx-auto px-4">
                {loading ? (
                    <div className="flex justify-center py-40">
                        <Loader2 className="w-10 h-10 animate-spin text-primary/10" />
                    </div>
                ) : members.length === 0 ? (
                    <div className="text-center py-40 bg-slate-50 rounded-[3rem] border border-dashed border-gray-200">
                        <Users className="w-16 h-16 text-gray-200 mx-auto mb-6" />
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No partners found</h3>
                        <p className="text-gray-400 max-w-sm mx-auto">Try adjusting your search or filter criteria. Be the first to register if you're not in the directory yet!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {members.map((member, i) => (
                            <div key={i} className="group bg-white rounded-[2rem] p-8 border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                                <div className="space-y-6">
                                    <div className="w-20 h-20 rounded-[1.5rem] bg-slate-100 overflow-hidden relative border-4 border-white shadow-lg">
                                        {member.photo_url ? (
                                            <Image src={member.photo_url} alt="" fill className="object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-slate-300">
                                                <Users className="w-8 h-8" />
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-serif font-bold text-gray-900 group-hover:text-primary transition-colors leading-tight">{member.full_name}</h3>
                                        <div className="flex items-center gap-2 mt-2">
                                            <Briefcase className="w-3 h-3 text-secondary" />
                                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{member.role || 'Industry Professional'}</span>
                                        </div>
                                    </div>
                                    <div className="space-y-3 pt-4 border-t border-gray-50">
                                        <div className="flex items-center gap-3 text-xs font-bold text-gray-600">
                                            <Briefcase className="w-4 h-4 text-primary opacity-40 shrink-0" />
                                            <span className="truncate">{member.occupation || 'Creative'}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-xs font-medium text-gray-400">
                                            <MapPin className="w-4 h-4 text-primary opacity-40 shrink-0" />
                                            <span>{member.location || 'Global Citizen'}</span>
                                        </div>
                                    </div>
                                    <button className="w-full py-4 bg-slate-50 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:bg-primary group-hover:text-white transition-all flex items-center justify-center gap-3">
                                        View Profile <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}
