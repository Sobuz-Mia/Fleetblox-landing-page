"use client";
import { Divider, Modal, Image as AntImage, Spin } from "antd";
import { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import CrossIcon from "../icons/CrossIcon";
import DepartureInspectionIcon from "./../../inspection/view-report/icons/DepartureInspectionIcon";
import DownloadIcon from "../icons/DownloadIcon";
import Image from "next/image";
import VerifiedIcon from "../icons/VerifiedIcon";
import moment from "moment";
import LocationIcon from "./../../../components/icons/LocationIcon";
import OdometerIcon from "../icons/OdometerIcon";
import RecommendationIcon from "../icons/RecommendationIcon";
import UnorderListIcon from "../icons/UnorderListIcon";
import { getVehicleCondition, renderProgressSection } from "../utils/helper";
import CarDiagramSvg from "./CarDiagramSvg";
import InspectionTable from "./InspectionTable";
// import DollerIcon from "../icons/DollerIcon";
type ReturnInspectionReportProps = {
  tripId: string;
  serialNo: number;
};
const ReturnInspectionReport = ({
  tripId,
  serialNo,
}: ReturnInspectionReportProps) => {
  const [inspectionLog, setInspectionLog] = useState(false);
  const [openDepartureReportModal, setOpenDepartureReportModal] =
    useState(false);
  // get inspection log data
  const { data: inspectionLogData, isLoading: isLoadingInspectionLog } =
    useQuery({
      queryKey: ["inspection log", tripId],
      queryFn: async () => {
        const response = await axios.get(
          `https://dev-real-damage.fleetblox.com/api/get_inspection_progress?trip_id=${tripId}&serial_no=${serialNo}`,
        );
        return response?.data;
      },
      enabled: inspectionLog,
    });
  // get inspection report data
  const { data: inspectionReport, isLoading } = useQuery({
    queryKey: ["inspectionReport", tripId, serialNo],
    queryFn: async () => {
      const response = await axios.get(
        `https://dev-real-damage.fleetblox.com/api/get_inspection_report?trip_id=${tripId}&serial_no=${serialNo}`,
      );
      return response?.data?.data;
    },
    enabled: openDepartureReportModal,
  });
  // destructure inspection report data
  const {
    car_make,
    car_model,
    car_year,
    licenseplate,
    vin,
    report_type,
    driver_name,
    driving_license,
    odometer_reading,
    image_links,
    logo_url,
    damage_intensity,
    vehicledamages,
    location,
    ai_recommendations,
    submission_time,
    total_damage_count,
    total_missing_count,
    total_part_count,
    total_replacement_count,
    exterior_color_hex,
    overall_score,
  } = inspectionReport || {};
  // destructure image links
  const {
    front,
    left,
    licenseplate: licensePlateImage,
    odometer,
    rear,
    right,
    vin: vinImage,
  } = image_links || {};
  // make images list
  const imagesList = [
    {
      id: 1,
      src: right,
      alt: "rightSideImage",
    },
    {
      id: 2,
      src: front,
      alt: "frontSideImage",
    },
    {
      id: 3,
      src: left,
      alt: "leftSideImage",
    },
    {
      id: 4,
      src: rear,
      alt: "rearSideImage",
    },
    {
      id: 5,
      src: licensePlateImage,
      alt: "licensePlateImage",
    },
    {
      id: 6,
      src: odometer,
      alt: "odometerImage",
    },
    {
      id: 7,
      src: vinImage,
      alt: "doorVINStickerImage",
    },
  ];

  return (
    <div>
      <div className="flex items-center gap-[10px] mt-[15px]">
        <button className="py-2 px-3 border border-[#DFDFDF] rounded-md text-[#7D7D7D] text-[16px] font-bold font-openSans">
          Inspection log
        </button>
        <button
          onClick={() => setOpenDepartureReportModal(true)}
          disabled={isLoading}
          className="submit-button"
        >
          View report
        </button>
      </div>
      <Modal
        open={openDepartureReportModal}
        onCancel={() => setOpenDepartureReportModal(false)}
        footer={null}
        centered
        width={1200}
        closeIcon={false}
        className="mt-20"
      >
        <Spin spinning={isLoading} size="large" tip="Loading...">
          <main className=" flex flex-col grow bg-white ">
            <div className="flex justify-end ">
              <button
                onClick={() => setOpenDepartureReportModal(false)}
                className="flex  items-center gap-0.5 justify-center"
              >
                <span className="text-[12px] text-[#999] font-semibold">
                  close
                </span>{" "}
                <CrossIcon />
              </button>
            </div>

            <div className="mt-2.5 flex justify-between items-end">
              <div className="flex items-center gap-2.5">
                <div
                  className="p-2.5 rounded-full w-fit"
                  style={{ background: `rgb(45, 101, 242, 0.06)` }}
                >
                  <DepartureInspectionIcon />
                </div>
                <div>
                  <h3 className="text-[22px] text-[#303030] font-bold font-openSans">
                    <span className="capitalize">
                      {report_type ? report_type : ""}
                    </span>{" "}
                    inspection report
                  </h3>
                  <p className="text-[14px] text-[#999] font-normal font-openSans leading-5">
                    {exterior_color_hex ?? ""}
                  </p>
                </div>
              </div>
              <button className="border border-[#B8CBFC] rounded-md py-2 px-3.5 text-[14px] text-[#2D65F2] font-semibold font-openSans flex items-center gap-[5px]">
                <DownloadIcon />
                Download
              </button>
            </div>
            <div className="h-[72vh] overflow-y-auto">
              <div className="mt-[30px] mb-8 flex gap-2.5 items-center">
                <div className="w-12 h-11">
                  <Image
                    src={
                      logo_url
                        ? logo_url
                        : "/images/trip-audit/lamborgini-logo.png"
                    }
                    alt=" car logo"
                    width={48}
                    height={42}
                    className="w-full object-contain"
                  />
                </div>
                <div className=" ">
                  <h3 className="text-[#303030] text-[20px] font-semibold">
                    {car_make} {car_model} {car_year}
                  </h3>
                  <div className="flex space-x-2.5 items-center">
                    <p className="text-[#6F6464] text-[12px] font-medium leading-4">
                      VIN- {vin}
                    </p>
                    <div className="bg-[#999] w-px h-4 opacity-30"></div>
                    <p className="text-[#6F6464] text-[12px] font-medium leading-4">
                      License- {licenseplate}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex gap-5 items-center">
                <div className="w-full">
                  {/* driver info */}
                  <div className="border border-[#DFDFDF] bg-[#FAFAFA] rounded-[10px] p-4 mb-2.5">
                    {/* driver info */}
                    <div className="flex gap-[5px] items-center">
                      <h3 className="text-[#333] text-[12px] leading-5 font-openSans font-bold ">
                        Driver info
                      </h3>
                      <div className="flex gap-0.5">
                        <VerifiedIcon />
                        <p className="text-[#4DB429] text-[10px] font-medium">
                          Verified
                        </p>
                      </div>
                    </div>
                    <div className="mt-2.5 flex items-center justify-between">
                      <div>
                        <p className="text-[14px] font-medium leading-[18px] text-[#333]">
                          {driver_name}{" "}
                        </p>
                        <p className="text-[12px] font-medium leading-4 text-[#6F6464] font-inter">
                          Name
                        </p>
                      </div>
                      <div>
                        <p className="text-[14px] font-medium leading-[18px] text-[#333]">
                          DL-{driving_license}
                        </p>
                        <p className="text-[12px] font-medium leading-4 text-[#6F6464] font-inter">
                          Driver’s license
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* Departure inspection */}
                  <div className="border border-[#B8CBFC] bg-[#F5F9FC] rounded-[10px] p-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-[#333] text-[12px] leading-5 font-openSans font-bold ">
                        <span className="capitalize">{report_type}</span>{" "}
                        inspection
                      </h3>
                      <p className="text-[#303030] text-[12px] leading-4">
                        {moment(submission_time).format("DD MMM YYYY, h:mm A")}
                      </p>
                    </div>
                    <div className="flex gap-0.5 items-center mt-2.5">
                      <LocationIcon />
                      <p className="text-[12px] font-medium leading-4 text-[#303030] font-inter">
                        {location}
                      </p>
                    </div>
                    <div className="border border-[#B8CBFC] bg-white p-3 rounded-md mt-2.5 flex items-center justify-between">
                      <div className="flex items-center gap-[5px]">
                        <OdometerIcon />
                        <p className="text-[12px] font-medium leading-4 text-[#303030] font-inter">
                          Current odometers
                        </p>
                      </div>
                      <h4 className="text-[14px] text-[#303030] font-semibold">
                        {odometer_reading}{" "}
                      </h4>
                    </div>
                  </div>
                  {/* Return inspection */}
                  <div className="border border-[#B8CBFC] bg-[#F5F9FC] rounded-[10px] p-4 mt-10">
                    <div className="flex justify-between items-center">
                      <h3 className="text-[#333] text-[12px] leading-5 font-openSans font-bold ">
                        Return inspection
                      </h3>
                      <p className="text-[#303030] text-[12px] leading-4">
                        Not performed yet
                      </p>
                    </div>
                    {/* <div className="flex gap-0.5 items-center mt-2.5">
              <LocationIcon />
              <p className="text-[12px] font-medium leading-4 text-[#303030] font-inter">
                M12, Westphalia, Germany
              </p>
            </div>
            <div className="border border-[#B8CBFC] bg-white p-3 rounded-md mt-2.5 flex items-center justify-between">
              <div className="flex items-center gap-[5px]">
                <OdometerIcon />
                <p className="text-[12px] font-medium leading-4 text-[#303030] font-inter">
                  Current odometers
                </p>
              </div>
              <h4 className="text-[14px] text-[#303030] font-semibold">
                1275{" "}
              </h4>
            </div> */}
                  </div>
                </div>
                <div className="border border-[#F6F6F6] bg-[#FFFDF8] rounded-[10px] p-4 shadow-[0_2px_5px_0_rgba(0,0,0,0.05)] w-full max-h-[410px] h-full">
                  <div className="flex items-center gap-[5px]">
                    <div
                      className="p-[5px] rounded-full w-fit"
                      style={{ background: `rgb(2, 99, 111, 0.05)` }}
                    >
                      <RecommendationIcon />
                    </div>
                    <h2 className="text-[14px] font-bold font-openSans text-[#333]">
                      Smart trip recommendations
                    </h2>
                  </div>
                  <div className="mt-4 ml-[30px] space-y-2.5">
                    {ai_recommendations?.map((item: string, inx: number) => (
                      <div key={inx} className="flex items-center gap-2.5">
                        <UnorderListIcon fill="#999999" />
                        <p className="text-[#333] text-[14px] leading-5 font-openSans">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* overall conditions and diagrams */}
              <div className="p-5  border border-[#DFDFDF] bg-[#FAFAFA] my-5 rounded-[10px]">
                <h2 className="text-[16px] font-semibold text-[#6F6464]">
                  Body Condition
                </h2>
                <div className="grid grid-cols-2 gap-20">
                  <div className="flex gap-10 items-center mb-8">
                    <div className="text-center w-[220px]">
                      {/* <div className="text-center flex-center flex flex-col">
                <div className="text-[56px] h-[70px]">
                  {getConditionEmoji(fullExteriorCondition)}
                </div>
                <div className="my-2"></div>
                {getVehicleCondition(fullExteriorCondition)}

                <p className="text-[#6F6464] text-[10px] font-medium">
                  Overall
                </p>
              </div> */}

                      <div className="text-center flex-center flex flex-col">
                        <div className="text-[56px] h-[70px]">😕</div>
                        <div className="py-1">
                          {overall_score && getVehicleCondition(overall_score)}
                        </div>
                        <p className="text-[#6F6464] text-[10px] font-medium">
                          Overall
                        </p>
                      </div>
                    </div>
                    <div className="w-full">
                      <div className="flex justify-between items-center">
                        <p className="text-[12px] text-[#6F6464] font-medium leading-4">
                          Total parts detected
                        </p>
                        <h2 className="text-[14px] font-bold text-[#151515]">
                          {total_part_count ?? 0}
                        </h2>
                      </div>
                      <Divider className="my-3" />
                      <div className="flex justify-between items-center">
                        <p className="text-[12px] text-[#6F6464] font-medium leading-4">
                          Damages found
                        </p>
                        <h2 className="text-[14px] font-bold text-[#151515]">
                          {total_damage_count ?? 0}
                        </h2>
                      </div>
                      <Divider className="my-3" />
                      <div className="flex justify-between items-center">
                        <p className="text-[12px] text-[#6F6464] font-medium leading-4">
                          Need parts replacement
                        </p>
                        <h2 className="text-[14px] font-bold text-[#151515]">
                          {" "}
                          {total_replacement_count ?? 0}{" "}
                        </h2>
                      </div>
                      <Divider className="my-3" />
                      <div className="flex justify-between items-center">
                        <p className="text-[12px] text-[#6F6464] font-medium leading-4">
                          Missing parts
                        </p>
                        <h2 className="text-[14px] font-bold text-[#151515]">
                          {" "}
                          {total_missing_count ?? 0}{" "}
                        </h2>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <CarDiagramSvg damageIntensity={damage_intensity || {}} />
                    <div className="flex flex-col items-center gap-10 ">
                      <p className="text-[10px] font-medium whitespace-nowrap -rotate-90">
                        Low damage
                      </p>
                      <Image
                        src={"/images/trip-audit/carConditionBar.png"}
                        alt="Condition Bar"
                        width={10}
                        height={40}
                        className="h-40"
                      />
                      <p className="text-[10px] font-medium whitespace-nowrap rotate-90">
                        High damage
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5  flex flex-wrap gap-[5.5px]">
                  <AntImage.PreviewGroup>
                    {imagesList?.map((image) =>
                      image?.src ? (
                        <AntImage
                          key={image.id}
                          width={113}
                          height={64}
                          className="rounded-md"
                          src={image?.src}
                          alt={image?.alt || "Image"}
                        />
                      ) : null,
                    )}
                  </AntImage.PreviewGroup>
                </div>
              </div>
              <InspectionTable data={vehicledamages} />
              {/* <div className="py-5">
                <Divider />
              </div>
              //  invoice section 
              <div>
                <div className="flex items-center gap-2.5">
                  <div
                    className="p-2.5 rounded-full w-fit"
                    style={{ background: `rgb(45, 101, 242, 0.06)` }}
                  >
                    <DollerIcon />
                  </div>
                  <div>
                    <h2 className="text-[#303030] text-[18px] font-bold font-openSans">
                      Pre-trip invoice
                    </h2>
                    <p className="text-[#6F6464 text-[12px] font-medium leading-4">
                      #143563
                    </p>
                  </div>
                </div>
                // {/* Header Section - Main Charges
                <div className="space-y-4 mb-8">
                  <div className="mt-8">
                    <div className="grid grid-cols-12 text-[12px] font-medium text-[#6F6464] mb-2.5 bg-[#F5F9FC] rounded-md py-2.5 px-4">
                      <div className="col-span-1">S/N</div>
                      <div className="col-span-7">Items</div>
                      <div className="col-span-4 text-right">Amount</div>
                    </div>

                    <div className=" px-4 ">
                      <div className="grid grid-cols-12 items-center py-2 border-b border-gray-200 last:border-0 text-[#151515]">
                        <div className="col-span-1 text-[12px]">01</div>
                        <div className="col-span-7 text-[12px] ">
                          Trip charge
                        </div>
                        <div className="col-span-4 text-right font-medium">
                          $300
                        </div>
                      </div>

                      <div className="grid grid-cols-12 items-center py-2 border-b border-gray-200 last:border-0 text-[#151515]">
                        <div className="col-span-1 text-[12px]">02</div>
                        <div className="col-span-7 text-[12px]">
                          Driver charge
                        </div>
                        <div className="col-span-4 text-right font-medium text-gray-400">
                          ---
                        </div>
                      </div>

                      <div className="grid grid-cols-12 items-center py-2 text-[#151515]">
                        <div className="col-span-1 text-[12px]">03</div>
                        <div className="col-span-7 text-[12px]">
                          Standard cleaning charge
                        </div>
                        <div className="col-span-4 text-right font-medium">
                          $120
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                // {/* Totals 
                <div className="space-y-2.5 mb-8 border-t pt-2.5 border-gray-300 pr-4 pl-[110px]">
                  <div className="flex justify-between text-[12px]">
                    <span className="text-[#7D7D7D] font-semibold">
                      Current total
                    </span>
                    <span className="font-bold text-lg">$420</span>
                  </div>
                  <div className="flex justify-between text-base">
                    <span className="font-semibold">Deposited</span>
                    <span className="font-bold text-lg text-[#151515]">
                      $200
                    </span>
                  </div>
                </div>

                // {/* Additional Charges Notice 
                <div className=" p-4 flex items-start gap-[5px]">
                  <div className="shrink-0 w-6 h-6 bg-[#7D7D7D] rounded-full flex items-center justify-center text-white text-xs font-bold">
                    i
                  </div>
                  <p className="text-sm text-[#303030] leading-relaxed font-openSans">
                    Additional charges may apply for excessive fuel usage,
                    excess mileage, or any vehicle damages.
                  </p>
                </div>

                // {/* Additional Fees List 
                <div className="space-y-2 text-sm px-12">
                  <div className="flex gap-10">
                    <span className="text-[#7D7D7D] max-w-60 w-full">
                      Excess mileage fee (per km)
                    </span>
                    <span className="font-medium">$5</span>
                  </div>
                  <div className="flex gap-10">
                    <span className="text-[#7D7D7D] max-w-60 w-full">
                      Excess fuel usage fee (per liter)
                    </span>
                    <span className="font-medium">$5</span>
                  </div>
                  <div className="flex gap-10">
                    <span className="text-[#7D7D7D] max-w-60 w-full">
                      Late car return fee (per hour)
                    </span>
                    <span className="font-medium">$5</span>
                  </div>
                  <div className="flex gap-10">
                    <span className="text-[#7D7D7D] max-w-60 w-full">
                      Vehicle damage fee (condition based)
                    </span>
                    <span className="font-medium text-gray-500">TBD</span>
                  </div>
                </div>
              </div> */}
            </div>
          </main>
        </Spin>
      </Modal>
      <Modal
        open={inspectionLog}
        onCancel={() => setInspectionLog(false)}
        footer={null}
        centered
        width={800}
        closeIcon
        className="mt-20"
      >
        <Spin spinning={isLoadingInspectionLog} size="large" tip="Loading...">
          <div className="p-5">
            <h1 className="text-[#04082C] text-[18px] font-bold text-center">
              Departure Inspection log
            </h1>
            <div>
              {renderProgressSection(
                inspectionLogData,
                "Departure Inspection",
                true,
              )}
            </div>
          </div>
        </Spin>
      </Modal>
    </div>
  );
};

export default ReturnInspectionReport;
