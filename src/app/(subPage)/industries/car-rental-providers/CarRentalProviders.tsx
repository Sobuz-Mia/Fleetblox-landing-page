import Image from "next/image";
import GlobeSection from "@/components/modules/home/globe";
import Deal from "../auto-dealerships/components/LoadingSection";
import ScrollingSection from "../auto-dealerships/components/scrollingAnnimation";
import StarterFleetActionButton from "@/components/ui/StarterFleetActionButton";

const CarRentalProviders = () => {
  const animationItems = [
    {
      title: "Unleash Your Fleet’s Full Potential and Scale Your Sales ",
      content:
        "Seamlessly integrate gas, hybrid, and electric vehicles into a single system. Fleetblox streamlines every aspect of your fleet operation, for greater efficiency, heightened profitability, and smarter management of all vehicle types.",
      image: `/images/industries/unleash-fleet-1.svg`,
    },
    {
      title: "Compliance Simplified, Revenue Amplified",
      content:
        "Fleetblox simplifies compliance with digital inspections and auto-tracking of vehicle documents and status — keeping each vehicle in optimal condition, having your fleet ready to roll and reducing unnecessary operational cost",
      image: `/images/industries/unleash-fleet-2.svg`,
    },
    {
      title: "Rev Up Your Revenue, Cut Down on Costs",
      content:
        "Keep your fleet running at its best without overspending. Fleetblox helps you track costs with custom budgets and real-time alerts, while automated maintenance reminders prevent costly repairs and maximize uptime.",
      image: `/images/industries/unleash-fleet-3.svg`,
    },
  ];

  const Deals = [
    {
      title: "Easy Scale",
      content:
        "Expand your rental business without the complicity . Fleetblox adapts to your expanding fleet , bringing all your vehicles, locations, and crew together in one place",
      image: "/images/industries/easy-scale-1.svg",
    },

    {
      title: "Reduce Downtime",
      content:
        "Keep your fleet in peak condition. Fleetblox monitor fleet status,maintenance and service reminders to keep downtime to a minimum and have all your vehicles available to rent at all times.",
      image: "/images/industries/easy-scale-2.svg",
    },
    {
      title: "Boost Security",
      content:
        "Protect your vehicles and your business with location logs, remote diagnostics, and automated compliance tools, ensuring your fleet stays fully compliant, and protected across all locations.",
      image: "/images/industries/easy-scale-3.svg",
    },
  ];
  return (
    <div>
      {/* hero section */}
      <section className="bg-[#FAFAFF] pt-[100px] lg:pt-[120px] pb-[30px] ">
        <div className="lg:max-w-[calc(100vw-30px)] xxl:max-w-[1440px] mx-auto w-full flex flex-col px-5 lg:flex-row items-center justify-between">
          <div className="lg:pl-[130px] max-w-[700px] w-full">
            <h3 className="text-[#0336BC] font-openSans font-bold text-[22px] w-full">
              Fleetblox for Car Rentals
            </h3>
            <h1 className="text-[#04082C] text-[36px] lg:text-[50px] font-bold leading-[1.1] w-full">
              Command Your Rental Empire
            </h1>
            <p className="text-[#333] text-[16px] leading-6 mt-[10px] lg:mt-4 mb-5 font-openSans">
              Fleetblox is your all-in-one command center - built to scale your
              car rental business with precision. Whether you’re managing 30 or
              3,000 vehicles, gas or electric, in one city or many, you’ll
              unlock total control, smarter decisions, and higher returns - all
              from one intelligent platform
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
              src="/images/industries/car-rental-hero.svg"
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
            Rental Ops, Refined
          </h2>
          <p className="text-[#333] text-[16px] leading-6 font-openSans">
            Shift smarter, reduce idle time, and serve more customers
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
                Roam Beyond Boundaries, Your Fleet Always Visible
              </h3>
              <p className="text-[#333333] mt-4 text-[16px] leading-[150%] font-openSans text-justify">
                Track the last known position of vehicles and view historical
                location records, minimizing risk and enhancing security,
                providing peace of mind while safeguarding your assets
                throughout all business sites.
              </p>
            </div>
          </div>

          {/* Right side - Image */}
          <div className=" rounded-lg overflow-hidden flex items-center justify-center py-12">
            <Image
              src="/images/industries/Roam-Beyond-Boundaries.svg"
              alt="Roam Beyond Boundaries, Your Fleet Always Visible"
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
              src="/images/industries/move-your-fleet.svg"
              alt="Move Your Fleet Where It’s Needed, When It’s Needed"
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
                Move Your Fleet Where It’s Needed, When It’s Needed
              </h3>
              <p className="text-[#333333] mt-4 text-[16px] leading-[150%] font-openSans">
                Shift idle vehicles to high-demand areas with ease. Fleetblox
                unifies your team, vehicles, and workflows into one streamlined
                system - so you always make the most of your fleet, wherever the
                demand is.
              </p>
            </div>
          </div>
        </div>
      </section>
      <GlobeSection
        title="Get More Bookings, Fewer Headaches"
        description="Fleetblox gives you the tools to move faster, rent smoother, and grow stronger - all while keeping your vehicles working and your customers coming back. It’s not just fleet management; it’s your competitive edge."
      />
    </div>
  );
};

export default CarRentalProviders;
