"use client";

import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Twitter, Youtube, ArrowRight } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Footer() {
    const pathname = usePathname();

    const handleLinkClick = (href: string) => {
        if (pathname === href) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <footer className="bg-[#EAEAEA] pt-20 pb-10">
            <div className="max-w-[1400px] mx-auto px-6">
                <div className="flex flex-col lg:flex-row justify-between items-start mb-20">
                    {/* Brand / Subscribe */}
                    <div className="flex flex-col items-start gap-6 max-w-xs">
                        <Link href="/" scroll={true} onClick={() => handleLinkClick("/")}>
                            <Image
                                src="/images/logo.svg"
                                alt="Adolf Artwork"
                                width={48}
                                height={48}
                                className="w-12 h-12 object-contain"
                            />
                        </Link>
                        <p className="font-serif text-[20px] text-[#2A2A2A] leading-tight">
                            Subscribe to the Adolf Artwork
                        </p>
                        <form
                            onSubmit={async (e) => {
                                e.preventDefault();
                                const form = e.currentTarget;
                                const email = new FormData(form).get('email');
                                try {
                                    const res = await fetch('/api/newsletter', {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({ email })
                                    });
                                    if (res.ok) {
                                        alert('Thank you for subscribing!');
                                        form.reset();
                                    } else {
                                        alert('Something went wrong. Please try again.');
                                    }
                                } catch (err) {
                                    alert('Failed to connect. Please check your connection.');
                                }
                            }}
                            className="w-full flex"
                        >
                            <input
                                type="email"
                                name="email"
                                placeholder="Email address"
                                className="bg-transparent border-b border-[#2A2A2A] py-2 flex-1 focus:outline-none text-[14px]"
                                required
                            />
                            <button type="submit" className="border-b border-[#2A2A2A] py-2 px-2 hover:opacity-70 transition-opacity">
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </form>
                    </div>

                    {/* Links Columns */}
                    <div className="flex flex-col sm:flex-row gap-12 sm:gap-20 mt-12 lg:mt-0 lg:mr-32">
                        {/* Pages */}
                        <div className="flex flex-col gap-6">
                            <h3 className="font-serif text-[24px] text-[#2A2A2A]">Pages</h3>
                            <ul className="flex flex-col gap-3 font-sans text-[16px] text-[#555]">
                                <li><Link href="/" scroll={true} onClick={() => handleLinkClick("/")} className="hover:text-black hover:underline underline-offset-4 transition-all">Home</Link></li>
                                <li><Link href="/shop" scroll={true} onClick={() => handleLinkClick("/shop")} className="hover:text-black hover:underline underline-offset-4 transition-all">Shop</Link></li>
                                <li><Link href="/about" scroll={true} onClick={() => handleLinkClick("/about")} className="hover:text-black hover:underline underline-offset-4 transition-all">About</Link></li>
                                <li><Link href="/terms" scroll={true} onClick={() => handleLinkClick("/terms")} className="hover:text-black hover:underline underline-offset-4 transition-all">Terms</Link></li>
                                <li><Link href="/privacy" scroll={true} onClick={() => handleLinkClick("/privacy")} className="hover:text-black hover:underline underline-offset-4 transition-all">Privacy Policy</Link></li>
                                <li><Link href="/faq" scroll={true} onClick={() => handleLinkClick("/faq")} className="hover:text-black hover:underline underline-offset-4 transition-all">FAQs</Link></li>
                            </ul>
                        </div>

                        {/* Address */}
                        <div className="flex flex-col gap-6">
                            <h3 className="font-serif text-[24px] text-[#2A2A2A]">Address</h3>
                            <div className="flex flex-col gap-4 font-sans text-[16px] text-[#555]">
                                <p className="leading-relaxed">
                                    HS B26, Horton Ford Rd,<br />
                                    Eidson, TN, 37731
                                </p>
                                <a href="mailto:Info@example.com" className="hover:text-black border-b border-[#555] self-start text-[#555]">
                                    Info@example.com
                                </a>
                                <a href="tel:+92453260222" className="hover:text-black border-b border-[#555] self-start text-[#555]">
                                    +9 (245) 326-02-22
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="w-full h-[1px] bg-[#999] mb-10"></div>

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    {/* Socials */}
                    <div className="flex items-center gap-8">
                        <span className="font-serif text-[32px] text-[#2A2A2A]">let&#39;s connect</span>
                        <div className="flex items-center gap-6">
                            <Facebook className="w-5 h-5 text-[#2A2A2A] hover:opacity-70 cursor-pointer" />
                            <Instagram className="w-5 h-5 text-[#2A2A2A] hover:opacity-70 cursor-pointer" />
                            <Twitter className="w-5 h-5 text-[#2A2A2A] hover:opacity-70 cursor-pointer" />
                            <Youtube className="w-5 h-5 text-[#2A2A2A] hover:opacity-70 cursor-pointer" />
                        </div>
                    </div>

                    {/* Credits */}
                    <p className="font-sans text-[14px] text-[#666]">
                        Designed by <span className="underline decoration-1 underline-offset-2">Webestica</span> - Powered by <span className="underline decoration-1 underline-offset-2">Webflow</span>
                    </p>
                </div>
            </div>
        </footer>
    );
}
