"use client";

import { useEffect, useState } from "react";
import { ShowcaseCarousel } from "./ShowcaseCarousel";
import { Newspaper, MessageSquare, ArrowRight, Clock } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import { useCloudinaryPool } from "@/hooks/useCloudinaryPool";

interface Post {
    id: number;
    content: string;
    media: { type: string; url: string }[] | null;
    created_at: string;
}

export function PostsShowcase() {
    const { getRandomImage } = useCloudinaryPool('home');
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPosts() {
            try {
                const res = await fetch("/api/posts");
                const data = await res.json();
                setPosts(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error("Failed to fetch posts");
            } finally {
                setLoading(false);
            }
        }
        fetchPosts();
    }, []);

    if (loading) return null;
    if (posts.length === 0) return null;

    return (
        <ShowcaseCarousel
            title="Latest Humanitarian Updates"
            subtitle="Impact & News"
            items={posts}
            viewAllHref="/news"
            columns={3}
            renderItem={(post) => {
                const firstMedia = post.media && post.media[0];
                return (
                    <div className="group bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden hover:bg-white hover:shadow-xl transition-all duration-500 h-full flex flex-col">
                        <div className="relative h-64 overflow-hidden">
                            <Image
                                src={firstMedia ? firstMedia.url : getRandomImage(post.id)}
                                alt="Post media"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                unoptimized
                            />
                        </div>
                        <div className="p-6 flex-grow flex flex-col">
                            <div className="flex items-center gap-2.5 mb-4">
                                <div className="w-7 h-7 rounded-lg bg-slate-900 flex items-center justify-center text-white text-[9px] font-black">A</div>
                                <div>
                                    <p className="text-[9px] font-black text-slate-900 uppercase tracking-wider">ACF Admin</p>
                                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                                        {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
                                    </p>
                                </div>
                            </div>
                            <p className="text-slate-600 font-medium leading-relaxed mb-6 line-clamp-3 text-xs">
                                {post.content}
                            </p>
                            <Link
                                href="/news"
                                className="mt-auto inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-slate-900 hover:text-amber-600 transition-colors"
                            >
                                Read More <ArrowRight className="w-3 h-3" />
                            </Link>
                        </div>
                    </div>
                );
            }}
        />
    );
}

