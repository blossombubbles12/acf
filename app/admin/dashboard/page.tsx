import { getSession } from "@/lib/auth";
import { sql } from "@/lib/db";
import { Users, Newspaper, Calendar, Image as ImageIcon, LayoutDashboard, Plus, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import AdminPageLayout from "@/components/layout/AdminPageLayout";

async function getStats() {
    const members = await sql`SELECT count(*) FROM members`;
    const news = await sql`SELECT count(*) FROM posts`;
    const events = await sql`SELECT count(*) FROM events`;
    const media = await sql`SELECT count(*) FROM media`;

    return {
        members: members[0].count,
        news: news[0].count,
        events: events[0].count,
        media: media[0].count,
    };
}

export default async function AdminDashboard() {
    const session = await getSession();
    const stats = await getStats();

    return (
        <AdminPageLayout
            title={`Welcome Back, ${session?.user?.name || "Member"}`}
            subtitle="Here's what's happening in your community today."
            activePage="dashboard"
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                {[
                    { label: "Total Members", value: stats.members, icon: Users, color: "bg-blue-50 text-blue-600", trend: "+0%" },
                    { label: "News Posts", value: stats.news, icon: Newspaper, color: "bg-green-50 text-green-600", trend: "+0" },
                    { label: "Events Hub", value: stats.events, icon: Calendar, color: "bg-purple-50 text-purple-600", trend: "+0" },
                    { label: "Media Items", value: stats.media, icon: ImageIcon, color: "bg-orange-50 text-orange-600", trend: "+0" },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`h-14 w-14 rounded-2xl flex items-center justify-center shrink-0 ${stat.color} transition-transform group-hover:rotate-12`}>
                                <stat.icon className="w-7 h-7" />
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-gray-50 px-2 py-1 rounded-md">{stat.trend}</span>
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-500 mb-1">{stat.label}</p>
                            <p className="text-3xl font-black text-gray-900 tracking-tight">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-2xl font-serif font-bold text-gray-900">Recent Activity</h3>
                        <button className="text-xs font-bold text-accent uppercase tracking-widest hover:underline">View All</button>
                    </div>
                    <div className="space-y-6">
                        <div className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                            <div className="w-12 h-12 bg-accent/10 text-accent rounded-full flex items-center justify-center shrink-0">
                                <Users className="w-6 h-6" />
                            </div>
                            <div className="flex-grow">
                                <p className="text-sm font-bold text-gray-900">System Initialized</p>
                                <p className="text-xs text-gray-500">Admin dashboard has been successfully upgraded to responsive layout.</p>
                            </div>
                            <span className="text-[10px] font-bold text-gray-400 uppercase">Recently</span>
                        </div>
                        <p className="text-gray-400 text-sm italic text-center py-4">No other activities to show yet.</p>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="bg-navy p-8 rounded-[2.5rem] shadow-xl text-white relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full -mr-16 -mt-16 blur-3xl group-hover:scale-150 transition-transform duration-1000" />
                        <h3 className="text-xl font-serif font-bold mb-6 flex items-center gap-2">
                            Quick Actions
                        </h3>
                        <div className="space-y-4">
                            <Link href="/admin/members" className="flex items-center justify-between w-full py-4 px-6 bg-accent hover:bg-accent/90 text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-accent/20">
                                Add Member <Plus className="w-4 h-4" />
                            </Link>
                            <Link href="/admin/news" className="flex items-center justify-between w-full py-4 px-6 bg-white/5 hover:bg-white/10 text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-all border border-white/10">
                                Create Post <ArrowUpRight className="w-4 h-4" />
                            </Link>
                            <Link href="/admin/events" className="flex items-center justify-between w-full py-4 px-6 bg-white/5 hover:bg-white/10 text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-all border border-white/10">
                                Create Event <ArrowUpRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm text-center">
                        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Users className="w-8 h-8" />
                        </div>
                        <h4 className="font-serif font-bold text-gray-900 text-lg mb-2">Need Support?</h4>
                        <p className="text-sm text-gray-500 mb-6">Access the documentation or contact the tech committee.</p>
                        <button className="w-full py-3 bg-slate-50 text-gray-600 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-slate-100 transition-all">
                            Open Docs
                        </button>
                    </div>
                </div>
            </div>
        </AdminPageLayout>
    );
}
