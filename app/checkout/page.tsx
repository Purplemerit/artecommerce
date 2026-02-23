"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CreditCard, Lock, ChevronLeft, Check, Clock, Info, ShieldCheck, Truck, ThumbsUp } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useOrders } from "../context/OrderContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getProductImage, products } from "../data/products";
import { useConfig } from "../context/ConfigContext";

export default function CheckoutPage() {
    const { cart, cartTotal, clearCart, addToCart } = useCart();
    const { user, isAuthenticated } = useAuth();
    const { createOrder } = useOrders();
    const { config } = useConfig();
    const router = useRouter();
    const [isProcessing, setIsProcessing] = useState(false);
    const [step, setStep] = useState<"address" | "payment">("address");
    const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

    // Timer state
    const [timeLeft, setTimeLeft] = useState("");

    // Recommended items for "You may also like"
    const recommendations = products.slice(0, 2);

    // Form State
    const [address, setAddress] = useState({
        email: user?.email || "",
        firstName: user?.name.split(" ")[0] || "",
        lastName: user?.name.split(" ")[1] || "",
        address: "",
        apartment: "",
        city: "",
        country: "India",
        zipCode: "",
        phone: ""
    });

    const [errors, setErrors] = useState<string[]>([]);

    const validateAddress = () => {
        const requiredFields = ['email', 'firstName', 'lastName', 'address', 'city', 'zipCode', 'phone'];
        const newErrors: string[] = [];

        requiredFields.forEach(field => {
            if (!address[field as keyof typeof address]) {
                newErrors.push(field);
            }
        });

        if (newErrors.length > 0) {
            setErrors(newErrors);
            return false;
        }
        setErrors([]);
        return true;
    };

    useEffect(() => {
        const totalSeconds = config.checkoutUrgencyDuration;
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
    }, [config.checkoutUrgencyDuration]);

    useEffect(() => {
        // Immediate check to prevent flash of content
        if (!isAuthenticated) {
            router.push(`/login?redirect=${encodeURIComponent('/checkout')}`);
        }
    }, [isAuthenticated, router]);

    // Prevent rendering if not authenticated to maintain premium feel and security
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#faf9f6]">
                <div className="text-center space-y-4">
                    <Clock className="w-12 h-12 animate-spin text-gray-300 mx-auto" />
                    <p className="font-serif text-2xl text-gray-900">Redirecting to login...</p>
                    <p className="text-gray-500 text-sm">Please sign in to proceed with your acquisition.</p>
                </div>
            </div>
        );
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setAddress(prev => ({ ...prev, [name]: value }));
    };

    const handlePayment = async () => {
        if (!user) return;
        if (!selectedPayment) {
            alert("Please select a payment method.");
            return;
        }

        setIsProcessing(true);

        // COD Flow
        if (selectedPayment === 'cod') {
            try {
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
                router.push(`/success?orderId=${order.id}&customerName=${user.name}`);
            } catch (error: any) {
                console.error("Order Error:", error);
                alert(error.message || "Failed to create order. Please try again.");
            } finally {
                setIsProcessing(false);
            }
            return;
        }

        // Razorpay Flow
        try {
            // 1. Create Order on Server
            const res = await fetch("/api/razorpay", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: cartTotal }),
            });
            const data = await res.json();

            if (data.error) throw new Error(data.error);

            // 2. Open Razorpay Modal
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: data.amount,
                currency: data.currency,
                name: "Masterpiece Gallery",
                description: "Purchase Fine Art",
                order_id: data.id,
                handler: async function (response: any) {
                    // 3. Verify Payment
                    const verifyRes = await fetch("/api/razorpay/verify", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                        }),
                    });

                    const verifyData = await verifyRes.json();

                    if (verifyData.success) {
                        // 4. Create Order in Database
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
                            shippingAddress: address,
                            razorpayOrderId: response.razorpay_order_id,
                            razorpayPaymentId: response.razorpay_payment_id
                        });

                        clearCart();
                        router.push(`/success?orderId=${order.id}&customerName=${user.name}`);
                    } else {
                        alert("Payment verification failed. Please contact support.");
                    }
                },
                prefill: {
                    name: user.name,
                    email: user.email,
                    contact: address.phone,
                },
                theme: {
                    color: "#1a1a1a",
                },
            };

            const paymentObject = new (window as any).Razorpay(options);
            paymentObject.open();

        } catch (error: any) {
            console.error("Payment Error:", error);
            alert(error.message || "Payment initialization failed.");
        } finally {
            setIsProcessing(false);
        }
    };

    const handleQuickAdd = (product: any) => {
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.images[0],
            quantity: 1
        });
    };

    if (!user) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    return (
        <main className="min-h-screen bg-[#faf9f6] text-[#1a1a1a]">
            {/* Top Red Banner - Only on Payment Step */}
            {step === "payment" && config.showCheckoutUrgency && (
                <div className="bg-[#A01B1B] text-white py-3 text-center font-serif text-[18px]">
                    {config.checkoutUrgencyMessage} <span className="text-[#FFD700] ml-2 font-bold tracking-widest">{timeLeft}S</span>
                </div>
            )}

            {/* Top Navigation */}
            <div className="max-w-[1240px] mx-auto px-6 pt-12">
                {step === "address" ? (
                    <Link href="/cart" className="flex items-center text-[13px] text-[#2A2A2A] hover:underline">
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        Go to shopping cart
                    </Link>
                ) : (
                    <button onClick={() => setStep("address")} className="flex items-center text-[13px] text-[#2A2A2A] hover:underline">
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        Go to address form
                    </button>
                )}
            </div>

            {/* Stepper */}
            <div className="max-w-[600px] mx-auto pt-8 flex items-center justify-between relative mb-16 px-4">
                <div className="flex flex-col items-center z-10">
                    <div className="w-6 h-6 rounded-full bg-[#1a1a1a] flex items-center justify-center mb-2">
                        <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-[10px] sm:text-[12px] font-medium text-[#1a1a1a]">Cart</span>
                </div>
                <div className="h-[1px] bg-gray-200 flex-1 mx-2 sm:mx-4 -mt-6"></div>
                <div className="flex flex-col items-center z-10">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center mb-2 ${step === "payment" ? "bg-[#1a1a1a]" : "border-2 border-[#1a1a1a] bg-[#faf9f6]"}`}>
                        {step === "payment" ? <Check className="w-3 h-3 text-white" /> : <div className="w-2 h-2 rounded-full bg-[#1a1a1a]"></div>}
                    </div>
                    <span className="text-[10px] sm:text-[12px] font-medium text-[#1a1a1a]">Address</span>
                </div>
                <div className="h-[1px] bg-gray-200 flex-1 mx-2 sm:mx-4 -mt-6"></div>
                <div className="flex flex-col items-center z-10">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center mb-2 ${step === "payment" ? "border-2 border-[#1a1a1a] bg-[#faf9f6]" : "bg-gray-300"}`}>
                        {step === "payment" && <div className="w-2 h-2 rounded-full bg-[#1a1a1a]"></div>}
                    </div>
                    <span className={`text-[10px] sm:text-[12px] font-medium ${step === "payment" ? "text-[#1a1a1a]" : "text-gray-400"}`}>Payment</span>
                </div>
            </div>

            <div className="max-w-[1240px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 pb-24">
                {/* Left Column: Form / Payment Options */}
                <div className="lg:col-span-7 space-y-8">
                    {step === "address" ? (
                        <>
                            {/* Offer Banner */}
                            <div className="bg-[#FFF5F5] border border-[#FFDADA] p-4 rounded-sm flex items-start space-x-3">
                                <Info className="w-5 h-5 text-[#FF4D4D] mt-0.5" />
                                <div>
                                    <p className="text-[14px] font-bold text-[#FF4D4D]">
                                        Limited time offer ! This offer expires in 07 : 48
                                    </p>
                                    <p className="text-[12px] text-[#2A2A2A] mt-0.5 font-medium">
                                        We are receiving this order. Checkout now to get this price !
                                    </p>
                                </div>
                            </div>

                            {/* Contact Info */}
                            <div className="space-y-4">
                                <h2 className="text-[15px] font-bold">Contact Information <span className="text-red-500">*</span></h2>
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="Email"
                                    required
                                    value={address.email}
                                    onChange={handleInputChange}
                                    className={`w-full h-[52px] bg-[#F7F7F7] border px-4 rounded-sm text-[14px] ${errors.includes('email') ? 'border-red-500' : 'border-[#E5E5E5]'}`}
                                />
                                <div className="flex items-center space-x-2">
                                    <input type="checkbox" id="newsletter" className="w-4 h-4 accent-black" />
                                    <label htmlFor="newsletter" className="text-[13px] text-[#2A2A2A]">Email me with news and offers</label>
                                </div>
                            </div>

                            {/* Shipping Address */}
                            <div className="space-y-4">
                                <h2 className="text-[15px] font-bold">Shipping address <span className="text-red-500">*</span></h2>
                                <select
                                    name="country"
                                    className="w-full h-[52px] bg-[#F7F7F7] border border-[#E5E5E5] px-4 rounded-sm text-[14px] appearance-none"
                                    value={address.country}
                                    onChange={handleInputChange}
                                >
                                    <option>India</option>
                                    <option>United States</option>
                                    <option>United Kingdom</option>
                                </select>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <input name="firstName" required placeholder="First name" value={address.firstName} onChange={handleInputChange} className={`flex-1 h-[52px] bg-[#F7F7F7] border px-4 rounded-sm text-[14px] ${errors.includes('firstName') ? 'border-red-500' : 'border-[#E5E5E5]'}`} />
                                    <input name="lastName" required placeholder="Last name" value={address.lastName} onChange={handleInputChange} className={`flex-1 h-[52px] bg-[#F7F7F7] border px-4 rounded-sm text-[14px] ${errors.includes('lastName') ? 'border-red-500' : 'border-[#E5E5E5]'}`} />
                                </div>
                                <input name="phone" required type="tel" placeholder="Mobile Number for delivery updates" value={address.phone} onChange={handleInputChange} className={`w-full h-[52px] bg-[#F7F7F7] border px-4 rounded-sm text-[14px] ${errors.includes('phone') ? 'border-red-500' : 'border-[#E5E5E5]'}`} />
                                <input name="address" required placeholder="Address (House No, Building, Street, Area)" value={address.address} onChange={handleInputChange} className={`w-full h-[52px] bg-[#F7F7F7] border px-4 rounded-sm text-[14px] ${errors.includes('address') ? 'border-red-500' : 'border-[#E5E5E5]'}`} />
                                <input name="apartment" placeholder="Apartment, suite, etc. (optional)" value={address.apartment} onChange={handleInputChange} className="w-full h-[52px] bg-[#F7F7F7] border border-[#E5E5E5] px-4 rounded-sm text-[14px]" />
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <input name="city" required placeholder="City" value={address.city} onChange={handleInputChange} className={`flex-1 h-[52px] bg-[#F7F7F7] border px-4 rounded-sm text-[14px] ${errors.includes('city') ? 'border-red-500' : 'border-[#E5E5E5]'}`} />
                                    <input name="zipCode" required placeholder="Pincode" value={address.zipCode} onChange={handleInputChange} className={`flex-1 h-[52px] bg-[#F7F7F7] border px-4 rounded-sm text-[14px] ${errors.includes('zipCode') ? 'border-red-500' : 'border-[#E5E5E5]'}`} />
                                </div>

                                {errors.length > 0 && (
                                    <p className="text-red-500 text-[12px] font-medium mt-2">Please fill in all the required fields marked with *</p>
                                )}
                            </div>

                            {/* Form Footer */}
                            <div className="flex items-center justify-between pt-8">
                                <Link href="/cart" className="flex items-center text-[13px] text-[#1a1a1a] hover:underline">
                                    <ChevronLeft className="w-4 h-4 mr-1" />
                                    return to cart
                                </Link>
                                <button
                                    onClick={() => {
                                        if (validateAddress()) {
                                            setStep("payment");
                                            window.scrollTo(0, 0);
                                        }
                                    }}
                                    className="bg-[#1a1a1a] text-white px-10 py-4 font-bold text-[14px] rounded-sm hover:bg-black transition-colors"
                                >
                                    Continue
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="space-y-4">
                            {/* Payment Options */}
                            <div
                                onClick={() => setSelectedPayment('gift')}
                                className={`bg-white border rounded-lg p-5 flex items-center justify-between cursor-pointer transition-all ${selectedPayment === 'gift' ? 'border-black ring-1 ring-black' : 'border-[#E5E5E5] hover:border-gray-400'}`}
                            >
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center">
                                        <Image src="/images/Frame 2121453497.svg" alt="Gift" width={24} height={24} />
                                    </div>
                                    <span className="text-[15px] font-medium">Gift Card/E - Gift Card</span>
                                </div>
                                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${selectedPayment === 'gift' ? 'bg-black border-black' : 'border-gray-300'}`}>
                                    {selectedPayment === 'gift' && <Check className="w-3 h-3 text-white" />}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div
                                    onClick={() => setSelectedPayment('emi')}
                                    className={`bg-white border rounded-lg p-5 flex items-center space-x-4 cursor-pointer transition-all ${selectedPayment === 'emi' ? 'border-black ring-1 ring-black' : 'border-[#E5E5E5] hover:border-gray-400'}`}
                                >
                                    <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center">
                                        <CreditCard className="w-6 h-6 text-gray-500" />
                                    </div>
                                    <span className="text-[14px] font-medium leading-tight">EMI/ No cost EMI / Cardless EMI</span>
                                </div>
                                <div
                                    onClick={() => setSelectedPayment('installment')}
                                    className={`bg-white border rounded-lg p-5 flex items-center space-x-4 cursor-pointer transition-all ${selectedPayment === 'installment' ? 'border-black ring-1 ring-black' : 'border-[#E5E5E5] hover:border-gray-400'}`}
                                >
                                    <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center">
                                        <div className="text-[10px] font-bold text-gray-400 border border-gray-400 px-0.5 rounded-sm">0% EMI</div>
                                    </div>
                                    <div>
                                        <p className="text-[13px] font-medium leading-tight">Pay $4,877 now rest in 3/6 monthly payments</p>
                                        <p className="text-[11px] text-gray-400 mt-1">UPI & Cards Accepted</p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div
                                    onClick={() => setSelectedPayment('card')}
                                    className={`bg-white border rounded-lg p-5 flex items-center space-x-4 cursor-pointer transition-all h-[100px] ${selectedPayment === 'card' ? 'border-black ring-1 ring-black' : 'border-[#E5E5E5] hover:border-gray-400'}`}
                                >
                                    <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center">
                                        <CreditCard className="w-6 h-6 text-gray-500" />
                                    </div>
                                    <span className="text-[13px] font-medium leading-tight">Credit Card / Debit Card / Net Banking ? Wallet</span>
                                </div>
                                <div
                                    onClick={() => setSelectedPayment('upi')}
                                    className={`bg-white border rounded-lg p-5 flex items-center space-x-4 cursor-pointer transition-all h-[100px] ${selectedPayment === 'upi' ? 'border-black ring-1 ring-black' : 'border-[#E5E5E5] hover:border-gray-400'}`}
                                >
                                    <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center">
                                        <div className="relative w-6 h-6">
                                            <Image src="/images/Frame 2121453297.svg" alt="QR" fill className="object-contain" />
                                        </div>
                                    </div>
                                    <span className="text-[13px] font-medium leading-tight">UPI / Dynamic QR code</span>
                                </div>
                            </div>

                            <div
                                onClick={() => setSelectedPayment('cod')}
                                className={`bg-white border rounded-lg p-5 flex items-center space-x-4 cursor-pointer transition-all w-full sm:w-1/2 ${selectedPayment === 'cod' ? 'border-black ring-1 ring-black' : 'border-[#E5E5E5] hover:border-gray-400'}`}
                            >
                                <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center">
                                    <Truck className="w-6 h-6 text-gray-500" />
                                </div>
                                <span className="text-[14px] font-medium">Pay on Delivery</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Column: Order Summary */}
                <div className="lg:col-span-5">
                    <div className="bg-white border border-[#E5E5E5] p-8 rounded-sm sticky top-24">
                        {/* Cart Items */}
                        <div className="space-y-6 mb-10">
                            {cart.map((item) => (
                                <div key={item.id} className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className="relative w-[64px] h-[64px] bg-[#F7F7F7] rounded-sm overflow-hidden flex-shrink-0">
                                            <Image src={getProductImage(item.image)} alt={item.name} fill className="object-cover" />
                                            <span className="absolute -top-2 -right-2 bg-gray-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold z-10">{item.quantity}</span>
                                        </div>
                                        <p className="text-[14px] font-medium max-w-[180px]">{item.name}</p>
                                    </div>
                                    <p className="text-[15px] font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            ))}
                        </div>

                        {/* Recommendations */}
                        <div className="mb-10">
                            <h3 className="text-[14px] font-bold mb-4">You may also like</h3>
                            <div className="space-y-4">
                                {recommendations.map((item) => (
                                    <div key={item.id} className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div className="relative w-[48px] h-[48px] bg-gray-100 rounded-sm overflow-hidden">
                                                <Image src={getProductImage(item.images[0])} alt={item.name} fill className="object-cover" />
                                            </div>
                                            <div>
                                                <p className="text-[13px] font-medium leading-tight">{item.name}</p>
                                                <p className="text-[12px] text-gray-500 font-bold mt-1">${item.price.toFixed(2)}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleQuickAdd(item)}
                                            className="bg-[#1a1a1a] text-white px-4 py-2 text-[12px] font-bold rounded-sm transition-transform active:scale-95 hover:bg-black"
                                        >
                                            Add
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Totals */}
                        <div className="border-t border-[#E5E5E5] pt-6 space-y-3">
                            <div className="flex justify-between text-[14px]">
                                <span className="text-[#666]">Subtotal</span>
                                <span className="font-bold">${cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-[14px]">
                                <span className="text-[#666]">Shipping</span>
                                <span className="text-[#1a1a1a] font-medium">Calculated at next step</span>
                            </div>
                            <div className="flex justify-between text-[18px] font-bold pt-4 border-t border-[#E5E5E5]">
                                <span>Total</span>
                                <span className="text-[20px]">${cartTotal.toFixed(2)}</span>
                            </div>
                        </div>

                        {/* Payment Step CTA */}
                        {step === "payment" && (
                            <div className="mt-8 space-y-4">
                                <button
                                    onClick={handlePayment}
                                    disabled={isProcessing}
                                    className={`w-full text-white py-4 font-bold text-[16px] rounded-sm flex items-center justify-center space-x-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${selectedPayment === 'cod' ? 'bg-[#1a1a1a] hover:bg-black' : 'bg-[#108A44] hover:bg-[#0E7A3C]'}`}
                                >
                                    {selectedPayment === 'cod' ? <Truck className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                                    <span>
                                        {isProcessing
                                            ? "Processing..."
                                            : selectedPayment === 'cod'
                                                ? "Complete Order (Cash on Delivery)"
                                                : "Pay Securely Now"}
                                    </span>
                                </button>
                                <div className="text-center">
                                    <p className="text-[10px] text-gray-400">Shop by confidence.</p>
                                    <p className="text-[10px] text-gray-400">256 bit encrypted.</p>
                                </div>
                            </div>
                        )}

                        {/* Trust Badges - Only on Address Step */}
                        {step === "address" && (
                            <div className="mt-12 space-y-6">
                                <div className="flex items-start space-x-3">
                                    <Lock className="w-5 h-5 text-gray-400 mt-1" />
                                    <div>
                                        <p className="text-[13px] font-bold">Secure Payments</p>
                                        <p className="text-[11px] text-[#666] leading-relaxed">
                                            We use 100% secure payments to provide you with a simple and safe experience.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <Truck className="w-5 h-5 text-gray-400 mt-1" />
                                    <div>
                                        <p className="text-[13px] font-bold">Free Shipping</p>
                                        <p className="text-[11px] text-[#666] leading-relaxed">
                                            We deliver around the globe at no extra cost.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <ThumbsUp className="w-5 h-5 text-gray-400 mt-1" />
                                    <div>
                                        <p className="text-[13px] font-bold">Satisfaction Guarantee</p>
                                        <p className="text-[11px] text-[#666] leading-relaxed">
                                            We're sure that you'll love our products. If anything doesn't meet your expectations, you can exchange or refund for 100% memory back.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}

function ChevronRight({ className }: { className?: string }) {
    return <svg className={className} fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><polyline points="9 18 15 12 9 6" /></svg>;
}
