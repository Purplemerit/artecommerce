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

// GET single product
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const productId = parseInt(id);

        const product = await prisma.product.findUnique({
            where: { id: productId },
        });

        if (!product) {
            return NextResponse.json(
                { error: 'Product not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            product,
        });
    } catch (error: any) {
        console.error('Get product error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to fetch product' },
            { status: 500 }
        );
    }
}

// PUT update product (admin only)
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const user = await getUserFromToken(request);

        if (!user || user.role !== 'ADMIN') {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 403 }
            );
        }

        const { id } = await params;
        const productId = parseInt(id);
        const data = await request.json();

        const product = await prisma.product.update({
            where: { id: productId },
            data: {
                name: data.name,
                description: data.description,
                price: data.price ? parseFloat(data.price) : undefined,
                oldPrice: data.oldPrice ? parseFloat(data.oldPrice) : null,
                images: data.images,
                category: data.category,
                type: data.type,
                quantity: data.quantity ? parseInt(data.quantity) : undefined,
                sku: data.sku,
            },
        });

        return NextResponse.json({
            success: true,
            product,
        });
    } catch (error: any) {
        console.error('Update product error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to update product' },
            { status: 500 }
        );
    }
}

// DELETE product (admin only)
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const user = await getUserFromToken(request);

        if (!user || user.role !== 'ADMIN') {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 403 }
            );
        }

        const { id } = await params;
        const productId = parseInt(id);

        await prisma.product.delete({
            where: { id: productId },
        });

        return NextResponse.json({
            success: true,
            message: 'Product deleted successfully',
        });
    } catch (error: any) {
        console.error('Delete product error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to delete product' },
            { status: 500 }
        );
    }
}
