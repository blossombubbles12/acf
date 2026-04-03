"use client";

import { useState, useEffect } from "react";
import {
    Calendar,
    Plus,
    Search,
    MoreVertical,
    Edit,
    Trash2,
    Eye,
    EyeOff,
    Loader2,
    MapPin,
    Clock,
    AlertCircle,
    CheckCircle2
} from "lucide-react";
import { format } from "date-fns";
import { Event, CreateEventInput } from "@/types/events";
import { EventForm } from "./EventForm";
import { DeleteConfirmModal } from "./DeleteConfirmModal";
import { useToast } from "@/hooks/useToast";

export function EventsManagerClient() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState<Event | null>(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [eventToDelete, setEventToDelete] = useState<number | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const { success, error, ToastContainer } = useToast();

    const fetchEvents = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/events?all=true");
            const data = await res.json();
            if (Array.isArray(data)) {
                setEvents(data);
            }
        } catch (err) {
            console.error("Failed to fetch events");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleDeleteClick = (id: number) => {
        setEventToDelete(id);
        setDeleteModalOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!eventToDelete) return;
        setIsDeleting(true);
        try {
            const res = await fetch(`/api/events/${eventToDelete}`, { method: "DELETE" });
            if (res.ok) {
                success("Event deleted successfully!");
                setEvents(events.filter(e => e.id !== eventToDelete));
            } else {
                error("Failed to delete event. Please try again.");
            }
        } catch (err) {
            console.error("Failed to delete event");
            error("An error occurred while deleting the event.");
        } finally {
            setIsDeleting(false);
            setDeleteModalOpen(false);
            setEventToDelete(null);
        }
    };

    const handleToggleStatus = async (event: Event) => {
        const newStatus = event.status === "published" ? "draft" : "published";
        const formData = new FormData();
        formData.append("status", newStatus);
        formData.append("title", event.title);
        formData.append("description", event.description);
        formData.append("date", event.date);

        try {
            const res = await fetch(`/api/events/${event.id}`, {
                method: "PUT",
                body: formData
            });
            if (res.ok) {
                success(`Event ${newStatus === 'published' ? 'published' : 'unpublished'} successfully!`);
                fetchEvents();
            } else {
                error("Failed to update event status. Please try again.");
            }
        } catch (err) {
            console.error("Failed to update status");
            error("An error occurred while updating the event status.");
        }
    };

    const filteredEvents = events.filter(event =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex justify-center py-40">
                <Loader2 className="w-10 h-10 animate-spin text-primary/20" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <ToastContainer />

            <DeleteConfirmModal
                isOpen={deleteModalOpen}
                onClose={() => {
                    setDeleteModalOpen(false);
                    setEventToDelete(null);
                }}
                onConfirm={handleDeleteConfirm}
                title="Delete Event?"
                description="This action cannot be undone. This will permanently remove the event and its associated image."
                loading={isDeleting}
            />

            {/* Header / Actions */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search events by title or location..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white rounded-xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all font-medium text-sm"
                    />
                </div>
                <button
                    onClick={() => {
                        setEditingEvent(null);
                        setIsFormOpen(true);
                    }}
                    className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                >
                    <Plus className="w-4 h-4" /> Create New Event
                </button>
            </div>

            {/* Events Grid/List */}
            {filteredEvents.length === 0 ? (
                <div className="bg-white rounded-[2.5rem] p-20 border border-gray-100 text-center">
                    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-gray-300">
                        <Calendar className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No events found</h3>
                    <p className="text-gray-400">Start by creating your first event for the alumni network.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredEvents.map((event) => (
                        <div key={event.id} className="group bg-white rounded-[2rem] border border-gray-100 overflow-hidden hover:shadow-xl transition-all flex flex-col">
                            {/* Image Placeholder/Thumbnail */}
                            <div className="aspect-video bg-slate-100 relative overflow-hidden">
                                {event.image_url ? (
                                    <img src={event.image_url} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                                        <Calendar className="w-12 h-12 opacity-20" />
                                    </div>
                                )}
                                <div className="absolute top-4 right-4 flex gap-2">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md shadow-sm border ${event.status === 'published'
                                        ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
                                        : 'bg-amber-500/10 text-amber-600 border-amber-500/20'
                                        }`}>
                                        {event.status}
                                    </span>
                                </div>
                            </div>

                            <div className="p-6 flex-grow flex flex-col">
                                <div className="flex items-start justify-between mb-4">
                                    <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{event.title}</h3>
                                    <div className="flex gap-1 ml-2">
                                        <button
                                            onClick={() => {
                                                setEditingEvent(event);
                                                setIsFormOpen(true);
                                            }}
                                            className="p-2 hover:bg-slate-50 rounded-lg text-gray-400 hover:text-primary transition-colors"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteClick(event.id)}
                                            className="p-2 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-600 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-2 mb-6">
                                    <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
                                        <Calendar className="w-3 h-3 text-primary" />
                                        {format(new Date(event.date), "PPP")}
                                    </div>
                                    {event.time && (
                                        <div className="flex items-center gap-2 text-xs font-medium text-gray-400">
                                            <Clock className="w-3 h-3" />
                                            {event.time}
                                        </div>
                                    )}
                                    {event.location && (
                                        <div className="flex items-center gap-2 text-xs font-medium text-gray-400 truncate">
                                            <MapPin className="w-3 h-3" />
                                            {event.location}
                                        </div>
                                    )}
                                </div>

                                <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50">
                                    <button
                                        onClick={() => handleToggleStatus(event)}
                                        className="text-xs font-black uppercase tracking-widest text-primary flex items-center gap-2 hover:opacity-70 transition-opacity"
                                    >
                                        {event.status === 'published' ? <><EyeOff className="w-3 h-3" /> Unpublish</> : <><Eye className="w-3 h-3" /> Publish Now</>}
                                    </button>
                                    <span className="text-[10px] text-gray-300 font-bold uppercase tracking-widest">
                                        ID: #{event.id}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Form Modal */}
            {isFormOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white rounded-[2.5rem] w-full max-w-4xl max-h-[90vh] overflow-y-auto relative animate-in fade-in zoom-in duration-300 shadow-2xl">
                        <EventForm
                            event={editingEvent}
                            onClose={() => setIsFormOpen(false)}
                            onSuccess={() => {
                                success(editingEvent ? "Event updated successfully!" : "Event created successfully!");
                                setIsFormOpen(false);
                                fetchEvents();
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
