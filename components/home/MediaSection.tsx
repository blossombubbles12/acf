"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Folder, ImageIcon, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface Album {
    name: string;
    count: number;
    cover: string | null;
}

export function MediaSection() {
    const [albums, setAlbums] = useState<Album[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchFeatured() {
            try {
                const res = await fetch("/api/media/folders");
                const data = await res.json();
                const fetchedAlbums = Array.isArray(data) ? data : [];
                // Take the top 3-4 albums for the homepage
                setAlbums(fetchedAlbums.slice(0, 4));
            } catch (err) {
                console.error("Failed to fetch featured media");
            } finally {
                setLoading(false);
            }
        }
        fetchFeatured();
    }, []);

    if (loading) return null;
    if (!loading && albums.length === 0) return null;

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="max-w-2xl">
                        <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-accent mb-4">Visual Legacy</h2>
                        <h3 className="text-4xl md:text-6xl font-serif font-bold text-primary leading-tight">
                            A Journey Through <br /> Our Shared Memories
                        </h3>
                    </div>
                    <Link
                        href="/media"
                        className="group flex items-center gap-3 text-sm font-bold text-primary hover:text-accent transition-all uppercase tracking-widest border-b-2 border-primary/10 pb-2"
                    >
                        Explore Full Archive <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {Array.isArray(albums) && albums.map((album, index) => (
                        <motion.div
                            key={album.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link
                                href="/media"
                                className="group block relative h-[500px] rounded-[3rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-700"
                            >
                                {album.cover ? (
                                    <Image
                                        src={album.cover}
                                        alt={album.name}
                                        fill
                                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                        unoptimized
                                    />
                                ) : (
                                    <div className="h-full w-full bg-slate-100 flex items-center justify-center">
                                        <ImageIcon className="w-12 h-12 text-slate-200" />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent z-10" />

                                <div className="absolute inset-0 flex flex-col justify-end p-10 text-white z-20">
                                    <div className="mb-6 flex items-center gap-2">
                                        <Folder className="w-5 h-5 text-white/80" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-white/60">{album.count} Resources</span>
                                    </div>
                                    <h4 className="text-3xl font-serif font-bold leading-tight group-hover:text-white transition-colors">{album.name}</h4>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
