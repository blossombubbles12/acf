"use client";

import { useState, useEffect } from "react";
import { Edit2, Trash2, Globe, Lock, Loader2 } from "lucide-react";
import { createPortal } from "react-dom";

interface EditPostModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (content: string, status: string) => Promise<void>;
    post: {
        id: number;
        content: string;
        status: string;
    };
    loading?: boolean;
}

export function EditPostModal({ isOpen, onClose, onSave, post, loading = false }: EditPostModalProps) {
    const [content, setContent] = useState(post.content);
    const [status, setStatus] = useState(post.status);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!mounted || !isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSave(content, status);
    };

    return createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div
                className="bg-white rounded-[2rem] w-full max-w-2xl p-8 md:p-10 shadow-2xl animate-in zoom-in-95 duration-200 relative overflow-hidden max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Decorative Background */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-10 -mt-10" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent/5 rounded-full blur-2xl -ml-5 -mb-5" />

                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                            <Edit2 className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-serif font-bold text-gray-900">Edit Post</h3>
                            <p className="text-sm text-gray-500 font-medium">Update your post content and visibility</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 pl-1">
                                Post Content
                            </label>
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                rows={8}
                                className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all font-medium text-gray-700 resize-none"
                                placeholder="Share your thoughts with the community..."
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 pl-1">
                                Visibility Status
                            </label>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    onClick={() => setStatus('published')}
                                    className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-sm transition-all ${status === 'published'
                                        ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                                        : 'bg-slate-50 text-gray-600 hover:bg-slate-100'
                                        }`}
                                >
                                    <Globe className="w-4 h-4" />
                                    Published
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setStatus('draft')}
                                    className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-sm transition-all ${status === 'draft'
                                        ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20'
                                        : 'bg-slate-50 text-gray-600 hover:bg-slate-100'
                                        }`}
                                >
                                    <Lock className="w-4 h-4" />
                                    Draft
                                </button>
                            </div>
                        </div>

                        <div className="flex gap-3 pt-4">
                            <button
                                type="button"
                                disabled={loading}
                                onClick={onClose}
                                className="flex-1 px-6 py-4 bg-gray-50 text-gray-600 rounded-xl font-bold hover:bg-gray-100 transition-colors disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 px-6 py-4 bg-primary text-white rounded-xl font-bold hover:shadow-xl transition-all shadow-lg shadow-primary/20 disabled:opacity-70 flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>
                                ) : (
                                    "Save Changes"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>,
        document.body
    );
}
