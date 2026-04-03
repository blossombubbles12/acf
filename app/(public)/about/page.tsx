"use client";

import Image from "next/image";
import NextLink from "next/link";
import {
    Quote,
    Users,
    Heart,
    Target,
    Calendar,
    ChevronRight,
    Award,
    CheckCircle2,
    Globe,
    Sparkles,
    BookOpen,
    Shield,
    ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";
import { useCloudinaryPool } from "@/hooks/useCloudinaryPool";
import { PartnersScroller } from "@/components/ui/PartnersScroller";

export default function AboutPage() {
    const { getRandomImage } = useCloudinaryPool('about');
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5 }
    };

    const pioneerMembers = [
        "Humphrey Ifeanyi Odiogor", "Emeka Anthony Opah", "Chibuzo Emma Okoh",
        "Uchenna Anigbata (Amichan)", "Mickey Moore", "Sony Nwankwo",
        "Ralph Nweke-Ezeudu", "Alex Ike Molokwu", "Eric Umeh (virtual)"
    ];

    const timeline = [
        { year: "2024", title: "The Inception", desc: "Actors Charity Foundation (ACF) was founded to harness the power of Nollywood for social good." },
        { year: "2024", title: "Maiden Outreach", desc: "First major healthcare campaign reaching over 1,000 community members in Lagos." },
        { year: "2025", title: "Education Fund", desc: "Launch of the ACF Scholarship Scheme for marginalized children." },
        { year: "2025", title: "Global Expansion", desc: "Building partnerships with international NGOs for human rights advocacy." },
    ];

    const pillars = [
        { icon: BookOpen, title: "Education", color: "bg-blue-50 text-blue-600 border-blue-100", desc: "Scholarships and scholastic materials for marginalized children, ensuring every child can learn and excel." },
        { icon: Heart, title: "Healthcare", color: "bg-rose-50 text-rose-600 border-rose-100", desc: "Medical outreaches and support for healthcare facilities in underserved communities across Nigeria." },
        { icon: Shield, title: "Human Rights", color: "bg-green-50 text-green-600 border-green-100", desc: "Storytelling and legal aid to defend the rights of the marginalized and address systemic injustices." },
        { icon: Globe, title: "Advocacy", color: "bg-amber-50 text-amber-600 border-amber-100", desc: "Regional and international campaigns that bring global attention to Nigeria's most urgent social challenges." },
        { icon: Sparkles, title: "Entertainment", color: "bg-purple-50 text-purple-600 border-purple-100", desc: "Using the culture of Nollywood to normalize philanthropy and make giving cool and aspirational." },
        { icon: Users, title: "Community", color: "bg-teal-50 text-teal-600 border-teal-100", desc: "Building a self-sustaining network of change-makers from the entertainment industry and beyond." },
    ];

    const values = [
        "Integrity in all our actions and partnerships",
        "Inclusivity across race, gender, and background",
        "Transparency in financial stewardship",
        "Innovation in our approach to philanthropy",
        "Accountability to our communities and donors",
        "Sustainability in every program we run",
    ];

    const stats = [
        { value: "50+", label: "Ambassadors" },
        { value: "5K+", label: "Lives Impacted" },
        { value: "12+", label: "Impact Areas" },
        { value: "2024", label: "Year Founded" },
    ];

    return (
        <div className="bg-white selection:bg-amber-500/10 text-slate-900">

            {/* ─── HERO ─── */}
            <section className="relative py-20 md:py-28 bg-slate-950 text-white overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-25">
                    <Image src={getRandomImage(1)} alt="ACF Heritage" fill className="object-cover" unoptimized />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent z-[1]" />
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
                        <motion.div {...fadeIn} className="space-y-6">
                            <span className="inline-block px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-[9px] font-black uppercase tracking-[0.3em] border border-amber-500/20">
                                Established 2024
                            </span>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-outfit font-bold leading-tight">
                                Influence for <span className="text-amber-500 italic">Change</span>
                            </h1>
                            <p className="text-white/60 text-base leading-relaxed max-w-lg">
                                Actors Charity Foundation (ACF) harnesses the creativity and compassion of Nigeria's entertainment industry to drive sustainable social change.
                            </p>
                            <div className="flex items-center gap-4 pt-2">
                                <NextLink href="/donate" className="px-7 py-3 bg-amber-500 text-slate-950 rounded-lg font-black text-[10px] uppercase tracking-widest hover:bg-amber-400 transition-all">Donate Now</NextLink>
                                <NextLink href="/community" className="px-7 py-3 border border-white/20 rounded-lg font-black text-[10px] uppercase tracking-widest hover:bg-white/5 transition-all">Join Network</NextLink>
                            </div>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="grid grid-cols-2 gap-3">
                            {[2, 3, 4, 5].map((seed) => (
                                <div key={seed} className={`relative overflow-hidden rounded-xl ${seed === 2 || seed === 5 ? 'aspect-[3/4]' : 'aspect-square'}`}>
                                    <Image src={getRandomImage(seed)} alt="ACF" fill className="object-cover hover:scale-105 transition-transform duration-700" unoptimized />
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ─── STATS BAR ─── */}
            <section className="py-8 bg-amber-500">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        {stats.map((s, i) => (
                            <div key={i}>
                                <p className="text-3xl font-outfit font-bold text-slate-950">{s.value}</p>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-950/60 mt-0.5">{s.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── OUR STORY ─── */}
            <section className="py-14 md:py-20">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-10 items-center">
                        <motion.div {...fadeIn} className="space-y-6">
                            <div className="flex items-center gap-3">
                                <span className="h-0.5 w-8 bg-amber-500" />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-600">Our Story</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-outfit font-bold text-slate-950 leading-tight">
                                Storytelling with <span className="text-amber-600 italic">Purpose & Impact.</span>
                            </h2>
                            <div className="space-y-4 text-slate-600 leading-relaxed text-sm md:text-base">
                                <p>At ACF, we believe that the roles played on-screen can spark real-world impact. We exist to amplify marginalized voices, inspire collective action, and transform lives through hands-on humanitarian initiatives.</p>
                                <p>Our foundation brings together actors, filmmakers, and artists with communities in need to address society's most urgent challenges — education, healthcare, and human rights advocacy.</p>
                            </div>
                            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex gap-4 italic">
                                <Quote className="w-8 h-8 text-amber-500 shrink-0" />
                                <p className="text-slate-500 text-sm leading-relaxed">
                                    "The roles we play in films are fleeting, but the impact we make in reality can last a lifetime."
                                    <span className="block mt-3 not-italic font-black text-[10px] uppercase tracking-widest text-slate-950">— ACF Founding Vision</span>
                                </p>
                            </div>
                        </motion.div>

                        <div className="grid grid-cols-2 gap-3 md:gap-4">
                            <div className="space-y-3 md:space-y-4">
                                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                                    <Image src={getRandomImage(6)} alt="ACF Community" fill className="object-cover hover:scale-105 transition-transform duration-700" unoptimized />
                                </div>
                                <div className="relative aspect-square rounded-2xl overflow-hidden">
                                    <Image src={getRandomImage(7)} alt="ACF Outreach" fill className="object-cover hover:scale-105 transition-transform duration-700" unoptimized />
                                </div>
                            </div>
                            <div className="space-y-3 md:space-y-4 pt-8">
                                <div className="relative aspect-square rounded-2xl overflow-hidden">
                                    <Image src={getRandomImage(8)} alt="ACF Impact" fill className="object-cover hover:scale-105 transition-transform duration-700" unoptimized />
                                </div>
                                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                                    <Image src={getRandomImage(9)} alt="ACF Nollywood" fill className="object-cover hover:scale-105 transition-transform duration-700" unoptimized />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── 6 PILLARS GRID ─── */}
            <section className="py-14 md:py-20 bg-slate-950 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 blur-[120px] -translate-y-1/2 translate-x-1/2" />
                <div className="max-w-6xl mx-auto px-6 relative z-10">
                    <div className="text-center mb-12">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-500 block mb-3">What We Stand For</span>
                        <h2 className="text-3xl md:text-4xl font-outfit font-bold text-white">Our Strategic Pillars</h2>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {pillars.map((p, i) => (
                            <motion.div key={i} {...fadeIn} transition={{ delay: i * 0.05 }} className="p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-amber-500/30 transition-all group">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${p.color} group-hover:scale-110 transition-transform`}>
                                    <p.icon className="w-5 h-5" />
                                </div>
                                <h3 className="text-base font-bold text-white mb-2">{p.title}</h3>
                                <p className="text-slate-400 text-xs leading-relaxed">{p.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── VISION SPLIT ─── */}
            <section className="py-14 md:py-20">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-10 items-center">
                        <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl ring-1 ring-slate-100">
                            <Image src={getRandomImage(10)} alt="ACF Vision" fill className="object-cover" unoptimized />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                            <div className="absolute bottom-6 left-6 text-white">
                                <div className="w-12 h-0.5 bg-amber-500 mb-3" />
                                <p className="font-outfit font-bold text-xl">Collective Action</p>
                                <p className="text-white/60 text-xs mt-1">Moving as one force for good</p>
                            </div>
                        </div>

                        <motion.div {...fadeIn} className="space-y-6">
                            <div className="flex items-center gap-3">
                                <span className="h-0.5 w-8 bg-amber-500" />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-600">Our Vision</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-outfit font-bold text-slate-950 leading-tight">
                                Transformative Impact through <span className="text-amber-600 italic">Collective Action.</span>
                            </h2>
                            <p className="text-slate-600 text-sm leading-relaxed">We bring together actors, filmmakers, and artists with communities in need to address the most urgent challenges of our time. Our belief is simple: the power of celebrity, when channelled correctly, can move mountains.</p>

                            <div className="space-y-3">
                                {values.map((v, i) => (
                                    <div key={i} className="flex items-center gap-3 text-sm text-slate-700">
                                        <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                                        {v}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ─── MISSION BLOCK ─── */}
            <section className="py-14 md:py-20 bg-slate-50 border-y border-slate-100">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-10 items-center">
                        <motion.div {...fadeIn} className="space-y-8">
                            <div>
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-600 block mb-3">Our Mission</span>
                                <h2 className="text-3xl md:text-4xl font-outfit font-bold text-slate-950 leading-tight">
                                    To inspire collective action and transform lives through storytelling.
                                </h2>
                            </div>
                            <div className="space-y-5">
                                {[
                                    { icon: Heart, title: "Sustainable Change", desc: "Building long-term solutions for communities in need across Nigeria." },
                                    { icon: Award, title: "Influential Advocacy", desc: "Using the reach of the entertainment industry to champion social causes." },
                                    { icon: Target, title: "Direct Intervention", desc: "On-the-ground outreach executed by our ambassadors and trusted partners." },
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4 group">
                                        <div className="w-12 h-12 bg-amber-50 border border-amber-100 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-amber-500 group-hover:border-amber-500 transition-all">
                                            <item.icon className="w-5 h-5 text-amber-600 group-hover:text-white transition-colors" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-950 mb-1 text-sm">{item.title}</h4>
                                            <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <div className="grid grid-cols-2 gap-3">
                            {[11, 12, 13, 14].map((seed) => (
                                <div key={seed} className="relative aspect-square rounded-2xl overflow-hidden shadow-sm">
                                    <Image src={getRandomImage(seed)} alt="ACF Mission" fill className="object-cover hover:scale-105 transition-transform duration-700" unoptimized />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── FOUNDING MEMBERS ─── */}
            <section className="py-14 md:py-20">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-10 items-start">
                        <motion.div {...fadeIn}>
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-600 block mb-3">Pioneer Members</span>
                            <h2 className="text-3xl md:text-4xl font-outfit font-bold text-slate-950 mb-4">The Founding Circle</h2>
                            <p className="text-slate-500 text-sm leading-relaxed mb-8">These are the visionaries who committed their names, resources, and influence to bring the ACF dream to life. Their courage sparked a movement.</p>
                            <div className="grid sm:grid-cols-2 gap-3">
                                {pioneerMembers.map((name, i) => (
                                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-amber-200 hover:bg-amber-50/50 transition-all">
                                        <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center text-[10px] font-black text-slate-600 shrink-0">
                                            {name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                                        </div>
                                        <span className="text-xs font-semibold text-slate-700">{name}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <div className="relative">
                            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                                <Image src={getRandomImage(15)} alt="ACF Founders" fill className="object-cover" unoptimized />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
                                <div className="absolute bottom-6 left-6 right-6 text-white">
                                    <p className="font-outfit font-bold text-lg mb-1">ACF Founding Day</p>
                                    <p className="text-white/60 text-xs">A historic gathering that marked the birth of a new era in entertainment-led philanthropy.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── PARTNERS ─── */}
            <PartnersScroller />

            {/* ─── TIMELINE ─── */}
            <section className="py-14 md:py-20 bg-white">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-600 block mb-3">Journey</span>
                    <h2 className="text-3xl md:text-4xl font-outfit font-bold text-slate-950 mb-12">The ACF Timeline</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 relative">
                        <div className="hidden md:block absolute top-[26px] left-[10%] right-[10%] h-0.5 bg-slate-100" />
                        {timeline.map((item, i) => (
                            <div key={i} className="relative z-10 space-y-4">
                                <div className="w-12 h-12 bg-white border-4 border-amber-500 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-amber-500/10">
                                    <Calendar className="w-5 h-5 text-slate-900" />
                                </div>
                                <div>
                                    <span className="text-2xl font-outfit font-black text-amber-600">{item.year}</span>
                                    <h4 className="text-base font-bold text-slate-900 mt-1">{item.title}</h4>
                                    <p className="text-slate-500 text-xs mt-2 leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── IMPACT GALLERY STRIP ─── */}
            {/* ─── MEET OUR BOARD CTA ─── */}
            <section className="py-14 bg-white border-t border-slate-100">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid sm:grid-cols-3 gap-4">
                        <NextLink href="/about/board" className="group col-span-2 p-8 md:p-10 bg-slate-950 rounded-2xl text-white flex flex-col md:flex-row items-start md:items-center gap-6 hover:bg-slate-900 transition-all">
                            <div className="w-16 h-16 bg-amber-500/20 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-amber-500 transition-all">
                                <Users className="w-8 h-8 text-amber-400 group-hover:text-slate-950 transition-colors" />
                            </div>
                            <div className="flex-1">
                                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-amber-500 block mb-2">Leadership</span>
                                <h3 className="text-xl md:text-2xl font-outfit font-bold mb-2">Meet Our Board of Directors</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">Learn about the visionary leaders — including Executive Director Ejike Asiegbu — who guide ACF's mission and governance.</p>
                            </div>
                            <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-amber-500 group-hover:translate-x-1 transition-all shrink-0" />
                        </NextLink>
                        <NextLink href="/about/board#directors-letter" className="group p-8 bg-amber-50 border border-amber-100 rounded-2xl hover:bg-amber-500 hover:border-amber-500 transition-all flex flex-col items-start gap-4">
                            <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-all">
                                <Quote className="w-6 h-6 text-amber-600 group-hover:text-white transition-colors" />
                            </div>
                            <div>
                                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-amber-600 group-hover:text-white/80 block mb-1 transition-colors">From the Director</span>
                                <h3 className="text-lg font-outfit font-bold text-slate-950 group-hover:text-white transition-colors">Director's Letter</h3>
                                <p className="text-slate-500 group-hover:text-white/80 text-xs mt-1 leading-relaxed transition-colors">Read Ejike Asiegbu's personal message on ACF's founding vision.</p>
                            </div>
                        </NextLink>
                    </div>
                </div>
            </section>

            {/* ─── IMPACT GALLERY ─── */}
            <section className="py-14 md:py-16 bg-slate-50 border-t border-slate-100">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-600 block mb-1">Impact Gallery</span>
                            <h2 className="text-2xl md:text-3xl font-outfit font-bold text-slate-950">Moments That Define Us</h2>
                        </div>
                        <NextLink href="/media" className="text-[11px] font-black uppercase tracking-widest text-slate-500 hover:text-amber-600 flex items-center gap-1 transition-colors">
                            View All <ArrowRight className="w-4 h-4" />
                        </NextLink>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {[16, 17, 18, 19, 20, 21, 22, 23].map((seed) => (
                            <div key={seed} className="relative aspect-square rounded-xl overflow-hidden group shadow-sm">
                                <Image src={getRandomImage(seed)} alt="ACF Impact" fill className="object-cover group-hover:scale-110 transition-transform duration-700" unoptimized />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── FINAL CTA ─── */}
            <section className="py-14 md:py-20 relative overflow-hidden bg-slate-950 text-white">
                <div className="absolute inset-0">
                    <Image src={getRandomImage(4)} alt="CTA" fill className="object-cover opacity-10" unoptimized />
                </div>
                <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
                    <div className="flex justify-center mb-4">
                        <Quote className="w-10 h-10 text-amber-500 opacity-50" />
                    </div>
                    <h2 className="text-3xl md:text-5xl font-outfit font-bold leading-tight mb-6">
                        "Influence for Impact" —<br />
                        <span className="text-amber-500 italic font-medium">Stories that Sow Change.</span>
                    </h2>
                    <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-10 max-w-xl mx-auto">
                        Actors Charity Foundation is committed to building a world where the power of storytelling transforms lives and communities for the better.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <NextLink href="/donate" className="px-10 py-4 bg-amber-500 text-slate-950 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-amber-400 transition-all shadow-xl shadow-amber-500/20">
                            Join the Movement <ChevronRight className="inline w-4 h-4 ml-1" />
                        </NextLink>
                        <NextLink href="/contact" className="px-10 py-4 border border-white/20 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-white/5 transition-all">
                            Contact ACF
                        </NextLink>
                    </div>
                </div>
            </section>
        </div>
    );
}
