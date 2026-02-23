import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const redirectPath = searchParams.get('redirect') || '/';

    const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';

    const options = {
        redirect_uri: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/api/auth/google/callback`,
        client_id: process.env.GOOGLE_CLIENT_ID || '',
        access_type: 'offline',
        response_type: 'code',
        prompt: 'consent',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email',
        ].join(' '),
    };

    const qs = new URLSearchParams(options);
    const response = NextResponse.redirect(`${rootUrl}?${qs.toString()}`);

    // Store redirect path in a cookie for the callback to use
    response.cookies.set('return_to', redirectPath, {
        path: '/',
        maxAge: 60 * 10, // 10 minutes
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
    });

    return response;
}
