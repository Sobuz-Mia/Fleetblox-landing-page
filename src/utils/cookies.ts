"use client";

import Cookies from "js-cookie";

// Cookie configuration with security features
const COOKIE_CONFIG = {
    expires: 30, // Days
    secure: process.env.NODE_ENV === "production", // Secure in production
    sameSite: "strict" as const, // Strict same-site policy
};

// User data cookie name constants
export const COOKIE_NAMES = {
    USER_INFO: "fleetblox_user_info",
    PAYMENT_TYPE: "fleetblox_payment_type",
    SESSION_TOKEN: "fleetblox_session",
    USER_PREFERENCES: "fleetblox_preferences",
    REGION: "fleetblox_region",
};

// Type definitions for user data
export interface UserInfo {
    userId?: string;
    email?: string;
    name?: string;
    company?: string;
    lastLogin?: string;
}

export interface UserPreferences {
    theme?: "light" | "dark";
    language?: string;
    notifications?: boolean;
    dashboard?: {
        layout?: string;
        widgets?: string[];
    };
}

export interface PaymentInfo {
    type?: "credit" | "paypal" | "bank_transfer" | "invoice";
    lastUsed?: string;
    savedCards?: string[]; // Last 4 digits only
}

// Cookie operations for user data
export const CookieUtils = {
    // User info management
    getUserInfo: (): UserInfo | null => {
        try {
            const data = Cookies.get(COOKIE_NAMES.USER_INFO);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error("Error parsing user info cookie:", error);
            return null;
        }
    },

    setUserInfo: (userInfo: UserInfo): void => {
        Cookies.set(COOKIE_NAMES.USER_INFO, JSON.stringify(userInfo), COOKIE_CONFIG);
    },

    // User preferences
    getUserPreferences: (): UserPreferences | null => {
        try {
            const data = Cookies.get(COOKIE_NAMES.USER_PREFERENCES);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error("Error parsing user preferences cookie:", error);
            return null;
        }
    },

    setUserPreferences: (preferences: UserPreferences): void => {
        Cookies.set(
            COOKIE_NAMES.USER_PREFERENCES,
            JSON.stringify(preferences),
            COOKIE_CONFIG
        );
    },

    // Payment information (handle with care)
    getPaymentInfo: (): PaymentInfo | null => {
        try {
            const data = Cookies.get(COOKIE_NAMES.PAYMENT_TYPE);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error("Error parsing payment info cookie:", error);
            return null;
        }
    },

    setPaymentInfo: (paymentInfo: PaymentInfo): void => {
        Cookies.set(
            COOKIE_NAMES.PAYMENT_TYPE,
            JSON.stringify(paymentInfo),
            COOKIE_CONFIG
        );
    },

    // Authentication token (session)
    getSessionToken: (): string | null => {
        return Cookies.get(COOKIE_NAMES.SESSION_TOKEN) || null;
    },

    setSessionToken: (token: string): void => {
        Cookies.set(COOKIE_NAMES.SESSION_TOKEN, token, COOKIE_CONFIG);
    },

    // User region
    getUserRegion: (): "eu" | "na" | "other" => {
        const region = Cookies.get(COOKIE_NAMES.REGION);
        if (region === "eu" || region === "na") {
            return region;
        }
        return "other";
    },

    setUserRegion: (region: "eu" | "na" | "other"): void => {
        Cookies.set(COOKIE_NAMES.REGION, region, COOKIE_CONFIG);
    },

    // Clear specific or all user cookies
    clearUserCookies: (specific?: string): void => {
        if (specific) {
            Cookies.remove(specific);
        } else {
            // Clear all user-related cookies
            Object.values(COOKIE_NAMES).forEach((cookieName) => {
                Cookies.remove(cookieName);
            });
        }
    },

    // Check if a specific cookie exists
    hasCookie: (name: string): boolean => {
        return !!Cookies.get(name);
    },
};

export default CookieUtils;
