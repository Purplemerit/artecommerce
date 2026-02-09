import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database Types
export interface User {
    id: string;
    email: string;
    name: string;
    role: 'admin' | 'user';
    created_at: string;
    updated_at: string;
}

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    old_price?: number;
    images: string[];
    category: string;
    type: 'Physical' | 'Digital';
    quantity: number;
    sku?: string;
    created_at: string;
    updated_at: string;
}

export interface Order {
    id: string;
    user_id: string;
    total: number;
    status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
    payment_status: 'pending' | 'paid' | 'failed';
    items: OrderItem[];
    shipping_address: ShippingAddress;
    created_at: string;
    updated_at: string;
}

export interface OrderItem {
    product_id: number;
    quantity: number;
    price: number;
    size?: string;
}

export interface ShippingAddress {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
}

export interface CartItem {
    id: string;
    user_id: string;
    product_id: number;
    quantity: number;
    size?: string;
    created_at: string;
}

export interface WishlistItem {
    id: string;
    user_id: string;
    product_id: number;
    created_at: string;
}
