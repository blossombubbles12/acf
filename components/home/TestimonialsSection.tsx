"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";

interface Testimonial {
    quote: string;
    name: string;
    role: string;
    initial: string;
}

const TESTIMONIALS: Testimonial[] = [
    {
        quote: "ACF has given us a platform to convert our influence into measurable humanitarian outcomes. This is what true star power looks like.",
        name: "Ejike Asiegbu",
        role: "Executive Director, ACF",
        initial: "EA",
    },
    {
        quote: "The stories we tell on screen are powerful, but the stories we write in communities through ACF are truly transformational.",
        name: "Zik Zulu Okafor",
        role: "Board Member, ACF",
        initial: "ZZ",
    },
    {
        quote: "ACF proves that the entertainment industry can be a force for good — bridging the gap between glamour and grassroots impact.",
        name: "Mrs. Ogechi Asiegbu",
        role: "Board Member, ACF",
        initial: "OA",
    },
];

export function TestimonialsSection() {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(0);

    const next = useCallback(() => {
        setDirection(1);
        setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
    }, []);

    const prev = useCallback(() => {
        setDirection(-1);
        setCurrent((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
    }, []);

    useEffect(() => {
        const interval = setInterval(next, 7000);
        return () => clearInterval(interval);
    }, [next]);

    const variants = {
        enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (dir: number) => ({ x: dir < 0 ? 300 : -300, opacity: 0 }),
    };

    const testimonial = TESTIMONIALS[current];

    return (
        <section className="py-16 md:py-20 bg-white overflow-hidden">
            <div className="max-w-4xl mx-auto px-6 text-center">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-600 block mb-3">
                    Voices of Impact
                </span>
                <h2 className="text-3xl md:text-4xl font-outfit font-bold text-slate-950 mb-12">
                    What Our <span className="text-amber-600 italic">Leaders</span> Say
                </h2>

                <div className="relative min-h-[280px] flex items-center justify-center">
                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                            key={current}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="w-full"
                        >
                            {/* Stars */}
                            <div className="flex items-center justify-center gap-1 mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />
                                ))}
                            </div>

                            {/* Quote */}
                            <div className="relative max-w-2xl mx-auto">
                                <Quote className="w-10 h-10 text-amber-500/20 mx-auto mb-4" />
                                <blockquote className="text-lg md:text-xl text-slate-700 font-medium leading-relaxed italic">
                                    &ldquo;{testimonial.quote}&rdquo;
                                </blockquote>
                            </div>

                            {/* Attribution */}
                            <div className="mt-8 flex flex-col items-center gap-3">
                                <div className="w-14 h-14 rounded-full bg-slate-950 flex items-center justify-center text-white font-outfit font-bold text-lg">
                                    {testimonial.initial}
                                </div>
                                <div>
                                    <p className="font-bold text-slate-950 text-sm">{testimonial.name}</p>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-amber-600 mt-0.5">
                                        {testimonial.role}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center gap-6 mt-8">
                    <button
                        onClick={prev}
                        className="p-2.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all"
                        aria-label="Previous testimonial"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    <div className="flex gap-2">
                        {TESTIMONIALS.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => {
                                    setDirection(idx > current ? 1 : -1);
                                    setCurrent(idx);
                                }}
                                className={`h-1.5 rounded-full transition-all duration-500 ${
                                    idx === current
                                        ? "w-8 bg-amber-500"
                                        : "w-2 bg-slate-200 hover:bg-slate-300"
                                }`}
                                aria-label={`Go to testimonial ${idx + 1}`}
                            />
                        ))}
                    </div>
                    <button
                        onClick={next}
                        className="p-2.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all"
                        aria-label="Next testimonial"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </section>
    );
}
