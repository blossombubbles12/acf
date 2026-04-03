"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import NextImage from "next/image";
import { usePathname } from "next/navigation";
import {
    Users,
    Newspaper,
    Calendar,
    Image as ImageIcon,
    LogOut,
    ChevronLeft,
    Menu,
    X,
    LayoutDashboard,
    Bell,
    Settings
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NotificationBell } from "./NotificationBell";

interface AdminLayoutClientProps {
    children: React.ReactNode;
    title: string;
    subtitle?: string;
    activePage: string;
    actions?: React.ReactNode;
    session: any;
}

export default function AdminLayoutClient({
    children,
    title,
    subtitle,
    activePage,
    actions,
    session
}: AdminLayoutClientProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    const navItems = [
        { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard, id: "dashboard" },
        { name: "Members", href: "/admin/members", icon: Users, id: "members" },
        { name: "News & Stories", href: "/admin/news", icon: Newspaper, id: "news" },
        { name: "Events Hub", href: "/admin/events", icon: Calendar, id: "events" },
        { name: "Media Gallery", href: "/admin/media", icon: ImageIcon, id: "media" },
        { name: "Activity Log", href: "/admin/notifications", icon: Bell, id: "notifications" },
        { name: "My Profile", href: "/admin/profile", icon: Settings, id: "profile" },
    ];

    const SidebarContent = () => (
        <div className="flex flex-col h-full">
            <div className="mb-10 px-4">
                <div className="flex items-center gap-4 mb-2">
                    <div className="relative w-12 h-12 flex-shrink-0">
                        <NextImage
                            src="/acflogo.png"
                            alt="ACF Logo"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                    <h2 className="text-2xl font-serif font-bold text-white tracking-tight">Admin Hub</h2>
                </div>
                <p className="text-[10px] uppercase font-black text-accent/60 tracking-[0.2em]">Actors Charity Foundation</p>
            </div>

            <nav className="space-y-1.5 flex-grow">
                {navItems.map((item) => {
                    const isActive = activePage === item.id;
                    return (
                        <Link
                            key={item.id}
                            href={item.href}
                            className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl text-sm font-bold transition-all duration-300 ${isActive
                                ? "bg-white text-navy shadow-xl shadow-black/20 translate-x-1"
                                : "text-white/60 hover:text-white hover:bg-white/5"
                                }`}
                        >
                            <item.icon className={`w-5 h-5 ${isActive ? "text-accent" : ""}`} />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            <div className="mt-auto pt-6 space-y-4">
                <Link href="/" className="flex items-center gap-3 px-5 py-3 text-white/40 hover:text-white text-xs font-bold transition-colors uppercase tracking-widest">
                    <LogOut className="w-4 h-4" /> Exit to Website
                </Link>
                <button
                    onClick={async () => {
                        await fetch("/api/auth/logout", { method: "POST" });
                        window.location.href = "/admin/login";
                    }}
                    className="w-full flex items-center gap-3 px-5 py-3.5 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-2xl text-xs font-black transition-all uppercase tracking-widest text-left"
                >
                    <LogOut className="w-4 h-4" /> Sign Out
                </button>
                <div className="p-5 bg-white/5 rounded-[2rem] border border-white/5">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-black uppercase text-white/40 tracking-widest">Server Status</span>
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                    </div>
                    <p className="text-xs font-bold text-white/80">Global Network Online</p>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50 flex overflow-hidden">
            {/* Desktop Sidebar */}
            <aside className="w-72 bg-navy text-white p-6 hidden lg:flex flex-col border-r border-white/5 shadow-2xl shrink-0">
                <SidebarContent />
            </aside>

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                        />
                        <motion.aside
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed inset-y-0 left-0 w-80 bg-navy text-white p-6 z-50 lg:hidden shadow-2xl"
                        >
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="absolute top-6 right-6 p-2 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                            <SidebarContent />
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* Main Content Area */}
            <div className="flex-grow flex flex-col h-screen overflow-hidden">
                {/* Top Mobile Header */}
                <header className="lg:hidden h-20 bg-white border-b border-gray-100 flex items-center justify-between px-6 shrink-0 z-30">
                    <div className="flex items-center gap-4">
                        <div className="relative w-10 h-10 flex-shrink-0">
                            <NextImage
                                src="/acflogo.png"
                                alt="ACF Logo"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                        <span className="font-serif font-bold text-lg text-primary tracking-tight">Admin Hub</span>
                    </div>
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="p-3 bg-slate-50 rounded-2xl text-primary hover:bg-slate-100 transition-all border border-gray-100"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                </header>

                <main className="flex-grow overflow-y-auto p-6 md:p-12 scroll-smooth">
                    <div className="max-w-7xl mx-auto">
                        {/* Content Header */}
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-12">
                            <div className="space-y-2">
                                <Link
                                    href="/admin/dashboard"
                                    className="inline-flex items-center gap-2 text-[10px] font-black text-accent uppercase tracking-[0.2em] hover:text-primary transition-colors bg-accent/5 px-3 py-1.5 rounded-full"
                                >
                                    <ChevronLeft className="w-3.5 h-3.5" /> Dashboard
                                </Link>
                                <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 tracking-tight">{title}</h1>
                                {subtitle && <p className="text-gray-500 font-medium text-lg leading-relaxed">{subtitle}</p>}
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="hidden sm:flex items-center gap-2">
                                    <NotificationBell />
                                    <button className="p-3 bg-white border border-gray-100 rounded-2xl text-gray-400 hover:text-primary hover:border-primary transition-all shadow-sm">
                                        <Settings className="w-5 h-5" />
                                    </button>
                                </div>
                                {actions}
                                <div className="flex items-center gap-4 pl-4 border-l border-gray-200">
                                    <div className="text-right hidden sm:block">
                                        <p className="text-sm font-bold text-gray-900 leading-none">{session?.user?.name || "Admin"}</p>
                                        <p className="text-[10px] uppercase font-black text-gray-400 tracking-widest mt-1">Super Admin</p>
                                    </div>
                                    <div className="h-14 w-14 bg-gradient-to-tr from-navy via-navy/80 to-primary text-white rounded-[1.5rem] flex items-center justify-center font-black text-xl shadow-2xl shadow-primary/20 border-2 border-white overflow-hidden relative">
                                        {session?.user?.avatar_url ? (
                                            <NextImage src={session.user.avatar_url} alt="Admin" fill className="object-cover" />
                                        ) : (
                                            session?.user?.name?.[0] || "A"
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Page Content */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            {children}
                        </motion.div>
                    </div>
                </main>
            </div>
        </div>
    );
}
