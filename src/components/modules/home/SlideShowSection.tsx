/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Image from "next/image";
import leader from "../../../../public/images/leader.png";
import pioneer from "../../../../public/images/pioneer.png";
import leader2 from "../../../../public/images/leader2_nobile.webp";
import pioneer2 from "../../../../public/images/pioneer2-mobile.webp";
import NavigationIcon from "@/components/icons/NavigationIcon";
import Link from "next/link";

interface Slide {
  title: string;
  challenge: string;
  solution: string;
  result: string;
  image: any;
  mobileImg: any;
}

const slides: Slide[] = [
  {
    title: "Logistics Leader",
    challenge: "Frequent vehicle downtime and rising operational costs.",
    solution:
      "FleetBox streamlined maintenance scheduling and provided real-time insights",
    result: "30% reduction in downtime and 25% lower operating expenses",
    image: leader,
    mobileImg: leader2,
  },
  {
    title: "EV Fleet Pioneer",
    challenge: "Difficulty managing diverse EV and traditional fleets.",
    solution: "Fleetblox's unified platform integrated EV monitoring tools.",
    result: "Increased efficiency in EV usage and seamless fleet management.",
    image: pioneer,
    mobileImg: pioneer2,
  },
  {
    title: "Logistics Leader",
    challenge: "Frequent vehicle downtime and rising operational costs.",
    solution:
      "FleetBox streamlined maintenance scheduling and provided real-time insights",
    result: "30% reduction in downtime and 25% lower operating expenses",
    image: leader,
    mobileImg: leader2,
  },
  {
    title: "EV Fleet Pioneer",
    challenge: "Difficulty managing diverse EV and traditional fleets.",
    solution: "Fleetblox's unified platform integrated EV monitoring tools.",
    result: "Increased efficiency in EV usage and seamless fleet management.",
    image: pioneer,
    mobileImg: pioneer2,
  },
];

export default function HorizontalStackSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const startAutoSlide = () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % slides.length);
      }, 5000);
    };

    startAutoSlide();
    return () => {
      if (intervalRef.current)
        clearInterval(intervalRef.current as NodeJS.Timeout);
    };
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="w-full min-h-[750px] pt-14 mb-12 bg-white">
      <Container>
        {/* Title for all devices */}
        <h2 className="text-[28px] md:text-[52px] font-bold text-center mb-8 text-[#000E32]">
          Success Stories
        </h2>
        {/* Desktop view */}
        <div className="container hidden lg:block mx-auto px-4 relative">
          {/* Slider Container */}
          <div
            className="relative flex items-center justify-center max-w-full w-full h-[450px] md:h-[500px]"
            onMouseEnter={() =>
              intervalRef.current && clearInterval(intervalRef.current)
            }
            onMouseLeave={() => {
              intervalRef.current = setInterval(() => nextSlide(), 5000);
            }}
          >
            {/* Left Arrow */}
            <button
              onClick={prevSlide}
              className="absolute left-0 xl:left-24 top-1/2 -translate-y-1/2 z-20 bg-white p-2 rounded-full drop-shadow-lg hover:bg-white/90"
            >
              <ChevronLeft className="w-6 h-6 text-[#000E32]" />
            </button>

            {/* Cards Wrapper */}
            <div className="w-full max-w-[800px] h-full relative ">
              <AnimatePresence initial={false}>
                {slides.map((slide, index) => {
                  const isFront = index === currentIndex;
                  const isPrev =
                    index ===
                    (currentIndex - 1 + slides.length) % slides.length;
                  const isNext = index === (currentIndex + 1) % slides.length;
                  const isSecondPrev =
                    index ===
                    (currentIndex - 2 + slides.length) % slides.length;
                  const isSecondNext =
                    index === (currentIndex + 2) % slides.length;

                  // Show additional slides
                  if (
                    !(
                      isFront ||
                      isPrev ||
                      isNext ||
                      isSecondPrev ||
                      isSecondNext
                    )
                  )
                    return null;
                  const position = isFront
                    ? "front"
                    : isPrev
                    ? "prev"
                    : isNext
                    ? "next"
                    : isSecondPrev
                    ? "secondPrev"
                    : "secondNext";

                  return (
                    <motion.div
                      key={index}
                      initial={{
                        opacity: position === "front" ? 0.8 : 0.5,
                        scale: position === "front" ? 0.85 : 0.8,
                        x:
                          position === "front"
                            ? 0
                            : position === "prev"
                            ? -120
                            : 120,
                        zIndex: position === "front" ? 10 : 5,
                      }}
                      animate={{
                        opacity: position === "front" ? 1 : 0.8,
                        scale: position === "front" ? 1 : 0.85,
                        x:
                          position === "front"
                            ? 0
                            : position === "prev"
                            ? -80
                            : 80,
                        zIndex: position === "front" ? 10 : 5,
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.7,
                        x: position === "next" ? 200 : -200,
                      }}
                      transition={{
                        duration: 0.8,
                        ease: "easeOut",
                      }}
                      className="absolute w-full h-full rounded-[24px] p-3 bg-white overflow-hidden drop-shadow-2xl"
                    >
                      <div className="relative overflow-hidden flex flex-col md:flex-row w-full h-full">
                        {/* Left Side (Text) */}
                        <div className="z-20 p-4 md:p-8 w-full md:w-1/2 flex flex-col justify-center space-y-4">
                          <h3 className="text-[28px] md:text-3xl font-bold text-[#0336BC]">
                            {slide.title}
                          </h3>

                          <div className="pt-10">
                            <div className="flex gap-[16px] mb-[10px]">
                              <NavigationIcon />
                              <div className="text-[14px] leading-5">
                                <h2 className="font-bold text-[#333]">
                                  Challenge
                                </h2>
                                <p className="text-[#7D7D7D]">
                                  {slide.challenge}
                                </p>
                              </div>
                            </div>
                            <div className="flex gap-[16px] mb-[10px]">
                              <NavigationIcon />
                              <div className="text-[14px] leading-5">
                                <h2 className="font-bold text-[#333]">
                                  Solution
                                </h2>
                                <p className="text-[#7D7D7D]">
                                  {slide.solution}
                                </p>
                              </div>
                            </div>
                            <div className="flex gap-[16px] mb-[10px]">
                              <NavigationIcon />
                              <div className="text-[14px] leading-5">
                                <h2 className="font-bold text-[#333]">
                                  Result
                                </h2>
                                <p className="text-[#7D7D7D]">{slide.result}</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Ecileps section */}
                        <div className="absolute left-[90px] -top-60 w-[324px] z-10 h-[1000px] rounded-[70%] bg-white"></div>

                        {/* Right Side (Image) */}
                        <div className="relative w-full md:w-1/2 h-48 md:h-auto">
                          <Image
                            src={slide.image}
                            alt={slide.title}
                            fill
                            className="object-cover object-center rounded-r-xl"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority={isFront}
                          />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Right Arrow */}
            <button
              onClick={nextSlide}
              className="absolute right-0 xl:right-24 top-1/2 -translate-y-1/2 z-20 bg-white p-2 rounded-full drop-shadow-lg hover:bg-white/90"
            >
              <ChevronRight className="w-6 h-6 text-[#000E32]" />
            </button>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {[0, 1].map((idx) => (
              <button
                key={idx}
                onClick={() => {
                  const modIndex = currentIndex % 2;
                  if (modIndex !== idx) {
                    setCurrentIndex(idx + Math.floor(currentIndex / 2) * 2);
                  }
                }}
                className={`w-2 h-2 rounded-full transition-colors ${
                  currentIndex % 2 === idx ? "bg-blue-600" : "bg-gray-300"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Mobile View */}
        <div className="lg:hidden flex flex-col items-center justify-center w-full">
          {slides.slice(0, 2).map((slide, index) => (
            <div
              key={index}
              className="flex flex-col rounded-[16px] w-full bg-white mb-8 shadow-md overflow-hidden"
            >
              <div className="h-[280px] relative w-full">
                <Image
                  src={slide.mobileImg}
                  alt={slide.title}
                  fill
                  className="object-cover rounded-t-[16px]"
                />
              </div>
              <div className="flex-shrink-0">
                <div className="p-5">
                  <h3 className="text-[22px] font-openSans font-bold text-[#0336BC]">
                    {slide.title}
                  </h3>
                  <div className="pt-4">
                    <div className="flex gap-4 mb-4">
                      <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                        <NavigationIcon />
                      </div>
                      <div className="text-[14px] leading-5">
                        <h2 className="font-bold text-[#333]">Challenge</h2>
                        <p className="text-[#7D7D7D]">{slide.challenge}</p>
                      </div>
                    </div>
                    <div className="flex gap-4 mb-4">
                      <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                        <NavigationIcon />
                      </div>
                      <div className="text-[14px] leading-5">
                        <h2 className="font-bold text-[#333]">Solution</h2>
                        <p className="text-[#7D7D7D]">{slide.solution}</p>
                      </div>
                    </div>
                    <div className="flex gap-4 mb-4">
                      <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                        <NavigationIcon />
                      </div>
                      <div className="text-[14px] leading-5">
                        <h2 className="font-bold text-[#333]">Result</h2>
                        <p className="text-[#7D7D7D]">{slide.result}</p>
                      </div>
                    </div>
                  </div>
                  <Link href="/under-development">
                    <button className="bg-[#2D65F2] mt-5 hover:bg-[#0336BC] text-white w-full flex px-4 py-3 text-[14px] font-openSans font-bold rounded-md justify-center">
                      Learn More
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
