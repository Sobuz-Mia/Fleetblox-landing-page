/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useProgressUpdater } from "@/hooks/useProgress";
import Vin from "@/../public/images/vin-image.svg";
import vehicle from "@/../public/images/vehicle.svg";
import { ChevronLeft } from "lucide-react";
interface CarModel {
  name: string;
  endpoints: string[]; // Array of endpoint names like 'Fuel tank', 'Location', etc.
}

interface CarBrand {
  brand: string;
  brandLogo: string;
  models: CarModel[];
  year: string;
  vin?: string;
  region?: string;
}

export type CarBrandsData = CarBrand[];

const Compatibility = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const country = searchParams.get("country");
  const [mode, setMode] = useState("");
  const [compatibility, setCompatibility] = useState<string | null>(null);

  const [disabled, setDisabled] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const compatibility = localStorage.getItem("compatibility");
      setCompatibility(compatibility);
    }
  }, []);

  const handleModeSelect = (mode: string) => {
    if (mode === "vin") {
      localStorage.removeItem("brandModels");
      localStorage.removeItem("brands");
    }

    if (mode === "vehicle") {
      localStorage.removeItem("VINS");
      localStorage.removeItem("VINS_RESULT");
    }

    if (compatibility === mode) {
      localStorage.removeItem("compatibility");
      setMode("");
      setCompatibility(null);
      localStorage.removeItem("");
    } else {
      setCompatibility(mode);
      setMode(mode);
      localStorage.setItem("compatibility", mode);
    }
  };

  const { setCustomProgress, progress } = useProgressUpdater();

  const handleNext = React.useCallback(() => {
    setDisabled(true);
    if (disabled) {
      return;
    }
    if (mode === "vin") {
      router.push(`/collections/VIN?country=${country}`);
    } else {
      router.push(`/collections/select-brand?country=${country}`);
    }
    setCustomProgress(progress + 10);
  }, [mode, setCustomProgress, progress, router, country]);

  const handleBack = () => {
    setCustomProgress(progress - 10);
    router.push(`/getting-started`);
  };

  return (
    <main className="flex flex-col h-[94vh] w-full max-w-[900px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Fixed Header */}
      <div className="flex-none">
        <div
          onClick={handleBack}
          className="mb-4 flex cursor-pointer items-center gap-1"
          aria-label="Get started with FleetBlox"
        >
          <ChevronLeft size={16} className="text-[#999]" />
          <span className="font-openSans text-sm font-semibold leading-[18px] text-[#999]">
            Back
          </span>
        </div>

        <div className="mb-8 text-center">
          <h2 className="font-bold text-[24px] sm:text-[28px] font-openSans text-[#04082C] ">
            Choose Compatibility Check Method
          </h2>
          <p className="font-openSans text-[14px] leading-[155%] sm:text-[16px] text-[#7D7D7D] mx-auto">
            Please select one of the following methods to check your fleet’s
            compatibility
          </p>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="min-h-0 flex-grow overflow-y-auto scrollbar-hidden">
        {/* <div className="">
          <div className="mb-4 flex items-center gap-1 font-openSans text-[14px] font-bold leading-[18px] text-ti_dark_grey">
            <span>Select your method</span>
          </div>
        </div> */}

        <div className="flex flex-col gap-[10px]">
          <div
            onClick={() => handleModeSelect("vin")}
            className={`flex w-full cursor-pointer  h-[250px] flex-col items-center justify-center rounded-[16px] border border-[#DFDFDF] p-[20px] ${compatibility === "vin" ? "bg-[#2D65F20F] border-[#B8CBFC]" : ""
              }`}
          >
            <Image src={Vin} alt="Test VIN" className="w-[150px] h-[100px]" />
            <h4 className="mt-[32px] text-center font-openSans text-[18px] font-semibold text-ti_black">
              Test by VIN
            </h4>
            <h4 className="text-center font-openSans text-[14px] leading-[155%] text-[#7D7D7D]">
              Use your vehicles’ VIN
            </h4>
          </div>
          <div
            onClick={() => handleModeSelect("vehicle")}
            className={`flex w-full max-h-[300px] min-[230px] h-full cursor-pointer flex-col items-center justify-center rounded-[16px] border border-[#DFDFDF] p-[20px] ${compatibility === "vehicle"
              ? "bg-[#2D65F20F] border-[#B8CBFC]"
              : ""
              }`}
          >
            <Image src={vehicle} alt="Test by vehicle" className="w-[150px] h-[100px]" />
            <h4 className="mt-[32px] text-center font-openSans text-[18px] font-semibold text-ti_black">
              Test by vehicle models
            </h4>
            <h4 className="text-center font-openSans text-[14px] leading-[155%] text-[#7D7D7D]">
              Go through our compatible list
            </h4>
          </div>
        </div>
      </div>

      {/* Fixed Footer */}
      <div className="mt-[40px] flex flex-none flex-col-reverse items-center gap-4 lg:flex-row">
        <button
          onClick={handleNext}
          className={`w-full rounded-md px-[14px] py-[10px] font-openSans text-white ${compatibility ? "bg-[#2D65F2]" : "bg-[#2D65F2]/50"
            }`}
          disabled={!compatibility || disabled}
        >
          Next
        </button>
      </div>
    </main>
  );
};

export default Compatibility;
