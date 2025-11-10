"use client";
import Image from "next/image";
import FleetBloxIcon from "./icons/FleetBloxIcon";
import { useState } from "react";
import { useRouter } from "next/navigation";

const InspectionPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleStartInspection = () => {
    setShowModal(true);
    setErrorMessage("");
  };

  const handleTurnOn = () => {
    router.push("/inspection/steps");
    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(
    //     (position) => {
    //       // Success: Location accessed, redirect to the next page
    //       // Replace '/inspection' with your actual next page route
    //       router.push("/inspection");
    //       setShowModal(false);
    //     },
    //     (error) => {
    //       // Handle errors
    //       if (error.code === error.PERMISSION_DENIED) {
    //         setErrorMessage(
    //           "Location permission denied. Please enable it in your browser settings."
    //         );
    //       } else if (error.code === error.POSITION_UNAVAILABLE) {
    //         setErrorMessage(
    //           "Location information is unavailable. Please ensure location services are enabled on your device."
    //         );
    //       } else if (error.code === error.TIMEOUT) {
    //         setErrorMessage("The request to get location timed out.");
    //       } else {
    //         setErrorMessage("An unknown error occurred.");
    //       }
    //     }
    //   );
    // } else {
    //   setErrorMessage("Geolocation is not supported by this browser.");
    // }
  };

  const handleCancel = () => {
    setShowModal(false);
    setErrorMessage("");
  };

  return (
    <div className="bg-[#F5F9FC] h-screen p-5">
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
          <p className="text-[#999] text-[12px] font-normal leading-4 mt-5 ">
            Color:{" "}
            <span className="text-[#303030] text-[12px] font-semibold">
              Cherry red
            </span>
          </p>
        </div>
        <div className="shadow-[0_2px_5px_0_rgba(0,0,0,0.05)] rounded-md bg-white p-5 ">
          <p className="text-[14px] font-bold text-[#6F6464] mb-[10px]">
            Owner info
          </p>
          <div className="flex items-center gap-[10px]">
            <Image
              src="/images/inspection/user-icon.svg"
              alt="brand logo"
              width={40}
              height={40}
              // fill
            />
            <h2 className="text-[#303030] text-[12px] font-bold">Danish Ali</h2>
          </div>
          <div className="flex gap-[10px] items-center mt-[5px]">
            <p className="text-[#999] text-[12px] font-normal leading-4 min-w-[95px]">
              Phone:
            </p>
            <p className="text-[#303030] text-[12px] font-semibold">
              (+880)555-011458
            </p>
          </div>
          <div className="flex gap-[10px] items-center mt-[5px]">
            <p className="text-[#999] text-[12px] font-normal leading-4 min-w-[95px]">
              Address:
            </p>
            <p className="text-[#303030] text-[12px] font-semibold">
              jatrabari,dhaka, Bangladesh
            </p>
          </div>
        </div>
        <div className="shadow-[0_2px_5px_0_rgba(0,0,0,0.05)] rounded-md bg-white p-5 ">
          <p className="text-[14px] font-bold text-[#6F6464] mb-[10px]">
            Driver info
          </p>
          <div className="flex gap-[10px] items-center mt-[5px]">
            <p className="text-[#999] text-[12px] font-normal leading-4 min-w-[95px]">
              Name:
            </p>
            <p className="text-[#303030] text-[12px] font-semibold">
              Habib Rahman
            </p>
          </div>
          <div className="flex gap-[10px] items-center mt-[5px]">
            <p className="text-[#999] text-[12px] font-normal leading-4 min-w-[95px]">
              Phone:
            </p>
            <p className="text-[#303030] text-[12px] font-semibold">
              (+880)555-011458
            </p>
          </div>
          <div className="flex gap-[10px] items-center mt-[5px]">
            <p className="text-[#999] text-[12px] font-normal leading-4 min-w-[95px]">
              License number:
            </p>
            <p className="text-[#303030] text-[12px] font-semibold">
              02020-23151-2356
            </p>
          </div>
        </div>
      </div>
      <button
        className="submit-button w-full mt-5"
        onClick={handleStartInspection}
      >
        Start inspection
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-md p-5 w-4/5 max-w-sm shadow-[0_2px_5px_0_rgba(0,0,0,0.05)] ">
            <h3 className="text-[#303030] text-[14px] font-bold mb-5">
              Please enable phone location
            </h3>
            <p className="text-[#6F6464] text-[12px] font-normal mb-5 leading-4">
              Please turn on your location services before starting the
              inspection. Your current location helps us identify the position.
            </p>
            {errorMessage && (
              <p className="text-red-500 text-[12px] font-medium mb-4">
                {errorMessage}
              </p>
            )}
            <div className="flex justify-evenly h-[38px]">
              <button
                className="text-[#999] text-[12px] font-semibold"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <div className="border-r border-[#DDD]"></div>
              <button
                className="text-[#6F6464] text-[12px] font-semibold"
                onClick={handleTurnOn}
              >
                Turn on
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InspectionPage;
