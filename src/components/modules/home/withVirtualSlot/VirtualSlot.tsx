"use client";
import { full_control_with_virtual_slot_data } from "@/Static_data/data";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import VirtualCard from "./VirtualCard";
import Container from "@/components/ui/Container";
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
      <Container>
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
        <div className="md:hidden">
          <p className="text-[14px] text-center font-bold text-[#0336BC] mb-[10px]">
            Turn Every Mile Into Momentum
          </p>
          <h3 className="z-10 text-[28px] text-center text-[#000E32] font-bold leading-[1.1]">
            Link . Optimize. Comply. Expand
          </h3>

          {full_control_with_virtual_slot_data.map((item) => {
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
          })}
        </div>
      </Container>
    </div>
  );
};

export default VirtualSlot;
