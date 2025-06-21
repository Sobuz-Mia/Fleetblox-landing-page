import RightArrowIcon from "@/components/icons/RightArrowIcon";
import TickIcon from "@/components/icons/TickIcon";
import FeatureCard from "@/components/ui/FeatureCard";
import { WhyRemoteScalabilityData } from "@/Static_data/solution";
import Image from "next/image";
import Link from "next/link";

const page = () => {
  const items = [
    {
      id: 1,
      title: "Comprehensive Global Coverage",
      description:
        "Manage your fleet across 20+ countries with global support.",
    },
    {
      id: 2,
      title: "Compatibility with 25+ Car Brands",
      description:
        "Our platform supports all vehicle types, brands and models.",
    },
    {
      id: 3,
      title: "Seamless Fleet Expansion",
      description:
        "Easily add new vehicles, regardless of region, and integrate them into your existing fleet management system with minimal effort.",
    },
    {
      id: 4,
      title: "Localized Support",
      description:
        "Add new vehicles from any region and seamlessly integrate them into your fleet with ease.",
    },
    {
      id: 5,
      title: "Real-Time Monitoring Across Regions",
      description:
        "Manage fleets globally from one platform with real-time updates on performance, location, and status.",
    },
  ];
  return (
    <div>
      {/* hero section */}
      <section className="bg-[#FAFAFF] pt-[100px] lg:pt-[140px] pb-[30px] ">
        <div className="lg:max-w-[calc(100vw-30px)] xxl:max-w-[1440px] mx-auto w-full flex flex-col px-5 lg:flex-row items-center justify-between">
          <div className="lg:pl-[130px]">
            <h3 className="text-[#0336BC] font-openSans font-bold text-[22px]">
              Remote Scalability
            </h3>
            <h2 className="text-[#04082C] text-[36px] lg:text-[52px] font-bold leading-[1.1]">
              Effortless Fleet Expansion Across Regions
            </h2>
            <p className="text-[#333] text-[16px] leading-6 mt-[10px] lg:mt-4 mb-5 font-openSans">
              {`Expanding your fleet is simpler than ever—no matter where you are.
              Whether you're managing a fleet in North America, Europe, or
              beyond, our platform allows you to seamlessly scale your
              operations to meet your growing business needs, ensuring that your
              fleet management solution is ready for any market.`}
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
              src="/images/Remote-Scalability-Hero.png"
              alt="Remote Scalability Hero"
              width={700}
              height={491}
              className="object-contain w-full"
            />
          </div>
        </div>
      </section>
      {/* hero section end */}
      <section className="max-w-[1200px] mx-auto w-full mt-[60px] lg:mt-[100px] px-5">
        <div className=" text-center">
          <h2 className="text-[#04082C] text-[28px] lg:text-[36px] font-bold text-center leading-[1.1] mb-[10px]">
            Effortless Global Fleet Scaling with Fleetblox
          </h2>
          <p className="text-[#333] text-[16px] leading-6 font-openSans">
            Scale your fleet across multiple locations in 20+ countries with 25+
            compatible car brands.
          </p>
        </div>
        <div className="flex flex-col lg:flex-row items-center py-8 lg:py-[60px] justify-between">
          <div className="py-10">
            <Image
              src="/images/Remote-Scalability-Global.png"
              alt="Remote Scalability Global"
              width={600}
              height={387}
              className="object-contain w-full"
            />
          </div>
          <div className="flex flex-col w-[350px] md:w-[600px] mx-auto md:ml-10 pt-10 gap-5">
            {items.map((item) => (
              <div key={item.id} className="flex items-center w-full gap-x-4">
                {/* Consistent icon container */}
                <div className="w-8 h-8 min-w-[32px]">
                  <TickIcon />
                </div>
                <div>
                  <h2 className="text-[18px] font-openSans font-bold text-[#333]">
                    {item.title}
                  </h2>
                  <p className="text-[#7D7D7D] leading-6 font-normal font-openSans text-[14px] ">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* why Remote Scalability section */}
      <section className="max-w-[1200px] mx-auto w-full my-10 lg:my-[100px] px-5">
        <h1 className="mb-[40px] lg:mb-[60px] text-center text-[#04082C] text-[28px] lg:text-[36px] font-bold">
          Why Remote Scalability Matters
        </h1>
        <div className="lg:grid hidden grid-cols-1 lg:grid-cols-3 justify-items-center gap-[30px]">
          {WhyRemoteScalabilityData?.slice(0, 3).map((data, index) => (
            <FeatureCard
              key={index}
              icon={<data.icon />}
              title={data.title}
              description={data.description}
              className="max-w-[380px] w-full"
            />
          ))}
        </div>
        <div className="grid lg:hidden grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center lg:gap-[30px] gap-[20px]">
          {WhyRemoteScalabilityData?.map((data, index) => (
            <FeatureCard
              key={index}
              icon={<data.icon />}
              title={data.title}
              description={data.description}
            // className="w-full"
            />
          ))}
        </div>
        <div className="lg:flex hidden flex-col items-center justify-items-center justify-center lg:flex-row mt-[30px] gap-[30px]">
          {WhyRemoteScalabilityData?.slice(3, 5).map((data, index) => (
            <FeatureCard
              key={index}
              icon={<data.icon />}
              title={data.title}
              description={data.description}
              className="max-w-[380px] w-full"
            />
          ))}
        </div>
      </section>
      {/* why Cloud section end */}
    </div>
  );
};

export default page;
