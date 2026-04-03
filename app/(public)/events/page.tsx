import { sql } from "@/lib/db";
import { format, isAfter, isBefore } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, Clock, ArrowRight, Video } from "lucide-react";
import { getEventFallbackImage } from "@/lib/media";
import { transformCloudinary } from "@/lib/cloudinary-client";

async function getEvents() {
    try {
        const events = await sql`
            SELECT * FROM events 
            WHERE status = 'published' 
            ORDER BY date DESC, time DESC
        `;
        return events;
    } catch (err) {
        console.error("Failed to fetch events", err);
        return [];
    }
}

export default async function EventsPage() {
    const events = await getEvents();
    const now = new Date();

    const upcomingEvents = events.filter(e => isAfter(new Date(e.date), now) || format(new Date(e.date), 'yyyy-MM-dd') === format(now, 'yyyy-MM-dd'));
    const pastEvents = events.filter(e => isBefore(new Date(e.date), now) && format(new Date(e.date), 'yyyy-MM-dd') !== format(now, 'yyyy-MM-dd'));

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="relative pt-20 pb-12 bg-[#0a1128] text-white">
                <div className="absolute inset-0 z-0 opacity-20">
                    <Image
                        src="https://images.unsplash.com/photo-1511795409834-432f7b1728d2?q=80&w=2000"
                        alt="Events"
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-accent/20 text-accent text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] mb-4 sm:mb-6 border border-accent/20">
                        ACF Calendar
                    </span>
                    <h1 className="text-4xl sm:text-4xl sm:text-5xl md:text-6xl font-serif font-bold mb-4 sm:mb-6 italic leading-tight">Events & <span className="font-light not-italic">Outreach</span></h1>
                    <p className="text-sm sm:text-base md:text-lg text-white/60 max-w-2xl mx-auto font-medium leading-relaxed">
                        Stay connected with our mission through scheduled advocacy, community meetups, and global events.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 py-12">
                {/* Upcoming Events Section */}
                <div className="mb-20">
                    <div className="flex items-center gap-4 mb-12">
                        <h2 className="text-2xl font-serif font-bold text-gray-900 shrink-0">Upcoming Gatherings</h2>
                        <div className="h-px bg-gray-100 w-full" />
                    </div>

                    {upcomingEvents.length === 0 ? (
                        <div className="bg-slate-50 rounded-[2.5rem] sm:rounded-[3rem] p-10 sm:p-20 text-center border border-dashed border-gray-200">
                            <Calendar className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300 mx-auto mb-4" />
                            <p className="text-sm sm:text-base text-gray-400 font-medium italic">No upcoming events scheduled at the moment. Check back soon!</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
                            {upcomingEvents.map((event) => (
                                <EventCard key={event.id} event={event} isUpcoming />
                            ))}
                        </div>
                    )}
                </div>

                {/* Past Events Section */}
                {pastEvents.length > 0 && (
                    <div>
                        <div className="flex items-center gap-4 mb-12">
                            <h2 className="text-2xl font-serif font-bold text-gray-400 shrink-0">Past Memories</h2>
                            <div className="h-px bg-gray-100 w-full" />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
                            {pastEvents.map((event) => (
                                <EventCard key={event.id} event={event} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function EventCard({ event, isUpcoming = false }: { event: any, isUpcoming?: boolean }) {
    return (
        <Link
            href={`/events/${event.id}`}
            className="group bg-white rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full"
        >
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <Image
                    src={transformCloudinary(event.image_url) || getEventFallbackImage(event.id)}
                    alt={event.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute top-3 left-3 md:top-6 md:left-6 flex flex-col items-center justify-center w-10 h-10 md:w-14 md:h-14 bg-white/90 backdrop-blur-md rounded-xl md:rounded-2xl shadow-xl">
                    <span className="text-primary font-black text-sm md:text-xl leading-none">{format(new Date(event.date), 'd')}</span>
                    <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-accent mt-0.5">{format(new Date(event.date), 'MMM')}</span>
                </div>
                {isUpcoming && (
                    <div className="absolute top-3 right-3 md:top-6 md:right-6">
                        <span className="px-2 py-0.5 md:px-3 md:py-1 bg-accent text-primary text-[8px] md:text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">Upcoming</span>
                    </div>
                )}
            </div>

            <div className="p-4 md:p-8 flex-grow flex flex-col">
                <div className="space-y-2 md:space-y-4 mb-4 md:mb-8">
                    <h3 className="text-lg md:text-2xl font-serif font-bold text-gray-900 group-hover:text-primary transition-colors leading-tight line-clamp-2">{event.title}</h3>
                    <div className="flex flex-col gap-1 md:gap-2">
                        {event.time && (
                            <div className="flex items-center gap-2 text-[10px] md:text-xs font-bold text-gray-400">
                                <Clock className="w-3 h-3 md:w-4 md:h-4 text-accent" /> {event.time}
                            </div>
                        )}
                        {event.location && (
                            <div className="flex items-center gap-2 text-[10px] md:text-xs font-bold text-gray-400">
                                {event.location.includes('http') ? <Video className="w-3 h-3 md:w-4 md:h-4 text-emerald-500" /> : <MapPin className="w-3 h-3 md:w-4 md:h-4 text-accent" />}
                                <span className="truncate max-w-[120px] md:max-w-[200px]">{event.location}</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-auto pt-4 md:pt-6 border-t border-gray-50 flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary flex items-center gap-2">
                        Details <ArrowRight className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <span className="hidden sm:inline-block text-[10px] font-bold text-gray-300 uppercase tracking-widest">
                        EST. 2024
                    </span>
                </div>
            </div>
        </Link>
    );
}
