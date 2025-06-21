"use client";
import dynamic from "next/dynamic";
import Navbar from "@/components/ui/shared/Navbar";

import { useEffect } from "react";

import UnifiedFleetManagement from "@/components/modules/home/UnifiedFleetManagement";

const HeroSection = dynamic(
  () => import("@/components/modules/home/HeroSection"),
  { ssr: true }
);

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
// const SlideShowSection = dynamic(
//   () => import("@/components/modules/home/SlideShowSection"),
//   { ssr: true }
// );
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
    }
  }, []);
  return (
    <div>
      <Navbar />
      <HeroSection />
      <FleetSolution />
      <ConnectRemotelySection />
      <VirtualSlot />
      <UnifiedFleetManagement />
      <WorkforceManageSection />
      <FleetBloxVerseSection />
      <AiSupportSection />
      <GlobalCoverageAndCompatibility />
      {/* <SlideShowSection /> */}
      <BlogSection />
      <FAQSection />
      <Footer />
    </div>
  );
}
