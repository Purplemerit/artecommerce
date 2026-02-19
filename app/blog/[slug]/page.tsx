"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Calendar, User, Share2, MessageSquare } from "lucide-react";
import { useParams } from "next/navigation";

import { blogPosts } from "../../data/blog";

export default function BlogPost() {
    const params = useParams();
    const slug = params?.slug;
    const post = blogPosts.find(p => p.slug === slug);

    if (!post) {
        return (
            <main className="min-h-screen bg-[#FDFCF8] flex items-center justify-center">
                <div className="text-center">
                    <h1 className="font-serif text-4xl mb-4">Post not found</h1>
                    <Link href="/blog" className="text-black underline">Back to blog</Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#FDFCF8]">
            <Navbar variant="light" />

            <article className="pt-32 pb-24">
                {/* Hero Header */}
                <div className="max-w-[1000px] mx-auto px-6 mb-12 text-center">
                    <Link href="/blog" className="inline-flex items-center text-sm font-bold text-gray-400 hover:text-black mb-12 uppercase tracking-[0.2em] transition-colors">
                        <ChevronLeft className="w-4 h-4 mr-2" /> Back to blog
                    </Link>
                    <div className="flex items-center justify-center gap-6 mb-8 text-[12px] text-gray-400 font-medium uppercase tracking-widest">
                        <span className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
                        <span className="flex items-center gap-2"><User className="w-3.5 h-3.5" /> {post.author}</span>
                    </div>
                    <h1 className="font-serif text-[40px] md:text-[60px] leading-tight text-[#2A2A2A] mb-8">
                        {post.title}
                    </h1>
                    <div className="flex items-center justify-center gap-4">
                        <span className="px-4 py-1.5 bg-black text-white text-[10px] font-bold uppercase tracking-widest rounded-full">{post.category}</span>
                        <div className="flex gap-2">
                            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors"><Share2 className="w-4 h-4" /></button>
                            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors"><MessageSquare className="w-4 h-4" /></button>
                        </div>
                    </div>
                </div>

                {/* Main Image */}
                <div className="max-w-[1200px] mx-auto px-6 mb-16">
                    <div className="relative aspect-[21/9] w-full overflow-hidden rounded-sm">
                        <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>

                {/* Content */}
                <div className="max-w-[800px] mx-auto px-6">
                    <div
                        className="prose prose-lg font-sans text-gray-700 leading-relaxed space-y-8"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    {/* Footer / Tags */}
                    <div className="mt-20 pt-12 border-t border-gray-100">
                        <div className="flex flex-wrap gap-4 items-center">
                            <span className="text-[12px] font-bold uppercase tracking-widest text-[#2A2A2A]">Tags:</span>
                            <span className="text-[12px] text-gray-400 hover:text-black cursor-pointer">#{post.category.replace(/\s+/g, '')}</span>
                            <span className="text-[12px] text-gray-400 hover:text-black cursor-pointer">#ArtGuide</span>
                        </div>
                    </div>
                </div>
            </article>

            <Footer />
        </main>
    );
}
