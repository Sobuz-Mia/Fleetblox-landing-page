import CostOperatingIcon from "@/components/icons/CostOperatingIcon";
import DecisionMakingIcon from "@/components/icons/DecisionMakingIcon";
import DriverAccountabilityIcon from "@/components/icons/DriverAccountabilityIcon";
import AnimatedCounter from "./../../ui/AnimatedCounter";
import fleetSolutionImg from "../../../assets/fleetSolution.png";
import fleetSolutionImg2 from "../../../assets/fleetSolution.png";
import Image from "next/image";
type StatItem = {
  icon: React.FC;
  value: number;
  suffix?: string;
  description: string;
};

const StatsSection = () => {
  const statsData: StatItem[] = [
    {
      icon: DecisionMakingIcon,
      value: 90,
      description: "Faster Deployment Across Locations",
    },
    {
      icon: DriverAccountabilityIcon,
      value: 3,
      suffix: "X",
      description: "Faster ROI on Fleet Operations",
    },
    {
      icon: CostOperatingIcon,
      value: 60,
      description: "Increase in Asset Utilization",
    },
  ];

  return (
    <section className="py-[60px] flex flex-col items-center justify-center mx-auto max-w-[1200px] px-5">
      {/* counter component */}
      <div className="flex flex-col lg:flex-row justify-center gap-20 py-[30px] mb-[60px]">
        {statsData.map((stat, index) => (
          <div key={index} className="text-center flex flex-col items-center">
            <stat.icon />
            <h1 className="text-[#04082C] text-[36px] md:text-[52px] font-bold">
              <AnimatedCounter end={stat.value} isString={stat.suffix} />
            </h1>
            <p className="text-[#333] font-openSans text-[16px] font-semibold leading-6">
              {stat.description}
            </p>
          </div>
        ))}
      </div>
      {/* Laptop View */}
      <div
        style={{ boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.14)" }}
        className=" hidden md:flex lg:flex mx-auto max-w-[1200px]  rounded-[24px] flex-col lg:flex-row px-10 pb-[100px] pt-10 justify-items-center items-center"
      >
        <div className="max-w-[540px] w-fulls">
          <h2 className="text-[36px] font-bold text-[#0A2540] leading-tight md:leading-[1.1] mb-5">
            Built for <br />
            <span className="text-[#0336BC]">Infinite Business Models</span>
          </h2>
          <p className="text-[#333] text-base leading-6">
            Fleetblox has been built to be aligned with modern business
            practices to accelerate your business growth. Fleetblox AI leverages
            the ability to factor in how the assets move, respond to, and
            perform with operational aspects. The system builds in real-time to
            the operational constructs, so businesses can launch, adjust, or
            change their business models as needed.
          </p>
        </div>
        <div className="w-1/2">
          <Image
            src={fleetSolutionImg}
            alt="logo"
            className="w-full h-auto object-contain"
          />
        </div>
      </div>

      {/* Mobile View */}
      <div className="flex md:hidden lg:hidden mx-auto max-w-7xl  flex-col md:flex-row lg:flex-row">
        <div>
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-[36px] text-center font-bold text-[#0A2540] leading-tight md:leading-[1.1] mb-5">
              Built for <br />
              <span className="text-[#0336BC]">Infinite Business Models</span>
            </h2>
            <div className="w-full">
              <Image
                src={fleetSolutionImg}
                alt="logo"
                className="w-full h-full hidden lg:block"
              />
              <Image
                src={fleetSolutionImg2}
                alt="logo"
                className="w-full h-full block lg:hidden"
              />
            </div>
          </div>
          <div className="pt-5 ">
            <p className="text-[#7D7D7D] text-sm leading-5 text-center">
              Fleetblox has been built to be aligned with modern business
              practices to accelerate your business growth. Fleetblox AI
              leverages the ability to factor in how the assets move, respond
              to, and perform with operational aspects. The system builds in
              real-time to the operational constructs, so businesses can launch,
              adjust, or change their business models as needed.
            </p>

            {/* <Link
              aria-label="Get started with FleetBlox"
              href="/getting-started"
            >
              <button className="lg:hidden bg-[#2D65F2] hover:bg-[#0336BC] text-white w-full flex px-4 py-3 text-[14px] font-openSans font-bold rounded-md justify-center">
                Get Started
              </button>
            </Link> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
