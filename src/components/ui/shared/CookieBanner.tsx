"use client";

import { useState } from "react";
import { useCookieConsent } from "@/providers/CookieConsentProvider";
import { Switch } from "@/components/ui/switch";

export default function CookieBanner() {
    const {
        consent,
        updateConsent,
        acceptAll,
        rejectAll,
        showConsentBanner,
        setShowConsentBanner,
        userRegion,
    } = useCookieConsent();

    const [showDetails, setShowDetails] = useState(false);

    // Don't render anything if banner shouldn't be shown
    if (!showConsentBanner) {
        return null;
    }

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-xl z-50 border-t border-gray-200">
            <div className="container mx-auto p-4 md:p-6 max-w-7xl">
                <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                    <div className="flex-1">
                        <h2 className="text-xl font-semibold mb-3 text-gray-800">Cookie Preferences</h2>
                        <p className="text-sm text-gray-600 mb-5 leading-relaxed">
                            We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking &apos;Accept All&apos;, you consent to our use of cookies. {userRegion === "eu" && "For EU residents, your consent is required before we use certain types of cookies."} For more information, please read our <a href="/privacy-policy" className="text-blue-600 hover:text-blue-800 underline font-medium">Privacy Policy</a>.
                        </p>

                        {showDetails && (
                            <div className="mb-6 space-y-4">
                                <div className="flex items-center justify-between border-b pb-2">
                                    <div>
                                        <p className="font-medium">Necessary Cookies</p>
                                        <p className="text-xs text-gray-500">
                                            Essential for the website to function properly.
                                        </p>
                                    </div>
                                    <Switch
                                        checked={consent.necessary}
                                        disabled
                                        className="data-[state=checked]:bg-blue-600"
                                    />
                                </div>

                                <div className="flex items-center justify-between border-b pb-2">
                                    <div>
                                        <p className="font-medium">Analytics Cookies</p>
                                        <p className="text-xs text-gray-500">
                                            Help us understand how visitors interact with our website.
                                        </p>
                                    </div>
                                    <Switch
                                        checked={consent.analytics}
                                        onCheckedChange={(checked) => updateConsent("analytics", checked)}
                                        className="data-[state=checked]:bg-blue-600"
                                    />
                                </div>

                                <div className="flex items-center justify-between border-b pb-2">
                                    <div>
                                        <p className="font-medium">Marketing Cookies</p>
                                        <p className="text-xs text-gray-500">
                                            Used to display personalized ads and content.
                                        </p>
                                    </div>
                                    <Switch
                                        checked={consent.marketing}
                                        onCheckedChange={(checked) => updateConsent("marketing", checked)}
                                        className="data-[state=checked]:bg-blue-600"
                                    />
                                </div>

                                <div className="flex items-center justify-between pb-2">
                                    <div>
                                        <p className="font-medium">Preference Cookies</p>
                                        <p className="text-xs text-gray-500">
                                            Remember your settings and preferences.
                                        </p>
                                    </div>
                                    <Switch
                                        checked={consent.preferences}
                                        onCheckedChange={(checked) => updateConsent("preferences", checked)}
                                        className="data-[state=checked]:bg-blue-600"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-2 md:items-end w-full md:w-auto">
                        <button
                            onClick={() => setShowDetails(!showDetails)}
                            className="text-sm text-blue-600 hover:text-blue-800 underline"
                        >
                            {showDetails ? "Hide Preferences" : "Customize Preferences"}
                        </button>
                        <div className="flex gap-2 w-full md:w-auto">
                            <button
                                onClick={rejectAll}
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md border border-gray-300 hover:bg-gray-300 transition duration-200 w-full md:w-auto flex items-center justify-center"
                            >
                                Reject All
                            </button>
                            <button
                                onClick={() => {
                                    acceptAll();
                                    setShowConsentBanner(false);
                                }}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 w-full md:w-auto flex items-center justify-center"
                            >
                                Accept All
                            </button>
                            {showDetails && (
                                <button
                                    onClick={() => setShowConsentBanner(false)}
                                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200 w-full md:w-auto flex items-center justify-center"
                                >
                                    Save Preferences
                                </button>
                            )}
                        </div>
                        <div className="mt-2 text-xs text-gray-500">
                            View our <a href="/terms-of-service" className="text-blue-600 hover:text-blue-800">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
