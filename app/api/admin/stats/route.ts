import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(
    process.env.JWT_SECRET || 'your-secret-key-change-in-production'
);

export async function GET() {
    try {
        // Authenticate as admin
        const cookieStore = await cookies();
        const token = cookieStore.get('auth-token')?.value;

        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { payload } = await jwtVerify(token, secret);
        if (payload.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        // Fetch stats
        const [totalRevenue, activeListings, pendingOrders] = await Promise.all([
            prisma.order.aggregate({
                where: {
                    paymentStatus: 'PAID',
                },
                _sum: {
                    total: true,
                },
            }),
            prisma.product.count(),
            prisma.order.count({
                where: {
                    status: 'PENDING',
                },
            }),
        ]);

        // Calculate growth (optional, mock for now or calculate from last month)
        // For simplicity, let's just return the sums

        return NextResponse.json({
            totalRevenue: totalRevenue._sum.total || 0,
            activeListings,
            pendingOrders,
            revenueGrowth: 20.1, // Hardcoded for now unless user wants dynamic growth too
        });
    } catch (error: any) {
        console.error('Error fetching admin stats:', error);
        return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
    }
}
