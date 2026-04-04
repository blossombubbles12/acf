"use client";

import { useState, useEffect } from "react";
import { CreatePostForm } from "@/components/posts/CreatePostForm";
import { PostCard } from "@/components/posts/PostCard";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/useToast";
import { useAuth } from "@/hooks/useAuth";

export function NewsFeedClient() {
    const { isAdmin, loading: authLoading } = useAuth();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { success, ToastContainer } = useToast();

    const fetchPosts = async () => {
        try {
            const res = await fetch("/api/posts");
            const data = await res.json();
            setPosts(data);
        } catch (err) {
            console.error("Failed to fetch posts");
        } finally {
            setLoading(false);
        }
    };

    const handleCreateSuccess = () => {
        success("Post created successfully!");
        fetchPosts();
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    if (authLoading) return (
        <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-primary/20" />
        </div>
    );

    return (
        <div className="max-w-3xl mx-auto relative text-sm">
            <ToastContainer />
            {isAdmin && <CreatePostForm onSuccess={handleCreateSuccess} />}

            <div className="space-y-8">
                <div className="flex items-center gap-3 mb-6">
                    <h3 className="text-xl font-serif font-bold text-gray-900">Recent Feed</h3>
                    <div className="h-px flex-grow bg-gray-100" />
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="w-10 h-10 animate-spin text-primary/20" />
                    </div>
                ) : !Array.isArray(posts) || posts.length === 0 ? (
                    <div className="bg-white rounded-[2rem] p-16 text-center border border-gray-100 italic text-gray-400">
                        {!Array.isArray(posts) ? "Could not load posts. Please check your database connection." : "No posts yet. Start the conversation above."}
                    </div>
                ) : (
                    posts.map((post: any) => (
                        <PostCard key={post.id} post={post} onUpdate={fetchPosts} />
                    ))
                )}
            </div>
        </div>
    );
}
