import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendPasswordResetEmail } from '@/lib/email';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
    try {
        const { email: rawEmail } = await request.json();
        const email = rawEmail?.trim().toLowerCase();

        if (!email) {
            return NextResponse.json(
                { error: 'Email is required' },
                { status: 400 }
            );
        }

        const user = await prisma.user.findFirst({
            where: {
                email: {
                    equals: email,
                    mode: 'insensitive'
                }
            },
        });

        // For security reasons, don't reveal if a user exists or not
        if (!user) {
            return NextResponse.json({
                success: true,
                message: 'If an account exists with this email, a reset link has been sent.',
            });
        }

        // Generate a secure random token
        const token = crypto.randomBytes(32).toString('hex');
        const expires = new Date(Date.now() + 3600000); // 1 hour

        // Store token in the existing otp fields to avoid schema migration issues
        await prisma.user.update({
            where: { id: user.id },
            data: {
                otp: token,
                otpExpires: expires,
            },
        });

        const resetLink = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/reset-password?token=${token}&email=${encodeURIComponent(email)}`;

        await sendPasswordResetEmail(email, resetLink);

        return NextResponse.json({
            success: true,
            message: 'If an account exists with this email, a reset link has been sent.',
        });
    } catch (error: any) {
        console.error('Forgot password error:', error);
        return NextResponse.json(
            { error: 'Failed to process request' },
            { status: 500 }
        );
    }
}
