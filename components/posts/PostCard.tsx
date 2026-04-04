"use client";

import { useState } from "react";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { Globe, MoreHorizontal, Heart, MessageCircle, Share2, Edit2, Trash2, Lock } from "lucide-react";
import { transformCloudinary } from "@/lib/cloudinary-client";
import { DeleteConfirmModal } from "@/components/admin/DeleteConfirmModal";
import { EditPostModal } from "./EditPostModal";
import { useToast } from "@/hooks/useToast";

interface PostProps {
    post: {
        id: number;
        content: string;
        media: any[];
        created_at: string;
        status: string;
    };
    onUpdate?: () => void;
}

export function PostCard({ post, onUpdate }: PostProps) {
    const mediaItems = Array.isArray(post.media) ? post.media : [];
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [showActions, setShowActions] = useState(false);
    const { success, error, ToastContainer } = useToast();

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            const res = await fetch(`/api/posts/${post.id}`, { method: "DELETE" });
            if (res.ok) {
                success("Post deleted successfully!");
                onUpdate?.();
            } else {
                error("Failed to delete post. Please try again.");
            }
        } catch (err) {
            console.error("Failed to delete post", err);
            error("An error occurred while deleting the post.");
        } finally {
            setIsDeleting(false);
            setShowDeleteModal(false);
        }
    };

    const handleEdit = async (content: string, status: string) => {
        setIsSaving(true);
        try {
            const res = await fetch(`/api/posts/${post.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content, status })
            });
            if (res.ok) {
                success("Post updated successfully!");
                setShowEditModal(false);
                onUpdate?.();
            } else {
                error("Failed to update post. Please try again.");
            }
        } catch (err) {
            console.error("Failed to update post", err);
            error("An error occurred while updating the post.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden mb-8 group hover:shadow-xl transition-all duration-500">
            <ToastContainer />

            <DeleteConfirmModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDelete}
                title="Delete Post?"
                description="This action cannot be undone. This will permanently remove the post and all associated media."
                loading={isDeleting}
            />

            <EditPostModal
                isOpen={showEditModal}
                onClose={() => setShowEditModal(false)}
                onSave={handleEdit}
                post={post}
                loading={isSaving}
            />

            {/* Post Header */}
            <div className="p-5 sm:p-6 pb-2 sm:pb-4 flex items-center justify-between">
                <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-tr from-[#2c517d] to-primary rounded-xl sm:rounded-2xl flex items-center justify-center text-white font-black text-lg sm:text-xl shadow-lg shadow-primary/10">
                        A
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900 text-sm sm:text-base leading-tight">ACF Admin</h4>
                        <div className="flex items-center gap-2 text-gray-400 text-[9px] sm:text-[10px] font-black uppercase tracking-widest mt-0.5 sm:mt-1">
                            <span>{formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}</span>
                            <span>•</span>
                            {post.status === 'published' ? (
                                <><Globe className="w-2.5 h-2.5 sm:w-3 h-3" /> Public</>
                            ) : (
                                <><Lock className="w-2.5 h-2.5 sm:w-3 h-3" /> Draft</>
                            )}
                        </div>
                    </div>
                </div>
                <div className="relative">
                    <button
                        onClick={() => setShowActions(!showActions)}
                        className="p-2 hover:bg-slate-50 rounded-full transition-colors"
                    >
                        <MoreHorizontal className="w-5 h-5 text-gray-400" />
                    </button>
                    {showActions && (
                        <div className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-xl border border-gray-100 py-2 min-w-[160px] z-10">
                            <button
                                onClick={() => {
                                    setShowEditModal(true);
                                    setShowActions(false);
                                }}
                                className="w-full px-4 py-2 text-left text-sm font-bold text-gray-700 hover:bg-slate-50 flex items-center gap-2 transition-colors"
                            >
                                <Edit2 className="w-4 h-4 text-primary" />
                                Edit Post
                            </button>
                            <button
                                onClick={() => {
                                    setShowDeleteModal(true);
                                    setShowActions(false);
                                }}
                                className="w-full px-4 py-2 text-left text-sm font-bold text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                            >
                                <Trash2 className="w-4 h-4" />
                                Delete Post
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Post Content */}
            <div className="px-5 sm:px-6 py-2 sm:py-4">
                <div 
                    className="text-gray-700 leading-relaxed text-base sm:text-lg rich-text-content"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />
                <style jsx>{`
                    .rich-text-content :global(p) { margin-bottom: 0.75rem; }
                    .rich-text-content :global(ul), .rich-text-content :global(ol) { margin: 1rem 0; padding-left: 1.5rem; }
                    .rich-text-content :global(li) { margin-bottom: 0.25rem; }
                    .rich-text-content :global(blockquote) { border-left: 4px solid #f59e0b; padding-left: 1rem; color: #4b5563; font-style: italic; margin: 1rem 0; }
                    .rich-text-content :global(a) { color: #1e40af; text-decoration: underline; }
                `}</style>
            </div>

            {/* Post Media - Facebook Style Grid */}
            {mediaItems.length > 0 && (
                <div className={`mt-4 grid gap-1 border-y border-gray-50 ${mediaItems.length === 1 ? 'grid-cols-1' :
                    mediaItems.length === 2 ? 'grid-cols-2' :
                        mediaItems.length === 3 ? 'grid-cols-2' :
                            'grid-cols-2 lg:grid-cols-2'
                    }`}>
                    {mediaItems.slice(0, 4).map((item: any, idx: number) => (
                        <div key={idx} className={`relative overflow-hidden group bg-slate-100 ${mediaItems.length === 1 ? 'aspect-video' : 
                            (mediaItems.length === 3 && idx === 0) ? 'row-span-2 aspect-auto' : 'aspect-square'
                            }`}>
                            {item.type === 'video' ? (
                                <video src={item.url} controls className="w-full h-full object-contain bg-black" />
                            ) : (
                                <Image
                                    src={transformCloudinary(item.url)}
                                    alt="Post media"
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                    unoptimized
                                />
                            )}
                            {/* Overlay for more items */}
                            {idx === 3 && mediaItems.length > 4 && (
                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-2xl font-black">
                                    +{mediaItems.length - 4}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Post Actions */}
            <div className="p-4 px-6 border-t border-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <button className="flex items-center gap-2 text-gray-500 hover:text-red-500 font-bold text-sm transition-colors">
                        <Heart className="w-5 h-5" /> 24
                    </button>
                    <button className="flex items-center gap-2 text-gray-500 hover:text-primary font-bold text-sm transition-colors">
                        <MessageCircle className="w-5 h-5" /> 8
                    </button>
                </div>
                <button className="flex items-center gap-2 text-gray-500 hover:text-primary font-bold text-sm transition-colors">
                    <Share2 className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}
