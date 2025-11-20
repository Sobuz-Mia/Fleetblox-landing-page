"use client"; // ← Required for useEffect & axios in Next.js App Router

import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./../../(gettingStarted)/components/Loader";

interface VehicleData {
  owner_name?: string;
  owner_address?: string;
  location?: string;
  driver_name?: string;
  driver_phone?: string;
  licenseplate?: string | null;
  make?: string;
  model: string;
  year: string;
  color: string;
}

interface DriverAndOwnerInfoProps {
  setStartedInspection: (value: boolean) => void;
  tripId: string;
  serialNo: string | number;
  startedInspection: boolean;
}

const DriverAndOwnerInfo = ({
  setStartedInspection,
  tripId,
  serialNo,
  startedInspection,
}: DriverAndOwnerInfoProps) => {
  const [data, setData] = useState<VehicleData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchInfo = async () => {
      if (!tripId || !serialNo) {
        setError("Missing tripId or serialNo");
        setLoading(false);
        return;
      }

      try {
        const url = `https://real-damage.fleetblox.com/api/vehicle_info?trip_id=${tripId}&serial_no=${serialNo}`;
        const response = await axios.get(url);

        if (response.data.status === "success") {
          setData(response.data.data);
        } else {
          setError("API returned unsuccessful status");
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || "Failed to load data");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchInfo();
  }, [tripId, serialNo]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 shadow-[0_2px_5px_0_rgba(0,0,0,0.05)] rounded-md bg-white p-5 mt-5">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 text-center p-5 bg-red-50 rounded-md">
        Error: {error}
      </div>
    );
  }

  return (
    <div>
      <div className="shadow-[0_2px_5px_0_rgba(0,0,0,0.05)] rounded-md bg-white p-5 mt-5">
        <div className="flex items-center gap-[10px]">
          <Image
            src="/images/inspection/vehicle-logo.svg"
            alt="brand logo"
            width={40}
            height={40}
          />
          <h2 className="text-[#303030] text-[20px] font-bold">
            {data?.make} {data?.model} ({data?.year})
          </h2>
        </div>

        <p className="text-[#999] text-[12px] font-normal leading-4 mt-5">
          Color:{" "}
          <span className="text-[#303030] font-semibold">{data?.color}</span>
        </p>
      </div>
      {!startedInspection && (
        <div>
          {/* ==================== Owner Info ==================== */}
          <div className="shadow-[0_2px_5px_0_rgba(0,0,0,0.05)] rounded-md bg-white p-5 mt-[10px]">
            <h2 className="text-[#6F6464] text-[14px] font-bold mb-[10px]">
              Owner info
            </h2>

            <div className="flex items-center gap-[10px]">
              <Image
                src="/images/inspection/user-icon.svg"
                alt="user icon"
                width={36}
                height={36}
                className="rounded-full"
              />
              <h2 className="text-[#303030] text-[12px] font-bold">
                {data?.owner_name || "N/A"}
              </h2>
            </div>

            <div className="mt-[5px] flex items-center gap-[10px]">
              <p className="text-[#999] text-[12px] font-normal leading-4 w-[101px]">
                Phone:
              </p>
              <span className="text-[#151515] text-[12px] font-normal">
                {/* API does not have owner_phone → use driver_phone as contact (common case) */}
                {data?.driver_phone || "N/A"}
              </span>
            </div>

            <div className="mt-[5px] flex items-center gap-[10px]">
              <p className="text-[#999] text-[12px] font-normal leading-4 w-[101px]">
                Address:
              </p>
              <span className="text-[#151515] text-[12px] font-normal">
                {/* Prefer location (full address) → fallback to owner_address */}
                {data?.owner_address || "N/A"}
              </span>
            </div>
          </div>

          {/* ==================== Driver Info ==================== */}
          <div className="shadow-[0_2px_5px_0_rgba(0,0,0,0.05)] rounded-md bg-white p-5 mt-[10px]">
            <h2 className="text-[#6F6464] text-[14px] font-bold mb-[10px]">
              Driver info
            </h2>

            <div className="mt-[5px] flex items-center gap-[10px]">
              <p className="text-[#999] text-[12px] font-normal leading-4 w-[101px]">
                Name:
              </p>
              <span className="text-[#151515] text-[12px] font-normal">
                {data?.driver_name || "N/A"}
              </span>
            </div>

            <div className="mt-[5px] flex items-center gap-[10px]">
              <p className="text-[#999] text-[12px] font-normal leading-4 w-[101px]">
                Phone:
              </p>
              <span className="text-[#151515] text-[12px] font-normal">
                {data?.driver_phone || "N/A"}
              </span>
            </div>

            <div className="mt-[5px] flex items-center gap-[10px]">
              <p className="text-[#999] text-[12px] font-normal leading-4 w-[101px]">
                License number:
              </p>
              <span className="text-[#151515] text-[12px] font-normal">
                {data?.licenseplate || "N/A"}
              </span>
            </div>
          </div>

          <button
            onClick={() => setStartedInspection(true)}
            className="submit-button w-full mt-5"
          >
            Start inspection
          </button>
        </div>
      )}
    </div>
  );
};

export default DriverAndOwnerInfo;
