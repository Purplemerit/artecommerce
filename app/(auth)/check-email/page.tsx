"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";

function CheckEmailContent() {
    const searchParams = useSearchParams();
    const email = searchParams.get("email") || "your-email@example.com";

    return (
        <div className="relative min-h-screen flex items-center justify-center p-4">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/unsplash_MO5qO9xpZhA.png"
                    alt="Bird Background"
                    fill
                    className="object-cover"
                />
            </div>

            {/* Card */}
            <div className="relative z-10 w-full max-w-[500px] bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
                <h1 className="font-serif text-3xl md:text-3xl font-bold text-gray-900 mb-6">
                    Check Email
                </h1>

                <p className="text-gray-500 text-sm leading-relaxed mb-8">
                    We Sent a Password Reset link to your email address, <span className="font-medium text-gray-700">{email}</span>, please check inbox and follow instructions. The Link is valid for 24 hours.
                </p>

                <button
                    type="button"
                    onClick={() => window.open('https://mail.google.com', '_blank')}
                    className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-full shadow-sm text-sm font-bold text-gray-900 bg-[#F3F1E6] hover:bg-[#e8e4d3] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F3F1E6] transition-colors mb-6"
                >
                    Open Gmail
                </button>

                <p className="text-sm text-gray-500 mb-2">
                    Don&apos;t Receive the email ?{" "}
                    <button className="text-blue-500 font-medium hover:underline focus:outline-none">
                        Resend Link
                    </button>
                </p>

                <p className="text-sm text-gray-500">
                    Remembered your password ?{" "}
                    <Link href="/login" className="text-blue-500 font-medium hover:underline">
                        Log In
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default function CheckEmailPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CheckEmailContent />
        </Suspense>
    );
}
