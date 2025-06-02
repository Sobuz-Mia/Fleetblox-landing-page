import Link from "next/link";
import { TruckIcon } from "lucide-react";
import RightArrowIcon from "@/components/icons/RightArrowIcon";
// code push korlam mac theke
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4 text-center">
      <div className="max-w-md mx-auto">
        {/* Logo with navy blue truck icon */}
        <div className="mb-6">
          <TruckIcon className="h-24 w-24 mx-auto text-blue-900" />
        </div>

        {/* Error code */}
        <h1 className="text-6xl font-bold text-blue-900 mb-2">404</h1>

        {/* Main heading */}
        <h2 className="text-[#333] text-[28px] font-bold text-center leading-[1.1] mb-4">
          Page Not Found
        </h2>

        {/* Error description */}
        <p className="text-[#7D7D7D] text-center leading-5 text-[14px] font-openSans mb-8">
          {`The resource you're looking for seems to have taken a detour. Our
          fleet can't locate the requested page.`}
        </p>

        <div className="flex justify-center">
          <Link href={"/"}>
            <button className="transition-all bg-[#2D65F2] hover:bg-[#0336BC] font-openSans text-white-primary text-white duration-300 hover:w-[160.16px] w-[144.16px] flex items-center px-4 py-3 text-base font-bold rounded-md group">
              <div className="z-20 whitespace-nowrap">Back to Home</div>
              <div className="z-10 transform transition-transform opacity-0 group-hover:opacity-100 -translate-x-1 duration-300 group-hover:translate-x-0">
                <RightArrowIcon />
              </div>
            </button>
          </Link>
        </div>
      </div>

      {/* Footer with subtle branding */}
      <div className="mt-12 font-openSans text-[16px] leading-6 text-[#7D7D7D]">
        &copy; {new Date().getFullYear()} FleetBlox | All Rights Reserved
      </div>
    </div>
  );
}
