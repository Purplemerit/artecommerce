"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingBag, Menu, X, User } from "lucide-react";
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
        <div className="absolute top-0 left-0 w-full z-50 pt-8 px-10 pointer-events-none">
            {/* The navbar container itself has pointer-events-auto to allow interaction */}
            <nav className="max-w-[1360px] mx-auto bg-white text-black shadow-sm pointer-events-auto transition-all duration-300 py-2 px-3 rounded-lg">
                <div className="flex justify-between items-center min-h-[40px]">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
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

                    {/* Desktop Nav - Centered */}
                    <div className="hidden lg:flex space-x-8 xl:space-x-12 absolute left-1/2 transform -translate-x-1/2">
                        {navLinks.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-gray-900 font-medium text-xs tracking-wide hover:text-gray-600 transition-colors whitespace-nowrap"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* Right Section */}
                    <div className="hidden md:flex items-center space-x-8">
                        {/* Search Bar */}
                        <form onSubmit={handleSearch} className="flex items-center space-x-3 text-gray-400 border-r border-transparent pr-4 group transition-all">
                            <button type="submit" className="hover:text-black transition-colors">
                                <Search className="w-5 h-5" />
                            </button>
                            <input
                                type="text"
                                placeholder="Search for products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-transparent border-none focus:outline-none font-light text-sm w-32 xl:w-48 placeholder-gray-400 text-black py-1"
                            />
                        </form>

                        {/* Cart Icon */}
                        <Link href="/cart" className="relative group text-black hover:opacity-70 transition-opacity">
                            <ShoppingBag className="w-6 h-6" />
                            {cart.length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                                    {cart.length}
                                </span>
                            )}
                        </Link>

                        {/* User Icon */}
                        <Link href="/account" className="text-black hover:opacity-70 transition-opacity">
                            <User className="w-6 h-6" />
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="lg:hidden flex items-center space-x-6">
                        <Link href="/cart" className="relative group text-black">
                            <ShoppingBag className="w-6 h-6" />
                            {cart.length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                                    {cart.length}
                                </span>
                            )}
                        </Link>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-black hover:opacity-70 focus:outline-none"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="lg:hidden border-t border-gray-100 bg-white absolute top-full left-0 w-full z-50 rounded-b-lg shadow-lg">
                        <div className="px-6 py-6 space-y-4">
                            {navLinks.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className="block text-lg font-medium text-gray-900 hover:text-gray-600"
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <div className="pt-4 border-t border-gray-100">
                                <form onSubmit={(e) => { handleSearch(e); setIsOpen(false); }} className="relative mb-6">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search for products..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full bg-gray-50 border border-gray-100 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-black/5 text-sm"
                                    />
                                </form>
                                <Link href="/account" onClick={() => setIsOpen(false)} className="flex items-center space-x-3 text-gray-900 font-medium">
                                    <User className="w-5 h-5" />
                                    <span>Account</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </div>
    );
}
