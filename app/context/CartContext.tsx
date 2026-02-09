"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface CartItem {
    id: number;
    name: string;
    price: number;
    image: string;
    quantity: number;
    size?: string;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: number, size?: string) => void;
    updateQuantity: (id: number, quantity: number, size?: string) => void;
    cartTotal: number;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);

    useEffect(() => {
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const addToCart = (item: CartItem) => {
        setCart((prev) => {
            const existing = prev.find((i) => i.id === item.id && i.size === item.size);
            if (existing) {
                return prev.map((i) =>
                    i.id === item.id && i.size === item.size
                        ? { ...i, quantity: i.quantity + item.quantity }
                        : i
                );
            }
            return [...prev, item];
        });
    };

    const removeFromCart = (id: number, size?: string) => {
        setCart((prev) => prev.filter((item) => !(item.id === id && item.size === size)));
    };

    const updateQuantity = (id: number, quantity: number, size?: string) => {
        if (quantity < 1) return;
        setCart((prev) =>
            prev.map((item) => (item.id === id && item.size === size ? { ...item, quantity } : item))
        );
    };

    const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    const clearCart = () => {
        setCart([]);
        localStorage.removeItem("cart");
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, cartTotal, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
