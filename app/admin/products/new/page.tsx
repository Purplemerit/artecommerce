"use client";

import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { useAuth } from "../../../context/AuthContext";
import { useProducts, Product } from "../../../context/ProductContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Check, ChevronLeft, Upload, Loader2, Plus, Info } from "lucide-react";
import Link from "next/link";

export default function NewListingPage() {
    const { isAdmin } = useAuth();
    const { addProduct } = useProducts();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form State (matching the "Ditto Same" requirement)
    const [formData, setFormData] = useState<Partial<Product>>({
        name: "",
        type: "Physical", // Default
        description: "",
        price: 0,
        oldPrice: 0,
        images: [],
        category: "",
        quantity: 1,
        sku: "",
        // Extended attributes mockup
    });

    // Image Upload State
    const [previewImages, setPreviewImages] = useState<string[]>([]);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (!isAdmin) router.push("/login"); // Protection
    }, [isAdmin, router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "number" ? parseFloat(value) : value
        }));
    };

    // Mock Image Upload (User has S3 env but client sidebar upload is complex without API route. 
    // I will simulate upload by using a URL input OR a mock file reader)
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files[0]) {
            setUploading(true);
            // Simulate upload delay
            setTimeout(() => {
                const url = URL.createObjectURL(files[0]); // Blob URL for preview
                setPreviewImages(prev => [...prev, url]);
                setFormData(prev => ({ ...prev, images: [...(prev.images || []), url] })); // In real app, this would be S3 URL
                setUploading(false);
            }, 1000);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Construct standard product object
        const newProduct: Product = {
            id: Date.now(),
            name: formData.name || "Untitled Artwork",
            price: formData.price || 0,
            oldPrice: formData.oldPrice || 0,
            type: formData.type || "Physical",
            description: formData.description || "",
            images: formData.images?.length ? formData.images : ["/images/unsplash_nimElTcTNyY.png"], // Fallback
            quantity: formData.quantity,
            sku: formData.sku,
            category: formData.category
        };

        addProduct(newProduct);

        // Delay for UX
        setTimeout(() => {
            router.push("/admin");
        }, 800);
    };

    if (!isAdmin) return null;

    return (
        <main className="min-h-screen bg-[#Fdfdfd]">
            <Navbar variant="light" />

            <div className="pt-24 pb-24 px-4 max-w-5xl mx-auto">
                <form onSubmit={handleSubmit}>
                    {/* Header */}
                    <div className="flex justify-between items-center mb-8 sticky top-20 bg-[#Fdfdfd] z-30 py-4 border-b border-gray-100">
                        <div className="flex items-center gap-4">
                            <Link href="/admin" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <ChevronLeft className="w-5 h-5" />
                            </Link>
                            <h1 className="font-serif text-3xl text-gray-900">New Listing</h1>
                        </div>
                        <div className="flex gap-4">
                            <button type="button" className="text-sm font-medium text-gray-500 hover:text-black transition-colors">Save Draft</button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-black text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors flex items-center gap-2 disabled:bg-gray-400"
                            >
                                {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Publishing...</> : "Publish"}
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Left Column - Main Form */}
                        <div className="lg:col-span-2 space-y-12">

                            {/* About Section */}
                            <section>
                                <h2 className="font-serif text-2xl mb-6">About</h2>
                                <p className="text-sm text-gray-500 mb-6">Tell the world about your item and why they'll love it.</p>

                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-900">Title</label>
                                        <input
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            type="text"
                                            placeholder="e.g. Abstract Oil Painting on Canvas"
                                            className="w-full p-4 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-black transition-colors bg-white"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-900">Photos</label>
                                        <div className="border-2 border-dashed border-gray-200 rounded-sm p-8 text-center hover:border-black transition-colors bg-gray-50/50">
                                            {previewImages.length > 0 ? (
                                                <div className="grid grid-cols-3 gap-4 mb-4">
                                                    {previewImages.map((src, idx) => (
                                                        <div key={idx} className="relative aspect-square bg-gray-100 rounded-md overflow-hidden">
                                                            <Image src={src} alt="Preview" fill className="object-cover" />
                                                        </div>
                                                    ))}
                                                    <label className="cursor-pointer flex flex-col items-center justify-center aspect-square border-2 border-dashed border-gray-200 rounded-md hover:bg-gray-50">
                                                        <Plus className="w-6 h-6 text-gray-400" />
                                                        <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                                                    </label>
                                                </div>
                                            ) : (
                                                <label className="cursor-pointer block w-full h-full py-8">
                                                    <Upload className="w-8 h-8 mx-auto text-gray-400 mb-3" />
                                                    <span className="text-sm text-gray-600 block">Drag & drop or <span className="text-black underline font-medium">browse</span> to upload</span>
                                                    <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                                                </label>
                                            )}
                                            {uploading && <p className="text-xs text-gray-400 mt-2">Uploading...</p>}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-900">Description</label>
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            rows={6}
                                            placeholder="What makes your item special? Buyers will only see the first few lines unless they expand."
                                            className="w-full p-4 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-black transition-colors bg-white"
                                        />
                                    </div>
                                </div>
                            </section>

                            <hr className="border-gray-100" />

                            {/* Price & Inventory */}
                            <section>
                                <h2 className="font-serif text-2xl mb-6">Price & Inventory</h2>
                                <div className="space-y-6">
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-900">Price (USD)</label>
                                            <input
                                                name="price"
                                                type="number"
                                                value={formData.price}
                                                onChange={handleChange}
                                                className="w-full p-4 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-black transition-colors bg-white"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-900">Quantity</label>
                                            <input
                                                name="quantity"
                                                type="number"
                                                value={formData.quantity}
                                                onChange={handleChange}
                                                className="w-full p-4 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-black transition-colors bg-white"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-900">SKU (Optional)</label>
                                        <input
                                            name="sku"
                                            type="text"
                                            value={formData.sku}
                                            onChange={handleChange}
                                            className="w-full p-4 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-black transition-colors bg-white"
                                        />
                                    </div>
                                </div>
                            </section>

                            <hr className="border-gray-100" />

                            {/* Details (Replicating screenshot fields) */}
                            <section>
                                <h2 className="font-serif text-2xl mb-6">Attributes</h2>
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-900">Category</label>
                                        <select
                                            name="category"
                                            value={formData.category}
                                            onChange={handleChange}
                                            className="w-full p-4 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-black transition-colors bg-white appearance-none"
                                        >
                                            <option value="">Select a category</option>
                                            <option value="Painting">Painting</option>
                                            <option value="Drawing">Drawing</option>
                                            <option value="Sculpture">Sculpture</option>
                                            <option value="Print">Print</option>
                                        </select>
                                    </div>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-900">Material</label>
                                            <input type="text" placeholder="e.g. Oil on Canvas" className="w-full p-4 border border-gray-200 rounded-sm text-sm" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-900">Primary Color</label>
                                            <input type="text" placeholder="e.g. Blue" className="w-full p-4 border border-gray-200 rounded-sm text-sm" />
                                        </div>
                                    </div>
                                </div>
                            </section>

                        </div>

                        {/* Right Column - Settings */}
                        <div className="space-y-8">
                            <div className="bg-white border border-gray-100 p-6 rounded-sm sticky top-32">
                                <h3 className="font-serif text-xl mb-4">Settings</h3>

                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-900">Product Type</label>
                                        <div className="flex gap-4">
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="type"
                                                    value="Physical"
                                                    checked={formData.type === "Physical"}
                                                    onChange={handleChange}
                                                    className="accent-black"
                                                />
                                                <span className="text-sm text-gray-600">Physical</span>
                                            </label>
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="type"
                                                    value="Digital"
                                                    checked={formData.type === "Digital"}
                                                    onChange={handleChange}
                                                    className="accent-black"
                                                />
                                                <span className="text-sm text-gray-600">Digital</span>
                                            </label>
                                        </div>
                                    </div>

                                    <hr className="border-gray-50" />

                                    <div className="flex items-start gap-3">
                                        <Info className="w-4 h-4 text-gray-400 mt-0.5" />
                                        <p className="text-xs text-gray-500 leading-relaxed">
                                            Renewal options:
                                            <span className="block mt-1 font-medium text-gray-900">Automatic</span>
                                            <span className="text-gray-400 block mt-1">($0.20 USD / listing)</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            <Footer />
        </main>
    );
}
