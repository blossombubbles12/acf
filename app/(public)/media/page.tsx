"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Film, ImageIcon, Loader2, Play, Folder as FolderIcon, ChevronLeft, LayoutGrid, Eye } from "lucide-react";
import { Lightbox } from "@/components/media/Lightbox";
import { motion } from "framer-motion";
import { useCloudinaryPool } from "@/hooks/useCloudinaryPool";

interface MediaItem {
    public_id: string;
    resource_type: string;
    secure_url: string;
    created_at: string;
}

interface Album {
    name: string;
    path: string;
    count: number;
    cover: string | null;
}

export default function MediaPage() {
    const { images, getRandomImage } = useCloudinaryPool('media', 20);
    const [albums, setAlbums] = useState<Album[]>([]);
    const [activeAlbum, setActiveAlbum] = useState<string | null>(null);
    const [media, setMedia] = useState<MediaItem[]>([]);
    const [loading, setLoading] = useState(true);

    // Lightbox state
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    // Fetch albums initially
    useEffect(() => {
        async function fetchInitialData() {
            try {
                const resFolders = await fetch("/api/media/folders?exclude_system=true");
                const folders = await resFolders.json();
                setAlbums(Array.isArray(folders) ? folders : []);

                // Fetch root media by default
                const resMedia = await fetch("/api/media?exclude_system=true");
                const mediaData = await resMedia.json();
                setMedia(Array.isArray(mediaData) ? mediaData : []);
            } catch (err) {
                console.error("Failed to load initial media data");
            } finally {
                setLoading(false);
            }
        }
        fetchInitialData();
    }, []);

    // Fetch media when an album is selected or reset to root
    const handleAlbumSelect = async (albumName: string | null) => {
        setActiveAlbum(albumName);
        setLoading(true);
        try {
            const url = albumName ? `/api/media?folder=${encodeURIComponent(albumName)}` : "/api/media?exclude_system=true";
            const res = await fetch(url);
            const data = await res.json();
            setMedia(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Failed to load media");
        } finally {
            setLoading(false);
        }
    };

    const openLightbox = (index: number) => {
        setLightboxIndex(index);
        setIsLightboxOpen(true);
    };

    if (!activeAlbum) {
        return (
            <div className="bg-slate-50 min-h-screen">
                {/* Hero Section */}
                <section className="relative pt-20 pb-12 bg-[#0a1128] text-white text-center">
                    <div className="absolute inset-0 z-0 opacity-20">
                        <Image
                            src={getRandomImage(0)}
                            alt="Media Archive"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="container mx-auto px-4 relative z-10">
                        <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-accent/20 text-accent text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] mb-4 sm:mb-6 border border-accent/20">
                            Digital Repository
                        </span>
                        <h1 className="text-4xl sm:text-4xl sm:text-5xl md:text-6xl font-serif font-bold mb-4 sm:mb-6 italic leading-tight">Media <span className="font-light not-italic">Archive</span></h1>
                        <p className="text-sm sm:text-base md:text-lg text-white/60 max-w-2xl mx-auto font-medium leading-relaxed">
                            A visual chronicle of the Actors Charity Foundation (ACF) — creativity, impact, and a legacy of social change.
                        </p>
                    </div>
                </section>

                <div className="container mx-auto px-4 py-12 md:py-16">

                    {loading ? (
                        <div className="flex justify-center py-12"><Loader2 className="w-10 h-10 animate-spin text-primary/20" /></div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
                            {/* Root Gallery Card */}
                            <button
                                onClick={() => handleAlbumSelect(null)}
                                className="group relative h-[350px] sm:h-[450px] rounded-[2rem] sm:rounded-[3rem] overflow-hidden shadow-xl sm:shadow-2xl transition-all duration-700 bg-[#2c517d]"
                            >
                                <div className="absolute inset-0 bg-gradient-to-t from-[#2c517d] via-transparent to-transparent z-10 opacity-80" />
                                <div className="absolute inset-0 flex flex-col items-center justify-end text-white z-20 p-8 sm:p-12 text-center">
                                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-accent rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 shadow-xl shadow-accent/20 group-hover:scale-110 transition-transform duration-500">
                                        <LayoutGrid className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                                    </div>
                                    <h3 className="text-2xl sm:text-4xl font-serif font-bold mb-2">General Library</h3>
                                    <p className="text-accent/60 font-bold uppercase tracking-widest text-[9px] sm:text-[10px]">Root Archive</p>
                                </div>
                            </button>

                            {Array.isArray(albums) && albums.map((album, idx) => (
                                <button
                                    key={album.name}
                                    onClick={() => handleAlbumSelect(album.name)}
                                    className="group relative h-[350px] sm:h-[450px] rounded-[2rem] sm:rounded-[3rem] overflow-hidden shadow-xl sm:shadow-2xl transition-all duration-700 isolate bg-gray-200"
                                >
                                    <Image
                                        src={album.cover || getRandomImage(idx + 2)}
                                        alt={album.name}
                                        fill
                                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                        unoptimized
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0e162d] via-transparent to-transparent z-10 opacity-90 group-hover:opacity-100 transition-opacity" />

                                    <div className="absolute top-6 right-6 sm:top-8 sm:right-8 z-20 bg-white/10 backdrop-blur-xl border border-white/10 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full">
                                        <p className="text-white text-[9px] sm:text-[10px] font-black tracking-widest uppercase">{album.count} Items</p>
                                    </div>

                                    <div className="absolute inset-0 flex flex-col items-start justify-end text-white z-20 p-8 sm:p-12 text-left">
                                        <FolderIcon className="w-8 h-8 sm:w-10 sm:h-10 mb-4 sm:mb-6 text-accent" />
                                        <h3 className="text-2xl sm:text-4xl font-serif font-bold leading-tight mb-2">{album.name}</h3>
                                        <p className="text-white/50 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em]">View Collection</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="relative pt-20 pb-12 bg-[#0a1128] text-white">
                <div className="absolute inset-0 z-0 opacity-20">
                    <Image
                        src={getRandomImage(1)}
                        alt="Album View"
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <button
                        onClick={() => handleAlbumSelect(null)}
                        className="group flex items-center gap-3 text-[10px] font-bold text-white/40 hover:text-accent uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-8 sm:mb-12 transition-all"
                    >
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-accent group-hover:text-primary transition-all">
                            <ChevronLeft className="w-4 h-4" />
                        </div>
                        Back to Archive
                    </button>
                    <span className="text-accent font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] text-[9px] sm:text-[10px] mb-3 sm:mb-4 block">Collection</span>
                    <h1 className="text-3xl sm:text-4xl sm:text-5xl md:text-6xl font-serif font-bold italic tracking-tighter leading-tight">{activeAlbum} <span className="font-light not-italic">Gallery</span></h1>
                    <div className="flex items-center gap-2 mt-6 sm:mt-8 px-4 sm:px-6 py-2 bg-white/5 rounded-full font-bold text-[10px] sm:text-xs text-white/40 border border-white/10 w-fit">
                        <ImageIcon className="w-4 h-4" /> {Array.isArray(media) ? media.length : 0} Resources
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4 py-12">

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-40 text-primary/40">
                        <Loader2 className="w-12 h-12 animate-spin mb-4" />
                        <p className="font-medium animate-pulse uppercase tracking-widest text-xs">Unlocking gallery...</p>
                    </div>
                ) : (
                    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-8 space-y-8">
                        {Array.isArray(media) && media.map((item, index) => (
                            <motion.div
                                layoutId={item.public_id}
                                key={item.public_id}
                                className="group relative bg-slate-50 rounded-[2.5rem] overflow-hidden border border-gray-100 cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-700 break-inside-avoid"
                                onClick={() => openLightbox(index)}
                            >
                                <div className="relative overflow-hidden">
                                    {item.resource_type === "video" ? (
                                        <div className="aspect-[3/4] bg-slate-100 flex flex-col items-center justify-center">
                                            <Film className="w-12 h-12 text-gray-300" />
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                                                <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform">
                                                    <Play className="w-8 h-8 text-white fill-current translate-x-0.5" />
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="relative overflow-hidden">
                                            <Image
                                                src={item.secure_url}
                                                alt={item.public_id}
                                                width={800}
                                                height={1200}
                                                className="w-full h-auto object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                                                unoptimized
                                            />
                                            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl scale-50 group-hover:scale-100 transition-transform duration-500">
                                                    <Eye className="w-6 h-6 text-primary" />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            <Lightbox
                isOpen={isLightboxOpen}
                onClose={() => setIsLightboxOpen(false)}
                media={media}
                currentIndex={lightboxIndex}
                onNext={() => setLightboxIndex((prev) => (prev + 1) % media.length)}
                onPrev={() => setLightboxIndex((prev) => (prev - 1 + media.length) % media.length)}
            />
        </div>
    );
}
