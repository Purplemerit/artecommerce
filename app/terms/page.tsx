"use client";

import LegalPageLayout from "../components/LegalPageLayout";

export default function TermsPage() {
    const sections = [
        {
            id: "introduction",
            title: "Introduction",
            content: (
                <>
                    <p>
                        Welcome to Art Ecommerce, where art and elegance meet. By accessing or using our website, you are acknowledging that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree with these terms, please do not use our platform.
                    </p>
                    <p>
                        Acceptance of these Terms constitutes a legal binding between you and Art Ecommerce. We reserve the right to modify or change these terms at any time without prior notice. Your continued use of the site following any changes means you accept the new terms.
                    </p>
                    <p>
                        Our mission at Art Ecommerce is to provide a seamless platform for art enthusiasts. We strive to maintain the highest level of service and integrity, and we expect our users to do the same. By using our platform, you agree to comply with all applicable laws and regulations.
                    </p>
                </>
            ),
        },
        {
            id: "use-of-content",
            title: "Use of Content",
            content: (
                <>
                    <p>
                        Welcome to Art Ecommerce, where art and elegance meet. By accessing or using our website, you are acknowledging that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree with these terms, please do not use our platform.
                    </p>
                    <p>
                        Acceptance of these Terms constitutes a legal binding between you and Art Ecommerce. We reserve the right to modify or change these terms at any time without prior notice. Your continued use of the site following any changes means you accept the new terms.
                    </p>
                    <p>
                        Our mission at Art Ecommerce is to provide a seamless platform for art enthusiasts. We strive to maintain the highest level of service and integrity, and we expect our users to do the same. By using our platform, you agree to comply with all applicable laws and regulations.
                    </p>
                </>
            ),
        },
        {
            id: "user-accounts",
            title: "User Accounts",
            content: (
                <>
                    <p>
                        Welcome to Art Ecommerce, where art and elegance meet. By accessing or using our website, you are acknowledging that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree with these terms, please do not use our platform.
                    </p>
                    <p>
                        Acceptance of these Terms constitutes a legal binding between you and Art Ecommerce. We reserve the right to modify or change these terms at any time without prior notice. Your continued use of the site following any changes means you accept the new terms.
                    </p>
                    <p>
                        Our mission at Art Ecommerce is to provide a seamless platform for art enthusiasts. We strive to maintain the highest level of service and integrity, and we expect our users to do the same. By using our platform, you agree to comply with all applicable laws and regulations.
                    </p>
                </>
            ),
        },
        {
            id: "intellectual-property",
            title: "Intellectual Property",
            content: (
                <>
                    <p>
                        Welcome to Art Ecommerce, where art and elegance meet. By accessing or using our website, you are acknowledging that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree with these terms, please do not use our platform.
                    </p>
                    <p>
                        Acceptance of these Terms constitutes a legal binding between you and Art Ecommerce. We reserve the right to modify or change these terms at any time without prior notice. Your continued use of the site following any changes means you accept the new terms.
                    </p>
                </>
            ),
        },
        {
            id: "privacy",
            title: "Privacy",
            content: (
                <>
                    <p>
                        Welcome to Art Ecommerce, where art and elegance meet. By accessing or using our website, you are acknowledging that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree with these terms, please do not use our platform.
                    </p>
                    <p>
                        Acceptance of these Terms constitutes a legal binding between you and Art Ecommerce. We reserve the right to modify or change these terms at any time without prior notice. Your continued use of the site following any changes means you accept the new terms.
                    </p>
                </>
            ),
        },
        {
            id: "liability",
            title: "Limitation of Liability",
            content: (
                <>
                    <p>
                        Welcome to Art Ecommerce, where art and elegance meet. By accessing or using our website, you are acknowledging that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree with these terms, please do not use our platform.
                    </p>
                    <p>
                        Acceptance of these Terms constitutes a legal binding between you and Art Ecommerce. We reserve the right to modify or change these terms at any time without prior notice. Your continued use of the site following any changes means you accept the new terms.
                    </p>
                </>
            ),
        },
        {
            id: "changes",
            title: "Changes to Terms",
            content: (
                <>
                    <p>
                        Welcome to Art Ecommerce, where art and elegance meet. By accessing or using our website, you are acknowledging that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree with these terms, please do not use our platform.
                    </p>
                    <p>
                        Acceptance of these Terms constitutes a legal binding between you and Art Ecommerce. We reserve the right to modify or change these terms at any time without prior notice. Your continued use of the site following any changes means you accept the new terms.
                    </p>
                </>
            ),
        },
    ];

    return (
        <LegalPageLayout
            title="Terms & Conditions"
            subtitle="Please read these terms carefully before using e-commerce"
            lastUpdated="Last updated: October 2024"
            bannerImage="/images/4bd63419d0d5bed5f051ca7495d98f5c60502037.jpg"
            sections={sections}
        />
    );
}
