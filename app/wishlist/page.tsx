"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Trash2, ShoppingBag, Check } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

export default function WishlistPage() {
    const { wishlist } = useWishlist();

    return (
        <main className="min-h-screen bg-[#Fdfdfd]">
            <Navbar variant="light" />

            <div className="pt-32 pb-16 px-4 max-w-7xl mx-auto">
                <h1 className="font-serif text-4xl mb-8 text-center text-gray-900">Your Wishlist</h1>

                {wishlist.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {wishlist.map((item) => (
                            <WishlistItem key={item.id} item={item} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-gray-500 mb-4">Your wishlist is empty.</p>
                        <Link href="/shop" className="underline text-black hover:text-gray-700">Continue Shopping</Link>
                    </div>
                )}
            </div>

            <Footer />
        </main>
    );
}

function WishlistItem({ item }: { item: any }) {
    const { removeFromWishlist } = useWishlist();
    const { addToCart } = useCart();
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCart = () => {
        addToCart({
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            quantity: 1,
            size: "A3" // Default size
        });
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <div className="group relative">
            <div className="relative aspect-[3/4] overflow-hidden mb-4 bg-gray-100">
                <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                />
                <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="absolute top-2 right-2 bg-white p-2 rounded-full hover:bg-red-50 hover:text-red-500 transition-colors shadow-sm"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>
            <h3 className="font-serif text-lg text-gray-900">{item.name}</h3>
            <p className="text-sm text-gray-500 mb-4">$ {item.price.toFixed(2)}</p>
            <button
                onClick={handleAddToCart}
                disabled={isAdded}
                className={`w-full py-2 text-sm font-medium flex items-center justify-center gap-2 transition-all duration-300 ${isAdded
                        ? "bg-green-600 text-white"
                        : "bg-black text-white hover:bg-gray-800"
                    }`}
            >
                {isAdded ? (
                    <>
                        <Check className="w-4 h-4" /> Added
                    </>
                ) : (
                    <>
                        <ShoppingBag className="w-4 h-4" /> Add to Cart
                    </>
                )}
            </button>
        </div>
    );
}
