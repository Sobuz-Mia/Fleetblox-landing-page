"use client";
import { message, Modal, Progress } from "antd";
import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import LoadingButtonAnimation from "./../../../components/ui/shared/ButtonLoadingAnimation";
import moment from "moment";
import StepperDotIcon from "../icons/StepperDotIcon";
import SharedIcon from "../icons/SharedIcon";
import LinkCopyIcon from "../icons/LinkCopyIcon";
type ProgressData = {
  in_progress?: boolean;
  percentage?: number;
  status?: Record<string, boolean>;
  start_times?: Record<string, string | null | undefined>;
};
const TripAuditSection = () => {
  const [openTripAuditModal, setOpenTripAuditModal] = useState(false);
  const [tripId, setTripId] = useState("");
  const [loading, setLoading] = useState(false);
  const [inspectionData, setInspectionData] = useState<{
    departureLink?: string;
    returnLink?: string;
    purchasedDate?: string;
    trip_id?: string;
  }>({});
  const [departureProgress, setDepartureProgress] =
    useState<ProgressData | null>(null);
  const [returnProgress, setReturnProgress] = useState<ProgressData | null>(
    null
  );

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
      setInspectionData({
        departureLink: res.data.inspection_urls[0] || "",
        returnLink: res.data.inspection_urls[1] || "",
        purchasedDate: res.data.purchased_at || "",
        trip_id: res?.data?.trip_id || "",
      });
      setOpenTripAuditModal(true);
      setTripId("");
    } catch (error) {
      setTripId("");
      setLoading(false);
      const msg =
        axios.isAxiosError(error) && error.response
          ? error.response.data?.error || "Something went wrong"
          : "Network error. Please try again.";
      toast.error(msg);
      message.error(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (openTripAuditModal && inspectionData.trip_id) {
      const fetchProgress = async () => {
        try {
          if (inspectionData?.departureLink) {
            const depRes = await axios.get(
              `https://real-damage.fleetblox.com/api/get_inspection_progress?trip_id=${inspectionData.trip_id}&serial_no=1`
            );
            setDepartureProgress(depRes?.data as ProgressData);
          } else if (inspectionData?.returnLink) {
            const retRes = await axios.get(
              `https://real-damage.fleetblox.com/api/get_inspection_progress?trip_id=${inspectionData.trip_id}&serial_no=2`
            );
            setReturnProgress(retRes?.data as ProgressData);
          }
        } catch (error) {
          const msg =
            axios.isAxiosError(error) && error.response
              ? error.response.data?.error ||
                "Failed to fetch inspection progress"
              : "Network error. Please try again.";
          toast.error(msg);
        }
      };
      fetchProgress();
    }
  }, [
    openTripAuditModal,
    inspectionData.trip_id,
    inspectionData?.departureLink,
    inspectionData?.returnLink,
  ]);
  const steps = [
    {
      title: "Capture Vehicle VIN & License plate",
      key: "vin_licenseplate",
    },
    { title: "Capture odometer", key: "odometer" },
    {
      title: "Capture vehicle Images & damages",
      key: "vehicleparts_vehicledamages",
    },
    { title: "Review and submit report", key: "submit" },
  ];

  const renderProgressSection = (
    progressData: ProgressData | null,
    title: string
  ) => {
    if (!progressData?.in_progress) return null;

    return (
      <div className="mt-5">
        <h2 className="text-[14px] text-[#303030] font-bold mb-2">
          {title} progress
        </h2>
        <Progress percent={progressData.percentage} />
        <div className="mt-5">
          {steps?.map((item, index: number) => {
            const isCompleted = !!progressData?.status?.[item.key];
            return (
              <div
                key={index}
                className="flex justify-start items-start flex-col "
              >
                <div className="flex justify-start  items-start gap-x-[10px]">
                  <div
                    className={`w-[10px] h-[10px] ${
                      isCompleted ? "bg-[#2D65F2]" : "bg-[#DDD]"
                    } relative top-[6px] rounded-full`}
                  ></div>
                  <div className="">
                    <p
                      className={`text-[14px] text-[#303030] font-semibold ${
                        isCompleted ? "text-[#303030]" : "text-[#6F6464]"
                      } `}
                    >
                      {item?.title}
                    </p>
                    <p className="text-[12px] text-[#999]">
                      {progressData?.start_times?.[item.key]
                        ? moment(progressData?.start_times?.[item.key])
                            .local()
                            .format("DD MMM, YYYY")
                        : "Not started"}
                    </p>
                  </div>
                </div>
                <div className="ml-1 mt-1 mb-[10px]">
                  {index === steps?.length - 1 ? null : (
                    <StepperDotIcon color={isCompleted} />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
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
              className=" bg-blue-600 w-full md:w-auto  text-white font-semibold py-3 px-4 rounded-md "
            >
              {loading ? <LoadingButtonAnimation /> : "Continue"}
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
      >
        <main className="h-[80vh] flex flex-col flex-grow">
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
                {moment(inspectionData?.purchasedDate).format("DD MMM, YYYY")}
              </span>
            </p>
          </div>
          <h2 className="pt-8 pb-[30px] text-[14px] text-[#303030] font-bold">
            Inspection details
          </h2>
          <div className="overflow-y-auto ">
            <div className="border border-[#DFDFDF] rounded-md p-4">
              <h2 className="text-[14px] text-[#303030] font-bold">
                Departure inspection workflow
              </h2>
              <div className="flex justify-between items-center my-[9px]">
                <p className="text-[#2D65F2] text-[12px] font-medium leading-4 underline">
                  {inspectionData?.departureLink}
                </p>
                {inspectionData?.departureLink && (
                  <div className="flex items-center gap-[10px] justify-center">
                    <LinkCopyIcon />
                    <SharedIcon />
                  </div>
                )}
              </div>
              {!departureProgress?.in_progress ? (
                <p className="text-[#999] text-[12px] leading-4">
                  Share this link with the trip driver or any authorized person
                  so they can perform the inspection using a phone or other
                  camera-enabled device.
                </p>
              ) : (
                renderProgressSection(departureProgress, "Inspection")
              )}
            </div>
            <div className="border border-[#DFDFDF] rounded-md p-4 mt-5">
              <h2 className="text-[14px] text-[#303030] font-bold">
                Return inspection workflow
              </h2>
              <div className="flex justify-between items-center my-[9px]">
                <p className="text-[#2D65F2] text-[12px] font-medium leading-4 underline">
                  {inspectionData?.returnLink}
                </p>
                {inspectionData?.returnLink && (
                  <div className="flex items-center gap-[10px] justify-center">
                    <LinkCopyIcon />
                    <SharedIcon />
                  </div>
                )}
              </div>
              <p className="text-[#999] text-[12px] leading-4">
                Share this link with the trip driver or any authorized person so
                they can perform the inspection using a phone or other
                camera-enabled device.
              </p>
              {renderProgressSection(returnProgress, "Inspection")}
            </div>
          </div>
          <p className="mt-auto text-right text-[#999] text-[12px] leading-4">
            This Trip Audit panel will be accessible for 30 days with your Trip
            ID to view or download reports.
          </p>
        </main>
      </Modal>
    </>
  );
};

export default TripAuditSection;
