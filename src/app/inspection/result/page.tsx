"use client";
import React, { useState } from "react";
import { Tag, Image as antdImage } from "antd";
import Image from "next/image";
import ExpandedReportIcon from "../icons/ExpandedReportIcon";
import EditIcon from "./../icons/EditIcon";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
// import CollapseIcon from "./Icons/CollapseIcon";
// import ExpandeIcon from "./Icons/ExpandeIcon";
// import LeftSideDoorIcon from "./Icons/LeftSideDoorIcon";
// const { Panel } = Collapse;
import { apiToDisplayMap, templates } from "./../../tripwise/const/partKeys";
import CollapseIcon from "./Icons/CollapseIcon";
import LeftSideDoorIcon from "./Icons/LeftSideDoorIcon";

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
  const [openSide, setOpenSide] = useState<
    "Left" | "Right" | "Front" | "Rear" | null
  >("Left");
  const toggleSide = (side: "Left" | "Right" | "Front" | "Rear") => {
    setOpenSide((prev) => (prev === side ? null : side));
  };
  // const [activeKey, setActiveKey] = useState<string[]>([]);
  const { data: reviewReportData, isLoading } = useQuery({
    queryKey: ["review-inspection-report"],
    queryFn: async () => {
      const response = await axios.get(
        `https://real-damage.fleetblox.com/api/get_all_damages?trip_id=edbc7f2d-5295-4de9-9b0d-26b4686f9f9f&serial_no=1`
      );
      return response?.data;
    },
  });
  // const isExpanded = activeKey.length > 0;
  const condition = "Poor";

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

  const renderDamages = (damages: DamageGroupItem[]) => {
    if (damages.length === 0) {
      return (
        <p className="font-normal text-[12px] leading-4 text-[#151515]">-</p>
      );
    }

    return (
      <div className="space-y-3">
        {damages.map((d, i) => (
          <div key={i} className="flex items-center gap-3">
            <antdImage.PreviewGroup>
              {d.images.map((url, idx) => (
                <Image
                  key={idx}
                  width={32}
                  height={32}
                  src={url}
                  alt={d.type}
                  className="rounded-md object-contain w-[24px] h-[24px]"
                />
              ))}
            </antdImage.PreviewGroup>
            <div>
              <span className="text-[12px] font-normal  leading-4 text-[#151515]">
                {d.count > 1 ? `${d.count} ` : ""}
                {d.type}
                {d.count > 1 ? "s" : ""}
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const leftSideTableData = isLoading ? [] : generateTableData("left-side");
  const getConditionColor = (cond: string) => {
    if (cond === "Poor") return "red";
    if (cond === "Fair") return "orange";
    return "green";
  };

  // const getCarRotation = () => {
  //   if (currentSide === "Left") return "rotate(90deg)";
  //   if (currentSide === "Right") return "rotate(-90deg)";
  //   if (currentSide === "Rear") return "rotate(180deg)";
  //   return "rotate(0deg)";
  // };
  return (
    <div className="min-h-screen bg-white px-5 py-5 max-w-3xl mx-auto">
      {/* Title */}
      <h1 className="text-[20px] font-bold text-center text-[#303030] mb-10">
        Review damages
      </h1>

      {/* Side Header Card */}
      <div
        className={` border rounded-md  ${
          openSide === "Left"
            ? " border-t border-l border-r border-[#DDD] bg-[#F6F6F6] "
            : "  border-b-none rounded-t-md  border-[#F6F6F6] bg-white"
        }`}
      >
        <div
          className="flex items-center justify-between  border-b-none p-3 cursor-pointer"
          onClick={() => toggleSide("Left")}
        >
          <div className="flex items-center gap-[10px]">
            <LeftSideDoorIcon />
            <div>
              <div className="text-[#303030] text-[14px] font-bold ">
                Left side
              </div>
              <Tag
                color={getConditionColor(condition)}
                className="text-[14px] font-medium leading-4 border-none text-left "
              >
                {condition}
              </Tag>
            </div>
          </div>

          {/* Back arrow – you can hook this up to router.back() or navigation */}
          {openSide !== "Left" ? <ExpandedReportIcon /> : <CollapseIcon />}
        </div>
        {openSide === "Left" && (
          <div>
            <div className="grid grid-cols-12 bg-[#F5F9FC] font-semibold text-12 text-black-softlight border-t border-gray-200">
              <div className="col-span-6 p-3 border-b border-r border-gray-200 text-[12px] font-semibold text-[#6F6464]">
                Vehicle parts
              </div>
              <div className="col-span-6 p-3 border-b border-r border-gray-200 text-[12px] font-semibold text-[#6F6464]">
                Damages
              </div>
            </div>

            <div className=" border-gray-200 text-12">
              {leftSideTableData?.map((item) => (
                <div
                  key={item.sn}
                  className="grid grid-cols-12 border-b border-gray-200 hover:bg-gray-100"
                >
                  <div className="col-span-6 p-3 border-r border-gray-200 font-normal text-[12px] leading-4 text-[#151515]">
                    {item.part}
                  </div>
                  <div className="col-span-6 p-3 border-r border-gray-200 font-normal text-[12px] leading-4 text-[#151515] flex justify-between gap-2.5">
                    {renderDamages(item.damages)}{" "}
                    <button className="">
                      <EditIcon />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InspectionResult;
