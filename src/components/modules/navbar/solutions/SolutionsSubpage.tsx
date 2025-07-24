import { industriesItems, solutionsItems } from "../data";
import GenerateNavbarItem from "@/components/ui/GenerateNavbarItem";
const SolutionsSubpage = () => {
  return (
    <div className="p-[30px] bg-white  grid grid-cols-1 lg:grid-cols-2 lg:gap-[60px] ">
      {/* Solutions page */}
      <div className="flex flex-col lg:space-y-[10px] space-y-[16px] border-b lg:border-none">
        <p className="text-[#7D7D7D] font-openSans text-[12px] pt-5 lg:pt-0">
          Solutions
        </p>
        <div className="flex flex-col lg:space-y-[8px] space-y-[5px] w-[330px] ">
          {solutionsItems.map((items, index) => (
            <GenerateNavbarItem key={index} {...items} />
          ))}
        </div>
      </div>
      {/* Industries page */}
      <div className="flex flex-col lg:space-y-[10px] space-y-[16px] border-b lg:border-none">
        <p className="text-[#7D7D7D] font-openSans text-[12px] pt-5 lg:pt-0">
          Industries
        </p>
        <div className="flex flex-col lg:space-y-[8px] w-[330px] space-y-[5px]">
          {industriesItems.map((items, index) => (
            <GenerateNavbarItem key={index} {...items} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SolutionsSubpage;
