"use client";

import { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Star, Heart, Check, Plus, Minus, Share2, ChevronLeft, ChevronRight, ChevronUp, ChevronDown, ShoppingBag, CreditCard } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useProducts } from "../../context/ProductContext";
import { getProductImage } from "../../data/products";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState("A3");
    const [isAdded, setIsAdded] = useState(false);
    const { addToCart } = useCart();
    const { addToWishlist, isInWishlist } = useWishlist();

    // Use Context for Data
    const { getProduct, products, loading } = useProducts();

    const productId = Number(id);
    const product = getProduct(productId);

    // Prepare data for hooks (safe fallbacks)
    const images = product?.images || [];
    const displayImages = images.length > 0 ? images : ["/images/unsplash_nimElTcTNyY.png"];

    // Hook (Always called)
    const [mainImage, setMainImage] = useState(displayImages[0]);

    // Simple effect to reset main image if the current mainImage isn't in the new list (Sync state)
    if (product && !displayImages.includes(mainImage)) {
        setMainImage(displayImages[0]);
    }

    // Related products (exclude current)
    const relatedProducts = products.filter(p => p.id !== productId).slice(0, 4);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center font-serif text-xl">Loading Product...</div>;
    }

    if (!product) {
        return (
            <main className="min-h-screen bg-[#fff] flex items-center justify-center">
                <div className="text-center">
                    <Navbar variant="light" />
                    <h1 className="text-2xl font-serif mt-20">Product Not Found</h1>
                    <Link href="/shop" className="text-sm underline mt-4 block">Back to Shop</Link>
                </div>
            </main>
        );
    }



    const handleAddToCart = () => {
        addToCart({
            id: productId,
            name: product.name,
            price: product.price,
            image: getProductImage(mainImage),
            quantity: quantity,
            size: selectedSize
        });
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    const handleBuyNow = () => {
        addToCart({
            id: productId,
            name: product.name,
            price: product.price,
            image: getProductImage(mainImage),
            quantity: quantity,
            size: selectedSize
        });
        router.push("/checkout");
    };

    return (
        <main className="min-h-screen bg-[#fff] text-[#1a1a1a]">
            {/* Navbar background wrapper */}
            <div className="bg-white border-b border-gray-100">
                <Navbar variant="light" />
            </div>

            {/* Breadcrumb */}
            <div className="pt-24 px-4 max-w-[1400px] mx-auto text-[11px] uppercase tracking-wide text-gray-400 mb-6 flex items-center space-x-2 font-medium">
                <Link href="/shop" className="hover:text-black transition-colors">All products</Link> <span>{">"}</span>
                <Link href="/shop" className="hover:text-black transition-colors">{product.type || "Art"}</Link> <span>{">"}</span>
                <span className="text-black">{product.name}</span>
            </div>

            {/* Product Section */}
            <section className="px-4 max-w-[1400px] mx-auto mb-20">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Left: Images Gallery */}
                    <div className="w-full lg:w-[60%] flex gap-4">
                        {/* Thumbnails - Left Vertical Strip */}
                        <div className="hidden md:flex flex-col gap-3 w-20 flex-shrink-0">
                            {displayImages.map((img, idx) => (
                                <div
                                    key={idx}
                                    className={`relative w-full aspect-[4/5] bg-gray-50 cursor-pointer border hover:border-black transition-all ${mainImage === img ? 'border-black' : 'border-transparent'}`}
                                    onMouseEnter={() => setMainImage(img)}
                                >
                                    <Image src={getProductImage(img)} alt={`Thumbnail ${idx}`} fill className="object-cover" />
                                </div>
                            ))}
                        </div>

                        {/* Main Image */}
                        <div className="flex-1 relative bg-gray-50 aspect-[4/5] max-h-[800px]">
                            <Image
                                key={mainImage}
                                src={getProductImage(mainImage)}
                                alt={product.name}
                                fill
                                className="object-contain p-4"
                                priority
                            />
                        </div>
                    </div>

                    {/* Right: Details */}
                    <div className="w-full lg:w-[40%] space-y-6 pt-2">
                        <div>
                            <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Brand name</p>
                            <h1 className="font-serif text-3xl text-[#1a1a1a] leading-tight mb-2">
                                {product.name}
                            </h1>

                            {/* Rating */}
                            <div className="flex items-center space-x-2 mb-4">
                                <span className="font-bold text-sm">4.5</span>
                                <div className="flex space-x-0.5">
                                    {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />)}
                                </div>
                            </div>

                            <p className="text-[13px] text-gray-500 leading-relaxed mb-6 line-clamp-2">
                                {product.description}
                            </p>

                            {/* Price */}
                            <div className="flex items-center space-x-3 mb-6">
                                <span className="font-serif text-3xl font-bold">$ {product.price.toFixed(2)}</span>
                                <span className="text-gray-400 line-through text-lg decoration-1">$ {product.oldPrice?.toFixed(2) || (product.price * 1.2).toFixed(2)}</span>
                                <span className="text-red-500 text-[10px] font-bold uppercase tracking-wider border border-red-200 bg-red-50 px-2 py-0.5 rounded-sm">(20% OFF)</span>
                            </div>
                        </div>

                        {/* Size Config */}
                        <div className="pb-6 border-b border-gray-100">
                            <div className="flex justify-between items-center mb-3">
                                <h3 className="text-xs font-bold uppercase">Size</h3>
                            </div>
                            <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                                {["5x7", "A5", "8x10", "A4", "10x12", "A3", "40x50", "16x20", "12x16", "A2", "11x14", "30x40"].map(size => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`py-2 text-[11px] border font-medium transition-all ${selectedSize === size ? 'border-black bg-black text-white' : 'border-gray-200 text-gray-600 hover:border-black'}`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity */}
                        <div className="pb-6">
                            <h3 className="text-xs font-bold uppercase mb-3">Quantity</h3>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center border border-gray-200 w-fit rounded-sm bg-white">
                                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors"><Minus className="w-3 h-3" /></button>
                                    <span className="w-10 text-center font-medium text-sm border-l border-r border-gray-100 h-10 flex items-center justify-center">{quantity}</span>
                                    <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors"><Plus className="w-3 h-3" /></button>
                                </div>
                            </div>
                        </div>

                        {/* Trust Badges - Vertical List like Reference */}
                        <div className="grid grid-cols-2 gap-y-2 text-[11px] text-gray-600 mb-6">
                            <div className="flex items-center space-x-2">
                                <Check className="w-3 h-3 text-green-500" />
                                <span>Hassle Free 7 days Return</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Check className="w-3 h-3 text-green-500" />
                                <span>100% money back guarantee</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Check className="w-3 h-3 text-green-500" />
                                <span>100% original quality Assurance</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Check className="w-3 h-3 text-green-500" />
                                <span>Dispatch ready order, will be within 24h</span>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="space-y-3">
                            <div className="flex gap-3">
                                <button
                                    onClick={() => addToWishlist({
                                        id: productId,
                                        name: product.name,
                                        price: product.price,
                                        image: getProductImage(mainImage)
                                    })}
                                    className="flex-1 py-3 border border-gray-300 flex items-center justify-center space-x-2 hover:border-black font-medium text-xs uppercase tracking-widest transition-colors rounded-sm group"
                                >
                                    <Heart className={`w-4 h-4 transition-colors ${isInWishlist(productId) ? "fill-red-500 text-red-500" : "group-hover:text-red-500"}`} />
                                    <span>{isInWishlist(productId) ? "Wishlisted" : "Add to Wishlist"}</span>
                                </button>
                                <button
                                    onClick={handleAddToCart}
                                    disabled={isAdded}
                                    className={`flex-1 py-3 border border-gray-300 flex items-center justify-center space-x-2 font-medium text-xs uppercase tracking-widest transition-all rounded-sm group ${isAdded ? 'bg-black text-white border-black' : 'hover:border-black'}`}
                                >
                                    {isAdded ? (
                                        <>
                                            <Check className="w-4 h-4" />
                                            <span>Added!</span>
                                        </>
                                    ) : (
                                        <>
                                            <ShoppingBag className="w-4 h-4 group-hover:text-black transition-colors" />
                                            <span>Add to Cart</span>
                                        </>
                                    )}
                                </button>
                            </div>
                            <button
                                onClick={handleBuyNow}
                                className="w-full py-4 bg-[#232323] text-white hover:bg-black font-bold text-sm uppercase tracking-widest transition-colors flex items-center justify-center space-x-2 rounded-sm"
                            >
                                <CreditCard className="w-4 h-4" />
                                <span>Buy Now</span>
                            </button>
                        </div>

                        {/* Payment Icons */}
                        <div className="flex flex-wrap gap-2 pt-4 justify-start opacity-80">
                            {/* Icons (Keeping SVG content same as original for brevity in thought, but reproducing in file) */}
                            {/* AWS / Amazon Pay */}
                            <div className="w-14 h-9 bg-[#f5f5f5] border border-[#e5e5e5] rounded flex items-center justify-center transition-opacity hover:opacity-100">
                                <span className="font-bold text-[#232f3e] text-xs flex flex-col items-center leading-none relative top-0.5">
                                    aws
                                    <svg viewBox="0 0 100 20" className="w-8 h-2 mt-0.5 fill-[#ff9900]">
                                        <path d="M19.9,3.7c-5.7,0.8-9.4,3.7-9.4,7.8c0,4.6,4.6,6.3,9.4,5.4c3.4-0.6,6.3-2.6,8.2-5.4l-1.6-1.3c-1.3,2-3.4,3.5-5.9,4c-2.4,0.5-5.2-0.3-5.2-3c0-1.8,1.3-3.1,4.2-3.6 l5.2-0.9c4.3-0.7,5.9-2.9,5.9-5.1c0-2.8-2.6-5-8.5-4.8c-3.1,0.1-6.1,1.1-8.2,2.8l1.4,1.4c1.8-1.4,4.2-2.2,6.7-2.3 c3.2-0.1,4.9,1.1,4.9,2.6c0,1.3-0.9,2.2-3.1,2.6L19.9,3.7z" />
                                    </svg>
                                </span>
                            </div>
                            <div className="w-14 h-9 bg-[#f5f5f5] border border-[#e5e5e5] rounded flex items-center justify-center transition-opacity hover:opacity-100">
                                <span className="font-bold text-gray-700 text-xs">Visa</span>
                            </div>
                            <div className="w-14 h-9 bg-[#f5f5f5] border border-[#e5e5e5] rounded flex items-center justify-center transition-opacity hover:opacity-100">
                                <span className="font-bold text-gray-700 text-xs">PayPal</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Description & Reviews Section - Below Fold */}
            <section className="px-4 max-w-[1400px] mx-auto mb-24">
                <div className="border-t border-gray-200 pt-10">
                    <h3 className="font-serif text-xl font-bold text-[#1a1a1a] mb-6">Product description</h3>
                    <div className="text-xs text-gray-500 space-y-2 leading-relaxed max-w-2xl bg-gray-50 p-6 rounded-sm">
                        <p>{product.description}</p>
                        <p className="mt-4">Material: Premium finish. Handcrafted excellence.</p>
                    </div>

                    <div className="mt-12">
                        <h3 className="font-serif text-xl font-bold text-[#1a1a1a] mb-6">Reviews</h3>
                        <div className="space-y-4 max-w-2xl">
                            {[1, 2, 3].map((r, i) => (
                                <div key={i} className="border-b border-gray-50 pb-4 last:border-0">
                                    <p className="text-xs italic text-gray-600 mb-1">“ The quality exceeded my expectations. ”</p>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-[10px] font-bold">5.0</span>
                                        <div className="flex">
                                            {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" />)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* You May Also Like */}
            <section className="py-20 px-4 bg-[#faf9f6]">
                <div className="max-w-[1400px] mx-auto">
                    <h2 className="font-serif text-3xl text-center mb-16">You May Also Like</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {relatedProducts.map((item) => (
                            <Link href={`/product/${item.id}`} key={item.id} className="group cursor-pointer block">
                                <div className="relative aspect-square mb-4 bg-gray-200 overflow-hidden">
                                    <Image src={getProductImage(item.images[0])} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                                    <div className="absolute bottom-0 left-0 w-full bg-white/90 py-3 text-center translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                        <span className="text-xs font-bold uppercase tracking-widest">Quick View</span>
                                    </div>
                                </div>
                                <h3 className="font-serif text-lg mb-1 group-hover:underline decoration-1 underline-offset-4">{item.name}</h3>
                                <p className="text-sm text-gray-500 font-medium">$ {item.price.toFixed(2)} USD</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
