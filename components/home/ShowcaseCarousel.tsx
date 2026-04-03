"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform, useMotionValue } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ShowcaseCarouselProps {
    title: string;
    subtitle: string;
    items: any[];
    renderItem: (item: any, index: number) => React.ReactNode;
    viewAllHref: string;
    columns?: number;
}

export function ShowcaseCarousel({ title, subtitle, items, renderItem, viewAllHref, columns = 4 }: ShowcaseCarouselProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
        }
    };

    const getColumnClass = (cols: number) => {
        switch(cols) {
            case 2: return "md:w-[calc((100%-1rem)/2)]";
            case 3: return "md:w-[calc((100%-2rem)/3)]";
            case 4: return "md:w-[calc((100%-3rem)/4)]";
            default: return "md:w-[calc((100%-3rem)/4)]";
        }
    };

    useEffect(() => {
        checkScroll();
        window.addEventListener("resize", checkScroll);
        return () => window.removeEventListener("resize", checkScroll);
    }, [items]);

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const { clientWidth } = scrollRef.current;
            const scrollAmount = direction === "left" ? -clientWidth : clientWidth;
            scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
    };

    return (
        <section className="py-12 bg-white overflow-hidden">
            <div className="max-w-6xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-6">
                    <div className="max-w-2xl text-left">
                        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-amber-600 mb-2 block">
                            {subtitle}
                        </span>
                        <h2 className="text-3xl md:text-4xl font-outfit font-bold text-slate-950 tracking-tight">
                            {title}
                        </h2>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => scroll("left")}
                            className={`p-2.5 rounded-lg border transition-all ${canScrollLeft ? "border-slate-200 text-slate-900 hover:bg-slate-50" : "border-slate-100 text-slate-200 cursor-not-allowed"}`}
                            disabled={!canScrollLeft}
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => scroll("right")}
                            className={`p-2.5 rounded-lg border transition-all ${canScrollRight ? "border-slate-200 text-slate-900 hover:bg-slate-50" : "border-slate-100 text-slate-200 cursor-not-allowed"}`}
                            disabled={!canScrollRight}
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div
                    ref={scrollRef}
                    onScroll={checkScroll}
                    className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-6"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className={`shrink-0 snap-start w-[calc(80%-0.75rem)] sm:w-[calc(50%-0.5rem)] ${getColumnClass(columns)}`}
                        >
                            {renderItem(item, index)}
                        </div>
                    ))}
                    {items.length === 0 && (
                        <div className="w-full py-12 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                            <p className="text-slate-400 text-xs font-medium">Coming soon...</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

