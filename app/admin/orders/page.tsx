"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useAuth } from "../../context/AuthContext";
import { useOrders, Order } from "../../context/OrderContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft, Search, Filter, ArrowDownCircle, MoreHorizontal, Truck, Package, CheckCircle, Clock } from "lucide-react";

export default function AdminOrdersPage() {
    const { isAdmin } = useAuth();
    const { orders, updateOrderStatus } = useOrders();
    const router = useRouter();
    const [search, setSearch] = useState("");

    useEffect(() => {
        if (!isAdmin) router.push("/login");
    }, [isAdmin, router]);

    const filteredOrders = orders.filter(o =>
        o.id.toLowerCase().includes(search.toLowerCase()) ||
        o.customerName.toLowerCase().includes(search.toLowerCase())
    );

    const handleStatusUpdate = (orderId: string, status: Order["status"], shipment?: Order["shipmentStatus"]) => {
        updateOrderStatus(orderId, status, shipment);
    };

    if (!isAdmin) return null;

    return (
        <main className="min-h-screen bg-[#Fdfdfd]">
            <Navbar variant="light" />

            <div className="pt-24 pb-16 px-4 max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b border-gray-100 pb-8">
                    <div className="flex items-center gap-4">
                        <Link href="/admin" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <ChevronLeft className="w-5 h-5" />
                        </Link>
                        <div>
                            <h1 className="font-serif text-3xl mb-1 text-gray-900">Orders Management</h1>
                            <p className="text-gray-500 text-sm">Update shipment status and track customer orders.</p>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="mb-6 flex gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by Order ID or Customer..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-9 pr-4 py-2 border border-gray-200 text-sm rounded-sm focus:outline-none focus:border-black w-full"
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white border border-gray-100 rounded-sm shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50/50 text-xs uppercase text-gray-500 font-medium">
                                <tr>
                                    <th className="px-6 py-4">Order</th>
                                    <th className="px-6 py-4">Customer</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Shipment</th>
                                    <th className="px-6 py-4">Total</th>
                                    <th className="px-6 py-4 text-right">Update Tracking</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredOrders.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-12 text-center text-gray-400">No orders found.</td>
                                    </tr>
                                ) : (
                                    filteredOrders.map((order) => (
                                        <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <p className="font-medium text-gray-900">{order.id}</p>
                                                <p className="text-[10px] text-gray-400">{order.date}</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="text-sm font-medium text-gray-900">{order.customerName}</p>
                                                <p className="text-xs text-gray-500">{order.customerEmail}</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${order.status === "Paid" ? "bg-green-50 text-green-600 border-green-100" : "bg-yellow-50 text-yellow-600 border-yellow-100"
                                                    }`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2 text-xs font-medium text-gray-600">
                                                    {order.shipmentStatus === "Processing" && <Clock className="w-3 h-3" />}
                                                    {order.shipmentStatus === "In Transit" && <Truck className="w-3 h-3" />}
                                                    {order.shipmentStatus === "Out for Delivery" && <Package className="w-3 h-3" />}
                                                    {order.shipmentStatus === "Delivered" && <CheckCircle className="w-3 h-3 text-green-500" />}
                                                    {order.shipmentStatus}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 font-bold text-sm">${order.total.toFixed(2)}</td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <select
                                                        className="text-[10px] p-1 border border-gray-200 rounded-sm bg-white focus:outline-none focus:border-black"
                                                        value={order.shipmentStatus}
                                                        onChange={(e) => handleStatusUpdate(order.id, order.status, e.target.value as any)}
                                                    >
                                                        <option value="Processing">Processing</option>
                                                        <option value="In Transit">In Transit</option>
                                                        <option value="Out for Delivery">Out for Delivery</option>
                                                        <option value="Delivered">Delivered</option>
                                                    </select>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
