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
        <div className="max-w-[840px] mx-auto w-full text-center">
          <h2 className="text-[#04082C] text-[28px] lg:text-[36px] font-bold text-center leading-[1.1] mb-[10px]">
            Fleet Smart Onboarding
          </h2>
          <p className="text-[#333] text-[16px] leading-6 font-openSans">
            Streamline your remote onboarding with an intelligent workflow
          </p>
        </div>
        <SmartOnboarding OnboardingData={OnboardingData} />
      </section>

      {/* Key Benefits */}
      <section className="max-w-[1200px] mx-auto w-full my-[60px] px-5">
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
      <section>
        <GlobeSection
          title="Start Your Fleet Remote Diagnosing Today"
          extraButton={
            <div className="flex items-center gap-[10px] justify-items-center">
              <button className="bg-white rounded-[6px] px-5 py-3 text-[#2D65F2] font-openSans text-[16px] font-bold border border-[#B8CBFC]">
                Schedule A Demo
              </button>
              <button className="bg-[#2D65F2] rounded-[6px] px-5 py-3 text-white font-openSans text-[16px] font-bold">
                Get The Product Sheet
              </button>
            </div>
          }
        />
      </section>
    </div>
  );
};

export default page;
