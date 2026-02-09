"use client";

import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";
import { getProductImage } from "../data/products";
import { useProducts } from "../context/ProductContext";

export default function ShopPage() {
    const { products } = useProducts();

    return (
        <main className="min-h-screen bg-[#Fdfdfd]">
            <Navbar variant="light" />

            {/* Hero Section */}
            <section className="relative h-[40vh] min-h-[400px] flex items-center justify-center text-center overflow-hidden">
                <Image
                    src={getProductImage("/images/unsplash_nimElTcTNyY.png")}
                    alt="Art Studio"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/40" /> {/* Dark overly for text */}
                <div className="relative z-10 p-4">
                    <h1 className="font-serif text-5xl md:text-6xl text-white mb-4">Shop All Art</h1>
                    <p className="text-white/80 max-w-lg mx-auto font-light tracking-wide">
                        Discover our full range of curated prints, original artworks, and sculptures.
                    </p>
                </div>
            </section>

            {/* Filter / Sort Bar (Visual Only) */}
            <div className="border-b border-gray-100 bg-white sticky top-0 z-40">
                <div className="max-w-[1400px] mx-auto px-6 h-14 flex items-center justify-between text-sm">
                    <div className="flex space-x-6">
                        <span className="font-medium cursor-pointer">All Products</span>
                        <span className="text-gray-500 cursor-pointer hover:text-black">Paintings</span>
                        <span className="text-gray-500 cursor-pointer hover:text-black">Drawings</span>
                        <span className="text-gray-500 cursor-pointer hover:text-black">Sculptures</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-500 cursor-pointer hover:text-black">
                        <span>Sort by: Featured</span>
                    </div>
                </div>
            </div>

            {/* Product Grid */}
            <section className="py-16 px-6 max-w-[1400px] mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                    {products.map((product) => (
                        <Link href={`/product/${product.id}`} key={product.id} className="group block">
                            <div className="relative aspect-[4/5] overflow-hidden mb-6 bg-[#f4f4f5]">
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
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-serif text-xl mb-1 group-hover:underline decoration-1 underline-offset-4">{product.name}</h3>
                                    <p className="text-sm text-gray-500">$ {product.price.toFixed(2)} USD</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            <Footer />
        </main>
    );
}
