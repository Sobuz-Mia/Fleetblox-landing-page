"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import useScrollSpy from "@/hooks/useScrollSpy";
import Image from "next/image";

const ScrollingSection = ({
  animationItems,
}: {
  animationItems: Array<{ title: string; content: string; image: string }>;
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    handleResize();

    // Add event listener with debounce for performance
    let timeoutId: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 100);
    };

    window.addEventListener("resize", debouncedResize);

    return () => {
      window.removeEventListener("resize", debouncedResize);
      clearTimeout(timeoutId);
    };
  }, []);

  const { activeIndex, componentRef } = useScrollSpy(
    ".scroll-section",
    isMobile ? 0.4 : 0.8
  );

  return (
    <div ref={componentRef} className="pt-10">
      {isMobile ? (
        // Mobile View - Vertical Cards with improved sizing
        <div className="flex flex-col bg-white">
          {animationItems.map((data, index) => (
            <section
              key={index}
              className="scroll-section min-h-[80vh] flex flex-col p-4"
              data-index={index}
            >
              {/* Image Container - Fixed height prevents layout shifts */}
              <div className="h-[250px] sm:h-[300px] flex items-center justify-center mb-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false, margin: "-100px 0px -100px 0px" }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full relative flex justify-center"
                >
                  <Image
                    src={data.image}
                    alt={data.title}
                    width={400}
                    height={300}
                    priority={index === 0} // Prioritize the first image
                    quality={75}
                    loading={index === 0 ? "eager" : "lazy"}
                    className="object-contain h-full"
                    sizes="(max-width: 768px) 90vw, 50vw"
                  />
                </motion.div>
              </div>

              {/* Text Container */}
              <div className="flex-1 flex items-start justify-center p-4">
                <div className="max-w-full w-full">
                  <h2 className="pb-3 pt-2 font-montserrat text-xl sm:text-2xl font-bold text-[#04082C]">
                    {data.title}
                  </h2>
                  <p className="font-openSans text-[#333] text-sm sm:text-base">
                    {data.content}
                  </p>
                </div>
              </div>
            </section>
          ))}
        </div>
      ) : (
        // Desktop View - Side-by-side layout with improved positioning
        <div className="flex flex-col md:flex-row bg-white">
          {/* Left Image Column - Fixed to viewport */}
          <div className="md:sticky md:top-0 flex h-auto md:h-screen w-full md:w-1/2 items-center justify-center bg-gradient-to-b from-white via-[#FEFAF0] to-white py-8 md:py-0">
            <div className="relative w-full h-full flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="w-full flex items-center justify-center"
                >
                  <div className="relative flex items-center justify-center px-4 sm:px-0 h-[350px] lg:h-[430px]">
                    <Image
                      src={animationItems[activeIndex].image}
                      alt={`Animation slide ${activeIndex + 1}`}
                      width={630}
                      height={430}
                      className="object-contain h-full"
                      priority={activeIndex === 0}
                      quality={75}
                      loading={activeIndex === 0 ? "eager" : "lazy"}
                      sizes="(max-width: 1024px) 90vw, 630px"
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Text Column - Scrollable content */}
          <div className="relative flex w-full md:w-1/2 flex-col">
            {/* Top fade gradient */}
            <div className="hidden md:block absolute left-0 top-0 h-[100px] w-full bg-gradient-to-b from-white z-10 pointer-events-none"></div>
            {/* Bottom fade gradient */}
            <div className="hidden md:block absolute bottom-0 left-0 h-[100px] w-full bg-gradient-to-t from-white z-10 pointer-events-none"></div>

            <div className="flex flex-col">
              {animationItems.map((data, index) => (
                <div
                  key={index}
                  className={`scroll-section flex min-h-[60vh] md:min-h-screen items-center p-4 md:p-8 ${
                    activeIndex === index ? "active-section" : ""
                  }`}
                  data-index={index}
                >
                  <div className="w-full md:max-w-[480px] lg:max-w-[520px]">
                    <h2 className="pb-4 pt-2 font-montserrat text-2xl md:text-3xl font-bold text-[#04082C]">
                      {data.title}
                    </h2>
                    <p className="font-openSans text-[#333] text-base md:text-lg">
                      {data.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScrollingSection;
