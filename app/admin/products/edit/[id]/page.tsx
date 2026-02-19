"use client";

import { use, useEffect, useState } from "react";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import { useAuth } from "../../../../context/AuthContext";
import { useProducts, Product } from "../../../../context/ProductContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronLeft, Loader2, Plus, Upload, Trash2 } from "lucide-react";
import Link from "next/link";
import { getProductImage } from "../../../../data/products";

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const productId = Number(id);

    const { isAdmin } = useAuth();
    const { getProduct, updateProduct } = useProducts();
    const router = useRouter();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const [formData, setFormData] = useState<Partial<Product>>({});
    const [previewImages, setPreviewImages] = useState<string[]>([]);
    const [uploading, setUploading] = useState(false);

    // Fetch existing data
    useEffect(() => {
        if (!isAdmin) {
            router.push("/login");
            return;
        }

        const product = getProduct(productId);
        if (product) {
            setFormData(product);
            setPreviewImages(product.images || []);
        } else {
            // Product not found
            // router.push("/admin"); 
        }
        setIsLoading(false);
    }, [isAdmin, productId, getProduct, router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "number" ? parseFloat(value) : value
        }));
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setUploading(true);
            try {
                const file = files[0];
                const formData = new FormData();
                formData.append('file', file);

                const response = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData,
                });

                if (response.ok) {
                    const data = await response.json();
                    setPreviewImages(prev => [...prev, data.url]);
                    setFormData(prev => ({ ...prev, images: [...(prev.images || []), data.url] }));
                }
            } catch (error) {
                console.error("Upload failed:", error);
            } finally {
                setUploading(false);
            }
        }
    };

    const removeImage = (index: number) => {
        const newImages = [...previewImages];
        newImages.splice(index, 1);
        setPreviewImages(newImages);
        setFormData(prev => ({ ...prev, images: newImages }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (formData) {
            updateProduct(productId, formData);
        }

        setTimeout(() => {
            router.push("/admin");
        }, 800);
    };

    if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (!formData.name) return <div className="min-h-screen flex items-center justify-center">Product not found</div>;

    return (
        <main className="min-h-screen bg-[#Fdfdfd]">
            <Navbar variant="light" />

            <div className="pt-32 pb-24 px-4 max-w-5xl mx-auto">
                <form onSubmit={handleSubmit}>
                    {/* Header */}
                    <div className="flex justify-between items-center mb-10 py-4 border-b border-gray-100">
                        <div className="flex items-center gap-4">
                            <Link href="/admin" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <ChevronLeft className="w-5 h-5" />
                            </Link>
                            <h1 className="font-serif text-3xl text-gray-900">Edit Listing</h1>
                        </div>
                        <div className="flex gap-4">
                            <button type="button" className="text-sm font-medium text-gray-500 hover:text-black transition-colors" onClick={() => router.push("/admin")}>Cancel</button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-black text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors flex items-center gap-2 disabled:bg-gray-400"
                            >
                                {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : "Save Changes"}
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Left Column */}
                        <div className="lg:col-span-2 space-y-12">

                            {/* About */}
                            <section>
                                <h2 className="font-serif text-2xl mb-6">About</h2>
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-900">Title</label>
                                        <input
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            type="text"
                                            className="w-full p-4 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-black transition-colors bg-white"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-900">Photos</label>
                                        <div className="border-2 border-dashed border-gray-200 rounded-sm p-8 text-center bg-gray-50/50">
                                            <div className="grid grid-cols-3 gap-4 mb-4">
                                                {previewImages.map((src, idx) => (
                                                    <div key={idx} className="relative aspect-square bg-gray-100 rounded-md overflow-hidden group">
                                                        <Image src={getProductImage(src)} alt="Preview" fill className="object-cover" />
                                                        <button
                                                            type="button"
                                                            onClick={() => removeImage(idx)}
                                                            className="absolute top-1 right-1 bg-white/80 p-1 rounded-full text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                                        >
                                                            <Trash2 className="w-3 h-3" />
                                                        </button>
                                                    </div>
                                                ))}
                                                <label className="cursor-pointer flex flex-col items-center justify-center aspect-square border-2 border-dashed border-gray-200 rounded-md hover:bg-gray-50">
                                                    <Plus className="w-6 h-6 text-gray-400" />
                                                    <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-900">Description</label>
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            rows={6}
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
                                </div>
                            </section>

                            <hr className="border-gray-100" />

                            {/* Attributes */}
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
                                </div>
                            </section>

                        </div>

                        {/* Right Column - Settings */}
                        <div className="space-y-8">
                            <div className="bg-white border border-gray-100 p-6 rounded-sm">
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
