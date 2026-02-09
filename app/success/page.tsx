"use client";

import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CheckCircle, Truck, Package, Clock } from "lucide-react";
import { useOrders } from "../context/OrderContext";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Suspense } from "react";

function SuccessContent() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get("orderId");
    const { getOrder } = useOrders();
    const order = orderId ? getOrder(orderId) : null;

    return (
        <div className="pt-32 pb-16 px-4 max-w-3xl mx-auto text-center">
            <div className="flex justify-center mb-6">
                <CheckCircle className="w-16 h-16 text-green-500" />
            </div>
            <h1 className="font-serif text-4xl mb-4">Thank You for Your Order!</h1>
            <p className="text-gray-500 mb-8">
                Your order has been successfully placed. We've sent a confirmation email to {order?.customerEmail || "your inbox"}.
            </p>

            <div className="bg-white p-8 rounded-sm shadow-sm mb-12 border border-gray-100 text-left">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h2 className="font-serif text-2xl mb-1">Order Details</h2>
                        <p className="text-sm text-gray-400">ID: <span className="text-black font-medium">{orderId || "#ORD-12345"}</span></p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-gray-400">Date</p>
                        <p className="text-sm font-medium">{order?.date || "September 10, 2025"}</p>
                    </div>
                </div>

                {/* Tracking Stepper */}
                <div className="mb-10 pt-4">
                    <div className="flex justify-between items-center relative">
                        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2 z-0"></div>
                        <div className="relative z-10 flex flex-col items-center">
                            <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center mb-2">
                                <Clock className="w-4 h-4" />
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-wider">Placed</span>
                        </div>
                        <div className="relative z-10 flex flex-col items-center">
                            <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mb-2">
                                <Package className="w-4 h-4" />
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Processing</span>
                        </div>
                        <div className="relative z-10 flex flex-col items-center">
                            <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mb-2">
                                <Truck className="w-4 h-4" />
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Shipped</span>
                        </div>
                        <div className="relative z-10 flex flex-col items-center">
                            <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mb-2">
                                <CheckCircle className="w-4 h-4" />
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Delivered</span>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-50 pt-6 mb-6">
                    <h3 className="text-sm font-bold uppercase mb-4">Shipping to:</h3>
                    <p className="text-sm text-gray-600">{order?.shippingAddress.firstName} {order?.shippingAddress.lastName}</p>
                    <p className="text-sm text-gray-600">{order?.shippingAddress.address}</p>
                    <p className="text-sm text-gray-600">{order?.shippingAddress.city}, {order?.shippingAddress.zipCode}</p>
                    <p className="text-sm text-gray-600">{order?.shippingAddress.country}</p>
                </div>

                <div className="border-t border-gray-50 pt-6">
                    <Link href="/account">
                        <button className="bg-black text-white w-full py-3 text-sm font-medium hover:bg-gray-800 transition-colors">
                            Track My Shipment
                        </button>
                    </Link>
                </div>
            </div>

            <div className="mt-12">
                <Link href="/">
                    <button className="text-gray-500 hover:text-black text-sm font-medium transition-colors">
                        ← Back to Shopping
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default function SuccessPage() {
    return (
        <main className="min-h-screen bg-[#faf9f6]">
            <Navbar variant="light" />
            <Suspense fallback={
                <div className="min-h-screen flex items-center justify-center">
                    <p className="font-serif text-xl animate-pulse">Confirming your order...</p>
                </div>
            }>
                <SuccessContent />
            </Suspense>
            <Footer />
        </main>
    );
}
