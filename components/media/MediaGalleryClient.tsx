"use client";

import { useState, useEffect } from "react";
import {
    Upload,
    Image as ImageIcon,
    Film,
    Trash2,
    Calendar,
    Loader2,
    Folder as FolderIcon,
    Plus,
    ChevronRight,
    ChevronLeft,
    LayoutGrid
} from "lucide-react";
import { MediaUploadModal } from "@/components/media/MediaUploadModal";
import Image from "next/image";
import { transformCloudinary } from "@/lib/cloudinary-client";

interface CloudinaryResource {
    public_id: string;
    format: string;
    version: number;
    resource_type: string;
    secure_url: string;
    created_at: string;
    width: number;
    height: number;
    bytes: number;
}

interface CloudinaryFolder {
    name: string;
    path: string;
    count: number;
    cover: string | null;
}

export function MediaGalleryClient() {
    const [folders, setFolders] = useState<CloudinaryFolder[]>([]);
    const [activeFolder, setActiveFolder] = useState<string | null>(null);
    const [media, setMedia] = useState<CloudinaryResource[]>([]);

    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [isNewFolderModalOpen, setIsNewFolderModalOpen] = useState(false);
    const [newFolderName, setNewFolderName] = useState("");

    const [isLoading, setIsLoading] = useState(true);
    const [isActionLoading, setIsActionLoading] = useState(false);

    // Fetch all albums (folders)
    const fetchFolders = async () => {
        setIsActionLoading(true);
        try {
            const res = await fetch("/api/media/folders");
            const data = await res.json();
            setFolders(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Failed to fetch albums");
        } finally {
            setIsActionLoading(false);
        }
    };

    // Fetch media items within an album OR root
    const fetchMedia = async (folderName: string | null) => {
        setIsLoading(true);
        try {
            const url = folderName ? `/api/media?folder=${folderName}` : "/api/media";
            const res = await fetch(url);
            const data = await res.json();
            setMedia(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Failed to fetch media");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateFolder = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newFolderName) return;
        setIsActionLoading(true);
        try {
            const res = await fetch("/api/media/folders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: newFolderName }),
            });
            if (res.ok) {
                setNewFolderName("");
                setIsNewFolderModalOpen(false);
                fetchFolders();
            }
        } catch (err) {
            console.error("Folder creation failed");
        } finally {
            setIsActionLoading(false);
        }
    };

    const handleDeleteMedia = async (public_id: string, resource_type: string) => {
        if (!confirm("Are you sure you want to permanently delete this item?")) return;

        setIsActionLoading(true);
        try {
            const res = await fetch("/api/media", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ public_id, resource_type }),
            });
            if (res.ok) {
                fetchMedia(activeFolder);
            }
        } catch (err) {
            console.error("Delete failed");
        } finally {
            setIsActionLoading(false);
        }
    };

    useEffect(() => {
        fetchFolders();
    }, []);

    useEffect(() => {
        // Explicitly load root media initially OR when activeFolder changes
        fetchMedia(activeFolder);
    }, [activeFolder]);

    const formatSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <div className="space-y-10">
            {/* Top Bar for View Toggle */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b border-gray-100">
                <div>
                    <h3 className="text-2xl font-serif font-bold text-gray-900 flex items-center gap-2">
                        <LayoutGrid className="w-6 h-6 text-primary" />
                        Media Library
                    </h3>
                    <p className="text-sm text-gray-500 font-medium mt-1">
                        {activeFolder ? `Viewing media in ${activeFolder}` : "Viewing all root media files"}
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsUploadModalOpen(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20 hover:shadow-xl transition-all"
                    >
                        <Upload className="w-4 h-4" /> Upload Here
                    </button>
                    {!activeFolder && (
                        <button
                            onClick={() => setIsNewFolderModalOpen(true)}
                            className="flex items-center gap-2 px-6 py-3 bg-white text-primary rounded-xl font-bold border border-gray-200 hover:bg-gray-50 transition-all shadow-sm"
                        >
                            <Plus className="w-4 h-4" /> New Album
                        </button>
                    )}
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-10">
                {/* Sidebar Navigation - Responsive Design */}
                <aside className="lg:w-72 shrink-0">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-6 px-2 hidden lg:block">Collections</p>

                    {/* Mobile Folder Scroll */}
                    <div className="flex lg:hidden overflow-x-auto pb-4 gap-3 no-scrollbar">
                        <button
                            onClick={() => setActiveFolder(null)}
                            className={`flex items-center gap-2 px-6 py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest whitespace-nowrap transition-all ${!activeFolder
                                ? "bg-primary text-white shadow-lg shadow-primary/20"
                                : "bg-white text-gray-400 border border-gray-100"
                                }`}
                        >
                            <LayoutGrid className="w-4 h-4" /> Library
                        </button>
                        {Array.isArray(folders) && folders.map((folder) => (
                            <button
                                key={folder.name}
                                onClick={() => setActiveFolder(folder.name)}
                                className={`flex items-center gap-2 px-6 py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest whitespace-nowrap transition-all ${activeFolder === folder.name
                                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                                    : "bg-white text-gray-400 border border-gray-100"
                                    }`}
                            >
                                <FolderIcon className={`w-4 h-4 ${activeFolder === folder.name ? "text-white" : "text-gray-300"}`} />
                                {folder.name}
                                <span className={`ml-1 text-[10px] opacity-60`}>{folder.count || 0}</span>
                            </button>
                        ))}
                    </div>

                    {/* Desktop Folder Sidebar */}
                    <nav className="hidden lg:block space-y-2">
                        <button
                            onClick={() => setActiveFolder(null)}
                            className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl text-sm font-bold transition-all duration-300 ${!activeFolder
                                ? "bg-primary text-white shadow-xl shadow-primary/20 translate-x-1"
                                : "text-gray-400 hover:text-gray-600 hover:bg-white/50"
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <LayoutGrid className={`w-5 h-5 ${!activeFolder ? "text-white" : "text-gray-300"}`} />
                                Root Library
                            </div>
                            {!activeFolder && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                        </button>

                        <div className="py-4 px-5">
                            <div className="h-px bg-gray-200/50 w-full" />
                        </div>

                        {Array.isArray(folders) && folders.map((folder) => (
                            <button
                                key={folder.name}
                                onClick={() => setActiveFolder(folder.name)}
                                className={`group w-full flex items-center justify-between px-5 py-4 rounded-2xl text-sm font-bold transition-all duration-300 ${activeFolder === folder.name
                                    ? "bg-primary text-white shadow-xl shadow-primary/20 translate-x-1"
                                    : "text-gray-400 hover:text-gray-600 hover:bg-white/50"
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <FolderIcon className={`w-5 h-5 transition-colors ${activeFolder === folder.name ? "text-white" : "text-gray-400 group-hover:text-primary"}`} />
                                    <div className="flex-grow text-left">
                                        <p className={`text-sm font-bold transition-colors ${activeFolder === folder.name ? "text-white" : "text-gray-700 font-serif"}`}>{folder.name}</p>
                                        <p className={`text-[10px] uppercase font-black tracking-widest transition-colors ${activeFolder === folder.name ? "text-white/60" : "text-gray-300"}`}>{folder.count || 0} items</p>
                                    </div>
                                </div>
                            </button>
                        ))}

                        {isActionLoading && (
                            <div className="pt-8 text-center">
                                <Loader2 className="w-6 h-6 animate-spin mx-auto text-primary/10" />
                            </div>
                        )}
                    </nav>
                </aside>

                {/* Content Area */}
                <div className="flex-grow">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-40 bg-white rounded-[2rem] border border-gray-100">
                            <Loader2 className="w-10 h-10 animate-spin text-primary/30 mb-4" />
                            <p className="text-gray-400 font-medium italic">Fetching media data...</p>
                        </div>
                    ) : (Array.isArray(media) ? media.length : 0) === 0 ? (
                        <div className="bg-white rounded-[2rem] p-12 border border-gray-100 shadow-sm text-center py-32 space-y-6">
                            <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center mx-auto text-gray-200">
                                <ImageIcon className="w-10 h-10" />
                            </div>
                            <div>
                                <h3 className="text-xl font-serif font-bold text-gray-900">Folder is empty</h3>
                                <p className="text-sm text-gray-500 max-w-xs mx-auto mt-2">No images or videos found here. Use the upload button to add your first memory.</p>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                            {Array.isArray(media) && media.map((item) => (
                                <div key={item.public_id} className="group bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gray-100 hover:shadow-2xl transition-all flex flex-col">
                                    <div className="relative aspect-square bg-slate-100 overflow-hidden">
                                        {item.resource_type === "video" ? (
                                            <video src={item.secure_url} className="w-full h-full object-cover" />
                                        ) : (
                                            <Image
                                                src={transformCloudinary(item.secure_url, 'c_fill,g_auto,w_800,h_800,q_auto,f_auto')}
                                                alt={item.public_id}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                unoptimized
                                            />
                                        )}
                                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                                            <button
                                                onClick={() => handleDeleteMedia(item.public_id, item.resource_type)}
                                                className="p-3 bg-red-600 text-white rounded-2xl hover:bg-red-700 transition-all shadow-xl shadow-red-600/20"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <div className="absolute bottom-4 left-4 flex gap-2">
                                            <span className="px-3 py-1 bg-black/50 backdrop-blur-md text-white text-[9px] font-black rounded-lg uppercase tracking-widest">
                                                {item.format}
                                            </span>
                                            <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-black text-[9px] font-black rounded-lg uppercase tracking-widest">
                                                {item.resource_type}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-6 flex-grow bg-slate-50/30">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 truncate">
                                            {item.public_id.split('/').pop()}
                                        </p>
                                        <div className="flex items-center justify-between text-[11px] font-bold text-gray-500">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-3.5 h-3.5 text-primary/50" />
                                                {new Date(item.created_at).toLocaleDateString()}
                                            </div>
                                            <span className="bg-white px-2 py-0.5 rounded-md border border-gray-100">{formatSize(item.bytes)}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* New Folder Modal */}
            {isNewFolderModalOpen && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-navy/40 backdrop-blur-sm" onClick={() => setIsNewFolderModalOpen(false)} />
                    <div className="relative bg-white w-full max-w-sm rounded-[2.5rem] shadow-2xl p-10 border border-gray-100">
                        <h3 className="text-2xl font-serif font-bold text-navy mb-6">New Album</h3>
                        <form onSubmit={handleCreateFolder} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-1">Album Title</label>
                                <input
                                    autoFocus
                                    className="w-full px-5 py-4 bg-slate-50 border border-gray-200 rounded-2xl outline-none focus:ring-4 focus:ring-navy/5 focus:border-navy transition-all font-bold text-gray-700"
                                    placeholder="e.g. Outreach-2024"
                                    value={newFolderName}
                                    onChange={(e) => setNewFolderName(e.target.value)}
                                />
                            </div>
                            <div className="flex gap-4">
                                <button type="button" onClick={() => setIsNewFolderModalOpen(false)} className="flex-grow py-4 bg-gray-50 text-gray-400 rounded-2xl font-bold hover:bg-gray-100 transition-all text-sm">Cancel</button>
                                <button disabled={isActionLoading} className="flex-grow py-4 bg-primary text-white rounded-2xl font-bold flex items-center justify-center shadow-lg shadow-primary/20 hover:shadow-xl transition-all text-sm">
                                    {isActionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Create Album"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <MediaUploadModal
                isOpen={isUploadModalOpen}
                onClose={() => setIsUploadModalOpen(false)}
                onSuccess={() => fetchMedia(activeFolder)}
                activeFolder={activeFolder}
            />
        </div>
    );
}
