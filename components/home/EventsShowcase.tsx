"use client";

import { useEffect, useState } from "react";
import { ShowcaseCarousel } from "./ShowcaseCarousel";
import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import Image from "next/image";
import { useCloudinaryPool } from "@/hooks/useCloudinaryPool";
import { transformCloudinary } from "@/lib/cloudinary-client";

interface Event {
    id: number;
    title: string;
    description: string;
    date: string;
    time: string | null;
    location: string | null;
    image_url: string | null;
}

export function EventsShowcase() {
    const { getRandomImage } = useCloudinaryPool('home');
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchEvents() {
            try {
                const res = await fetch("/api/events");
                const data = await res.json();
                setEvents(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error("Failed to fetch events");
            } finally {
                setLoading(false);
            }
        }
        fetchEvents();
    }, []);

    if (loading) return null;
    if (events.length === 0) return null;

    return (
        <ShowcaseCarousel
            title="ACF Events"
            subtitle="Mark Your Calendars"
            items={events}
            viewAllHref="/events"
            columns={3}
            renderItem={(event) => (
                <div className="group bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-500 h-full flex flex-col">
                    <div className="relative h-64 overflow-hidden">
                        <Image
                            src={transformCloudinary(event.image_url) || getRandomImage(event.id)}
                            alt={event.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            unoptimized
                        />
                        <div className="absolute top-4 left-4 mb-0 px-3 py-1.5 bg-white/95 backdrop-blur-md rounded-lg shadow-sm">
                            <p className="text-[9px] font-black uppercase tracking-widest text-slate-900 border-l-2 border-amber-500 pl-2">
                                {format(new Date(event.date), "MMM d, yyyy")}
                            </p>
                        </div>
                    </div>
                    <div className="p-6 flex-grow flex flex-col">
                        <h4 className="text-base font-outfit font-bold text-slate-950 mb-3 line-clamp-2 min-h-[2.5rem] group-hover:text-amber-600 transition-colors">
                            {event.title}
                        </h4>
                        <div className="space-y-2 mb-6">
                            <div className="flex items-center gap-2 text-slate-500 text-[11px] font-medium">
                                <MapPin className="w-3.5 h-3.5 text-amber-500" />
                                <span className="line-clamp-1">{event.location || "TBA"}</span>
                            </div>
                        </div>
                        <Link
                            href="/events"
                            className="mt-auto inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-900 hover:text-amber-600 transition-colors"
                        >
                            Read Details <ArrowRight className="w-3 h-3" />
                        </Link>
                    </div>
                </div>
            )}
        />
    );
}

