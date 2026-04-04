import { useState, useEffect } from "react";
import { Edit2, Trash2, Globe, Lock, Loader2, X, Send, Image as ImageIcon, Play } from "lucide-react";
import Image from "next/image";
import { createPortal } from "react-dom";
import RichTextEditor from "@/components/ui/RichTextEditor";

interface EditPostModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: any, status: string) => Promise<void>;
    post: {
        id: number;
        content: string;
        status: string;
        media: any[];
    };
    loading?: boolean;
}

export function EditPostModal({ isOpen, onClose, onSave, post, loading = false }: EditPostModalProps) {
    const [content, setContent] = useState(post.content);
    const [status, setStatus] = useState(post.status);
    const [existingMedia, setExistingMedia] = useState<any[]>(post.media || []);
    const [newMedia, setNewMedia] = useState<File[]>([]);
    const [newPreviews, setNewPreviews] = useState<{ url: string; type: string }[]>([]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (isOpen) {
            document.body.style.overflow = "hidden";
            setContent(post.content);
            setStatus(post.status);
            setExistingMedia(post.media || []);
            setNewMedia([]);
            setNewPreviews([]);
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isOpen, post]);

    if (!mounted || !isOpen) return null;

    const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            setNewMedia(prev => [...prev, ...files]);

            const addedPreviews = files.map(file => ({
                url: URL.createObjectURL(file),
                type: file.type.startsWith('video') ? 'video' : 'image'
            }));
            setNewPreviews(prev => [...prev, ...addedPreviews]);
        }
    };

    const removeExisting = (index: number) => {
        setExistingMedia(prev => prev.filter((_, i) => i !== index));
    };

    const removeNew = (index: number) => {
        setNewMedia(prev => prev.filter((_, i) => i !== index));
        setNewPreviews(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Prepare data to send back
        // If we have new media, we must use FormData
        if (newMedia.length > 0) {
            const formData = new FormData();
            formData.append('content', content);
            formData.append('status', status);
            formData.append('existingMedia', JSON.stringify(existingMedia));
            newMedia.forEach(file => formData.append('media', file));
            onSave(formData as any, status); // Cast to any to bypass the original string-only prop if needed, or update the prop type
        } else {
            // Can send JSON
            onSave({ content, status, media: existingMedia } as any, status);
        }
    };

    return createPortal(
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200" onClick={onClose}>
            <div
                className="bg-white rounded-[2.5rem] w-full max-w-3xl p-6 md:p-10 shadow-2xl animate-in zoom-in-95 duration-200 relative overflow-hidden max-h-[90vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Decorative Background */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-10 -mt-10" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent/5 rounded-full blur-2xl -ml-5 -mb-5" />

                <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                                <Edit2 className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-serif font-bold text-gray-900">Edit Update</h3>
                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Manage content and media</p>
                            </div>
                        </div>
                        <button 
                            onClick={onClose}
                            className="p-2 hover:bg-slate-50 rounded-full transition-colors border border-slate-100"
                        >
                            <X className="w-5 h-5 text-slate-400" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6 overflow-y-auto flex-grow px-1 scrollbar-hide pb-4">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 pl-1">
                                Post Content
                            </label>
                            <RichTextEditor
                                value={content}
                                onChange={setContent}
                                placeholder="Refine your post..."
                            />
                        </div>

                        {/* Media Management Area */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 pl-1">
                                    Manage Media ({existingMedia.length + newMedia.length})
                                </label>
                                <label className="flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 rounded-xl cursor-pointer border border-slate-100 transition-all text-[10px] font-black uppercase tracking-widest text-slate-600">
                                    <input type="file" multiple className="hidden" onChange={handleMediaChange} />
                                    <ImageIcon className="w-3.5 h-3.5" />
                                    Add New
                                </label>
                            </div>

                            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                                {/* Existing Media */}
                                {existingMedia.map((media, idx) => (
                                    <div key={`existing-${idx}`} className="relative aspect-square rounded-xl overflow-hidden group border border-slate-100">
                                        {media.type === 'video' ? (
                                             <div className="w-full h-full bg-slate-900 flex items-center justify-center">
                                                <Play className="w-4 h-4 text-white/40" />
                                             </div>
                                        ) : (
                                            <Image src={media.url} alt="Existing" fill className="object-cover" unoptimized />
                                        )}
                                        <button 
                                            type="button"
                                            onClick={() => removeExisting(idx)}
                                            className="absolute top-1.5 right-1.5 p-1.5 bg-red-500 text-white rounded-full shadow-lg hover:scale-110 transition-transform"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                        <div className="absolute bottom-0 left-0 right-0 bg-primary/80 py-1 text-[8px] font-black uppercase tracking-widest text-center text-white">Current</div>
                                    </div>
                                ))}

                                {/* New Additions */}
                                {newPreviews.map((preview, idx) => (
                                    <div key={`new-${idx}`} className="relative aspect-square rounded-xl overflow-hidden group border-2 border-emerald-500/50">
                                        {preview.type === 'video' ? (
                                            <div className="w-full h-full bg-slate-900 flex items-center justify-center">
                                                <Play className="w-4 h-4 text-emerald-400" />
                                            </div>
                                        ) : (
                                            <Image src={preview.url} alt="New" fill className="object-cover" />
                                        )}
                                        <button 
                                            type="button"
                                            onClick={() => removeNew(idx)}
                                            className="absolute top-1.5 right-1.5 p-1.5 bg-red-500 text-white rounded-full shadow-lg"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                        <div className="absolute bottom-0 left-0 right-0 bg-emerald-500 py-1 text-[8px] font-black uppercase tracking-widest text-center text-white">New</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 pl-1">
                                    Visibility Status
                                </label>
                                <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-50 rounded-2xl">
                                    <button
                                        type="button"
                                        onClick={() => setStatus('published')}
                                        className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all ${status === 'published'
                                            ? 'bg-white text-emerald-600 shadow-md ring-1 ring-emerald-100'
                                            : 'text-gray-400 hover:text-gray-600'
                                            }`}
                                    >
                                        <Globe className="w-3.5 h-3.5" />
                                        Public
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setStatus('draft')}
                                        className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all ${status === 'draft'
                                            ? 'bg-white text-amber-600 shadow-md ring-1 ring-amber-100'
                                            : 'text-gray-400 hover:text-gray-600'
                                            }`}
                                    >
                                        <Lock className="w-3.5 h-3.5" />
                                        Draft
                                    </button>
                                </div>
                            </div>
                            
                            <div className="flex items-end gap-3">
                                <button
                                    type="button"
                                    disabled={loading}
                                    onClick={onClose}
                                    className="flex-1 px-6 py-4 bg-slate-50 text-slate-500 rounded-2xl font-black uppercase tracking-widest text-[10px] border border-slate-100 hover:bg-slate-100 transition-all disabled:opacity-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading || (!content.replace(/<[^>]*>/g, '').trim() && existingMedia.length === 0 && newMedia.length === 0)}
                                    className="flex-[2] px-6 py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:shadow-xl transition-all shadow-lg shadow-primary/20 disabled:opacity-70 flex items-center justify-center gap-2 active:scale-95"
                                >
                                    {loading ? (
                                        <><Loader2 className="w-4 h-4 animate-spin" /> Saving Changes...</>
                                    ) : (
                                        <><Send className="w-4 h-4" /> Update Post</>
                                    )}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>,
        document.body
    );
}

