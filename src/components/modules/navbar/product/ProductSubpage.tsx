import Link from "next/link";

const ProductSubpage = () => {
  return (
    <div className="p-[30px] bg-white grid grid-cols-1 lg:grid-cols-3 lg:gap-[60px]">
      {/* platform page */}
      <div className="flex flex-col lg:space-y-[10px] space-y-[16px] border-b lg:border-none">
        <p className="text-[#7D7D7D] font-openSans text-[12px] pt-5 lg:pt-0">
          Platform
        </p>
        <div className="flex flex-col  space-y-[5px] lg:space-y-[8px]">
          <Link href="/features/dashboard">
            <h1 className="text-[#333] text-[14px] leading-5 font-openSans py-[10px] lg:py-0 font-bold lg:font-semibold hover:text-[#7D7D7D]">
              Dashboard
            </h1>
          </Link>
          <Link href="/features/getting-started">
            <h1 className="text-[#333] text-[14px] leading-5 font-openSans py-[10px] lg:py-0 font-bold lg:font-semibold hover:text-[#7D7D7D]">
              Getting Started
            </h1>
          </Link>
          <Link href="/features/fleet-integration">
            <h1 className="text-[#333] text-[14px] leading-5 font-openSans py-[10px] lg:py-0 font-bold lg:font-semibold hover:text-[#7D7D7D]">
              Fleet Integration
            </h1>
          </Link>
          <Link href="/features/fleet-expansion">
            <h1 className="text-[#333] text-[14px] leading-5 font-openSans py-[10px] lg:py-0 font-bold lg:font-semibold hover:text-[#7D7D7D]">
              Fleet Expansion
            </h1>
          </Link>
          <Link href="/features/digital-inspections">
            <h1 className="text-[#333] text-[14px] leading-5 font-openSans py-[10px] lg:py-0 font-bold lg:font-semibold hover:text-[#7D7D7D] flex gap-[10px]">
              Digital Inspections
              <button className="text-[8px] rounded-[4px] py-[0px] px-[6px] bg-[#2D65F2] text-white">
                Upcoming
              </button>
            </h1>
          </Link>
          <Link href="/features/maintenance-diagnostics">
            <h1 className="text-[#333] text-[14px] leading-5 font-openSans py-[10px] lg:py-0 font-bold lg:font-semibold hover:text-[#7D7D7D] flex gap-[10px]">
              Maintenance & Diagnostics
              <button className="text-[8px] rounded-[4px] py-[0px] px-[6px] bg-[#2D65F2] text-white">
                Upcoming
              </button>
            </h1>
          </Link>
          <Link href="/features/expenses-management">
            <h1 className="text-[#333] text-[14px] leading-5 font-openSans py-[10px] lg:py-0 font-bold lg:font-semibold hover:text-[#7D7D7D] flex gap-[10px]">
              Expenses Management
              <button className="text-[8px] rounded-[4px] py-[0px] px-[6px] bg-[#2D65F2] text-white">
                Upcoming
              </button>
            </h1>
          </Link>
          <Link href="/features/documents-management">
            <h1 className="text-[#333] text-[14px] leading-5 font-openSans py-[10px] lg:py-0 font-bold lg:font-semibold hover:text-[#7D7D7D]">
              Documents Management
            </h1>
          </Link>
          <Link href="/features/intelligent-alerts">
            <h1 className="text-[#333] text-[14px] leading-5 font-openSans py-[10px] lg:py-0 font-bold lg:font-semibold hover:text-[#7D7D7D] flex gap-[10px]">
              Intelligent Alerts
              <button className="text-[8px] rounded-[4px] py-[0px] px-[6px] bg-[#2D65F2] text-white">
                Upcoming
              </button>
            </h1>
          </Link>
          <Link href="/features/team-management">
            <h1 className="text-[#333] text-[14px] leading-5 font-openSans py-[10px] lg:py-0 font-bold lg:font-semibold hover:text-[#7D7D7D]">
              Team Management
            </h1>
          </Link>
          <Link href="/features/ai-assistant">
            <h1 className="text-[#333] text-[14px] leading-5 font-openSans py-[10px] lg:py-0 font-bold lg:font-semibold hover:text-[#7D7D7D]">
              AI Assistant
            </h1>
          </Link>
          {/* <div className="mt-[20px] text-[#2D65F2] text-[14px] font-openSans leading-5 font-semibold">
            <button className="pt-2">View All Features</button>
          </div> */}
        </div>
      </div>
      {/* Mobile apps */}
      <div className="flex flex-col lg:space-y-[10px] space-y-[16px] border-b lg:border-none">
        <p className="text-[#7D7D7D] font-openSans text-[12px] pt-5 lg:pt-0">
          Mobile Apps
        </p>
        <div className="flex flex-col space-y-[5px] lg:space-y-[8px]">
          <Link href="/mobile-apps/fleetblox-crew">
            <h1 className="text-[#333] text-[14px] leading-5 font-openSans py-[10px] lg:py-0 font-bold lg:font-semibold hover:text-[#7D7D7D]">
              Fleetblox Crew
            </h1>
          </Link>
          <Link href="/under-development">
            <h1 className="text-[#333] text-[14px] leading-5 font-openSans py-[10px] lg:py-0 font-bold lg:font-semibold hover:text-[#7D7D7D] flex gap-[10px]">
              Fleetblox Drive{" "}
              <button className="text-[8px] rounded-[4px] py-[0px] px-[6px] bg-[#2D65F2] text-white">
                Upcoming
              </button>
            </h1>
          </Link>
        </div>
        {/* <button className="transition-all mt-[5px]  leading-5 font-openSans text-[#2D65F2] duration-300 hover:w-[144.16px] w-[131.94px] flex items-center text-[14px] font-semibold group">
          <div className="z-20 whitespace-nowrap text-left font-openSans">
            View All Features
          </div>
          <div className="z-10 transform transition-transform opacity-0 group-hover:opacity-100 -translate-x-0 duration-300 group-hover:translate-x-0">
            <RightArrowIcon fill="#2D65F2" />
          </div>
        </button> */}
      </div>
      {/* Subscription page */}
      <div className="flex flex-col lg:space-y-[10px] space-y-[16px] ">
        <p className="text-[#7D7D7D] font-openSans text-[12px] pt-5 lg:pt-0">
          Subscription
        </p>
        <div className="flex flex-col lg:space-y-[8px] space-y-[5px]">
          <Link href="/under-development">
            <h1 className="text-[#333] text-[14px] leading-5 font-openSans py-[10px] lg:py-0 font-bold lg:font-semibold hover:text-[#7D7D7D]">
              Starter Fleet
            </h1>
          </Link>
          <Link href="/subscription/eagle-eye-fleet">
            <h1 className="text-[#333] text-[14px] leading-5 font-openSans py-[10px] lg:py-0 font-bold lg:font-semibold hover:text-[#7D7D7D]">
              Eagle Eye Fleet
            </h1>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductSubpage;
