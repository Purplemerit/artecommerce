import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const { email } = await request.json();

        if (!email || !email.includes('@')) {
            return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
        }

        // In a real app, you'd save this to a 'Newsletter' table or an external service like Mailchimp
        // for now, we'll just log it or we could create a simple model if needed
        console.log(`Newsletter subscription: ${email}`);

        // Mock success response
        return NextResponse.json({ message: 'Subscribed successfully!' });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
