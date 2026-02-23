"use client";

import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Image from "next/image";

interface Section {
    id: string;
    title: string;
    content: React.ReactNode;
}

interface LegalPageLayoutProps {
    title: string;
    subtitle: string;
    lastUpdated: string;
    bannerImage: string;
    sections: Section[];
}

const LegalPageLayout: React.FC<LegalPageLayoutProps> = ({
    title,
    subtitle,
    lastUpdated,
    bannerImage,
    sections,
}) => {
    return (
        <main className="min-h-screen bg-[#F9F9F7] text-[#1A1A1A]">
            <Navbar variant="light" />

            {/* Header Section */}
            <div className="pt-32 pb-16 px-6 max-w-7xl mx-auto text-center">
                <h1 className="font-serif text-[48px] mb-8 text-gray-900 leading-[0.9] tracking-tight">
                    {title}
                </h1>
                <p className="text-xl text-gray-500 mb-2 font-medium tracking-tight">
                    {subtitle}
                </p>
                <p className="text-[11px] text-gray-400 mb-20 uppercase tracking-[0.4em] font-bold">
                    {lastUpdated}
                </p>

                <div className="relative w-full aspect-[21/9] rounded-sm overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] mb-32 group">
                    <Image
                        src={bannerImage}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-[2s] group-hover:scale-110"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-all duration-1000"></div>
                </div>

                {/* Layout Grid */}
                <div className="flex flex-col lg:flex-row gap-32 text-left px-4 lg:px-16">
                    {/* Sidebar */}
                    <aside className="lg:w-1/5">
                        <div className="sticky top-32">
                            <h2 className="text-[11px] uppercase tracking-[0.4em] font-black text-gray-200 mb-10 px-1 border-b border-gray-100 pb-4">
                                Contents
                            </h2>
                            <nav className="flex flex-col gap-5">
                                {sections.map((section) => (
                                    <a
                                        key={section.id}
                                        href={`#${section.id}`}
                                        className="group flex items-center gap-4 text-[13px] uppercase tracking-widest text-gray-400 hover:text-black transition-all duration-500"
                                    >
                                        <span className="w-0 h-[1px] bg-black group-hover:w-6 transition-all duration-500 origin-left"></span>
                                        <span className="group-hover:translate-x-1 transition-transform duration-500 font-bold">
                                            {section.title}
                                        </span>
                                    </a>
                                ))}
                            </nav>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <div className="lg:w-4/5 space-y-32 pb-48">
                        {sections.map((section) => (
                            <section key={section.id} id={section.id} className="scroll-mt-32">
                                <h2 className="font-serif text-5xl text-gray-900 mb-10 leading-tight">
                                    {section.title}
                                </h2>
                                <div className="text-gray-500 leading-[1.8] space-y-8 text-[19px] font-light lg:pr-32 text-justify">
                                    {section.content}
                                </div>
                            </section>
                        ))}

                        {/* Contact Box */}
                        <div className="p-20 bg-white border border-gray-100 rounded-sm shadow-[0_40px_80px_-20px_rgba(0,0,0,0.03)] relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[#F9F9F7] rounded-bl-full opacity-30 -mr-32 -mt-32"></div>
                            <h2 className="font-serif text-4xl text-gray-900 mb-8">Contact Information</h2>
                            <p className="text-gray-400 mb-12 text-xl font-light max-w-2xl">If you have any questions about these policies, our legal team is available to assist you in preserving the integrity of your collection.</p>
                            <div className="grid md:grid-cols-2 gap-16">
                                <div className="flex flex-col gap-4">
                                    <span className="text-[10px] uppercase tracking-[0.5em] text-gray-300 font-black">Electronic Mail</span>
                                    <a href="mailto:legal@artecommerce.com" className="text-black text-2xl font-serif border-b border-black/10 hover:border-black w-fit transition-all pb-2">
                                        legal@artecommerce.com
                                    </a>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <span className="text-[10px] uppercase tracking-[0.5em] text-gray-300 font-black">Global Headquarters</span>
                                    <p className="text-black font-serif text-2xl leading-snug">123 Art Avenue, Louvre District, Paris, France</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
};

export default LegalPageLayout;
