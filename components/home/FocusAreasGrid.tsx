"use client";

import { motion } from "framer-motion";
import { BookOpen, Stethoscope, Scale, Lightbulb, Users, HandHeart } from "lucide-react";

const FOCUS_AREAS = [
    {
        icon: BookOpen,
        title: "Education Access",
        desc: "Providing scholarships, school supplies, and learning infrastructure to underserved children and youth across Nigeria.",
        color: "from-blue-500 to-blue-600",
        bgLight: "bg-blue-50",
        textColor: "text-blue-600",
    },
    {
        icon: Stethoscope,
        title: "Healthcare Outreach",
        desc: "Organizing free medical missions, health screenings, and partnering with hospitals to deliver care to communities in need.",
        color: "from-emerald-500 to-emerald-600",
        bgLight: "bg-emerald-50",
        textColor: "text-emerald-600",
    },
    {
        icon: Scale,
        title: "Human Rights Advocacy",
        desc: "Championing justice, gender equality, and fair play through public awareness campaigns and direct advocacy work.",
        color: "from-purple-500 to-purple-600",
        bgLight: "bg-purple-50",
        textColor: "text-purple-600",
    },
    {
        icon: Lightbulb,
        title: "Creative Empowerment",
        desc: "Training and mentoring emerging talent in the entertainment industry to become agents of positive social change.",
        color: "from-amber-500 to-amber-600",
        bgLight: "bg-amber-50",
        textColor: "text-amber-600",
    },
    {
        icon: Users,
        title: "Community Building",
        desc: "Strengthening local networks and fostering self-sufficiency through grassroots initiatives and volunteer programs.",
        color: "from-rose-500 to-rose-600",
        bgLight: "bg-rose-50",
        textColor: "text-rose-600",
    },
    {
        icon: HandHeart,
        title: "Disaster Relief",
        desc: "Responding swiftly to emergencies with relief materials, emergency funds, and rehabilitation support for affected families.",
        color: "from-cyan-500 to-cyan-600",
        bgLight: "bg-cyan-50",
        textColor: "text-cyan-600",
    },
];

export function FocusAreasGrid() {
    return (
        <section className="py-16 md:py-20 bg-slate-50 border-y border-slate-100">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-14">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-600 block mb-3">
                        Strategic Pillars
                    </span>
                    <h2 className="text-3xl md:text-4xl font-outfit font-bold text-slate-950 leading-tight">
                        Where We <span className="text-amber-600 italic">Focus</span>
                    </h2>
                    <p className="text-slate-500 text-sm mt-4 max-w-lg mx-auto leading-relaxed">
                        Six core impact areas that define our approach to sustainable humanitarian change across Nigeria.
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {FOCUS_AREAS.map((area, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 25 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.07, duration: 0.5 }}
                            className="group p-7 bg-white rounded-2xl border border-slate-100 hover:shadow-xl hover:border-slate-200 transition-all duration-500 relative overflow-hidden"
                        >
                            {/* Hover gradient accent */}
                            <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${area.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                            <div className={`w-12 h-12 ${area.bgLight} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500`}>
                                <area.icon className={`w-6 h-6 ${area.textColor}`} />
                            </div>

                            <h3 className="text-base font-outfit font-bold text-slate-950 mb-2.5 group-hover:text-amber-600 transition-colors">
                                {area.title}
                            </h3>

                            <p className="text-slate-500 text-xs leading-relaxed font-medium">
                                {area.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
