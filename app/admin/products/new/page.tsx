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
    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setUploading(true);
            const uploadedUrls: string[] = [];

            try {
                for (let i = 0; i < files.length; i++) {
                    const file = files[i];
                    const formData = new FormData();
                    formData.append('file', file);

                    const response = await fetch('/api/upload', {
                        method: 'POST',
                        body: formData,
                    });

                    if (response.ok) {
                        const data = await response.json();
                        uploadedUrls.push(data.url);
                    }
                }

                if (uploadedUrls.length > 0) {
                    setPreviewImages(prev => [...prev, ...uploadedUrls]);
                    setFormData(prev => ({
                        ...prev,
                        images: [...(prev.images || []), ...uploadedUrls]
                    }));
                }
            } catch (error) {
                console.error("Upload failed:", error);
                alert("Failed to upload images to cloud storage.");
            } finally {
                setUploading(false);
            }
        }
    };

    const removeImage = (index: number) => {
        setPreviewImages(prev => prev.filter((_, i) => i !== index));
        setFormData(prev => ({
            ...prev,
            images: (prev.images || []).filter((_, i) => i !== index)
        }));
    };

    const setPrimaryImage = (index: number) => {
        const images = [...(formData.images || [])];
        const [target] = images.splice(index, 1);
        images.unshift(target);

        const previews = [...previewImages];
        const [previewTarget] = previews.splice(index, 1);
        previews.unshift(previewTarget);

        setFormData(prev => ({ ...prev, images }));
        setPreviewImages(previews);
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

        try {
            await addProduct(newProduct);
            router.push("/admin");
        } catch (error) {
            console.error("Failed to add product:", error);
            setIsSubmitting(false);
        }
    };

    if (!isAdmin) return null;

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
                                        <label className="block text-sm font-medium text-gray-900 flex justify-between">
                                            Product Gallery
                                            <span className="text-[10px] text-gray-400 font-normal">Add as many images as you need for the product detail gallery.</span>
                                        </label>

                                        {/* Gallery Grid */}
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                                {previewImages.map((src, idx) => (
                                                    <div key={idx} className="group relative aspect-square bg-gray-100 rounded-sm overflow-hidden border border-gray-200">
                                                        <Image src={src} alt="Preview" fill className="object-cover" />
                                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                                                            <button
                                                                type="button"
                                                                onClick={() => setPrimaryImage(idx)}
                                                                className={`text-[9px] font-bold px-2 py-1 rounded-sm transition-colors ${idx === 0 ? "bg-green-500 text-white" : "bg-white text-black hover:bg-gray-100"}`}
                                                            >
                                                                {idx === 0 ? "PRIMARY" : "SET PRIMARY"}
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => removeImage(idx)}
                                                                className="text-white hover:text-red-400 transition-colors"
                                                            >
                                                                <span className="text-[9px] font-bold">REMOVE</span>
                                                            </button>
                                                        </div>
                                                        {idx === 0 && (
                                                            <span className="absolute top-2 left-2 bg-black text-white text-[8px] font-bold px-1.5 py-0.5 rounded-sm">MAIN</span>
                                                        )}
                                                    </div>
                                                ))}

                                                {/* Add More via File */}
                                                <label className="cursor-pointer flex flex-col items-center justify-center aspect-square border-2 border-dashed border-gray-200 rounded-sm hover:border-black hover:bg-white transition-all group">
                                                    <Upload className="w-5 h-5 text-gray-400 mb-2 group-hover:text-black transition-colors" />
                                                    <span className="text-[9px] font-bold text-gray-400 group-hover:text-black uppercase tracking-wider">Upload More</span>
                                                    <input type="file" className="hidden" accept="image/*" multiple onChange={handleImageUpload} />
                                                </label>
                                            </div>

                                            {/* Add via URL - For S3/External Links */}
                                            <div className="flex gap-2">
                                                <input
                                                    id="imageUrlInput"
                                                    type="text"
                                                    placeholder="Or paste an image URL (e.g. S3 link)"
                                                    className="flex-1 p-3 border border-gray-200 rounded-sm text-xs focus:outline-none focus:border-black bg-white"
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') {
                                                            e.preventDefault();
                                                            const val = (e.target as HTMLInputElement).value;
                                                            if (val) {
                                                                setPreviewImages(prev => [...prev, val]);
                                                                setFormData(prev => ({ ...prev, images: [...(prev.images || []), val] }));
                                                                (e.target as HTMLInputElement).value = '';
                                                            }
                                                        }
                                                    }}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const input = document.getElementById('imageUrlInput') as HTMLInputElement;
                                                        if (input.value) {
                                                            setPreviewImages(prev => [...prev, input.value]);
                                                            setFormData(prev => ({ ...prev, images: [...(prev.images || []), input.value] }));
                                                            input.value = '';
                                                        }
                                                    }}
                                                    className="px-4 py-2 bg-gray-100 text-[10px] font-bold uppercase rounded-sm hover:bg-gray-200 transition-colors"
                                                >
                                                    Add URL
                                                </button>
                                            </div>

                                            {uploading && <div className="flex items-center gap-2 text-[10px] text-gray-400 italic">
                                                <Loader2 className="w-3 h-3 animate-spin" /> Syncing gallery assets...
                                            </div>}
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

                                    <hr className="border-gray-50" />

                                    <div className="flex items-start gap-3">
                                        <Info className="w-4 h-4 text-gray-400 mt-0.5" />
                                        <div className="text-xs text-gray-500 leading-relaxed">
                                            <p className="font-medium text-gray-900 mb-1">Renewal options:</p>
                                            <p>Automatic</p>
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
