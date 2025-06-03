"use client";


import Navbar from "@/components/ui/shared/Navbar";
import Footer from "@/components/ui/shared/Footer";

export default function TermsOfService() {
    return (
        <div className="bg-white">
            <Navbar />

            <main className="container mx-auto px-4 py-12 max-w-4xl">
                <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>

                <div className="prose prose-lg">
                    <p className="mb-4">Last Updated: June 3, 2025</p>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">1. Agreement to Terms</h2>
                    <p>
                        By accessing or using FleetBlox services, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access our services.
                    </p>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">2. Description of Services</h2>
                    <p>
                        FleetBlox provides cloud-based fleet management solutions designed to help businesses optimize their vehicle operations, including but not limited to vehicle tracking, maintenance scheduling, driver management, and analytics.
                    </p>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">3. User Accounts</h2>
                    <p>
                        When you create an account with us, you must provide accurate, complete, and current information. You are responsible for safeguarding the password and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
                    </p>
                    <p>
                        We reserve the right to disable any user account at any time if, in our opinion, you have failed to comply with these Terms of Service.
                    </p>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">4. Subscription and Billing</h2>
                    <p>
                        <strong>4.1 Subscription Plans:</strong> We offer various subscription plans with different features and pricing. You agree to pay the fees associated with your chosen subscription plan.
                    </p>
                    <p>
                        <strong>4.2 Billing Cycle:</strong> Subscription fees are charged in advance on either a monthly or annual basis, depending on the plan you select.
                    </p>
                    <p>
                        <strong>4.3 Automatic Renewal:</strong> Your subscription will automatically renew at the end of each billing cycle unless you cancel it before the renewal date.
                    </p>
                    <p>
                        <strong>4.4 Cancellation:</strong> You may cancel your subscription at any time. Upon cancellation, you will continue to have access to the services until the end of your current billing period.
                    </p>
                    <p>
                        <strong>4.5 Refunds:</strong> Refunds are provided in accordance with our Refund Policy, which is incorporated by reference into these Terms.
                    </p>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">5. Intellectual Property</h2>
                    <p>
                        <strong>5.1 Our Content:</strong> The FleetBlox service and its original content, features, and functionality are owned by FleetBlox and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
                    </p>
                    <p>
                        <strong>5.2 Your Content:</strong> You retain ownership of any content you submit to the service. By submitting content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and display your content solely for the purpose of providing the services to you.
                    </p>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">6. Prohibited Uses</h2>
                    <p>You agree not to use the service:</p>
                    <ul className="list-disc pl-5 mb-4">
                        <li>In any way that violates any applicable law or regulation</li>
                        <li>To transmit any material that is defamatory, offensive, or otherwise objectionable</li>
                        <li>To attempt to interfere with the proper working of the service</li>
                        <li>To bypass any measures we may use to prevent or restrict access to the service</li>
                    </ul>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">7. Limitation of Liability</h2>
                    <p>
                        In no event shall FleetBlox, its directors, employees, partners, agents, suppliers, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
                    </p>
                    <ul className="list-disc pl-5 mb-4">
                        <li>Your access to or use of or inability to access or use the service</li>
                        <li>Any conduct or content of any third party on the service</li>
                        <li>Any content obtained from the service</li>
                        <li>Unauthorized access, use, or alteration of your transmissions or content</li>
                    </ul>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">8. Disclaimer</h2>
                    <p>
                        Your use of the service is at your sole risk. The service is provided on an &apos;AS IS&apos; and &apos;AS AVAILABLE&apos; basis. The service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement, or course of performance.
                    </p>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">9. Governing Law</h2>
                    <p>
                        These Terms shall be governed and construed in accordance with the laws of the jurisdiction in which FleetBlox is established, without regard to its conflict of law provisions.
                    </p>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">10. Changes to Terms</h2>
                    <p>
                        We reserve the right to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days&apos; notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
                    </p>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">11. Contact Us</h2>
                    <p>
                        If you have any questions about these Terms, please contact us at:
                    </p>
                    <address className="not-italic">
                        <p>FleetBlox</p>
                        <p>Email: legal@fleetblox.com</p>
                        <p>Phone: +1 (555) 123-4567</p>
                    </address>
                </div>
            </main>

            <Footer />
        </div>
    );
}
