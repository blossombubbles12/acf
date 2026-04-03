"use client";

import { useState, useCallback } from "react";
import { Toast, ToastType } from "@/components/ui/Toast";

interface ToastData {
    id: string;
    message: string;
    type: ToastType;
}

export function useToast() {
    const [toasts, setToasts] = useState<ToastData[]>([]);

    const showToast = useCallback((message: string, type: ToastType = "info") => {
        const id = Math.random().toString(36).substring(7);
        setToasts((prev) => [...prev, { id, message, type }]);
    }, []);

    const success = useCallback((message: string) => {
        showToast(message, "success");
    }, [showToast]);

    const error = useCallback((message: string) => {
        showToast(message, "error");
    }, [showToast]);

    const warning = useCallback((message: string) => {
        showToast(message, "warning");
    }, [showToast]);

    const info = useCallback((message: string) => {
        showToast(message, "info");
    }, [showToast]);

    const removeToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, []);

    const ToastContainer = useCallback(() => {
        return (
            <>
                {toasts.map((toast, index) => (
                    <div key={toast.id} style={{ top: `${24 + index * 80}px` }} className="fixed right-6 z-[200]">
                        <Toast
                            message={toast.message}
                            type={toast.type}
                            onClose={() => removeToast(toast.id)}
                        />
                    </div>
                ))}
            </>
        );
    }, [toasts, removeToast]);

    return {
        success,
        error,
        warning,
        info,
        ToastContainer,
    };
}
