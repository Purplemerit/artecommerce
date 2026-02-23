"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";
import { useState } from "react";
import { Plus, Minus, Search, MessageCircle, Truck, RefreshCw, CreditCard, ShieldCheck } from "lucide-react";
import { getProductImage } from "../data/products";

const faqs = [
    {
        category: "Ordering & Shipping",
        icon: <Truck className="w-5 h-5" />,
        items: [
            {
                question: "What are your shipping rates?",
                answer: "We offer flat-rate shipping worldwide. Standard shipping within the US is $10, and international shipping starts at $25. Free shipping is available on orders over $200."
            },
            {
                question: "How long will it take to receive my order?",
                answer: "Physical artworks are typically processed within 2-3 business days. Domestic shipping takes 3-7 business days, while international shipping can take 10-21 business days depending on the destination."
            },
            {
                question: "Do you offer digital downloads?",
                answer: "Yes, many of our pieces are available as instant digital downloads. Once purchased, you'll receive a high-resolution file in your account and via email."
            }
        ]
    },
    {
        category: "Payments & Security",
        icon: <CreditCard className="w-5 h-5" />,
        items: [
            {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and Razorpay for our international customers."
            },
            {
                question: "Is my payment information secure?",
                answer: "Absolutely. We use industry-standard SSL encryption and never store your full credit card details on our servers. All payments are processed through secure, PCI-compliant payment gateways."
            }
        ]
    },
    {
        category: "Returns & Exchanges",
        icon: <RefreshCw className="w-5 h-5" />,
        items: [
            {
                question: "What is your return policy?",
                answer: "We want you to love your art. If you're not completely satisfied, you can return physical artworks within 14 days of receipt for a full refund or exchange. Digital downloads are non-refundable."
            },
            {
                question: "What if my item arrives damaged?",
                answer: "Please inspect your order upon receipt. If an item is damaged during transit, contact us immediately with photos of the damage, and we will arrange for a replacement or full refund."
            }
        ]
    },
    {
        category: "Artistic Details",
        icon: <ShieldCheck className="w-5 h-5" />,
        items: [
            {
                question: "Are the artworks signed?",
                answer: "Most of our original pieces are signed and numbered by the artist. Prints and digital collections come with a digital certificate of authenticity."
            },
            {
                question: "Do you take commissions?",
                answer: "Yes! Adolf Artwork occasionally accepts custom commissions. Please contact us via the support form with your ideas and requirements."
            }
        ]
    }
];

export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState<string | null>("Ordering & Shipping-0");
    const [searchQuery, setSearchQuery] = useState("");

    const toggleAccordion = (id: string) => {
        setOpenIndex(openIndex === id ? null : id);
    };

    return (
        <main className="min-h-screen bg-[#Fdfdfd]">
            <Navbar variant="light" />

            {/* Hero Section */}
            <div className="relative pt-48 pb-32 px-4 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/images/unsplash_MO5qO9xpZhA.png"
                        alt="Support Background"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm"></div>
                </div>

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-bold mb-4 block">Help Center</span>
                    <h1 className="font-serif text-5xl md:text-7xl mb-8 text-gray-900 leading-tight">Your questions, <br />answered.</h1>
                    <p className="text-lg text-gray-600 mb-12 max-w-xl mx-auto leading-relaxed">
                        Find everything you need to know about collecting, shipping, and caring for your Adolf Artwork acquisitions.
                    </p>

                    <div className="relative max-w-2xl mx-auto">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="How can we assist you today?"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-14 pr-6 py-5 bg-white border border-gray-100 rounded-sm focus:outline-none focus:border-black shadow-xl transition-all text-gray-900 placeholder:text-gray-400"
                        />
                    </div>
                </div>
            </div>

            {/* FAQ Sections */}
            <div className="py-24 px-4 max-w-4xl mx-auto">
                <div className="space-y-16">
                    {faqs.map((group) => {
                        const filteredItems = group.items.filter(item =>
                            item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.answer.toLowerCase().includes(searchQuery.toLowerCase())
                        );

                        if (filteredItems.length === 0) return null;

                        return (
                            <div key={group.category}>
                                <div className="flex items-center gap-3 mb-8 border-b border-gray-100 pb-4">
                                    <div className="text-gray-400">{group.icon}</div>
                                    <h2 className="font-serif text-2xl text-gray-900">{group.category}</h2>
                                </div>
                                <div className="space-y-4">
                                    {filteredItems.map((faq, idx) => {
                                        const id = `${group.category}-${idx}`;
                                        const isOpen = openIndex === id;

                                        return (
                                            <div
                                                key={idx}
                                                className={`border border-gray-100 rounded-sm transition-all ${isOpen ? 'bg-white shadow-md border-gray-200' : 'hover:border-gray-300'}`}
                                            >
                                                <button
                                                    onClick={() => toggleAccordion(id)}
                                                    className="w-full px-6 py-5 flex justify-between items-center text-left"
                                                >
                                                    <span className="font-medium text-gray-900 pr-8">{faq.question}</span>
                                                    {isOpen ? (
                                                        <Minus className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                                    ) : (
                                                        <Plus className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                                    )}
                                                </button>
                                                {isOpen && (
                                                    <div className="px-6 pb-6 text-gray-600 animate-in fade-in slide-in-from-top-2 duration-300">
                                                        <p className="border-t border-gray-100 pt-4 leading-relaxed">
                                                            {faq.answer}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Contact CTA */}
                <div className="mt-32 relative overflow-hidden bg-[#F9F9F7] py-24 px-8 md:px-16 text-center rounded-sm border border-gray-100">
                    {/* Subtle aesthetic glow */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,0,0,0.02)_0%,_transparent_70%)] pointer-events-none" />

                    <div className="relative z-10">
                        <MessageCircle className="w-12 h-12 mx-auto mb-8 text-gray-400 stroke-[1]" />
                        <h3 className="font-serif text-4xl md:text-6xl text-gray-900 mb-8 tracking-tight leading-tight">
                            Still have questions?
                        </h3>
                        <p className="text-gray-500 mb-12 max-w-xl mx-auto text-lg md:text-xl font-light leading-relaxed">
                            Our dedicated support team is available to assist you in preserving the integrity of your collection.
                        </p>
                        <button
                            onClick={() => window.location.href = 'mailto:Info@example.com'}
                            className="bg-black text-white px-12 py-5 text-[11px] font-black uppercase tracking-[0.4em] hover:bg-gray-800 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-xl"
                        >
                            Contact Support
                        </button>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
