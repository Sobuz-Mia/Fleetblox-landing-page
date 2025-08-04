"use client";

import Loader from "@/app/(gettingStarted)/components/Loader";
import dynamic from "next/dynamic";

export const AutoDealershipsDynamic = dynamic(
  () => import("./auto-dealerships/AutoDealership"),
  {
    ssr: false,
    loading: () => (
      <div className="loading-spinner w-full h-screen flex items-center justify-center">
        <Loader />
      </div>
    ),
  }
);

export const CarRentalProvidersDynamic = dynamic(
  () => import("./car-rental-providers/CarRentalProviders"),
  {
    ssr: false,
    loading: () => (
      <div className="loading-spinner w-full h-screen flex items-center justify-center">
        <Loader />
      </div>
    ),
  }
);

export const EMobilityServicesDynamic = dynamic(
  () => import("./e-mobility-services/EMobilityServices"),
  {
    ssr: false,
    loading: () => (
      <div className="loading-spinner w-full h-screen flex items-center justify-center">
        <Loader />
      </div>
    ),
  }
);

export const FleetManagementDynamic = dynamic(
  () => import("./fleet-management/FleetManagement"),
  {
    ssr: false,
    loading: () => (
      <div className="loading-spinner w-full h-screen flex items-center justify-center">
        <Loader />
      </div>
    ),
  }
);
