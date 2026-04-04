"use client";

import { useState } from "react";
import Image from "next/image";
import { Image as ImageIcon, Video, X, Send, Loader2, Globe, Lock, Play } from "lucide-react";
import { useToast } from "@/hooks/useToast";
import RichTextEditor from "@/components/ui/RichTextEditor";

export function CreatePostForm({ onSuccess }: { onSuccess: () => void }) {
    const [content, setContent] = useState("");
    const [media, setMedia] = useState<File[]>([]);
    const [previews, setPreviews] = useState<{ url: string; type: string }[]>([]);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("published");
    const { error: toastError } = useToast();

    const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            setMedia(prev => [...prev, ...files]);

            const newPreviews = files.map(file => ({
                url: URL.createObjectURL(file),
                type: file.type.startsWith('video') ? 'video' : 'image'
            }));
            setPreviews(prev => [...prev, ...newPreviews]);
        }
    };

    const removeMedia = (index: number) => {
        setMedia(prev => prev.filter((_, i) => i !== index));
        setPreviews(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const strippedContent = content.replace(/<[^>]*>/g, '').trim();
        if (!strippedContent && media.length === 0) return;

        setLoading(true);
        const formData = new FormData();
        formData.append("content", content);
        formData.append("status", status);
        media.forEach((file) => formData.append("media", file));

        try {
            const res = await fetch("/api/posts", {
                method: "POST",
                body: formData,
            });

            if (res.ok) {
                setContent("");
                setMedia([]);
                setPreviews([]);
                onSuccess();
            } else {
                const data = await res.json();
                toastError(data.error || "Failed to create post. Please try again.");
            }
        } catch (err) {
            console.error("Failed to create post");
            toastError("An error occurred while creating your post.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-8">
            <form onSubmit={handleSubmit} className="p-6">
                <div className="flex gap-4 mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary rounded-2xl flex items-center justify-center text-white font-bold shrink-0 shadow-lg shadow-primary/20">
                        A
                    </div>
                    <div className="flex-grow">
                        <RichTextEditor
                            value={content}
                            onChange={setContent}
                            placeholder="What's going on in the ACF ecosystem?"
                        />
                    </div>
                </div>

                {previews.length > 0 && (
                    <div className={`grid gap-2 mb-6 ${previews.length === 1 ? 'grid-cols-1' :
                        previews.length === 2 ? 'grid-cols-2' :
                            'grid-cols-2 lg:grid-cols-3'
                        }`}>
                        {previews.map((preview, idx) => (
                            <div key={idx} className={`relative group border border-slate-100 rounded-2xl overflow-hidden shadow-sm ${previews.length === 1 ? 'aspect-video' : 'aspect-square'}`}>
                                {preview.type === 'video' ? (
                                    <div className="w-full h-full relative bg-slate-900 flex items-center justify-center">
                                        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                                            <Play className="w-6 h-6 text-white fill-white" />
                                        </div>
                                        <p className="absolute bottom-4 left-4 text-white text-[10px] font-black uppercase tracking-widest bg-black/40 px-3 py-1 rounded-full backdrop-blur-md">Video Attachment</p>
                                    </div>
                                ) : (
                                    <Image src={preview.url} alt="Preview" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                                )}
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <button
                                    type="button"
                                    onClick={() => removeMedia(idx)}
                                    className="absolute top-3 right-3 p-2 bg-red-500 text-white rounded-full opacity-100 sm:opacity-0 group-hover:opacity-100 transition-all shadow-lg hover:scale-110 active:scale-95"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                        <label className="flex items-center gap-2.5 px-5 py-2.5 bg-slate-50 hover:bg-slate-100 active:scale-95 rounded-2xl cursor-pointer transition-all border border-slate-100">
                            <input type="file" multiple className="hidden" onChange={handleMediaChange} accept="image/*,video/*" />
                            <ImageIcon className="w-5 h-5 text-emerald-500" />
                            <span className="text-xs font-black uppercase tracking-widest text-slate-600">Add Media</span>
                        </label>
                        <div className="h-6 w-px bg-gray-100 mx-2" />
                        <div className="relative">
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="text-[10px] font-black uppercase tracking-widest bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5 appearance-none pr-10 focus:ring-2 focus:ring-primary/10 outline-none text-slate-500 cursor-pointer"
                            >
                                <option value="published">Public</option>
                                <option value="draft">Private/Draft</option>
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                {status === 'published' ? <Globe className="w-3 h-3 text-primary" /> : <Lock className="w-3 h-3 text-slate-400" />}
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading || (!content.replace(/<[^>]*>/g, '').trim() && media.length === 0)}
                        className="w-full sm:w-auto px-10 py-3.5 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-[11px]  flex items-center justify-center gap-3 hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 disabled:opacity-50 active:scale-95"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Send className="w-4 h-4" /> Share Update</>}
                    </button>
                </div>
            </form>
        </div>
    );
}

