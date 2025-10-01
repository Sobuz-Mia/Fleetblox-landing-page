"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */

import { TStaterPlanData } from "@/types/types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import RightArrowIcon from "../icons/RightArrowIcon";
import axios from "axios";
import config from "@/utils/config";
type TStarterFleetActionButtonProps = {
  isMobile?: boolean;
  text?: string;
};
const StarterFleetActionButton = ({
  isMobile,
  text = "Get Started",
}: TStarterFleetActionButtonProps) => {
  const [starterPlan, setStarterPlan] = useState<TStaterPlanData[]>([]);
  const router = useRouter();
  const baseUrl = config.api.baseUrl;

  const [staterPlanLoading, setStarterPlanLoading] = useState(true);
  const [staterPlanError, setStarterPlanError] = useState<string | null>(null);
  useEffect(() => {
    const fetchStaterPlanData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/api/subscription/plan/starter`
        );
        setStarterPlan(response.data.data);
      } catch (err) {
        if (err instanceof Error) {
          setStarterPlanError(err.message);
        } else {
          setStarterPlanError("Unexpected error!! Please try again later.");
        }
      } finally {
        setStarterPlanLoading(false);
      }
    };

    fetchStaterPlanData();
  }, []);
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
          className=" py-3 rounded-md w-full text-center bg-[#2D65F2] font-openSans text-[14px] font-bold  flex justify-center lg:hidden"
        >
          {text}
        </button>
      ) : (
        <button
          aria-label="Get started with Starter Fleet"
          onClick={() => {
            handleStarterPlan(starterPlan[0]);
          }}
          className="hidden transition-all bg-[#2D65F2] hover:bg-[#0336BC] font-openSans text-white-primary text-white duration-300 hover:w-[144.16px] w-[122.16px] lg:flex items-center px-4 py-3 text-base font-bold rounded-md group"
        >
          <div className="z-20 whitespace-nowrap">{text}</div>
          <div className="z-10 transform transition-transform opacity-0 group-hover:opacity-100 -translate-x-4 duration-300 group-hover:translate-x-0">
            <RightArrowIcon />
          </div>
        </button>
      )}
    </>
  );
};

export default StarterFleetActionButton;
