import RightArrowIcon from "@/components/icons/RightArrowIcon";
import Link from "next/link";
import ReducedRiskAndDowntime from "./components/ReducedRiskAndDowntime";
import RealtimeFleetAwareness from "./components/RealtimeFleetAwareness";
import AuditReadySection from "./components/AuditReadySection";
import ExpansionCrossSites from "./components/ExpansionCrossSites";

const page = () => {
  return (
    <>
      {/* hero section */}
      <section className="bg-[#FAFAFF] lg:pt-[100px] pb-[30px] overflow-hidden relative">
        <div className="max-w-[1200px] mx-auto px-5 flex flex-col items-center lg:py-[120px] pt-[100px] pb-10 lg:pb-0 text-center relative z-50 ">
          <h1 className="text-[28px] text-[#0336BC] font-bold font-montserrat">
            Eagle Eye Fleet
          </h1>
          <h2 className="text-[36px] lg:text-[52px] font-bold text-[#04082C] leading-normal md:leading-[1.1] max-w-[800px] w-full mx-auto mb-[10px] mt-[5px] font-montserrat">
            Turn Fleet Blind Spots into Strategic Insights
          </h2>
          <p className="text-[16px] text-[#333] leading-6 font-openSans mb-[30px]">
            {` Eagle Eye is not just another fleet utility—it's your operational
          edge. Designed for today's fleet operation, it keeps you in
          compliance, notifies you of danger before it occurs, and captures full
          clarity on all vehicles and all locations—without hardware,
          installations, or man hours`}
          </p>
          {/* hover:w-[168.72px] w-[190.72px] */}
          <Link aria-label="Get started with FleetBlox" href="/getting-started">
            <button className="hidden transition-all bg-[#2D65F2] hover:bg-[#0336BC] font-openSans text-white-primary text-white duration-300 hover:w-[190.72px] w-[168.72px] lg:flex items-center px-4 py-3 text-base font-bold rounded-md group">
              <div className="z-50 whitespace-nowrap">View Pricing Plan</div>
              <div className="z-50 transform transition-transform opacity-0 group-hover:opacity-100 -translate-x-4 duration-300 group-hover:translate-x-0">
                <RightArrowIcon />
              </div>
            </button>
          </Link>
          <Link aria-label="Get started with FleetBlox" href="/getting-started">
            <button className="lg:hidden bg-[#2D65F2] hover:bg-[#0336BC] text-white w-full flex px-4 py-3 text-[14px] font-openSans font-bold rounded-md justify-center">
              Start today
            </button>
          </Link>
        </div>
        {/* Blurred spotlight ellipse */}
        <div
          className={`absolute left-1/2 top-2/3 max-w-[664px] w-full max-h-[664px] h-full -translate-x-1/2 -translate-y-1/2 rounded-[664px] bg-[#FBEECA] opacity-40 blur-[200px]`}
        ></div>
      </section>
      {/* Realtime fleet awareness section */}
      <RealtimeFleetAwareness />
      {/* Reduced Risk and Downtime section */}
      <ReducedRiskAndDowntime />
      {/* Always audit ready section */}
      <AuditReadySection />
      {/* Expansions cross sites */}
      <ExpansionCrossSites />
    </>
  );
};

export default page;
