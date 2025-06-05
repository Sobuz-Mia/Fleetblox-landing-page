/* eslint-disable @typescript-eslint/no-explicit-any */
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
            // Load the Facebook Pixel script
            const script = document.createElement('script');
            script.innerHTML = `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod(...arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
            `;
            document.head.appendChild(script);

            // After script is loaded, initialize Facebook Pixel
            script.onload = () => {
                if (window.fbq) {
                    window.fbq('init', FB_PIXEL_ID);
                    window.fbq('consent', 'grant');
                    window.fbq('track', 'PageView');
                }
            };
        } else {
            // If consent is revoked, remove Facebook Pixel cookies
            if (typeof window !== 'undefined' && window.fbq) {
                window.fbq('consent', 'revoke');
            }

            // Remove Facebook cookies
            const cookies = document.cookie.split(";");
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.startsWith("_fbp=") || cookie.startsWith("_fbc=")) {
                    document.cookie = cookie.split("=")[0] + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                }
            }
        }

        // Clean up function
        return () => {
            if (typeof window !== 'undefined' && !consent.marketing) {
                // Remove the Facebook Pixel script on unmount if consent was revoked
                const scripts = document.getElementsByTagName('script');
                for (let i = 0; i < scripts.length; i++) {
                    if (scripts[i].src.includes('connect.facebook.net/en_US/fbevents.js')) {
                        scripts[i].remove();
                    }
                }
            }
        };
    }, [consent.marketing]);

    if (!consent.marketing) return null;

    // For no-script fallback, using a div as placeholder since Next/Image doesn't work well in noscript tags
    return (
        <>
            <noscript>
                <div
                    style={{
                        position: 'absolute',
                        width: '1px',
                        height: '1px',
                        overflow: 'hidden'
                    }}
                    dangerouslySetInnerHTML={{
                        __html: `
                        <img 
                            height="1" 
                            width="1" 
                            style="display:none" 
                            alt="" 
                            src="https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1"
                        />
                        `
                    }}
                />
            </noscript>
        </>
    );
}

