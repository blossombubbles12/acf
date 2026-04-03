"use client";

import { useState } from "react";
import { X, Upload, Loader2, Folder as FolderIcon } from "lucide-react";

interface MediaUploadModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    activeFolder: string | null;
}

export function MediaUploadModal({ isOpen, onClose, onSuccess, activeFolder }: MediaUploadModalProps) {
    const [files, setFiles] = useState<FileList | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    if (!isOpen) return null;

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!files || files.length === 0) return;

        setIsLoading(true);
        setError("");

        const formData = new FormData();
        Array.from(files).forEach((file) => {
            formData.append("files", file);
        });

        // If activeFolder is null, it goes to root (acf)
        formData.append("folder", activeFolder || "");

        try {
            const res = await fetch("/api/media", {
                method: "POST",
                body: formData,
            });

            if (res.ok) {
                onSuccess();
                onClose();
                setFiles(null);
            } else {
                const data = await res.json();
                setError(data.error || "Upload failed");
            }
        } catch (err) {
            setError("An error occurred during upload.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-navy/40 backdrop-blur-sm" onClick={onClose} />

            <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-slate-50">
                    <div>
                        <h3 className="text-xl font-serif font-bold text-navy">Upload to {activeFolder ? "Album" : "Root Gallery"}</h3>
                        <div className="flex items-center gap-1.5 mt-1">
                            <FolderIcon className="w-3 h-3 text-secondary" />
                            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">{activeFolder || "acf"}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white rounded-full transition-colors text-gray-400 hover:text-gray-600">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleUpload} className="p-8 space-y-6">
                    {error && (
                        <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-bold border border-red-100">
                            {error}
                        </div>
                    )}

                    <div className="relative group">
                        <input
                            type="file"
                            multiple
                            onChange={(e) => setFiles(e.target.files)}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />
                        <div className={`p-10 border-2 border-dashed rounded-3xl flex flex-col items-center justify-center gap-4 transition-all ${files && files.length > 0 ? "border-green-200 bg-green-50/50" : "border-gray-200 bg-slate-50 group-hover:bg-slate-100"
                            }`}>
                            <div className={`p-4 rounded-2xl ${files && files.length > 0 ? "bg-green-100 text-green-600" : "bg-white text-gray-400 shadow-sm"}`}>
                                <Upload className="w-8 h-8" />
                            </div>
                            <div className="text-center">
                                <p className="font-bold text-gray-600">
                                    {files && files.length > 0 ? `${files.length} files selected` : "Select Media Files"}
                                </p>
                                <p className="text-xs text-gray-400 mt-1">Images & Videos supported. Bulk upload enabled.</p>
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={!files || isLoading}
                        className="w-full py-4 bg-[#2c517d] text-white rounded-2xl font-bold shadow-xl shadow-[#2c517d]/20 hover:shadow-2xl hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:translate-y-0 flex items-center justify-center gap-3"
                    >
                        {isLoading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <>
                                <Upload className="w-5 h-5" /> Start Bulk Upload
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
