"use client";

import LegalPageLayout from "../components/LegalPageLayout";

export default function PrivacyPage() {
    const sections = [
        {
            id: "collection",
            title: "Information We Collect",
            content: (
                <>
                    <p>
                        At Art Ecommerce, we believe your privacy is paramount. This page explains how we handle your personal information and ensure it remains secure. We collect information that you provide to us directly when you create an account, make a purchase, or communicate with us.
                    </p>
                    <p>
                        Through your interaction with our platform, we may collect technical data such as your IP address, browser type, and device information. This helps us optimize our services and provide a personalized experience for every art lover.
                    </p>
                    <p>
                        Our commitment to your privacy means we are transparent about what we collect. We never sell your data to third parties, and we only use it to enhance your journey through our curated art collection.
                    </p>
                </>
            ),
        },
        {
            id: "usage",
            title: "How We Use Information",
            content: (
                <>
                    <p>
                        We use the information we collect to process your orders, maintain your account, and provide you with the best possible service. This includes sending you updates about your purchases and keeping you informed about new additions to our gallery.
                    </p>
                    <p>
                        Your data helps us understand how our platform is used, allowing us to continuously improve our interface and selection. We may also use your information to prevent fraud and ensure the security of our community and your acquisitions.
                    </p>
                    <p>
                        By understanding your preferences, we can suggest artworks that resonate with your unique taste. This personalization is designed to make your experience at Art Ecommerce as inspiring as the art we showcase.
                    </p>
                </>
            ),
        },
        {
            id: "cookies",
            title: "Cookies",
            content: (
                <>
                    <p>
                        We use cookies to enhance your experience and collect information about how you interact with our site. These small files are stored on your device and help us remember your preferences, such as your language settings and shopping cart items.
                    </p>
                    <p>
                        You have the option to accept or decline cookies through your browser settings. However, please note that some features of our platform may not function correctly if you choose to disable cookies entirely.
                    </p>
                    <p>
                        Our use of cookies is strictly for the purpose of Improving your user experience. We do not use them to track your activity on other websites or to collect information beyond what is necessary for our platform to operate effectively.
                    </p>
                </>
            ),
        },
        {
            id: "third-party",
            title: "Third-Party Services",
            content: (
                <>
                    <p>
                        We may use third-party services to help us operate our platform and provide you with a seamless experience. These services may include payment processors, shipping partners, and analytics providers.
                    </p>
                    <p>
                        Each of these third-party services has its own privacy policy, and we encourage you to review them. We only work with partners who share our commitment to privacy and data security, ensuring your information is always handled with care.
                    </p>
                </>
            ),
        },
        {
            id: "security",
            title: "Data Security",
            content: (
                <>
                    <p>
                        Protecting your data is our top priority. We implement industry-standard security measures to safeguard your personal information from unauthorized access, disclosure, or alteration. Our platform uses encryption to protect your data during transmission.
                    </p>
                    <p>
                        While we strive to use every commercially acceptable means to protect your personal information, no method of transmission over the internet is 100% secure. We continuously monitor our systems to ensure your data remains as safe as possible.
                    </p>
                </>
            ),
        },
        {
            id: "rights",
            title: "Your Rights",
            content: (
                <>
                    <p>
                        You have the right to access, update, or delete your personal information at any time. If you wish to exercise these rights, please contact us through the information provided on our contact page. We are committed to responding to your requests promptly.
                    </p>
                    <p>
                        In addition to these rights, you can also opt-out of receiving marketing communications from us at any time. We respect your choices and want to ensure you have full control over your interaction with Art Ecommerce.
                    </p>
                </>
            ),
        },
        {
            id: "changes",
            title: "Changes to Policy",
            content: (
                <>
                    <p>
                        We may update our Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. Any changes will be posted on this page with an updated "last updated" date.
                    </p>
                    <p>
                        We encourage you to review this policy periodically to stay informed about how we are protecting your information. Your continued use of our platform after any changes have been made signifies your acceptance of the updated policy.
                    </p>
                </>
            ),
        },
    ];

    return (
        <LegalPageLayout
            title="Privacy Policy"
            subtitle="Your privacy matters. This page explains how we handle your information."
            lastUpdated="Last updated: December 2024"
            bannerImage="/images/136eed7713c6f492a0bf5b8896c86224b9e28d44.jpg"
            sections={sections}
        />
    );
}
