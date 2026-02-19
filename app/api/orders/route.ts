import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(
    process.env.JWT_SECRET || 'your-secret-key-change-in-production'
);

async function getUserFromToken(request: NextRequest) {
    const token = request.cookies.get('auth-token')?.value;
    if (!token) return null;
    try {
        const { payload } = await jwtVerify(token, secret);
        return payload;
    } catch {
        return null;
    }
}

export async function GET(request: NextRequest) {
    try {
        const user = await getUserFromToken(request);
        if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');

        // If admin and no specific userId, get all orders. Otherwise get user's orders.
        const where = (user.role === 'ADMIN' && !userId) ? {} : { userId: userId || (user.userId as string) };

        const orders = await prisma.order.findMany({
            where,
            include: {
                items: {
                    include: {
                        product: true
                    }
                },
                user: {
                    select: {
                        name: true,
                        email: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        // Map to match the frontend Order interface
        const formattedOrders = orders.map(order => ({
            id: order.id,
            userId: order.userId,
            total: order.total,
            status: order.status,
            paymentStatus: order.paymentStatus,
            shipmentStatus: order.shipmentStatus,
            razorpayOrderId: order.razorpayOrderId,
            razorpayPaymentId: order.razorpayPaymentId,
            date: order.createdAt.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
            customerName: order.user.name,
            customerEmail: order.user.email,
            shippingAddress: order.shippingAddress,
            items: order.items.map(item => ({
                id: item.id,
                productId: item.productId,
                quantity: item.quantity,
                price: item.price,
                size: item.size,
                product: item.product
            }))
        }));

        return NextResponse.json({ success: true, orders: formattedOrders });
    } catch (error: any) {
        console.error('Get orders error:', error);
        return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const user = await getUserFromToken(request);
        if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const data = await request.json();

        // Create order in transaction
        const order = await prisma.$transaction(async (tx) => {
            const newOrder = await tx.order.create({
                data: {
                    userId: user.userId as string,
                    total: data.total,
                    status: data.razorpayPaymentId ? 'PAID' : 'PENDING',
                    paymentStatus: data.razorpayPaymentId ? 'PAID' : (data.paymentStatus || 'PENDING'),
                    razorpayOrderId: data.razorpayOrderId,
                    razorpayPaymentId: data.razorpayPaymentId,
                    shippingAddress: data.shippingAddress,
                    items: {
                        create: data.items.map((item: any) => ({
                            productId: item.productId,
                            quantity: item.quantity,
                            price: item.price,
                            size: item.size
                        }))
                    }
                },
                include: {
                    items: true
                }
            });
            return newOrder;
        });

        return NextResponse.json({ success: true, order });
    } catch (error: any) {
        console.error('Create order error details:', {
            message: error.message,
            stack: error.stack,
            code: error.code,
            meta: error.meta
        });

        // Check for specific Prisma errors
        if (error.code === 'P2003') {
            return NextResponse.json({
                error: 'Required record not found (User or Product). Please ensure you are logged in correctly and products exist in the database.',
                details: error.meta
            }, { status: 400 });
        }

        return NextResponse.json({
            error: error.message || 'Failed to create order',
            details: error.code
        }, { status: 500 });
    }
}
