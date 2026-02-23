"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, Suspense } from "react";
import { ArrowLeft, Loader2, Lock, Eye, EyeOff } from "lucide-react";

function ResetPasswordContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const email = searchParams.get("email");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    if (!token || !email) {
        return (
            <div className="text-center p-8 bg-white rounded-3xl shadow-xl">
                <h1 className="text-2xl font-bold text-red-600 mb-4">Invalid Reset Link</h1>
                <p className="text-gray-500 mb-6">This password reset link is invalid or has expired.</p>
                <Link href="/forgot-password" title="Go to Forgot Password" className="text-black font-bold underline">Request a new link</Link>
            </div>
        );
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);
        setError("");
        setMessage("");

        try {
            const res = await fetch("/api/auth/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, token, password }),
            });
            const data = await res.json();

            if (res.ok) {
                setMessage("Password reset successfully! Redirecting to login...");
                setTimeout(() => router.push("/login"), 3000);
            } else {
                setError(data.error || "Failed to reset password. The link may be expired.");
            }
        } catch (err) {
            setError("Failed to connect. Please check your connection.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative z-10 w-full max-w-[450px] bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
            <div className="text-center mb-10">
                <div className="w-16 h-16 bg-[#F3F1E6] rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Lock className="w-8 h-8 text-gray-700" />
                </div>
                <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Reset Password
                </h1>
                <p className="text-gray-500 text-sm px-4 font-light">
                    Choose a strong new password for your account
                </p>
            </div>

            {message ? (
                <div className="bg-green-50 border border-green-100 text-green-700 p-4 rounded-xl text-sm text-center animate-in fade-in slide-in-from-top-2">
                    {message}
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                    {error && (
                        <div className="bg-red-50 border border-red-100 text-red-600 p-3 rounded-lg text-xs text-center">
                            {error}
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">New Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-black/5 focus:bg-white text-sm transition-all"
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Confirm New Password</label>
                        <input
                            type="password"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-black/5 focus:bg-white text-sm transition-all"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-2xl shadow-sm text-sm font-bold text-white bg-black hover:bg-gray-800 focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                Resetting...
                            </>
                        ) : (
                            "Update Password"
                        )}
                    </button>
                </form>
            )}
        </div>
    );
}

export default function ResetPasswordPage() {
    return (
        <div className="relative min-h-screen flex items-center justify-center p-4">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/unsplash_MO5qO9xpZhA.png"
                    alt="Background"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/40" />
            </div>

            <Suspense fallback={<div className="bg-white p-8 rounded-3xl shadow-xl font-serif text-xl">Loading...</div>}>
                <ResetPasswordContent />
            </Suspense>
        </div>
    );
}
