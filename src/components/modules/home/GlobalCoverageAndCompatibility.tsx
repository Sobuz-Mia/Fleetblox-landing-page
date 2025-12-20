"use client";

/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from "next/image";
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
import { cars } from "@/Static_data/data";
import { TStaterPlanData } from "@/types/types";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import config from "@/utils/config";

const GlobalCoverageAndCompatibility = () => {
  const [starterPlan, setStarterPlan] = useState<TStaterPlanData[]>([]);
  const router = useRouter();
  const baseUrl = config.api.baseUrl;

  const [staterPlanLoading, setStarterPlanLoading] = useState(true);
  const [staterPlanError, setStarterPlanError] = useState<string | null>(null);
  useEffect(() => {
    const fetchStaterPlanData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/api/subscription/plan/starter`
        );
        setStarterPlan(response.data.data);
      } catch (err) {
        if (err instanceof Error) {
          setStarterPlanError(err.message);
        } else {
          setStarterPlanError("Unexpected error!! Please try again later.");
        }
      } finally {
        setStarterPlanLoading(false);
      }
    };

    fetchStaterPlanData();
  }, []);
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
    <div className="py-[60px]">
      {/* <Container> */}
      <section>
        <div className="z-[100] mx-auto max-w-[1300px] lg:w-[1000px] 2xl:w-[1300px] space-y-[20px] overflow-hidden">
          <div className="relative z-[1000] space-y-[20px] px-5">
            <h3 className="font-montserrat text-[#04082C] text-[28px] md:text-[36px] font-bold max-w-[800px] w-full mx-auto text-center">
              Global Coverage and Compatibility- Expands Your Fleet’s Reach
            </h3>
            <div className="z-[100] flex items-center justify-center">
              {cars.map((car, index) => (
                <div
                  key={index}
                  className="flex w-[247px] flex-col items-center justify-between border-r-[2px] border-[#FBEECA] last:border-r-0"
                >
                  <h2 className="text-[#0336BC] text-[22px] font-openSans font-bold">
                    {car.value}
                  </h2>
                  <p className="text-[#7D7D7D] font-semibold text-[14px] font-openSans leading-5">
                    {car.title}
                  </p>
                </div>
              ))}
            </div>
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
        {/* brand logo animate */}
        <div className="mx-auto relative -mt-[81px] lg:-mt-[110px] 2xl:-mt-[120px] w-full lg:w-[1000px] 2xl:w-[1300px] overflow-hidden whitespace-nowrap">
          <div className="flex animate-scroll items-center space-x-3 md:space-x-8">
            {images.map((image, index) => (
              <div key={index} className="z-[1000] flex-shrink-0">
                <Image
                  src={image}
                  alt="image"
                  className="z-[1000] mix-blend-multiply w-[80px] xl:w-[80%] 2xl:w-[90%]"
                />
              </div>
            ))}
          </div>
          <div className="to-transparent absolute hidden md:block left-0 top-0 z-[1001] h-full w-32 bg-gradient-to-r from-white"></div>
          <div className="to-transparent absolute hidden md:block right-0 top-0 z-[1001] h-full w-32 bg-gradient-to-l from-white"></div>
        </div>
        {/* Diverse and compatibility section */}
        <div className="mt-[60px] flex flex-col md:flex-row justify-items-center items-center gap-5 max-w-[1200px] w-full mx-auto">
          <div className="px-10 text-center md:border-r-[2px] border-[#FBEECA]">
            <h2 className="text-[#04082C] font-openSans text-[22px] font-bold">
              Diverse Market Adaptability
            </h2>
            <p className="text-[14px] text-[#333] font-openSans leading-5">
              Whether in North America, Europe, or beyond, our platform supports
              a wide range of fleet types and sizes, meeting local standards
            </p>
            {/* <Link
              aria-label="Get started with FleetBlox"
              href="/getting-started"
            >
              <button className="mt-4 text-[#2D65F2] text-[16px] font-openSans font-bold">
                Check Your Region
              </button>
            </Link> */}

            {/* <button
              aria-label="Get started with Starter Fleet"
              onClick={() => {
                handleStarterPlan(starterPlan[0]);
              }}
              className="mt-4 text-[#2D65F2] text-[16px] font-openSans font-bold"
            >
              Check Your Region
            </button> */}
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="3"
            viewBox="0 0 35 3"
            fill="none"
            className="block md:hidden"
          >
            <path
              d="M33.5 1.8125H1.5"
              stroke="#FBEECA"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <div className="px-10 text-center">
            <h2 className="text-[#04082C] font-openSans text-[22px] font-bold">
              EV Fleet compatibility
            </h2>
            <p className="text-[14px] text-[#333] font-openSans leading-5">
              Seamlessly manage your electric vehicles with tools designed to
              support eco-friendly fleets. Optimize EV performance for greater
              sustainability
            </p>
            {/* <Link
              aria-label="Get started with FleetBlox"
              href="/getting-started"
            >
              <button className="mt-4 text-[#2D65F2] text-[16px] font-openSans font-bold">
                Check Compatibility
              </button>
            </Link> */}

            {/* <button
              aria-label="Get started with Starter Fleet"
              onClick={() => {
                handleStarterPlan(starterPlan[0]);
              }}
              className="mt-4 text-[#2D65F2] text-[16px] font-openSans font-bold"
            >
              Check Compatibility
            </button> */}
          </div>
        </div>
      </section>
      {/* </Container> */}
    </div>
  );
};

export default GlobalCoverageAndCompatibility;
