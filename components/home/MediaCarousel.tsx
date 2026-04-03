"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ImageIcon, Loader2, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MediaItem {
    public_id: string;
    secure_url: string;
    filename: string;
}

export function MediaCarousel() {
    const [items, setItems] = useState<MediaItem[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [direction, setDirection] = useState(0);

    useEffect(() => {
        async function fetchFeatured() {
            try {
                const res = await fetch("/api/media/featured");
                const data = await res.json();
                setItems(data);
            } catch (err) {
                console.error("Failed to fetch featured media");
            } finally {
                setLoading(false);
            }
        }
        fetchFeatured();
    }, []);

    const slideNext = useCallback(() => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % items.length);
    }, [items.length]);

    const slidePrev = useCallback(() => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    }, [items.length]);

    // Auto-play
    useEffect(() => {
        if (items.length === 0) return;
        const interval = setInterval(slideNext, 6000);
        return () => clearInterval(interval);
    }, [slideNext, items.length]);

    if (loading) return (
        <div className="h-[600px] flex items-center justify-center bg-slate-50">
            <Loader2 className="w-10 h-10 animate-spin text-primary/20" />
        </div>
    );

    if (items.length === 0) return null;

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
            scale: 1.1
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.9,
            transition: { duration: 0.5 }
        })
    };

    return (
        <section className="relative h-[700px] md:h-[850px] overflow-hidden bg-navy">
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
                        opacity: { duration: 0.6 },
                        scale: { duration: 0.8 }
                    }}
                    className="absolute inset-0"
                >
                    <Image
                        src={items[currentIndex].secure_url}
                        alt="Class Memory"
                        fill
                        className="object-cover"
                        priority
                        unoptimized
                    />
                    {/* Enhanced Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </motion.div>
            </AnimatePresence>

            {/* Content Overlay */}
            <div className="relative z-20 h-full container mx-auto px-4 flex flex-col justify-center">
                <div className="max-w-3xl space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <p className="text-white/60 font-black uppercase tracking-[0.5em] text-xs mb-4">Empowering Our Community</p>
                        <h2 className="text-5xl md:text-8xl font-serif font-bold text-white leading-[1.1] tracking-tighter">
                            Legacy in Every <br /> <span className="text-white/90">Moment.</span>
                        </h2>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-white/70 text-lg md:text-xl font-light max-w-xl leading-relaxed"
                    >
                        Explore the visual tapestry of the Actors Charity Foundation,
                        documenting our journey of impact across the globe. Preserving memories of transformation.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="flex flex-wrap items-center gap-6"
                    >
                        <Link
                            href="/media"
                            className="px-10 py-5 bg-accent text-white rounded-full font-bold hover:bg-accent/90 transition-all flex items-center gap-3 shadow-2xl shadow-accent/20 group text-sm uppercase tracking-widest"
                        >
                            Browse Media Hub <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Custom Controls */}
            <div className="absolute bottom-12 right-12 z-30 flex items-center gap-4">
                <button
                    onClick={slidePrev}
                    className="p-4 bg-white/10 backdrop-blur-md border border-white/10 text-white rounded-full hover:bg-white/20 transition-all shadow-xl"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <div className="flex gap-2">
                    {items.map((_, idx) => (
                        <div
                            key={idx}
                            className={`h-1 transition-all duration-300 rounded-full ${idx === currentIndex ? 'w-8 bg-white' : 'w-2 bg-white/20'}`}
                        />
                    ))}
                </div>
                <button
                    onClick={slideNext}
                    className="p-4 bg-white/10 backdrop-blur-md border border-white/10 text-white rounded-full hover:bg-white/20 transition-all shadow-xl"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>
            </div>

            {/* Decorative Visual Element */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent opacity-10" />
        </section>
    );
}
