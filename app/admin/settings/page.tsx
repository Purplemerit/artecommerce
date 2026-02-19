"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft, Save, Shield, User, Bell, Clock, ShoppingCart } from "lucide-react";
import { useConfig } from "../../context/ConfigContext";

export default function AdminSettingsPage() {
    const { isAdmin, user } = useAuth();
    const { config, updateConfig } = useConfig();
    const router = useRouter();

    const [localConfig, setLocalConfig] = useState(config);

    useEffect(() => {
        if (!isAdmin) router.push("/login");
    }, [isAdmin, router]);

    const handleSave = () => {
        updateConfig(localConfig);
        alert("Settings saved successfully!");
    };

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
                        <button className="w-full text-left px-4 py-2 text-gray-500 hover:bg-gray-50 font-medium text-sm rounded-md transition-colors">Store Features</button>
                    </div>

                    {/* Content */}
                    <div className="md:col-span-3 space-y-8">
                        {/* Store Features Section */}
                        <section className="bg-white border border-gray-100 rounded-sm p-6 shadow-sm">
                            <h2 className="font-serif text-xl mb-6 flex items-center gap-2">
                                <ShoppingCart className="w-5 h-5" /> Urgency & Conversion
                            </h2>
                            <div className="space-y-6">
                                {/* Checkout Urgency */}
                                <div className="space-y-4 border-b border-gray-100 pb-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-900">Checkout Urgency Banner</h3>
                                            <p className="text-xs text-gray-500 mt-1">Show "Hurry up!" banner on payment step.</p>
                                        </div>
                                        <div className="relative inline-block w-10 align-middle">
                                            <input
                                                type="checkbox"
                                                checked={localConfig.showCheckoutUrgency}
                                                onChange={(e) => setLocalConfig({ ...localConfig, showCheckoutUrgency: e.target.checked })}
                                                className="toggle-checkbox w-5 h-5 rounded-full bg-white border-4 cursor-pointer"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 mt-4">
                                        <div className="space-y-2">
                                            <label className="block text-xs font-bold text-gray-400 uppercase">Duration (Seconds)</label>
                                            <input
                                                type="number"
                                                value={localConfig.checkoutUrgencyDuration}
                                                onChange={(e) => setLocalConfig({ ...localConfig, checkoutUrgencyDuration: parseInt(e.target.value) })}
                                                className="w-full p-2 border border-gray-200 rounded-sm text-sm"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-xs font-bold text-gray-400 uppercase">Banner Message</label>
                                            <input
                                                type="text"
                                                value={localConfig.checkoutUrgencyMessage}
                                                onChange={(e) => setLocalConfig({ ...localConfig, checkoutUrgencyMessage: e.target.value })}
                                                className="w-full p-2 border border-gray-200 rounded-sm text-sm"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Success Upsell */}
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-900">Post-Purchase Upsell</h3>
                                            <p className="text-xs text-gray-500 mt-1">Show "Wait! One more thing" offer on success page.</p>
                                        </div>
                                        <div className="relative inline-block w-10 align-middle">
                                            <input
                                                type="checkbox"
                                                checked={localConfig.showSuccessUpsell}
                                                onChange={(e) => setLocalConfig({ ...localConfig, showSuccessUpsell: e.target.checked })}
                                                className="toggle-checkbox w-5 h-5 rounded-full bg-white border-4 cursor-pointer"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-xs font-bold text-gray-400 uppercase">Upsell Title</label>
                                        <input
                                            type="text"
                                            value={localConfig.successUpsellTitle}
                                            onChange={(e) => setLocalConfig({ ...localConfig, successUpsellTitle: e.target.value })}
                                            className="w-full p-2 border border-gray-200 rounded-sm text-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Profile Section */}
                        <section className="bg-white border border-gray-100 rounded-sm p-6 shadow-sm">
                            <h2 className="font-serif text-xl mb-6 flex items-center gap-2">
                                <User className="w-5 h-5" /> Profile
                            </h2>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="block text-[11px] font-bold text-gray-400 uppercase">Store Name</label>
                                    <input
                                        type="text"
                                        defaultValue="ArtEcommerce"
                                        className="w-full p-3 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-black"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-[11px] font-bold text-gray-400 uppercase">Admin Email</label>
                                    <input
                                        type="email"
                                        value={user?.email || ""}
                                        disabled
                                        className="w-full p-3 border border-gray-200 rounded-sm text-sm bg-gray-50 text-gray-500 cursor-not-allowed"
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Action Buttons */}
                        <div className="flex justify-end gap-3 pt-4">
                            <button
                                onClick={handleSave}
                                className="bg-[#1a1a1a] text-white px-8 py-3 rounded-sm text-sm font-bold hover:bg-black transition-colors flex items-center gap-2"
                            >
                                <Save className="w-4 h-4" /> Save Configuration
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}

function ChevronRight({ className }: { className?: string }) {
    return <svg className={className} fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><polyline points="9 18 15 12 9 6" /></svg>;
}
