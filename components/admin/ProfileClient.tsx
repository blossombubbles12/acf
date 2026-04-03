"use client";

import { useState, useEffect } from "react";
import { User, Mail, Lock, Camera, Loader2, Save, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { useToast } from "@/hooks/useToast";

export function ProfileClient() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const { success: toastSuccess, error: toastError, ToastContainer } = useToast();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        avatar_url: ""
    });

    useEffect(() => {
        async function fetchProfile() {
            try {
                const res = await fetch("/api/admin/profile");
                const data = await res.json();
                if (res.ok) {
                    setFormData(prev => ({
                        ...prev,
                        name: data.name,
                        email: data.email,
                        avatar_url: data.avatar_url || ""
                    }));
                }
            } catch (err) {
                console.error("Failed to fetch profile");
            } finally {
                setLoading(false);
            }
        }
        fetchProfile();
    }, []);

    const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setSaving(true);
        try {
            const uploadData = new FormData();
            // The media API expects 'files' for batch upload
            uploadData.append("files", file);
            uploadData.append("folder", "admins");

            const res = await fetch("/api/media", {
                method: "POST",
                body: uploadData,
            });

            const result = await res.json();
            if (res.ok && result.success && result.results?.length > 0) {
                // The media API returns { success: true, results: [...] }
                const url = result.results[0].secure_url;
                setFormData(prev => ({ ...prev, avatar_url: url }));
                toastSuccess("Avatar uploaded successfully! Don't forget to save changes.");
            } else {
                toastError(result.error || "Avatar upload failed");
            }
        } catch (err) {
            console.error("Avatar upload failed", err);
            toastError("An error occurred during avatar upload.");
        } finally {
            setSaving(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Only validate if at least one password field has content
        const pass = formData.password.trim();
        const conf = formData.confirmPassword.trim();

        if ((pass !== "" || conf !== "") && pass !== conf) {
            toastError("Passwords do not match");
            return;
        }

        setSaving(true);

        try {
            const res = await fetch("/api/admin/profile", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    avatar_url: formData.avatar_url,
                    password: formData.password || undefined
                }),
            });

            if (res.ok) {
                toastSuccess("Profile updated successfully!");
                setFormData(prev => ({ ...prev, password: "", confirmPassword: "" }));
            } else {
                const data = await res.json();
                toastError(data.error || "Update failed");
            }
        } catch (err) {
            toastError("An unexpected error occurred");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center py-40">
                <Loader2 className="w-10 h-10 animate-spin text-primary/20" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto relative">
            <ToastContainer />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                {/* Avatar Section */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm text-center">
                        <div className="relative w-40 h-40 mx-auto mb-6">
                            <div className="w-full h-full rounded-[2.5rem] bg-slate-100 overflow-hidden relative ring-4 ring-slate-50 border border-gray-100">
                                {formData.avatar_url ? (
                                    <Image src={formData.avatar_url} alt="Profile" fill className="object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                                        <User className="w-20 h-20" />
                                    </div>
                                )}
                            </div>
                            <label className="absolute -bottom-2 -right-2 p-3 bg-primary text-white rounded-2xl shadow-xl hover:scale-110 transition-all cursor-pointer">
                                <Camera className="w-5 h-5" />
                                <input type="file" className="hidden" onChange={handleAvatarUpload} accept="image/*" />
                            </label>
                        </div>
                        <h3 className="font-serif font-bold text-xl text-gray-900">{formData.name || "Administrator"}</h3>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Super Admin Account</p>
                    </div>
                </div>

                {/* Details Form */}
                <div className="lg:col-span-2">
                    <form onSubmit={handleSubmit} autoComplete="off" className="bg-white rounded-[2.5rem] p-10 md:p-12 border border-gray-100 shadow-sm space-y-8">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 px-1">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                                    <input
                                        type="text"
                                        autoComplete="name"
                                        className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-gray-200 rounded-2xl outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all font-bold text-gray-700"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 px-1">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                                    <input
                                        type="email"
                                        autoComplete="email"
                                        className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-gray-200 rounded-2xl outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all font-bold text-gray-700"
                                        value={formData.email}
                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="h-px bg-gray-100 w-full !my-10" />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 px-1">New Password (Optional)</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                                    <input
                                        type="password"
                                        autoComplete="new-password"
                                        className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-gray-200 rounded-2xl outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all font-bold text-gray-700 placeholder:font-medium"
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={e => setFormData({ ...formData, password: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 px-1">Confirm New Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                                    <input
                                        type="password"
                                        autoComplete="new-password"
                                        className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-gray-200 rounded-2xl outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all font-bold text-gray-700 placeholder:font-medium"
                                        placeholder="••••••••"
                                        value={formData.confirmPassword}
                                        onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-6">
                            <button
                                type="submit"
                                disabled={saving}
                                className="w-full py-5 bg-primary text-white rounded-3xl font-black uppercase tracking-[0.2em] shadow-2xl shadow-primary/30 flex items-center justify-center gap-3 hover:bg-primary/90 transition-all active:scale-[0.98] disabled:opacity-50"
                            >
                                {saving ? (
                                    <Loader2 className="w-6 h-6 animate-spin" />
                                ) : (
                                    <>
                                        <Save className="w-5 h-5" /> Save Changes
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
