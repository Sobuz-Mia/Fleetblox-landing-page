import RightArrowIcon from "@/components/icons/RightArrowIcon";
import GlobeSection from "@/components/modules/home/globe";
import FeatureCard from "@/components/ui/FeatureCard";
import { KeyBenefits } from "@/Static_data/solution";
import Image from "next/image";
import Link from "next/link";

const page = () => {
  // const OnboardingData = [
  //   {
  //     title: "Automated technical profile generation",
  //     content:
  //       "Utilize AI-enhanced decoding to extract full specifications, configurations, and visual assets with one VIN scan.",
  //   },

  //   {
  //     title: "AI-based entry inspections",
  //     content:
  //       "Identify and record damages immediately with pictures and smart condition detection.",
  //   },
  //   {
  //     title: "OEM system integration",
  //     content:
  //       "Link to manufacturer systems directly — no OBD hardware required",
  //   },
  // ];
  return (
    <div>
      {/* hero section */}
      <section className="bg-[#FAFAFF] pt-[100px] lg:pt-[140px] pb-[30px] ">
        <div className="lg:max-w-[calc(100vw-30px)] xxl:max-w-[1440px] mx-auto w-full flex flex-col px-5 lg:flex-row items-center justify-between">
          <div className="lg:pl-[100px] max-w-[660px] w-full">
            <h3 className="text-[#0336BC] font-openSans font-bold text-[22px]">
              Fleet Compliance
            </h3>
            <h1 className="text-[#04082C] text-[36px] lg:text-[52px] font-bold leading-[1.1]">
              Fleet Compliance On Autopilot
            </h1>
            <p className="text-[#333] text-[16px] leading-6 mt-[10px] lg:mt-4 mb-5 font-openSans">
              Optimize your fleet safety with intelligent automation that
              ensures every vehicle remains fully compliant, and ready for
              operation.
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
              src="/images/solutions/fleet-complience-hero.png"
              alt="AI assistant for fleet optimization"
              width={700}
              height={491}
              className="object-contain w-full"
            />
          </div>
        </div>
      </section>
      {/* hero section end */}
      {/* <section className=" mx-auto w-full py-[60px] lg:py-[120px] px-5">
        <div className="max-w-[840px] mx-auto w-full text-center mb-[60px]">
          <h2 className="text-[#04082C] text-[28px] lg:text-[36px] font-bold text-center leading-[1.1] mb-[10px]">
            Fleet Smart Onboarding
          </h2>
          <p className="text-[#333] text-[16px] leading-6 font-openSans ">
            Streamline your remote onboarding with an intelligent workflow
          </p>
        </div>
        <SmartOnboarding OnboardingData={OnboardingData} />
      </section> */}
      {/* fleet location management monitoring section */}
      <section className="max-w-[1200px] mx-auto w-full py-[120px] px-5">
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
                src="/videos/solutions/fleet-location-management.mp4"
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

      <div>
        <GlobeSection
          paddingTop="pt-[40px]"
          title="Eliminate Risk. Grow with Confidence"
          description="Your fleet doesn’t slow down — and neither should your compliance."
        />
      </div>
    </div>
  );
};

export default page;
