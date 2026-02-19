
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { OAuth2Client } from 'google-auth-library';
import { SignJWT } from 'jose';

const client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/api/auth/google/callback`
);

const secret = new TextEncoder().encode(
    process.env.JWT_SECRET || 'your-secret-key-change-in-production'
);

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');

    if (!code) {
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/login?error=Google auth failed`);
    }

    try {
        const { tokens } = await client.getToken(code);
        client.setCredentials(tokens);

        const ticket = await client.verifyIdToken({
            idToken: tokens.id_token!,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        if (!payload || !payload.email) {
            throw new Error('Google payload missing');
        }

        // Upsert user
        const user = await prisma.user.upsert({
            where: { email: payload.email },
            update: {
                googleId: payload.sub,
                image: payload.picture,
                isVerified: true, // Google emails are already verified
            },
            create: {
                email: payload.email,
                name: payload.name || 'Google User',
                googleId: payload.sub,
                image: payload.picture,
                isVerified: true,
                role: payload.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL ? 'ADMIN' : 'USER',
            },
        });

        // Generate JWT
        const token = await new SignJWT({
            id: user.id,
            email: user.email,
            role: user.role,
        })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('7d')
            .sign(secret);

        const response = NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/`);

        // Set cookie
        response.cookies.set('auth-token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7,
            path: '/',
        });

        return response;

    } catch (error) {
        console.error('Google Auth Error:', error);
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/login?error=Google auth failed`);
    }
}
