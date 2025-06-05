"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/ui/shared/Navbar";
import HeroSection from "@/components/modules/home/HeroSection";
import { useEffect } from "react";


const FleetSolution = dynamic(
    () => import("@/components/modules/home/FleetSolution"),
    { ssr: true }
);
const VirtualSlot = dynamic(
    () => import("@/components/modules/home/withVirtualSlot/VirtualSlot"),
    { ssr: true }
);
const FleetBloxVerseSection = dynamic(
    () =>
        import("@/components/modules/home/fleetBloxVersus/FleetBloxVerseSection"),
    { ssr: true }
);
const ConnectRemotelySection = dynamic(
    () => import("@/components/modules/home/ConnectRemotelySection"),
    { ssr: true }
);
const WorkforceManageSection = dynamic(
    () => import("@/components/modules/home/WorkforceManageSection"),
    { ssr: true }
);
const AiSupportSection = dynamic(
    () => import("@/components/modules/home/AiSupportSection"),
    { ssr: true }
);
const GlobalCoverageAndCompatibility = dynamic(
    () => import("@/components/modules/home/GlobalCoverageAndCompatibility"),
    { ssr: true }
);
const SlideShowSection = dynamic(
    () => import("@/components/modules/home/SlideShowSection"),
    { ssr: true }
);
const BlogSection = dynamic(
    () => import("@/components/modules/home/BlogSection"),
    { ssr: true }
);
const FAQSection = dynamic(
    () => import("@/components/modules/home/FAQSection"),
    { ssr: true }
);
const Footer = dynamic(() => import("@/components/ui/shared/Footer"), {
    ssr: true,
});

export default function Home() {


    useEffect(() => {
        // Check if we're in browser context
        if (typeof window !== "undefined") {
            // Clear localStorage items
            localStorage.removeItem("country");
            localStorage.removeItem("countries");
            localStorage.removeItem("selectedPlan");
            localStorage.removeItem("brands");
            localStorage.removeItem("brandCarList");
            localStorage.removeItem("brandModels");
            localStorage.removeItem("VINS");
            localStorage.removeItem("VINS_RESULT");
            localStorage.removeItem("compatibility");
            localStorage.removeItem("selectedCountries");

            // Set user region in cookies based on timezone
            //   const detectRegion = () => {
            //     // This is a simple method - in production, you might want to use a geolocation service
            //     const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

            //     // European timezones (simplified list)
            //     const euTimezones = [
            //       "Europe/",
            //       "Arctic/Longyearbyen",
            //     ];

            //     // North American timezones (simplified list)
            //     const naTimezones = [
            //       "America/",
            //       "Canada/",
            //     ];

            //     if (euTimezones.some(tz => timezone.startsWith(tz))) {
            //       CookieUtils.setUserRegion("eu");
            //       return "eu";
            //     } else if (naTimezones.some(tz => timezone.startsWith(tz))) {
            //       CookieUtils.setUserRegion("na");
            //       return "na";
            //     } else {
            //       CookieUtils.setUserRegion("other");
            //       return "other";
            //     }
            //   };

            //   const userRegion = detectRegion();

            //   // Set default user preferences if they don't exist
            //   if (!CookieUtils.getUserPreferences()) {
            //     CookieUtils.setUserPreferences({
            //       theme: "light",
            //       language: "en",
            //       notifications: true,
            //     });
            //   }
        }
    }, []);
    return (
        <div>
            <Navbar />
            <HeroSection />
            <FleetSolution />
            <VirtualSlot />
            <FleetBloxVerseSection />
            <ConnectRemotelySection />
            <WorkforceManageSection />
            <AiSupportSection />
            <GlobalCoverageAndCompatibility />
            <SlideShowSection />
            <BlogSection />
            <FAQSection />
            <Footer />
        </div>
    );
}
