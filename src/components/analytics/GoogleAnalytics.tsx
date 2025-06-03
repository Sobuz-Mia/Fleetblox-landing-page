"use client";

import { useEffect } from "react";
import Script from "next/script";
import { useCookieConsent } from "@/providers/CookieConsentProvider";

// Replace with your GA4 ID
const GA_MEASUREMENT_ID = "G-16BPKJV2ZY";

export default function GoogleAnalytics() {
    const { consent } = useCookieConsent();

    useEffect(() => {
        // Handle consent changes for Google Analytics
        if (typeof window !== "undefined" && window.gtag) {
            window.gtag("consent", "update", {
                analytics_storage: consent.analytics ? "granted" : "denied",
            });
        }
    }, [consent.analytics]);

    return (
        <>
            {/* Load scripts with proper consent management */}
            <Script
                id="gtm-base"
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            />
            <Script
                id="gtag-init"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            // Set default consent state to 'denied' for ads and analytics
            gtag('consent', 'default', {
              'analytics_storage': 'denied',
              'ad_storage': 'denied',
              'wait_for_update': 500
            });
            
            // Only initialize GA with page view if analytics consent is given
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              send_page_view: ${consent.analytics},
            });
          `,
                }}
            />
        </>
    );
}
