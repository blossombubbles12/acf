"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    Heart, Shield, Globe, Sparkles, CheckCircle2,
    ArrowRight, CreditCard, Building2, Smartphone, ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";
import { useCloudinaryPool } from "@/hooks/useCloudinaryPool";

const PRESET_AMOUNTS = [1000, 5000, 10000, 25000, 50000, 100000];

const IMPACT_TIERS = [
    { amount: "₦1,000", label: "Supporter", icon: Heart, color: "amber", desc: "Provides one child with scholastic materials for a week." },
    { amount: "₦5,000", label: "Advocate", icon: Sparkles, color: "blue", desc: "Funds one medical consultation for an underserved family." },
    { amount: "₦25,000", label: "Champion", icon: Globe, color: "green", desc: "Sponsors a child's school supplies for an entire term." },
    { amount: "₦100,000", label: "Foundation Partner", icon: Shield, color: "purple", desc: "Covers a full community outreach event for 50 beneficiaries." },
];

const PAYMENT_METHODS = [
    { id: "card", label: "Credit / Debit Card", icon: CreditCard },
    { id: "bank", label: "Bank Transfer", icon: Building2 },
    { id: "ussd", label: "USSD / Mobile", icon: Smartphone },
];

const BANK_DETAILS = [
    { bank: "Actors Charity Foundation", account: "1234567890", name: "First Bank Nigeria" },
    { bank: "ACF Humanitarian Fund", account: "0987654321", name: "Access Bank" },
];

export default function DonatePage() {
    const { getRandomImage } = useCloudinaryPool('home');
    const [selectedAmount, setSelectedAmount] = useState<number | null>(10000);
    const [customAmount, setCustomAmount] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("card");
    const [donationType, setDonationType] = useState<"one-time" | "monthly">("one-time");
    const [submitted, setSubmitted] = useState(false);

    const displayAmount = customAmount
        ? parseInt(customAmount.replace(/,/g, ""), 10) || 0
        : selectedAmount || 0;

    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5 }
    };

    const formatNaira = (n: number) =>
        new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(n);

    return (
        <div className="bg-white text-slate-900">
            {/* ─── HERO ─── */}
            <section className="relative py-20 md:py-28 bg-slate-950 overflow-hidden text-white">
                <div className="absolute inset-0 opacity-20">
                    <Image src={getRandomImage(3)} alt="Donate" fill className="object-cover" unoptimized />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
                <div className="max-w-6xl mx-auto px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div {...fadeIn} className="space-y-6">
                            <span className="inline-block px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-[9px] font-black uppercase tracking-[0.3em] border border-amber-500/20">
                                Make a Difference Today
                            </span>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-outfit font-bold leading-tight">
                                Fuel the <span className="text-amber-500 italic">Movement</span>
                            </h1>
                            <p className="text-white/60 text-base leading-relaxed max-w-lg">
                                Every naira you donate goes directly to empowering underserved communities through education, healthcare, and advocacy. Together, we write stories that matter.
                            </p>
                            <div className="flex flex-wrap gap-4 pt-2">
                                {[
                                    { label: "100% Transparent", icon: Shield },
                                    { label: "Tax Deductible", icon: CheckCircle2 },
                                    { label: "Secure Payments", icon: CreditCard },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-2 text-white/70 text-xs font-medium">
                                        <item.icon className="w-4 h-4 text-amber-500" />
                                        {item.label}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="grid grid-cols-2 gap-3">
                            {[4, 5, 6, 7].map(seed => (
                                <div key={seed} className={`relative overflow-hidden rounded-xl ${seed % 2 === 0 ? 'aspect-[3/4]' : 'aspect-square'}`}>
                                    <Image src={getRandomImage(seed)} alt="ACF Impact" fill className="object-cover" unoptimized />
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ─── IMPACT TIERS ─── */}
            <section className="py-14 bg-slate-50 border-b border-slate-100">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-10">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-600 block mb-2">Your Impact</span>
                        <h2 className="text-3xl md:text-4xl font-outfit font-bold text-slate-950">What Your Gift Achieves</h2>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {IMPACT_TIERS.map((tier, i) => (
                            <motion.div key={i} {...fadeIn} transition={{ delay: i * 0.08 }}
                                className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-amber-200 transition-all group text-center">
                                <div className="w-12 h-12 bg-amber-50 border border-amber-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-500 group-hover:border-amber-500 transition-all">
                                    <tier.icon className="w-5 h-5 text-amber-600 group-hover:text-white transition-colors" />
                                </div>
                                <p className="text-2xl font-outfit font-bold text-slate-950 mb-1">{tier.amount}</p>
                                <span className="text-[9px] font-black uppercase tracking-widest text-amber-600 block mb-3">{tier.label}</span>
                                <p className="text-slate-500 text-xs leading-relaxed">{tier.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── DONATION FORM ─── */}
            <section className="py-14 md:py-20">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        {/* LEFT: form */}
                        <motion.div {...fadeIn} className="space-y-6">
                            <div>
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-600 block mb-2">Contribute Now</span>
                                <h2 className="text-3xl font-outfit font-bold text-slate-950">Make Your Donation</h2>
                            </div>

                            {/* Donation Type Toggle */}
                            <div className="flex bg-slate-100 rounded-xl p-1">
                                {(["one-time", "monthly"] as const).map(type => (
                                    <button key={type} onClick={() => setDonationType(type)}
                                        className={`flex-1 py-2.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${donationType === type ? "bg-white text-slate-950 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>
                                        {type === "one-time" ? "One Time" : "Monthly"}
                                    </button>
                                ))}
                            </div>

                            {/* Preset amounts */}
                            <div>
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Select Amount</p>
                                <div className="grid grid-cols-3 gap-2">
                                    {PRESET_AMOUNTS.map(amount => (
                                        <button key={amount} onClick={() => { setSelectedAmount(amount); setCustomAmount(""); }}
                                            className={`py-3 rounded-xl text-sm font-bold border transition-all ${selectedAmount === amount && !customAmount ? "bg-slate-950 text-white border-slate-950" : "bg-white border-slate-200 text-slate-700 hover:border-slate-400"}`}>
                                            ₦{amount.toLocaleString()}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Custom amount */}
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">Or Enter Custom Amount</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">₦</span>
                                    <input type="text" value={customAmount}
                                        onChange={e => { setCustomAmount(e.target.value); setSelectedAmount(null); }}
                                        placeholder="e.g. 15,000"
                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 outline-none text-sm transition-all" />
                                </div>
                            </div>

                            {/* Payment Method */}
                            <div>
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Payment Method</p>
                                <div className="space-y-2">
                                    {PAYMENT_METHODS.map(m => (
                                        <button key={m.id} onClick={() => setPaymentMethod(m.id)}
                                            className={`w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-all ${paymentMethod === m.id ? "border-amber-500 bg-amber-50" : "border-slate-200 hover:border-slate-300"}`}>
                                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${paymentMethod === m.id ? "bg-amber-500 text-white" : "bg-slate-100 text-slate-500"}`}>
                                                <m.icon className="w-5 h-5" />
                                            </div>
                                            <span className="font-semibold text-sm text-slate-800">{m.label}</span>
                                            {paymentMethod === m.id && <CheckCircle2 className="w-4 h-4 text-amber-600 ml-auto" />}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Bank Transfer Details */}
                            {paymentMethod === "bank" && (
                                <div className="space-y-3 p-5 bg-slate-50 rounded-2xl border border-slate-100">
                                    <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-2">Bank Transfer Details</p>
                                    {BANK_DETAILS.map((b, i) => (
                                        <div key={i} className="p-4 bg-white rounded-xl border border-slate-100">
                                            <p className="font-bold text-slate-900 text-sm">{b.bank}</p>
                                            <p className="text-amber-600 font-black text-lg tracking-wider mt-1">{b.account}</p>
                                            <p className="text-slate-500 text-xs mt-0.5">{b.name}</p>
                                        </div>
                                    ))}
                                    <p className="text-xs text-slate-400 text-center mt-2">Please use your name + "ACF Donation" as payment reference.</p>
                                </div>
                            )}

                            {paymentMethod !== "bank" && (
                                <>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">First Name</label>
                                            <input type="text" placeholder="John" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 outline-none text-sm transition-all" />
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">Last Name</label>
                                            <input type="text" placeholder="Doe" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 outline-none text-sm transition-all" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">Email Address</label>
                                        <input type="email" placeholder="john@example.com" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 outline-none text-sm transition-all" />
                                    </div>
                                    <button onClick={() => setSubmitted(true)}
                                        className="w-full py-4 bg-amber-500 text-slate-950 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2">
                                        {submitted ? "Thank You! ❤️" : <>Donate {displayAmount > 0 ? formatNaira(displayAmount) : ""} Now <ArrowRight className="w-4 h-4" /></>}
                                    </button>
                                </>
                            )}

                            <p className="text-center text-xs text-slate-400">🔒 Secured by SSL encryption. All transactions are fully protected.</p>
                        </motion.div>

                        {/* RIGHT: sidebar */}
                        <div className="space-y-6">
                            {/* Feature image */}
                            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl">
                                <Image src={getRandomImage(8)} alt="ACF Impact" fill className="object-cover" unoptimized />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
                                <div className="absolute bottom-5 left-5 text-white">
                                    <p className="font-outfit font-bold text-lg">Your Gift, Their Future</p>
                                    <p className="text-white/60 text-xs mt-1">Every donation changes a life.</p>
                                </div>
                            </div>

                            {/* Why donate card */}
                            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
                                <h3 className="font-outfit font-bold text-slate-950 text-lg">Why Donate to ACF?</h3>
                                {[
                                    "100% of funds go directly to community programs",
                                    "Regular impact reports sent to all donors",
                                    "Recognized by Nigeria's Corporate Affairs Commission",
                                    "Partnership with leading NGOs and hospitals",
                                    "Transparent financial records available on request",
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-3 text-sm text-slate-600">
                                        <CheckCircle2 className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                                        {item}
                                    </div>
                                ))}
                            </div>

                            {/* Photo grid */}
                            <div className="grid grid-cols-3 gap-2">
                                {[9, 10, 11].map(seed => (
                                    <div key={seed} className="relative aspect-square rounded-xl overflow-hidden">
                                        <Image src={getRandomImage(seed)} alt="ACF" fill className="object-cover hover:scale-110 transition-transform duration-500" unoptimized />
                                    </div>
                                ))}
                            </div>

                            {/* Contact CTA */}
                            <div className="p-6 bg-slate-950 rounded-2xl text-white text-center space-y-3">
                                <p className="font-outfit font-bold text-base">Prefer to donate offline?</p>
                                <p className="text-slate-400 text-xs">Contact our team directly for cheque, wire transfer, or in-kind donations.</p>
                                <Link href="/contact" className="inline-flex items-center gap-2 text-amber-400 text-xs font-black uppercase tracking-widest hover:text-amber-300 transition-colors">
                                    Contact ACF <ChevronRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
