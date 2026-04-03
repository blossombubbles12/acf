"use client";

import { useState, useEffect } from "react";
import { Bell, Loader2, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

export function NotificationBell() {
    const [notifications, setNotifications] = useState<any[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const fetchNotifications = async () => {
        try {
            const res = await fetch("/api/notifications");
            const data = await res.json();
            if (Array.isArray(data)) {
                setNotifications(data);
            }
        } catch (err) {
            console.error("Failed to fetch notifications");
        }
    };

    useEffect(() => {
        fetchNotifications();
        const interval = setInterval(fetchNotifications, 60000); // Refresh every minute
        return () => clearInterval(interval);
    }, []);

    const unreadCount = notifications.filter(n => !n.is_read).length;

    const markAllAsRead = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/notifications", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ markAllAsRead: true }),
            });
            if (res.ok) {
                setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
            }
        } catch (err) {
            console.error("Failed to mark all as read");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-3 border rounded-2xl transition-all shadow-sm relative ${isOpen ? "bg-primary text-white border-primary" : "bg-white border-gray-100 text-gray-400 hover:text-primary hover:border-primary"
                    }`}
            >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-black rounded-full flex items-center justify-center ring-4 ring-white">
                        {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-4 w-80 md:w-96 bg-white rounded-[2rem] shadow-2xl border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-4">
                    <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-slate-50/50">
                        <div>
                            <h3 className="font-serif font-bold text-gray-900">Notifications</h3>
                            <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mt-0.5">System Activity Log</p>
                        </div>
                        {unreadCount > 0 && (
                            <button
                                onClick={markAllAsRead}
                                disabled={loading}
                                className="text-[10px] font-black uppercase tracking-widest text-primary hover:text-primary/70 disabled:opacity-50"
                            >
                                {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : "Mark all read"}
                            </button>
                        )}
                    </div>

                    <div className="max-h-[400px] overflow-y-auto divide-y divide-gray-50">
                        {notifications.length === 0 ? (
                            <div className="p-12 text-center">
                                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-gray-200">
                                    <CheckCircle2 className="w-6 h-6" />
                                </div>
                                <p className="text-sm font-medium text-gray-400">All caught up!</p>
                            </div>
                        ) : (
                            notifications.map((notif) => (
                                <Link
                                    key={notif.id}
                                    href={notif.link || "/admin/dashboard"}
                                    className={`block p-5 hover:bg-slate-50 transition-colors ${!notif.is_read ? "bg-primary/[0.02]" : ""}`}
                                    onClick={() => setIsOpen(false)}
                                >
                                    <div className="flex gap-4">
                                        <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${!notif.is_read ? "bg-primary animate-pulse" : "bg-gray-200"}`} />
                                        <div className="flex-grow">
                                            <p className={`text-sm ${!notif.is_read ? "font-bold text-gray-900" : "text-gray-500"}`}>
                                                {notif.message}
                                            </p>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-2">
                                                {formatDistanceToNow(new Date(notif.created_at), { addSuffix: true })}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>

                    <Link
                        href="/admin/notifications"
                        className="block p-4 bg-slate-50 text-center text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-primary transition-colors"
                        onClick={() => setIsOpen(false)}
                    >
                        View Full Activity Log
                    </Link>
                </div>
            )}
        </div>
    );
}
