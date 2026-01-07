import { Drawer, Select, Tag } from "antd";
import LeftSideDoorIcon from "../Icons/LeftSideDoorIcon";
import ExpandedReportIcon from "../../icons/ExpandedReportIcon";
import CollapseIcon from "../Icons/CollapseIcon";
import EditIcon from "../../icons/EditIcon";
import { renderDamages } from "../Index";
import { useCallback, useRef, useState } from "react";
import PlusIcon from "../Icons/PlusIcon";
import CameraIcon from "../Icons/CameraIcon";
import Webcam from "react-webcam";
// import axios from "axios";
import Image from "next/image";

type DamageGroupItem = {
  type: string;
  count: number;
  severity: "low" | "medium" | "high";
  recommendation: "repair" | "replace";
  images: string[];
};
export type TLocationDropdown = {
  value: string | number | null;
  label: string;
};
type TDamageData = {
  sn: number;
  part: string;
  damages: DamageGroupItem[];
};
const LeftSideDamagesReviewConfirm = ({
  openSide,
  toggleSide,
  getConditionColor,
  leftSideDamageData,
}: {
  openSide: string | null;
  leftSideDamageData: TDamageData[] | undefined;
  toggleSide: (side: "Left" | "Right" | "Front" | "Rear") => void;
  getConditionColor: (condition: string) => string;
}) => {
  const webcamRef = useRef<Webcam | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openCamera, setOpenCamera] = useState(false);
  const [damageType, setDamageType] = useState<TLocationDropdown>({
    label: "Select damage type",
    value: null,
  });
  const [damageSeverity, setDamageSeverity] = useState<TLocationDropdown>({
    label: "Select damage severity",
    value: null,
  });
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const capture = useCallback(() => {
    const imageSrc = webcamRef?.current?.getScreenshot();
    if (imageSrc) {
      setCapturedImage(imageSrc);
    }
  }, [webcamRef]);
  const addDamage = async () => {
    if (!capturedImage || !damageType.value || !damageSeverity.value) return;

    // Convert base64 to Blob
    const response = await fetch(capturedImage);
    const blob = await response.blob();

    const formData = new FormData();
    formData.append("image", blob, "damage.jpg");
    formData.append("damageType", damageType.value as string);
    formData.append("severity", damageSeverity.value as string);
    formData.append("side", "Left"); // since this is Left side component
    formData.append("part", "Front side bumper"); // replace with actual part name (pass as prop if needed)
    console.log(formData);
    // try {
    //   await axios.post("/your-api-endpoint/attach-image", formData, {
    //     headers: { "Content-Type": "multipart/form-data" },
    //   });
    //   // Success: close drawer, reset states, maybe refresh damage list
    //   setOpenDrawer(false);
    //   // ... reset states
    // } catch (error) {
    //   console.error("Upload failed", error);
    //   // Handle error (show toast, etc.)
    // }
  };
  console.log(capturedImage);
  return (
    <>
      {isEdit ? (
        <div className="h-screen">
          <h2 className="text-[#151515] text-[20px] font-bold text-center">
            Front side bumper
          </h2>
          <h3 className="text-[#6F6464] text-[16px] font-semibold my-5">
            Existing damages
          </h3>
          {/* no damage added section */}
          <div className="text-center max-w-[277px] w-full mx-auto my-10">
            <h2 className="mb-2.5 text-[#303030] text-[20px] font-bold ">
              No damage records
            </h2>
            <p className="text-[#6F6464] text-[12px] leading-4">
              No damages have been recorded for the selected vehicle part. To
              add damage details manually, use the button below.
            </p>
          </div>
          <button
            onClick={() => setOpenDrawer(true)}
            className="flex items-center border border-[#2D65F2] rounded-md px-[14px] py-3 text-[#2D65F2] text-[14px] font-semibold justify-center max-w-[200px] w-full mx-auto"
          >
            <PlusIcon />
            Add new damage
          </button>
          <Drawer
            title={
              <div className="">
                <h1 className="text-[#6F6464] text-[16px] font-semibold text-center">
                  Add new damage
                </h1>
              </div>
            }
            height="50vh"
            placement={"bottom"}
            closable={false}
            onClose={() => setOpenDrawer(false)}
            open={openDrawer}
            key={"bottom"}
          >
            <div className="space-y-4">
              <Select
                value={damageType.value}
                onChange={(value, option) => {
                  const selectedLabel = Array.isArray(option)
                    ? option[0]?.label || String(value)
                    : option?.label || String(value);
                  setDamageType({
                    value: value as string,
                    label: selectedLabel,
                  });
                }}
                className="w-full h-[50px]"
                placeholder="Select damage type"
                options={[
                  { value: "scratch", label: "Scratch" },
                  { value: "dent", label: "Dent" },
                  { value: "crack", label: "Crack" },
                  { value: "detachment", label: "Detachment" },
                  { value: "broken_part", label: "Broken part" },
                  { value: "missing_part", label: "Missing part" },
                  { value: "broken_light", label: "Broken light" },
                  { value: "broken_window", label: "Broken window" },
                  { value: "corrosion_rust", label: "Corrosion rust" },
                ]}
              />
              <Select
                value={damageSeverity.value}
                onChange={(value, option) => {
                  const selectedLabel = Array.isArray(option)
                    ? option[0]?.label || String(value)
                    : option?.label || String(value);
                  setDamageSeverity({
                    value: value as string,
                    label: selectedLabel,
                  });
                }}
                className="w-full h-[50px]"
                placeholder="Select damage type"
                options={[
                  { label: "All type", value: "" },
                  {
                    label: "High",
                    value: "high",
                  },
                  {
                    label: "Medium",
                    value: "medium",
                  },
                  {
                    label: "Low",
                    value: "low",
                  },
                ]}
              />
              {/* camera section */}

              <div>
                {openCamera ? (
                  <div>
                    <Webcam
                      screenshotFormat="image/jpeg"
                      ref={webcamRef}
                    ></Webcam>
                    <Image
                      src={capturedImage || ""}
                      width={400}
                      height={400}
                      alt="captured image"
                    />
                    <button onClick={capture}>Capture photo</button>
                  </div>
                ) : (
                  <div
                    onClick={() => setOpenCamera(true)}
                    className="border border-[#B8CBFC] py-5 rounded-[10px] flex flex-col justify-center items-center cursor-pointer"
                  >
                    <CameraIcon />
                    <p className="text-[#6F6464] text-[12px] leading-4">
                      Upload damage area image
                    </p>
                  </div>
                )}
              </div>
              {/* button */}
              <div className="flex items-center gap-[5px] border-t pt-5">
                <button className="px-[14px] py-2 border border-[#DDD] w-full text-[#999] text-[14px] font-semibold h-[42px] rounded-md">
                  Cancel
                </button>
                <button
                  onClick={addDamage}
                  className="submit-button w-full h-[42px]"
                >
                  Add
                </button>
              </div>
            </div>
          </Drawer>
        </div>
      ) : (
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
                  color={getConditionColor("Poor")}
                  className="text-[14px] font-medium leading-4 border-none text-left "
                >
                  Poor
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
                {leftSideDamageData?.map((item) => (
                  <div
                    key={item.sn}
                    className="grid grid-cols-12 border-b border-gray-200 hover:bg-gray-100"
                  >
                    <div className="col-span-6 p-3 border-r border-gray-200 font-normal text-[12px] leading-4 text-[#151515]">
                      {item.part}
                    </div>
                    <div className="col-span-6 p-3 border-r border-gray-200 font-normal text-[12px] leading-4 text-[#151515] flex justify-between gap-2.5">
                      {renderDamages(item.damages)}{" "}
                      <button onClick={() => setIsEdit(true)} className="">
                        <EditIcon />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default LeftSideDamagesReviewConfirm;
