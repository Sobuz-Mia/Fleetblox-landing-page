import RightArrowIcon from "@/components/icons/RightArrowIcon";
import DataDrivenDricision from "@/components/icons/solution/fleet-intelligence/DataDrivenDricision";
import ExpendVehicleLife from "@/components/icons/solution/fleet-intelligence/ExpendVehicleLife";
import MaximizeFleetAvailability from "@/components/icons/solution/fleet-intelligence/MaximizeFleetAvailability";
import PredictPreventFailor from "@/components/icons/solution/fleet-intelligence/PredictPreventFailor";
import PreventBudget from "@/components/icons/solution/fleet-intelligence/PreventBudget";
import ReduceCostOfOwnership from "@/components/icons/solution/fleet-intelligence/ReduceCostOfOwnership";
import GlobeSection from "@/components/modules/home/globe";
import FeatureCard from "@/components/ui/FeatureCard";
import Image from "next/image";
import Link from "next/link";

const page = () => {
  const operationDemandsData = [
    {
      icon: PreventBudget,
      title: "Prevent Budget Overruns",
    },
    {
      icon: ReduceCostOfOwnership,
      title: "Reduce Total Cost of Ownership",
    },
    {
      icon: ExpendVehicleLife,
      title: "Extend Vehicle Lifespan",
    },
    {
      icon: PredictPreventFailor,
      title: "Predict and Prevent Failures",
    },
    {
      icon: MaximizeFleetAvailability,
      title: "Maximize fleet Availability",
    },
    {
      icon: DataDrivenDricision,
      title: "Empower Data-Driven Decisions",
    },
  ];

  return (
    <div>
      {/* hero section */}
      <section className="bg-[#FAFAFF] pt-[100px] lg:pt-[140px] pb-[30px] ">
        <div className="lg:max-w-[calc(100vw-30px)] xxl:max-w-[1440px] mx-auto w-full flex flex-col px-5 lg:flex-row items-center justify-between">
          <div className="lg:pl-[100px] md:max-w-[670px] w-full">
            <h3 className="text-[#0336BC] font-openSans font-bold text-[22px]">
              Fleet Intelligence
            </h3>
            <h1 className="text-[#04082C] text-[36px] lg:text-[52px] font-bold leading-[1.1]">
              The Intelligence Layer for Modern Fleets
            </h1>
            <p className="text-[#333] text-[16px] leading-6 mt-[10px] lg:mt-4 mb-5 font-openSans">
              FleetBlox equips fleets with the tools to predict, prevent, and
              perform — ensuring fleet operations are cost-effective, compliant,
              and always ready.
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
              src="/images/solutions/fleet-intelligence-hero.png"
              alt="AI assistant for fleet optimization"
              width={700}
              height={491}
              className="object-contain w-full"
              priority
            />
          </div>
        </div>
      </section>
      {/* hero section end */}

      {/* Cost Optimization section */}
      <section className="max-w-[1200px] mx-auto w-full py-[60px] md:py-[100px] px-5">
        <div className="max-w-[840px] mx-auto w-full md:text-center mb-[60px]">
          <h2 className="text-[#04082C] text-[28px] lg:text-[36px] font-bold md:text-center leading-[1.1] mb-[10px]">
            Cost Optimization
          </h2>
          <p className="text-[#333] text-[16px] leading-6 font-openSans ">
            Stop Budget Overruns Before They Start
          </p>
        </div>
        <div className="flex justify-between flex-col md:flex-row items-center gap-10">
          <div className=" ">
            <video
              autoPlay
              loop
              muted
              playsInline
              // preload="auto"
              className="w-full h-full"
              // poster="/images/solutions/fleet-complience-hero.png"
            >
              <source
                src="/videos/solutions/cost-operation.mov"
                type="video/mp4"
              />
            </video>
          </div>
          <div className=" max-w-[580px] w-full space-y-[40px]">
            <div className="flex items-center gap-5 w-full">
              <div>
                <CheckIcon_2 />
              </div>
              <div>
                <h3 className="text-[#333] font-openSans text-[18px] font-bold mb-[5px] leading-6">
                  Budget Controls
                </h3>
                <p className="text-[16px] leading-6 text-[#7D7D7D] font-openSans">
                  Set your operational spending limits for each vehicle and get
                  alerts if limits are exceeded.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <div>
                <CheckIcon_2 />
              </div>
              <div>
                <h3 className="text-[#333] font-openSans text-[18px] font-bold mb-[5px] leading-6">
                  Real Time Cost Monitor
                </h3>
                <p className="text-[16px] leading-6 text-[#7D7D7D] font-openSans">
                  Track true costs of operating for real time, including fuel,
                  maintenance and usage based costs.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-5">
              <div>
                <CheckIcon_2 />
              </div>
              <div>
                <h3 className="text-[#333] font-openSans text-[18px] font-bold mb-[5px] leading-6">
                  Efficiency Budget Insights.
                </h3>
                <p className="text-[16px] leading-6 text-[#7D7D7D] font-openSans">
                  Compare actual performances by vehicle and branch to identify
                  inefficiencies and cut waste.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Operational Intelligence section*/}
      <section className="max-w-[1200px] mx-auto w-full py-[60px] md:py-[100px] px-5">
        <div className="max-w-[900px] mx-auto w-full md:text-center mb-[60px]">
          <h2 className="text-[#04082C] text-[28px] lg:text-[36px] font-bold md:text-center leading-[1.1] mb-[10px]">
            Operational Intelligence
          </h2>
          <p className="text-[#333] text-[16px] leading-6 font-openSans ">
            Turn operational data into smarter service strategies
          </p>
        </div>
        <div className="flex justify-between flex-col md:flex-row items-center gap-10">
          <div className=" ">
            <video
              autoPlay
              loop
              muted
              playsInline
              // preload="auto"
              className="w-full h-full"
              // poster="/images/solutions/intelligent-reminders.png"
            >
              <source
                src="/videos/solutions/operation-intelligence.mov"
                type="video/mp4"
              />
            </video>
          </div>
          <div className=" max-w-[580px] w-full space-y-[40px]">
            <div className="flex items-center gap-5 w-full">
              <div>
                <CheckIcon_2 />
              </div>
              <div>
                <h3 className="text-[#333] font-openSans text-[18px] font-bold mb-[5px] leading-6">
                  Maintenance and Inspections Predictions
                </h3>
                <p className="text-[16px] leading-6 text-[#7D7D7D] font-openSans">
                  AI predicts a flow of what needs to be maintained or inspected
                  based on mileage triggers.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-5">
              <div>
                <CheckIcon_2 />
              </div>
              <div>
                <h3 className="text-[#333] font-openSans text-[18px] font-bold mb-[5px] leading-6">
                  Vehicle Status Indicators
                </h3>
                <p className="text-[16px] leading-6 text-[#7D7D7D] font-openSans">
                  Real-time indicators based on comprehensive analysis of
                  vehicle systems and usage history.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-5">
              <div>
                <CheckIcon_2 />
              </div>
              <div>
                <h3 className="text-[#333] font-openSans text-[18px] font-bold mb-[5px] leading-6">
                  AI Assistant
                </h3>
                <p className="text-[16px] leading-6 text-[#7D7D7D] font-openSans">
                  Chat with an AI-powered assistant to gain fleet insights,
                  answers, and operational guidance for faster actions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*  Keeping Compliance On Track */}
      <section className="max-w-[1200px] mx-auto w-full py-[60px] md:pt-[100px] md:pb-[60px] px-5">
        <h2 className="mb-[40px] lg:mb-[60px] text-center text-[#04082C] max-w-[840px] w-full mx-auto text-[28px] lg:text-[36px] font-bold">
          Built to Tackle the operational Demands of Your Fleet
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center gap-[30px]">
          {operationDemandsData?.map((data, index) => (
            <FeatureCard
              key={index}
              icon={<data.icon />}
              title2={data.title}
              className={`max-w-[380px] w-full `}
            />
          ))}
        </div>
      </section>
      {/* why  Keeping Compliance On Track end */}
      {/* glove section start */}
      <div>
        <GlobeSection
          paddingTop="pt-[40px]"
          title="Transform your Fleet Data into Business Value"
          description="FleetBlox leverages advanced AI and intelligent automation to simplify fleet management, turning complex data into actionable insights."
          extraButton={
            <Link href={"/getting-started"}>
              <button className="bg-[#2D65F2] rounded-[6px] px-5 py-3 text-white font-openSans text-[16px] font-bold">
                Get Started
              </button>
            </Link>
          }
        />
      </div>
    </div>
  );
};

export default page;

const CheckIcon_2 = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="28"
      viewBox="0 0 32 28"
      fill="none"
    >
      <path
        d="M30.5152 0H25.4544C25.2022 0 24.9659 0.122918 24.8211 0.329377L5.41406 28H12.3762L31.1487 1.21757C31.508 0.704913 31.1413 0 30.5152 0Z"
        fill="#2D65F2"
        fill-opacity="0.7"
      />
      <path
        d="M1.14655 14.5469H6.42973C6.74543 14.5469 7.02945 14.7387 7.14734 15.0316L12.3672 27.9984H5.40509L0.428727 15.6088C0.224576 15.1005 0.598812 14.5469 1.14655 14.5469Z"
        fill="#B8CBFC"
        fillOpacity="0.6"
      />
    </svg>
  );
};
