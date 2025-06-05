/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect } from "react";
import CookieUtils from "@/utils/cookies";

export default function ClientSideInitialization({
  children,
}: {
  children: React.ReactNode;
}) {

  useEffect(() => {
    // Check if we're in browser context
    if (typeof window !== "undefined") {
      // Clear localStorage items
      // localStorage.removeItem("country");
      // localStorage.removeItem("countries");
      // localStorage.removeItem("selectedPlan");
      // localStorage.removeItem("brands");
      // localStorage.removeItem("brandCarList");
      // localStorage.removeItem("brandModels");
      // localStorage.removeItem("VINS");
      // localStorage.removeItem("VINS_RESULT");
      // localStorage.removeItem("compatibility");
      // localStorage.removeItem("selectedCountries");

      // Set user region in cookies based on timezone
      const detectRegion = () => {
        // This is a simple method - in production, you might want to use a geolocation service
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        // European timezones (simplified list)
        const euTimezones = [
          "Europe/",
          "Arctic/Longyearbyen",
        ];

        // North American timezones (simplified list)
        const naTimezones = [
          "America/",
          "Canada/",
        ];

        if (euTimezones.some(tz => timezone.startsWith(tz))) {
          CookieUtils.setUserRegion("eu");
          return "eu";
        } else if (naTimezones.some(tz => timezone.startsWith(tz))) {
          CookieUtils.setUserRegion("na");
          return "na";
        } else {
          CookieUtils.setUserRegion("other");
          return "other";
        }
      };

      const userRegion = detectRegion();

      // Set default user preferences if they don't exist
      if (!CookieUtils.getUserPreferences()) {
        CookieUtils.setUserPreferences({
          theme: "light",
          language: "en",
          notifications: true,
        });
      }
    }
  }, []);

  // Initialize smooth scroll
  useEffect(() => {
    import("locomotive-scroll").then((locomotiveModule) => {
      const LocomotiveScroll = locomotiveModule.default;
      new LocomotiveScroll({
        lenisOptions: {
          duration: 1.5,
          orientation: "vertical",
          gestureOrientation: "vertical",
          smoothWheel: true,
          wheelMultiplier: 0.75,
          touchMultiplier: 1.5,
          easing: (t: number) => 1 - Math.pow(1 - t, 5),
        },
      });
    });
  }, []);

  return <>{children}</>;
}
