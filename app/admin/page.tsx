"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import { useProducts } from "../context/ProductContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Edit2, Trash2, Search, ArrowRight, Settings, ShoppingBag } from "lucide-react";
import { getProductImage } from "../data/products";

export default function AdminDashboard() {
    const { isAdmin, user } = useAuth();
    const { products, deleteProduct } = useProducts();
    const router = useRouter();
    const [search, setSearch] = useState("");
    const [stats, setStats] = useState({
        totalRevenue: 0,
        activeListings: 0,
        pendingOrders: 0,
        revenueGrowth: 0
    });
    const [statsLoading, setStatsLoading] = useState(true);

    useEffect(() => {
        // Simple client-side protection
        const timer = setTimeout(() => {
            if (!isAdmin) {
                router.push("/login");
            }
        }, 500);

        // Fetch stats if admin
        if (isAdmin) {
            fetchStats();
        }

        return () => clearTimeout(timer);
    }, [isAdmin, router]);

    const fetchStats = async () => {
        try {
            const response = await fetch('/api/admin/stats');
            if (response.ok) {
                const data = await response.json();
                setStats(data);
            }
        } catch (error) {
            console.error("Failed to fetch stats:", error);
        } finally {
            setStatsLoading(false);
        }
    };

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <main className="min-h-screen bg-[#Fdfdfd]">
            <Navbar variant="light" />

            <div className="pt-28 pb-16 px-4 max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-gray-100 pb-8">
                    <div>
                        <h1 className="font-serif text-4xl mb-2 text-gray-900">Admin Dashboard</h1>
                        <p className="text-gray-500">Manage your artwork, inventory, and listings.</p>
                    </div>
                    <div className="flex gap-3 mt-4 md:mt-0">
                        <Link
                            href="/admin/orders"
                            className="bg-white border border-gray-200 text-gray-900 px-6 py-3 text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
                        >
                            <ShoppingBag className="w-4 h-4" /> Orders
                        </Link>
                        <Link
                            href="/admin/settings"
                            className="bg-white border border-gray-200 text-gray-900 px-6 py-3 text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
                        >
                            <Settings className="w-4 h-4" /> Settings
                        </Link>
                        <Link
                            href="/admin/products/new"
                            className="bg-black text-white px-6 py-3 text-sm font-medium hover:bg-gray-800 transition-colors flex items-center gap-2"
                        >
                            <Plus className="w-4 h-4" /> New Listing
                        </Link>
                    </div>
                </div>

                {/* Stats / Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white p-6 border border-gray-100 rounded-sm shadow-sm transition-opacity duration-300" style={{ opacity: statsLoading ? 0.6 : 1 }}>
                        <h3 className="text-gray-500 text-sm uppercase tracking-wider mb-2">Total revenue</h3>
                        <p className="font-serif text-3xl">${stats.totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                        <span className="text-green-500 text-xs font-medium flex items-center mt-2">+{stats.revenueGrowth}% from last month</span>
                    </div>
                    <div className="bg-white p-6 border border-gray-100 rounded-sm shadow-sm transition-opacity duration-300" style={{ opacity: statsLoading ? 0.6 : 1 }}>
                        <h3 className="text-gray-500 text-sm uppercase tracking-wider mb-2">Active Listings</h3>
                        <p className="font-serif text-3xl">{stats.activeListings}</p>
                        <span className="text-gray-400 text-xs font-medium flex items-center mt-2">Update inventory</span>
                    </div>
                    <Link href="/admin/orders" className="bg-white p-6 border border-gray-100 rounded-sm shadow-sm hover:border-black transition-all group cursor-pointer" style={{ opacity: statsLoading ? 0.6 : 1 }}>
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-gray-500 text-sm uppercase tracking-wider mb-2">Pending Orders</h3>
                                <p className="font-serif text-3xl">{stats.pendingOrders}</p>
                            </div>
                            <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-black transition-colors" />
                        </div>
                        <span className="text-orange-500 text-xs font-medium flex items-center mt-2">Requires attention</span>
                    </Link>
                </div>

                {/* Product List */}
                <div className="bg-white border border-gray-100 rounded-sm shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                        <h2 className="font-serif text-xl">Products</h2>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-9 pr-4 py-2 border border-gray-200 text-sm rounded-sm focus:outline-none focus:border-black w-64"
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50/50 text-xs uppercase text-gray-500 font-medium">
                                <tr>
                                    <th className="px-6 py-4">Product</th>
                                    <th className="px-6 py-4">Type</th>
                                    <th className="px-6 py-4">Price</th>
                                    <th className="px-6 py-4">Inventory</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredProducts.map((product) => (
                                    <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="relative w-12 h-12 bg-gray-100 overflow-hidden rounded-sm">
                                                    <Image
                                                        src={getProductImage(product.images[0])}
                                                        alt={product.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <span className="font-medium text-gray-900">{product.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{product.type}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">${product.price.toFixed(2)}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{product.quantity || "∞"} in stock</td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link href={`/admin/products/edit/${product.id}`} className="p-2 hover:bg-gray-100 rounded-full text-gray-500 hover:text-black transition-colors">
                                                    <Edit2 className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    onClick={() => deleteProduct(product.id)}
                                                    className="p-2 hover:bg-red-50 rounded-full text-gray-500 hover:text-red-500 transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {filteredProducts.length === 0 && (
                        <div className="p-12 text-center text-gray-400 text-sm">
                            No products found.
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </main>
    );
}
