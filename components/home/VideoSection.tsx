"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCloudinaryPool } from "@/hooks/useCloudinaryPool";

export function VideoSection() {
    const { getRandomImage } = useCloudinaryPool('home');
    const { images: videos } = useCloudinaryPool('video', 1, 'video');
    const [isOpen, setIsOpen] = useState(false);
    
    // Fallback to static video if none uploaded yet to 'video' folder
    const videoUrl = videos && videos.length > 0 && Array.isArray(videos) && !videos[0].includes('unsplash') 
        ? videos[0] 
        : "https://res.cloudinary.com/dtw0ajpwa/video/upload/q_auto/f_auto/v1775238046/WhatsApp_Video_2026-04-03_at_5.08.58_PM_n57tg8.mp4";
        
    const thumbnail = getRandomImage(8);

    return (
        <section className="py-8 md:py-16 bg-white overflow-hidden">
            {/* Section Label */}
            <div className="max-w-6xl mx-auto px-4 mb-6 md:mb-10">
                <div className="flex items-center gap-3">
                    <span className="h-px w-8 bg-accent" />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent">Official Teaser</span>
                </div>
                <h2 className="text-2xl md:text-4xl font-serif font-bold text-gray-900 mt-3 leading-tight">
                    Actors Charity Foundation: <span className="text-primary italic font-light">Impact & Vision</span>
                </h2>
            </div>

            {/* Video Container — full-width on mobile */}
            <div className="max-w-6xl mx-auto px-0 sm:px-4">
                <div className="relative group">
                    {/* Decorative blobs – hide on small screens */}
                    <div className="hidden md:block absolute -top-12 -left-12 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10 animate-pulse" />
                    <div className="hidden md:block absolute -bottom-12 -right-12 w-64 h-64 bg-accent/10 rounded-full blur-3xl -z-10 animate-pulse delay-700" />

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative w-full aspect-video rounded-none sm:rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-none sm:shadow-2xl border-0 sm:border border-gray-100"
                    >
                        {/* Thumbnail */}
                        <Image
                            src={thumbnail}
                            alt="ACF Video Teaser"
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-1000"
                            unoptimized
                        />

                        {/* Dark Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />

                        {/* Play Button — centred */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setIsOpen(true)}
                                aria-label="Play video"
                                className="w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 bg-white/20 backdrop-blur-md rounded-full border-2 border-white/50 flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-500 shadow-2xl"
                            >
                                <Play className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white fill-white ml-1 md:ml-2" />
                            </motion.button>
                        </div>

                        {/* Bottom-left label */}
                        <div className="absolute bottom-6 left-5 sm:bottom-10 sm:left-10 md:bottom-14 md:left-14 text-white">
                            <span className="inline-block px-3 py-1 bg-accent text-white text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-3">
                                Exclusive Teaser
                            </span>
                            <p className="text-base sm:text-xl md:text-3xl font-serif font-bold leading-snug drop-shadow-lg">
                                Watch the Day 3 Highlights
                            </p>
                        </div>

                        {/* Duration badge */}
                        <div className="absolute top-5 right-5 sm:top-8 sm:right-8 px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-full text-white text-[10px] font-bold tracking-wider">
                            ▶  FULL TEASER
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Video Modal */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-2 sm:p-6 md:p-10"
                        onClick={() => setIsOpen(false)}
                    >
                        {/* Close Button */}
                        <button
                            className="absolute top-4 right-4 md:top-8 md:right-8 w-11 h-11 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors z-50 border border-white/20"
                            onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="w-full max-w-7xl aspect-video rounded-xl md:rounded-3xl overflow-hidden shadow-2xl bg-black"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <video
                                src={videoUrl}
                                className="w-full h-full"
                                controls
                                autoPlay
                                playsInline
                            >
                                Your browser does not support the video tag.
                            </video>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
