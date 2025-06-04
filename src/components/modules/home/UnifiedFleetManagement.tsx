import RightArrowIcon from "@/components/icons/RightArrowIcon";
import Image from "next/image";
import Link from "next/link";

const UnifiedFleetManagement = () => {
  return (
    <main className="max-w-[1200px] w-full mx-auto py-20 lg:py-[120px] px-5">
      {/* Unified fleet management */}
      <section className=" flex flex-col md:flex-row items-center gap-[60px]">
        <div className="max-w-[570px] w-full items-center">
          <h2 className="text-[#0336BC] text-[22px] font-bold font-openSans mb-[10px] leading-[1.1]">
            Unified fleet management
          </h2>
          <h1 className="text-[#04082C] font-bold text-[36px] leading-[1.1] mb-5">
            Sync Your Assets Across Your Business locations
          </h1>
          <p className="text-[#333] mb-[30px] text-[16px] font-openSans leading-6">
            Unify your complete fleet operation with one single integrated
            platform. Fleetblox connects every aspect of your operation,
            vehicle, teams, and locations —into one integrated system built to
            mitigate any fragmentation that keep your fleet synchronous,
            efficient and ready to scale regardless of where or how you operate{" "}
          </p>
          <Link href="/features/dashboard">
            <button className="hidden md:flex lg:flex mb-10 transition-all bg-[#2D65F2] hover:bg-[#0336BC] text-white duration-300 hover:w-[144.16px] w-[122.16px] items-center px-4 py-3 text-[16px] font-bold rounded-md group">
              <div className="z-20 whitespace-nowrap font-openSans font-bold">
                Learn More
              </div>
              <div className="z-10 transform transition-transform opacity-0 group-hover:opacity-100 -translate-x-4 duration-300 group-hover:translate-x-0">
                <RightArrowIcon />
              </div>
            </button>
          </Link>
        </div>
        <div>
          <Image
            src={"/images/unified-fleet-management.svg"}
            height={480}
            width={600}
            alt="unified fleet management"
          />
          <Link href="/features/dashboard">
            <button className="md:hidden mt-10 bg-[#2D65F2] hover:bg-[#0336BC] text-white w-full flex px-4 py-3 text-[14px] font-openSans font-bold rounded-md justify-center">
              Learn More
            </button>
          </Link>
        </div>
      </section>
      {/* Stay audit-ready */}
      <section className=" flex flex-col md:flex-row-reverse items-center gap-[60px] lg:mt-[260px] mt-20">
        <div className="max-w-[570px] w-full items-center">
          <h2 className="text-[#0336BC] text-[22px] font-bold font-openSans mb-[10px] leading-[1.1]">
            Stay audit-ready
          </h2>
          <h1 className="text-[#04082C] font-bold text-[36px] leading-[1.1] mb-5">
            Compliance, Handled Before It’s Due!
          </h1>
          <p className="text-[#333] mb-[30px] text-[16px] font-openSans leading-6">
            Fleetblox automate compliance by triggering intelligent alerts for
            document renewals, expirations, and maintenance schedules with the
            option for fully customizable notifications based on your
            operational needs. Entry inspections are embedded into your workflow
            so that you can ensure that every fleet vehicle complies with your
            internal SOPs and regulatory standards across all you locations.
          </p>
          <Link href="/features/documents-management">
            <button className="hidden md:flex lg:flex mb-10 transition-all bg-[#2D65F2] hover:bg-[#0336BC] text-white duration-300 hover:w-[144.16px] w-[122.16px] items-center px-4 py-3 text-[16px] font-bold rounded-md group">
              <div className="z-20 whitespace-nowrap font-openSans font-bold">
                Learn More
              </div>
              <div className="z-10 transform transition-transform opacity-0 group-hover:opacity-100 -translate-x-4 duration-300 group-hover:translate-x-0">
                <RightArrowIcon />
              </div>
            </button>
          </Link>
        </div>
        <div>
          <Image
            src={"/images/stay-audit-ready.svg"}
            height={480}
            width={600}
            alt="stay audit ready"
          />
          <Link href="/features/documents-management">
            <button className="md:hidden mt-10 bg-[#2D65F2] hover:bg-[#0336BC] text-white w-full flex px-4 py-3 text-[14px] font-openSans font-bold rounded-md justify-center">
              Learn More
            </button>
          </Link>
        </div>
      </section>
      {/* Unlock higher ROI */}
      <section className=" flex flex-col md:flex-row items-center gap-[60px] pt-[120px]">
        <div className="max-w-[570px] w-full items-center">
          <h2 className="text-[#0336BC] text-[22px] font-bold font-openSans mb-[10px] leading-[1.1]">
            Unlock Higher ROI
          </h2>
          <h1 className="text-[#04082C] font-bold text-[36px] leading-[1.1] mb-5">
            Spot Inefficiencies & Maximize your{" "}
            <span className="text-[#0336BC]">ROI</span>
          </h1>
          <p className="text-[#333] mb-[30px] text-[16px] font-openSans leading-6">
            Fleetblox provides you with complete command over operational
            expenses by allowing you to define customizable budgets set per
            asset across all locations. Automated alerts tell you when you are
            nearing your budget so you can intervene before you exceed it. Gain
            full visibility with real-time cost insights to enhance
            cost-efficiency and create verifiable ROI by improving fleet cost
            management across all your locations.
          </p>
          <Link href="/features/expenses-management">
            <button className="hidden md:flex lg:flex mb-10 transition-all bg-[#2D65F2] hover:bg-[#0336BC] text-white duration-300 hover:w-[144.16px] w-[122.16px] items-center px-4 py-3 text-[16px] font-bold rounded-md group">
              <div className="z-20 whitespace-nowrap font-openSans font-bold">
                Learn More
              </div>
              <div className="z-10 transform transition-transform opacity-0 group-hover:opacity-100 -translate-x-4 duration-300 group-hover:translate-x-0">
                <RightArrowIcon />
              </div>
            </button>
          </Link>
        </div>
        <div>
          <Image
            src={"/images/unlock-higher-roi.svg"}
            height={480}
            width={600}
            alt="Unlock higher roi"
          />
          <Link href="/features/expenses-management">
            <button className="md:hidden mt-10 bg-[#2D65F2] hover:bg-[#0336BC] text-white w-full flex px-4 py-3 text-[14px] font-openSans font-bold rounded-md justify-center">
              Learn More
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default UnifiedFleetManagement;
