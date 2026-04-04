import { useState, useEffect } from "react";

export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function checkSession() {
            try {
                const res = await fetch("/api/auth/session");
                const data = await res.json();
                if (data.authenticated) {
                    setUser(data.user);
                    setIsAuthenticated(true);
                } else {
                    setUser(null);
                    setIsAuthenticated(false);
                }
            } catch (err) {
                console.error("Session check failed", err);
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        }
        checkSession();
    }, []);

    const isAdmin = isAuthenticated && user?.role === 'admin';

    return { user, isAuthenticated, isAdmin, loading };
}
