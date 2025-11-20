import Link from "next/link";
import { complyMenus, onboardMenus, operateMenus } from "../data";
import GenerateNavbarItem from "@/components/ui/GenerateNavbarItem";

const ProductSubpage = () => {
  return (
    <div className="p-[30px] bg-white grid grid-cols-1 lg:flex ">
      {/* Onboard page */}
      <div className="flex flex-col lg:space-y-[10px] space-y-[16px] border-b lg:border-none lg:pr-10">
        <p className="text-[#7D7D7D] font-openSans text-[12px] pt-5 lg:pt-0 lg:border-b lg:border-[#DFDFDF]">
          Onboard
        </p>
        <div className="lg:flex gap-[30px] hidden">
          <div className="flex flex-col space-y-[5px] w-[330px] lg:space-y-[16px]">
            {onboardMenus.map((items, index) => (
              <GenerateNavbarItem key={index} {...items} />
            ))}
          </div>
          {/* <div className="flex flex-col  space-y-[5px] lg:space-y-[16px]">
            {platformFeatures.slice(6, 11).map((items, index) => (
              <GenerateNavbarItem key={index} {...items} />
            ))}
          </div> */}
        </div>
        {/* mobile view */}
        <div className="flex flex-col  space-y-[5px] lg:space-y-[16px] lg:hidden">
          {onboardMenus.map((items, index) => (
            <GenerateNavbarItem key={index} {...items} />
          ))}
        </div>
      </div>
      {/* Operate page */}
      <div className="flex flex-col lg:space-y-[10px] space-y-[16px] border-b lg:border-none lg:pr-10">
        <p className="text-[#7D7D7D] font-openSans text-[12px] pt-5 lg:pt-0 lg:border-b lg:border-[#DFDFDF]">
          Operate
        </p>
        <div className="lg:flex gap-[30px] hidden ">
          <div className="flex flex-col  space-y-[5px] w-[300px] lg:space-y-[16px]">
            {operateMenus.map((items, index) => (
              <GenerateNavbarItem key={index} {...items} />
            ))}
          </div>
        </div>
        {/* mobile view */}
        <div className="flex flex-col  space-y-[5px] lg:space-y-[16px] lg:hidden">
          {operateMenus.map((items, index) => (
            <GenerateNavbarItem key={index} {...items} />
          ))}
        </div>
      </div>

      {/* Mobile apps */}
      <div className="flex flex-col lg:space-y-[10px] space-y-[16px] border-b lg:border-none lg:pr-10">
        <p className="text-[#7D7D7D] font-openSans text-[12px] pt-5 lg:pt-0 lg:border-b lg:border-[#DFDFDF]">
          Comply
        </p>
        <div className="lg:flex gap-[30px] hidden ">
          <div className="flex flex-col  space-y-[5px] w-[300px] lg:space-y-[16px]">
            {complyMenus.map((items, index) => (
              <GenerateNavbarItem key={index} {...items} />
            ))}
          </div>
        </div>
        {/* mobile view */}
        <div className="flex flex-col  space-y-[5px] lg:space-y-[16px] lg:hidden">
          {complyMenus.map((items, index) => (
            <GenerateNavbarItem key={index} {...items} />
          ))}
        </div>
      </div>
      {/* Subscription page */}
      <div className="flex flex-col lg:space-y-[10px] space-y-[16px] ">
        <p className="text-[#7D7D7D] font-openSans text-[12px] pt-5 lg:pt-0 lg:border-b lg:border-[#DFDFDF]">
          Subscription
        </p>
        <div className="flex flex-col lg:space-y-[8px] space-y-[5px]">
          <Link href="/subscription/starter-fleet-plan">
            <h3 className="text-[#333] text-[14px] leading-5 font-openSans py-[10px] lg:py-0 font-bold lg:font-semibold hover:text-[#0336BC]">
              Starter Fleet
            </h3>
          </Link>
          <Link href="/subscription/eagle-eye-fleet">
            <h3 className="text-[#333] text-[14px] leading-5 font-openSans py-[10px] lg:py-0 font-bold lg:font-semibold hover:text-[#0336BC]">
              Eagle Eye Fleet
            </h3>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductSubpage;
