"use client";

import Loader from "@/app/(gettingStarted)/components/Loader";
import { message, Modal } from "antd";
import axios from "axios";
import { useState } from "react";

const TripAuditSection = () => {
  const [openTripAuditModal, setOpenTripAuditModal] = useState(false);
  const [tripId, setTripId] = useState("");
  const [loading, setLoading] = useState(false);
  const [inspectionData, setInspectionData] = useState<{
    // Hypothetical shape; adjust to your API response
    departureLink?: string;
    returnLink?: string;
    purchasedDate?: string;
  }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tripId.trim()) {
      // Extra check after trim
      message.error("Please enter a valid Trip ID.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `https://real-damage.fleetblox.com/api/create_inspection_links/${tripId}`
      );
      // Assuming API returns data; update state for modal
      setInspectionData({
        departureLink:
          res.data.inspection_urls[0] ||
          "https://example.invalid/trip-id-placeholder",
        returnLink:
          res.data.inspection_urls[1] ||
          "https://example.invalid/trip-id-placeholder",
        purchasedDate: res.data.purchasedDate || "15 Oct, 2025",
      });
      setOpenTripAuditModal(true);
      setTripId("");
    } catch (error) {
      console.error(error);
      message.error("Failed to fetch inspection details. Please try again.");
      // Optionally, don't open modal on error
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="py-5">
        <form
          onSubmit={handleSubmit}
          className="space-y-6 max-w-[780px] mx-auto w-full"
        >
          <div className="flex items-center flex-col md:flex-row gap-5 ">
            <div className="relative w-full">
              <input
                type="text"
                id="tripId"
                value={tripId} // Bind to state
                onChange={(e) => setTripId(e.target.value.trim())}
                className="w-full px-4 py-3 border border-[#DFDFDF] rounded-lg  placeholder-gray-400 outline-[#DFDFDF] peer"
                required
              />
              <label
                htmlFor="tripId"
                className="bg-white absolute left-2 bottom-3 peer-focus:text-[#0336BC] peer-focus:-translate-y-6 transition-all text-[16px] text-[#7D7D7D] font-openSans leading-6 "
              >
                Enter your Trip ID
              </label>
            </div>
            <button
              type="submit"
              disabled={loading}
              className=" bg-blue-600 w-full md:w-auto  text-white font-semibold py-3 px-4 rounded-md transition-all duration-200  "
            >
              {loading ? "Loading..." : "Continue"}
            </button>
          </div>
        </form>

        <p className="text-[#7D7D7D] text-[14px] md:text-[16px] leading-6 text-center mt-5 font-semibold font-openSans">
          Please enter your Trip ID received after purchasing the trip audit to
          access and manage your vehicle inspection workflow and monitoring
        </p>
      </div>
      <Modal
        open={openTripAuditModal}
        onCancel={() => setOpenTripAuditModal(false)}
        footer={null}
        centered
        width={1200}
        closeIcon={false}
        className="mt-20"
        // className="shadow-[0_4px_12px_0_rgba(0,0,0,0.14)]"
      >
        {loading ? (
          <div className="h-[calc(100vh-200px)] flex items-center justify-center">
            <Loader />
          </div>
        ) : (
          <div className="h-[calc(100vh-200px)] flex flex-col">
            <div className="flex justify-end ">
              <button
                onClick={() => setOpenTripAuditModal(false)}
                className="flex  items-center gap-[2px] justify-center"
              >
                <span className="text-[12px] text-[#999] font-semibold">
                  close
                </span>{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M8.0002 8.66136L4.63993 12.0216C4.54763 12.1139 4.4378 12.1598 4.31045 12.1591C4.1831 12.1585 4.07221 12.1109 3.97776 12.0165C3.88674 11.922 3.84209 11.8131 3.8438 11.6896C3.84551 11.5661 3.89188 11.4588 3.9829 11.3678L7.33803 7.99919L3.9829 4.63059C3.89614 4.54385 3.8517 4.43765 3.84956 4.31201C3.84743 4.18637 3.89188 4.07633 3.9829 3.98189C4.07392 3.88745 4.18204 3.83883 4.30725 3.83606C4.43246 3.83328 4.54335 3.87911 4.63993 3.97356L8.0002 7.33702L11.3637 3.97356C11.4538 3.88339 11.5626 3.83862 11.6899 3.83926C11.8173 3.8399 11.9293 3.88745 12.0258 3.98189C12.1147 4.07633 12.1583 4.18531 12.1566 4.30881C12.1549 4.43231 12.1085 4.53957 12.0175 4.63059L8.66236 7.99919L12.0175 11.3678C12.1043 11.4545 12.1487 11.5607 12.1508 11.6864C12.153 11.812 12.1085 11.922 12.0175 12.0165C11.9265 12.1109 11.8184 12.1595 11.6931 12.1623C11.5679 12.1651 11.4581 12.1182 11.3637 12.0216L8.0002 8.66136Z"
                    fill="#999999"
                  />
                </svg>
              </button>
            </div>

            <div className="mt-[10px] flex justify-between items-end">
              <div>
                <h3 className="text-[22px] text-[#303030] font-bold font-openSans">
                  Trip Audit
                </h3>
                <p className="text-[14px] text-[#999] font-normal font-openSans leading-5">
                  Your Inspection control panel
                </p>
              </div>
              <p className="text-[12px] text-[#999] font-openSans">
                Purchased:
                <span className="text-[14px] text-[#333] font-openSans font-semibold leading-5">
                  {" "}
                  15 Oct, 2025
                </span>
              </p>
            </div>
            <h2 className="pt-8 pb-[30px] text-[14px] text-[#303030] font-bold">
              Inspection details
            </h2>
            <div className="border border-[#DFDFDF] rounded-md p-4">
              <h2 className="text-[14px] text-[#303030] font-bold">
                Departure inspection workflow
              </h2>
              <div className="flex justify-between items-center my-[9px]">
                <p className="text-[#2D65F2] text-[12px] font-medium leading-4 underline">
                  {inspectionData?.departureLink}
                </p>
                <div className="flex items-center gap-[10px] justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M8.95788 17.5012C8.48393 17.5012 8.08098 17.3352 7.74905 17.0033C7.41713 16.6713 7.25118 16.2684 7.25118 15.7944V4.40985C7.25118 3.9359 7.41713 3.53296 7.74905 3.20103C8.08098 2.86909 8.48393 2.70312 8.95788 2.70312H17.3424C17.8164 2.70312 18.2194 2.86909 18.5513 3.20103C18.8832 3.53296 19.0492 3.9359 19.0492 4.40985V15.7944C19.0492 16.2684 18.8832 16.6713 18.5513 17.0033C18.2194 17.3352 17.8164 17.5012 17.3424 17.5012H8.95788ZM5.65985 20.7992C5.18588 20.7992 4.78294 20.6332 4.45102 20.3013C4.11909 19.9694 3.95312 19.5664 3.95312 19.0925V7.006C3.95312 6.81497 4.02155 6.65103 4.1584 6.51418C4.29527 6.37733 4.46081 6.3089 4.65503 6.3089C4.84604 6.3089 5.00998 6.37733 5.14685 6.51418C5.2837 6.65103 5.35213 6.81497 5.35213 7.006V19.0925C5.35213 19.1694 5.38418 19.2399 5.4483 19.304C5.5124 19.3681 5.58292 19.4002 5.65985 19.4002H14.7463C14.9373 19.4002 15.1013 19.4686 15.2381 19.6055C15.375 19.7423 15.4434 19.9063 15.4434 20.0973C15.4434 20.2915 15.375 20.4571 15.2381 20.5939C15.1013 20.7307 14.9373 20.7992 14.7463 20.7992H5.65985Z"
                      fill="#7D7D7D"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M17.9312 21.5669C17.1889 21.5669 16.559 21.3075 16.0414 20.7887C15.5237 20.2698 15.2649 19.6399 15.2649 18.8987C15.2649 18.7738 15.2748 18.6447 15.2947 18.5115C15.3146 18.3783 15.3444 18.2555 15.3842 18.1431L8.00815 13.8294C7.75238 14.0973 7.45931 14.304 7.12892 14.4496C6.79852 14.5951 6.44858 14.6678 6.0791 14.6678C5.33138 14.6678 4.69898 14.4071 4.1819 13.8857C3.6648 13.3642 3.40625 12.731 3.40625 11.9861C3.40625 11.2481 3.66585 10.6208 4.18505 10.1043C4.70425 9.58767 5.3347 9.32938 6.0764 9.32938C6.45002 9.32938 6.80272 9.40006 7.1345 9.54141C7.4663 9.68276 7.75752 9.88484 8.00815 10.1477L15.3842 5.83413C15.3444 5.72173 15.3146 5.59892 15.2947 5.46571C15.2748 5.33249 15.2649 5.20372 15.2649 5.07938C15.2649 4.33793 15.5247 3.7077 16.0443 3.18868C16.5639 2.66967 17.1948 2.41016 17.9371 2.41016C18.6793 2.41016 19.3093 2.66845 19.8269 3.18503C20.3445 3.70161 20.6034 4.3289 20.6034 5.06688C20.6034 5.8118 20.3437 6.44498 19.8245 6.96643C19.3053 7.48787 18.6749 7.74858 17.9332 7.74858C17.5625 7.74858 17.2118 7.67582 16.8811 7.53031C16.5504 7.38481 16.2572 7.17808 16.0014 6.91013L8.62545 11.2207C8.6652 11.3351 8.69502 11.462 8.7149 11.6013C8.73478 11.7407 8.74473 11.8723 8.74473 11.9962C8.74473 12.1201 8.73478 12.2492 8.7149 12.3833C8.69502 12.5174 8.6652 12.6406 8.62545 12.753L16.0014 17.0669C16.2572 16.799 16.5503 16.5922 16.8807 16.4467C17.2111 16.3012 17.561 16.2284 17.9305 16.2284C18.6782 16.2284 19.3106 16.4886 19.8277 17.0089C20.3448 17.5292 20.6034 18.1609 20.6034 18.9042C20.6034 19.6461 20.3435 20.2754 19.8239 20.792C19.3044 21.3086 18.6734 21.5669 17.9312 21.5669Z"
                      fill="#7D7D7D"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-[#999] text-[12px] leading-4">
                Share this link with the trip driver or any authorized person so
                they can perform the inspection using a phone or other
                camera-enabled device.
              </p>
            </div>
            <div className="border border-[#DFDFDF] rounded-md p-4 mt-5">
              <h2 className="text-[14px] text-[#303030] font-bold">
                Return inspection workflow
              </h2>
              {/* <div className="flex justify-between items-center my-[9px]">
              <p className="text-[#2D65F2] text-[12px] font-medium leading-4">
                https://example.invalid/trip-id-placeholder
              </p>
              <div className="flex items-center gap-[10px] justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M8.95788 17.5012C8.48393 17.5012 8.08098 17.3352 7.74905 17.0033C7.41713 16.6713 7.25118 16.2684 7.25118 15.7944V4.40985C7.25118 3.9359 7.41713 3.53296 7.74905 3.20103C8.08098 2.86909 8.48393 2.70312 8.95788 2.70312H17.3424C17.8164 2.70312 18.2194 2.86909 18.5513 3.20103C18.8832 3.53296 19.0492 3.9359 19.0492 4.40985V15.7944C19.0492 16.2684 18.8832 16.6713 18.5513 17.0033C18.2194 17.3352 17.8164 17.5012 17.3424 17.5012H8.95788ZM5.65985 20.7992C5.18588 20.7992 4.78294 20.6332 4.45102 20.3013C4.11909 19.9694 3.95312 19.5664 3.95312 19.0925V7.006C3.95312 6.81497 4.02155 6.65103 4.1584 6.51418C4.29527 6.37733 4.46081 6.3089 4.65503 6.3089C4.84604 6.3089 5.00998 6.37733 5.14685 6.51418C5.2837 6.65103 5.35213 6.81497 5.35213 7.006V19.0925C5.35213 19.1694 5.38418 19.2399 5.4483 19.304C5.5124 19.3681 5.58292 19.4002 5.65985 19.4002H14.7463C14.9373 19.4002 15.1013 19.4686 15.2381 19.6055C15.375 19.7423 15.4434 19.9063 15.4434 20.0973C15.4434 20.2915 15.375 20.4571 15.2381 20.5939C15.1013 20.7307 14.9373 20.7992 14.7463 20.7992H5.65985Z"
                    fill="#7D7D7D"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M17.9312 21.5669C17.1889 21.5669 16.559 21.3075 16.0414 20.7887C15.5237 20.2698 15.2649 19.6399 15.2649 18.8987C15.2649 18.7738 15.2748 18.6447 15.2947 18.5115C15.3146 18.3783 15.3444 18.2555 15.3842 18.1431L8.00815 13.8294C7.75238 14.0973 7.45931 14.304 7.12892 14.4496C6.79852 14.5951 6.44858 14.6678 6.0791 14.6678C5.33138 14.6678 4.69898 14.4071 4.1819 13.8857C3.6648 13.3642 3.40625 12.731 3.40625 11.9861C3.40625 11.2481 3.66585 10.6208 4.18505 10.1043C4.70425 9.58767 5.3347 9.32938 6.0764 9.32938C6.45002 9.32938 6.80272 9.40006 7.1345 9.54141C7.4663 9.68276 7.75752 9.88484 8.00815 10.1477L15.3842 5.83413C15.3444 5.72173 15.3146 5.59892 15.2947 5.46571C15.2748 5.33249 15.2649 5.20372 15.2649 5.07938C15.2649 4.33793 15.5247 3.7077 16.0443 3.18868C16.5639 2.66967 17.1948 2.41016 17.9371 2.41016C18.6793 2.41016 19.3093 2.66845 19.8269 3.18503C20.3445 3.70161 20.6034 4.3289 20.6034 5.06688C20.6034 5.8118 20.3437 6.44498 19.8245 6.96643C19.3053 7.48787 18.6749 7.74858 17.9332 7.74858C17.5625 7.74858 17.2118 7.67582 16.8811 7.53031C16.5504 7.38481 16.2572 7.17808 16.0014 6.91013L8.62545 11.2207C8.6652 11.3351 8.69502 11.462 8.7149 11.6013C8.73478 11.7407 8.74473 11.8723 8.74473 11.9962C8.74473 12.1201 8.73478 12.2492 8.7149 12.3833C8.69502 12.5174 8.6652 12.6406 8.62545 12.753L16.0014 17.0669C16.2572 16.799 16.5503 16.5922 16.8807 16.4467C17.2111 16.3012 17.561 16.2284 17.9305 16.2284C18.6782 16.2284 19.3106 16.4886 19.8277 17.0089C20.3448 17.5292 20.6034 18.1609 20.6034 18.9042C20.6034 19.6461 20.3435 20.2754 19.8239 20.792C19.3044 21.3086 18.6734 21.5669 17.9312 21.5669Z"
                    fill="#7D7D7D"
                  />
                </svg>
              </div>
            </div> */}
              <p className="text-[#999] text-[12px] leading-4">
                Share this link with the trip driver or any authorized person so
                they can perform the inspection using a phone or other
                camera-enabled device.
              </p>
            </div>
            {/* <div className="mt-5">
            <h2 className="text-[14px] text-[#303030] font-bold mb-2">
              Inspection progress
            </h2>
            <Progress percent={20} />
            <div className="relative ml-4 mt-4">
              <div className="absolute left-[5px] top-0 bottom-0 w-[2px] bg-red-700"></div>
              <div className="relative mb-6">
                <div className="absolute left-[-20px] top-0 w-3 h-3 rounded-full bg-blue-600"></div>
                <p className="text-[14px] text-[#303030] font-semibold">
                  Capture Vehicle VIN & License plate
                </p>
                <p className="text-[12px] text-[#999]">12 Jan 2023 12:00 PM</p>
              </div>
              <div className="relative mb-6">
                <div className="absolute left-[-20px] top-0 w-3 h-3 rounded-full bg-blue-600"></div>
                <p className="text-[14px] text-[#303030] font-semibold">
                  Capture odometer
                </p>
                <p className="text-[12px] text-[#999]">12 Jan 2023 12:00 PM</p>
              </div>
              <div className="relative mb-6">
                <div className="absolute left-[-20px] top-0 w-3 h-3 rounded-full bg-gray-300"></div>
                <p className="text-[14px] text-[#303030] font-semibold">
                  Capture vehicle Images & damages
                </p>
                <p className="text-[12px] text-[#999]">12 Jan 2023 12:00 PM</p>
              </div>
              <div className="relative">
                <div className="absolute left-[-20px] top-0 w-3 h-3 rounded-full bg-gray-300"></div>
                <p className="text-[14px] text-[#303030] font-semibold">
                  Review and submit report
                </p>
                <p className="text-[12px] text-[#999]">12 Jan 2023 12:00 PM</p>
              </div>
            </div>
          </div> */}
            <p className="mt-auto text-right text-[#999] text-[12px] leading-4">
              This Trip Audit panel will be accessible for 30 days with your
              Trip ID to view or download reports.
            </p>
          </div>
        )}
      </Modal>
    </>
  );
};

export default TripAuditSection;
