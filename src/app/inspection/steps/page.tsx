"use client";
import Image from "next/image";
import React, { useState } from "react";
import FleetBloxIcon from "../icons/FleetBloxIcon";
import VinSticker from "../icons/VinSticker";
import RightArrowIcon from "@/components/icons/RightArrowIcon";
import LicensePlanIcon from "../icons/LicensePlanIcon";

const InspectionSteps = () => {
  const [captureVinLicense, setCaptureVinLicense] = useState(false);
  return (
    <div className="bg-[#F5F9FC] h-screen p-5">
      {captureVinLicense ? (
        <div>
          <h1 className="text-[#303030] text-[20px] text-center font-bold mb-8">
            {" "}
            Capture the followings
          </h1>
          <div className="flex justify-between items-center py-5 border-t-[1px] border-[#DDD]">
            <div className="flex items-center gap-[10px]">
              <VinSticker />
              <h2 className="text-[#303030] text-[14px] leading-5 font-medium">
                Door VIN sticker
              </h2>
            </div>
            <RightArrowIcon fill="#7D7D7D" />
          </div>
          <div className="flex justify-between items-center py-5 border-b-[1px] border-[#DDD] opacity-50">
            <div className="flex items-center gap-[10px]">
              <LicensePlanIcon />
              <h2 className="text-[#303030] text-[14px] leading-5 font-medium">
                License plate
              </h2>
            </div>
            <RightArrowIcon fill="#7D7D7D" />
          </div>
        </div>
      ) : (
        <div>
          <FleetBloxIcon />
          <div className="space-y-[10px]">
            <div className="shadow-[0_2px_5px_0_rgba(0,0,0,0.05)] rounded-md bg-white p-5 mt-5">
              <div className="flex items-center gap-[10px]">
                <Image
                  src="/images/inspection/vehicle-logo.svg"
                  alt="brand logo"
                  width={40}
                  height={40}
                  // fill
                />
                <h2 className="text-[#303030] text-[20px] font-bold">
                  Mercedes Benz (2023)
                </h2>
              </div>
              <p className="text-[#999] text-[12px] font-normal leading-4 mt-5">
                Color:{" "}
                <span className="text-[#303030] text-[12px] font-semibold">
                  Cherry red
                </span>
              </p>
            </div>
            <div className="shadow-[0_2px_5px_0_rgba(0,0,0,0.05)] rounded-md bg-white p-5 ">
              <p className="text-[14px] font-bold text-[#6F6464] mb-5 text-center">
                Inspection steps
              </p>
              <div className="space-y-[10px]">
                {" "}
                <div className="p-4 border border-[#2D65F2] rounded-md">
                  <div className="flex items-center gap-[10px]">
                    <div className="border rounded-full p-[3.33px] w-[20px] h-[20px] flex items-center justify-center text-[#2D65F2] text-[10px] border-[#2D65F2] font-bold">
                      1
                    </div>
                    <h2 className="text-[12px] font-medium leading-4 text-[#151515]">
                      Capture vehicle VIN & license plate
                    </h2>
                  </div>
                  <button
                    onClick={() => setCaptureVinLicense(true)}
                    className="submit-button w-full mt-4"
                  >
                    Continue
                  </button>
                </div>
                <div className="p-4 border border-[#F6F6F6] rounded-md">
                  <div className="flex items-center gap-[10px]">
                    <div className="border rounded-full p-[3.33px] w-[20px] h-[20px] flex items-center justify-center text-[#DDD] text-[10px] border-[#F6F6F6] font-bold">
                      2
                    </div>
                    <h2 className="text-[12px] font-medium leading-4 text-[#999]">
                      Capture odometer
                    </h2>
                  </div>
                </div>
                <div className="p-4 border border-[#F6F6F6] rounded-md">
                  <div className="flex items-center gap-[10px]">
                    <div className="border rounded-full p-[3.33px] w-[20px] h-[20px] flex items-center justify-center text-[#DDD] text-[10px] border-[#F6F6F6] font-bold">
                      3
                    </div>
                    <h2 className="text-[12px] font-medium leading-4 text-[#999]">
                      Capture vehicle images & damages
                    </h2>
                  </div>
                </div>
                <div className="p-4 border border-[#F6F6F6] rounded-md">
                  <div className="flex items-center gap-[10px]">
                    <div className="border rounded-full p-[3.33px] w-[20px] h-[20px] flex items-center justify-center text-[#DDD] text-[10px] border-[#F6F6F6] font-bold">
                      4
                    </div>
                    <h2 className="text-[12px] font-medium leading-4 text-[#999]">
                      Review and submit report
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InspectionSteps;
