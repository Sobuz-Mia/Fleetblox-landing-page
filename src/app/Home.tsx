"use client";
import dynamic from "next/dynamic";
import Navbar from "@/components/ui/shared/Navbar";
import { useEffect } from "react";
import HeroSection from "@/components/modules/home/HeroSection";
import UnifiedFleetManagement from "@/components/modules/home/UnifiedFleetManagement";

const FleetSolution = dynamic(
  () => import("@/components/modules/home/FleetSolution"),
  { ssr: false }
);
const VirtualSlot = dynamic(
  () => import("@/components/modules/home/withVirtualSlot/VirtualSlot"),
  { ssr: false }
);
const FleetBloxVerseSection = dynamic(
  () =>
    import("@/components/modules/home/fleetBloxVersus/FleetBloxVerseSection"),
  { ssr: false }
);
const ConnectRemotelySection = dynamic(
  () => import("@/components/modules/home/ConnectRemotelySection"),
  { ssr: false }
);
const WorkforceManageSection = dynamic(
  () => import("@/components/modules/home/WorkforceManageSection"),
  { ssr: false }
);
const AiSupportSection = dynamic(
  () => import("@/components/modules/home/AiSupportSection"),
  { ssr: false }
);
const GlobalCoverageAndCompatibility = dynamic(
  () => import("@/components/modules/home/GlobalCoverageAndCompatibility"),
  { ssr: false }
);
// const SlideShowSection = dynamic(
//   () => import("@/components/modules/home/SlideShowSection"),
//   { ssr: true }
// );
const BlogSection = dynamic(
  () => import("@/components/modules/home/BlogSection"),
  { ssr: false }
);
const FAQSection = dynamic(
  () => import("@/components/modules/home/FAQSection"),
  { ssr: false }
);
const Footer = dynamic(() => import("@/components/ui/shared/Footer"), {
  ssr: false,
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
      localStorage.removeItem("isGetDemo");
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
