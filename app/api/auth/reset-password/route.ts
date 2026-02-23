import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
    try {
        const { email: rawEmail, token, password } = await request.json();
        const email = rawEmail?.trim().toLowerCase();

        if (!email || !token || !password) {
            return NextResponse.json(
                { error: 'Missing required fields' },
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

        if (!user || user.otp !== token) {
            return NextResponse.json(
                { error: 'Invalid or expired reset token' },
                { status: 400 }
            );
        }

        // Check if token is expired
        if (user.otpExpires && user.otpExpires < new Date()) {
            return NextResponse.json(
                { error: 'Reset token has expired' },
                { status: 400 }
            );
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update user password and clear token
        await prisma.user.update({
            where: { id: user.id },
            data: {
                password: hashedPassword,
                isVerified: true,
                otp: null,
                otpExpires: null,
            },
        });

        return NextResponse.json({
            success: true,
            message: 'Password reset successfully',
        });
    } catch (error: any) {
        console.error('Reset password error:', error);
        return NextResponse.json(
            { error: 'Failed to reset password' },
            { status: 500 }
        );
    }
}
