"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";
import { Shield, Lock, Eye, FileText } from "lucide-react";
import { getProductImage } from "../data/products";

export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-[#Fdfdfd]">
            <Navbar variant="light" />

            <div className="pt-32 pb-24 px-4 max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-16 items-center mb-24">
                    <div className="lg:w-1/2">
                        <h1 className="font-serif text-5xl md:text-7xl mb-8 text-gray-900 leading-tight">Privacy <br />Policy</h1>
                        <p className="text-xl text-gray-500 max-w-xl leading-relaxed">
                            At Adolf Artwork, we believe your data is as personal as your art collection. This policy outlines our commitment to protecting your digital footprint.
                        </p>
                        <div className="mt-12 flex gap-8">
                            <div className="flex flex-col items-center">
                                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-3">
                                    <Shield className="w-7 h-7" />
                                </div>
                                <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold">Secure</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="w-14 h-14 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-3">
                                    <Lock className="w-7 h-7" />
                                </div>
                                <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold">Private</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mb-3">
                                    <Eye className="w-7 h-7" />
                                </div>
                                <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold">Transparent</span>
                            </div>
                        </div>
                    </div>
                    <div className="lg:w-1/2 relative h-[500px] w-full rounded-sm overflow-hidden shadow-2xl bg-gray-100">
                        {/* Using standard img for troubleshooting */}
                        <img
                            src="/images/unsplash_nimElTcTNyY.png"
                            alt="Decorative Art"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            className="grayscale hover:grayscale-0 transition-all duration-700"
                        />
                    </div>
                </div>

                <div className="max-w-3xl mx-auto space-y-16 text-gray-700 leading-relaxed">
                    <section>
                        <h2 className="font-serif text-2xl text-gray-900 mb-4 flex items-center gap-3">
                            <FileText className="w-5 h-5 text-gray-400" />
                            1. Introduction
                        </h2>
                        <p>
                            Welcome to Adolf Artwork. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-serif text-2xl text-gray-900 mb-4 flex items-center gap-3">
                            <FileText className="w-5 h-5 text-gray-400" />
                            2. Data We Collect
                        </h2>
                        <p>
                            We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
                        </p>
                        <ul className="list-disc pl-6 mt-4 space-y-2">
                            <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
                            <li><strong>Contact Data</strong> includes billing address, delivery address, email address and telephone numbers.</li>
                            <li><strong>Financial Data</strong> includes bank account and payment card details.</li>
                            <li><strong>Transaction Data</strong> includes details about payments to and from you and other details of products and services you have purchased from us.</li>
                        </ul>
                    </section>

                    <section className="bg-gray-50 p-8 border border-gray-100 rounded-sm">
                        <h2 className="font-serif text-2xl text-gray-900 mb-4">3. How We Use Your Data</h2>
                        <p>
                            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                        </p>
                        <div className="grid md:grid-cols-2 gap-6 mt-6">
                            <div className="bg-white p-4 rounded-sm border border-gray-100 shadow-sm">
                                <h3 className="font-medium text-gray-900 mb-2">Order Fulfillment</h3>
                                <p className="text-sm text-gray-500">To process and deliver your order including managing payments, fees and charges.</p>
                            </div>
                            <div className="bg-white p-4 rounded-sm border border-gray-100 shadow-sm">
                                <h3 className="font-medium text-gray-900 mb-2">Support</h3>
                                <p className="text-sm text-gray-500">To manage our relationship with you which will include notifying you about changes to our terms or privacy policy.</p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="font-serif text-2xl text-gray-900 mb-4 flex items-center gap-3">
                            <FileText className="w-5 h-5 text-gray-400" />
                            4. Data Security
                        </h2>
                        <p>
                            We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-serif text-2xl text-gray-900 mb-4 flex items-center gap-3">
                            <FileText className="w-5 h-5 text-gray-400" />
                            5. Cookies
                        </h2>
                        <p>
                            You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies. If you disable or refuse cookies, please note that some parts of this website may become inaccessible or not function properly.
                        </p>
                    </section>

                    <div className="pt-12 border-t border-gray-100 text-center">
                        <p className="text-sm text-gray-400">
                            Last updated: February 6, 2026
                        </p>
                        <p className="text-sm text-gray-400 mt-2">
                            If you have any questions about this privacy policy, please contact us at <a href="mailto:privacy@art.com" className="text-black underline">privacy@art.com</a>
                        </p>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
