"use client";

import { useEffect, useState } from "react";
import { ShowcaseCarousel } from "./ShowcaseCarousel";
import { ImageIcon, Folder, Maximize2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { transformCloudinary } from "@/lib/cloudinary-client";

interface Album {
    name: string;
    path: string;
    count: number;
    cover: string | null;
}

export function GalleryShowcase() {
    const [albums, setAlbums] = useState<Album[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchAlbums() {
            try {
                const res = await fetch("/api/media/folders?exclude_system=true");
                const data = await res.json();
                setAlbums(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error("Failed to fetch albums");
            } finally {
                setLoading(false);
            }
        }
        fetchAlbums();
    }, []);

    if (loading) return null;
    if (albums.length === 0) return null;

    return (
        <ShowcaseCarousel
            title="Institutional Portfolio"
            subtitle="Impact Archives"
            items={albums}
            viewAllHref="/media"
            columns={4}
            renderItem={(album) => (
                <Link
                    href={`/media/album/${album.name}`}
                    className="group relative block aspect-[4/5] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-700 border border-slate-100"
                >
                    {album.cover && (
                        <Image
                            src={transformCloudinary(album.cover)}
                            alt={album.name}
                            fill
                            className="object-cover transition-transform duration-1000 group-hover:scale-110"
                            unoptimized
                        />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent z-10" />
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
                        <div className="p-2 bg-white/20 backdrop-blur-md rounded-lg border border-white/20 text-white">
                            <Maximize2 className="w-4 h-4" />
                        </div>
                    </div>
                    <div className="absolute inset-0 flex flex-col justify-end p-6 text-white z-20">
                        <div className="mb-2 flex items-center gap-2">
                            <Folder className="w-3 h-3 text-white/50" />
                            <span className="text-[8px] font-black uppercase tracking-widest text-white/50">{album.count} items</span>
                        </div>
                        <h4 className="text-lg font-outfit font-bold leading-tight group-hover:text-amber-500 transition-colors uppercase tracking-tight">{album.name}</h4>
                    </div>
                </Link>
            )}
        />
    );
}

