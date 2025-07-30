"use client";
import { TStaterPlanData } from "@/types/types";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import RightArrowIcon from "../icons/RightArrowIcon";
type TStarterFleetActionButtonProps = {
  isMobile?: boolean;
};
const StarterFleetActionButton = ({
  isMobile,
}: TStarterFleetActionButtonProps) => {
  const [starterPlan] = useState<TStaterPlanData[]>([]);
  const router = useRouter();
  const handleStarterPlan = async (starterPlan: TStaterPlanData) => {
    const planData = {
      price: starterPlan?.price,
      fleet: starterPlan?.name || "Starter Fleet",
      slot: starterPlan?.slotMinimum || 10,
      annually: false,
      id: starterPlan?.id, // Replace with actual ID from your backend
    };

    localStorage.setItem("selectedPlan", JSON.stringify(planData));
    router.push("/getting-started");
  };
  return (
    <>
      {isMobile ? (
        <button
          aria-label="Get started with Starter Fleet"
          onClick={() => {
            handleStarterPlan(starterPlan[0]);
          }}
          className="lg:hidden bg-[#2D65F2] hover:bg-[#0336BC] text-white w-full flex px-4 py-3 text-[14px] font-openSans font-bold rounded-md justify-center"
        >
          Start today
        </button>
      ) : (
        <button
          aria-label="Get started with Starter Fleet"
          onClick={() => {
            handleStarterPlan(starterPlan[0]);
          }}
          className="hidden transition-all bg-[#2D65F2] hover:bg-[#0336BC] font-openSans text-white-primary text-white duration-300 hover:w-[144.16px] w-[122.16px] lg:flex items-center px-4 py-3 text-base font-bold rounded-md group"
        >
          <div className="z-20 whitespace-nowrap">Start today</div>
          <div className="z-10 transform transition-transform opacity-0 group-hover:opacity-100 -translate-x-4 duration-300 group-hover:translate-x-0">
            <RightArrowIcon />
          </div>
        </button>
      )}
    </>
  );
};

export default StarterFleetActionButton;
