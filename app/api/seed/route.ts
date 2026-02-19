import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { products } from '@/app/data/products';

export async function POST(request: NextRequest) {
    try {
        // Simple check to prevent accidental usage if needed, 
        // but for this dev environment, we'll just allow it.

        console.log('Seeding products started...');

        // Clear existing products to avoid ID mismatches
        await prisma.orderItem.deleteMany({});
        await prisma.product.deleteMany({});

        const results = await Promise.all(
            products.map(async (p) => {
                return await prisma.product.create({
                    data: {
                        id: p.id,
                        name: p.name,
                        price: p.price,
                        oldPrice: p.oldPrice,
                        description: p.description,
                        images: p.images,
                        category: p.type,
                        type: 'PHYSICAL',
                        quantity: 100
                    }
                });
            })
        );

        return NextResponse.json({
            success: true,
            message: `Successfully seeded ${results.length} products.`,
            count: results.length
        });
    } catch (error: any) {
        console.error('Seed error:', error);
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}
