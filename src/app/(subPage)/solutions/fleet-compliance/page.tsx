'use client';
import CheckIcon from "@/components/icons/CheckIcon";
import RightArrowIcon from "@/components/icons/RightArrowIcon";
import GlobeSection from "@/components/modules/home/globe";
import FeatureCard from "@/components/ui/FeatureCard";
import { KeepingComplianceData } from "@/Static_data/solution";
import Image from "next/image";
import Link from "next/link";

const page = () => {
  return (
    <div>
      {/* hero section */}
      <section className="bg-[#FAFAFF] pt-[100px] lg:pt-[140px] pb-[30px] ">
        <div className="lg:max-w-[calc(100vw-30px)] xxl:max-w-[1440px] mx-auto w-full flex flex-col px-5 lg:flex-row items-center justify-between">
          <div className="lg:pl-[100px] md:max-w-[660px] w-full">
            <h3 className="text-[#0336BC] font-openSans font-bold text-[22px]">
              Fleet Compliance
            </h3>
            <h1 className="text-[#04082C] text-[36px] lg:text-[52px] font-bold leading-[1.1]">
              Fleet Compliance On Autopilot
            </h1>
            <p className="text-[#333] text-[16px] leading-6 mt-[10px] lg:mt-4 mb-5 font-openSans">
              Optimize your fleet safety with intelligent automation that
              ensures every vehicle remains fully compliant, and ready for
              operation.
            </p>
            <div className="flex items-center gap-4">
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
              <button onClick={() => localStorage.setItem("isGetDemo", "true")}>
                <Link href="/getting-started">
                  <span className="cursor-pointer text-[16px] transition-all duration-300 ease-in-out hover:text-[#7D7D7D0] py-[13px] rounded-md px-5 border-[#B8CBFC] border text-[#2D65F2] font-bold  font-openSans">
                    Get Demo
                  </span>
                </Link>
              </button>
            </div>
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
              src="/images/solutions/fleet-complience-hero.png"
              alt="AI assistant for fleet optimization"
              width={700}
              height={491}
              className="object-contain w-full"
            />
          </div>
        </div>
      </section>
      {/* hero section end */}

      {/* Regulatory Management section */}
      <section className="max-w-[1200px] mx-auto w-full py-[60px] md:py-[100px] px-5">
        <div className="max-w-[840px] mx-auto w-full md:text-center mb-[60px]">
          <h2 className="text-[#04082C] text-[28px] lg:text-[36px] font-bold md:text-center leading-[1.1] mb-[10px]">
            Regulatory Management
          </h2>
          <p className="text-[#333] text-[16px] leading-6 font-openSans ">
            Replace your folders and spreadsheets with a smart records
            management solution.
          </p>
        </div>
        <div className="flex justify-between flex-col md:flex-row items-center gap-10">
          <div className=" ">
            <video
              autoPlay
              loop
              muted
              playsInline
              // preload="auto"
              className="w-full h-full"
              // poster="/images/solutions/fleet-complience-hero.png"
            >
              <source
                src="/videos/solutions/reglatory-management.mov"
                type="video/mp4"
              />
            </video>
          </div>
          <div className=" max-w-[580px] w-full space-y-[40px]">
            <div className="flex items-center gap-5 w-full">
              <div>
                <CheckIcon />
              </div>
              <div>
                <h3 className="text-[#333] font-openSans text-[18px] font-bold mb-[5px] leading-6">
                  Insurance & Registration Validity
                </h3>
                <p className="text-[16px] leading-6 text-[#7D7D7D] font-openSans">
                  Never miss an expiration and stay prepared to drive your
                  vehicle with automated renewal alerts, and instant access to
                  proof of insurance for each vehicle.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-5">
              <div>
                <CheckIcon />
              </div>
              <div>
                <h3 className="text-[#333] font-openSans text-[18px] font-bold mb-[5px] leading-6">
                  Fleet Documents on schedule
                </h3>
                <p className="text-[16px] leading-6 text-[#7D7D7D] font-openSans">
                  Manage your vehicle contracts and operational permits with
                  easy reminders for key dates, renewals, and compliance checks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Entry Inspection section */}
      <section className="max-w-[1200px] mx-auto w-full py-[60px] md:py-[100px] px-5">
        <div className="text-left mb-10">
          <h3 className="text-[28px] lg:text-[44px] font-semibold text-[#04082C]">
            <span className="text-[#0336BC]">Entry</span> Inspection
          </h3>
          <p className="text-[14px] font-openSans text-[#333] leading-5">
            Always ensure that every vehicle is compliant before entering in the
            service.
          </p>
        </div>
        <div className="flex justify-between flex-col-reverse md:flex-row items-center gap-10 xl:gap-24">
          <div className=" max-w-[500px] w-full space-y-[30px]">
            <div>
              <h3 className="text-[#333] font-openSans text-[18px] font-bold mb-[5px] leading-6">
                1. VIN verification and asset matching
              </h3>
              <p className="text-[16px] leading-6 text-[#7D7D7D] font-openSans">
                Use the VIN scanner to automatically verify the vehicle’s
                identity which is matched with the appropriate digital profile.
              </p>
            </div>
            <div>
              <h3 className="text-[#333] font-openSans text-[18px] font-bold mb-[5px] leading-6">
                2. Smart damage recognition
              </h3>
              <p className="text-[16px] leading-6 text-[#7D7D7D] font-openSans">
                AI-powered image capture to identify, tag, and document visible
                damages, with photographic proof.
              </p>
            </div>
            <div>
              <h3 className="text-[#333] font-openSans text-[18px] font-bold mb-[5px] leading-6">
                3. Entry inspection reports
              </h3>
              <p className="text-[16px] leading-6 text-[#7D7D7D] font-openSans">
                Generate full inspection reports, with individual reports,
                images, and status summaries.
              </p>
            </div>
          </div>
          <div className=" max-w-[507px] max-h-[380px] w-full h-full">
            <video
              autoPlay
              loop
              muted
              playsInline
              // preload="auto"
              className="w-full h-full"
            >
              <source
                src="/videos/solutions/entry-inspection.mov"
                type="video/mp4"
              />
            </video>
          </div>
        </div>
      </section>
      {/* Intelligent Reminders*/}
      <section className="max-w-[1200px] mx-auto w-full py-[60px] md:py-[100px] px-5">
        <div className="max-w-[900px] mx-auto w-full md:text-center mb-[60px]">
          <h2 className="text-[#04082C] text-[28px] lg:text-[36px] font-bold md:text-center leading-[1.1] mb-[10px]">
            Intelligent Reminders
          </h2>
          <p className="text-[#333] text-[16px] leading-6 font-openSans ">
            Ensure your fleet meets all regulatory requirements to keep every
            vehicle roadworthy, compliant, and audit-ready.
          </p>
        </div>
        <div className="flex justify-between flex-col md:flex-row items-center gap-10">
          <div className=" ">
            <video
              autoPlay
              loop
              muted
              playsInline
              // preload="auto"
              className="w-full h-full"
              // poster="/images/solutions/intelligent-reminders.png"
            >
              <source
                src="/videos/solutions/intelligent-reminders.mov"
                type="video/mp4"
              />
            </video>
          </div>
          <div className=" max-w-[580px] w-full space-y-[40px]">
            <div className="flex items-center gap-5 w-full">
              <div>
                <CheckIcon />
              </div>
              <div>
                <h3 className="text-[#333] font-openSans text-[18px] font-bold mb-[5px] leading-6">
                  Time based reminders
                </h3>
                <p className="text-[16px] leading-6 text-[#7D7D7D] font-openSans">
                  Schedule alerts that remind you about required safety
                  inspections, emissions testing, and vehicle certifications
                  related by their respective calendar due dates.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-5">
              <div>
                <CheckIcon />
              </div>
              <div>
                <h3 className="text-[#333] font-openSans text-[18px] font-bold mb-[5px] leading-6">
                  Mileage based reminders
                </h3>
                <p className="text-[16px] leading-6 text-[#7D7D7D] font-openSans">
                  Set alerts that notify you about compliance specific vehicle
                  maintenance events such as DOT inspections or safety audits at
                  pre configured mileage thresholds.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*  Keeping Compliance On Track */}
      <section className="max-w-[1200px] mx-auto w-full py-[60px] md:pt-[100px] md:pb-[60px] px-5">
        <h2 className="mb-[40px] lg:mb-[60px] text-center text-[#04082C] text-[28px] lg:text-[36px] font-bold">
          Keeping Compliance On Track
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center gap-[30px]">
          {KeepingComplianceData?.map((data, index) => (
            <FeatureCard
              key={index}
              icon={<data.icon />}
              title2={data.title}
              className={`max-w-[380px] w-full ${
                index === 6 &&
                "sm:col-span-2 lg:col-span-3 md:max-w-[380px] mx-auto "
              }`}
            />
          ))}
        </div>
      </section>
      {/* why  Keeping Compliance On Track end */}
      {/* glove section start */}
      <div>
        <GlobeSection
          paddingTop="pt-[40px]"
          title="Eliminate Risk. Grow with Confidence"
          description="Your fleet doesn't slow down — and neither should your compliance."
        />
      </div>
    </div>
  );
};

export default page;
