import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { prisma } from '@/lib/prisma';

const secret = new TextEncoder().encode(
    process.env.JWT_SECRET || 'your-secret-key-change-in-production'
);

export async function GET(request: NextRequest) {
    try {
        const token = request.cookies.get('auth-token')?.value;

        if (!token) {
            return NextResponse.json(
                { error: 'Not authenticated' },
                { status: 401 }
            );
        }

        // Verify token
        const { payload } = await jwtVerify(token, secret);

        // Fetch fresh user data
        const user = await prisma.user.findUnique({
            where: { id: payload.userId as string },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                createdAt: true,
            },
        });

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            user,
        });
    } catch (error: any) {
        console.error('Session error:', error);
        return NextResponse.json(
            { error: 'Invalid session' },
            { status: 401 }
        );
    }
}
