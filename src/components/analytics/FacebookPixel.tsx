"use client";

import { useEffect, useCallback } from "react";
import Script from "next/script";
import { useCookieConsent } from "@/providers/CookieConsentProvider";

// Replace this with your actual Facebook Pixel ID
const FB_PIXEL_ID = "XXXXXXXXXXXXXXX";

// Utility functions for Facebook Pixel management
const fbPixelUtils = {
  init: (pixelId: string = FB_PIXEL_ID) => {
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("init", pixelId);
      window.fbq("consent", "grant");
      window.fbq("track", "PageView");
    }
  },

  revokeConsent: () => {
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("consent", "revoke");
    }
  },

  clearCookies: () => {
    if (typeof document !== "undefined") {
      const cookies = document.cookie.split(";");
      cookies.forEach((cookie) => {
        const trimmedCookie = cookie.trim();
        if (
          trimmedCookie.startsWith("_fbp=") ||
          trimmedCookie.startsWith("_fbc=")
        ) {
          const cookieName = trimmedCookie.split("=")[0];
          document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname}`;
        }
      });
    }
  },
};

export default function FacebookPixel() {
  const { consent } = useCookieConsent();

  // Initialize Facebook Pixel
  const initializePixel = useCallback(() => {
    fbPixelUtils.init();
  }, []);

  // Handle consent revocation
  const revokeConsent = useCallback(() => {
    fbPixelUtils.revokeConsent();
    fbPixelUtils.clearCookies();
  }, []);

  useEffect(() => {
    if (!consent.marketing) {
      revokeConsent();
    }
  }, [consent.marketing, revokeConsent]);

  // Don't render anything if marketing consent is not given
  if (!consent.marketing) return null;

  return (
    <>
      {/* Facebook Pixel Script with Next.js 15 optimizations */}
      <Script
        id="facebook-pixel"
        strategy="afterInteractive"
        onLoad={initializePixel}
        dangerouslySetInnerHTML={{
          __html: `
                        !function(f,b,e,v,n,t,s)
                        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                        n.queue=[];t=b.createElement(e);t.async=!0;
                        t.src=v;s=b.getElementsByTagName(e)[0];
                        s.parentNode.insertBefore(t,s)}(window, document,'script',
                        'https://connect.facebook.net/en_US/fbevents.js');
                    `,
        }}
      />

      {/* No-script fallback optimized for Next.js */}
      <noscript>
        <div
          style={{
            position: "absolute",
            width: "1px",
            height: "1px",
            overflow: "hidden",
            background: `url(https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1)`,
          }}
          aria-hidden="true"
        />
      </noscript>
    </>
  );
}
