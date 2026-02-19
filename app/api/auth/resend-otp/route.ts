
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendOtpEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
    try {
        const { userId } = await request.json();

        if (!userId) {
            return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
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

        // Generate new OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        await prisma.user.update({
            where: { id: userId },
            data: {
                otp,
                otpExpires,
            },
        });

        // Send Email
        await sendOtpEmail(user.email, otp);

        return NextResponse.json({
            success: true,
            message: 'New OTP sent to your email',
        });

    } catch (error: any) {
        console.error('Resend OTP Error:', error);
        return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
    }
}
