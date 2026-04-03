"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Lock, Mail, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                router.push("/admin/dashboard");
            } else {
                setError(data.error || "Login failed");
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl shadow-2xl border border-gray-100">
                <div className="text-center">
                    <div className="mx-auto h-24 w-24 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-xl relative overflow-hidden border border-gray-50">
                        <Image
                            src="/acflogo.png"
                            alt="ACF Logo"
                            fill
                            className="object-contain p-2"
                        />
                    </div>
                    <h2 className="text-4xl font-serif font-bold text-[#2c517d]">Admin Portal</h2>
                    <p className="mt-3 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Actors Charity Foundation</p>
                </div>

                <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
                    {error && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm border border-red-100 font-bold flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-red-600 rounded-full" /> {error}
                        </div>
                    )}
                    <div className="space-y-4">
                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-300 group-focus-within:text-[#2c517d] transition-colors" />
                            <input
                                type="email"
                                required
                                className="block w-full pl-12 pr-4 py-4 bg-slate-50 border border-gray-200 rounded-xl outline-none focus:ring-4 focus:ring-[#2c517d]/5 focus:border-[#2c517d] transition-all font-medium"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-300 group-focus-within:text-[#2c517d] transition-colors" />
                            <input
                                type="password"
                                required
                                className="block w-full pl-12 pr-4 py-4 bg-slate-50 border border-gray-200 rounded-xl outline-none focus:ring-4 focus:ring-[#2c517d]/5 focus:border-[#2c517d] transition-all font-medium"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="group relative w-full flex justify-center py-4 px-4 bg-[#2c517d] hover:bg-[#121d3d] text-white text-sm font-bold rounded-xl shadow-xl shadow-[#2c517d]/20 transition-all active:scale-[0.98] disabled:opacity-70"
                    >
                        {isLoading ? (
                            <Loader2 className="animate-spin h-5 w-5" />
                        ) : (
                            "Secure Login"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
