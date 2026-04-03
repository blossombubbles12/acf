"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { PostCard } from "@/components/posts/PostCard";
import { Loader2, TrendingUp, Calendar, Users as UsersIcon } from "lucide-react";
import { motion } from "framer-motion";

export default function NewsFeed() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPosts() {
            try {
                const res = await fetch("/api/posts");
                const data = await res.json();
                setPosts(data);
            } catch (err) {
                console.error("Failed to fetch feed");
            } finally {
                setLoading(false);
            }
        }
        fetchPosts();
    }, []);

    return (
        <div className="bg-slate-50 min-h-screen">
            {/* Hero Section */}
            <section className="relative pt-20 pb-12 bg-[#0a1128] text-white">
                <div className="absolute inset-0 z-0 opacity-20">
                    <Image
                        src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2000"
                        alt="News"
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-accent/20 text-accent text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] mb-4 sm:mb-6 border border-accent/20">
                        Class Timeline
                    </span>
                    <h1 className="text-4xl sm:text-4xl sm:text-5xl md:text-6xl font-serif font-bold mb-4 sm:mb-6 italic leading-tight">News & <span className="font-light not-italic">Stories</span></h1>
                    <p className="text-sm sm:text-base md:text-lg text-white/60 max-w-2xl mx-auto font-medium leading-relaxed">
                        Updates, achievements, and important highlights from our global brotherhood.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* ... sidebar ... */}
                    <aside className="hidden lg:block lg:col-span-3 space-y-6">
                        <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm">
                            <h3 className="text-xl font-serif font-bold text-primary mb-6">Explore News</h3>
                            <nav className="space-y-2">
                                <button className="w-full flex items-center gap-3 px-4 py-3 bg-primary/5 text-primary rounded-2xl font-bold text-sm">
                                    <TrendingUp className="w-4 h-4" /> Latest Updates
                                </button>
                                <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-slate-50 rounded-2xl font-bold text-sm transition-all">
                                    <Calendar className="w-4 h-4" /> Past Events
                                </button>
                                <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-slate-50 rounded-2xl font-bold text-sm transition-all">
                                    <UsersIcon className="w-4 h-4" /> Member Stories
                                </button>
                            </nav>
                        </div>
                    </aside>

                    {/* Main Feed */}
                    <main className="lg:col-span-6">

                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-40">
                                <Loader2 className="w-12 h-12 animate-spin text-primary/20 mb-4" />
                                <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Assembling feed...</p>
                            </div>
                        ) : !Array.isArray(posts) || posts.length === 0 ? (
                            <div className="bg-white rounded-[3rem] p-20 text-center border border-gray-100 shadow-sm">
                                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">
                                    {!Array.isArray(posts) ? "Feed Unavailable" : "The timeline is quiet"}
                                </h3>
                                <p className="text-gray-500">
                                    {!Array.isArray(posts) ? "We're having trouble reaching the database. Please refresh." : "Check back soon for updates from our global brotherhood."}
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-8">
                                {posts.map((post: any, idx: number) => (
                                    <motion.div
                                        key={post.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                    >
                                        <PostCard post={post} />
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </main>

                    {/* Right Sidebar - Newsletter/CTA */}
                    <aside className="hidden lg:block lg:col-span-3 space-y-6">
                        <div className="bg-primary rounded-[2rem] p-8 text-white shadow-xl shadow-primary/20">
                            <h3 className="text-2xl font-serif font-bold mb-4">Stay Connected</h3>
                            <p className="text-white/70 text-sm mb-6 leading-relaxed">Join our mailing list to receive monthly digests of class achievements and reunion news.</p>
                            <form className="space-y-4">
                                <input
                                    className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-2xl outline-none focus:bg-white/20 transition-all font-medium text-sm text-white placeholder:text-white/40"
                                    placeholder="Your email address"
                                />
                                <button className="w-full py-4 bg-accent text-white rounded-2xl font-bold shadow-lg shadow-accent/20 hover:scale-105 transition-all text-sm uppercase tracking-widest">
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </aside>

                </div>
            </div>
        </div>
    );
}
