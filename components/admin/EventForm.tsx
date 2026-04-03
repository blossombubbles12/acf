"use client";

import { useState } from "react";
import {
    X,
    Upload,
    Calendar,
    Clock,
    MapPin,
    Type,
    AlignLeft,
    Image as ImageIcon,
    Save,
    Loader2,
    XCircle,
    CheckCircle2,
    Video,
    ChevronRight,
    Users,
    ArrowRight
} from "lucide-react";
import { Event } from "@/types/events";

interface EventFormProps {
    event?: Event | null;
    onClose: () => void;
    onSuccess: () => void;
}

export function EventForm({ event, onClose, onSuccess }: EventFormProps) {
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(event?.image_url || null);
    const [status, setStatus] = useState<string>(event?.status || 'published');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);

        const formData = new FormData(e.currentTarget);

        // If we have an existing image and no new file selected
        if (event?.image_url && !(formData.get('image') as File).size) {
            formData.append('existing_image_url', event.image_url);
        }

        try {
            const url = event ? `/api/events/${event.id}` : "/api/events";
            const method = event ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                body: formData
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Failed to save event");
            }

            onSuccess();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="flex flex-col h-full">
            {/* Form Header */}
            <div className="px-8 py-6 border-b border-gray-50 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-10">
                <div>
                    <h2 className="text-2xl font-serif font-bold text-gray-900">
                        {event ? "Edit Event" : "Create New Event"}
                    </h2>
                    <p className="text-xs font-bold text-accent uppercase tracking-widest mt-1">
                        {event ? `Editing Event #${event.id}` : "Global Alumni Calendar"}
                    </p>
                </div>
                <button
                    onClick={onClose}
                    className="p-2 hover:bg-slate-50 rounded-full text-gray-400 hover:text-gray-900 transition-colors"
                >
                    <X className="w-6 h-6" />
                </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-8">
                {error && (
                    <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-sm font-medium">
                        <XCircle className="w-5 h-5 shrink-0" />
                        {error}
                    </div>
                )}

                <div className="grid md:grid-cols-2 gap-10">
                    {/* Left Column: Basic Info */}
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 pl-1">Event Title</label>
                            <div className="relative">
                                <Type className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                                <input
                                    name="title"
                                    required
                                    defaultValue={event?.title}
                                    placeholder="e.g. 45th Anniversary Reunion"
                                    className="w-full pl-12 pr-4 py-3 bg-slate-50/50 rounded-xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all font-medium"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 pl-1">Date</label>
                                <div className="relative">
                                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                                    <input
                                        type="date"
                                        name="date"
                                        required
                                        defaultValue={event?.date ? new Date(event.date).toISOString().split('T')[0] : ''}
                                        className="w-full pl-12 pr-4 py-3 bg-slate-50/50 rounded-xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all font-medium text-sm"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 pl-1">Time (Optional)</label>
                                <div className="relative">
                                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                                    <input
                                        type="time"
                                        name="time"
                                        defaultValue={event?.time?.slice(0, 5)}
                                        className="w-full pl-12 pr-4 py-3 bg-slate-50/50 rounded-xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all font-medium text-sm"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 pl-1">Location / Link</label>
                            <div className="relative">
                                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                                <input
                                    name="location"
                                    defaultValue={event?.location}
                                    placeholder="Physical address or Zoom link"
                                    className="w-full pl-12 pr-4 py-3 bg-slate-50/50 rounded-xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all font-medium"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 pl-1">Description</label>
                            <div className="relative">
                                <AlignLeft className="absolute left-4 top-4 w-4 h-4 text-gray-300" />
                                <textarea
                                    name="description"
                                    required
                                    defaultValue={event?.description}
                                    rows={5}
                                    placeholder="Describe the event, agenda, etc."
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50/50 rounded-xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all font-medium"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Image & Status */}
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 pl-1">Event Banner Image</label>
                            <div className="relative aspect-video rounded-2xl border-2 border-dashed border-gray-100 bg-slate-50/30 flex flex-col items-center justify-center overflow-hidden transition-all hover:border-accent group">
                                {imagePreview ? (
                                    <>
                                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setImagePreview(null);
                                                    const input = document.getElementById('event-image-input') as HTMLInputElement;
                                                    if (input) input.value = '';
                                                }}
                                                className="p-3 bg-red-600 text-white rounded-full shadow-xl hover:scale-110 transition-transform"
                                            >
                                                <X className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <div className="text-center p-6 cursor-pointer" onClick={() => document.getElementById('event-image-input')?.click()}>
                                        <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mx-auto mb-4 text-gray-300 group-hover:text-accent group-hover:scale-110 transition-all">
                                            <Upload className="w-5 h-5" />
                                        </div>
                                        <p className="text-sm font-bold text-gray-400">Click to upload banner</p>
                                        <p className="text-[10px] text-gray-300 mt-1 uppercase tracking-widest">JPG, PNG, WEBP (Max 5MB)</p>
                                    </div>
                                )}
                                <input
                                    id="event-image-input"
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageChange}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 pl-1">Publish Status</label>
                            <div className="grid grid-cols-2 gap-4">
                                <label className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all ${status === 'draft' ? 'border-primary bg-primary/5' : 'border-gray-50 bg-white'
                                    }`}>
                                    <input type="radio" name="status" value="draft" checked={status === 'draft'} onChange={() => setStatus('draft')} className="hidden" />
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center"><Calendar className="w-4 h-4" /></div>
                                        <div><p className="text-sm font-bold text-gray-900">Draft</p><p className="text-[10px] text-gray-400 font-medium">Not visible</p></div>
                                    </div>
                                </label>
                                <label className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all ${status === 'published' ? 'border-primary bg-primary/5' : 'border-gray-50 bg-white'
                                    }`}>
                                    <input type="radio" name="status" value="published" checked={status === 'published'} onChange={() => setStatus('published')} className="hidden" />
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center"><CheckCircle2 className="w-4 h-4" /></div>
                                        <div><p className="text-sm font-bold text-gray-900">Publish</p><p className="text-[10px] text-gray-400 font-medium">Visible to all</p></div>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form Actions */}
                <div className="pt-8 border-t border-gray-50 flex items-center justify-end gap-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-8 py-3 bg-white text-gray-400 font-bold rounded-xl hover:text-gray-900 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={submitting}
                        className="px-12 py-4 bg-primary text-white rounded-xl font-black uppercase tracking-[0.2em] shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 disabled:opacity-50"
                    >
                        {submitting ? (
                            <><Loader2 className="w-5 h-5 animate-spin" /> Saving...</>
                        ) : (
                            <><Save className="w-5 h-5" /> {event ? "Update Event" : "Create Event"}</>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
