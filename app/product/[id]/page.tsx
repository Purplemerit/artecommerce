"use client";

import { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
            {/* Breadcrumb */}
            <div className="pt-[64px] pl-[80px] flex items-center h-[24px] gap-[4px] text-[13px] text-gray-500 font-normal mb-5">
                <Link href="/shop" className="hover:text-black transition-colors shrink-0">All products</Link>
                <ChevronRight className="w-3 h-3 text-gray-400 shrink-0" />
                <Link href="/shop" className="hover:text-black transition-colors shrink-0">{product.type || "Art"}</Link>
                <ChevronRight className="w-3 h-3 text-gray-400 shrink-0" />
                <span className="text-black font-medium truncate">{product.name}</span>
                <ChevronRight className="w-3 h-3 text-gray-400 shrink-0" />
            </div>

            {/* Product Section */}
            <section className="pl-[80px] pr-[80px] w-full mb-20">
                <div className="flex flex-col lg:flex-row gap-[48px] items-start">
                    {/* Left: Images Gallery */}
                    <div className="flex gap-[33px] flex-shrink-0 h-[673px]">
                        {/* Thumbnails - Left Vertical Strip */}
                        <div className="hidden md:flex flex-col gap-[12px] w-[80px] flex-shrink-0">
                            <div className="flex flex-col gap-[12px] overflow-y-auto no-scrollbar" style={{ height: 'calc(673px - 60px)' }}>
                                {displayImages.map((img, idx) => (
                                    <div
                                        key={idx}
                                        className={`relative w-full aspect-[4/5] bg-[#F7F7F7] cursor-pointer border-b-2 transition-all flex-shrink-0 ${mainImage === img ? 'border-black' : 'border-transparent'}`}
                                        onMouseEnter={() => setMainImage(img)}
                                    >
                                        <Image src={getProductImage(img)} alt={`Thumbnail ${idx}`} fill className="object-cover" />
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-col gap-2 mt-auto">
                                <button className="h-[24px] flex items-center justify-center border border-gray-100 bg-[#FBFBFB] hover:bg-gray-50 transition-colors">
                                    <ChevronUp className="w-4 h-4 text-gray-400" />
                                </button>
                                <button className="h-[24px] flex items-center justify-center border border-gray-100 bg-[#FBFBFB] hover:bg-gray-50 transition-colors">
                                    <ChevronDown className="w-4 h-4 text-gray-400" />
                                </button>
                            </div>
                        </div>

                        {/* Main Image */}
                        <div className="relative bg-[#F4F4F4] w-[480px] h-[673px] flex-shrink-0 overflow-hidden">
                            <Image
                                key={mainImage}
                                src={getProductImage(mainImage)}
                                alt={product.name}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>

                    {/* Right: Details */}
                    <div className="flex-1 flex flex-col justify-between min-h-[673px] pt-0">
                        <div className="space-y-6">
                            <div>
                                <p className="text-[14px] text-gray-400 mb-2 font-normal uppercase tracking-wider">{product.category || "Art Collection"}</p>
                                <h1 className="font-serif text-[32px] md:text-[44px] font-medium text-[#2A2A2A] leading-tight mb-3 max-w-[500px]">
                                    {product.name}
                                </h1>

                                <div className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
                                    <span className="font-medium text-black">Masterpiece Gallery</span>
                                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                    <span>{product.sku || `ART-${product.id}00${product.id}`}</span>
                                </div>

                                {/* Rating */}
                                <div className="flex items-center space-x-2 mb-8">
                                    <div className="flex space-x-0.5">
                                        {[1, 2, 3, 4, 5].map(i => <Star key={i} className={`w-4 h-4 ${i <= 4 ? "fill-[#2A2A2A] text-[#2A2A2A]" : "fill-gray-100 text-gray-100"}`} />)}
                                    </div>
                                    <span className="font-medium text-[13px] text-gray-400">(24 Reviews)</span>
                                </div>

                                <p className="text-[15px] font-light text-[#6B6B6B] leading-relaxed mb-10 max-w-[480px]">
                                    {product.description || "Experimental textures and harmonious color palettes define this unique piece. Each artwork is reproduced with museum-grade precision to ensure the longevity of every brushstroke and detail."}
                                </p>

                                {/* Price */}
                                <div className="flex items-baseline space-x-4 mb-10">
                                    <span className="font-serif text-[44px] font-normal text-black">$ {product.price.toFixed(2)}</span>
                                    {product.oldPrice && product.oldPrice > product.price && (
                                        <>
                                            <span className="text-gray-300 line-through text-[20px] decoration-1">$ {product.oldPrice.toFixed(2)}</span>
                                            <span className="text-[#FF4A4A] text-[13px] font-bold">({Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}% OFF)</span>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Size Config */}
                            <div className="space-y-3">
                                <span className="text-[14px] font-medium text-gray-900 block">Size</span>
                                <div className="grid grid-cols-6 gap-2 max-w-[520px]">
                                    {["5x7", "A5", "8x10", "A4", "10x12", "A3", "40x50", "16x20", "12x16", "A2", "11x14", "30x40"].map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`py-3 text-[12px] border transition-all ${selectedSize === size ? 'border-black bg-white text-black font-bold' : 'border-gray-100 text-gray-500 hover:border-gray-300 bg-[#FBFBFB]'}`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Quantity */}
                            <div className="space-y-4">
                                <span className="text-[14px] font-medium text-gray-900 block">Quantity</span>
                                <div className="flex items-center border border-gray-100 w-[140px] rounded-sm bg-[#FBFBFB]">
                                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="flex-1 h-12 flex items-center justify-center hover:bg-gray-100 transition-colors"><Minus className="w-3 h-3" /></button>
                                    <span className="flex-1 text-center font-medium text-sm h-12 flex items-center justify-center">{quantity}</span>
                                    <button onClick={() => setQuantity(quantity + 1)} className="flex-1 h-12 flex items-center justify-center hover:bg-gray-100 transition-colors"><Plus className="w-3 h-3" /></button>
                                </div>
                            </div>

                            {/* Trust Badges */}
                            <div className="grid grid-cols-2 gap-y-4 text-[13px] text-gray-500 max-w-[655px]">
                                <div className="flex items-center space-x-3">
                                    <Check className="w-4 h-4 text-green-500" />
                                    <span>Hassle Free 7 days Return</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Check className="w-4 h-4 text-green-500" />
                                    <span>100% money back guarantee</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Check className="w-4 h-4 text-green-500" />
                                    <span>100% original quality Assurance</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Check className="w-4 h-4 text-green-500" />
                                    <span>Dispatch ready order, will be within 24h</span>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="space-y-4 pt-4">
                            <div className="flex gap-4 h-[56px]">
                                <button
                                    onClick={() => addToWishlist({
                                        id: productId,
                                        name: product.name,
                                        price: product.price,
                                        image: getProductImage(mainImage)
                                    })}
                                    className="flex-1 border border-gray-200 flex items-center justify-center space-x-2 hover:border-black font-medium text-[14px] transition-colors rounded-sm bg-white"
                                >
                                    <Heart className={`w-4 h-4 ${isInWishlist(productId) ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
                                    <span>Add to Wishlist</span>
                                </button>
                                <button
                                    onClick={handleAddToCart}
                                    disabled={isAdded}
                                    className={`flex-1 border border-gray-200 flex items-center justify-center space-x-2 font-medium text-[14px] transition-all rounded-sm ${isAdded ? 'bg-green-50 border-green-200 text-green-600' : 'bg-white hover:border-black'}`}
                                >
                                    {isAdded ? (
                                        <>
                                            <Check className="w-4 h-4" />
                                            <span>Added to Cart</span>
                                        </>
                                    ) : (
                                        <>
                                            <ShoppingBag className="w-4 h-4 text-gray-400" />
                                            <span>Add to Cart</span>
                                        </>
                                    )}
                                </button>
                            </div>
                            <button
                                onClick={handleBuyNow}
                                className="w-full h-[56px] bg-[#1a1a1a] text-white hover:bg-black font-medium text-[15px] transition-colors flex items-center justify-center space-x-3 rounded-sm"
                            >
                                <Heart className="w-4 h-4 fill-white" />
                                <span>Buy Now</span>
                            </button>
                        </div>

                        {/* Payment Icons */}
                        <div className="grid grid-cols-6 gap-2 pt-2">
                            {[
                                { name: 'Amazon', src: '/images/devicon_amazonwebservices.svg' },
                                { name: 'ApplePay', src: '/images/Vector (3).svg' },
                                { name: 'GPay', src: '/images/logos_google-pay.svg' },
                                { name: 'Visa', src: '/images/logos_visa.svg' },
                                { name: 'PayPal', src: '/images/logos_paypal.png' },
                                { name: 'Card', src: '/images/Vector.svg' }
                            ].map((pay) => (
                                <div key={pay.name} className="h-[50px] border border-[#EDEDED] bg-[#F4F4F4] rounded-sm flex items-center justify-center hover:border-gray-300 transition-all cursor-pointer p-2">
                                    <div className="relative w-full h-full flex items-center justify-center">
                                        <Image
                                            src={pay.src}
                                            alt={pay.name}
                                            width={40}
                                            height={24}
                                            className="object-contain max-h-[24px]"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Description & Reviews Section - Below Fold */}
            <section className="pl-[80px] pr-[80px] w-full mb-24">
                <div className="border-t border-gray-100 pt-12 max-w-[1210px]">
                    {/* Product description */}
                    <div className="mb-16">
                        <h2 className="text-[20px] font-medium text-[#1a1a1a] mb-6">Product description</h2>
                        <div className="text-[14px] text-[#757575] font-medium leading-[24px] space-y-0">
                            <p>Product Dimensions : Various sizes available</p>
                            <p>Date First Available : {product.createdAt ? new Date(product.createdAt).toLocaleDateString() : new Date().toLocaleDateString()}</p>
                            <p>Artist Studio : Masterpiece Gallery</p>
                            <p>SKU : {product.sku || "ART-8429-X"}</p>
                            <p>Medium : Fine Art Photography / Digital Art</p>
                            <p>Materials : Museum-grade archival paper, UV-resistant inks</p>
                            <p>Country of Origin : Globally Sourced</p>
                            <p>Department : Wall Decor / Premium Art</p>
                            <p>Packer : Masterpiece Logistics</p>
                            <p>Importer : Local Art Curators</p>
                            <p>Net Quantity : 1 Count</p>
                            <p>Generic Name : Art Print</p>
                            <p className="pt-2">Best Sellers Rank: #386 in Clothing & Accessories (See Top 100 in Clothing & Accessories)</p>
                            <p>#11 in Men's Polos</p>
                        </div>
                    </div>

                    {/* Reviews */}
                    <div>
                        <h2 className="text-[20px] font-medium text-[#1a1a1a] mb-6">Reviews</h2>
                        <div className="space-y-8">
                            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                                <div key={i} className="space-y-1">
                                    <p className="text-[14px] text-[#757575] font-medium leading-[24px]">
                                        “ The quality exceeded my expectations. ”
                                    </p>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-[13px] font-bold text-[#1a1a1a]">4.5</span>
                                        <div className="flex space-x-0.5">
                                            {[1, 2, 3, 4].map(s => <Star key={s} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />)}
                                            <div className="relative">
                                                <Star className="w-3.5 h-3.5 text-gray-200" />
                                                <div className="absolute inset-0 overflow-hidden w-1/2">
                                                    <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                                                </div>
                                            </div>
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {relatedProducts.slice(0, 3).map((item) => (
                            <Link href={`/product/${item.id}`} key={item.id} className="group cursor-pointer block">
                                <div className="relative aspect-square mb-6 bg-gray-100 overflow-hidden rounded-sm">
                                    <Image
                                        src={getProductImage(item.images[0])}
                                        alt={item.name}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                </div>
                                <h3 className="font-serif text-[22px] text-[#1a1a1a] mb-2 group-hover:underline decoration-1 underline-offset-4">{item.name}</h3>
                                <p className="text-[15px] text-gray-500 font-medium">$ {item.price.toFixed(2)} USD</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
