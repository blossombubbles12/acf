"use client";

import { useState, useEffect } from "react";
import {
    Bell,
    CheckCircle2,
    Newspaper,
    Users,
    Calendar,
    Image as ImageIcon,
    Loader2,
    Info
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export function NotificationsClient() {
    const [notifications, setNotifications] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchNotifications = async () => {
        try {
            const res = await fetch("/api/notifications");

            if (res.status === 401) {
                window.location.href = "/admin/login";
                return;
            }

            const data = await res.json();
            if (Array.isArray(data)) {
                setNotifications(data);
            }
        } catch (err) {
            console.error("Failed to fetch notifications:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'news': return <Newspaper className="w-5 h-5 text-blue-500" />;
            case 'member': return <Users className="w-5 h-5 text-green-500" />;
            case 'event': return <Calendar className="w-5 h-5 text-purple-500" />;
            case 'media': return <ImageIcon className="w-5 h-5 text-orange-500" />;
            default: return <Info className="w-5 h-5 text-gray-400" />;
        }
    };

    const getTypeLabel = (type: string) => {
        return type.charAt(0).toUpperCase() + type.slice(1);
    };

    if (loading) {
        return (
            <div className="flex justify-center py-40 bg-white rounded-[2.5rem] border border-gray-100 italic text-gray-400">
                <Loader2 className="w-10 h-10 animate-spin text-primary/20 mr-4" />
                Synchronizing activity log...
            </div>
        );
    }

    if (notifications.length === 0) {
        return (
            <div className="bg-white rounded-[2.5rem] p-20 border border-gray-100 shadow-sm text-center">
                <div className="w-20 h-20 bg-slate-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-6 text-gray-200">
                    <Bell className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">No activities recorded yet</h3>
                <p className="text-gray-400 font-medium">Notifications will appear here as you manage the platform.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between px-6 mb-2">
                <p className="text-[10px] font-black uppercase text-gray-400 tracking-[0.3em]">Latest System Events</p>
                <span className="text-[10px] font-black uppercase text-primary tracking-widest bg-primary/5 px-2 py-1 rounded-lg">Real-time Feed Active</span>
            </div>

            <div className="bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden shadow-sm divide-y divide-gray-50">
                {notifications.map((notif) => (
                    <div
                        key={notif.id}
                        className={`p-8 hover:bg-slate-50/50 transition-all flex items-start gap-8 ${!notif.is_read ? 'bg-primary/[0.01]' : ''}`}
                    >
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${!notif.is_read ? 'bg-white ring-4 ring-primary/5' : 'bg-slate-50'
                            }`}>
                            {getTypeIcon(notif.type)}
                        </div>

                        <div className="flex-grow pt-1">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                                    {getTypeLabel(notif.type)} Update
                                </span>
                                <span className="text-xs font-bold text-gray-400 italic">
                                    {formatDistanceToNow(new Date(notif.created_at), { addSuffix: true })}
                                </span>
                            </div>
                            <p className={`text-lg leading-relaxed ${!notif.is_read ? 'font-bold text-gray-900' : 'text-gray-500 font-medium'}`}>
                                {notif.message}
                            </p>
                        </div>

                        {!notif.is_read && (
                            <div className="w-2 h-2 bg-primary rounded-full mt-3 animate-pulse" />
                        )}
                    </div>
                ))}
            </div>

            <div className="pt-10 text-center">
                <p className="text-xs font-bold text-gray-300 italic">Showing the most recent 50 activities.</p>
            </div>
        </div>
    );
}
