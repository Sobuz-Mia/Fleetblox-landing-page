import RightArrowIcon from "@/components/icons/RightArrowIcon";
import TickIcon from "@/components/icons/TickIcon";
import FeatureCard from "@/components/ui/FeatureCard";
import { WhyRemoteAccessData } from "@/Static_data/solution";
import Image from "next/image";
import Link from "next/link";

const page = () => {
  const items = [
    {
      id: 1,
      title: "Digital Key Access",
      description:
        "Give drivers secure access with one-time or recurring digital keys—no physical keys needed.",
    },
    {
      id: 2,
      title: "Instant Control",
      description:
        "Remotely lock or unlock vehicles—giving drivers access exactly when they need it.",
    },
    {
      id: 3,
      title: "Driver Management",
      description:
        "Assign digital keys, track usage, and revoke access anytime—effortlessly.",
    },
    {
      id: 4,
      title: "Enhanced Security",
      description:
        "Encrypted digital keys ensure only authorized drivers can access your fleet.",
    },
  ];
  return (
    <div>
      {/* hero section */}
      <section className="bg-[#FAFAFF] pt-[100px] lg:pt-[140px] pb-[30px] ">
        <div className="lg:max-w-[calc(100vw-30px)] xxl:max-w-[1440px] mx-auto w-full flex flex-col px-5 lg:flex-row items-center justify-between">
          <div className="lg:pl-[130px]">
            <h3 className="text-[#0336BC] font-openSans font-bold text-[22px]">
              Remote Access
            </h3>
            <h1 className="text-[#04082C] text-[36px] lg:text-[52px] font-bold leading-[1.1]">
              Seamlessly Grant Fleet Access with a Digital Key
            </h1>
            <p className="text-[#333] text-[16px] leading-6 mt-[10px] lg:mt-4 mb-5 font-openSans">
              Fleetblox’s Remote Access allows fleet owners to easily grant
              drivers secure access to their vehicles using a digital key. With
              just a few clicks, you can remotely provide or revoke access,
              ensuring your fleet is secure.
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
              src="/images/remoteAccessHero.png"
              alt="AI assistant for fleet optimization"
              width={700}
              height={491}
              className="object-contain w-full"
            />
          </div>
        </div>
      </section>
      {/* hero section end */}
      <section className="max-w-[1200px] mx-auto w-full mt-[60px] lg:mt-[100px] px-5">
        <div className="max-w-[840px] mx-auto w-full text-center">
          <h2 className="text-[#04082C] text-[28px] lg:text-[36px] font-bold text-center leading-[1.1] mb-[10px]">
            Smarter Fleet Access, Stronger Security
          </h2>
          <p className="text-[#333] text-[16px] leading-6 font-openSans">
            Unleashing unmatched security, total control, and a revolutionary
            next-gen fleet management experience designed for the future of
            mobility
          </p>
        </div>
        <div className="flex flex-col lg:flex-row py-8 lg:py-[60px] justify-between">
          <div className="">
            <Image
              src="/images/remoteAccessSmarterFleet.png"
              alt="remote access smarter fleet"
              width={600}
              height={430}
              className="object-contain w-full"
            />
          </div>
          <div className="flex flex-col w-[350px] md:w-[600px] mx-auto md:ml-10  gap-5 pt-5">
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
      {/* why Cloud section */}
      <section className="max-w-[1100px] mx-auto w-full my-10 lg:my-[100px] px-5">
        <h2 className="mb-[40px] max-w-[840px] w-full mx-auto lg:mb-[60px] text-center text-[#04082C] text-[28px] lg:text-[36px] font-bold">
          Why Remote Access with a Digital Key Matters
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 justify-items-center lg:gap-[30px] gap-[20px]">
          {WhyRemoteAccessData?.map((data, index) => (
            <FeatureCard
              key={index}
              icon={<data.icon />}
              title={data.title}
              description={data.description}
              className="max-w-[500px] w-full"
            />
          ))}
        </div>
      </section>
      {/* why Cloud section end */}
    </div>
  );
};

export default page;
