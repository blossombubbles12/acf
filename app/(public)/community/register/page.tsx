"use client";

import { useState } from "react";
import {
    Users,
    Mail,
    Phone,
    MapPin,
    Briefcase,
    GraduationCap,
    ShieldCheck,
    ArrowRight,
    Loader2,
    CheckCircle2,
    Globe,
    FileText
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function MemberRegistrationPage() {
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const body = Object.fromEntries(formData.entries());

        try {
            const res = await fetch("/api/members/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Failed to register");
            }

            setSuccess(true);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center p-4">
            <div className="max-w-xl w-full text-center space-y-8 animate-in fade-in zoom-in duration-500">
                <div className="w-24 h-24 bg-emerald-50 rounded-[2rem] flex items-center justify-center mx-auto text-emerald-500 shadow-xl shadow-emerald-500/10">
                    <CheckCircle2 className="w-12 h-12" />
                </div>
                <div className="space-y-4">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900">Welcome to ACF!</h1>
                    <p className="text-gray-500 text-lg">Your registration has been successfully received. You are now part of the Actors Charity Foundation industry network.</p>
                </div>
                <div className="pt-8">
                    <Link
                        href="/community"
                        className="inline-flex items-center gap-3 px-10 py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-[0.2em] shadow-2xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
                    >
                        Explore Hub <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#fafbfc]">
            {/* Split Layout */}
            <div className="flex flex-col lg:flex-row min-h-screen">
                {/* Left Side: Branding/Identity */}
                <div className="lg:w-1/3 bg-[#0a1128] text-white p-8 sm:p-12 lg:p-20 relative flex flex-col justify-between overflow-hidden min-h-[400px] lg:min-h-screen">
                    <div className="absolute inset-0 opacity-20 z-0">
                        <Image
                            src="https://images.unsplash.com/photo-1598897652147-3bd5fdac47dc?q=80&w=2000"
                            alt="Entertainment Industry"
                            fill
                            className="object-cover"
                            unoptimized
                        />
                    </div>
                    <div className="relative z-10">
                        <Link href="/" className="inline-block mb-12 sm:mb-20 group">
                            <span className="text-xl sm:text-2xl font-serif font-bold tracking-tight group-hover:text-secondary transition-colors uppercase">Actors Charity <span className="font-light text-secondary">Foundation</span></span>
                        </Link>
                        <div className="space-y-4 sm:space-y-6">
                            <span className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-secondary/20 text-secondary text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] mb-2 sm:mb-4 border border-secondary/20">
                                Join The Network
                            </span>
                            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-serif font-bold leading-tight">Influence for <span className="italic text-secondary">Social Impact.</span></h1>
                            <p className="text-sm sm:text-lg text-white/60 max-w-sm font-medium leading-relaxed">
                                Complete your partner profile to collaborate on humanitarian initiatives and use your influence for good.
                            </p>
                        </div>
                    </div>

                    <div className="relative z-10 pt-12 sm:pt-20 flex gap-8 sm:gap-10">
                        <div className="space-y-1">
                            <p className="text-xl sm:text-2xl font-serif font-bold text-secondary">100%</p>
                            <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-white/40">Transparency</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-xl sm:text-2xl font-serif font-bold text-secondary">Global</p>
                            <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-white/40">Reach</p>
                        </div>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="lg:w-2/3 p-4 sm:p-8 lg:p-20 flex items-center justify-center">
                    <div className="max-w-2xl w-full">
                        <div className="bg-white rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-10 lg:p-16 border border-gray-100 shadow-2xl shadow-slate-200/50">
                            <div className="mb-8 sm:mb-12">
                                <h2 className="text-xl sm:text-2xl font-serif font-bold text-gray-900">Partner Registration</h2>
                                <p className="text-xs sm:text-sm text-gray-400 mt-2">Enter your professional and contact details below.</p>
                            </div>

                            {error && (
                                <div className="mb-6 sm:mb-8 p-3 sm:p-4 bg-red-50 border border-red-100 rounded-xl sm:rounded-2xl text-red-600 text-xs sm:text-sm font-bold flex items-center gap-3">
                                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-red-100 flex items-center justify-center shrink-0">!</div>
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <FormInput
                                        label="Full Name"
                                        name="full_name"
                                        icon={Users}
                                        placeholder="Enter your full name"
                                        required
                                    />
                                    <FormInput
                                        label="Email Address"
                                        name="email"
                                        type="email"
                                        icon={Mail}
                                        placeholder="e.g. creative@actorscharity.org"
                                        required
                                    />
                                    <FormInput
                                        label="Phone Number"
                                        name="phone"
                                        icon={Phone}
                                        placeholder="+234..."
                                    />
                                    <FormInput
                                        label="Primary Role"
                                        name="role"
                                        icon={Briefcase}
                                        placeholder="e.g. Actor, Director, Producer"
                                    />
                                    <FormInput
                                        label="Current Location"
                                        name="location"
                                        icon={MapPin}
                                        placeholder="City, Country"
                                    />
                                    <FormInput
                                        label="Portfolio / Social Link"
                                        name="portfolio"
                                        icon={Globe}
                                        placeholder="e.g. IMDb or Instagram"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 pl-4 flex items-center gap-2">
                                        <FileText className="w-3 h-3" /> Creative Journey & Mission
                                    </label>
                                    <textarea
                                        name="biography"
                                        rows={4}
                                        placeholder="Tell us about your creative journey and why you want to join ACF..."
                                        className="w-full px-6 py-4 bg-slate-50/50 rounded-2xl border border-gray-100 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/20 transition-all font-medium placeholder:text-gray-300 resize-none"
                                    />
                                </div>

                                <div className="pt-6">
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="w-full py-4 sm:py-5 bg-primary text-white rounded-xl sm:rounded-2xl font-black uppercase tracking-[0.1em] sm:tracking-[0.2em] shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 sm:gap-4 disabled:opacity-50 text-xs sm:text-base"
                                    >
                                        {submitting ? (
                                            <><Loader2 className="w-5 h-5 sm:w-6 sm:h-6 animate-spin" /> Processing...</>
                                        ) : (
                                            <>Register My Profile <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" /></>
                                        )}
                                    </button>
                                    <p className="text-center text-[9px] sm:text-[10px] text-gray-300 mt-6 font-bold uppercase tracking-widest leading-relaxed">
                                        By registering, you agree to the ACF privacy guidelines.
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function FormInput({ label, name, icon: Icon, type = "text", placeholder, required = false }: any) {
    return (
        <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 pl-4">{label} {required && "*"}</label>
            <div className="relative">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300">
                    <Icon className="w-4 h-4" />
                </div>
                <input
                    name={name}
                    type={type}
                    required={required}
                    placeholder={placeholder}
                    className="w-full pl-14 pr-6 py-4 bg-slate-50/50 rounded-2xl border border-gray-100 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/20 transition-all font-medium placeholder:text-gray-300 text-sm"
                />
            </div>
        </div>
    );
}
