import { sql } from "@/lib/db";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import {
    Calendar,
    MapPin,
    Clock,
    ArrowLeft,
    Share2,
    Bell,
    CalendarPlus,
    ChevronRight,
    Video,
    Users
} from "lucide-react";
import { notFound } from "next/navigation";
import { getEventFallbackImage } from "@/lib/media";
import { transformCloudinary } from "@/lib/cloudinary-client";

async function getEvent(id: string) {
    try {
        const event = await sql`
            SELECT * FROM events 
            WHERE id = ${id} AND status = 'published'
            LIMIT 1
        `;
        return event[0] || null;
    } catch (err) {
        console.error("Failed to fetch event", err);
        return null;
    }
}

export default async function EventDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const event = await getEvent(id);

    if (!event) {
        notFound();
    }

    const eventDate = new Date(event.date);

    return (
        <div className="bg-white min-h-screen">
            {/* Background Blur Effect */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-30">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -mr-64 -mt-64" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] -ml-64 -mb-64" />
            </div>

            {/* Mobile/App style Header */}
            <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-50 flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 md:px-12">
                <Link
                    href="/events"
                    className="flex items-center gap-2 text-[9px] sm:text-xs font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] text-gray-400 hover:text-primary transition-all group"
                >
                    <ArrowLeft className="w-3.5 h-3.5 sm:w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="hidden sm:inline">Back to Calendar</span><span className="sm:hidden">Calendar</span>
                </Link>
                <div className="flex items-center gap-2 sm:gap-4">
                    <button className="p-2 text-gray-400 hover:text-primary transition-colors">
                        <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-primary transition-colors">
                        <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                </div>
            </div>

            <main className="container mx-auto px-4 py-12 md:py-12 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-12 gap-6 md:gap-8 lg:gap-10">

                        {/* Left Column: Visuals */}
                        <div className="lg:col-span-7 space-y-8 sm:space-y-10">
                            <div className="relative aspect-[4/3] sm:aspect-[16/10] rounded-[2rem] sm:rounded-[3rem] overflow-hidden shadow-2xl bg-slate-100 group">
                                <Image
                                    src={transformCloudinary(event.image_url) || getEventFallbackImage(event.id)}
                                    alt={event.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-1000"
                                />
                                <div className="absolute top-4 left-4 sm:top-8 sm:left-8 p-4 sm:p-6 bg-white/90 backdrop-blur-md rounded-[1.5rem] sm:rounded-[2rem] shadow-2xl flex flex-col items-center min-w-[70px] sm:min-w-[100px]">
                                    <span className="text-primary font-black text-2xl sm:text-4xl leading-none">{format(eventDate, 'd')}</span>
                                    <span className="text-[9px] sm:text-xs font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-accent mt-1 sm:mt-2">{format(eventDate, 'MMM')}</span>
                                    <span className="text-[9px] sm:text-xs font-bold text-gray-400 mt-0.5 sm:mt-1">{format(eventDate, 'yyyy')}</span>
                                </div>
                            </div>

                            <div className="prose prose-sm sm:prose-lg max-w-none">
                                <h3 className="text-[10px] sm:text-sm font-black uppercase tracking-[0.4em] text-accent mb-4 sm:mb-6">About the Event</h3>
                                <div className="text-gray-600 leading-relaxed font-medium text-base sm:text-lg whitespace-pre-wrap">
                                    {event.description}
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Key Details & Actions */}
                        <div className="lg:col-span-5 space-y-6 sm:space-y-8">
                            <div className="space-y-4 sm:space-y-6">
                                <span className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-primary/5 text-primary text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] border border-primary/10">
                                    Official Gathering
                                </span>
                                <h1 className="text-3xl sm:text-3xl md:text-5xl font-serif font-bold text-gray-900 leading-tight italic">
                                    {event.title}
                                </h1>
                            </div>

                            <div className="bg-slate-50/50 rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-10 border border-gray-100 space-y-6 sm:space-y-8">
                                <div className="space-y-4 sm:space-y-6">
                                    <div className="flex items-start gap-4 sm:gap-6">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-xl sm:rounded-2xl flex items-center justify-center text-accent shadow-sm border border-gray-50 overflow-hidden shrink-0">
                                            <Clock className="w-5 h-5 sm:w-6 sm:h-6" />
                                        </div>
                                        <div>
                                            <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-gray-400 mb-0.5 sm:mb-1">Time</p>
                                            <p className="text-base sm:text-lg font-bold text-gray-900">{event.time || 'TBD'}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4 sm:gap-6">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-xl sm:rounded-2xl flex items-center justify-center text-primary shadow-sm border border-gray-50 shrink-0">
                                            {event.location?.includes('http') ? <Video className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-500" /> : <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />}
                                        </div>
                                        <div>
                                            <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-gray-400 mb-0.5 sm:mb-1">Location</p>
                                            {event.location?.includes('http') ? (
                                                <a href={event.location} target="_blank" className="text-base sm:text-lg font-bold text-primary hover:underline flex items-center gap-2">
                                                    Join Online Meeting <ChevronRight className="w-4 h-4" />
                                                </a>
                                            ) : (
                                                <p className="text-base sm:text-lg font-bold text-gray-900 leading-tight">{event.location || 'Announced Soon'}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4 sm:gap-6">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-xl sm:rounded-2xl flex items-center justify-center text-secondary shadow-sm border border-gray-50 shrink-0">
                                            <Users className="w-5 h-5 sm:w-6 sm:h-6" />
                                        </div>
                                        <div>
                                            <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-gray-400 mb-0.5 sm:mb-1">Attendance</p>
                                            <p className="text-base sm:text-lg font-bold text-gray-900">ACF Partners & Invited Guests</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6 sm:pt-8 border-t border-gray-200/60 flex flex-col gap-3 sm:gap-4">
                                    <button className="w-full py-4 sm:py-5 bg-primary text-white rounded-xl sm:rounded-[1.5rem] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 text-xs sm:text-base">
                                        <CalendarPlus className="w-5 h-5" /> RSVP for Event
                                    </button>
                                    <button className="w-full py-4 sm:py-5 bg-white text-gray-600 border border-gray-200 rounded-xl sm:rounded-[1.5rem] font-bold hover:bg-slate-50 transition-all text-xs sm:text-base">
                                        Add to Google Calendar
                                    </button>
                                </div>
                            </div>

                            <div className="p-8 md:p-10 bg-[#0a1128] rounded-[3rem] text-white relative overflow-hidden">
                                <div className="relative z-10 space-y-4">
                                    <h4 className="text-xl font-serif font-bold italic">Need Assistance?</h4>
                                    <p className="text-white/50 text-sm font-medium leading-relaxed">
                                        If you have questions regarding logistics, accommodation, or transportation for this event, please contact the ACF coordination team.
                                    </p>
                                    <button className="text-secondary text-xs font-black uppercase tracking-[0.2em] flex items-center gap-2 pt-2 hover:translate-x-1 transition-transform">
                                        Contact Secretariat <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary opacity-10 rounded-full blur-2xl -mr-16 -mt-16" />
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
}
