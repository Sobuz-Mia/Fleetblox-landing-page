import Image from "next/image";
import GlobeSection from "@/components/modules/home/globe";
import Deal from "../auto-dealerships/components/LoadingSection";
import ScrollingSection from "../auto-dealerships/components/scrollingAnnimation";
import StarterFleetActionButton from "@/components/ui/StarterFleetActionButton";

const EMobilityServices = () => {
  const animationItems = [
    {
      title: "Unleash Maximum Performance for All EVs, All the Time",
      content:
        "Fleetblox gives you instant, single-pane visibility into your entire EV fleet - from vehicle health and battery condition to location and usage. View the condition of every vehicle at a glance, detect early signs of deterioration, and be assured your assets are always ready to roll. With centralized insight across brands",
      image: `/images/industries/evs-1.svg`,
    },
    {
      title: "Smarter Charging, Smooth Operations",
      content:
        "Fleetblox puts you in full command of your charging system - in real-time. Whether cars are on the move, parked, or actually charging, you have live insight into battery level, charging state, and overall vehicle health.",
      image: `/images/industries/evs-2.svg`,
    },
    {
      title: "Stop EV Overspending Before It Starts",
      content:
        "Fleetblox gives you total control over your EV fleet's spend. Assign per-vehicle budgets, customize alert levels, and track usage through simple-to-read visual reports. Get real-time alerts whenever a threshold is crossed - with a breakdown of exactly what happened - and eliminate waste, improve efficiency, and drive lean and scalable operations.",
      image: `/images/industries/evs-3.svg`,
    },
  ];

  const Deals = [
    {
      title: "Seamless EV Integration",
      content:
        "Bring all electric vehicles together under one smart system—regardless of brand or model. Fleetblox integrates your entire EV fleet into one platform, built for scale, speed, and simplicity",
      image: "/images/industries/EV Integration-1.svg",
    },

    {
      title: "Charging Efficiency",
      content:
        "Gain real-time insights into charging status, battery health, and many more. Keep each vehicle perfectly charged and ready to roll—without doubt.",
      image: "/images/industries/EV Integration-2.svg",
    },
    {
      title: "Remote Control",
      content:
        "Take complete control of your fleet anywhere. Track performance, manage charging, and remotely control vehicle functions through a safe, cloud-based dashboard.",
      image: "/images/industries/EV Integration-3.svg",
    },
  ];
  return (
    <div>
      {/* hero section */}
      <section className="bg-[#FAFAFF] pt-[100px] lg:pt-[120px] pb-[30px] ">
        <div className="lg:max-w-[calc(100vw-30px)] xxl:max-w-[1440px] mx-auto w-full flex flex-col px-5 lg:flex-row items-center justify-between">
          <div className="lg:pl-[130px] max-w-[700px] w-full">
            <h3 className="text-[#0336BC] font-openSans font-bold text-[22px] w-full">
              Fleetblox for E-Mobility Services
            </h3>
            <h1 className="text-[#04082C] text-[36px] lg:text-[50px] font-bold leading-[1.1] w-full">
              Command Every Kilowatt Across Cities
            </h1>
            <p className="text-[#333] text-[16px] leading-6 mt-[10px] lg:mt-4 mb-5 font-openSans">
              Fleetblox is your one-stop EV fleet command center - built to
              enable next-gen mobility operators to scale smarter, move cleaner,
              and move faster. Regardless of your fleet size - 50 or 5,000
              electric vehicles - across borders, brands, or business models,
              Fleetblox gives you total visibility, intelligent automation, and
              seamless control, all in one unified platform.
            </p>
            {/* <Link
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
            </Link> */}

            <StarterFleetActionButton text="Start Today" />
            <StarterFleetActionButton isMobile={true} text="Start Today" />
          </div>
          <div className=" w-full py-10 lg:pl-[60px]">
            <Image
              src="/images/industries/ev-hero.svg"
              alt="Remote Scalability Hero"
              width={560}
              height={420}
              priority
              className="object-contain w-full"
            />
          </div>
        </div>
      </section>

      {/* smart dealership section */}

      <section className=" mx-auto w-full mt-[60px] lg:mt-[100px] px-5">
        <div className="max-w-[840px] mx-auto w-full text-center">
          <h2 className="text-[#04082C] text-[28px] lg:text-[36px] font-bold text-center leading-[1.1] mb-[10px]">
            Electrify Smarter
          </h2>
          <p className="text-[#333] text-[16px] leading-6 font-openSans">
            Unify charging, battery health, and remote control across your
            entire EV fleet
          </p>
        </div>
        <Deal Deals={Deals} />
      </section>

      {/* animations section with GSAP scrolling */}
      <ScrollingSection animationItems={animationItems} />

      {/* fill the gap section */}

      <section className="max-w-[1200px] mx-auto w-full mt-[60px] lg:mt-[100px] px-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-6 lg:gap-10">
          {/* Left side - Content */}
          <div className="flex items-center justify-center">
            <div className="max-w-[500px] w-full">
              <h3 className="text-[#04082C] leading-[100%] font-bold text-[36px] font-montserrat">
                Empower Every Mile with No Unscheduled Stops
              </h3>
              <p className="text-[#333333] mt-4 text-[16px] leading-[150%] font-openSans text-justify">
                Fleetblox keeps your fleet performing optimally at all times
                with intelligent reminders if the battery level goes below your
                personalized thresholds and usage-based reminders for
                maintenance, receiving alerts before anything to respond in time
                and preventing significant downtime and maximizing the usage of
                your fleet.
              </p>
            </div>
          </div>

          {/* Right side - Image */}
          <div className=" rounded-lg overflow-hidden flex items-center justify-center py-12">
            <Image
              src="/images/industries/empower.svg"
              alt="Empower Every Mile with No Unscheduled Stops"
              width={600}
              height={440}
              priority
              className="object-contain w-full max-w-[600px]"
            />
          </div>
        </div>
      </section>
      {/* maximize customer satisfaction section */}
      <section className="bg-[#FAFAFF] w-full mt-[60px] lg:mt-[100px] py-12">
        <div className="max-w-[1200px] mx-auto px-5 grid grid-cols-1 lg:grid-cols-2 items-center gap-6 lg:gap-10">
          {/* Left side - Image */}
          <div className="flex items-center justify-center">
            <Image
              src="/images/industries/run-it.svg"
              alt="Run It All Remotely - "
              width={500}
              height={280}
              priority
              className="object-contain w-full max-w-[450px]"
            />
          </div>

          {/* Right side - Content */}
          <div className="flex items-center justify-center">
            <div className="max-w-[500px] w-full">
              <h3 className="text-[#04082C] leading-[100%] font-bold text-[36px] font-montserrat">
                Run It All Remotely - From Anywhere
              </h3>
              <p className="text-[#333333] mt-4 text-[16px] leading-[150%] font-openSans">
                Fleetblox is made for remote teams and fleets that need total
                control, wherever they may be. Your team can monitor
                performance, conduct remote diagnostics, and even lock, unlock,
                or start vehicle charging in real-time from a single cloud-based
                dashboard - whether the vehicles are parked, charging, or on the
                move. With secure remote access, you&apos;re in control of every
                EV, across cities, countries, or charging stations, without
                being there.
              </p>
            </div>
          </div>
        </div>
      </section>
      <GlobeSection
        title="Empower Your EV Fleet Instantly "
        description="Seamlessly integrate, streamline charging, and remotely control with Fleetblox - maximizing efficiency and uptime across your fleet"
      />
    </div>
  );
};

export default EMobilityServices;
