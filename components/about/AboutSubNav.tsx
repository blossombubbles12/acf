"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const ABOUT_NAV = [
    { label: "Our Story", href: "/about" },
    { label: "Board Members", href: "/about/board" },
    { label: "Executive", href: "/about/board#executive" },
    { label: "Director's Letter", href: "/about/board#directors-letter" },
];

export function AboutSubNav() {
    const pathname = usePathname();

    return (
        <nav className="sticky top-[57px] z-40 bg-white border-b border-slate-100 shadow-sm">
            <div className="max-w-6xl mx-auto px-6">
                <div className="flex items-center gap-1 overflow-x-auto scrollbar-none py-0">
                    {ABOUT_NAV.map((item) => {
                        const isActive = item.href === "/about"
                            ? pathname === "/about"
                            : pathname.startsWith(item.href.split("#")[0]) && item.href.split("#")[0] !== "/about";
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "whitespace-nowrap px-4 py-3.5 text-[11px] font-black uppercase tracking-widest border-b-2 transition-all",
                                    isActive
                                        ? "border-amber-500 text-amber-600"
                                        : "border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300"
                                )}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
}
