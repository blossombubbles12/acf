"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

interface LightboxProps {
    isOpen: boolean;
    onClose: () => void;
    media: { secure_url: string; resource_type: string; public_id: string }[];
    currentIndex: number;
    onNext: () => void;
    onPrev: () => void;
}

export function Lightbox({ isOpen, onClose, media, currentIndex, onNext, onPrev }: LightboxProps) {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowRight") onNext();
            if (e.key === "ArrowLeft") onPrev();
        };
        if (isOpen) {
            window.addEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "hidden";
        }
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "auto";
        };
    }, [isOpen, onClose, onNext, onPrev]);

    if (!isOpen) return null;

    const currentItem = media[currentIndex];

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10"
            >
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 z-[210] p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all"
                >
                    <X className="w-6 h-6" />
                </button>

                <div className="absolute top-6 left-6 z-[210] flex items-center gap-3">
                    <div className="px-4 py-1.5 bg-white/10 rounded-full border border-white/10 backdrop-blur-md">
                        <p className="text-white text-xs font-bold tracking-widest uppercase">
                            {currentIndex + 1} / {media.length}
                        </p>
                    </div>
                </div>

                <button
                    onClick={(e) => { e.stopPropagation(); onPrev(); }}
                    className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 z-[210] p-4 bg-white/5 hover:bg-white/10 text-white rounded-full transition-all border border-white/5"
                >
                    <ChevronLeft className="w-8 h-8" />
                </button>

                <button
                    onClick={(e) => { e.stopPropagation(); onNext(); }}
                    className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 z-[210] p-4 bg-white/5 hover:bg-white/10 text-white rounded-full transition-all border border-white/5"
                >
                    <ChevronRight className="w-8 h-8" />
                </button>

                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative w-full h-full max-w-6xl flex items-center justify-center cursor-default"
                    onClick={(e) => e.stopPropagation()}
                >
                    {currentItem.resource_type === "video" ? (
                        <video
                            src={currentItem.secure_url}
                            controls
                            autoPlay
                            className="max-w-full max-h-full rounded-2xl shadow-2xl"
                        />
                    ) : (
                        <Image
                            src={currentItem.secure_url}
                            alt={currentItem.public_id}
                            width={1920}
                            height={1080}
                            className="object-contain max-w-full max-h-full rounded-lg shadow-2xl"
                            unoptimized
                        />
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
