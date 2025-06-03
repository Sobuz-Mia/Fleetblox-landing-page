"use client";


import Navbar from "@/components/ui/shared/Navbar";
import Footer from "@/components/ui/shared/Footer";

export default function PrivacyPolicy() {
    return (
        <div className="bg-white">
            <Navbar />

            <main className="container mx-auto px-4 py-12 max-w-4xl">
                <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

                <div className="prose prose-lg">
                    <p className="mb-4">Last Updated: June 3, 2025</p>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">1. Introduction</h2>
                    <p>
                        FleetBlox (&apos;we&apos;, &apos;our&apos;, or &apos;us&apos;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
                    </p>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">2. Information We Collect</h2>
                    <p>
                        <strong>Personal Information:</strong> We may collect personal identification information such as your name, email address, phone number, and company details when you register for an account, subscribe to our newsletter, or contact our customer support.
                    </p>
                    <p>
                        <strong>Payment Information:</strong> When you purchase our services, we collect payment information necessary to process the transaction. This may include credit card numbers, billing addresses, and other financial information.
                    </p>
                    <p>
                        <strong>Vehicle Information:</strong> To provide our fleet management services, we may collect information about your vehicles, including but not limited to VIN numbers, make, model, and operational data.
                    </p>
                    <p>
                        <strong>Usage Data:</strong> We automatically collect information about how you interact with our website and services, including your IP address, browser type, pages viewed, time spent on pages, and referring website addresses.
                    </p>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">3. Cookies and Tracking Technologies</h2>
                    <p>
                        We use cookies and similar tracking technologies to track the activity on our website and improve your user experience. The cookies we use can be categorized as:
                    </p>
                    <ul className="list-disc pl-5 mb-4">
                        <li><strong>Necessary Cookies:</strong> Essential for the basic functionality of our website.</li>
                        <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website.</li>
                        <li><strong>Marketing Cookies:</strong> Used to display personalized advertisements and content.</li>
                        <li><strong>Preference Cookies:</strong> Enable our website to remember your preferences and settings.</li>
                    </ul>
                    <p>
                        You can choose to have your computer warn you each time a cookie is being sent, or you can choose to turn off all cookies through your browser settings. However, if you disable cookies, some features of our website may not function properly.
                    </p>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">4. How We Use Your Information</h2>
                    <p>We may use the information we collect for various purposes, including:</p>
                    <ul className="list-disc pl-5 mb-4">
                        <li>Providing and maintaining our services</li>
                        <li>Processing your transactions</li>
                        <li>Sending you service-related notifications</li>
                        <li>Responding to your inquiries and providing customer support</li>
                        <li>Sending you marketing and promotional communications (with your consent)</li>
                        <li>Analyzing and improving our website and services</li>
                        <li>Detecting, preventing, and addressing technical issues or fraudulent activities</li>
                    </ul>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">5. Data Sharing and Disclosure</h2>
                    <p>We may share your information with:</p>
                    <ul className="list-disc pl-5 mb-4">
                        <li><strong>Service Providers:</strong> Third-party companies that perform services on our behalf, such as payment processing, data analysis, and customer service.</li>
                        <li><strong>Business Partners:</strong> Companies with whom we collaborate to offer joint services or promotions.</li>
                        <li><strong>Legal Requirements:</strong> When required by applicable law, court order, or governmental regulation.</li>
                    </ul>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">6. Data Security</h2>
                    <p>
                        We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, disclosure, alteration, and destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                    </p>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">7. International Data Transfers</h2>
                    <p>
                        Your information may be transferred to and processed in countries outside of your country of residence, including countries that may not have the same data protection laws. We ensure that appropriate safeguards are in place to protect your information in compliance with applicable laws.
                    </p>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">8. Your Rights</h2>
                    <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
                    <ul className="list-disc pl-5 mb-4">
                        <li>Accessing, correcting, or deleting your personal information</li>
                        <li>Restricting or objecting to our processing of your information</li>
                        <li>Requesting a copy of your information in a structured, machine-readable format</li>
                        <li>Withdrawing your consent at any time (where processing is based on consent)</li>
                    </ul>
                    <p>
                        To exercise these rights, please contact us using the information provided in the &apos;Contact Us&apos; section.
                    </p>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">9. Children&apos;s Privacy</h2>
                    <p>
                        Our services are not intended for individuals under the age of 18, and we do not knowingly collect personal information from children. If we become aware that we have collected personal information from a child without verification of parental consent, we will take steps to remove that information from our servers.
                    </p>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">10. Changes to This Privacy Policy</h2>
                    <p>
                        We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by posting the updated Privacy Policy on this page with a revised &apos;Last Updated&apos; date.
                    </p>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">11. Contact Us</h2>
                    <p>
                        If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:
                    </p>
                    <address className="not-italic">
                        <p>FleetBlox</p>
                        <p>Email: privacy@fleetblox.com</p>
                        <p>Phone: +1 (555) 123-4567</p>
                    </address>
                </div>
            </main>

            <Footer />
        </div>
    );
}
