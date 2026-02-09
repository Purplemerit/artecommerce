import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(
    process.env.JWT_SECRET || 'your-secret-key-change-in-production'
);

async function getUserFromToken(request: NextRequest) {
    const token = request.cookies.get('auth-token')?.value;

    if (!token) {
        return null;
    }

    try {
        const { payload } = await jwtVerify(token, secret);
        return payload;
    } catch {
        return null;
    }
}

// GET all products
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category');

        const where = category ? { category } : {};

        const products = await prisma.product.findMany({
            where,
            orderBy: {
                createdAt: 'desc',
            },
        });

        return NextResponse.json({
            success: true,
            products,
        });
    } catch (error: any) {
        console.error('Get products error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to fetch products' },
            { status: 500 }
        );
    }
}

// POST create product (admin only)
export async function POST(request: NextRequest) {
    try {
        const user = await getUserFromToken(request);

        if (!user || user.role !== 'ADMIN') {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 403 }
            );
        }

        const data = await request.json();

        const product = await prisma.product.create({
            data: {
                name: data.name,
                description: data.description,
                price: parseFloat(data.price),
                oldPrice: data.oldPrice ? parseFloat(data.oldPrice) : null,
                images: data.images || [],
                category: data.category,
                type: data.type || 'PHYSICAL',
                quantity: parseInt(data.quantity) || 0,
                sku: data.sku,
            },
        });

        return NextResponse.json({
            success: true,
            product,
        });
    } catch (error: any) {
        console.error('Create product error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to create product' },
            { status: 500 }
        );
    }
}
