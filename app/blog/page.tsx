"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Calendar, User, ArrowRight } from "lucide-react";

import { blogPosts } from "../data/blog";

const mainBlogPosts = blogPosts.filter(p => !p.slug.includes('evolving'));
const featuredPost = blogPosts.find(p => p.slug === 'evolving-digital-art');

function NewsletterForm() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        setStatus("loading");
        try {
            const res = await fetch("/api/newsletter", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            const data = await res.json();
            if (res.ok) {
                setStatus("success");
                setMessage("Thank you for subscribing!");
                setEmail("");
            } else {
                throw new Error(data.error || "Something went wrong");
            }
        } catch (err: any) {
            setStatus("error");
            setMessage(err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-[600px] mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
                <input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 bg-white/10 border border-white/20 px-6 py-4 text-white focus:outline-none focus:border-white transition-colors"
                />
                <button
                    type="submit"
                    disabled={status === "loading"}
                    className="bg-white text-black px-12 py-4 font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors disabled:opacity-50"
                >
                    {status === "loading" ? "Subscribing..." : "Subscribe"}
                </button>
            </div>
            {message && (
                <p className={`mt-4 text-sm font-medium ${status === "success" ? "text-green-400" : "text-red-400"}`}>
                    {message}
                </p>
            )}
        </form>
    );
}

export default function BlogPage() {
    return (
        <main className="min-h-screen bg-[#FDFCF8]">
            <Navbar variant="light" />

            {/* Header Section */}
            <section className="pt-32 pb-16 px-6 max-w-[1400px] mx-auto text-center">
                <h1 className="font-serif text-[48px] md:text-[64px] text-[#2A2A2A] mb-4">Our Stories</h1>
                <p className="text-[#6B6B6B] max-w-[600px] mx-auto text-lg font-light leading-relaxed">
                    Explore insights, art trends, and stories from the creators behind the masterpieces.
                </p>
            </section>

            {/* Featured Post */}
            <section className="px-6 max-w-[1400px] mx-auto mb-20">
                {featuredPost && (
                    <Link href={`/blog/${featuredPost.slug}`} className="group relative block w-full h-[500px] md:h-[600px] overflow-hidden rounded-sm bg-gray-100">
                        <Image
                            src={featuredPost.image}
                            alt="Featured Post"
                            fill
                            className="object-cover transition-transform duration-1000 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 p-8 md:p-16 text-white max-w-[800px]">
                            <span className="bg-white text-black text-[10px] font-bold px-3 py-1 uppercase tracking-widest mb-6 inline-block">Featured Story</span>
                            <h2 className="font-serif text-[32px] md:text-[48px] leading-tight mb-4">{featuredPost.title}</h2>
                            <p className="text-white/80 text-lg mb-8 font-light max-w-[600px]">{featuredPost.excerpt}</p>
                            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest border-b border-white pb-1 hover:gap-4 transition-all w-fit">
                                Read Full Story <ArrowRight className="w-4 h-4" />
                            </div>
                        </div>
                    </Link>
                )}
            </section>

            {/* Blog Grid */}
            <section className="py-20 px-6 max-w-[1400px] mx-auto mb-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-12 gap-y-20">
                    {mainBlogPosts.map((post) => (
                        <Link href={`/blog/${post.slug}`} key={post.id} className="group cursor-pointer block">
                            <article>
                                <div className="relative aspect-[16/9] w-full overflow-hidden mb-8 bg-gray-100 rounded-sm">
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute top-6 left-6">
                                        <span className="bg-white/90 backdrop-blur-md text-[#2A2A2A] text-[10px] font-bold px-4 py-2 uppercase tracking-widest">
                                            {post.category}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6 mb-4 text-[12px] text-gray-400 font-medium uppercase tracking-widest">
                                    <span className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
                                    <span className="flex items-center gap-2"><User className="w-3.5 h-3.5" /> {post.author}</span>
                                </div>
                                <h3 className="font-serif text-[28px] md:text-[32px] text-[#2A2A2A] mb-4 leading-tight group-hover:underline underline-offset-8 decoration-1">
                                    {post.title}
                                </h3>
                                <p className="text-[#6B6B6B] text-[16px] leading-relaxed mb-6 max-w-[90%]">
                                    {post.excerpt}
                                </p>
                                <div className="text-black text-sm font-bold uppercase tracking-widest flex items-center gap-2 hover:gap-4 transition-all decoration-1 underline decoration-gray-200 underline-offset-8 w-fit">
                                    Read More <ChevronRight className="w-4 h-4" />
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Newsletter section */}
            <section className="py-32 bg-[#2A2A2A] text-white">
                <div className="max-w-[1400px] mx-auto px-6 text-center">
                    <h2 className="font-serif text-[40px] mb-6">Stay Inspired</h2>
                    <p className="text-white/60 max-w-[500px] mx-auto mb-12 text-lg font-light">
                        Join our community of art lovers and get the latest stories, trends, and exclusive drops delivered to your inbox.
                    </p>
                    <NewsletterForm />
                </div>
            </section>

            <Footer />
        </main>
    );
}
