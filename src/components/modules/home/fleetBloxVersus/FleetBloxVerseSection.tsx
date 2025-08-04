"use client";
import { cards } from "@/Static_data/data";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useRef, useState } from "react";
import Container from "@/components/ui/Container";
import VersusCard from "./VersusCard";
import FleetBloxMobileVerse from "./FleetBloxMobileVerse";

const FleetBloxVerseSection = () => {
  const container = useRef<HTMLDivElement>(null);
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const visibleIndex = cards.findIndex((_, index) => {
      const start = index / cards.length;
      const end = (index + 1) / cards.length;
      return latest >= start && latest < end;
    });

    if (visibleIndex !== -1) {
      setActiveIndex(visibleIndex);
    }
  });
  // const headerOpacity = useTransform(scrollYProgress, [0.0, 0.9], [1, 0]);

  return (
    <>
      <div ref={sectionRef} className="bg-[#FAFAFF]  hidden lg:block">
        <Container>
          <div className="flex justify-between items-start">
            {/* left card */}
            <motion.div
              // style={{ opacity: headerOpacity }}
              className={`sticky top-[100px] w-full h-screen flex flex-col items-start justify-center pb-[10px] `}
            >
              <div className="-mt-[240px]">
                <h3 className="text-[28px] md:text-[36px] text-center md:text-left text-[#000E32] font-bold leading-[1.1]">
                  Fleetblox <span className="text-[#0336BC]">Versus</span>{" "}
                  <br /> Traditional Solutions
                </h3>
                <p className="text-[#000E32] text-center md:text-left font-openSans font-normal text-base mt-4">
                  Discover how Fleetblox revolutionizes fleet management,
                  outperforming traditional solutions in efficiency, innovation,
                  and performance across every key metric
                </p>
                {/* <Link href="/under-development">
                  <button className="hidden md:flex mt-8 transition-all bg-[#2D65F2] hover:bg-[#0336BC] text-white-primary text-white duration-300 hover:w-[110%] max-w-[250px]  items-center px-4 py-3 text-[16px] font-bold rounded-md group ">
                    <div className="z-20 whitespace-nowrap">
                      Calculate Your Savings
                    </div>
                    <div className="z-10 transform transition-transform opacity-0 group-hover:opacity-100 -translate-x-0 duration-300 group-hover:translate-x-0">
                      <RightArrowIcon />
                    </div>
                  </button>
                </Link> */}
                <div className=" hidden md:flex gap-x-6 mt-20 items-center ">
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-[52px] text-[#7D7D7D] font-bold  font-montserrat">
                      {activeIndex + 1}
                    </span>
                    <span className="text-[18px] text-[#7D7D7D] font-bold font-montserrat">
                      Fleetblox
                    </span>
                  </div>
                  <div className="-mt-5">
                    <svg
                      width="20"
                      height="6"
                      viewBox="0 0 20 6"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        y="0.5"
                        width="20"
                        height="5"
                        rx="2"
                        fill="#7D7D7D"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-[52px] text-[#7D7D7D] font-bold font-montserrat">
                      0
                    </span>
                    <span className="text-[18px] text-[#7D7D7D] font-bold font-montserrat">
                      Traditional
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
            {/* left card end*/}
            {/* right card start */}
            <div ref={container} className=" hidden lg:block relative w-full">
              {cards.map((item, index) => {
                const targetScale = 1 - (cards.length - index) * 0.01;
                return (
                  <VersusCard
                    number={item.number}
                    key={index}
                    title={item.title}
                    fleetBloxDes={item.fleetbloxText}
                    traditionDes={item.traditionalText}
                    index={index}
                    progress={scrollYProgress}
                    range={[0.25, 1]}
                    targetScale={targetScale}
                  />
                );
              })}
            </div>
            {/* right card end */}
          </div>
        </Container>
      </div>
      {/* Mobile */}
      <FleetBloxMobileVerse />
    </>
  );
};

export default FleetBloxVerseSection;
