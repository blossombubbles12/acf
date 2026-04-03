"use client";

import Image from "next/image";

const PARTNERS = Array.from({ length: 14 }, (_, i) => `/partner${i + 1}.jpeg`);

export function PartnersScroller() {
    // Duplicate partners array to create seamless infinite scroll effect
    const duplicatedPartners = [...PARTNERS, ...PARTNERS];

    return (
        <section className="py-12 bg-white border-y border-slate-100 overflow-hidden">
            <div className="max-w-6xl mx-auto px-4 mb-8 text-center">
                <span className="text-xs sm:text-sm font-black tracking-[0.3em] uppercase text-slate-300">Our Trusted Partners</span>
            </div>
            
            <div className="relative flex overflow-x-hidden group">
                <div className="flex animate-marquee group-hover:[animation-play-state:paused] whitespace-nowrap w-max">
                    {duplicatedPartners.map((src, index) => (
                        <div key={index} className="flex-none mx-4 sm:mx-8 w-24 h-24 sm:w-28 sm:h-28 relative flex items-center justify-center transition-all duration-500">
                            <Image 
                                src={src} 
                                alt={`Partner ${index + 1}`} 
                                className="object-contain w-full h-full mix-blend-multiply" 
                                width={128} 
                                height={128} 
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
