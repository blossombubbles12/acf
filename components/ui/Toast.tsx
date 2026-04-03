"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CheckCircle2, XCircle, AlertCircle, Info, X } from "lucide-react";

export type ToastType = "success" | "error" | "warning" | "info";

interface ToastProps {
    message: string;
    type: ToastType;
    duration?: number;
    onClose: () => void;
}

export function Toast({ message, type, duration = 4000, onClose }: ToastProps) {
    const [mounted, setMounted] = useState(false);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        setMounted(true);
        const timer = setTimeout(() => {
            handleClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration]);

    const handleClose = () => {
        setIsExiting(true);
        setTimeout(() => {
            onClose();
        }, 200);
    };

    if (!mounted) return null;

    const config = {
        success: {
            icon: CheckCircle2,
            bgColor: "bg-emerald-500",
            borderColor: "border-emerald-500",
            textColor: "text-emerald-600",
            lightBg: "bg-emerald-50",
        },
        error: {
            icon: XCircle,
            bgColor: "bg-red-500",
            borderColor: "border-red-500",
            textColor: "text-red-600",
            lightBg: "bg-red-50",
        },
        warning: {
            icon: AlertCircle,
            bgColor: "bg-amber-500",
            borderColor: "border-amber-500",
            textColor: "text-amber-600",
            lightBg: "bg-amber-50",
        },
        info: {
            icon: Info,
            bgColor: "bg-blue-500",
            borderColor: "border-blue-500",
            textColor: "text-blue-600",
            lightBg: "bg-blue-50",
        },
    };

    const { icon: Icon, bgColor, borderColor, textColor, lightBg } = config[type];

    return createPortal(
        <div
            className={`fixed top-6 right-6 z-[200] ${isExiting ? "animate-out fade-out slide-out-to-right-full duration-200" : "animate-in fade-in slide-in-from-right-full duration-300"
                }`}
        >
            <div className={`${lightBg} border-l-4 ${borderColor} rounded-xl shadow-2xl p-4 pr-12 min-w-[320px] max-w-md backdrop-blur-sm`}>
                <div className="flex items-start gap-3">
                    <div className={`${bgColor} text-white p-2 rounded-lg shrink-0`}>
                        <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 pt-0.5">
                        <p className={`font-bold text-sm ${textColor} leading-relaxed`}>{message}</p>
                    </div>
                    <button
                        onClick={handleClose}
                        className={`absolute top-3 right-3 ${textColor} hover:opacity-70 transition-opacity`}
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
}
