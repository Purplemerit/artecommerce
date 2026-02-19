"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { products as initialProducts } from "../data/products";

// Use the interface from products.ts or define here. 
// Assuming structure based on usage.
export interface Product {
    id: number;
    name: string;
    price: number;
    oldPrice: number;
    type: string;
    description: string;
    images: string[];
    // attributes for admin
    category?: string;
    quantity?: number;
    sku?: string;
    createdAt?: string;
    updatedAt?: string;
}

interface ProductContextType {
    products: Product[];
    loading: boolean;
    addProduct: (product: Product) => Promise<void>;
    updateProduct: (id: number, updated: Partial<Product>) => Promise<void>;
    deleteProduct: (id: number) => Promise<void>;
    getProduct: (id: number) => Product | undefined;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: ReactNode }) {
    const [products, setProducts] = useState<Product[]>(initialProducts);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('/api/products');
            if (response.ok) {
                const data = await response.json();
                if (data.products && data.products.length > 0) {
                    setProducts(data.products);
                } else {
                    // DB is empty, trigger seed
                    console.log("DB is empty, seeding initial products...");
                    const seedResponse = await fetch('/api/seed', { method: 'POST' });
                    if (seedResponse.ok) {
                        const seedData = await seedResponse.json();
                        console.log("Seed successful:", seedData.message);
                        // Refresh products after seed
                        const freshResponse = await fetch('/api/products');
                        if (freshResponse.ok) {
                            const freshData = await freshResponse.json();
                            setProducts(freshData.products);
                        }
                    } else {
                        // If seeding fails, fallback to local data
                        setProducts(initialProducts);
                    }
                }
            }
        } catch (error) {
            console.error("Failed to fetch products:", error);
            setProducts(initialProducts);
        } finally {
            setLoading(false);
        }
    };

    const addProduct = async (product: Product) => {
        try {
            const response = await fetch('/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(product),
            });
            if (response.ok) {
                await fetchProducts();
                return await response.json();
            }
        } catch (error) {
            console.error("Failed to add product:", error);
            throw error;
        }
    };

    const updateProduct = async (id: number, updated: Partial<Product>) => {
        try {
            const response = await fetch(`/api/products/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updated),
            });
            if (response.ok) {
                await fetchProducts();
            }
        } catch (error) {
            console.error("Failed to update product:", error);
        }
    };

    const deleteProduct = async (id: number) => {
        try {
            const response = await fetch(`/api/products/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                await fetchProducts();
            }
        } catch (error) {
            console.error("Failed to delete product:", error);
        }
    };

    const getProduct = (id: number) => {
        return products.find(p => p.id === Number(id));
    };

    return (
        <ProductContext.Provider value={{ products, loading, addProduct, updateProduct, deleteProduct, getProduct }}>
            {children}
        </ProductContext.Provider>
    );
}

export function useProducts() {
    const context = useContext(ProductContext);
    if (context === undefined) {
        throw new Error("useProducts must be used within a ProductProvider");
    }
    return context;
}
