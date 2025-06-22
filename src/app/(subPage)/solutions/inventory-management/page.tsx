import RightArrowIcon from "@/components/icons/RightArrowIcon";
import GlobeSection from "@/components/modules/home/globe";
import FeatureCard from "@/components/ui/FeatureCard";
import { KeyBenefits } from "@/Static_data/solution";
import Image from "next/image";
import Link from "next/link";
import SmartOnboarding from "./components/SmartOnboarding";

const page = () => {
  const OnboardingData = [
    {
      title: "Automated technical profile generation",
      content:
        "Utilize AI-enhanced decoding to extract full specifications, configurations, and visual assets with one VIN scan.",
    },

    {
      title: "AI-based entry inspections",
      content:
        "Identify and record damages immediately with pictures and smart condition detection.",
    },
    {
      title: "OEM system integration",
      content:
        "Link to manufacturer systems directly — no OBD hardware required",
    },
  ];
  return (
    <div>
      {/* hero section */}
      <section className="bg-[#FAFAFF] pt-[100px] lg:pt-[140px] pb-[30px] ">
        <div className="lg:max-w-[calc(100vw-30px)] xxl:max-w-[1440px] mx-auto w-full flex flex-col px-5 lg:flex-row items-center justify-between">
          <div className="lg:pl-[100px]">
            <h3 className="text-[#0336BC] font-openSans font-bold text-[22px]">
              Inventory Management
            </h3>
            <h1 className="text-[#04082C] text-[36px] lg:text-[52px] font-bold leading-[1.1]">
              Smarter Inventory Smoother Operations
            </h1>
            <p className="text-[#333] text-[16px] leading-6 mt-[10px] lg:mt-4 mb-5 font-openSans">
              Geo-Based Inventory Management transforms dispersed assets into an
              integrated, intelligent network—enabling seamless coordination,
              enhanced visibility, and maximized operational efficiency across
              all locations.
            </p>
            <Link
              aria-label="Get started with FleetBlox"
              href="/getting-started"
            >
              <button className="hidden transition-all bg-[#2D65F2] hover:bg-[#0336BC] font-openSans text-white-primary text-white duration-300 hover:w-[144.16px] w-[122.16px] lg:flex items-center px-4 py-3 text-base font-bold rounded-md group">
                <div className="z-20 whitespace-nowrap">Start today</div>
                <div className="z-10 transform transition-transform opacity-0 group-hover:opacity-100 -translate-x-4 duration-300 group-hover:translate-x-0">
                  <RightArrowIcon />
                </div>
              </button>
            </Link>
            <Link
              aria-label="Get started with FleetBlox"
              href="/getting-started"
            >
              <button className="lg:hidden bg-[#2D65F2] hover:bg-[#0336BC] text-white w-full flex px-4 py-3 text-[14px] font-openSans font-bold rounded-md justify-center">
                Start today
              </button>
            </Link>
          </div>
          <div className=" w-full py-10 lg:pl-[60px]">
            <Image
              src="/images/solutions/inventory-management-hero.png"
              alt="AI assistant for fleet optimization"
              width={700}
              height={491}
              className="object-contain w-full"
            />
          </div>
        </div>
      </section>
      {/* hero section end */}
      <section className=" mx-auto w-full py-[60px] lg:py-[120px] px-5">
        <div className="max-w-[840px] mx-auto w-full text-center mb-[60px]">
          <h2 className="text-[#04082C] text-[28px] lg:text-[36px] font-bold text-center leading-[1.1] mb-[10px]">
            Fleet Smart Onboarding
          </h2>
          <p className="text-[#333] text-[16px] leading-6 font-openSans ">
            Streamline your remote onboarding with an intelligent workflow
          </p>
        </div>
        <SmartOnboarding OnboardingData={OnboardingData} />
      </section>
      {/* fleet location management monitoring section */}
      <section className="max-w-[1200px] mx-auto w-full pb-20 lg:pb-[120px] px-5">
        <div className="text-left mb-10">
          <h3 className="text-[28px] lg:text-[44px] font-semibold text-[#04082C]">
            Fleet <span className="text-[#0336BC]">Location</span> Management
          </h3>
          <p className="text-[14px] font-openSans text-[#333] leading-5">
            Optimize fleet organization through strategic zone and branch
            assignments
          </p>
        </div>
        <div className="flex justify-between flex-col md:flex-row items-center gap-10 xl:gap-0">
          <div className=" max-w-[500px] w-full space-y-[30px]">
            <div>
              <h3 className="text-[#333] font-openSans text-[18px] font-bold mb-[5px] leading-6">
                1. Simplify vehicle relocation and transfers
              </h3>
              <p className="text-[16px] leading-6 text-[#7D7D7D] font-openSans">
                Easily reassign vehicles between branches or regions as
                operational needs shift.
              </p>
            </div>
            <div>
              <h3 className="text-[#333] font-openSans text-[18px] font-bold mb-[5px] leading-6">
                2. Improve dispatch and local task planning
              </h3>
              <p className="text-[16px] leading-6 text-[#7D7D7D] font-openSans">
                Access location based fleet and assign tasks to on-site crews
                for faster service.
              </p>
            </div>
            <div>
              <h3 className="text-[#333] font-openSans text-[18px] font-bold mb-[5px] leading-6">
                3. Geo-based insights
              </h3>
              <p className="text-[16px] leading-6 text-[#7D7D7D] font-openSans">
                Access operational analytics and insights per site - monitor
                performance, utilization and availability.
              </p>
            </div>
          </div>
          <div className=" ">
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="w-full h-full"
            >
              <source
                src="/videos/solutions/fleet-location-management.mov"
                type="video/webm"
              />
            </video>
          </div>
        </div>
      </section>
      {/* vehicle status monitoring section */}
      <section className="max-w-[1200px] mx-auto w-full pb-20 lg:pb-[120px] px-5">
        <div className="md:text-right mb-10">
          <h3 className="text-[28px] lg:text-[44px] font-semibold text-[#04082C]">
            Live <span className="text-[#0336BC]">Vehicle Status</span>{" "}
            Monitoring
          </h3>
          <p className="text-[14px] font-openSans text-[#333] leading-5">
            Gain total fleet awareness with real-time vehicle data and location
            insights
          </p>
        </div>
        <div className="flex justify-between flex-col md:flex-row items-center gap-10 xl:gap-0">
          <div className=" ">
            <Image
              src="/images/solutions/vehicle-status-monitoring.png"
              alt="AI assistant for fleet optimization"
              width={680}
              height={383}
              className="object-contain max-w-[550px] w-full"
            />
          </div>
          <div className=" max-w-[560px] w-full space-y-[30px]">
            <div>
              <h3 className="text-[#333] font-openSans text-[18px] font-bold mb-[5px] leading-6">
                1. Visual Readiness Diagram
              </h3>
              <p className="text-[16px] leading-6 text-[#7D7D7D] font-openSans">
                Quickly assess vehicle health and status for improved
                operational decision making.
              </p>
            </div>
            <div>
              <h3 className="text-[#333] font-openSans text-[18px] font-bold mb-[5px] leading-6">
                2. Accurate Last Reported Position
              </h3>
              <p className="text-[16px] leading-6 text-[#7D7D7D] font-openSans">
                Access the last ping location, even if the vehicle is currently
                offline.
              </p>
            </div>
            <div>
              <h3 className="text-[#333] font-openSans text-[18px] font-bold mb-[5px] leading-6">
                3. Location Logs
              </h3>
              <p className="text-[16px] leading-6 text-[#7D7D7D] font-openSans">
                View the last recorded positions to see where vehicles were last
                seen.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Multi Powertrain section */}
      <section className="bg-[#0A2540] relative overflow-hidden px-5">
        <div className="absolute inset-0 bg-[#2D65F2] opacity-30 rounded-[870px] blur-[250px] max-w-[870px] w-full mx-auto"></div>
        <div className="absolute inset-0 flex justify-center items-start z-0 md:mt-20 mt-32 px-2">
          <Image
            src="/images/solutions/multi-powered-train.svg"
            alt="multi powered train"
            width={830}
            height={383}
            className="object-contain"
          />
        </div>
        <div className="max-w-[1000px] w-full mx-auto py-[160px] text-center relative z-50">
          <h2 className="text-[28px] lg:text-[36px] font-bold text-[#2D65F2] leading-tight lg:leading-[1.3]">
            Multi Powertrain <br />{" "}
            <span className="text-white">Compatibility Integration</span>
          </h2>
          <p className="mb-[30px] mt-[10px] text-[#DFDFDF] font-openSans text-[16px] leading-6">
            Start your on boarding journey with a simple compatibility flow to
            check that every vehicle, whether electric, hybrid, or combustion
            engine is 100% compatible with Fleetblox.
          </p>
          <Link href={"/under-development"}>
            <button className="bg-[#2D65F2] rounded-[6px] px-5 py-3 text-white font-openSans text-[16px] font-bold">
              Check Compatibility
            </button>
          </Link>
        </div>
      </section>
      {/* Key Benefits */}
      <section className="max-w-[1200px] mx-auto w-full mt-16 mb-[100px] px-5">
        <h2 className="mb-[40px] lg:mb-[60px] text-center text-[#04082C] text-[28px] lg:text-[36px] font-bold">
          Key Benefits
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-[30px]">
          {KeyBenefits?.map((data, index) => (
            <FeatureCard
              key={index}
              icon={<data.icon />}
              title2={data.title}
              className="max-w-[380px] w-full"
            />
          ))}
        </div>
      </section>
      {/* why Key Benefits end */}

      {/* glove section start */}
      <section className="relative pt-10">
        {/* rainbow background image behind cards */}
        <div className="absolute inset-0 flex justify-center items-start z-0">
          <Image
            src="/images/solutions/rainbow-sky.svg"
            alt="AI assistant for fleet optimization"
            width={512}
            height={256}
            className="object-contain mb-20"
          />
        </div>

        {/* cards container */}
        <div className="relative z-10 max-w-[800px] mx-auto space-y-[30px] px-5">
          <div className="flex justify-center md:gap-[15px] gap-[10px]">
            <p
              className="p-2 md:py-[10px] md:px-5 max-w-[280px] w-full text-center  text-[12px] md:text-[16px] text-[#333] font-openSans font-semibold leading-6 rounded-[8px] bg-white"
              style={{
                boxShadow:
                  "inset 0px -2px 2px 0px rgba(0, 0, 0, 0.25), 0px 7px 8.3px 0px rgba(0, 0, 0, 0.15)",
              }}
            >
              Car-sharing hosts and agencies
            </p>
            <p
              className="p-2 md:py-[10px] md:px-5 max-w-[280px] w-full text-center  text-[12px] md:text-[16px] text-[#333] font-openSans font-semibold leading-6 rounded-[8px] bg-white"
              style={{
                boxShadow:
                  "inset 0px -2px 2px 0px rgba(0, 0, 0, 0.25), 0px 7px 8.3px 0px rgba(0, 0, 0, 0.15)",
              }}
            >
              Rental and leasing operators
            </p>
          </div>
          <div className="flex justify-center md:gap-20 gap-[10px]">
            <p
              className="p-2 md:py-[10px] md:px-5 max-w-[290px] w-full text-center text-[12px] md:text-[16px] text-[#333] font-openSans font-semibold leading-6 rounded-[8px] bg-white"
              style={{
                boxShadow:
                  "inset 0px -2px 2px 0px rgba(0, 0, 0, 0.25), 0px 7px 8.3px 0px rgba(0, 0, 0, 0.15)",
              }}
            >
              EV fleets and mixed powertrains
            </p>
            <p
              className="p-2 md:py-[10px] md:px-5 max-w-[308px] w-full text-center  text-[12px] md:text-[16px] text-[#333] font-openSans font-semibold leading-6 rounded-[8px] bg-white"
              style={{
                boxShadow:
                  "inset 0px -2px 2px 0px rgba(0, 0, 0, 0.25), 0px 7px 8.3px 0px rgba(0, 0, 0, 0.15)",
              }}
            >
              Delivery, logistics, and utility fleets
            </p>
          </div>
        </div>
        {/*  */}
        <div
          style={{
            boxShadow: "0px 3px 6px 0px #ECF1FD inset",
          }}
          className="flex justify-center max-w-[293px] mx-auto w-full py-10 px-[48px] rounded-[73px] z-20 bg-white relative mt-10"
        >
          <p className="text-[#0336BC] font-bold text-[28px]"> Designed For</p>
        </div>
        {/* call-to-action section */}
        <div className="relative z-10">
          <GlobeSection
            paddingTop="pt-[40px]"
            title="Start Your Fleet Remote Diagnosing Today"
            extraButton={
              <div className="flex items-center gap-[10px] justify-center">
                <button className="bg-white rounded-[6px] px-5 py-3 text-[#2D65F2] font-openSans text-[16px] font-bold border border-[#B8CBFC]">
                  Schedule A Demo
                </button>
                <button className="bg-[#2D65F2] rounded-[6px] px-5 py-3 text-white font-openSans text-[16px] font-bold">
                  Get The Product Sheet
                </button>
              </div>
            }
          />
        </div>
      </section>
    </div>
  );
};

export default page;
