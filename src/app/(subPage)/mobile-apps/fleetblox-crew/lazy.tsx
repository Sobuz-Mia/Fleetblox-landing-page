"use client";

import Loader from "@/app/(gettingStarted)/components/Loader";
import dynamic from "next/dynamic";

export const EMobilityServicesDynamic = dynamic(
  () => import("./EMobilityServices"),
  {
    ssr: false,
    loading: () => (
      <div className="loading-spinner w-full h-screen flex items-center justify-center">
        <Loader />
      </div>
    ),
  }
);
