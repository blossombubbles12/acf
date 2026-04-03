"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, X, ChevronLeft, ChevronRight, ImageIcon, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MediaItem {
    public_id: string;
    secure_url: string;
    resource_type: string;
    width: number;
    height: number;
    format: string;
    created_at: string;
}

export default function AlbumPage() {
    const params = useParams();
    const albumName = decodeURIComponent(params.name as string);

    const [items, setItems] = useState<MediaItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    useEffect(() => {
        async function fetchAlbum() {
            try {
                const res = await fetch(`/api/media?folder=${encodeURIComponent(albumName)}`);
                const data = await res.json();
                setItems(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error("Failed to fetch album", err);
            } finally {
                setLoading(false);
            }
        }
        fetchAlbum();
    }, [albumName]);

    const images = items.filter(i => i.resource_type === "image");
    const videos = items.filter(i => i.resource_type === "video");

    function prev() {
        if (lightboxIndex === null) return;
        setLightboxIndex((lightboxIndex - 1 + images.length) % images.length);
    }
    function next() {
        if (lightboxIndex === null) return;
        setLightboxIndex((lightboxIndex + 1) % images.length);
    }

    return (
        <div className="min-h-screen bg-[#FAF9F6]">
            {/* Header */}
            <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100">
                <div className="container mx-auto px-4 h-16 sm:h-20 flex items-center gap-3 sm:gap-4">
                    <Link
                        href="/media"
                        className="flex items-center gap-2 text-xs sm:text-sm font-bold text-gray-500 hover:text-primary transition-colors whitespace-nowrap"
                    >
                        <ArrowLeft className="w-4 h-4" /> <span className="hidden sm:inline">Back to Media</span><span className="sm:hidden">Back</span>
                    </Link>
                    <span className="text-gray-200">/</span>
                    <h1 className="text-sm sm:text-lg font-serif font-bold text-gray-900 truncate max-w-[150px] sm:max-w-none">{albumName}</h1>
                    {!loading && (
                        <span className="ml-auto text-[9px] sm:text-xs font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">
                            {images.length}P{videos.length > 0 ? ` / ${videos.length}V` : ""}
                        </span>
                    )}
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                {loading ? (
                    <div className="flex items-center justify-center h-64">
                        <Loader2 className="w-10 h-10 text-primary animate-spin" />
                    </div>
                ) : items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 gap-4 text-gray-400">
                        <ImageIcon className="w-16 h-16 opacity-20" />
                        <p className="font-medium">No media found in this album.</p>
                    </div>
                ) : (
                    <>
                        {/* Images Grid */}
                        {images.length > 0 && (
                            <div className="mb-16">
                                <h2 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-6">
                                    Photos
                                </h2>
                                <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4">
                                    {images.map((item, idx) => (
                                        <motion.div
                                            key={item.public_id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.03 }}
                                            className="break-inside-avoid rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 cursor-pointer group relative"
                                            onClick={() => setLightboxIndex(idx)}
                                        >
                                            <Image
                                                src={item.secure_url}
                                                alt={`Photo ${idx + 1}`}
                                                width={item.width}
                                                height={item.height}
                                                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                                                unoptimized
                                            />
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Videos Section */}
                        {videos.length > 0 && (
                            <div>
                                <h2 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-6">
                                    Videos
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {videos.map((item, idx) => (
                                        <motion.div
                                            key={item.public_id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.05 }}
                                            className="rounded-2xl overflow-hidden shadow-md bg-black"
                                        >
                                            <video
                                                src={item.secure_url}
                                                controls
                                                className="w-full aspect-video"
                                                playsInline
                                            />
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {lightboxIndex !== null && images[lightboxIndex] && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
                        onClick={() => setLightboxIndex(null)}
                    >
                        {/* Close */}
                        <button
                            className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-colors z-50"
                            onClick={() => setLightboxIndex(null)}
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Prev */}
                        <button
                            className="absolute left-2 sm:left-4 md:left-8 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-colors z-50"
                            onClick={(e) => { e.stopPropagation(); prev(); }}
                        >
                            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>

                        {/* Image */}
                        <motion.div
                            key={lightboxIndex}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative max-w-5xl max-h-[85vh] w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src={images[lightboxIndex].secure_url}
                                alt={`Photo ${lightboxIndex + 1}`}
                                width={images[lightboxIndex].width}
                                height={images[lightboxIndex].height}
                                className="max-h-[85vh] w-auto mx-auto rounded-2xl object-contain"
                                unoptimized
                            />
                        </motion.div>

                        {/* Next */}
                        <button
                            className="absolute right-2 sm:right-4 md:right-8 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-colors z-50"
                            onClick={(e) => { e.stopPropagation(); next(); }}
                        >
                            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>

                        {/* Counter */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/10 rounded-full text-white text-xs font-bold">
                            {lightboxIndex + 1} / {images.length}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
