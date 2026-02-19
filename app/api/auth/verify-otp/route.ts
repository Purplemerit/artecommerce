
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { SignJWT } from 'jose';

const secret = new TextEncoder().encode(
    process.env.JWT_SECRET || 'your-secret-key-change-in-production'
);

export async function POST(request: NextRequest) {
    try {
        const { userId, otp } = await request.json();

        if (!userId || !otp) {
            return NextResponse.json({ error: 'Missing userId or OTP' }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        if (user.isVerified) {
            return NextResponse.json({ error: 'User already verified' }, { status: 400 });
        }

        if (!user.otp || !user.otpExpires) {
            return NextResponse.json({ error: 'OTP not found' }, { status: 400 });
        }

        if (user.otp !== otp) {
            return NextResponse.json({ error: 'Invalid OTP' }, { status: 400 });
        }

        if (user.otpExpires < new Date()) {
            return NextResponse.json({ error: 'OTP expired' }, { status: 400 });
        }

        // Verify user and clear OTP
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                isVerified: true,
                otp: null,
                otpExpires: null,
            },
        });

        // Generate JWT
        const token = await new SignJWT({
            userId: updatedUser.id,
            email: updatedUser.email,
            role: updatedUser.role,
        })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('7d')
            .sign(secret);

        const response = NextResponse.json({
            success: true,
            user: {
                id: updatedUser.id,
                email: updatedUser.email,
                name: updatedUser.name,
                role: updatedUser.role,
            },
        });

        // Set cookie
        response.cookies.set('auth-token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: '/',
        });

        return response;

    } catch (error: any) {
        console.error('Verify OTP Error:', error);
        return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
    }
}
