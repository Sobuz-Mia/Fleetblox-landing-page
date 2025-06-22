"use client";
import React, { useState, useEffect } from "react";
import FleetBloxIconWhite from "@/components/icons/FleetBloxIconWhite";
import { Stepper } from "@/components/ui/stepper";
import { useProgressUpdater } from "@/hooks/useProgress";
import Link from "next/link";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isStarterFleet, setIsStarterFleet] = useState(false);
  const [isGetDemo, setIsGetDemo] = useState(false); // Placeholder for isGetDemo, if needed
  const { currentStep, setCurrentStep } = useProgressUpdater();

  console.log(isMobile);

  // Check if the selected plan is Starter Fleet
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const selectedPlanData = localStorage.getItem("selectedPlan");
        const isGetDemo = localStorage.getItem("isGetDemo");
        if (isGetDemo) {
          setIsGetDemo(JSON.parse(isGetDemo));
        }
        if (selectedPlanData) {
          const selectedPlan = JSON.parse(selectedPlanData);
          if (selectedPlan.fleet === "Starter Fleet") {
            setIsStarterFleet(true);

            // Adjust current step if needed (skip pricing step)
            if (currentStep > 0) {
              setCurrentStep(currentStep === 1 ? 2 : currentStep);
            }
          }
        }
      } catch (error) {
        console.error("Error parsing selectedPlan from localStorage:", error);
      }
    }
  }, [currentStep, setCurrentStep]);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Define base steps
  const baseSteps = [
    {
      title: "Check Compatibility",
      description: "Verify Your Fleet's Compatibility",
    },
  ];

  // Add pricing step only if NOT using Starter Fleet
  const submitDetails = {
    title: "Submit your details",
    description: "Provide your personal and brand information.",
  };
  const pricingStep = {
    title: "Select Pricing",
    description: "Choose Your Subscription Plan",
  };

  const checkoutStep = {
    title: "Complete Checkout",
    description: "Review and Provide Your Info",
  };
  // Build the final steps array based on plan type
  const sidebarSteps = isGetDemo
    ? [...baseSteps, submitDetails]
    : isStarterFleet
    ? [...baseSteps, checkoutStep]
    : [...baseSteps, pricingStep, checkoutStep];

  return (
    <>
      <aside
        className={`min-w-[350px] bg-[#2D65F2] overflow-y-auto transition-all duration-300 
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          fixed lg:static h-screen z-40
          hidden lg:block`}
      >
        <div className="p-4">
          <Link href="/">
            <div className="flex items-center justify-center mt-10 ">
              <FleetBloxIconWhite />
            </div>
          </Link>
          <nav className="mt-6 flex justify-center">
            <Stepper steps={sidebarSteps} currentStep={currentStep} />
          </nav>
        </div>
        <div className="mt-8 flex justify-between"></div>
      </aside>
    </>
  );
};

export default Sidebar;
