import { NavbarItem } from "@/types/types";
import Link from "next/link";

const GenerateNavbarItem = ({
  title,
  description,
  href,
  isUpcoming,
}: NavbarItem) => {
  return (
    <Link href={href}>
      <div className={`group ${description ? "h-10" : ""}`}>
        <h3 className="text-[#333] text-[14px] leading-5 font-openSans py-[10px] lg:py-0 font-bold lg:font-semibold group-hover:text-[#0336BC] flex gap-[5px]">
          {title}
          {isUpcoming && (
            <button className="text-[8px] rounded-[4px] py-[0px] px-[6px] bg-[#2D65F2] text-white">
              Upcoming
            </button>
          )}
        </h3>
        {description && (
          <p className="text-[#7D7D7D] text-[11px] group-hover:text-[12px] font-openSans hidden lg:block">
            {description}
          </p>
        )}
      </div>
    </Link>
  );
};

export default GenerateNavbarItem;
