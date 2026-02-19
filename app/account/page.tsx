"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CheckCircle, LogOut, Package, Truck, Box, Calendar, User as UserIcon, MapPin, Phone } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useOrders } from "../context/OrderContext";
import { useRouter } from "next/navigation";
import { getProductImage } from "../data/products";

export default function AccountPage() {
    const [activeTab, setActiveTab] = useState("profile");
    const { user, logout, updateProfile, isLoading } = useAuth();
    const { orders: allOrders, loading: ordersLoading } = useOrders();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !user) {
            router.push("/login");
        }
    }, [user, isLoading, router]);

    const orders = user ? allOrders.filter(o => o.userId === user.id) : [];

    const [profileForm, setProfileForm] = useState({
        name: user?.name || "",
        email: user?.email || "",
        gender: user?.gender || "Select Gender",
        birthday: user?.birthday || "",
        phone: user?.phone || "",
        address: user?.address || "",
        city: user?.city || "",
        country: user?.country || "India",
        zipCode: user?.zipCode || ""
    });

    const [isSaving, setIsSaving] = useState(false);

    const handleSaveProfile = async () => {
        setIsSaving(true);
        const success = await updateProfile(profileForm);
        if (success) {
            alert("Profile updated successfully!");
        }
        setIsSaving(false);
    };

    if (isLoading || !user) return <div className="min-h-screen flex items-center justify-center font-serif text-xl">Loading...</div>;

    return (
        <main className="min-h-screen bg-[#faf9f6]">
            <Navbar variant="light" />

            <div className="pt-24 px-4 max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="font-serif text-3xl mb-2">Welcome, {user.name}</h1>
                    <p className="text-sm text-gray-400">Manage your profile, orders and track shipments.</p>
                </div>

                <div className="flex space-x-6 mb-12 border-b border-gray-100 overflow-x-auto whitespace-nowrap scrollbar-hide">
                    <button onClick={() => setActiveTab("profile")} className={`pb-4 text-sm font-medium transition-colors relative ${activeTab === "profile" ? "text-black" : "text-gray-400 hover:text-black"}`}>
                        Profile & Address
                        {activeTab === "profile" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black"></div>}
                    </button>
                    <button onClick={() => setActiveTab("orders")} className={`pb-4 text-sm font-medium transition-colors relative ${activeTab === "orders" ? "text-black" : "text-gray-400 hover:text-black"}`}>
                        Your Orders
                        {activeTab === "orders" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black"></div>}
                    </button>
                    <button onClick={logout} className="pb-4 text-sm font-medium text-red-400 hover:text-red-500 transition-colors">Logout</button>
                </div>

                {activeTab === "profile" && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-24">
                        <div className="lg:col-span-2 space-y-8">
                            {/* Profile Info */}
                            <div className="bg-white p-8 rounded-sm shadow-sm border border-gray-100">
                                <h2 className="font-serif text-xl mb-6 flex items-center gap-2"><UserIcon className="w-4 h-4" /> Personal Information</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Full Name</label>
                                        <input type="text" value={profileForm.name} onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })} className="w-full border-b border-gray-200 py-2 text-sm focus:outline-none focus:border-black" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Email (Read Only)</label>
                                        <input type="text" value={profileForm.email} readOnly className="w-full border-b border-gray-100 py-2 text-sm text-gray-400 cursor-not-allowed" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Phone</label>
                                        <input type="text" value={profileForm.phone} onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })} className="w-full border-b border-gray-200 py-2 text-sm focus:outline-none focus:border-black" placeholder="+91 ..." />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Gender</label>
                                        <select value={profileForm.gender} onChange={(e) => setProfileForm({ ...profileForm, gender: e.target.value })} className="w-full border-b border-gray-200 py-2 text-sm focus:outline-none focus:border-black bg-white">
                                            <option>Select Gender</option>
                                            <option>Male</option>
                                            <option>Female</option>
                                            <option>Other</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Address Info */}
                            <div className="bg-white p-8 rounded-sm shadow-sm border border-gray-100">
                                <h2 className="font-serif text-xl mb-6 flex items-center gap-2"><MapPin className="w-4 h-4" /> Shipping Address</h2>
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Street Address</label>
                                        <input type="text" value={profileForm.address} onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })} className="w-full border-b border-gray-200 py-2 text-sm focus:outline-none focus:border-black" placeholder="Building, Street, Area" />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">City</label>
                                            <input type="text" value={profileForm.city} onChange={(e) => setProfileForm({ ...profileForm, city: e.target.value })} className="w-full border-b border-gray-200 py-2 text-sm focus:outline-none focus:border-black" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Zip Code</label>
                                            <input type="text" value={profileForm.zipCode} onChange={(e) => setProfileForm({ ...profileForm, zipCode: e.target.value })} className="w-full border-b border-gray-200 py-2 text-sm focus:outline-none focus:border-black" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Country</label>
                                            <select value={profileForm.country} onChange={(e) => setProfileForm({ ...profileForm, country: e.target.value })} className="w-full border-b border-gray-200 py-2 text-sm focus:outline-none focus:border-black bg-white">
                                                <option>India</option>
                                                <option>United States</option>
                                                <option>United Kingdom</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handleSaveProfile}
                                disabled={isSaving}
                                className="bg-black text-white px-12 py-4 rounded-sm text-sm font-medium hover:bg-gray-800 transition-all shadow-lg active:scale-95 disabled:bg-gray-400"
                            >
                                {isSaving ? "Saving..." : "Save Profile Details"}
                            </button>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            <div className="bg-white p-8 rounded-sm shadow-sm border border-gray-100 text-center">
                                <div className="w-24 h-24 bg-gray-50 rounded-full mx-auto mb-4 flex items-center justify-center border border-gray-100">
                                    <span className="text-3xl font-serif">{user.name.charAt(0)}</span>
                                </div>
                                <h3 className="font-serif text-lg mb-1">{user.name}</h3>
                                <p className="text-xs text-gray-400 mb-6 font-medium">{user.role}</p>
                                <div className="flex items-center justify-center gap-2 text-xs text-green-500 font-bold uppercase tracking-wider">
                                    <CheckCircle className="w-3 h-3" /> Verified Member
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "orders" && (
                    <div className="mb-24 space-y-6">
                        {ordersLoading ? (
                            <div className="bg-white p-12 text-center rounded-sm border border-gray-50">
                                <h3 className="font-serif text-xl mb-2 text-gray-400 italic">Syncing with our gallery...</h3>
                            </div>
                        ) : orders.length === 0 ? (
                            <div className="bg-white p-12 text-center rounded-sm border border-gray-50">
                                <Package className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                                <h3 className="font-serif text-xl mb-2">No orders yet</h3>
                                <p className="text-sm text-gray-400 mb-6">When you buy art pieces, they will appear here.</p>
                                <Link href="/shop" className="text-black font-bold text-sm border-b border-black pb-1">Browse Shop</Link>
                            </div>
                        ) : (
                            orders.map((order) => (
                                <div key={order.id} className="bg-white rounded-sm shadow-sm border border-gray-100 overflow-hidden">
                                    <div className="p-6 bg-gray-50/50 flex flex-wrap justify-between items-center gap-4 border-b border-gray-100">
                                        <div className="flex gap-8">
                                            <div>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Order ID</p>
                                                <p className="text-sm font-bold">{order.id}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Placed on</p>
                                                <p className="text-sm">{order.date}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total</p>
                                                <p className="text-sm font-bold">${order.total.toFixed(2)}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${['paid', 'delivered'].includes(order.status?.toLowerCase()) ? "bg-green-100 text-green-600" :
                                                    order.status?.toLowerCase() === 'shipped' ? "bg-blue-100 text-blue-600" :
                                                        order.status?.toLowerCase() === 'cancelled' ? "bg-red-100 text-red-600" :
                                                            "bg-yellow-100 text-yellow-600"
                                                }`}>
                                                {order.status}
                                            </span>
                                            <button
                                                onClick={() => router.push(`/success?orderId=${order.id}&customerName=${user.name}`)}
                                                className="text-xs font-bold text-black border border-gray-200 px-4 py-1.5 hover:bg-white transition-colors"
                                            >
                                                Details
                                            </button>
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <div className="mb-8">
                                            <div className="flex justify-between items-center max-w-2xl relative">
                                                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2 z-0"></div>
                                                <div className="relative z-10 flex flex-col items-center">
                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${order.shipmentStatus === "Processing" || order.shipmentStatus === "In Transit" || order.shipmentStatus === "Out for Delivery" || order.shipmentStatus === "Delivered" ? "bg-black text-white" : "bg-gray-100 text-gray-400"}`}>
                                                        <Calendar className="w-4 h-4" />
                                                    </div>
                                                    <span className="text-[10px] font-bold uppercase tracking-wider">Processing</span>
                                                </div>
                                                <div className="relative z-10 flex flex-col items-center">
                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${order.shipmentStatus === "In Transit" || order.shipmentStatus === "Out for Delivery" || order.shipmentStatus === "Delivered" ? "bg-black text-white" : "bg-gray-100 text-gray-400"}`}>
                                                        <Truck className="w-4 h-4" />
                                                    </div>
                                                    <span className="text-[10px] font-bold uppercase tracking-wider">In Transit</span>
                                                </div>
                                                <div className="relative z-10 flex flex-col items-center">
                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${order.shipmentStatus === "Out for Delivery" || order.shipmentStatus === "Delivered" ? "bg-black text-white" : "bg-gray-100 text-gray-400"}`}>
                                                        <Box className="w-4 h-4" />
                                                    </div>
                                                    <span className="text-[10px] font-bold uppercase tracking-wider">Out for Delivery</span>
                                                </div>
                                                <div className="relative z-10 flex flex-col items-center">
                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${order.shipmentStatus === "Delivered" ? "bg-green-500 text-white" : "bg-gray-100 text-gray-400"}`}>
                                                        <CheckCircle className="w-4 h-4" />
                                                    </div>
                                                    <span className="text-[10px] font-bold uppercase tracking-wider">Delivered</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="divide-y divide-gray-50">
                                            {order.items.map((item: any, idx: number) => (
                                                <div key={idx} className="flex items-center py-4 gap-6">
                                                    <div className="relative w-16 h-20 bg-gray-100 rounded-sm overflow-hidden">
                                                        <Image
                                                            src={getProductImage(item.product?.images[0] || "")}
                                                            alt={item.product?.name || "Product"}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h4 className="text-sm font-medium">{item.product?.name || "Premium Artwork"}</h4>
                                                        <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                                                    </div>
                                                    <p className="text-sm font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>

            <Footer />
        </main>
    );
}
