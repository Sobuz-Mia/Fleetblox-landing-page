"use client";

import { useEffect, useState } from 'react';
import CookieUtils, { PaymentInfo, UserInfo, UserPreferences } from '@/utils/cookies';

// Custom hook for accessing user information
export const useUserCookies = () => {
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [userPreferences, setUserPreferences] = useState<UserPreferences | null>(null);
    const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null);
    const [userRegion, setUserRegion] = useState<"eu" | "na" | "other">("other");
    const [isLoaded, setIsLoaded] = useState(false);

    // Load all user data from cookies on first render
    useEffect(() => {
        if (typeof window !== "undefined") {
            // Load user information
            const storedUserInfo = CookieUtils.getUserInfo();
            setUserInfo(storedUserInfo);

            // Load user preferences
            const storedPreferences = CookieUtils.getUserPreferences();
            setUserPreferences(storedPreferences);

            // Load payment information
            const storedPaymentInfo = CookieUtils.getPaymentInfo();
            setPaymentInfo(storedPaymentInfo);

            // Load user region
            const region = CookieUtils.getUserRegion();
            setUserRegion(region);

            setIsLoaded(true);
        }
    }, []);

    // Update user information in state and cookie
    const updateUserInfo = (info: UserInfo) => {
        CookieUtils.setUserInfo(info);
        setUserInfo(info);
    };

    // Update user preferences in state and cookie
    const updateUserPreferences = (preferences: UserPreferences) => {
        CookieUtils.setUserPreferences(preferences);
        setUserPreferences(preferences);
    };

    // Update payment information in state and cookie
    const updatePaymentInfo = (info: PaymentInfo) => {
        CookieUtils.setPaymentInfo(info);
        setPaymentInfo(info);
    };

    // Clear all user data from cookies and state
    const clearUserData = () => {
        CookieUtils.clearUserCookies();
        setUserInfo(null);
        setUserPreferences(null);
        setPaymentInfo(null);
    };

    return {
        userInfo,
        updateUserInfo,
        userPreferences,
        updateUserPreferences,
        paymentInfo,
        updatePaymentInfo,
        userRegion,
        isLoaded,
        clearUserData,
    };
};

export default useUserCookies;
