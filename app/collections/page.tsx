"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";
import { getProductImage } from "../data/products";
import { useProducts } from "../context/ProductContext";
import { ChevronDown } from "lucide-react";

export default function CollectionsPage() {
    const { products } = useProducts();
    const [sortBy, setSortBy] = useState("Featured");

    // For this specific 'ditto' UI, we show all art-related products
    const displayProducts = products.filter(p => p.type !== "Candles");

    return (
        <main className="min-h-screen bg-[#faf9f6]">
            <Navbar variant="light" />

            <div className="pt-36 pb-24 px-8 max-w-[1300px] mx-auto text-[#1a1a1a]">
                {/* Header Section */}
                <div className="mb-10">
                    <h1 className="font-serif text-[44px] mb-4 leading-tight tracking-tight">Abstract wall art sets</h1>
                    <p className="text-[13px] text-[#707070] font-light">
                        Browse our large selection of abstract and modern wall art prints.
                    </p>
                </div>

                {/* Filter / Sort Bar */}
                <div className="flex justify-between items-center mb-16 border-t border-gray-100 pt-6 mt-6">
                    <div className="flex gap-6">
                        <button className="flex items-center gap-2 text-[11px] font-medium text-[#1a1a1a] hover:opacity-70 transition-opacity">
                            Availability <ChevronDown className="w-2.5 h-2.5 opacity-60" />
                        </button>
                        <button className="flex items-center gap-2 text-[11px] font-medium text-[#1a1a1a] hover:opacity-70 transition-opacity">
                            Price <ChevronDown className="w-2.5 h-2.5 opacity-60" />
                        </button>
                    </div>

                    <div className="flex items-center gap-1 group relative">
                        <button className="flex items-center gap-2 text-[11px] font-medium text-[#1a1a1a] hover:opacity-70 transition-opacity">
                            {sortBy} <ChevronDown className="w-2.5 h-2.5 opacity-60" />
                        </button>
                        {/* Dropdown would go here if functional, adding for UI completeness */}
                        <div className="absolute right-0 top-full mt-2 w-40 bg-white border border-gray-100 shadow-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                            {["Featured", "Newest", "Price: Low-High", "Price: High-Low"].map((opt) => (
                                <button key={opt} onClick={() => setSortBy(opt)} className="w-full text-left px-4 py-2.5 text-[10px] hover:bg-gray-50 transition-colors">
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
                    {displayProducts.map((product) => (
                        <Link
                            key={product.id}
                            href={`/product/${product.id}`}
                            className="group flex flex-col"
                        >
                            <div className="relative aspect-[4/5] bg-[#ecebe9] overflow-hidden mb-6 rounded-sm">
                                <Image
                                    src={getProductImage(product.images[0])}
                                    alt={product.name}
                                    fill
                                    className="object-cover group-hover:opacity-90 transition-all duration-700"
                                />
                            </div>
                            <h3 className="font-serif text-[15px] text-[#2c2c2c] mb-1 font-medium tracking-wide">
                                {product.name}
                            </h3>
                            <p className="text-[13px] text-[#4a4a4a] font-serif tracking-tight">
                                $ {product.price.toFixed(2)} USD
                            </p>
                        </Link>
                    ))}
                </div>

                {displayProducts.length === 0 && (
                    <div className="py-32 text-center text-gray-400 font-serif italic">
                        No pieces currently on display in this gallery.
                    </div>
                )}
            </div>

            <Footer />
        </main>
    );
}
