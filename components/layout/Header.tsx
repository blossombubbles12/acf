"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";

const navItems = [
    { name: "Home", href: "/" },
    {
        name: "About ACF",
        href: "/about",
        children: [
            { name: "Our Story", href: "/about" },
            { name: "Board Members", href: "/about/board" },
            { name: "Director's Letter", href: "/about/board#directors-letter" },
        ]
    },
    { name: "Industry Hub", href: "/community" },
    { name: "Media", href: "/media" },
    { name: "Events", href: "/events" },
    { name: "News", href: "/news" },
    { name: "Contact", href: "/contact" },
    { name: "Donate", href: "/donate" },
];

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    return (
        <header
            className={cn(
                "sticky top-0 left-0 right-0 z-50 transition-all duration-300 border-b bg-white backdrop-blur-md",
                isScrolled
                    ? "shadow-sm border-slate-200 py-2.5"
                    : "border-slate-100 py-4"
            )}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="relative w-11 h-11 flex-shrink-0 bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden flex items-center justify-center">
                        <Image
                            src="/acflogo.png"
                            alt="ACF Logo"
                            fill
                            className="object-contain p-1"
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-outfit font-bold leading-tight text-base tracking-tight text-slate-950">
                            Actors Charity Foundation
                        </span>
                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">
                            Creative Social Change
                        </span>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex items-center gap-6">
                    {navItems.map((item) => (
                        <div key={item.href} className="relative"
                            onMouseEnter={() => item.children && setOpenDropdown(item.name)}
                            onMouseLeave={() => setOpenDropdown(null)}
                        >
                            <Link
                                href={item.href}
                                className={cn(
                                    "text-[11px] font-black uppercase tracking-widest transition-colors hover:text-amber-600 relative py-1 flex items-center gap-1",
                                    pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
                                        ? "text-amber-600"
                                        : "text-slate-700"
                                )}
                            >
                                {item.name}
                                {item.children && <ChevronDown className="w-3 h-3 opacity-50" />}
                                {(pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))) && (
                                    <motion.span
                                        layoutId="underline"
                                        className="absolute left-0 bottom-0 w-full h-[2px] bg-amber-500"
                                    />
                                )}
                            </Link>

                            {/* Dropdown */}
                            <AnimatePresence>
                                {item.children && openDropdown === item.name && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 8 }}
                                        transition={{ duration: 0.15 }}
                                        className="absolute top-full left-0 mt-1 w-52 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden z-50"
                                    >
                                        {item.children.map((child) => (
                                            <Link
                                                key={child.href}
                                                href={child.href}
                                                className="block px-4 py-3 text-[11px] font-black uppercase tracking-widest text-slate-600 hover:bg-amber-50 hover:text-amber-600 transition-colors border-b border-slate-50 last:border-0"
                                            >
                                                {child.name}
                                            </Link>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                    <Link
                        href="/community/join"
                        className="px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all shadow-sm hover:shadow-md bg-slate-900 text-white hover:bg-slate-800"
                    >
                        Member Portal
                    </Link>
                </nav>


                {/* Mobile Toggle */}
                <button
                    className="md:hidden p-2 text-current"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? (
                        <X className="text-slate-800" />
                    ) : (
                        <Menu className="text-slate-800" />
                    )}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-xl p-4 md:hidden"
                    >
                        <nav className="flex flex-col gap-4">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "block px-4 py-2 rounded-md text-base font-medium transition-colors",
                                        pathname === item.href
                                            ? "bg-primary/10 text-primary"
                                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                    )}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <div className="h-px bg-gray-100 my-2" />
                            <Link
                                href="/community/join"
                                className="block w-full text-center px-4 py-3 bg-primary text-white rounded-md font-semibold hover:bg-primary/90"
                            >
                                Member Login
                            </Link>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
