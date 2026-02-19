import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            orderData
        } = await request.json();

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
            .update(body.toString())
            .digest("hex");

        const isAuthentic = expectedSignature === razorpay_signature;

        if (isAuthentic) {
            // Logic to create order in database after successful payment
            // (Or update an existing order if you created it as 'PENDING' before)

            // For now, we return success so the frontend can call createOrder or we do it here.
            // In a robust system, you'd do it here to prevent client-side manipulation.

            return NextResponse.json({
                message: "Payment verified successfully",
                success: true
            }, { status: 200 });
        } else {
            return NextResponse.json({
                message: "Payment verification failed",
                success: false
            }, { status: 400 });
        }
    } catch (error) {
        console.error("Verification Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
