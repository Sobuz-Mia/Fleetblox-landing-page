// src/app/inspection/result/page.tsx   (or any route you prefer: /inspection/review-damages, /inspection/result, etc.)
"use client";

import React, { useState } from "react";
import { Table, Tag } from "antd";
import { CarOutlined, EditOutlined, LeftOutlined } from "@ant-design/icons";
import Image from "next/image";
import CaptureImageIcon from "../icons/CaptureImageIcon";
import ExpandedReportIcon from "../icons/ExpandedReportIcon";
import EditIcon from "./../icons/EditIcon";

const damageData = {
  Left: [
    {
      key: "1",
      part: "Indicator light",
      damages: ["1 Broken part", "1 Cracked", "1 Scratch"],
    },
    { key: "2", part: "Front side bumper", damages: [] },
    {
      key: "3",
      part: "Rear side bumper",
      damages: ["1 Broken part", "1 Scratch"],
    },
    { key: "4", part: "Fender", damages: [] },
    { key: "5", part: "Quarter panel", damages: [] },
    {
      key: "6",
      part: "Side rocker panel",
      damages: ["1 Broken part", "1 Scratch"],
    },
    { key: "7", part: "Front arch panel", damages: [] },
    {
      key: "8",
      part: "Rear arch panel",
      damages: ["1 Broken part", "1 Scratch"],
    },
    { key: "9", part: "Front door", damages: ["1 Broken part", "1 Scratch"] },
    { key: "10", part: "Rear door", damages: [] },
    { key: "11", part: "Moldings", damages: ["1 Broken part", "1 Scratch"] },
    { key: "12", part: "Front door handle", damages: [] },
  ],
  // You can add Right / Front / Rear data here with different damages
  // Right: [...],
  // Front: [...],
  // Rear: [...],
};
const InspectionResult = () => {
  const [currentSide] = useState<"Left" | "Right" | "Front" | "Rear">("Left");

  const condition = "Poor"; // You can make this dynamic per side if you want

  const dataSource = damageData[currentSide] || damageData.Left;

  const columns = [
    {
      title: <span className="font-semibold text-gray-700">Vehicle parts</span>,
      dataIndex: "part",
      key: "part",
      width: "40%",
      render: (text: string) => (
        <div className="font-normal text-[12px] leading-4 text-[#151515]">
          {text}
        </div>
      ),
    },
    {
      title: <span className="font-semibold text-gray-700">Damages</span>,
      key: "damages",
      render: (_: any, record: any) =>
        record.damages.length === 0 ? (
          <span className="text-gray-400">-</span>
        ) : (
          <div className="space-y-3">
            {record.damages.map((damage: string, index: number) => (
              <div key={index} className="flex items-center gap-[10px]">
                {/* Placeholder damage thumbnail – replace with real cropped damage URLs in your app */}
                <Image
                  src="/images/inspection/damage-img.png"
                  width={20}
                  height={20}
                  alt="damage"
                  className="object-scale-down"
                />
                <span className="font-normal text-[12px] leading-4 text-[#151515]">
                  {damage}
                </span>
              </div>
            ))}
          </div>
        ),
    },
    {
      key: "action",
      width: 60,
      align: "right" as const,
      render: () => (
        <button className="">
          <EditIcon />
        </button>
      ),
    },
  ];

  const getConditionColor = (cond: string) => {
    if (cond === "Poor") return "red";
    if (cond === "Fair") return "orange";
    return "green";
  };

  const getCarRotation = () => {
    if (currentSide === "Left") return "rotate(90deg)";
    if (currentSide === "Right") return "rotate(-90deg)";
    if (currentSide === "Rear") return "rotate(180deg)";
    return "rotate(0deg)";
  };
  return (
    <div className="min-h-screen bg-white px-5 py-5">
      {/* Title */}
      <h1 className="text-[20px] font-bold text-center text-[#303030] mb-10">
        Review damages
      </h1>

      {/* Side Header Card */}
      <div className="bg-[#F6F6F6] border p-3 border-[#DDD] rounded-t-md  border-b-none  ">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[10px]">
            <CaptureImageIcon />
            <div>
              <div className="text-[#303030] text-[14px] font-bold ">
                {currentSide} side
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
          <ExpandedReportIcon />
        </div>
      </div>

      {/* Damages Table */}
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        bordered={true}
        className="custom-table "
      />
    </div>
  );
};

export default InspectionResult;
