"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { Eye, EyeOff, Loader2, Check, X } from "lucide-react";

export default function SignupPage() {
    const { signup } = useAuth();
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [strength, setStrength] = useState(0);
    const [requirements, setRequirements] = useState({
        length: false,
        lowercase: false,
        special: false
    });

    useEffect(() => {
        const { password } = formData;
        const length = password.length >= 8;
        const lowercase = /[a-z]/.test(password);
        const special = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        setRequirements({ length, lowercase, special });

        let score = 0;
        if (length) score++;
        if (lowercase) score++;
        if (special) score++;
        setStrength(score);
    }, [formData.password]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        // Validation
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }

        if (!requirements.length || !requirements.lowercase || !requirements.special) {
            setError("Please meet all password requirements");
            setLoading(false);
            return;
        }

        const result = await signup(formData.email, formData.password, formData.name);

        if (result.success) {
            setSuccess(true);
            setTimeout(() => {
                router.push("/login");
            }, 2000);
        } else {
            setError(result.error || "Signup failed. Please try again.");
        }

        setLoading(false);
    };

    const getStrengthColor = () => {
        if (strength === 0) return "bg-gray-200";
        if (strength === 1) return "bg-red-500";
        if (strength === 2) return "bg-yellow-500";
        return "bg-green-500";
    };

    const getStrengthText = () => {
        if (strength === 0) return "";
        if (strength === 1) return "Weak";
        if (strength === 2) return "Medium";
        return "Strong";
    };

    if (success) {
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

                <div className="relative z-10 w-full max-w-[500px] bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Check className="w-8 h-8 text-green-600" />
                    </div>
                    <h1 className="font-serif text-3xl font-bold text-gray-900 mb-2">
                        Account Created!
                    </h1>
                    <p className="text-gray-500 text-sm mb-6">
                        Please check your email to verify your account.
                    </p>
                    <p className="text-gray-400 text-xs">
                        Redirecting to login...
                    </p>
                </div>
            </div>
        );
    }

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
                <div className="absolute inset-0 bg-black/20" />
            </div>

            {/* Signup Card */}
            <div className="relative z-10 w-full max-w-[500px] bg-white rounded-2xl shadow-2xl p-8 md:p-12">
                <div className="text-center mb-8">
                    <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                        Create Account
                    </h1>
                    <p className="text-gray-500 text-sm">
                        Join us to start shopping
                    </p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                        <p className="text-sm text-red-600">{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-1">
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-900">
                            Full Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            disabled={loading}
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 text-sm transition-all disabled:bg-gray-50 disabled:cursor-not-allowed"
                            placeholder="John Doe"
                        />
                    </div>

                    <div className="space-y-1">
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-900">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            disabled={loading}
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 text-sm transition-all disabled:bg-gray-50 disabled:cursor-not-allowed"
                            placeholder="hello@example.com"
                        />
                    </div>

                    <div className="space-y-1">
                        <label htmlFor="password" className="block text-sm font-semibold text-gray-900">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                required
                                disabled={loading}
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 text-sm transition-all pr-10 disabled:bg-gray-50 disabled:cursor-not-allowed"
                                placeholder="********"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                                disabled={loading}
                            >
                                {showPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                ) : (
                                    <Eye className="h-4 w-4" />
                                )}
                            </button>
                        </div>

                        {/* Password Strength Indicator */}
                        {formData.password && (
                            <div className="mt-2">
                                <div className="flex gap-1 mb-2">
                                    {[1, 2, 3].map((level) => (
                                        <div
                                            key={level}
                                            className={`h-1 flex-1 rounded-full transition-colors ${strength >= level ? getStrengthColor() : "bg-gray-200"
                                                }`}
                                        />
                                    ))}
                                </div>
                                {strength > 0 && (
                                    <p className="text-xs text-gray-600">
                                        Password strength: <span className="font-semibold">{getStrengthText()}</span>
                                    </p>
                                )}
                            </div>
                        )}

                        {/* Password Requirements */}
                        <div className="mt-3 space-y-1">
                            <div className="flex items-center gap-2 text-xs">
                                {requirements.length ? (
                                    <Check className="w-3 h-3 text-green-600" />
                                ) : (
                                    <X className="w-3 h-3 text-gray-400" />
                                )}
                                <span className={requirements.length ? "text-green-600" : "text-gray-500"}>
                                    At least 8 characters
                                </span>
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                                {requirements.lowercase ? (
                                    <Check className="w-3 h-3 text-green-600" />
                                ) : (
                                    <X className="w-3 h-3 text-gray-400" />
                                )}
                                <span className={requirements.lowercase ? "text-green-600" : "text-gray-500"}>
                                    Contains lowercase letter
                                </span>
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                                {requirements.special ? (
                                    <Check className="w-3 h-3 text-green-600" />
                                ) : (
                                    <X className="w-3 h-3 text-gray-400" />
                                )}
                                <span className={requirements.special ? "text-green-600" : "text-gray-500"}>
                                    Contains special character
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-900">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                required
                                disabled={loading}
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 text-sm transition-all pr-10 disabled:bg-gray-50 disabled:cursor-not-allowed"
                                placeholder="********"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                                disabled={loading}
                            >
                                {showConfirmPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                ) : (
                                    <Eye className="h-4 w-4" />
                                )}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent rounded-full shadow-sm text-sm font-bold text-gray-900 bg-[#F3F1E6] hover:bg-[#e8e4d3] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F3F1E6] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                        {loading ? "Creating Account..." : "Create Account"}
                    </button>
                </form>

                <p className="mt-8 text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link href="/login" className="font-bold text-gray-900 hover:underline">
                        Log In
                    </Link>
                </p>
            </div>
        </div>
    );
}
