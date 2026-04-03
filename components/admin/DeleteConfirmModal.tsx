"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, Loader2 } from "lucide-react";
import { createPortal } from "react-dom";

interface DeleteConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => Promise<void>;
    title: string;
    description: string;
    loading?: boolean;
}

export function DeleteConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    description,
    loading: externalLoading = false,
}: DeleteConfirmModalProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!mounted || !isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div
                className="bg-white rounded-[2rem] w-full max-w-md p-8 md:p-10 shadow-2xl animate-in zoom-in-95 duration-200 relative overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Decorative Background */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-3xl -mr-10 -mt-10" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-red-500/5 rounded-full blur-2xl -ml-5 -mb-5" />

                <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                    <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-red-500 mb-2 ring-8 ring-red-50/50">
                        <AlertTriangle className="w-8 h-8" />
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-2xl font-serif font-bold text-gray-900">{title}</h3>
                        <p className="text-gray-500 font-medium leading-relaxed">{description}</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 w-full pt-4">
                        <button
                            disabled={externalLoading}
                            onClick={onClose}
                            className="flex-1 px-6 py-4 bg-gray-50 text-gray-600 rounded-xl font-bold hover:bg-gray-100 transition-colors disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            disabled={externalLoading}
                            onClick={onConfirm}
                            className="flex-1 px-6 py-4 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition-all shadow-lg shadow-red-500/20 disabled:opacity-70 flex items-center justify-center gap-2"
                        >
                            {externalLoading ? (
                                <><Loader2 className="w-4 h-4 animate-spin" /> Deleting...</>
                            ) : (
                                "Delete"
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
}
