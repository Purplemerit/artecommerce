import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import crypto from "crypto";

export async function POST(request: Request) {
    const { amount } = await request.json();

    if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
        return NextResponse.json({ error: "Razorpay credentials missing" }, { status: 500 });
    }

    const razorpay = new Razorpay({
        key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const payment_capture = 1;
    const currency = "USD"; // Or "INR" based on your preference
    const options = {
        amount: (amount * 100).toString(), // Amount in smallest currency unit (paise/cents)
        currency,
        receipt: crypto.randomUUID(),
        payment_capture,
    };

    try {
        const response = await razorpay.orders.create(options);
        return NextResponse.json({
            id: response.id,
            currency: response.currency,
            amount: response.amount,
        });
    } catch (error) {
        console.error("Razorpay Error:", error);
        return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
    }
}
