"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CreditCard, Lock } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useOrders } from "../context/OrderContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CheckoutPage() {
    const { cart, cartTotal, clearCart } = useCart();
    const { user, isAuthenticated } = useAuth();
    const { createOrder } = useOrders();
    const router = useRouter();
    const [isProcessing, setIsProcessing] = useState(false);

    // Form State
    const [address, setAddress] = useState({
        firstName: user?.name.split(" ")[0] || "",
        lastName: user?.name.split(" ")[1] || "",
        address: "",
        city: "",
        country: "India",
        zipCode: "",
        phone: ""
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!isAuthenticated) {
                router.push("/login?redirect=/checkout");
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [isAuthenticated, router]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setAddress(prev => ({ ...prev, [name]: value }));
    };

    const handlePayment = async () => {
        if (!user) return;
        if (!address.address || !address.city || !address.zipCode || !address.phone) {
            alert("Please fill in all shipping details");
            return;
        }

        setIsProcessing(true);

        try {
            // Simulate payment processing
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Create real order
            const order = await createOrder({
                userId: user.id,
                items: cart.map(item => ({
                    productId: item.id,
                    quantity: item.quantity,
                    price: item.price,
                    size: item.size
                })),
                total: cartTotal,
                customerName: user.name,
                customerEmail: user.email,
                shippingAddress: address
            });

            clearCart();
            router.push(`/success?orderId=${order.id}`);
        } catch (error) {
            console.error("Payment Error:", error);
            alert("Payment failed. Please try again.");
        } finally {
            setIsProcessing(false);
        }
    };

    if (!user) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    return (
        <main className="min-h-screen bg-[#faf9f6]">
            <Navbar variant="light" />

            <div className="pt-24 px-4 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 pb-24">
                <div className="space-y-8">
                    <div>
                        <h2 className="font-serif text-2xl mb-6">Contact Information</h2>
                        <input type="email" value={user.email} readOnly className="w-full border border-gray-300 p-3 rounded-sm text-sm mb-2 bg-gray-50" />
                    </div>

                    <div>
                        <h2 className="font-serif text-2xl mb-6">Shipping Address</h2>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <input name="firstName" type="text" placeholder="First name" value={address.firstName} onChange={handleInputChange} className="w-full border border-gray-300 p-3 rounded-sm text-sm" />
                                <input name="lastName" type="text" placeholder="Last name" value={address.lastName} onChange={handleInputChange} className="w-full border border-gray-300 p-3 rounded-sm text-sm" />
                            </div>
                            <input name="address" type="text" placeholder="Address" value={address.address} onChange={handleInputChange} className="w-full border border-gray-300 p-3 rounded-sm text-sm" />
                            <div className="grid grid-cols-3 gap-4">
                                <input name="city" type="text" placeholder="City" value={address.city} onChange={handleInputChange} className="w-full border border-gray-300 p-3 rounded-sm text-sm" />
                                <select name="country" value={address.country} onChange={handleInputChange} className="w-full border border-gray-300 p-3 rounded-sm text-sm bg-white">
                                    <option>India</option>
                                    <option>United States</option>
                                    <option>United Kingdom</option>
                                </select>
                                <input name="zipCode" type="text" placeholder="ZIP code" value={address.zipCode} onChange={handleInputChange} className="w-full border border-gray-300 p-3 rounded-sm text-sm" />
                            </div>
                            <input name="phone" type="tel" placeholder="Phone" value={address.phone} onChange={handleInputChange} className="w-full border border-gray-300 p-3 rounded-sm text-sm" />
                        </div>
                    </div>

                    <div>
                        <h2 className="font-serif text-2xl mb-6">Payment</h2>
                        <div className="border border-gray-200 rounded-sm bg-white overflow-hidden mb-4">
                            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
                                <div className="flex items-center">
                                    <CreditCard className="w-5 h-5 mr-3 text-gray-500" />
                                    <span className="text-sm font-medium">Card Payment (Simulated)</span>
                                </div>
                            </div>
                            <div className="p-4 text-sm text-gray-500">
                                This is a test environment. No real funds will be deducted.
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handlePayment}
                        disabled={isProcessing || cart.length === 0}
                        className="w-full bg-black text-white py-4 rounded-sm text-lg font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-400"
                    >
                        {isProcessing ? "Processing..." : "Complete Purchase"}
                    </button>
                </div>

                <div className="bg-gray-50 p-8 rounded-sm h-fit border border-gray-100">
                    <h3 className="font-serif text-xl mb-6">Order Summary</h3>
                    <div className="space-y-4 mb-6 border-b border-gray-200 pb-6">
                        {cart.map((item) => (
                            <div key={`${item.id}-${item.size}`} className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="w-16 h-16 bg-gray-200 rounded-md relative mr-4 overflow-hidden">
                                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                                        <span className="absolute -top-2 -right-2 bg-black text-white w-5 h-5 rounded-full flex items-center justify-center text-xs z-10">{item.quantity}</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">{item.name}</p>
                                        <p className="text-xs text-gray-500">{item.size && `Size: ${item.size}`}</p>
                                    </div>
                                </div>
                                <p className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-3 text-sm border-b border-gray-200 pb-6">
                        <div className="flex justify-between text-gray-600">
                            <span>Subtotal</span>
                            <span>${cartTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <span>Shipping</span>
                            <span className="text-green-600 font-medium">Free</span>
                        </div>
                    </div>

                    <div className="flex justify-between items-center pt-6">
                        <span className="text-lg font-serif">Total</span>
                        <div className="flex items-baseline">
                            <span className="text-xs text-gray-500 mr-2">USD</span>
                            <span className="text-2xl font-bold">${cartTotal.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
