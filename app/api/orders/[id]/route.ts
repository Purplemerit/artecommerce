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

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const user = await getUserFromToken(request);
        if (!user || user.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        const { id } = await params;
        const data = await request.json();

        const order = await prisma.order.update({
            where: { id },
            data: {
                status: data.status,
                paymentStatus: data.paymentStatus,
            }
        });

        return NextResponse.json({ success: true, order });
    } catch (error: any) {
        console.error('Update order error:', error);
        return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
    }
}
