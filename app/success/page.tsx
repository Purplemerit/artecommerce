"use client";

import Link from "next/link";
import { Check, ChevronLeft, Star, Clock, Package, Truck, Home, MapPin, CreditCard, ChevronRight, Lock } from "lucide-react";
import { useOrders } from "../context/OrderContext";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Suspense, useState, useEffect } from "react";
import { getProductImage, products, getProduct } from "../data/products";
import { useConfig } from "../context/ConfigContext";

function SuccessContent() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get("orderId");
    const customerName = searchParams.get("customerName") || "Customer";
    const { getOrder } = useOrders();
    const { config } = useConfig();
    const order = orderId ? getOrder(orderId) : null;

    const [view, setView] = useState<"upsell" | "confirmation">("confirmation");
    const [timeLeft, setTimeLeft] = useState("");

    // Initialize view once order/config are available
    useEffect(() => {
        if (config.showSuccessUpsell) {
            setView("upsell");
        }
    }, [config.showSuccessUpsell]);

    // Upsell Products
    const upsellProducts = products.filter(p => config.upsellProducts.includes(p.id));

    useEffect(() => {
        const totalSeconds = config.successUpsellDuration;
        const m = Math.floor(totalSeconds / 60);
        const s = totalSeconds % 60;
        setTimeLeft(`${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`);

        const timer = setInterval(() => {
            setTimeLeft(prev => {
                const [min, sec] = prev.split(":").map(Number);
                if (sec > 0) return `${min.toString().padStart(2, "0")}:${(sec - 1).toString().padStart(2, "0")}`;
                if (min > 0) return `${(min - 1).toString().padStart(2, "0")}:59`;
                return "00:00";
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [config.successUpsellDuration]);

    if (view === "upsell" && config.showSuccessUpsell) {
        return (
            <div className="min-h-screen bg-[#faf9f6] pb-24 text-[#1a1a1a]">
                {/* Paid Banner */}
                <div className="max-w-[1240px] mx-auto px-6 pt-12">
                    <div className="flex items-center space-x-2 text-[#108A44] mb-4">
                        <div className="w-6 h-6 rounded-full border-2 border-[#108A44] flex items-center justify-center">
                            <Check className="w-4 h-4" />
                        </div>
                        <span className="text-[18px] font-medium">You have paid for your order</span>
                    </div>
                    <button onClick={() => setView("confirmation")} className="flex items-center text-[13px] text-gray-500 hover:text-black mb-12">
                        View your order confirmation <ChevronRight className="w-4 h-4 ml-1" />
                    </button>

                    <h1 className="text-center font-serif text-[40px] md:text-[48px] mb-12">
                        {config.successUpsellTitle} {customerName} !
                    </h1>

                    {/* Urgency Banner */}
                    <div className="bg-[#A01B1B] text-white py-6 mb-16 text-center rounded-sm">
                        <p className="text-[18px] font-medium">
                            Add any 1 of the following products! Limited time offer : <span className="text-[#FFD700] font-bold ml-2 tracking-widest">{timeLeft}s</span>
                        </p>
                    </div>

                    {/* Upsell Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 px-4">
                        {upsellProducts.map(product => (
                            <div key={product.id} className="group flex flex-col">
                                <div className="relative aspect-square mb-6 bg-gray-100 overflow-hidden rounded-sm">
                                    <Image src={getProductImage(product.images[0])} alt={product.name} fill className="object-cover" />
                                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-2 py-1 flex items-center space-x-1 rounded-sm">
                                        <span className="text-[10px] font-bold">3.9</span>
                                        <Star className="w-2.5 h-2.5 fill-[#108A44] text-[#108A44]" />
                                        <span className="text-[10px] text-gray-400 border-l border-gray-200 pl-1">2.7k</span>
                                    </div>
                                </div>
                                <h3 className="font-serif text-[16px] text-[#2A2A2A] mb-1">{product.name}</h3>
                                <p className="text-[14px] font-bold mb-4">$ {product.price.toFixed(2)} USD</p>
                                <button className="w-full border border-gray-200 py-3 text-[13px] font-bold text-gray-600 hover:bg-black hover:text-white transition-all rounded-sm uppercase tracking-wider bg-white">
                                    Add To Cart
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="text-center px-4">
                        <span className="block text-[14px] font-bold text-gray-400 mb-6 italic">OR</span>
                        <button onClick={() => setView("confirmation")} className="w-full max-w-[800px] mx-auto border border-gray-200 py-5 text-[14px] font-bold text-gray-500 hover:bg-gray-50 transition-all rounded-sm bg-white">
                            Decline this offer
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#faf9f6] pb-24 text-[#1a1a1a]">
            <div className="max-w-[1240px] mx-auto px-6 pt-12">
                <Link href="/" className="flex items-center text-[13px] text-gray-500 hover:text-black mb-12">
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Go to homepage
                </Link>

                <h1 className="font-serif text-[40px] mb-4">Your Order Confirmed</h1>
                <p className="text-[18px] mb-2 font-medium">Hello, {customerName}</p>
                <p className="text-[14px] text-gray-500 mb-12 max-w-[800px] leading-relaxed">
                    Your order has been completed and be delivered in only two days. We'll be sending a shipping confirmation email when the items shipped successfully.
                </p>

                {/* Order Details Summary Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 border-t border-gray-100 pt-8">
                    <div>
                        <h4 className="text-[15px] font-bold mb-3">Order Details</h4>
                        <p className="text-[13px] text-gray-500">{order?.date || "October 19, 2023"}</p>
                        <p className="text-[13px] text-gray-500">Order #{orderId || "698698378"}</p>
                        <p className="text-[13px] text-gray-500 mt-4">Order Status : {order?.status || "Paid"}</p>
                        <p className="text-[13px] text-gray-500">Packages in this order : 1</p>
                        <p className="text-[13px] text-gray-500">Total items : {order?.items.length || 0}</p>
                    </div>
                    <div>
                        <h4 className="text-[15px] font-bold mb-3">Ship To</h4>
                        <p className="text-[13px] text-gray-500">{order?.shippingAddress.firstName} {order?.shippingAddress.lastName}</p>
                        <p className="text-[13px] text-gray-500">{order?.shippingAddress.address}, {order?.shippingAddress.city} ( Address )</p>
                        <h4 className="text-[15px] font-bold mt-6 mb-2">Payment information</h4>
                        <div className="flex items-center space-x-2">
                            <div className="flex -space-x-2">
                                <div className="w-5 h-5 rounded-full bg-[#EB001B]"></div>
                                <div className="w-5 h-5 rounded-full bg-[#F79E1B]/80"></div>
                            </div>
                            <p className="text-[13px] text-gray-500">Secure Payment via Razorpay</p>
                        </div>
                    </div>
                    <div className="md:col-span-2">
                        <h4 className="text-[15px] font-bold mb-3">Order Summary</h4>
                        <div className="space-y-2 max-w-[200px]">
                            <div className="flex justify-between text-[13px] text-gray-500">
                                <span>Subtotal</span>
                                <span className="text-black font-medium">${order?.total.toFixed(2) || "0.00"}</span>
                            </div>
                            <div className="flex justify-between text-[13px] text-gray-500">
                                <span>Shipping</span>
                                <span className="text-[#108A44] font-medium uppercase">FREE</span>
                            </div>
                            <div className="flex justify-between text-[15px] font-bold pt-2 border-t border-gray-100 mt-2">
                                <span className="text-gray-900">Total</span>
                                <span className="text-black">${order?.total.toFixed(2) || "0.00"}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Status Tracker and Item List Card */}
                <div className="bg-white border border-[#E5E5E5] rounded-sm p-8 mb-16 relative">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
                        <div className="mb-4 md:mb-0">
                            <p className="text-[14px] font-bold">{order?.status || "Paid"}</p>
                            <p className="text-[12px] text-gray-500">{order?.items.length || 0} Products in this order</p>
                        </div>
                        <div className="text-left md:text-right">
                            <p className="text-[13px] font-bold italic">It's on the Way!</p>
                            <p className="text-[12px] text-gray-500">Delivery Estimate : {order?.date || "Soon"}</p>
                        </div>
                    </div>

                    {/* Tracking Line */}
                    <div className="relative mb-16 px-4 pt-4">
                        <div className="absolute top-[31px] left-8 right-8 h-[1px] bg-gray-200"></div>
                        <div className="flex justify-between relative z-10">
                            {[
                                { label: "Order Confirmed", status: "Completed", icon: <Check className="w-3 h-3 text-white" />, active: true, color: "bg-[#7C6AFE]" },
                                { label: "Packed", status: order?.shipmentStatus === "Processing" ? "In Progress" : order?.shipmentStatus === "In Transit" || order?.shipmentStatus === "Out for Delivery" || order?.shipmentStatus === "Delivered" ? "Completed" : "Pending" },
                                { label: "Shipped", status: order?.shipmentStatus === "In Transit" ? "In Progress" : order?.shipmentStatus === "Out for Delivery" || order?.shipmentStatus === "Delivered" ? "Completed" : "Pending" },
                                { label: "Out for delivery", status: order?.shipmentStatus === "Out for Delivery" ? "In Progress" : order?.shipmentStatus === "Delivered" ? "Completed" : "Pending" },
                                { label: "Delivered", status: order?.shipmentStatus === "Delivered" ? "Completed" : "Pending" }
                            ].map((step, i) => {
                                const isCompleted = step.status === "Completed";
                                const isInProgress = step.status === "In Progress";
                                return (
                                    <div key={i} className="flex flex-col items-center">
                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center mb-4 ${isCompleted ? "bg-[#7C6AFE]" : isInProgress ? "border-2 border-[#7C6AFE] bg-white" : "bg-gray-200"}`}>
                                            {isCompleted && <Check className="w-3 h-3 text-white" />}
                                            {isInProgress && <div className="w-2 h-2 rounded-full bg-[#7C6AFE]"></div>}
                                        </div>
                                        <p className="text-[12px] font-bold mb-1 whitespace-nowrap">{step.label}</p>
                                        <p className={`text-[11px] ${isCompleted ? "text-blue-500 font-bold" : isInProgress ? "text-gray-400" : "text-gray-300"}`}>{step.status}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Product Rows */}
                    <div className="space-y-6">
                        {order?.items.map((item, idx) => {
                            const product = getProduct(item.productId);
                            return (
                                <div key={idx} className="flex flex-col lg:flex-row items-center justify-between border-t border-gray-50 pt-10">
                                    <div className="flex items-center space-x-6 mb-6 lg:mb-0">
                                        <div className="relative w-[100px] h-[100px] bg-gray-100 rounded-sm overflow-hidden flex-shrink-0">
                                            <Image src={getProductImage(product.images[0])} alt={product.name} fill className="object-cover" />
                                        </div>
                                        <div>
                                            <p className="text-[14px] font-medium leading-tight max-w-[200px]">{product.name}</p>
                                            <p className="text-[14px] font-bold mt-1">${item.price.toFixed(2)}</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center lg:text-left flex-1 lg:ml-12">
                                        <div>
                                            <p className="text-[13px] font-bold text-gray-400 mb-1 uppercase tracking-wider">Status</p>
                                            <p className="text-[14px] font-medium text-gray-900">{order.shipmentStatus}</p>
                                        </div>
                                        <div>
                                            <p className="text-[13px] font-bold text-gray-400 mb-1 uppercase tracking-wider">Quantity</p>
                                            <p className="text-[14px] font-medium text-gray-900">{item.quantity}</p>
                                        </div>
                                        <div>
                                            <p className="text-[13px] font-bold text-gray-400 mb-1 uppercase tracking-wider">Unit Price</p>
                                            <p className="text-[14px] font-medium text-gray-900">${item.price.toFixed(2)}</p>
                                        </div>
                                        <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-3 items-center">
                                            <button className="bg-[#1a1a1a] text-white px-6 py-2.5 rounded-sm text-[13px] font-bold hover:bg-black w-full md:w-auto whitespace-nowrap">Buy Again</button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Additional Items list (Legacy fallback or alternative view) */}
                {(!order || order.items.length === 0) && (
                    <div className="space-y-4 mb-24">
                        {[1, 2].map(i => (
                            <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between py-8 border-b border-gray-100 group">
                                <div className="flex items-center space-x-10 mb-4 sm:mb-0">
                                    <div className="relative w-[180px] h-[180px] bg-gray-50 overflow-hidden flex-shrink-0">
                                        <Image src={getProductImage(i === 1 ? "/images/heropage.jpg" : "/images/unsplash_nimElTcTNyY.png")} alt="art" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                                    </div>
                                    <div className="space-y-3">
                                        <h4 className="text-[20px] font-medium text-[#2A2A2A]">Classic Art Piece</h4>
                                        <p className="text-[16px] text-gray-400">Quantity : 1</p>
                                    </div>
                                </div>
                                <span className="text-[20px] font-bold text-gray-800">$350</span>
                            </div>
                        ))}
                    </div>
                )}

                {/* Invoice Details Section */}
                <div className="max-w-[1240px] mx-auto border-t border-gray-200 pt-12">
                    <h3 className="text-[24px] font-bold text-gray-800 mb-10">Invoice Details</h3>
                    <div className="space-y-6">
                        <div className="flex justify-between py-2">
                            <span className="text-[16px] text-gray-500 font-medium">Total MRP</span>
                            <span className="text-[16px] text-gray-700 font-bold">${order?.total.toFixed(2) || "0.00"}</span>
                        </div>
                        <div className="flex justify-between py-2">
                            <span className="text-[16px] text-gray-500 font-medium">Discount on MRP</span>
                            <span className="text-[16px] text-gray-700 font-bold">$0.00</span>
                        </div>
                        <div className="flex justify-between py-2 border-t border-gray-100 pt-8 mt-6">
                            <span className="text-[20px] font-bold text-gray-900 uppercase tracking-wide">Total payable amount</span>
                            <span className="text-[24px] font-bold text-black tracking-tight">${order?.total.toFixed(2) || "0.00"}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function SuccessPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <SuccessContent />
        </Suspense>
    );
}
