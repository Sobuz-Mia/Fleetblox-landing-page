"use client";
import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import {
  apiToDisplayMap,
  templates,
} from "../../../../tripwise/const/partKeys";
import { useParams } from "next/navigation";
import LeftSideDamagesReviewConfirm from "../../components/LeftSideDamagesReviewConfirm";
import RightSideDamagesReviewConfirm from "../../components/RightSideDamagesReviewConfirm";
import FrontSideDamagesReviewConfirm from "../../components/FrontSideDamagesReviewConfirm";
import RearSideDamagesReviewConfirm from "../../components/RearSideDamagesReviewConfirm";

export type SideKey = "left-side" | "right-side" | "front-side" | "rear-side";

type DamageItem = {
  id: number;
  damage_id: number;
  damage_type: string;
  severity: "low" | "medium" | "high";
  recommendation: "repair" | "replace";
  part_name: string | null;
  s3_url: string;
  overlap?: number;
  side: string;
};

type DamageGroupItem = {
  type: string;
  count: number;
  severity: "low" | "medium" | "high";
  recommendation: "repair" | "replace";
  images: string[];
};

type TableRow = {
  sn: number;
  part: string;
  damages: DamageGroupItem[];
};

const InspectionResult = () => {
  const params = useParams<{ trip_id: string; serial_no: string }>();

  const tripId = params.trip_id;
  const serialNo = params.serial_no;
  const [openSide, setOpenSide] = useState<
    "Left" | "Right" | "Front" | "Rear" | null
  >("Left");
  const [isEditLeftSide, setIsEditLeftSide] = useState(false);
  const [isEditRightSide, setIsEditRightSide] = useState(false);
  const [isEditFrontSide, setIsEditFrontSide] = useState(false);
  const [isEditRearSide, setIsEditRearSide] = useState(false);
  const toggleSide = (side: "Left" | "Right" | "Front" | "Rear") => {
    setOpenSide((prev) => (prev === side ? null : side));
  };
  // const [activeKey, setActiveKey] = useState<string[]>([]);
  const {
    data: reviewReportData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["review-inspection-report", tripId, tripId],
    queryFn: async () => {
      const response = await axios.get(
        `https://real-damage.fleetblox.com/api/get_all_damages?trip_id=${tripId}&serial_no=${serialNo}`
      );
      return response?.data;
    },
    enabled: !!tripId && !!serialNo,
  });
  // const isExpanded = activeKey.length > 0;

  const generateTableData = (sideKey: SideKey): TableRow[] => {
    const template = templates[sideKey] || [];
    const damages: DamageItem[] = reviewReportData?.data[sideKey] || [];

    const damageMap = damages.reduce<Record<string, DamageItem[]>>(
      (acc, item) => {
        let displayName = "Unknown Part";

        if (item.part_name && apiToDisplayMap[item.part_name]) {
          displayName = apiToDisplayMap[item.part_name];
        }

        const key = displayName.toLowerCase();
        if (!acc[key]) acc[key] = [];
        acc[key].push(item);

        return acc;
      },
      {}
    );

    return template.map((slot) => {
      const key = slot.part.toLowerCase();
      const partDamages = damageMap[key] || [];

      const grouped = partDamages.reduce<
        Record<string, Omit<DamageGroupItem, "type">>
      >((acc, d) => {
        const typeKey = d.damage_type;

        if (!acc[typeKey]) {
          acc[typeKey] = {
            count: 0,
            severity: d.severity,
            recommendation: d.recommendation,
            images: [],
          };
        }

        acc[typeKey].count++;
        if (d.s3_url) acc[typeKey].images.push(d.s3_url);

        return acc;
      }, {});

      const damagesList: DamageGroupItem[] = Object.entries(grouped).map(
        ([type, info]) => ({
          type: type.charAt(0).toUpperCase() + type.slice(1),
          ...(info as Omit<DamageGroupItem, "type">),
        })
      );

      return {
        sn: slot.sn,
        part: slot.part,
        damages: damagesList,
      };
    });
  };

  const leftSideTableData = isLoading ? [] : generateTableData("left-side");
  const rightSideTableData = isLoading ? [] : generateTableData("right-side");
  const frontSideTableData = isLoading ? [] : generateTableData("front-side");
  const rearSideTableData = isLoading ? [] : generateTableData("rear-side");
  const getConditionColor = (cond: string) => {
    if (cond === "Poor") return "red";
    if (cond === "Fair") return "orange";
    return "green";
  };
  return (
    <div className="min-h-[80vh] bg-white px-5 py-5 max-w-3xl mx-auto flex flex-col justify-between">
      <div className=" space-y-2.5 ">
        {/* Title */}
        {!isEditLeftSide &&
          !isEditFrontSide &&
          !isEditRightSide &&
          !isEditRearSide && (
            <h1 className="text-[20px] font-bold text-center text-[#303030] mb-10">
              Review damages
            </h1>
          )}

        {/*Left Side table review  */}
        {isEditRightSide || isEditFrontSide || isEditRearSide ? null : (
          <LeftSideDamagesReviewConfirm
            refreshData={refetch}
            openSide={openSide}
            toggleSide={toggleSide}
            getConditionColor={getConditionColor}
            leftSideDamageData={leftSideTableData}
            tripId={tripId}
            serialNo={serialNo}
            setIsEdit={setIsEditLeftSide}
            isEdit={isEditLeftSide}
          />
        )}

        {/* Right side table review */}
        {isEditLeftSide || isEditFrontSide || isEditRearSide ? null : (
          <RightSideDamagesReviewConfirm
            refreshData={refetch}
            openSide={openSide}
            toggleSide={toggleSide}
            getConditionColor={getConditionColor}
            leftSideDamageData={rightSideTableData}
            tripId={tripId}
            serialNo={serialNo}
            setIsEdit={setIsEditRightSide}
            isEdit={isEditRightSide}
          />
        )}

        {/* Front side table review */}
        {isEditRightSide || isEditLeftSide || isEditRearSide ? null : (
          <FrontSideDamagesReviewConfirm
            refreshData={refetch}
            openSide={openSide}
            toggleSide={toggleSide}
            getConditionColor={getConditionColor}
            leftSideDamageData={frontSideTableData}
            tripId={tripId}
            serialNo={serialNo}
            setIsEdit={setIsEditFrontSide}
            isEdit={isEditFrontSide}
          />
        )}

        {/* Rear side table review */}
        {isEditRightSide || isEditFrontSide || isEditLeftSide ? null : (
          <RearSideDamagesReviewConfirm
            refreshData={refetch}
            openSide={openSide}
            toggleSide={toggleSide}
            getConditionColor={getConditionColor}
            leftSideDamageData={rearSideTableData}
            tripId={tripId}
            serialNo={serialNo}
            setIsEdit={setIsEditRearSide}
            isEdit={isEditRearSide}
          />
        )}
      </div>
      <div className="space-y-2.5">
        <button className="border border-[#DDD] rounded-md w-full py-2 px-[14px] text-[#999] text-[14px]">
          Recapture
        </button>
        <button className="submit-button w-full">Submit Report</button>
      </div>
    </div>
  );
};

export default InspectionResult;
