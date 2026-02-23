"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CheckCircle, ShieldCheck, Heart, User } from "lucide-react";

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-[#faf9f6]">
            {/* Navbar is absolute transparent/floating, sitting over the hero */}
            <Navbar />

            {/* Hero Section */}
            <section className="bg-[#9B9692] text-white min-h-screen flex items-center relative overflow-hidden pt-20">
                <Image
                    src="/images/unsplash_MO5qO9xpZhA (1).png"
                    alt="About Studio Background"
                    fill
                    className="object-cover object-right opacity-100 z-0"
                    priority
                />
                {/* Overlay if needed for contrast, though the image might be dark enough or we can adjust opacity */}
                <div className="absolute inset-0 bg-black/30 z-0" />

                <div className="max-w-7xl mx-auto px-4 w-full flex flex-col justify-center items-start text-left relative z-10 h-full min-h-[400px]">
                    <div>
                        <h1 className="font-serif font-semibold text-[42px] md:text-[60px] lg:text-[96px] leading-[1.1] lg:leading-[120px] tracking-tight md:tracking-[4.8px] text-white mb-6 drop-shadow-lg">
                            About the<br /> Studio
                        </h1>
                        <p className="font-sans font-normal text-[16px] md:text-[20px] lg:text-[24px] leading-[1.5] lg:leading-[39px] text-white max-w-[783px] drop-shadow-md">
                            We curate and create art that belongs in real spaces not just on walls, but in everyday life.
                        </p>
                    </div>
                </div>
            </section>

            {/* Art Thoughtfully Chosen Section */}
            <section className="py-16 md:py-24 px-4 bg-[#faf9f6]">
                <div className="max-w-[1400px] mx-auto text-center">
                    <h2 className="font-serif font-normal text-[32px] md:text-[48px] leading-tight md:leading-[60px] text-[#2A2A2A] mb-8 md:mb-[50px]">Art, thoughtfully chosen</h2>
                    <div className="relative w-full max-w-[1280px] aspect-[16/9] md:h-[395px] mx-auto mb-8 md:mb-[50px] overflow-hidden">
                        <Image
                            src="/images/454691cbcf505d10646bffa5c5a9cbbf3fd0b032.jpg"
                            alt="Textured Art Details"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <p className="font-sans font-light text-[18px] md:text-[24px] leading-relaxed md:leading-[45px] text-[#2A2A2A] max-w-[1280px] mx-auto text-center px-2">
                        We believe art should be personal. Every piece in our collection is selected for its ability to live with you — to grow familiar, to be loved in, and to quietly shape the atmosphere of a space. We focus on balance, texture, and emotion rather than trends. Art that stays relevant long after the first impression.
                    </p>
                </div>
            </section>

            {/* What Makes Us Different */}
            <section className="py-24 px-4 max-w-7xl mx-auto bg-[#faf9f6]">
                <h2 className="font-serif text-4xl text-center text-[#1a1a1a] mb-20">What Makes Us Different</h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] w-full max-w-md mx-auto">
                        <Image
                            src="/images/b42b8b0262c2e91f1cf84d86d670d9998592af71.jpg"
                            alt="Classical Art"
                            fill
                            className="object-cover sepia-[.25]"
                        />
                    </div>


                    <div className="space-y-6">
                        {/* Feature 1 */}
                        <div className="bg-white p-8 border border-gray-100 shadow-sm flex items-start space-x-6">
                            <div className="relative w-[42px] h-[42px] shrink-0">
                                <Image src="/images/Frame 2121453497.svg" alt="Icon" fill className="object-contain" />
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
                            <div className="relative w-[42px] h-[42px] shrink-0">
                                <Image src="/images/Frame 2121453498.svg" alt="Icon" fill className="object-contain" />
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
                            <div className="relative w-[42px] h-[42px] shrink-0">
                                <Image src="/images/Frame 2121453499.svg" alt="Icon" fill className="object-contain" />
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
                <div className="max-w-[1400px] mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="font-serif text-[32px] md:text-[48px] leading-tight text-[#2A2A2A] mb-6 md:mb-10">Our Work</h2>
                        <p className="font-sans font-light text-[18px] md:text-[24px] leading-relaxed md:leading-[45px] text-[#2A2A2A] max-w-[1280px] mx-auto mb-10 md:mb-16 px-2">
                            Our collections bring together original artworks and carefully crafted reproductions, created in collaboration with independent artists and designers. Each piece is chosen for its tone, composition, and emotional weight — not for mass appeal. This is art meant to be lived with, not rushed through.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[54px] max-w-[1280px] mx-auto">
                        {[
                            { src: "/images/454691cbcf505d10646bffa5c5a9cbbf3fd0b032.jpg", title: "Wood Wick Candle" },
                            { src: "/images/unsplash_nimElTcTNyY.png", title: "Jelly Gel Candles" },
                            { src: "/images/643677baed1627ea77898fb7_product-hover01.jpg (1).png", title: "Jelly Gel Candles" },
                            { src: "/images/64367be6649ff0cc7ac9a7b4_product-hover03.jpg (1).png", title: "Botanical Print" },
                            { src: "/images/64367be6649ff0cc7ac9a7b4_product-hover03.jpg (2).png", title: "Abstract Art" },
                            { src: "/images/64367be6649ff0cc7ac9a7b4_product-hover03.jpg (3).png", title: "Modern Canvas" }
                        ].map((item, idx) => (
                            <div key={idx} className="group cursor-pointer">
                                <div className="relative aspect-square bg-gray-200 overflow-hidden mb-4">
                                    <Image
                                        src={item.src}
                                        alt={item.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                                    />
                                </div>
                                <h3 className="font-serif text-[20px] text-[#2A2A2A] text-left">{item.title}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {/* Conscious Choices Section */}
            <section className="py-24 px-6 max-w-7xl mx-auto overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="relative aspect-square md:aspect-[4/3] order-2 lg:order-1 bg-gray-100 overflow-hidden">
                        <Image
                            src="/images/4912b085f3bb8c4501670720da51c32e4c462746.jpg"
                            alt="Landscape"
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover"
                            priority
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <span className="font-sans text-xs font-bold tracking-widest uppercase text-gray-400 mb-4 block">OUR VISION</span>
                        <h2 className="font-serif font-semibold text-[32px] md:text-[48px] leading-tight text-[#2A2A2A] mb-6">
                            A world where every wardrobe tells a story of conscious choices
                        </h2>
                        <p className="font-sans font-normal text-[16px] leading-relaxed text-[#2A2A2A]">
                            By 2030, we envision Fexco as a catalyst for industry-wide change. We're not just building a brand—we're nurturing a movement where transparency is standard, sustainability is non-negotiable, and quality outlasts trends.
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
        </main >
    );
}
