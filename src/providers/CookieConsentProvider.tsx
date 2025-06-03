/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

type CookieConsentType = {
    analytics: boolean;
    marketing: boolean;
    necessary: boolean;
    preferences: boolean;
};

type CookieConsentContextType = {
    consent: CookieConsentType;
    updateConsent: (type: keyof CookieConsentType, value: boolean) => void;
    acceptAll: () => void;
    rejectAll: () => void;
    showConsentBanner: boolean;
    setShowConsentBanner: (show: boolean) => void;
    userRegion: "eu" | "na" | "other";
};

const defaultConsent: CookieConsentType = {
    necessary: true, // Always true as necessary cookies are required
    analytics: false,
    marketing: false,
    preferences: false,
};

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(
    undefined
);

export function useCookieConsent() {
    const context = useContext(CookieConsentContext);
    if (!context) {
        throw new Error(
            "useCookieConsent must be used within a CookieConsentProvider"
        );
    }
    return context;
}

export function CookieConsentProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [consent, setConsent] = useState<CookieConsentType>(defaultConsent);
    const [showConsentBanner, setShowConsentBanner] = useState<boolean>(true);
    const [userRegion, setUserRegion] = useState<"eu" | "na" | "other">("other");

    // Determine user's region based on timezone or IP (simplified version)
    useEffect(() => {
        const detectRegion = () => {
            // This is a simple method - in production, you might want to use a geolocation service
            const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

            // European timezones (this is a simplified list)
            const euTimezones = [
                "Europe/",
                "Arctic/Longyearbyen",
            ];

            // North American timezones (this is a simplified list)
            const naTimezones = [
                "America/",
                "Canada/",
            ];

            if (euTimezones.some(tz => timezone.startsWith(tz))) {
                setUserRegion("eu");
            } else if (naTimezones.some(tz => timezone.startsWith(tz))) {
                setUserRegion("na");
            } else {
                setUserRegion("other");
            }
        };

        detectRegion();
    }, []);

    // Load saved consent from cookies
    useEffect(() => {
        const savedConsent = Cookies.get("cookie-consent");

        if (savedConsent) {
            try {
                const parsedConsent = JSON.parse(savedConsent);
                setConsent(parsedConsent);
                setShowConsentBanner(false);
            } catch (error) {
                console.error("Error parsing saved consent:", error);
            }
        } else {
            // Show banner if no consent is saved
            setShowConsentBanner(true);
        }
    }, []);

    // Update consent for a specific type
    const updateConsent = (type: keyof CookieConsentType, value: boolean) => {
        const newConsent = { ...consent, [type]: value };
        setConsent(newConsent);
        Cookies.set("cookie-consent", JSON.stringify(newConsent), { expires: 365 });

        // Initialize or remove services based on consent
        applyConsent(newConsent);
    };

    // Accept all cookie types
    const acceptAll = () => {
        const allConsent = {
            necessary: true,
            analytics: true,
            marketing: true,
            preferences: true,
        };

        setConsent(allConsent);
        Cookies.set("cookie-consent", JSON.stringify(allConsent), { expires: 365 });
        setShowConsentBanner(false);

        // Initialize services
        applyConsent(allConsent);
    };

    // Reject all non-necessary cookies
    const rejectAll = () => {
        const necessaryOnlyConsent = {
            necessary: true,
            analytics: false,
            marketing: false,
            preferences: false,
        };

        setConsent(necessaryOnlyConsent);
        Cookies.set("cookie-consent", JSON.stringify(necessaryOnlyConsent), { expires: 365 });
        setShowConsentBanner(false);

        // Remove non-necessary services
        applyConsent(necessaryOnlyConsent);
    };

    // Apply consent settings by initializing or removing services
    const applyConsent = (currentConsent: CookieConsentType) => {
        // Google Analytics
        if (currentConsent.analytics) {
            // Initialize Google Analytics
            if (typeof window !== "undefined" && window.gtag) {
                window.gtag("consent", "update", {
                    analytics_storage: "granted",
                });
            }
        } else {
            // Remove Google Analytics cookies
            if (typeof window !== "undefined" && window.gtag) {
                window.gtag("consent", "update", {
                    analytics_storage: "denied",
                });
            }

            // Remove GA cookies
            const cookiesToRemove = ["_ga", "_gid", "_gat", "ga-disable-G-16BPKJV2ZY"];
            cookiesToRemove.forEach(name => Cookies.remove(name));
        }

        // Facebook Pixel
        if (currentConsent.marketing) {
            // Initialize Facebook Pixel if it exists
            if (typeof window !== "undefined" && window.fbq) {
                window.fbq("consent", "grant");
            }
        } else {
            // Disable Facebook Pixel
            if (typeof window !== "undefined" && window.fbq) {
                window.fbq("consent", "revoke");
            }

            // Remove FB cookies
            document.cookie.split(";").forEach(c => {
                if (c.trim().startsWith("_fbp=") || c.trim().startsWith("_fbc=")) {
                    const cookieName = c.split("=")[0];
                    Cookies.remove(cookieName);
                }
            });
        }
    };

    return (
        <CookieConsentContext.Provider
            value={{
                consent,
                updateConsent,
                acceptAll,
                rejectAll,
                showConsentBanner,
                setShowConsentBanner,
                userRegion,
            }}
        >
            {children}
        </CookieConsentContext.Provider>
    );
}

// Types for window object with analytics
declare global {
    interface Window {
        gtag: any;
        fbq: any;
        dataLayer: any;
    }
}
