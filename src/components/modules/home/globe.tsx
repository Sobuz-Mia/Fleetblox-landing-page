"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from "next/image";
import React, { ReactNode, useEffect, useState } from "react";
import image1 from "../../../../public/brand/Frame 1707481648.svg";
import image2 from "../../../../public/brand/Frame 1707481652.svg";
import image3 from "../../../../public/brand/Frame 1707481662.png";
import image4 from "../../../../public/brand/Frame 1707481651.svg";
import image5 from "../../../../public/brand/Frame 1707481669.svg";
import image6 from "../../../../public/brand/Frame 1707481649.png";
import image7 from "../../../../public/brand/Frame 1707481650.svg";
import image8 from "../../../../public/brand/Frame 1707481653.svg";
import image9 from "../../../../public/brand/Frame 1707481670.png";
import image10 from "../../../../public/brand/Frame 1707481671.svg";
import image11 from "../../../../public/brand/Frame 1707481655.svg";
import image12 from "../../../../public/brand/Frame 1707481668.svg";
import image13 from "../../../../public/brand/Frame 1707481656.svg";
import image14 from "../../../../public/brand/Frame 1707481664.svg";
import image15 from "../../../../public/brand/Frame 1707481654.svg";
import image16 from "../../../../public/brand/Frame 1707481666.svg";
import image17 from "../../../../public/brand/Frame 1707481672.svg";
import image18 from "../../../../public/brand/Frame 1707481657.svg";
import image19 from "../../../../public/brand/Frame 1707481658.svg";
import image20 from "../../../../public/brand/Frame 1707481665.svg";
import image21 from "../../../../public/brand/Frame 1707481659.svg";
import image22 from "../../../../public/brand/Frame 1707481660.svg";
import image23 from "../../../../public/brand/Frame 1707481663.svg";
import image24 from "../../../../public/brand/Frame 1707481673.svg";
import image25 from "../../../../public/brand/Frame 1707481674.svg";
import image26 from "../../../../public/brand/Frame 1707481675.svg";
import image27 from "../../../../public/brand/Frame 1707481667.svg";
import image28 from "../../../../public/brand/Frame 1707481676.svg";
import image29 from "../../../../public/brand/Frame 1707481677.svg";
import image30 from "../../../../public/brand/Frame 1707481678.svg";
import image31 from "../../../../public/brand/Frame 1707481679.svg";
import image32 from "../../../../public/brand/Frame 1707481680.svg";
import image33 from "../../../../public/brand/Frame 1707481661.svg";
import { useRouter } from "next/navigation";
import config from "@/utils/config";
import axios from "axios";
import { TStaterPlanData } from "@/types/types";
type GlobeSectionProps = {
  title: string;
  description?: string;
  extraButton?: ReactNode;
  paddingTop?: string;
};
const GlobeSection = ({
  title,
  description,
  extraButton,
  paddingTop,
}: GlobeSectionProps) => {
  const [starterPlan, setStarterPlan] = useState<TStaterPlanData[]>([]);
  const router = useRouter();
  const baseUrl = config.api.baseUrl;

  const [staterPlanLoading, setStarterPlanLoading] = useState(true);
  const [staterPlanError, setStarterPlanError] = useState<string | null>(null);
  // useEffect(() => {
  //   const fetchStaterPlanData = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${baseUrl}/api/subscription/plan/starter`
  //       );
  //       setStarterPlan(response.data.data);
  //     } catch (err) {
  //       if (err instanceof Error) {
  //         setStarterPlanError(err.message);
  //       } else {
  //         setStarterPlanError("Unexpected error!! Please try again later.");
  //       }
  //     } finally {
  //       setStarterPlanLoading(false);
  //     }
  //   };

  //   fetchStaterPlanData();
  // }, []);
  const handleStarterPlan = async (starterPlan: TStaterPlanData) => {
    const planData = {
      price: starterPlan?.price,
      fleet: starterPlan?.name || "Starter Fleet",
      slot: starterPlan?.slotMinimum || 10,
      annually: false,
      id: starterPlan?.id, // Replace with actual ID from your backend
    };

    localStorage.setItem("selectedPlan", JSON.stringify(planData));
    router.push("/getting-started");
  };
  const images = [
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
    image9,
    image10,
    image11,
    image12,
    image13,
    image14,
    image15,
    image16,
    image17,
    image18,
    image19,
    image20,
    image21,
    image22,
    image23,
    image24,
    image25,
    image26,
    image27,
    image28,
    image29,
    image30,
    image31,
    image32,
    image33,
  ];
  return (
    <section className={`${paddingTop ? paddingTop : "pt-[100px]"} `}>
      <div className="z-[100] mx-auto max-w-[1300px] lg:w-[1000px] 2xl:w-[1300px] space-y-[20px] overflow-hidden">
        <div className="relative z-[1000] px-5 max-w-[840px] w-full mx-auto text-center">
          <h3 className="font-montserrat text-[#04082C] text-[28px] md:text-[36px] font-bold  text-center leading-[1.1]">
            {title.split("<br />").map((line, index) => (
              <React.Fragment key={index}>
                {line}
                {index !== title.split("<br />").length - 1 && <br />}
              </React.Fragment>
            ))}
          </h3>
          <p className="mt-[10px] text-[#333] text-[16px] font-normal leading-6 font-openSans mb-5">
            {description}
          </p>
          {extraButton ? (
            <div className="flex justify-center">{extraButton}</div>
          ) : (
            // <Link href={"/getting-started"}>
            //   <button className="bg-[#2D65F2] rounded-[6px] px-5 py-3 text-white font-openSans text-[16px] font-bold">
            //     Check Compatibility
            //   </button>
            // </Link>
            <button
              aria-label="Get started with Starter Fleet"
              onClick={() => {
                handleStarterPlan(starterPlan[0]);
              }}
              className="bg-[#2D65F2] rounded-[6px] px-5 py-3 text-white font-openSans text-[16px] font-bold"
            >
              Check Compatibility
            </button>
          )}
        </div>
        <div className="flex relative h-[376px] w-full items-center justify-center overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute mt-[450px] h-[916px] object-cover"
          >
            <source src="/videos/global.webm" type="video/webm" />
            <source src="/videos/global.mp4" type="video/mp4" />
          </video>
        </div>
      </div>

      <div className="mx-auto relative -mt-[88px] lg:-mt-[80px] xl:-mt-[90px] xxl:-mt-[100px] w-full lg:w-[1000px] 2xl:w-[1300px] overflow-hidden whitespace-nowrap">
        <div className="flex animate-scroll items-center space-x-3 md:space-x-8">
          {images.map((image, index) => (
            <div key={index} className="z-[1000] flex-shrink-0">
              <Image
                src={image}
                alt="image"
                priority
                className="z-[1000] mix-blend-multiply w-[80px] xl:w-[80%] 2xl:w-[90%]"
              />
            </div>
          ))}
        </div>
        <div className="to-transparent absolute hidden md:block left-0 top-0 z-[1001] h-full w-32 bg-gradient-to-r from-white"></div>
        <div className="to-transparent absolute hidden md:block right-0 top-0 z-[1001] h-full w-32 bg-gradient-to-l from-white"></div>
      </div>
    </section>
  );
};

export default GlobeSection;
