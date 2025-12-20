"use client";
import Image from "next/image";
import GlobeSection from "@/components/modules/home/globe";

// Dynamic import for GSAP animations
import dynamic from "next/dynamic";
import Loader from "@/app/(gettingStarted)/components/Loader";
// import StarterFleetActionButton from "@/components/ui/StarterFleetActionButton";

// import ScrollingSection from "./components/scrollingAnnimation";

// Importing the Deal component dynamically
const Deal = dynamic(() => import("./components/LoadingSection"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full">
      <div className="loader">
        <Loader />
      </div>
    </div>
  ),
});

const ScrollingSection = dynamic(
  () => import("./components/scrollingAnnimation"),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-full">
        <div className="loader">
          <Loader />
        </div>
      </div>
    ),
  }
);

const AutoDealership = () => {
  const animationItems = [
    {
      title: "Keep All Vehicle Sales Ready and in Excellent Condition",
      content:
        "Check the condition of every vehicle in your inventory on a consistent basis, whether it is a demo, loaner, or new vehicle. Use checks to track wear-and-tear, damage, or service needed, so that your inventory remains sale-ready.",
      image: `/images/industries/auto-dealer-1.svg`,
    },
    {
      title: "Ensure Every Vehicle Is Compliant and Road-Ready",
      content:
        "Monitor registrations, insurance, and servicing with a system that will maintain your entire fleet in immaculate compliance. Automated monitoring and on-time reminders ensure nothing slips through the cracks - so every vehicle remains legal, safe, and ready to roll.",
      image: `/images/industries/slide-animation-2.svg`,
    },
    {
      title: "Maximize Customer Satisfaction and Fleet Health",
      content:
        "Lease cars, demos, and courtesy cars shouldn't keep you in suspense - they should leave you with potential. Fleetblox gives you real-time visibility into the status, utilization, and health of every unit. Look to the future for service requirements, sidestep costly delays, and keep each vehicle road-ready and revenue-ready - no matter where it is in its life cycle.",
      image: `/images/industries/auto-dealer-3.svg`,
    },
  ];

  const Deals = [
    {
      title: "Centralized Inventory",
      content:
        "Manage your entire fleet from one dashboard. Monitor health, availability, and readiness across all locations in real time.",
      image: "/images/industries/auto-dealership-a-1.svg",
    },

    {
      title: "Multi-Brand Sync",
      content:
        "Easily manage vehicles from different brands. Our platform integrates seamlessly with various manufacturers, ensuring a smooth experience.",
      image: "/images/industries/auto-dealership-a-2.svg",
    },
    {
      title: "Cross-Location Logistics",
      content:
        "Effortlessly move vehicles between branches. Our platform simplifies logistics, ensuring your fleet is always where it needs to be.",
      image: "/images/industries/auto-dealership-a-3.svg",
    },
  ];

  return (
    <div>
      {/* hero section */}
      <section className="bg-[#FAFAFF] pt-[100px] lg:pt-[120px] pb-[30px] ">
        <div className="lg:max-w-[calc(100vw-30px)] xxl:max-w-[1440px] mx-auto w-full flex flex-col px-5 lg:flex-row items-center justify-between">
          <div className="lg:pl-[130px] max-w-[700px] w-full">
            <h3 className="text-[#0336BC] font-openSans font-bold text-[22px] w-full">
              Fleetblox for Auto Dealerships
            </h3>
            <h1 className="text-[#04082C] text-[36px] lg:text-[50px] font-bold leading-[1.1] w-full">
              Build and Link Your Fleet Across Brands and Locations
            </h1>
            <p className="text-[#333] text-[16px] leading-6 mt-[10px] lg:mt-4 mb-5 font-openSans">
              Be in total control of your dealership&apos;s inventory - no
              matter how many locations or brands you have. See availability in
              real time, move vehicles between branches effortlessly, and keep
              every unit sale-ready from one, integrated platform.
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
            </Link> */}
            {/* <Link
              aria-label="Get started with FleetBlox"
              href="/getting-started"
            >
              <button className="lg:hidden bg-[#2D65F2] hover:bg-[#0336BC] text-white w-full flex px-4 py-3 text-[14px] font-openSans font-bold rounded-md justify-center">
                Start today
              </button>
            </Link> */}
            {/* <StarterFleetActionButton text="Start Today" />
            <StarterFleetActionButton isMobile={true} text="Start Today" /> */}
          </div>
          <div className=" w-full py-10 lg:pl-[60px]">
            <Image
              src="/images/industries/auto-dealership-hero.svg"
              alt="Remote Scalability Hero"
              width={560}
              height={420}
              priority={true}
              quality={75}
              className="object-contain w-full"
            />
          </div>
        </div>
      </section>

      {/* smart dealership section */}

      <section className=" mx-auto w-full mt-[60px] lg:mt-[100px] px-5">
        <div className="max-w-[840px] mx-auto w-full text-center">
          <h2 className="text-[#04082C] text-[28px] lg:text-[36px] font-bold text-center leading-[1.1] mb-[10px]">
            Smarter Dealerships Network
          </h2>
          <p className="text-[#333] text-[16px] leading-6 font-openSans">
            Sync stock, move faster, and manage every branch with ease
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
                Fill the Gaps Between Your Locations
              </h3>
              <p className="text-[#333333] mt-4 text-[16px] leading-[150%] font-openSans text-justify">
                Transferring vehicles from one location to another should never
                be a guess. Give the right employees the right tasks, schedule
                the pick-ups and drop-offs, and track each move - from dispatch
                to delivery. Streamline internal processes and close the loop on
                vehicle movement with smart task management and real-time
                visibility.
              </p>
            </div>
          </div>

          {/* Right side - Image */}
          <div className=" rounded-lg overflow-hidden flex items-center justify-center py-12">
            <Image
              src="/images/industries/fill-the-gaps.png"
              alt="Auto Dealership Management System"
              width={600}
              height={440}
              priority={true}
              quality={75}
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
              src="/images/industries/maximize-customer.png"
              alt="Auto Dealership Management System"
              width={500}
              height={280}
              priority={true}
              quality={75}
              className="object-contain w-full max-w-[450px]"
            />
          </div>

          {/* Right side - Content */}
          <div className="flex items-center justify-center">
            <div className="max-w-[500px] w-full">
              <h3 className="text-[#04082C] leading-[100%] font-bold text-[36px] font-montserrat">
                Maximize Customer Satisfaction and Fleet Health
              </h3>
              <p className="text-[#333333] mt-4 text-[16px] leading-[150%] font-openSans">
                Monitor leased and demo vehicles in real-time to enable timely
                maintenance and service. Let Your customers know exactly when
                their vehicle needs service, and you maintain your fleet in
                prime condition, reducing costs and maintaining vehicle value
                for resale.
              </p>
            </div>
          </div>
        </div>
      </section>
      <GlobeSection
        title="Unify Your Dealership Network, Elevate Your Fleet Operations."
        description="No more blind spots, missed inspections, or inventory imbalances. Fleetblox gives you total control of all brands and branches - so you can manage smarter, move faster, and sell more."
      />
    </div>
  );
};

export default AutoDealership;
