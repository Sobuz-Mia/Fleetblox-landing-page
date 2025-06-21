"use client";
import { useState, useEffect, createContext, useContext } from "react";
import { usePathname } from "next/navigation";

interface ProgressContextType {
  progress: number;
  setProgress: (value: number) => void;
  setCustomProgress: (value: number) => void;
  apiResponse: unknown[];
  setApiResponse: (response: unknown[]) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  steps: {
    SELECT_COUNTRY: string;
    SUBMIT_DETAILS: string;
    SELECT_BRAND: string;
    SELECT_BRAND_MODEL: (model: string) => string;
    COMPATIBLE: string;
    PRICING_PLAN: string;
    CHECKOUT: string;
    VIN: string;
  };
}

const ProgressContext = createContext<ProgressContextType>({
  progress: 0,
  setProgress: () => {},
  setCustomProgress: () => {},
  apiResponse: [],
  setApiResponse: () => {},
  currentStep: 0,
  setCurrentStep: () => {},
  steps: {
    SELECT_COUNTRY: "/getting-started",
    SUBMIT_DETAILS: "/submit-details",
    SELECT_BRAND: "/collections/select-brand",
    SELECT_BRAND_MODEL: (model: string) => `/collections/select-brand/${model}`,
    COMPATIBLE: "/collections/compatible",
    PRICING_PLAN: "/collections/pricing-plan",
    CHECKOUT: "/collections/checkout",
    VIN: "/collections/VIN",
  },
});

export const useProgressUpdater = () => useContext(ProgressContext);

export const ProgressProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  const [currentPath, setCurrentPath] = useState("/getting-started");
  const [progress, setProgressState] = useState(10); // Start with 10%
  const [apiResponse, setApiResponseState] = useState<unknown[]>([]);

  // Initialize currentStep from localStorage (if available)
  const [currentStep, setCurrentStep] = useState<number>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("currentStep");
      return saved ? Number(saved) : 0;
    }
    return 0;
  });

  // Persist currentStep to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("currentStep", currentStep.toString());
    }
  }, [currentStep]);

  const setApiResponse = (response: unknown[]) => {
    setApiResponseState(response);
  };

  const setProgress = (value: number) => {
    setProgressState((prev) => Math.min(100, prev + value));
  };

  const steps = {
    SELECT_COUNTRY: "/getting-started",
    SUBMIT_DETAILS: "/submit-details",
    SELECT_BRAND: "/collections/select-brand",
    SELECT_BRAND_MODEL: (model: string) => `/collections/select-brand/${model}`,
    COMPATIBLE: "/collections/compatible",
    PRICING_PLAN: "/collections/pricing-plan",
    CHECKOUT: "/collections/checkout",
    SUCCESS: "/result/paymentSuccess",
    VIN: "/collections/VIN",
  };

  const setCustomProgress = (value: number) => {
    if (value >= 0 && value <= 100) {
      setProgressState(value);
    } else {
      console.warn("Progress value should be between 0 and 100");
    }
  };

  // Calculate baseline progress based on the current route
  useEffect(() => {
    setCurrentPath(pathname);

    // Get the base progress from the route
    const calculateBaseProgress = () => {
      // Brand selection path
      if (pathname === steps.SELECT_COUNTRY) {
        return 10; // Starting point
      } else if (pathname === steps.SELECT_BRAND) {
        return 20; // Brand selection
      } else if (pathname.includes("/collections/select-brand/")) {
        return 40; // Model selection (midway)
      } else if (pathname === "/collections/compatibility") {
        return 60; // Compatibility check
      } else if (pathname === steps.COMPATIBLE) {
        return 70; // Compatible results
      } else if (pathname === steps.PRICING_PLAN) {
        return 85; // Pricing plan selection
      } else if (pathname === steps.CHECKOUT) {
        return 95; // Checkout/final step
      } else if (pathname === steps.SUCCESS) {
        return 100; // Payment success
      }
      // VIN path
      else if (pathname === steps.VIN) {
        return 30; // VIN entry (shortcut path)
      }

      // Default fallback
      return progress;
    };

    // Don't override manual progress settings unless the route changes
    if (pathname !== currentPath) {
      setCustomProgress(calculateBaseProgress());
    }
  }, [pathname]);

  const value: ProgressContextType = {
    progress,
    setProgress,
    setCustomProgress,
    apiResponse,
    setApiResponse,
    currentStep,
    setCurrentStep,
    steps,
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
};
