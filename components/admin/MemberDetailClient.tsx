"use client";

import { useState } from "react";
import {
    Save,
    Trash2,
    ShieldCheck,
    ShieldAlert,
    Mail,
    Phone,
    MapPin,
    Briefcase,
    GraduationCap,
    Globe,
    Camera,
    Loader2,
    BarChart3,
    Users
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Member } from "@/types/members";
import { format } from "date-fns";
import { DeleteConfirmModal } from "./DeleteConfirmModal";
import { useToast } from "@/hooks/useToast";

export function MemberDetailClient({ member: initialMember }: { member: Member }) {
    const [member, setMember] = useState<Member>(initialMember);
    const [saving, setSaving] = useState(false);
    const router = useRouter();
    const { success, error, ToastContainer } = useToast();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSaving(true);

        const formData = new FormData(e.currentTarget);
        const body: any = {
            full_name: formData.get("full_name"),
            email: formData.get("email"),
            phone: formData.get("phone"),
            location: formData.get("location"),
            occupation: formData.get("occupation"),
            industry: formData.get("industry"),
            cohort: formData.get("cohort"),
            biography: formData.get("biography"),
            status: formData.get("status"),
            is_visible: formData.get("is_visible") === "on",
        };

        try {
            const res = await fetch(`/api/members/${member.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            if (res.ok) {
                const updated = await res.json();
                setMember(updated);
                success("Member updated successfully!");
                router.refresh();
            } else {
                error("Failed to update member. Please try again.");
            }
        } catch (err) {
            console.error("Failed to update member", err);
            error("An error occurred while updating the member.");
        } finally {
            setSaving(false);
        }
    };

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            const res = await fetch(`/api/members/${member.id}`, { method: "DELETE" });
            if (res.ok) {
                success("Member deleted successfully!");
                router.push("/admin/members");
                router.refresh();
            } else {
                error("Failed to delete member. Please try again.");
            }
        } catch (err) {
            console.error("Failed to delete member", err);
            error("An error occurred while deleting the member.");
        } finally {
            setIsDeleting(false);
            setShowDeleteModal(false);
        }
    };


    return (
        <form onSubmit={handleSubmit} className="space-y-10 relative">
            <ToastContainer />

            <DeleteConfirmModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDelete}
                title="Delete Account?"
                description="This action cannot be undone. This will permanently remove the member and their associated data."
                loading={isDeleting}
            />

            <div className="grid lg:grid-cols-3 gap-10">
                {/* Left Column: Profile Card */}
                <div className="space-y-8">
                    <div className="bg-white rounded-[3rem] p-10 border border-gray-100 shadow-sm text-center">
                        <div className="relative w-32 h-32 mx-auto mb-8">
                            <div className="w-full h-full rounded-[2.5rem] bg-slate-100 overflow-hidden flex items-center justify-center border-4 border-white shadow-xl">
                                {member.photo_url ? (
                                    <img src={member.photo_url} alt="" className="w-full h-full object-cover" />
                                ) : (
                                    <Users className="w-12 h-12 text-slate-300" />
                                )}
                            </div>
                            <button type="button" className="absolute -right-2 -bottom-2 p-3 bg-primary text-white rounded-2xl shadow-lg hover:scale-110 transition-transform">
                                <Camera className="w-4 h-4" />
                            </button>
                        </div>
                        <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">{member.full_name}</h3>
                        <p className="text-xs font-black uppercase tracking-[0.2em] text-accent mb-8">Since {member.cohort || '2024'}</p>

                        <div className="flex items-center gap-2 px-6 py-3 bg-slate-50 rounded-2xl border border-gray-50">
                            {member.status === 'active' ? (
                                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                            ) : (
                                <ShieldAlert className="w-4 h-4 text-amber-500" />
                            )}
                            <select
                                name="status"
                                defaultValue={member.status}
                                className="bg-transparent text-xs font-bold uppercase tracking-widest text-gray-700 focus:outline-none cursor-pointer w-full"
                            >
                                <option value="active">Active Member</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>
                    </div>

                    {/* Quick Stats/Info */}
                    <div className="bg-[#0a1128] rounded-[2.5rem] p-10 text-white space-y-8">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-accent">Engagement Summary</h4>
                        <div className="space-y-6">
                            <div className="flex justify-between items-end border-b border-white/5 pb-4">
                                <span className="text-xs font-medium text-white/40">Joined on</span>
                                <span className="text-sm font-bold">{format(new Date(member.created_at), 'MMM d, yyyy')}</span>
                            </div>
                            <div className="flex justify-between items-end border-b border-white/5 pb-4">
                                <span className="text-xs font-medium text-white/40">Events Attended</span>
                                <span className="text-sm font-bold">0 Sessions</span>
                            </div>
                            <div className="flex justify-between items-end border-b border-white/5 pb-4">
                                <span className="text-xs font-medium text-white/40">Visibility</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" name="is_visible" defaultChecked={member.is_visible} className="sr-only peer" />
                                    <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Middle & Right Column: Edit Form */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white rounded-[3rem] p-12 border border-gray-100 shadow-sm">
                        <h3 className="text-lg font-bold text-gray-900 mb-10 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                <BarChart3 className="w-4 h-4" />
                            </div>
                            Biographical Information
                        </h3>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 pl-1">Full Name</label>
                                <div className="relative">
                                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                                    <input name="full_name" defaultValue={member.full_name} className="admin-input pl-12" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 pl-1">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                                    <input name="email" defaultValue={member.email || ''} className="admin-input pl-12" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 pl-1">Phone Number</label>
                                <div className="relative">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                                    <input name="phone" defaultValue={member.phone || ''} className="admin-input pl-12" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 pl-1">Location</label>
                                <div className="relative">
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                                    <input name="location" defaultValue={member.location || ''} className="admin-input pl-12" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 pl-1">Profession / Occupation</label>
                                <div className="relative">
                                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                                    <input name="occupation" defaultValue={member.occupation || ''} className="admin-input pl-12" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 pl-1">Industry</label>
                                <div className="relative">
                                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                                    <input name="industry" defaultValue={member.industry || ''} className="admin-input pl-12" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 pl-1">Member Since</label>
                                <div className="relative">
                                    <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                                    <input name="cohort" defaultValue={member.cohort || ''} className="admin-input pl-12" placeholder="e.g. 2024" />
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 pl-1">Professional Biography</label>
                            <textarea
                                name="biography"
                                defaultValue={member.biography || ''}
                                rows={5}
                                className="admin-input py-4"
                                placeholder="Write a brief background about the member's professional journey..."
                            />
                        </div>
                    </div>

                    {/* Save Actions */}
                    <div className="flex items-center justify-end gap-6">
                        <button
                            type="button"
                            onClick={() => setShowDeleteModal(true)}
                            className="text-xs font-black uppercase tracking-[0.2em] text-red-600 flex items-center gap-2 hover:opacity-70 transition-opacity"
                        >
                            <Trash2 className="w-4 h-4" /> Delete Account
                        </button>
                        <button
                            type="submit"
                            disabled={saving}
                            className="px-12 py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl shadow-primary/20 flex items-center gap-3 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                        >
                            {saving ? (
                                <><Loader2 className="w-5 h-5 animate-spin" /> Updating...</>
                            ) : (
                                <><Save className="w-5 h-5" /> Save Changes</>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}
