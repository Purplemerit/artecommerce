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
    login: (email: string, password: string) => Promise<{ success: boolean; userId?: string; error?: string }>;
    signup: (email: string, password: string, name: string) => Promise<{ success: boolean; userId?: string; error?: string }>;
    verifyOtp: (userId: string, otp: string) => Promise<{ success: boolean; error?: string }>;
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
                } else {
                    setUser(null);
                    localStorage.removeItem("user");
                }
            } catch (error) {
                console.error("Session check failed:", error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkSession();
    }, []);

    const login = async (email: string, password: string): Promise<{ success: boolean; userId?: string; error?: string }> => {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                setUser(data.user);
                return { success: true };
            } else {
                return { success: false, userId: data.userId, error: data.error || "Invalid credentials" };
            }
        } catch (error) {
            console.error("Login Error:", error);
            return { success: false, error: "Connection error. Please try again." };
        }
    };

    const signup = async (email: string, password: string, name: string): Promise<{ success: boolean; userId?: string; error?: string }> => {
        try {
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, name }),
            });

            const data = await response.json();
            if (response.ok) {
                return { success: true, userId: data.userId };
            } else {
                return { success: false, error: data.error || "Signup failed" };
            }
        } catch (error) {
            console.error("Signup Error:", error);
            return { success: false, error: "Connection error. Please try again." };
        }
    };

    const verifyOtp = async (userId: string, otp: string): Promise<{ success: boolean; error?: string }> => {
        try {
            const response = await fetch('/api/auth/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, otp }),
            });

            const data = await response.json();
            if (response.ok) {
                setUser(data.user);
                return { success: true };
            } else {
                return { success: false, error: data.error || "Verification failed" };
            }
        } catch (error) {
            console.error("OTP Verification Error:", error);
            return { success: false, error: "Connection error. Please try again." };
        }
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
            verifyOtp: async (u, o) => await verifyOtp(u, o),
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
