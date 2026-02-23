"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";
import { getProductImage } from "../data/products";
import { useProducts } from "../context/ProductContext";

export default function SalePage() {
    const { products } = useProducts();
    const [activeFilter, setActiveFilter] = useState("Sale Items");
    const [sortBy, setSortBy] = useState("Price: Low to High");

    const getFilteredAndSortedProducts = () => {
        // Only show items that have an oldPrice > price
        let items = products.filter(p => (p.oldPrice || 0) > p.price);

        // Filter Logic
        if (activeFilter === "Up to 30% Off") {
            items = items.filter(p => {
                const discount = ((p.oldPrice! - p.price) / p.oldPrice!) * 100;
                return discount <= 30;
            });
        } else if (activeFilter === "Clearance") {
            items = items.filter(p => {
                const discount = ((p.oldPrice! - p.price) / p.oldPrice!) * 100;
                return discount > 30;
            });
        }

        // Sort Logic
        if (sortBy === "Price: Low to High") {
            items.sort((a, b) => a.price - b.price);
        } else if (sortBy === "Price: High to Low") {
            items.sort((a, b) => b.price - a.price);
        } else if (sortBy === "Newest") {
            items.sort((a, b) => b.id - a.id);
        }

        return items;
    };

    const displayProducts = getFilteredAndSortedProducts();

    return (
        <main className="min-h-screen bg-[#Fdfdfd]">
            <Navbar variant="light" />

            {/* Hero Section */}
            <section className="relative h-[40vh] min-h-[400px] flex items-center justify-center text-center overflow-hidden">
                <Image
                    src={getProductImage("/images/unsplash_nimElTcTNyY.png")}
                    alt="Sale"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative z-10 p-4">
                    <h1 className="font-serif text-5xl md:text-6xl text-white mb-4">On Sale</h1>
                    <p className="text-white/80 max-w-lg mx-auto font-light tracking-wide">
                        Discover exclusive deals on our curated collection of artworks.
                    </p>
                </div>
            </section>

            {/* Filter / Sort Bar */}
            <div className="border-b border-gray-100 bg-white sticky top-0 z-40">
                <div className="max-w-[1400px] mx-auto px-6 py-4 md:py-0 md:h-14 flex flex-col md:flex-row items-center justify-between text-sm gap-4 md:gap-0">
                    <div className="flex space-x-4 md:space-x-8 overflow-x-auto no-scrollbar w-full md:w-auto pb-2 md:pb-0">
                        {["Sale Items", "Up to 30% Off", "Clearance"].map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`transition-all duration-200 whitespace-nowrap ${activeFilter === filter
                                    ? "text-black font-semibold border-b-2 border-black pb-2 md:pb-4 -mb-2 md:-mb-4 mt-2 md:mt-4"
                                    : "text-gray-400 hover:text-black"
                                    }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                    <div className="relative group w-full md:w-auto flex justify-end">
                        <div className="flex items-center space-x-2 text-gray-400 cursor-pointer hover:text-black text-[12px] md:text-sm">
                            <span>Sort by: <span className="text-black font-medium">{sortBy}</span></span>
                        </div>
                        <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-100 shadow-xl rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                            {["Newest", "Price: Low to High", "Price: High to Low"].map((option) => (
                                <button
                                    key={option}
                                    onClick={() => setSortBy(option)}
                                    className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50 transition-colors first:rounded-t-md last:rounded-b-md"
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Grid */}
            <section className="py-20 px-6 max-w-[1400px] mx-auto">
                {displayProducts.length === 0 ? (
                    <div className="py-20 text-center">
                        <h3 className="text-2xl font-serif text-gray-400 mb-4">No artworks found</h3>
                        <p className="text-gray-500">There are currently no items matching this criteria.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
                        {displayProducts.map((product) => (
                            <Link
                                key={product.id}
                                href={`/product/${product.id}`}
                                className="group block"
                            >
                                <div className="relative aspect-square bg-gray-100 overflow-hidden mb-6 rounded-sm">
                                    <Image
                                        src={getProductImage(product.images[0])}
                                        alt={product.name}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    {product.oldPrice > product.price && (
                                        <span className="absolute top-4 left-4 bg-white/90 text-[10px] font-bold px-2 py-1 uppercase tracking-wider backdrop-blur-sm">
                                            Sale
                                        </span>
                                    )}
                                </div>
                                <h3 className="font-serif text-[22px] text-[#1a1a1a] mb-2 group-hover:underline decoration-1 underline-offset-4">{product.name}</h3>
                                <p className="text-[15px] text-gray-500 font-medium">$ {product.price.toFixed(2)} USD</p>
                            </Link>
                        ))}
                    </div>
                )}
            </section>

            <Footer />
        </main>
    );
}
