import { useState } from "react";
import Image from "next/image";
import { Image as ImageIcon, Video, X, Send, Loader2, Globe, Lock, Play, Cloud } from "lucide-react";
import { useToast } from "@/hooks/useToast";
import RichTextEditor from "@/components/ui/RichTextEditor";
import { CldUploadWidget } from "next-cloudinary";

export function CreatePostForm({ onSuccess }: { onSuccess: () => void }) {
    const [content, setContent] = useState("");
    const [mediaItems, setMediaItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("published");
    const { error: toastError } = useToast();

    const handleUploadSuccess = (result: any) => {
        const info = result.info;
        if (info) {
            setMediaItems(prev => [...prev, {
                url: info.secure_url,
                type: info.resource_type,
                public_id: info.public_id
            }]);
        }
    };

    const removeMedia = (index: number) => {
        setMediaItems(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const strippedContent = content.replace(/<[^>]*>/g, '').trim();
        if (!strippedContent && mediaItems.length === 0) return;

        setLoading(true);
        try {
            const res = await fetch("/api/posts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    content,
                    status,
                    media: mediaItems // Already uploaded through the widget
                }),
            });

            if (res.ok) {
                setContent("");
                setMediaItems([]);
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
                            placeholder="Share an update via Cloudinary services..."
                        />
                    </div>
                </div>

                {mediaItems.length > 0 && (
                    <div className={`grid gap-2 mb-6 ${mediaItems.length === 1 ? 'grid-cols-1' :
                        mediaItems.length === 2 ? 'grid-cols-2' :
                            'grid-cols-2 lg:grid-cols-3'
                        }`}>
                        {mediaItems.map((item, idx) => (
                            <div key={idx} className={`relative group border border-slate-100 rounded-2xl overflow-hidden shadow-sm ${mediaItems.length === 1 ? 'aspect-video' : 'aspect-square'}`}>
                                {item.type === 'video' ? (
                                    <div className="w-full h-full relative bg-slate-900 flex items-center justify-center">
                                        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                                            <Play className="w-6 h-6 text-white fill-white" />
                                        </div>
                                    </div>
                                ) : (
                                    <Image src={item.url} alt="Media" fill className="object-cover group-hover:scale-105 transition-transform duration-700" unoptimized />
                                )}
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <button
                                    type="button"
                                    onClick={() => removeMedia(idx)}
                                    className="absolute top-3 right-3 p-2 bg-red-500 text-white rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                                <div className="absolute top-3 left-3 bg-white/80 backdrop-blur-md px-2 py-1 rounded-lg">
                                    <Cloud className="w-3 h-3 text-primary" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                        <CldUploadWidget 
                            uploadPreset="ml_default"
                            onSuccess={handleUploadSuccess}
                            options={{
                                sources: ['local', 'url', 'camera', 'google_drive', 'dropbox', 'facebook', 'instagram'],
                                multiple: true,
                                folder: 'acf/posts'
                            }}
                        >
                            {({ open }) => (
                                <button 
                                    type="button" 
                                    onClick={() => open()}
                                    className="flex items-center gap-2.5 px-5 py-2.5 bg-slate-50 hover:bg-slate-100 active:scale-95 rounded-2xl cursor-pointer transition-all border border-slate-100"
                                >
                                    <ImageIcon className="w-5 h-5 text-emerald-500" />
                                    <span className="text-xs font-black uppercase tracking-widest text-slate-600">Cloud Upload</span>
                                </button>
                            )}
                        </CldUploadWidget>

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
                        disabled={loading || (!content.replace(/<[^>]*>/g, '').trim() && mediaItems.length === 0)}
                        className="w-full sm:w-auto px-10 py-3.5 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-[11px]  flex items-center justify-center gap-3 hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 disabled:opacity-50 active:scale-95"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Send className="w-4 h-4" /> Share Update</>}
                    </button>
                </div>
            </form>
        </div>
    );
}


