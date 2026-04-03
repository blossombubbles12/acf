"use client";

import { useState } from "react";
import Image from "next/image";
import { Image as ImageIcon, Video, X, Send, Loader2, Globe, Lock } from "lucide-react";
import { useToast } from "@/hooks/useToast";

export function CreatePostForm({ onSuccess }: { onSuccess: () => void }) {
    const [content, setContent] = useState("");
    const [media, setMedia] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("published");
    const { error: toastError } = useToast();

    const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            setMedia(prev => [...prev, ...files]);

            const newPreviews = files.map(file => URL.createObjectURL(file));
            setPreviews(prev => [...prev, ...newPreviews]);
        }
    };

    const removeMedia = (index: number) => {
        setMedia(prev => prev.filter((_, i) => i !== index));
        setPreviews(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim() && media.length === 0) return;

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
                    <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white font-bold shrink-0">
                        A
                    </div>
                    <div className="flex-grow">
                        <textarea
                            placeholder="What's on your mind, Admin?"
                            className="w-full text-lg border-none focus:ring-0 placeholder-gray-400 resize-none py-2"
                            rows={3}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </div>
                </div>

                {previews.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                        {previews.map((preview, idx) => (
                            <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden group">
                                <Image src={preview} alt="Preview" fill className="object-cover" />
                                <button
                                    type="button"
                                    onClick={() => removeMedia(idx)}
                                    className="absolute top-2 right-2 p-1.5 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-50">
                    <div className="flex items-center gap-2">
                        <label className="flex items-center gap-2 px-4 py-2 hover:bg-slate-50 rounded-xl cursor-pointer transition-colors">
                            <input type="file" multiple className="hidden" onChange={handleMediaChange} accept="image/*,video/*" />
                            <ImageIcon className="w-5 h-5 text-green-500" />
                            <span className="text-sm font-semibold text-gray-600">Photo/Video</span>
                        </label>
                        <div className="h-6 w-px bg-gray-100 mx-2" />
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="text-sm font-bold bg-transparent border-none focus:ring-0 text-gray-500 cursor-pointer"
                        >
                            <option value="published">Public</option>
                            <option value="draft">Draft</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        disabled={loading || (!content.trim() && media.length === 0)}
                        className="w-full sm:w-auto px-8 py-3 bg-primary text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Send className="w-4 h-4" /> Post Now</>}
                    </button>
                </div>
            </form>
        </div>
    );
}
