"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function ForgotPasswordPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would trigger the password reset logic
        // For now, redirect to Check Email page
        // We can pass the email via query param or context, but for UI demo verify-email is enough
        router.push(`/check-email?email=${encodeURIComponent(email)}`);
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center p-4">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://images.unsplash.com/photo-1515405295579-ba7b4549061c?q=80&w=2680&auto=format&fit=crop"
                    alt="Background"
                    fill
                    className="object-cover"
                />
                {/* Green tint overlay to match design */}
                <div className="absolute inset-0 bg-green-900/20 mix-blend-overlay" />
            </div>

            {/* Card */}
            <div className="relative z-10 w-full max-w-[500px] bg-white rounded-2xl shadow-xl p-8 md:p-12">
                <div className="text-center mb-8">
                    <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Forget Password
                    </h1>
                    <p className="text-gray-500 text-sm px-4">
                        Enter your email address and we&apos;ll send you a link to reset your password
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-1">
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-900">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 text-sm transition-all"
                            placeholder="hello@chainex.co"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-full shadow-sm text-sm font-bold text-gray-900 bg-[#F3F1E6] hover:bg-[#e8e4d3] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F3F1E6] transition-colors"
                    >
                        Send Reset Link
                    </button>
                </form>
            </div>
        </div>
    );
}
