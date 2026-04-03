"use client";

import Image from "next/image";
import Link from "next/link";
import { Quote, Award, Mic, Film, Users, Heart, ChevronRight, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { useCloudinaryPool } from "@/hooks/useCloudinaryPool";

const BOARD_MEMBERS = [
    {
        id: "ejike-asiegbu",
        name: "Ejike Asiegbu",
        title: "Executive Director",
        tag: "Pioneer | Cultural Activist | Media Consultant",
        image: null, // replace later
        initial: "EA",
        bio: [
            "Ejike Asiegbu is one of the pioneer actors of the Nollywood film industry whose contribution to the motion picture industry continues to resonate. The Abia State-born actor has been in the television and film space for more than four decades and has made significant appearances in some of our classic series, such as Uzor Amadi's old Anambra State ABS soap opera \"Beyond the Realms\", at Enugu; NTA-rested Nifetep Productions at Enugu.",
            "He acted as Basi's father in \"Basi and Company\", played the role of late Jegede Shokoya's brother, a professor, in \"New Masquerade\", appeared in late Amaka Igwe's \"Checkmate\" as a lecturer, featured in MNET's \"Glass House\" series, and took part in Jade Suberu's \"Christmas in Lagos\", among many other prominent soap operas.",
            "A versatile actor with over 250 Nigerian movies to his credit, he took part in Oscar Hemen-Acker's blockbuster movie \"Finding Messiah\", which has kept ardent movie watchers in awe of the quality of acting and storyline direction.",
            "Ejike Asiegbu is a culture activist, media consultant, motivational speaker, documentalist, and an advocate of good governance, gender balance, justice, equity, and fair play. He is also a human rights activist. He was the former President of the Student Union Government at the University of Port Harcourt, where he studied Theatre Arts.",
            "He also served as the former President of the Actors Guild of Nigeria and was a former personal assistant to Chief Emeka Odumegwu Ojukwu. He is a brand ambassador for many rights groups and a board member of the Audio Visual Rights Society of Nigeria (AVRS), among others.",
            "He has received numerous awards of excellence in recognition of his indefatigable contributions to the entertainment industry. He married the love of his life, Ogechi, and they are blessed with four wonderful children.",
        ],
        highlights: [
            "Former President, Actors Guild of Nigeria",
            "250+ Nigerian movies to his credit",
            "Board Member, Audio Visual Rights Society of Nigeria",
            "Former PA to Chief Emeka Odumegwu Ojukwu",
            "BA Theatre Arts, University of Port Harcourt",
        ],
    },
    {
        id: "zik-zulu",
        name: "Zik Zulu Okafor",
        title: "Board Member",
        tag: "Media Executive | Cultural Advocate | Creative Visionary",
        image: null,
        initial: "ZZ",
        bio: [
            "Zik Zulu Okafor is a distinguished Nigerian media executive, cultural advocate, and creative visionary renowned for his transformative impact on Africa's media, entertainment, and arts sectors. With a career spanning over two decades, Okafor has cemented his reputation as a trailblazer dedicated to amplifying African narratives and fostering global dialogue through innovative storytelling.",
            "As the Founder and CEO of Zulu Media Group, established in 2005, he has spearheaded a multidisciplinary empire encompassing broadcasting, publishing, digital media, and film production. Under his leadership, the company has become a cornerstone of Afrocentric content, producing critically acclaimed documentaries, films, and platforms that celebrate Africa's rich heritage while addressing contemporary social issues.",
        ],
        highlights: [
            "Founder & CEO, Zulu Media Group (est. 2005)",
            "Two decades of media and entertainment experience",
            "Pioneer of Afrocentric content creation",
            "Acclaimed documentary and film producer",
        ],
    },
    {
        id: "ogechi-asiegbu",
        name: "Mrs. Ogechi Asiegbu",
        title: "Board Member",
        tag: "Social Media Influencer | Business Executive | Cultural Advocate",
        image: null,
        initial: "OA",
        bio: [
            "Mrs. Ogechi Asiegbu is a social media influencer and advocate for cultural engagement in the creative space. She holds a degree in Marketing from Oko Polytechnic, Anambra State.",
            "A successful businesswoman, she balances her trade with mentorship programs focused on communication skills in marketing. Off-screen, she enjoys exploring traditional Nigerian cuisine, writing, and advocating for mental health awareness.",
            "Mrs. Asiegbu has co-produced several works alongside her husband, including Engaging Mimi and Lola.",
            "Just like her husband, Mrs. Asiegbu continues to inspire as a changemaker dedicated to elevating African narratives and fostering a vibrant, inclusive entertainment landscape.",
        ],
        highlights: [
            "BSc Marketing, Oko Polytechnic, Anambra State",
            "Co-produced 'Engaging Mimi and Lola'",
            "Mentor on communication & marketing skills",
            "Mental health awareness advocate",
        ],
    },
];

export default function BoardMembersPage() {
    const { getRandomImage } = useCloudinaryPool('about');

    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5 }
    };

    return (
        <div className="bg-white text-slate-900">

            {/* ─── PAGE HEADER ─── */}
            <section className="relative py-16 md:py-20 bg-slate-950 text-white overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <Image src={getRandomImage(2)} alt="Board Members" fill className="object-cover" unoptimized />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950 to-slate-950/60" />
                <div className="max-w-6xl mx-auto px-6 relative z-10">
                    <div className="flex items-center gap-2 text-slate-400 text-xs mb-6">
                        <Link href="/about" className="hover:text-amber-500 transition-colors">About ACF</Link>
                        <ChevronRight className="w-3 h-3" />
                        <span className="text-white">Board Members</span>
                    </div>
                    <motion.div {...fadeIn} className="max-w-2xl">
                        <span className="inline-block px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-[9px] font-black uppercase tracking-[0.3em] border border-amber-500/20 mb-4">
                            Leadership & Governance
                        </span>
                        <h1 className="text-4xl md:text-5xl font-outfit font-bold leading-tight mb-4">
                            Board of <span className="text-amber-500 italic">Directors</span>
                        </h1>
                        <p className="text-white/60 text-base leading-relaxed">
                            The visionary leaders who guide the Actors Charity Foundation with decades of experience in entertainment, media, and humanitarian advocacy.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ─── DIRECTOR'S LETTER ─── */}
            <section id="directors-letter" className="py-14 md:py-20 bg-slate-50 border-b border-slate-100 scroll-mt-24">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid lg:grid-cols-3 gap-10 items-start">
                        {/* Photo card */}
                        <motion.div {...fadeIn} className="lg:col-span-1">
                            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-slate-200 shadow-xl">
                                {/* Replace with real image when available */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 to-slate-950 text-white">
                                    <span className="text-7xl font-outfit font-black text-amber-500/30">EA</span>
                                    <p className="text-xs text-slate-400 mt-3 uppercase tracking-widest">Photo Coming Soon</p>
                                </div>
                            </div>
                            <div className="mt-5 p-5 bg-white rounded-2xl border border-slate-100 shadow-sm space-y-2">
                                <h3 className="font-outfit font-bold text-slate-950 text-lg">Ejike Asiegbu</h3>
                                <p className="text-[9px] font-black uppercase tracking-widest text-amber-600">Executive Director</p>
                                <div className="pt-3 space-y-2">
                                    {BOARD_MEMBERS[0].highlights.map((h, i) => (
                                        <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                                            <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                                            {h}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* Letter */}
                        <motion.div {...fadeIn} transition={{ delay: 0.1 }} className="lg:col-span-2 space-y-6">
                            <div className="flex items-center gap-3">
                                <span className="h-0.5 w-8 bg-amber-500" />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-600">Director's Letter</span>
                            </div>
                            <div className="flex items-start gap-4 p-6 bg-amber-50 rounded-2xl border border-amber-100">
                                <Quote className="w-8 h-8 text-amber-500 shrink-0" />
                                <p className="text-slate-600 text-base italic leading-relaxed font-medium">
                                    "The roles we play in films are fleeting, but the impact we make in reality can last a lifetime. ACF exists to ensure that the influence of Nollywood becomes a permanent force for positive change in Nigeria and beyond."
                                </p>
                            </div>
                            <h2 className="text-2xl md:text-3xl font-outfit font-bold text-slate-950 leading-tight">
                                A Message from Our <span className="text-amber-600 italic">Executive Director</span>
                            </h2>
                            <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
                                {BOARD_MEMBERS[0].bio.map((para, i) => (
                                    <p key={i}>{para}</p>
                                ))}
                            </div>
                            <div className="pt-4 border-t border-slate-100 flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center text-white font-bold font-outfit">EA</div>
                                <div>
                                    <p className="font-bold text-slate-950">Ejike Asiegbu</p>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-amber-600">Executive Director, ACF</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ─── BOARD MEMBERS GRID ─── */}
            <section id="executive" className="py-14 md:py-20 scroll-mt-24">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-600 block mb-2">Governance</span>
                        <h2 className="text-3xl md:text-4xl font-outfit font-bold text-slate-950">Executive Board Members</h2>
                        <p className="text-slate-500 text-sm mt-3 max-w-xl mx-auto">Meet the dedicated individuals who govern the Actors Charity Foundation with integrity, passion, and vision.</p>
                    </div>

                    <div className="space-y-16">
                        {BOARD_MEMBERS.map((member, idx) => (
                            <motion.div
                                key={member.id}
                                id={member.id}
                                {...fadeIn}
                                transition={{ delay: idx * 0.05 }}
                                className={`grid lg:grid-cols-3 gap-8 items-start scroll-mt-24 ${idx % 2 === 1 ? 'lg:direction-rtl' : ''}`}
                            >
                                {/* Profile Card */}
                                <div className={`lg:col-span-1 ${idx % 2 === 1 ? 'lg:order-last' : ''}`}>
                                    <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-slate-100 shadow-lg">
                                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 to-slate-950 text-white">
                                            <span className="text-7xl font-outfit font-black text-amber-500/30">{member.initial}</span>
                                            <p className="text-xs text-slate-400 mt-3 uppercase tracking-widest">Photo Coming Soon</p>
                                        </div>
                                    </div>
                                    <div className="mt-4 p-5 bg-slate-50 rounded-2xl border border-slate-100 space-y-1.5">
                                        <p className="text-[9px] font-black uppercase tracking-widest text-amber-600">{member.title}</p>
                                        <h3 className="font-outfit font-bold text-slate-950 text-lg">{member.name}</h3>
                                        <p className="text-slate-400 text-xs">{member.tag}</p>
                                        <div className="pt-3 space-y-2">
                                            {member.highlights.map((h, i) => (
                                                <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                                                    <Award className="w-3 h-3 text-amber-500 mt-0.5 shrink-0" />
                                                    {h}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Bio */}
                                <div className="lg:col-span-2 space-y-5">
                                    <div className="flex items-center gap-3">
                                        <span className="h-0.5 w-6 bg-amber-500" />
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-600">Biography</span>
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-outfit font-bold text-slate-950">{member.name}</h2>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 border-l-2 border-amber-500 pl-3">{member.title}</p>
                                    <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
                                        {member.bio.map((para, i) => (
                                            <p key={i}>{para}</p>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── PHOTO GALLERY STRIP ─── */}
            <section className="py-10 bg-slate-50 border-t border-slate-100">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {[5, 6, 7, 8].map((seed) => (
                            <div key={seed} className="relative aspect-square rounded-xl overflow-hidden group">
                                <Image src={getRandomImage(seed)} alt="ACF Leadership" fill className="object-cover group-hover:scale-110 transition-transform duration-700" unoptimized />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── JOIN CTA ─── */}
            <section className="py-14 bg-slate-950 text-white text-center">
                <div className="max-w-2xl mx-auto px-6 space-y-5">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-500 block">Get Involved</span>
                    <h2 className="text-3xl font-outfit font-bold">Want to Partner with ACF Leadership?</h2>
                    <p className="text-slate-400 text-sm leading-relaxed">Whether you're a brand, NGO, or individual — we welcome collaboration that shares our vision for a more equitable and creatively vibrant Nigeria.</p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                        <Link href="/contact" className="px-8 py-3.5 bg-amber-500 text-slate-950 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2">
                            <Mail className="w-4 h-4" /> Contact Us
                        </Link>
                        <Link href="/about" className="px-8 py-3.5 border border-white/20 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-white/5 transition-all">
                            Back to About
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
