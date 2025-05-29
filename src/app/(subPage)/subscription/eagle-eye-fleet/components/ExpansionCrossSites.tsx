import Image from "next/image";

const ExpansionCrossSites = () => {
  return (
    <div className=" bg-[#FAFAFF]">
      <section className="pt-[120px] pb-[100px] max-w-[1200px] mx-auto w-full px-5 ">
        <div className="text-center max-w-[840px] mx-auto w-full">
          <h2 className="text-[36px] font-bold text-[#04082C] leading-[1.1]">
            Expansion Across Sites
          </h2>
          <p className="text-[#333] text-[16px] leading-6 font-openSans mt-[10px] mb-[60px] ">
            Built for growing fleets, distributed teams, and multi-site
            visibility. From one yard to dozens—you remain in control without
            introducing complexity.
          </p>
        </div>
        <div className="relative ">
          <div
            className={`absolute left-1/2 top-1/2 hidden lg:block size-[664px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FBEECA] opacity-40 blur-[200px]`}
          ></div>
          <div
            style={{ boxShadow: "0px 4px 12px 0px rgba(0, 0, 0, 0.14)" }}
            className="rounded-3xl bg-white w-full z-50 relative p-[30px] mb-5"
          >
            <h2 className="text-[#333] text-[22px] font-openSans font-bold">
              Multi-Location Oversight
            </h2>
            <p className="text-[#7D7D7D] font-openSans text-[16px] leading-6 mb-10">
              See all your fleet sites in one place, no matter how many sites
              there are.
            </p>
            <Image
              src="/images/subscription/multi-location-oversite.svg"
              alt="Car and laptop"
              width={676}
              height={483}
              className="object-contain w-full"
              quality={100}
              priority
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div
              style={{ boxShadow: "0px 4px 12px 0px rgba(0, 0, 0, 0.14)" }}
              className="rounded-3xl bg-white w-full z-50 relative p-[30px]"
            >
              <h2 className="text-[#333] text-[22px] font-openSans font-bold">
                Fleet Coordinators App
              </h2>
              <p className="text-[#7D7D7D] font-openSans text-[16px] leading-6 mb-10">
                Easily manage field teams and daily tasks with the Crew
                application.
              </p>
              <Image
                src="/images/subscription/fleet-coordinate-app.svg"
                alt="Car and laptop"
                width={676}
                height={483}
                className="object-contain w-full"
                quality={100}
                priority
              />
            </div>
            <div
              style={{ boxShadow: "0px 4px 12px 0px rgba(0, 0, 0, 0.14)" }}
              className="rounded-3xl bg-white w-full z-50 relative p-[30px]"
            >
              <h2 className="text-[#333] text-[22px] font-openSans font-bold">
                Role-Based Access
              </h2>
              <p className="text-[#7D7D7D] font-openSans text-[16px] leading-6 mb-10">
                Set appropriate permissions for team members for system
                security.
              </p>
              <Image
                src="/images/subscription/role-based-access.svg"
                alt="Car and laptop"
                width={676}
                height={483}
                className="object-contain w-full"
                quality={100}
                priority
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExpansionCrossSites;
