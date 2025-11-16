// components/inspection/VehicleInfo.tsx
import Image from "next/image";

export default function VehicleInfo() {
  return (
    <div className="shadow-[0_2px_5px_0_rgba(0,0,0,0.05)] rounded-md bg-white p-5 mt-5">
      <div className="flex items-center gap-[10px]">
        <Image
          src="/images/inspection/vehicle-logo.svg"
          alt="brand logo"
          width={40}
          height={40}
        />
        <h2 className="text-[#303030] text-[20px] font-bold">
          Mercedes Benz (2023)
        </h2>
      </div>

      <p className="text-[#999] text-[12px] font-normal leading-4 mt-5">
        Color: <span className="text-[#303030] font-semibold">Cherry red</span>
      </p>
    </div>
  );
}
