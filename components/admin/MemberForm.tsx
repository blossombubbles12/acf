"use client";

import { useState } from "react";
import {
    X,
    Save,
    Loader2,
    Users,
    Mail,
    Phone,
    MapPin,
    Briefcase,
    GraduationCap,
    Globe,
    FileText,
    Camera,
    CheckCircle2,
    XCircle,
    ShieldCheck,
    ShieldAlert
} from "lucide-react";
import { Member } from "@/types/members";

interface MemberFormProps {
    member?: Member | null;
    onClose: () => void;
    onSuccess: () => void;
}

export function MemberForm({ member, onClose, onSuccess }: MemberFormProps) {
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [status, setStatus] = useState<string>(member?.status || 'active');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const body = Object.fromEntries(formData.entries());

        // Handle visibility checkbox
        body.is_visible = formData.get('is_visible') === 'on' ? "true" : "false";

        try {
            const url = member ? `/api/members/${member.id}` : "/api/members";
            const method = member ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Failed to save member");
            }

            onSuccess();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="px-8 py-6 border-b border-gray-50 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-10">
                <div>
                    <h2 className="text-2xl font-serif font-bold text-gray-900">
                        {member ? "Edit Member" : "Add New Member"}
                    </h2>
                    <p className="text-xs font-bold text-accent uppercase tracking-widest mt-1">
                        {member ? `Editing Profile #${member.id}` : "Manual Onboarding"}
                    </p>
                </div>
                <button
                    onClick={onClose}
                    className="p-2 hover:bg-slate-50 rounded-full text-gray-400 hover:text-gray-900 transition-colors"
                >
                    <X className="w-6 h-6" />
                </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-8 overflow-y-auto max-h-[70vh]">
                {error && (
                    <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-sm font-medium">
                        <XCircle className="w-5 h-5 shrink-0" />
                        {error}
                    </div>
                )}

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Basic Info */}
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 pl-1">Full Name</label>
                            <div className="relative">
                                <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                                <input
                                    name="full_name"
                                    required
                                    defaultValue={member?.full_name}
                                    placeholder="Enter member's full name"
                                    className="w-full pl-12 pr-4 py-3 bg-slate-50/50 rounded-xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all font-medium"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 pl-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    defaultValue={member?.email || ''}
                                    placeholder="email@example.com"
                                    className="w-full pl-12 pr-4 py-3 bg-slate-50/50 rounded-xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all font-medium"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 pl-1">Phone</label>
                                <div className="relative">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                                    <input
                                        name="phone"
                                        defaultValue={member?.phone || ''}
                                        placeholder="+234..."
                                        className="w-full pl-12 pr-4 py-3 bg-slate-50/50 rounded-xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all font-medium text-sm"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 pl-1">Member Since</label>
                                <div className="relative">
                                    <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                                    <input
                                        name="cohort"
                                        defaultValue={member?.cohort || '2024'}
                                        placeholder="e.g. 2024"
                                        className="w-full pl-12 pr-4 py-3 bg-slate-50/50 rounded-xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all font-medium text-sm"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 pl-1">Location</label>
                            <div className="relative">
                                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                                <input
                                    name="location"
                                    defaultValue={member?.location || ''}
                                    placeholder="City, Country"
                                    className="w-full pl-12 pr-4 py-3 bg-slate-50/50 rounded-xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all font-medium"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Professional Info & Status */}
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 pl-1">Profession</label>
                            <div className="relative">
                                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                                <input
                                    name="occupation"
                                    defaultValue={member?.occupation || ''}
                                    placeholder="e.g. Software Engineer"
                                    className="w-full pl-12 pr-4 py-3 bg-slate-50/50 rounded-xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all font-medium"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 pl-1">Industry</label>
                            <div className="relative">
                                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                                <input
                                    name="industry"
                                    defaultValue={member?.industry || ''}
                                    placeholder="e.g. Technology"
                                    className="w-full pl-12 pr-4 py-3 bg-slate-50/50 rounded-xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all font-medium"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 pl-1">Visibility & Bio</label>
                            <div className="flex items-center gap-4 p-4 bg-slate-50/50 rounded-xl border border-gray-100">
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" name="is_visible" defaultChecked={member?.is_visible ?? true} className="sr-only peer" />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                </label>
                                <span className="text-sm font-bold text-gray-700">Show in public directory</span>
                            </div>
                            <textarea
                                name="biography"
                                defaultValue={member?.biography || ''}
                                rows={3}
                                placeholder="Short bio..."
                                className="w-full px-4 py-3 bg-slate-50/50 rounded-xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all font-medium text-sm mt-2"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 pl-1">Account Status</label>
                            <div className="grid grid-cols-2 gap-4">
                                <label className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${status === 'active' ? 'border-primary bg-primary/5' : 'border-gray-50 bg-white'}`}>
                                    <input type="radio" name="status" value="active" checked={status === 'active'} onChange={() => setStatus('active')} className="hidden" />
                                    <ShieldCheck className={`w-4 h-4 ${status === 'active' ? 'text-primary' : 'text-gray-300'}`} />
                                    <span className="text-sm font-bold">Active</span>
                                </label>
                                <label className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${status === 'inactive' ? 'border-primary bg-primary/5' : 'border-gray-50 bg-white'}`}>
                                    <input type="radio" name="status" value="inactive" checked={status === 'inactive'} onChange={() => setStatus('inactive')} className="hidden" />
                                    <ShieldAlert className={`w-4 h-4 ${status === 'inactive' ? 'text-primary' : 'text-gray-300'}`} />
                                    <span className="text-sm font-bold">Inactive</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Actions */}
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
                            <><Save className="w-5 h-5" /> {member ? "Update Profile" : "Create Member"}</>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
