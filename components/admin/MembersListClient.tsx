"use client";

import { useState, useEffect } from "react";
import {
    Users,
    Search,
    Filter,
    MoreVertical,
    Mail,
    MapPin,
    Briefcase,
    GraduationCap,
    ShieldCheck,
    ShieldAlert,
    Trash2,
    Eye,
    Loader2,
    UserPlus,
    BarChart3,
    ArrowUpRight,
    TrendingUp,
    ExternalLink,
    XCircle
} from "lucide-react";
import { format } from "date-fns";
import { Member } from "@/types/members";
import Link from "next/link";
import Image from "next/image";
import Papa from "papaparse";
import { MemberForm } from "./MemberForm";
import { DeleteConfirmModal } from "./DeleteConfirmModal";
import { useToast } from "@/hooks/useToast";

export function MembersListClient() {
    const [members, setMembers] = useState<Member[]>([]);
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isImporting, setIsImporting] = useState(false);
    const [importError, setImportError] = useState<string | null>(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [memberToDelete, setMemberToDelete] = useState<number | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const { success, error, ToastContainer } = useToast();

    const fetchMembers = async () => {
        try {
            setIsRefreshing(true);
            const res = await fetch(`/api/members?search=${searchQuery}&status=${statusFilter}`);

            if (res.status === 401) {
                window.location.href = "/admin/login";
                return;
            }

            const data = await res.json();
            if (data.members) {
                setMembers(data.members);
                setStats(data.stats);
            }
        } catch (err) {
            console.error("Failed to fetch members");
        } finally {
            setLoading(false);
            setIsRefreshing(false);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchMembers();
        }, 300);
        return () => clearTimeout(timer);
    }, [searchQuery, statusFilter]);

    const handleDeleteClick = (id: number) => {
        setMemberToDelete(id);
        setDeleteModalOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!memberToDelete) return;
        setIsDeleting(true);
        try {
            const res = await fetch(`/api/members/${memberToDelete}`, { method: "DELETE" });
            if (res.ok) {
                success("Member deleted successfully!");
                fetchMembers();
            } else {
                error("Failed to delete member. Please try again.");
            }
        } catch (err) {
            console.error("Failed to delete member", err);
            error("An error occurred while deleting the member.");
        } finally {
            setIsDeleting(false);
            setDeleteModalOpen(false);
            setMemberToDelete(null);
        }
    };

    const handleImportCSV = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsImporting(true);
        setImportError(null);

        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: async (results) => {
                try {
                    const res = await fetch("/api/members/import", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(results.data)
                    });

                    if (!res.ok) {
                        const data = await res.json();
                        throw new Error(data.error || "Failed to import members");
                    }

                    const data = await res.json();
                    success(`Successfully imported ${data.count} members!`);
                    fetchMembers();
                } catch (err: any) {
                    setImportError(err.message);
                    error(err.message || "Failed to import members.");
                } finally {
                    setIsImporting(false);
                }
            },
            error: (err) => {
                setImportError(err.message);
                setIsImporting(false);
            }
        });
    };

    if (loading) {
        return (
            <div className="flex justify-center py-40">
                <Loader2 className="w-10 h-10 animate-spin text-primary/20" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <ToastContainer />

            <DeleteConfirmModal
                isOpen={deleteModalOpen}
                onClose={() => {
                    setDeleteModalOpen(false);
                    setMemberToDelete(null);
                }}
                onConfirm={handleDeleteConfirm}
                title="Delete Member?"
                description="This action cannot be undone. This will permanently remove the member and their associated data from the directory."
                loading={isDeleting}
            />

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    title="Total Registered"
                    value={stats?.total || 0}
                    icon={Users}
                    color="bg-primary"
                    trend="+12% from last month"
                />
                <StatCard
                    title="Active Members"
                    value={stats?.active || 0}
                    icon={ShieldCheck}
                    color="bg-emerald-500"
                    trend="94% engagement rate"
                />
                <StatCard
                    title="Needs Review"
                    value={stats?.inactive || 0}
                    icon={ShieldAlert}
                    color="bg-amber-500"
                    trend="Requires follow-up"
                />
            </div>

            {/* toolbar */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex items-center gap-4 w-full md:w-auto flex-grow max-w-2xl">
                    <div className="relative flex-grow">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by name, email, or location..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-white rounded-xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all font-medium text-sm"
                        />
                    </div>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-3 bg-white rounded-xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all font-bold text-xs uppercase tracking-widest text-gray-500 cursor-pointer"
                    >
                        <option value="">All Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>
                <div className="flex gap-4 w-full md:w-auto">
                    <button
                        onClick={() => document.getElementById("csv-import")?.click()}
                        disabled={isImporting}
                        className="flex-grow md:flex-grow-0 flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 text-gray-600 rounded-xl font-bold hover:bg-slate-200 transition-all"
                    >
                        {isImporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <ExternalLink className="w-4 h-4" />}
                        Import CSV
                    </button>
                    <input
                        id="csv-import"
                        type="file"
                        accept=".csv"
                        className="hidden"
                        onChange={handleImportCSV}
                    />
                    <button
                        onClick={() => setIsFormOpen(true)}
                        className="flex-grow md:flex-grow-0 flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-bold hover:shadow-xl transition-all shadow-lg shadow-primary/20"
                    >
                        <UserPlus className="w-4 h-4" /> Add Member
                    </button>
                </div>
            </div>

            {importError && (
                <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-sm font-medium">
                    <XCircle className="w-5 h-5 shrink-0" />
                    {importError}
                </div>
            )}

            {/* Table/List */}
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-50">
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Member</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Professional Info</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Member Since</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Status</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {members.map((member) => (
                                <tr key={member.id} className="group hover:bg-slate-50/50 transition-colors">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-slate-100 relative overflow-hidden flex items-center justify-center shrink-0 border border-gray-100">
                                                {member.photo_url ? (
                                                    <img src={member.photo_url} alt="" className="w-full h-full object-cover" />
                                                ) : (
                                                    <Users className="w-6 h-6 text-slate-300" />
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900 leading-tight">{member.full_name}</p>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <Mail className="w-3 h-3 text-gray-300" />
                                                    <span className="text-xs text-gray-400 font-medium">{member.email}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
                                                <Briefcase className="w-3 h-3 text-primary" />
                                                {member.occupation || 'Not specified'}
                                            </div>
                                            <div className="flex items-center gap-2 text-[10px] font-medium text-gray-400">
                                                <MapPin className="w-3 h-3" />
                                                {member.location || 'Unknown'}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-sky-50 text-sky-700 rounded-lg text-[10px] font-black uppercase tracking-wider">
                                            <GraduationCap className="w-3 h-3" />
                                            Since {member.cohort || '2024'}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${member.status === 'active'
                                            ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                                            : 'bg-amber-50 text-amber-600 border-amber-100'
                                            }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${member.status === 'active' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                                            {member.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex justify-end gap-2 pr-2">
                                            <Link
                                                href={`/admin/members/${member.id}`}
                                                className="p-2.5 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-primary hover:border-primary/20 hover:shadow-md transition-all"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </Link>
                                            <button
                                                onClick={() => handleDeleteClick(member.id)}
                                                className="p-2.5 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-red-600 hover:border-red-100 hover:shadow-md transition-all"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {members.length === 0 && (
                        <div className="py-24 text-center">
                            <Users className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                            <p className="text-gray-400 font-medium">No members found matching your criteria.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Form Modal */}
            {isFormOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white rounded-[2.5rem] w-full max-w-4xl max-h-[90vh] overflow-hidden relative animate-in fade-in zoom-in duration-300 shadow-2xl">
                        <MemberForm
                            onClose={() => setIsFormOpen(false)}
                            onSuccess={() => {
                                setIsFormOpen(false);
                                fetchMembers();
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

function StatCard({ title, value, icon: Icon, color, trend }: any) {
    return (
        <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all group overflow-hidden relative">
            <div className="relative z-10 flex items-start justify-between">
                <div className="space-y-4">
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">{title}</p>
                    <h4 className="text-4xl font-serif font-bold text-gray-900">{value}</h4>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-600">
                        <TrendingUp className="w-3 h-3" />
                        {trend}
                    </div>
                </div>
                <div className={`p-4 rounded-2xl ${color} text-white shadow-lg group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                </div>
            </div>
            {/* Background Decoration */}
            <div className={`absolute -right-4 -bottom-4 w-24 h-24 ${color} opacity-[0.03] rounded-full blur-2xl group-hover:scale-150 transition-transform`} />
        </div>
    );
}
