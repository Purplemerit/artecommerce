import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-[#Fdfdfd] pt-16 pb-8 border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <div className="rounded-full border border-black w-10 h-10 flex items-center justify-center font-serif font-bold text-xl">
                            A
                        </div>
                        <p className="text-sm text-gray-600">
                            Subscribe to the Adolf Artwork
                        </p>
                    </div>

                    {/* Pages */}
                    <div>
                        <h3 className="text-sm font-serif font-semibold text-gray-900 mb-4">Pages</h3>
                        <ul className="space-y-3 text-sm text-gray-600">
                            <li><Link href="/" className="hover:text-black">Home</Link></li>
                            <li><Link href="/shop" className="hover:text-black">Shop</Link></li>
                            <li><Link href="/about" className="hover:text-black">About</Link></li>
                            <li><Link href="/privacy" className="hover:text-black">Privacy Policy</Link></li>
                            <li><Link href="/faq" className="hover:text-black">FAQs</Link></li>
                        </ul>
                    </div>

                    {/* Address */}
                    <div>
                        <h3 className="text-sm font-serif font-semibold text-gray-900 mb-4">Address</h3>
                        <div className="space-y-3 text-sm text-gray-600">
                            <p>HS B26, Horton Ford Rd,<br />Eidson, TN, 37731</p>
                            <p><a href="mailto:info@example.com" className="underline">Info@example.com</a></p>
                            <p><a href="tel:+92453260222" className="underline">+9 (245) 326-02-22</a></p>
                        </div>
                    </div>

                    {/* Spacer/Empty col for layout matching */}
                    <div></div>
                </div>

                <div className="mt-16 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center bg-[#Fdfdfd]">
                    <div className="flex items-center space-x-4 mb-4 md:mb-0">
                        <span className="font-serif text-2xl text-gray-800">let&apos;s connect</span>
                        <div className="flex space-x-4">
                            <Facebook className="h-4 w-4 text-gray-600 cursor-pointer hover:text-black" />
                            <Instagram className="h-4 w-4 text-gray-600 cursor-pointer hover:text-black" />
                            <Twitter className="h-4 w-4 text-gray-600 cursor-pointer hover:text-black" />
                            <Youtube className="h-4 w-4 text-gray-600 cursor-pointer hover:text-black" />
                        </div>
                    </div>
                    <div className="text-xs text-gray-500">
                        Designed by <span className="underline">Webestica</span> - Powered by <span className="underline">Webflow</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
