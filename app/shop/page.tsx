"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";
import { getProductImage } from "../data/products";
import { useProducts } from "../context/ProductContext";
import { useSearchParams } from "next/navigation";

function ShopContent() {
    const { products } = useProducts();
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get("q")?.toLowerCase() || "";

    const [activeFilter, setActiveFilter] = useState("Latest Additions");
    const [sortBy, setSortBy] = useState("Newest");

    // Helper to check if a product is from "This Week" or "This Month"
    // Since we don't have real dates yet, we'll simulate some if missing
    // For now, we'll assume higher IDs are newer
    const getFilteredAndSortedProducts = () => {
        let items = [...products];

        // Search Filter
        if (searchQuery) {
            items = items.filter(product =>
                product.name.toLowerCase().includes(searchQuery) ||
                product.description.toLowerCase().includes(searchQuery)
            );
        }

        // Time Filter (Simulated for demonstration if data lacks dates)
        if (activeFilter === "This Week") {
            // Show top 30% of newest items as "This Week"
            items = items.slice(0, Math.ceil(items.length * 0.3));
        } else if (activeFilter === "This Month") {
            // Show top 60% as "This Month"
            items = items.slice(0, Math.ceil(items.length * 0.6));
        }

        // Sort Logic
        if (sortBy === "Price: Low to High") {
            items.sort((a, b) => a.price - b.price);
        } else if (sortBy === "Price: High to Low") {
            items.sort((a, b) => b.price - a.price);
        } else if (sortBy === "Newest") {
            // Assume ID order for newest (descending)
            items.sort((a, b) => b.id - a.id);
        }

        return items;
    };

    const displayProducts = getFilteredAndSortedProducts();

    return (
        <main className="min-h-screen bg-[#Fdfdfd]">
            <Navbar variant="light" />

            {/* Hero Section */}
            <section className="relative h-[30vh] md:h-[40vh] min-h-[300px] flex items-center justify-center text-center overflow-hidden">
                <Image
                    src={getProductImage("/images/unsplash_nimElTcTNyY.png")}
                    alt="Art Studio"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/40" /> {/* Dark overly for text */}
                <div className="relative z-10 p-6 md:p-4">
                    <h1 className="font-serif text-4xl md:text-6xl text-white mb-4">Shop All Art</h1>
                    <p className="text-white/80 max-w-lg mx-auto font-light tracking-wide text-sm md:text-base">
                        Discover our full range of curated prints, original artworks, and sculptures.
                    </p>
                </div>
            </section>

            {/* Filter / Sort Bar (Now Working) */}
            <div className="border-b border-gray-100 bg-white sticky top-0 z-40">
                <div className="max-w-[1400px] mx-auto px-6 h-auto md:h-14 flex flex-col md:flex-row items-center justify-between text-sm py-4 md:py-0 gap-4 md:gap-0">
                    <div className="flex space-x-4 md:space-x-8 overflow-x-auto no-scrollbar w-full md:w-auto pb-2 md:pb-0">
                        {["Latest Additions", "This Week", "This Month"].map((filter) => (
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
                        <div className="flex items-center space-x-2 text-gray-400 cursor-pointer hover:text-black">
                            <span>Sort by: <span className="text-black font-medium">{sortBy}</span></span>
                        </div>
                        {/* Simple CSS Dropdown */}
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
                {searchQuery && (
                    <div className="mb-12">
                        <h2 className="text-2xl font-serif">
                            Results for &quot;{searchQuery}&quot;
                            <span className="text-gray-400 text-sm ml-4 font-sans font-light">
                                ({displayProducts.length} items found)
                            </span>
                        </h2>
                    </div>
                )}

                {displayProducts.length === 0 ? (
                    <div className="py-20 text-center">
                        <h3 className="text-2xl font-serif text-gray-400 mb-4">No artworks found</h3>
                        <p className="text-gray-500">Try searching for something else, or browse our full collection.</p>
                        <Link href="/shop" className="inline-block mt-8 text-black underline underline-offset-4">
                            Clear search
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
                        {displayProducts.map((product) => (
                            <Link href={`/product/${product.id}`} key={product.id} className="group block">
                                <div className="relative aspect-square overflow-hidden mb-6 bg-[#f4f4f5] rounded-sm">
                                    <Image
                                        src={getProductImage(product.images[0])}
                                        alt={product.name}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    {/* Label badge if on sale */}
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

export default function ShopPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading gallery...</div>}>
            <ShopContent />
        </Suspense>
    );
}
