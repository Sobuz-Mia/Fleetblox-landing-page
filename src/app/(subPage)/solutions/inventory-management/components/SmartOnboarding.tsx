"use client";

import React, { useEffect, useRef, useState } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
const SmartOnboarding = ({
  OnboardingData,
}: {
  OnboardingData: Array<{ title: string; content: string }>;
}) => {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (pathname === "/") {
        localStorage.clear();
      }
    }
  }, [pathname]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const progressIntervalRef = useRef<ReturnType<typeof setInterval> | null>(
    null
  );

  useEffect(() => {
    // Reset and start progress for the current active index
    setProgress(0);

    // Clear any existing interval
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }

    // Create new interval for progress and auto-progression
    progressIntervalRef.current = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          // Move to next FAQ item
          clearInterval(progressIntervalRef.current!);
          setActiveIndex((prev) => (prev + 1) % OnboardingData.length);
          return 0;
        }
        // Increment progress
        return prevProgress + 100 / 50; // 2 seconds total
      });
    }, 100);

    // Cleanup interval on component unmount or when activeIndex changes
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [activeIndex, OnboardingData.length]);

  // Handle manual item selection
  const handleItemClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="mx-auto max-w-[1200px] py-[30px] px-4 sm:px-5 xl:px-0">
      <div className="mt-[20px] sm:mt-[30px] flex flex-col lg:flex-row items-center justify-center gap-x-[20px] md:gap-x-[40px]">
        {/* video container with fixed height to prevent layout shifts */}
        <div className="w-full lg:flex-1 h-[240px] sm:h-[280px] md:h-[300px] flex items-center justify-center mb-6 lg:mb-0 relative">
          <AnimatePresence>
            <motion.div
              // key={activeIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex justify-center items-center"
            >
              <div className="relative flex justify-center items-center w-full max-w-[350px] sm:max-w-[450px] md:max-w-[550px]">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  // preload="auto"
                  className="w-full h-full"
                >
                  <source
                    src="/videos/solutions/smart-onboarding.mov"
                    type="video/mp4"
                  />
                </video>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* loading deal section */}
        <div
          className={`max-w-[520px]  space-y-[10px] sm:space-y-[12px] ml-0 sm:ml-4 lg:ml-10 py-2 sm:py-4 w-full h-[280px]`}
        >
          {OnboardingData.map((item, index) => (
            <div key={index} className="overflow-hidden flex">
              {/* Loader Indicator */}
              <div className="w-[2px] relative rounded-lg bg-[#DFDFDF]">
                {activeIndex === index && (
                  <motion.div
                    className="absolute top-0 left-0 w-full bg-[#2D65F2]"
                    style={{
                      borderRadius: "15px",
                    }}
                    initial={{ height: 0 }}
                    animate={{ height: `${progress}%` }}
                    transition={{ duration: 0.1, ease: "linear" }}
                  />
                )}
              </div>

              {/* Content Container */}
              <div
                className={`max-w-[520px] w-full px-[12px] sm:px-[16px] py-[8px] sm:py-[10px]`}
              >
                {/* Question Section */}
                <div
                  onClick={() => handleItemClick(index)}
                  className={`cursor-pointer flex items-center justify-between ${
                    activeIndex === index ? "text-[#2D65F2]" : "text-[#04082C]"
                  }`}
                >
                  <h3 className="text-[15px] sm:text-[16px] md:text-[18px] font-bold font-openSans">
                    {item.title}
                  </h3>
                </div>

                {/* Answer Section - Always render but conditionally show for smoother transitions */}
                <div
                  className={`text-[#333333] font-openSans mt-[8px] sm:mt-[10px] text-[12px] sm:text-[13px] md:text-[14px] leading-[1.5] transition-all duration-300 ${
                    activeIndex === index
                      ? "opacity-100 max-h-[300px]"
                      : "opacity-0 max-h-0 overflow-hidden"
                  }`}
                >
                  {item.content}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SmartOnboarding;
