
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOtpEmail(email: string, otp: string) {
    // DEV LOG: So you can always see the OTP in your terminal even if email fails
    if (process.env.NODE_ENV !== 'production') {
        console.log(`\n🚀 [DEV] OTP for ${email}: ${otp}\n`);
    }

    try {
        const { data, error } = await resend.emails.send({
            from: 'Art Ecommerce <onboarding@purplemerit.com>',
            to: [email],
            subject: 'Verify your email - Art Ecommerce',
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e5e5; rounded: 8px;">
                    <h1 style="color: #1a1a1a; font-size: 24px;">Welcome to Art Ecommerce!</h1>
                    <p style="color: #666; font-size: 16px;">Please use the following code to verify your email address:</p>
                    <div style="background-color: #f4f4f4; padding: 15px; border-radius: 4px; text-align: center; margin: 25px 0;">
                        <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #1a1a1a;">${otp}</span>
                    </div>
                    <p style="color: #666; font-size: 14px;">This code will expire in 10 minutes.</p>
                    <p style="color: #999; font-size: 12px; margin-top: 40px;">If you didn't request this code, you can safely ignore this email.</p>
                </div>
            `,
        });

        if (error) {
            console.error('Resend Error:', error);
            return { success: false, error };
        }

        return { success: true, data };
    } catch (error) {
        console.error('Email sending failed:', error);
        return { success: false, error };
    }
}
export async function sendPasswordResetEmail(email: string, resetLink: string) {
    if (process.env.NODE_ENV !== 'production') {
        console.log(`\n🚀 [DEV] Reset Link for ${email}: ${resetLink}\n`);
    }

    try {
        const { data, error } = await resend.emails.send({
            from: 'Art Ecommerce <onboarding@purplemerit.com>',
            to: [email],
            subject: 'Reset your password - Art Ecommerce',
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e5e5; border-radius: 8px;">
                    <h1 style="color: #1a1a1a; font-size: 24px;">Reset Your Password</h1>
                    <p style="color: #666; font-size: 16px;">We received a request to reset your password. Click the button below to choose a new one:</p>
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${resetLink}" style="background-color: #1a1a1a; color: #ffffff; padding: 12px 24px; border-radius: 4px; text-decoration: none; font-weight: bold; display: inline-block;">Reset Password</a>
                    </div>
                    <p style="color: #666; font-size: 14px;">If the button doesn't work, copy and paste this link into your browser:</p>
                    <p style="color: #0066cc; font-size: 12px; word-break: break-all;">${resetLink}</p>
                    <p style="color: #666; font-size: 14px; margin-top: 20px;">This link will expire in 1 hour.</p>
                    <p style="color: #999; font-size: 12px; margin-top: 40px;">If you didn't request a password reset, you can safely ignore this email.</p>
                </div>
            `,
        });

        if (error) {
            console.error('Resend Error:', error);
            return { success: false, error };
        }

        return { success: true, data };
    } catch (error) {
        console.error('Email sending failed:', error);
        return { success: false, error };
    }
}
