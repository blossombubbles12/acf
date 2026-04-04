import { useState, useEffect } from "react";
import { Edit2, Trash2, Globe, Lock, Loader2, X, Send } from "lucide-react";
import { createPortal } from "react-dom";
import RichTextEditor from "@/components/ui/RichTextEditor";

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(content, status);
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
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                                <Edit2 className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-serif font-bold text-gray-900">Edit Update</h3>
                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Refine your message</p>
                            </div>
                        </div>
                        <button 
                            onClick={onClose}
                            className="p-2 hover:bg-slate-50 rounded-full transition-colors border border-slate-100"
                        >
                            <X className="w-5 h-5 text-slate-400" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6 overflow-y-auto flex-grow px-1">
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
                                    disabled={loading || !content.replace(/<[^>]*>/g, '').trim()}
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

