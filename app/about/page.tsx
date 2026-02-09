"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CheckCircle, ShieldCheck, Heart, User } from "lucide-react";

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-[#faf9f6]">
            {/* Navbar is absolute transparent, so we need a background for the page or specific section */}
            <div className="bg-[#9B9692]">
                <Navbar />
            </div>

            {/* Hero Section */}
            <section className="bg-[#9B9692] text-white min-h-[600px] flex items-center relative overflow-hidden pt-20">
                <Image
                    src="/images/unsplash_MO5qO9xpZhA (1).png"
                    alt="About Studio Background"
                    fill
                    className="object-cover opacity-100 z-0"
                    priority
                />
                {/* Overlay if needed for contrast, though the image might be dark enough or we can adjust opacity */}
                <div className="absolute inset-0 bg-black/30 z-0" />

                <div className="max-w-7xl mx-auto px-4 w-full flex flex-col justify-center items-start text-left relative z-10 h-full min-h-[400px]">
                    <div>
                        <h1 className="font-serif text-6xl md:text-7xl mb-6 drop-shadow-lg">About the<br /> Studio</h1>
                        <p className="font-sans text-lg max-w-md leading-relaxed opacity-90 drop-shadow-md">
                            We curate and create art to be lived with. Natural spaces not just on walls, but in everyday life.
                        </p>
                    </div>
                </div>
            </section>

            {/* Art Thoughtfully Chosen Section */}
            <section className="py-24 px-4 bg-[#faf9f6]">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="font-serif text-4xl mb-12 text-[#1a1a1a]">Art, thoughtfully chosen</h2>
                    <div className="relative h-[300px] md:h-[400px] w-full mb-12 overflow-hidden">
                        <Image
                            src="/images/unsplash_MO5qO9xpZhA.png" // Textured image
                            alt="Textured Art Details"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto text-sm md:text-base">
                        We believe art should be personal. Every piece in our collection is selected for its ability to live with you — to grow familiar, to be loved in, and to quietly shape the atmosphere of a space. We focus on balance, texture, and emotion rather than trends. Art that feels relevant long after the first impression.
                    </p>
                </div>
            </section>

            {/* What Makes Us Different */}
            <section className="py-24 px-4 max-w-7xl mx-auto bg-[#faf9f6]">
                <h2 className="font-serif text-4xl text-center text-[#1a1a1a] mb-20">What Makes Us Different</h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="relative h-[500px] w-full max-w-md mx-auto">
                        <Image
                            src="/images/643677baed1627ea77898fb7_product-hover01.jpg.png" // Classical head/sculpture likely
                            alt="Classical Art"
                            fill
                            className="object-cover sepia-[.25]"
                        />
                    </div>

                    <div className="space-y-6">
                        {/* Feature 1 */}
                        <div className="bg-white p-8 border border-gray-100 shadow-sm flex items-start space-x-6">
                            <div className="bg-gray-50 p-3 rounded-full">
                                <User className="w-6 h-6 text-black" />
                            </div>
                            <div>
                                <h3 className="font-serif font-bold text-lg mb-2">Curated, not crowded</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">
                                    Our collection is intentionally limited. We ensure every piece fits our rigorous standard for aesthetic and quality.
                                </p>
                            </div>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-white p-8 border border-gray-100 shadow-sm flex items-start space-x-6">
                            <div className="bg-gray-50 p-3 rounded-full">
                                <Heart className="w-6 h-6 text-black" />
                            </div>
                            <div>
                                <h3 className="font-serif font-bold text-lg mb-2">Made for real homes</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">
                                    Designed to complement your life, not overpower it. Colors and textures that bring warmth.
                                </p>
                            </div>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-white p-8 border border-gray-100 shadow-sm flex items-start space-x-6">
                            <div className="bg-gray-50 p-3 rounded-full">
                                <ShieldCheck className="w-6 h-6 text-black" />
                            </div>
                            <div>
                                <h3 className="font-serif font-bold text-lg mb-2">Quality over quantity</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">
                                    Archival grade materials ensure your art stays beautiful for generations.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Work Grid */}
            <section className="py-24 px-4 bg-[#faf9f6]">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="font-serif text-5xl mb-6">Our Work</h2>
                        <p className="text-gray-500 max-w-2xl mx-auto">
                            Our collections bring together historical works and modern abstract pieces creating soulful combinations. Created in collaboration with independent artists and museums. Each piece is chosen for texture, composition, and emotional weight — not for mass appeal. The result? Art to be lived with, not just watched.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
                        {[
                            "/images/unsplash_MO5qO9xpZhA.png",
                            "/images/unsplash_nimElTcTNyY.png",
                            "/images/643677baed1627ea77898fb7_product-hover01.jpg (1).png",
                            "/images/64367be6649ff0cc7ac9a7b4_product-hover03.jpg (1).png",
                            "/images/64367be6649ff0cc7ac9a7b4_product-hover03.jpg (2).png",
                            "/images/64367be6649ff0cc7ac9a7b4_product-hover03.jpg (3).png",
                            "/images/unsplash_MO5qO9xpZhA (1).png",
                            "/images/unsplash_nimElTcTNyY (1).png",
                            "/images/643677baed1627ea77898fb7_product-hover01.jpg.png"
                        ].map((src, idx) => (
                            <div key={idx} className="relative aspect-square bg-gray-200 group overflow-hidden">
                                <Image
                                    src={src}
                                    alt={`Work ${idx}`}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Conscious Choices Section */}
            <section className="py-24 px-6 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="relative aspect-square md:aspect-[4/3] order-2 lg:order-1">
                        <Image
                            src="/images/unsplash_nimElTcTNyY (2).png" // Large landscape/colorful
                            alt="Landscape"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <span className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-4 block">Our Vision</span>
                        <h2 className="font-serif text-4xl md:text-5xl leading-tight mb-6">
                            A world where every wardrobe tells a story of conscious choices
                        </h2>
                        <p className="text-gray-500 leading-relaxed mb-8">
                            In 2024, we started with a simple idea: Art doesn't have to be distant. It can be intimate, personal, and part of your daily ritual. By curating pieces that resonate on a deeper level, we hope to inspire a life lived with intention.
                        </p>
                    </div>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="bg-[#f2f0ea] py-32 px-4 text-center">
                <div className="max-w-4xl mx-auto">
                    <h2 className="font-serif text-3xl md:text-5xl text-[#1a1a1a] mb-6">
                        Find art that belongs with you
                    </h2>
                    <p className="text-gray-500 mb-10">
                        Curated for spaces designed to be lived in, naturally. From our studio to yours.
                    </p>
                    <Link href="/shop" className="bg-white border border-black px-10 py-4 text-xs font-bold uppercase tracking-widest inline-block hover:bg-black hover:text-white transition-colors">
                        Explore Collection
                    </Link>
                </div>
            </section>

            <Footer />
        </main>
    );
}
