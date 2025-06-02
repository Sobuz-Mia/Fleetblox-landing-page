import CostOperatingIcon from "@/components/icons/CostOperatingIcon";
import DecisionMakingIcon from "@/components/icons/DecisionMakingIcon";
import DriverAccountabilityIcon from "@/components/icons/DriverAccountabilityIcon";
import AnimatedCounter from "./../../ui/AnimatedCounter";
import fleetSolutionImg from "../../../assets/fleetSolution.png";
import fleetSolutionImg2 from "../../../assets/fleetSolution.png";
import Image from "next/image";
import NavigationIcon from "@/components/icons/NavigationIcon";
type StatItem = {
  icon: React.FC;
  value: number;
  suffix?: string;
  description: string;
};
type Feature = {
  title: string;
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
      suffix: "K",
      description: "Faster ROI on Fleet Operations",
    },
    {
      icon: CostOperatingIcon,
      value: 60,
      description: "Increase in Asset Utilization",
    },
  ];
  const fleetFeatures: Feature[] = [
    {
      title: "Lower Costs",
      description: "Eliminate expensive hardware installation and maintenance.",
    },
    {
      title: "Streamlined Operations",
      description: "Manage everything from a cloud-based, all-in-one platform.",
    },
    {
      title: "Scalability",
      description:
        "Add or remove vehicles effortlessly, free from hardware limitations.",
    },
    {
      title: "Enhanced Security",
      description: "Advanced encryption ensures your data stays protected.",
    },
    {
      title: "Increased Efficiency",
      description:
        "Leverage AI tools to optimize scheduling and reduce downtime.",
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
        className=" hidden md:flex lg:flex mx-auto max-w-[1200px]  rounded-[24px] flex-col lg:flex-row"
      >
        <div className="flex flex-col items-center lg:items-start w-full lg:w-1/2 p-10 mx-auto">
          <h1 className="text-[#04082C] text-[36px] text-center lg:text-left font-bold mb-5 font-montserrat leading-[1.1]">
            Experience a Smarter Way to Manage Your Fleet
          </h1>
          {/* <Link
            href="/getting-started "
            aria-label="Get started with FleetBlox"
          >
            <button className="md:flex transition-all font-openSans bg-[#2D65F2] hover:bg-[#0336BC] text-white-primary text-white duration-300 hover:w-[144.16px] w-[122.16px]  items-center px-[13px] hover:px-4 py-3 text-base font-bold rounded-md group">
              <div className="z-20 whitespace-nowrap">Get Started</div>
              <div className="z-10 transform transition-transform opacity-0 group-hover:opacity-100 -translate-x-4 duration-300 group-hover:translate-x-0">
                <RightArrowIcon />
              </div>
            </button>
          </Link> */}
          <div className="pt-10">
            {fleetFeatures.map((feature, index) => (
              <div key={index} className="flex gap-[16px] mb-[30px]">
                <NavigationIcon />
                <div className=" text-[14px]  leading-5 ">
                  <h2 className="font-bold text-[#333]">{feature?.title}</h2>
                  <p className="text-[#7D7D7D]">{feature?.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:w-1/2 w-full mx-auto lg:mt-10 xl:mt-20 flex justify-center items-center relative">
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
            <h1 className="text-[#04082C] text-[28px] text-center font-bold mb-5 font-montserrat leading-[1.1]">
              Experience a Smarter <br /> Way to Manage Your <br /> Fleet
            </h1>
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
          <div className="pt-10 ">
            {fleetFeatures.map((feature, index) => (
              <div key={index} className="flex gap-[16px] mb-[30px]">
                <NavigationIcon />
                <div className=" text-[14px] leading-5 ">
                  <h2 className="font-bold text-[#333] font-openSans">
                    {feature?.title}
                  </h2>
                  <p className="text-[#7D7D7D] font-openSans">
                    {feature?.description}
                  </p>
                </div>
              </div>
            ))}

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
