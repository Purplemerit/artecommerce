"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft, Save, Shield, User, Bell } from "lucide-react";

export default function AdminSettingsPage() {
    const { isAdmin, user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isAdmin) router.push("/login");
    }, [isAdmin, router]);

    if (!isAdmin) return null;

    return (
        <main className="min-h-screen bg-[#Fdfdfd]">
            <Navbar variant="light" />

            <div className="pt-24 pb-16 px-4 max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8 border-b border-gray-100 pb-8">
                    <Link href="/admin" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <ChevronLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="font-serif text-3xl mb-1 text-gray-900">Settings</h1>
                        <p className="text-gray-500 text-sm">Manage your account and store preferences.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Sidebar Nav */}
                    <div className="space-y-1">
                        <button className="w-full text-left px-4 py-2 bg-gray-100 font-medium text-sm rounded-md text-gray-900">General</button>
                        <button className="w-full text-left px-4 py-2 text-gray-500 hover:bg-gray-50 font-medium text-sm rounded-md transition-colors">Security</button>
                        <button className="w-full text-left px-4 py-2 text-gray-500 hover:bg-gray-50 font-medium text-sm rounded-md transition-colors">Notifications</button>
                        <button className="w-full text-left px-4 py-2 text-gray-500 hover:bg-gray-50 font-medium text-sm rounded-md transition-colors">Billing</button>
                    </div>

                    {/* Content */}
                    <div className="md:col-span-3 space-y-8">
                        {/* Profile Section */}
                        <section className="bg-white border border-gray-100 rounded-sm p-6 shadow-sm">
                            <h2 className="font-serif text-xl mb-6 flex items-center gap-2">
                                <User className="w-5 h-5" /> Profile
                            </h2>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-900">Store Name</label>
                                    <input
                                        type="text"
                                        defaultValue="ArtEcommerce"
                                        className="w-full p-3 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-black"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-900">Admin Email</label>
                                    <input
                                        type="email"
                                        value={user?.email || ""}
                                        disabled
                                        className="w-full p-3 border border-gray-200 rounded-sm text-sm bg-gray-50 text-gray-500 cursor-not-allowed"
                                    />
                                    <p className="text-xs text-gray-400">Controlled by environment variables.</p>
                                </div>
                            </div>
                        </section>

                        {/* Security Section (Mock) */}
                        <section className="bg-white border border-gray-100 rounded-sm p-6 shadow-sm">
                            <h2 className="font-serif text-xl mb-6 flex items-center gap-2">
                                <Shield className="w-5 h-5" /> Security
                            </h2>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-sm border border-gray-100">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-900">Two-Factor Authentication</h3>
                                        <p className="text-xs text-gray-500 mt-1">Add an extra layer of security to your account.</p>
                                    </div>
                                    <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                                        <input type="checkbox" name="toggle" id="toggle" className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer border-gray-300" />
                                        <label htmlFor="toggle" className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 cursor-pointer"></label>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Action Buttons */}
                        <div className="flex justify-end gap-3 pt-4">
                            <button className="bg-black text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors flex items-center gap-2">
                                <Save className="w-4 h-4" /> Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
