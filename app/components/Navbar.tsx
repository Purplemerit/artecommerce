"use client";

import Link from "next/link";
import { Search, ShoppingBag, User, Menu, X, Heart } from "lucide-react";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";

interface NavbarProps {
    variant?: "transparent" | "light";
}

export default function Navbar({ variant = "transparent" }: NavbarProps) {
    const [isOpen, setIsOpen] = useState(false);
    const { cart } = useCart();
    const { wishlist } = useWishlist();
    const { isAdmin } = useAuth(); // Add this line

    const isLight = variant === "light";
    const textColor = isLight ? "text-black" : "text-white";
    const borderColor = isLight ? "border-gray-200" : "border-white/10";
    const badgeColor = isLight ? "bg-black text-white" : "bg-white text-black";

    return (
        <nav className={`absolute top-0 left-0 w-full z-50 ${isLight ? 'bg-white' : 'bg-transparent'} ${textColor} border-b ${borderColor}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className={`rounded-full p-2 w-8 h-8 flex items-center justify-center font-serif font-bold text-xl ${isLight ? 'bg-black text-white' : 'bg-white text-black'}`}>
                            A
                        </Link>
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex space-x-8">
                        {[
                            { name: "All Products", href: "/shop" },
                            { name: "On Sale", href: "/shop" },
                            { name: "New Arrivals", href: "/shop" },
                            { name: "Art Collections", href: "/shop" },
                            { name: "About us", href: "/about" }
                        ].map((item) => (
                            <Link key={item.name} href={item.href} className={`${isLight ? 'text-gray-600 hover:text-black' : 'text-white/90 hover:text-white'} text-sm font-medium transition-colors`}>
                                {item.name}
                            </Link>
                        ))}
                        {isAdmin && (
                            <Link href="/admin" className={`${isLight ? 'text-gray-600 hover:text-black' : 'text-white/90 hover:text-white'} text-sm font-medium transition-colors font-bold`}>
                                Admin Panel
                            </Link>
                        )}
                    </div>

                    {/* Icons */}
                    <div className="hidden md:flex items-center space-x-6">
                        <div className="relative group">
                            <Search className={`h-5 w-5 cursor-pointer hover:opacity-70 transition-opacity`} />
                        </div>
                        <Link href="/wishlist" className="relative group">
                            <Heart className={`h-5 w-5 cursor-pointer hover:opacity-70 transition-opacity`} />
                            {wishlist.length > 0 && (
                                <span className={`absolute -top-2 -right-2 ${badgeColor} text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full`}>
                                    {wishlist.length}
                                </span>
                            )}
                        </Link>
                        <Link href="/cart" className="relative group">
                            <ShoppingBag className={`h-5 w-5 cursor-pointer hover:opacity-70 transition-opacity`} />
                            {cart.length > 0 && (
                                <span className={`absolute -top-2 -right-2 ${badgeColor} text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full`}>
                                    {cart.length}
                                </span>
                            )}
                        </Link>
                        <Link href="/account" className="relative group">
                            <User className={`h-5 w-5 cursor-pointer hover:opacity-70 transition-opacity`} />
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`${textColor} hover:opacity-70 focus:outline-none`}
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className={`md:hidden ${isLight ? 'bg-white text-black' : 'bg-black/95 text-white'} backdrop-blur-sm border-t ${borderColor}`}>
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {[
                            { label: "All Products", href: "/shop" },
                            { label: "On Sale", href: "/shop" },
                            { label: "New Arrivals", href: "/shop" },
                            { label: "Art Collections", href: "/shop" },
                            { label: "About us", href: "/about" }
                        ].map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={`block px-3 py-2 rounded-md text-base font-medium hover:opacity-70 transition-opacity`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}
