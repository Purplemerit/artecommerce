
"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { Loader2, ArrowLeft, ShieldCheck } from "lucide-react";

function VerifyOtpContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { verifyOtp } = useAuth();

    const userId = searchParams.get("userId");
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [resending, setResending] = useState(false);
    const [resendStatus, setResendStatus] = useState("");
    const [timer, setTimer] = useState(60);

    useEffect(() => {
        if (!userId) {
            router.push("/signup");
        }
    }, [userId, router]);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleChange = (element: HTMLInputElement, index: number) => {
        if (isNaN(Number(element.value))) return false;

        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

        // Focus next input
        if (element.nextSibling && element.value !== "") {
            (element.nextSibling as HTMLInputElement).focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace") {
            if (otp[index] === "" && e.currentTarget.previousSibling) {
                (e.currentTarget.previousSibling as HTMLInputElement).focus();
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const otpString = otp.join("");
        if (otpString.length !== 6) {
            setError("Please enter a 6-digit code");
            return;
        }

        setError("");
        setLoading(true);

        const result = await verifyOtp(userId!, otpString);

        if (result.success) {
            router.push("/");
        } else {
            setError(result.error || "Verification failed");
            setLoading(false);
        }
    };

    const handleResend = async () => {
        if (timer > 0) return;

        setResending(true);
        setError("");
        setResendStatus("");

        try {
            const response = await fetch("/api/auth/resend-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId }),
            });

            if (response.ok) {
                setResendStatus("Code resent successfully!");
                setTimer(60);
            } else {
                const data = await response.json();
                setError(data.error || "Failed to resend code");
            }
        } catch (err) {
            setError("Connection error");
        } finally {
            setResending(false);
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center p-4">
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/unsplash_MO5qO9xpZhA.png"
                    alt="Background"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/20" />
            </div>

            <div className="relative z-10 w-full max-w-[500px] bg-white rounded-2xl shadow-2xl p-8 md:p-12">
                <Link href="/signup" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-800 mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Signup
                </Link>

                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <ShieldCheck className="w-8 h-8 text-blue-600" />
                    </div>
                    <h1 className="font-serif text-3xl font-bold text-gray-900 mb-2">
                        Verify Your Email
                    </h1>
                    <p className="text-gray-500 text-sm">
                        Enter the 6-digit code we sent to your email
                    </p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-center">
                        <p className="text-sm text-red-600 font-medium">{error}</p>
                    </div>
                )}

                {resendStatus && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-center">
                        <p className="text-sm text-green-600 font-medium">{resendStatus}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="flex justify-between gap-2 md:gap-4">
                        {otp.map((data, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength={1}
                                value={data}
                                disabled={loading}
                                onChange={(e) => handleChange(e.target, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                onFocus={(e) => e.target.select()}
                                className="w-full h-12 md:h-14 text-center text-xl font-bold border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all disabled:bg-gray-50"
                            />
                        ))}
                    </div>

                    <button
                        type="submit"
                        disabled={loading || otp.join("").length !== 6}
                        className="w-full flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent rounded-full shadow-sm text-sm font-bold text-gray-900 bg-[#F3F1E6] hover:bg-[#e8e4d3] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F3F1E6] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                        {loading ? "Verifying..." : "Verify & Continue"}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-600 mb-2">
                        Didn&apos;t receive the code?
                    </p>
                    <button
                        onClick={handleResend}
                        disabled={timer > 0 || resending}
                        className={`text-sm font-bold transition-colors ${timer > 0 || resending ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:text-blue-800 hover:underline'}`}
                    >
                        {resending ? (
                            <span className="flex items-center gap-2">
                                <Loader2 className="w-3 h-3 animate-spin" /> Resending...
                            </span>
                        ) : timer > 0 ? (
                            `Resend Code in ${timer}s`
                        ) : (
                            "Resend Code"
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function VerifyOtpPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <VerifyOtpContent />
        </Suspense>
    );
}
