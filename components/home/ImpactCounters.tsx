"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface CounterProps {
    end: number;
    suffix?: string;
    label: string;
    duration?: number;
}

function AnimatedCounter({ end, suffix = "", label, duration = 2 }: CounterProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isInView) return;

        let startTime: number;
        let animFrame: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));

            if (progress < 1) {
                animFrame = requestAnimationFrame(animate);
            }
        };

        animFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animFrame);
    }, [isInView, end, duration]);

    return (
        <div ref={ref} className="text-center">
            <motion.p
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, type: "spring" }}
                className="text-4xl md:text-5xl lg:text-6xl font-outfit font-black text-amber-500 leading-none"
            >
                {count.toLocaleString()}{suffix}
            </motion.p>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mt-3">
                {label}
            </p>
        </div>
    );
}

const IMPACT_STATS = [
    { end: 5000, suffix: "+", label: "Lives Impacted" },
    { end: 50, suffix: "+", label: "Industry Ambassadors" },
    { end: 12, suffix: "+", label: "Impact Regions" },
    { end: 25, suffix: "+", label: "Completed Programs" },
];

export function ImpactCounters() {
    return (
        <section className="py-16 md:py-20 bg-slate-950 text-white relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                <div className="text-center mb-14">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-500 block mb-3">
                        Measurable Outcomes
                    </span>
                    <h2 className="text-3xl md:text-4xl font-outfit font-bold leading-tight">
                        Our Impact in <span className="text-amber-500 italic">Numbers</span>
                    </h2>
                    <p className="text-slate-400 text-sm mt-4 max-w-lg mx-auto leading-relaxed">
                        Since our founding, ACF has been committed to creating tangible, measurable change in communities across Nigeria.
                    </p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
                    {IMPACT_STATS.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            className="p-6 md:p-8 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:bg-white/[0.06] transition-all"
                        >
                            <AnimatedCounter {...stat} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
