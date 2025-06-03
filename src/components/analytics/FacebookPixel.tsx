/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";

import { useEffect } from "react";
import { useCookieConsent } from "@/providers/CookieConsentProvider";

// Replace this with your actual Facebook Pixel ID
const FB_PIXEL_ID = "XXXXXXXXXXXXXXX";

// Extend window interface with Facebook Pixel properties
declare global {
    interface Window {
        fbq: any;
        _fbq: any;
    }
}

export default function FacebookPixel() {
    const { consent } = useCookieConsent();

    useEffect(() => {
        // Only initialize Facebook Pixel if marketing consent is given
        if (consent.marketing) {
            // Initialize Facebook Pixel
            (function (f: Window, b: Document, e: string, v: string, n?: any, t?: HTMLScriptElement, s?: Element) {
                if (f.fbq) return;
                n = f.fbq = function (...args: any[]) {
                    (n as any).callMethod ?
                        (n as any).callMethod.apply(n, args) : (n as any).queue.push(args);
                };
                if (!f._fbq) f._fbq = n;
                (n as any).push = n;
                (n as any).loaded = true;
                (n as any).version = '2.0';
                (n as any).queue = [];
                t = b.createElement(e) as HTMLScriptElement;
                t.async = true;
                t.src = v;
                s = b.getElementsByTagName(e)[0];
                s?.parentNode?.insertBefore(t, s);
            })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

            // Initialize with consent granted
            fbq('init', FB_PIXEL_ID);
            fbq('consent', 'grant');
            fbq('track', 'PageView');
        } else if (window.fbq) {
            // If fbq exists but consent is not granted, revoke consent
            fbq('consent', 'revoke');
        }

        // Clean up function
        return () => {
            if (window.fbq && !consent.marketing) {
                fbq('consent', 'revoke');
            }
        };
    }, [consent.marketing]);

    if (!consent.marketing) return null;

    // Note: This noscript part needs to be added to your HTML body in a production environment
    return (
        <>
            {/* Facebook Pixel noscript tracking */}
            <noscript>
                <img
                    height="1"
                    width="1"
                    style={{ display: "none" }}
                    alt=""
                    src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
                />
            </noscript>
        </>
    );
}
function fbq(arg0: string, FB_PIXEL_ID: string) {
    throw new Error("Function not implemented.");
}

