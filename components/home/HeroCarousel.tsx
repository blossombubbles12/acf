"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Loader2, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCloudinaryPool } from "@/hooks/useCloudinaryPool";
import { transformCloudinary } from "@/lib/cloudinary-client";

interface HeroSlide {
    title: string;
    subtitle: string;
    description: string;
    ctaLabel: string;
    ctaHref: string;
    image?: string;
}

const HERO_CONTENT: HeroSlide[] = [
    {
        title: "Influence for Social Good",
        subtitle: "Harnessing the Power of Nollywood",
        description: "Uniting the reach of entertainment with strategic humanitarian action. We amplify marginalized voices to drive real-world change.",
        ctaLabel: "Learn About Our Mission",
        ctaHref: "/about",
    },
    {
        title: "Sustainability in Action",
        subtitle: "Education, Healthcare, and Advocacy",
        description: "Building long-term solutions for underserved communities. Join our network of creatives dedicated to societal transformation.",
        ctaLabel: "Partner with Us",
        ctaHref: "/community",
    },
    {
        title: "A Chronicle of Humanitarian Impact",
        subtitle: "Stories that Spark Real Change",
        description: "Browse the milestones of our outreach and the lives transformed through the compassion of our creative community.",
        ctaLabel: "Visit Impact Hub",
        ctaHref: "/media",
    }
];

export function HeroCarousel() {
    const { images, loading: poolLoading } = useCloudinaryPool('slider', 10);
    const [slides, setSlides] = useState<HeroSlide[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [direction, setDirection] = useState(0);

    useEffect(() => {
        if (!poolLoading) {
            // Match content with images from the pool
            const enrichedSlides = HERO_CONTENT.map((content, idx) => ({
                ...content,
                image: transformCloudinary(images[idx % images.length]) || ""
            }));
            setSlides(enrichedSlides);
            setLoading(false);
        }
    }, [images, poolLoading]);

    const slideNext = useCallback(() => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, [slides.length]);

    const slidePrev = useCallback(() => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    }, [slides.length]);

    // Auto-play
    useEffect(() => {
        if (slides.length === 0) return;
        const interval = setInterval(slideNext, 8000);
        return () => clearInterval(interval);
    }, [slideNext, slides.length]);

    if (loading) return (
        <div className="h-screen flex items-center justify-center bg-navy">
            <Loader2 className="w-10 h-10 animate-spin text-white/20" />
        </div>
    );

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
            transition: { duration: 0.5 }
        })
    };

    return (
        <section className="relative h-[85vh] w-full overflow-hidden bg-slate-950">
            {/* Background Slides */}
            <AnimatePresence initial={false} custom={direction}>
                <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.6 }
                    }}
                    className="absolute inset-0"
                >
                    {slides[currentIndex]?.image && (
                        <Image
                            src={slides[currentIndex].image!}
                            alt={slides[currentIndex].title}
                            fill
                            className="object-cover scale-105 animate-[ken-burns_20s_ease-in-out_infinite]"
                            priority
                            unoptimized
                        />
                    )}
                    {/* Gradients */}
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-slate-950/40 to-black/80 z-10" />
                    <div className="absolute inset-0 bg-black/20 z-10" />
                </motion.div>
            </AnimatePresence>

            {/* Content Overlay */}
            <div className="relative z-20 h-full max-w-6xl mx-auto px-6 flex flex-col justify-center items-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="w-full max-w-6xl"
                    >
                        <div className="grid lg:grid-cols-12 gap-8 items-center">
                            {/* Text Side */}
                            <div className="lg:col-span-12 text-center space-y-6">
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2, duration: 0.6 }}
                                >
                                    <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 backdrop-blur-md text-amber-500 text-[9px] font-black uppercase tracking-[0.3em] border border-amber-500/20">
                                        Collective Impact — ACF
                                    </span>
                                </motion.div>

                                <div className="space-y-2">
                                    <motion.p
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3, duration: 0.6 }}
                                        className="text-white/50 font-black uppercase tracking-[0.2em] text-[10px]"
                                    >
                                        {slides[currentIndex].subtitle}
                                    </motion.p>
                                    <motion.h1
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4, duration: 0.8 }}
                                        className="text-4xl md:text-6xl lg:text-7xl font-outfit font-bold text-white leading-tight tracking-tight"
                                    >
                                        {slides[currentIndex].title}
                                    </motion.h1>
                                </div>

                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5, duration: 0.6 }}
                                    className="text-white/70 text-base md:text-lg font-medium max-w-2xl mx-auto leading-relaxed"
                                >
                                    {slides[currentIndex].description}
                                </motion.p>

                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6, duration: 0.6 }}
                                    className="flex flex-col sm:flex-row gap-4 pt-4 justify-center"
                                >
                                    <Link
                                        href={slides[currentIndex].ctaHref}
                                        className="px-8 py-4 bg-amber-500 text-slate-950 rounded-xl font-bold hover:bg-amber-400 transition-all flex items-center justify-center gap-2 shadow-xl shadow-amber-500/10 group text-[11px] uppercase tracking-widest"
                                    >
                                        {slides[currentIndex].ctaLabel} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                    <Link
                                        href="/about"
                                        className="px-8 py-4 bg-white/5 backdrop-blur-md border border-white/10 text-white rounded-xl font-bold hover:bg-white/10 transition-all text-[11px] uppercase tracking-widest flex items-center justify-center"
                                    >
                                        Our Vision
                                    </Link>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation Controls */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-6">
                <button
                    onClick={slidePrev}
                    className="p-2 bg-white/5 backdrop-blur-lg border border-white/10 text-white rounded-lg hover:bg-white/10 transition-all"
                >
                    <ChevronLeft className="w-4 h-4" />
                </button>

                <div className="flex gap-2">
                    {slides.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => {
                                setDirection(idx > currentIndex ? 1 : -1);
                                setCurrentIndex(idx);
                            }}
                            className={`h-1 transition-all duration-500 rounded-full ${idx === currentIndex ? 'w-10 bg-amber-500' : 'w-2 bg-white/20 hover:bg-white/40'}`}
                        />
                    ))}
                </div>

                <button
                    onClick={slideNext}
                    className="p-2 bg-white/5 backdrop-blur-lg border border-white/10 text-white rounded-lg hover:bg-white/10 transition-all"
                >
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>


            <style jsx global>{`
        @keyframes ken-burns {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
      `}</style>
        </section>
    );
}
