"use client";

import Loader from "@/app/(gettingStarted)/components/Loader";
import dynamic from "next/dynamic";

export const EagleEyeFleetDynamic = dynamic(
  () => import("./eagle-eye-fleet/components/EagleEyeFleet"),
  {
    ssr: false,
    loading: () => (
      <div className="loading-spinner w-full h-screen flex items-center justify-center">
        <Loader />
      </div>
    ),
  }
);

export const StarterFleetDynamic = dynamic(
  () => import("./starter-fleet-plan/StarterFleetPage"),
  {
    ssr: false,
    loading: () => (
      <div className="loading-spinner w-full h-screen flex items-center justify-center">
        <Loader />
      </div>
    ),
  }
);
