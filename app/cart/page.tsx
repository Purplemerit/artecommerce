"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Trash2, ArrowRight } from "lucide-react";
import { useCart } from "../context/CartContext";
import { products, getProductImage } from "../data/products";
import { useRouter } from "next/navigation";

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
    const router = useRouter();
    return (
        <main className="min-h-screen bg-[#faf9f6]">
            <Navbar variant="light" />

            <div className="pt-32 pb-16 px-4 max-w-7xl mx-auto">

                {/* Free Delivery Bar */}
                <div className="bg-white p-8 rounded-sm mb-8 text-center">
                    {/* Dynamic Free Delivery Bar */}
                    <div className="bg-black text-white py-3 px-6 inline-block text-sm font-medium mb-4 rounded-sm">
                        Hurry up! Order within <span className="text-[#d4a373]">00:30min</span> to dispatch today 🚀
                    </div>
                    <h1 className="font-serif text-4xl mb-4">Your cart</h1>
                    <p className="text-sm text-[#ff6b6b] mb-4">
                        {cartTotal >= 1000 ? "You've unlocked Free Delivery & 10% Off! 🎉" : `You are $${(1000 - cartTotal).toFixed(0)} away to get 10% off`}
                    </p>

                    <div className="relative pt-2 pb-2 max-w-lg mx-auto mt-6">
                        {/* Top Labels */}
                        <div className="flex justify-between text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-4">
                            <span>Start</span>
                            <span className="translate-x-[-20%]">Free Ship</span>
                            <span className="translate-x-[10%]">5% Off</span>
                            <span>10% Off</span>
                        </div>

                        {/* Progress Bar Container */}
                        <div className="relative h-4 flex items-center mb-2">
                            {/* Track */}
                            <div className="absolute left-0 right-0 h-1 bg-gray-100 rounded-full"></div>

                            {/* Fill */}
                            <div
                                className="absolute left-0 h-1 bg-black rounded-full transition-all duration-1000 ease-out z-10"
                                style={{ width: `${Math.min((cartTotal / 1000) * 100, 100)}%` }}
                            ></div>

                            {/* Dots */}
                            {/* Dot 1: Start (0%) */}
                            <div className={`absolute left-0 w-3 h-3 rounded-full border-2 border-white shadow-sm z-20 ${cartTotal >= 0 ? "bg-black" : "bg-gray-200"}`}></div>

                            {/* Dot 2: Free Ship (20% = $200) */}
                            <div className={`absolute left-[20%] w-3 h-3 rounded-full border-2 border-white shadow-sm -translate-x-1/2 z-20 ${cartTotal >= 200 ? "bg-black" : "bg-gray-200"}`}></div>

                            {/* Dot 3: 5% Off (50% = $500) */}
                            <div className={`absolute left-[50%] w-3 h-3 rounded-full border-2 border-white shadow-sm -translate-x-1/2 z-20 ${cartTotal >= 500 ? "bg-black" : "bg-gray-200"}`}></div>

                            {/* Dot 4: 10% Off (100% = $1000) */}
                            <div className={`absolute left-[100%] w-3 h-3 rounded-full border-2 border-white shadow-sm -translate-x-1/2 z-20 ${cartTotal >= 1000 ? "bg-black" : "bg-gray-200"}`}></div>
                        </div>

                        {/* Bottom Labels (Money) */}
                        <div className="flex justify-between text-xs font-medium text-gray-900">
                            <span>$0</span>
                            <span className="translate-x-[-50%]">$200</span>
                            <span className="translate-x-[-15%]">$500</span>
                            <span>$1000</span>
                        </div>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left: Cart Items */}
                    <div className="lg:col-span-2 bg-white p-6 rounded-sm">
                        <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                            <h2 className="font-medium text-lg">Items summary ({cart.length})</h2>
                            <button
                                onClick={() => router.push('/wishlist')}
                                className="bg-black text-white text-xs px-3 py-1.5 rounded-full hover:bg-gray-800 transition-colors"
                            >
                                Add From Wishlist
                            </button>
                        </div>

                        <div className="space-y-6">
                            {cart.length === 0 ? (
                                <p className="text-gray-500 text-center py-8">Your cart is empty.</p>
                            ) : (
                                cart.map((item) => (
                                    <div key={`${item.id}-${item.size}`} className="flex items-center py-4 border-b border-gray-50 last:border-0">
                                        <div className="h-16 w-16 relative bg-gray-100 flex-shrink-0">
                                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                                        </div>
                                        <div className="ml-4 flex-1">
                                            <h3 className="text-sm font-medium">{item.name}</h3>
                                            <p className="text-xs text-gray-500">{item.size && `Size: ${item.size}`}</p>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <div className="flex items-center border border-gray-200 rounded px-2 py-1 text-xs">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1, item.size)}
                                                    className="px-1"
                                                >-</button>
                                                <span className="px-2">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1, item.size)}
                                                    className="px-1"
                                                >+</button>
                                            </div>
                                            <span className="text-sm font-medium w-16 text-right">${(item.price * item.quantity).toFixed(2)}</span>
                                            <button
                                                onClick={() => removeFromCart(item.id, item.size)}
                                                className="text-gray-400 hover:text-red-500 flex items-center text-xs"
                                            >
                                                <Trash2 className="w-4 h-4 mr-1" /> Remove
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Right: Order Summary */}
                    <div className="bg-white p-6 rounded-sm h-fit">
                        <h2 className="font-medium text-lg mb-6">Order summary</h2>

                        <div className="space-y-4 text-sm mb-6">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Subtotal:</span>
                                <span className="font-medium">${cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Shipping:</span>
                                <span className="text-gray-500">Calculated at next step</span>
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="text-xs font-medium text-gray-700 block mb-2">Coupon Codes:</label>
                            <div className="flex relative">
                                <input
                                    type="text"
                                    placeholder="Enter your coupon"
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-black"
                                />
                                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 bg-gray-300 rounded-full text-white hover:bg-black">
                                    <ArrowRight className="w-3 h-3" />
                                </button>
                            </div>
                        </div>

                        <div className="space-y-3 mb-6">
                            <p className="text-xs font-medium">Promotions:</p>
                            <div className="bg-gray-50 border border-gray-100 rounded px-3 py-2 flex justify-between text-xs items-center">
                                <span className="flex items-center text-gray-600">🏷️ NEWCUSTOMER_1234 (-5%)</span>
                                <span className="text-green-600">-$4.69</span>
                            </div>
                            <div className="flex justify-between text-xs text-green-600 font-medium">
                                <span>All Your Discounts:</span>
                                <span>-$4.69</span>
                            </div>
                        </div>

                        <div className="border-t border-gray-100 pt-4 mb-6">
                            <div className="flex justify-between items-end">
                                <span className="font-bold text-gray-900">Grand total:</span>
                                <span className="font-bold text-xl">${(cartTotal - 4.69).toFixed(2)}</span>
                            </div>
                        </div>

                        <Link href="/checkout">
                            <button className="w-full bg-[#333] text-white py-3 rounded hover:bg-black transition-colors font-medium">
                                Checkout
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Trending Now */}
                <div className="mt-16">
                    <h2 className="font-serif text-3xl mb-8">Trending now</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                        {products.slice(0, 3).map((product) => (
                            <Link href={`/product/${product.id}`} key={product.id} className="group block">
                                <div className="relative aspect-square mb-4 bg-gray-100 overflow-hidden">
                                    <Image
                                        src={getProductImage(product.images[0])}
                                        alt={product.name}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    {/* Quick Add Button on Hover (Optional, but adds UI flair) */}
                                    <div className="absolute bottom-4 left-0 right-0 px-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="w-full bg-white text-black py-2 text-xs uppercase font-bold tracking-widest hover:bg-black hover:text-white transition-colors">
                                            View Product
                                        </button>
                                    </div>
                                </div>
                                <h3 className="font-serif text-lg group-hover:underline decoration-1 underline-offset-4">{product.name}</h3>
                                <p className="text-sm text-gray-500">$ {product.price.toFixed(2)} USD</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
