"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface User {
    id: string;
    name: string;
    email: string;
    role: "ADMIN" | "USER";
    address?: string;
    phone?: string;
    gender?: string;
    birthday?: string;
    city?: string;
    country?: string;
    zipCode?: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isAdmin: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
    signup: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>;
    logout: () => void;
    updateProfile: (data: Partial<User>) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkSession = async () => {
            try {
                const response = await fetch('/api/auth/session');
                if (response.ok) {
                    const data = await response.json();
                    setUser(data.user);
                    localStorage.setItem("user", JSON.stringify(data.user));
                } else {
                    // Falls back to localStorage if API fails or session is invalid
                    const storedUser = localStorage.getItem("user");
                    if (storedUser) {
                        try {
                            setUser(JSON.parse(storedUser));
                        } catch (e) {
                            console.error("Error parsing stored user:", e);
                        }
                    }
                }
            } catch (error) {
                console.log("Session API not available, using localStorage fallback");
                const storedUser = localStorage.getItem("user");
                if (storedUser) {
                    try {
                        setUser(JSON.parse(storedUser));
                    } catch (e) {
                        console.error("Error parsing stored user:", e);
                    }
                }
            } finally {
                setLoading(false);
            }
        };

        checkSession();
    }, []);

    const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
        try {
            // Try API first
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data.user);
                localStorage.setItem("user", JSON.stringify(data.user));
                return { success: true };
            }
        } catch (error) {
            console.log("API not available, using localStorage fallback");
        }

        // Fallback to localStorage authentication
        const isAdmin = email === process.env.NEXT_PUBLIC_ADMIN_EMAIL &&
            password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

        if (isAdmin || email.includes('@')) {
            const newUser: User = {
                id: Math.random().toString(36).substr(2, 9),
                name: isAdmin ? "Admin" : email.split('@')[0],
                email,
                role: isAdmin ? "ADMIN" : "USER"
            };
            setUser(newUser);
            localStorage.setItem("user", JSON.stringify(newUser));
            return { success: true };
        }

        return { success: false, error: "Invalid credentials" };
    };

    const signup = async (email: string, password: string, name: string): Promise<{ success: boolean; error?: string }> => {
        try {
            // Try API first
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, name }),
            });

            if (response.ok) {
                return { success: true };
            }
        } catch (error) {
            console.log("API not available, using localStorage fallback");
        }

        // Fallback to localStorage
        const isAdmin = email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;
        const newUser: User = {
            id: Math.random().toString(36).substr(2, 9),
            name,
            email,
            role: isAdmin ? "ADMIN" : "USER"
        };
        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
        return { success: true };
    };

    const logout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
        } catch (error) {
            console.log("API not available");
        }

        setUser(null);
        localStorage.removeItem("user");
        router.push("/login");
    };

    const updateProfile = async (data: Partial<User>): Promise<boolean> => {
        if (!user) return false;

        const updatedUser = { ...user, ...data };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));

        try {
            // Optional: sync with DB if possible
            await fetch('/api/auth/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedUser),
            });
        } catch (error) {
            console.log("DB sync failed, saved to local");
        }

        return true;
    };

    return (
        <AuthContext.Provider value={{
            user,
            login: async (e, p) => await login(e, p),
            signup: async (e, p, n) => await signup(e, p, n),
            logout,
            updateProfile,
            isAuthenticated: !!user,
            isAdmin: user?.role === "ADMIN",
            isLoading: loading
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
