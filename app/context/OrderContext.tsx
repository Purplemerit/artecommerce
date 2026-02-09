"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface Order {
    id: string;
    userId: string;
    items: any[];
    total: number;
    status: "Pending" | "Paid" | "Shipped" | "Delivered" | "Cancelled";
    shipmentStatus: "Processing" | "In Transit" | "Out for Delivery" | "Delivered";
    date: string;
    customerName: string;
    customerEmail: string;
    shippingAddress: {
        firstName: string;
        lastName: string;
        address: string;
        city: string;
        country: string;
        zipCode: string;
        phone: string;
    };
}

interface OrderContextType {
    orders: Order[];
    loading: boolean;
    createOrder: (order: Omit<Order, "id" | "date" | "status" | "shipmentStatus">) => Promise<Order>;
    updateOrderStatus: (id: string, status: Order["status"], shipmentStatus?: Order["shipmentStatus"]) => Promise<void>;
    getUserOrders: (userId: string) => Order[];
    getOrder: (id: string) => Order | undefined;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await fetch('/api/orders');
            if (response.ok) {
                const data = await response.json();
                setOrders(data.orders);
            }
        } catch (error) {
            console.error("Failed to fetch orders:", error);
        } finally {
            setLoading(false);
        }
    };

    const createOrder = async (orderData: Omit<Order, "id" | "date" | "status" | "shipmentStatus">) => {
        try {
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData),
            });

            if (response.ok) {
                const data = await response.json();
                await fetchOrders();
                return data.order;
            }
            throw new Error("Failed to create order");
        } catch (error) {
            console.error("Failed to create order:", error);
            throw error;
        }
    };

    const updateOrderStatus = async (id: string, status: Order["status"], shipmentStatus?: Order["shipmentStatus"]) => {
        try {
            const response = await fetch(`/api/orders/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status, shipmentStatus }),
            });

            if (response.ok) {
                await fetchOrders();
            }
        } catch (error) {
            console.error("Failed to update order status:", error);
        }
    };

    const getUserOrders = (userId: string) => {
        return orders.filter(o => o.userId === userId);
    };

    const getOrder = (id: string) => {
        return orders.find(o => o.id === id);
    };

    return (
        <OrderContext.Provider value={{ orders, loading, createOrder, updateOrderStatus, getUserOrders, getOrder }}>
            {children}
        </OrderContext.Provider>
    );
}

export function useOrders() {
    const context = useContext(OrderContext);
    if (context === undefined) {
        throw new Error("useOrders must be used within an OrderProvider");
    }
    return context;
}
