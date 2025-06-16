"use client";
import { full_control_with_virtual_slot_data } from "@/Static_data/data";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import VirtualCard from "./VirtualCard";
import Image from "next/image";

const VirtualSlot = () => {
  const container = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });
  const headerOpacity = useTransform(scrollYProgress, [0.0, 0.15], [1, 0]);

  return (
    <div className="bg-[#FAFAFF]">
      {/* heading end */}
      <div
        ref={container}
        className=" hidden md:block lg:block relative w-full"
      >
        <motion.div
          style={{ opacity: headerOpacity }}
          className={`sticky -top-[150px] xl:-top-[180px] z-10 flex md:h-[80vh] flex-col items-center justify-center gap-[10px] pb-[10px]`}
        >
          {/* Centered Soft Blurred Ellipse */}
          <div className="hidden md:block absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-[#ffe1bf] opacity-30 blur-[100px] rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>

          {/* Content */}
          <div className=" hidden md:block  relative text-center">
            <p className="text-[22px] text-left md:text-center font-bold text-[#0336BC] mb-[10px]">
              Turn Every Mile Into Momentum
            </p>

            <h3 className="z-10 text-[52px] text-[#000E32] font-bold leading-[1.1]">
              Link . Optimize. Comply. Expand
            </h3>
          </div>
        </motion.div>
        {full_control_with_virtual_slot_data.map((item, index) => {
          const targetScale =
            1 - (full_control_with_virtual_slot_data.length - index) * 0.05;
          return (
            <VirtualCard
              image={item.image}
              key={index}
              title={item.title}
              description={item.description}
              icon={item.icon}
              index={index}
              progress={scrollYProgress}
              range={[index * 0.25, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </div>
      {/* Mobile view */}
      <div className="md:hidden py-20">
        <p className="text-[14px] text-center font-bold text-[#0336BC] mb-[10px]">
          Turn Every Mile Into Momentum
        </p>
        <h3 className="z-10 text-[28px] text-center text-[#000E32] font-bold leading-[1.1]">
          Link . Optimize. Comply. Expand
        </h3>

        {/* {full_control_with_virtual_slot_data.map((item) => {
            return (
              <section
                key={item?.id}
                className="relative bg-white max-h-[630px] my-5 w-full flex flex-col rounded-[16px] items-center justify-center gap-5 "
              >
                <div className="flex-1 overflow-hidden w-full h-full rounded-t-[16px]">
                  <Image
                    src={item.mobile}
                    className="object-cover w-full h-full"
                    alt="image"
                  />
                </div>
                <div className="flex-1 flex flex-col gap-y-[5px] text-left p-5 -mt-16">
                  <Image src={item.icon} alt="icon" />
                  <h2 className="text-[22px] text-left text-[#000E32] font-openSans font-bold ">
                    {item.title}
                  </h2>
                  <p className="text-[14px] text-left font-openSans text-[#333] leading-[20px]">
                    {item.description}
                  </p>
                </div>
              </section>
            );
          })} */}

        {full_control_with_virtual_slot_data.map((item, index) => {
          return (
            <div
              key={index}
              className="sticky z-50 top-[0vh] flex h-[100vh] px-5 flex-col items-center justify-center w-screen"
            >
              <motion.div
                className={`relative z-[200] top-[0px] transform flex-col max-h-[700px] h-full sm:h-[700px] w-full`}
                style={{ top: `calc(-5vh + ${index * 15}px)` }}
              >
                {/* main card */}
                <div className="absolute top-[15vh] sm:top-[10vh] z-[200] max-w-[600px] w-full mx-auto h-full">
                  <section
                    key={item?.id}
                    className="relative bg-white h-[540px] xs:h-[700px]  w-full  rounded-[16px]  gap-5 "
                  >
                    <div className="overflow-hidden w-full rounded-t-[16px]">
                      <Image
                        src={item.mobile}
                        className="object-contain w-full h-full rounded-t-[16px]"
                        alt="image"
                      />
                    </div>
                    <div className="flex-1 flex flex-col gap-y-[5px] text-left p-5 -mt-16">
                      <Image src={item.icon} alt="icon" />
                      <h2 className="text-[22px] text-left text-[#000E32] font-openSans font-bold ">
                        {item.title}
                      </h2>
                      <p className="text-[14px] text-left font-openSans text-[#333] leading-[20px]">
                        {item.description}
                      </p>
                    </div>
                  </section>
                </div>
                {/* shadow */}
                {/* <div className="absolute top-[17vh] left-1/2 -translate-x-1/2 z-[20] rounded-[2px] bg-black opacity-[0.07] blur-[20px] h-[530px] w-[320px] md:w-[640px]"></div> */}
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VirtualSlot;
