"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PostCard } from "@/components/posts/PostCard";
import { ArrowRight, Newspaper, Loader2 } from "lucide-react";

export function FeaturedPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPosts() {
            try {
                const res = await fetch("/api/posts");
                const data = await res.json();
                // Just take the top 2 for the homepage landing
                setPosts(data.slice(0, 2));
            } catch (err) {
                console.error("Failed to fetch featured news");
            } finally {
                setLoading(false);
            }
        }
        fetchPosts();
    }, []);

    if (loading) return null;
    if (!loading && posts.length === 0) return null;

    return (
        <section className="py-24 bg-slate-50">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="max-w-2xl">
                        <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-accent mb-4 underline decoration-accent/30 underline-offset-8">News & Updates</h2>
                        <h3 className="text-4xl md:text-6xl font-serif font-bold text-primary leading-tight">
                            Brotherhood in <br /> Motion.
                        </h3>
                        <p className="mt-6 text-gray-500 font-medium text-lg leading-relaxed">
                            Stay informed with the latest milestones, reunion stories, and community announcements from our global network.
                        </p>
                    </div>
                    <Link
                        href="/news"
                        className="group flex items-center gap-3 text-sm font-bold text-primary hover:text-accent transition-all uppercase tracking-[0.2em] border-b-2 border-primary/10 pb-2 mb-2"
                    >
                        Explore Timeline <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="max-w-4xl mx-auto space-y-12">
                    {posts.map((post: any) => (
                        <div key={post.id} className="transform hover:-translate-y-2 transition-transform duration-500">
                            <PostCard post={post} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
