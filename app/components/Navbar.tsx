"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingBag, Menu, X, User, Heart } from "lucide-react";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";

interface NavbarProps {
    variant?: "transparent" | "light";
}

export default function Navbar({ variant }: NavbarProps = {}) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const { cart } = useCart();
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
            setIsOpen(false);
        }
    };

    const navLinks = [
        { name: "All Products", href: "/shop" },
        { name: "On Sale", href: "/sale" },
        { name: "New Arrivals", href: "/new-arrivals" },
        { name: "Art Collections", href: "/collections" },
        { name: "About us", href: "/about" }
    ];

    return (
        <div className="absolute top-0 left-0 w-full z-50 pt-4 md:pt-8 px-4 md:px-10 pointer-events-none">
            {/* The navbar container itself has pointer-events-auto to allow interaction */}
            <nav className="max-w-[1360px] mx-auto bg-white text-black shadow-sm pointer-events-auto transition-all duration-300 py-2 px-3 rounded-lg relative">
                <div className="flex justify-between items-center min-h-[40px]">
                    {/* Left Section: Logo */}
                    <div className="flex-1 flex items-center">
                        <Link href="/" className="relative w-8 h-8 flex items-center justify-center">
                            <Image
                                src="/images/logo.svg"
                                alt="Logo"
                                fill
                                className="object-contain"
                                priority
                            />
                        </Link>
                    </div>

                    {/* Center Section: Desktop Nav (Hidden until lg) */}
                    <div className="hidden lg:flex items-center justify-center lg:space-x-8 xl:space-x-12 mr-8">
                        {navLinks.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-gray-900 font-medium text-[11px] xl:text-xs tracking-wide hover:text-gray-600 transition-colors whitespace-nowrap"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* Right Section: Actions */}
                    <div className="flex-1 flex items-center justify-end">
                        {/* Full Search Bar & Icons (Large Desktop) */}
                        <div className="hidden xl:flex items-center space-x-6 xl:space-x-10">
                            <form onSubmit={handleSearch} className="flex items-center space-x-2 text-gray-400 border-r border-transparent pr-4 group transition-all">
                                <button type="submit" className="hover:text-black transition-colors">
                                    <Search className="w-5 h-5" />
                                </button>
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="bg-transparent border-none focus:outline-none font-light text-sm w-12 xl:w-48 placeholder-gray-400 text-black py-1 transition-all focus:w-32 xl:focus:w-48"
                                />
                            </form>

                            <div className="flex items-center space-x-6 xl:space-x-8">
                                <Link href="/wishlist" className="text-black hover:opacity-70 transition-opacity">
                                    <Heart className="w-6 h-6" />
                                </Link>

                                <Link href="/cart" className="relative group text-black hover:opacity-70 transition-opacity">
                                    <ShoppingBag className="w-6 h-6" />
                                    {cart.length > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                                            {cart.length}
                                        </span>
                                    )}
                                </Link>

                                <Link href="/account" className="text-black hover:opacity-70 transition-opacity">
                                    <User className="w-6 h-6" />
                                </Link>
                            </div>
                        </div>

                        {/* Tablet & Mobile Controls (Always available until XL) */}
                        <div className="xl:hidden flex items-center space-x-3 sm:space-x-5">
                            <Link href="/wishlist" className="text-black p-1">
                                <Heart className="w-6 h-6" />
                            </Link>
                            <Link href="/cart" className="relative group text-black p-1">
                                <ShoppingBag className="w-6 h-6" />
                                {cart.length > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                                        {cart.length}
                                    </span>
                                )}
                            </Link>
                            {/* Hamburger Menu Icon */}
                            <button
                                onClick={() => setIsOpen(true)}
                                className="text-black hover:opacity-70 focus:outline-none p-1 transition-all"
                            >
                                <Menu className="h-7 w-7" />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Premium Mobile Slide-out Menu (From Right) */}
            <div
                className={`fixed inset-0 z-[100] transition-opacity duration-300 pointer-events-none ${isOpen ? "opacity-100" : "opacity-0"}`}
            >
                {/* Backdrop overlay */}
                <div
                    className={`absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-500 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
                    onClick={() => setIsOpen(false)}
                />

                {/* Right-sliding menu panel */}
                <div
                    className={`absolute top-0 right-0 h-full w-[320px] max-w-[85vw] bg-white shadow-2xl transition-transform duration-500 ease-out ${isOpen ? "translate-x-0 pointer-events-auto" : "translate-x-full pointer-events-none"}`}
                >
                    <div className="flex flex-col h-full">
                        {/* Menu Header with Close Button */}
                        <div className="flex justify-between items-center p-6 border-b border-gray-100">
                            <span className="font-serif text-xl">Menu</span>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        {/* Search in Menu */}
                        <div className="px-6 py-4">
                            <form onSubmit={handleSearch} className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search for products..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-gray-50 border border-gray-100 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-black/5 text-sm"
                                />
                            </form>
                        </div>

                        {/* Navigation Links */}
                        <div className="flex flex-col py-2 overflow-y-auto">
                            {navLinks.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className="px-8 py-4 text-lg font-medium text-gray-900 hover:bg-gray-50 transition-colors"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>

                        {/* Bottom Utility Links */}
                        <div className="mt-auto border-t border-gray-100 p-6 space-y-4">
                            <Link
                                href="/account"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center space-x-3 text-gray-900 font-medium hover:text-gray-600 transition-colors"
                            >
                                <User className="w-5 h-5" />
                                <span>My Account</span>
                            </Link>
                            <Link
                                href="/wishlist"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center space-x-3 text-gray-900 font-medium hover:text-gray-600 transition-colors"
                            >
                                <Heart className="w-5 h-5" />
                                <span>Wishlist</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
