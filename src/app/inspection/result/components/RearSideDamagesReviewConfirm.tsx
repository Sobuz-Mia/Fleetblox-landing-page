import { Drawer, Select, Tag } from "antd";
import { useCallback, useRef, useState, useEffect } from "react";
import LeftSideDoorIcon from "../Icons/LeftSideDoorIcon";
import ExpandedReportIcon from "../../icons/ExpandedReportIcon";
import CollapseIcon from "../Icons/CollapseIcon";
import EditIcon from "../../icons/EditIcon";
import PlusIcon from "../Icons/PlusIcon";
import CameraIcon from "../Icons/CameraIcon";
import { renderDamages } from "../Index";
import Webcam from "react-webcam";
import Image from "next/image";
import ImageCaptureButtonIcon from "../../icons/ImageCaptureButtonIcon";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { FaArrowLeft } from "react-icons/fa6";

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
type DamageReviewProps = {
  openSide: string | null;
  leftSideDamageData: TDamageData[] | undefined;
  toggleSide: (side: "Left" | "Right" | "Front" | "Rear") => void;
  getConditionColor: (condition: string) => string;
  tripId: string;
  serialNo: string;
  setIsEdit: (val: boolean) => void;
  isEdit: boolean;
  refreshData: () => void;
};
const RearSideDamagesReviewConfirm = ({
  openSide,
  toggleSide,
  getConditionColor,
  leftSideDamageData,
  tripId,
  serialNo,
  setIsEdit,
  isEdit,
  refreshData,
}: DamageReviewProps) => {
  const webcamRef = useRef<Webcam | null>(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openCamera, setOpenCamera] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [selectedPart, setSelectedPart] = useState<string>("");
  const [damageType, setDamageType] = useState<TLocationDropdown>({
    label: "Select damage type",
    value: null,
  });
  const [damageSeverity, setDamageSeverity] = useState<TLocationDropdown>({
    label: "Select damage severity",
    value: null,
  });

  // Capture photo
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setCapturedImage(imageSrc);
      setIsEdit(true);
      setOpenCamera(false); // Close camera
      setOpenDrawer(true); // Open drawer with captured image
    }
  }, [setIsEdit]);

  // Reset form when drawer closes
  const handleDrawerClose = () => {
    setOpenDrawer(false);
    setCapturedImage(null);
    setDamageType({ label: "Select damage type", value: null });
    setDamageSeverity({ label: "Select damage severity", value: null });
  };

  const addDamage = async () => {
    if (!capturedImage || !damageType.value || !damageSeverity.value) return;

    const response = await fetch(capturedImage);
    const blob = await response.blob();

    const formData = new FormData();
    formData.append("image", blob, "damage.jpg");
    const metadata = {
      damage_type: damageType.value, // try both camelCase & snake_case
      severity: damageSeverity.value,
      side: "Left",
      part_name: selectedPart ?? "",
    };
    formData.append("data", JSON.stringify(metadata));
    try {
      const res = await axios.post(
        `https://real-damage.fleetblox.com/api/add_manual_damage?trip_id=${tripId}&serial_no=${serialNo}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (res?.status === 200) {
        refreshData();
        toast.success("Damage added successfully!");
        // Success: close drawer, reset states, maybe refresh damage list
        handleDrawerClose();
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        const respData = axiosError.response?.data;
        const serverMessage =
          respData && typeof respData === "object" && "message" in respData
            ? String((respData as { message?: unknown }).message)
            : undefined;
        toast.error(
          serverMessage || axiosError.message || "Something went wrong"
        );
        console.error("Upload failed", axiosError);
      } else {
        const errMessage = (error as Error)?.message || "Something went wrong";
        toast.error(errMessage);
        console.error("Upload failed", error);
      }
    }
    // On success:

    // Optionally refresh data or show success message
  };

  // Auto-open drawer when image is captured
  useEffect(() => {
    if (capturedImage && !openCamera) {
      setOpenDrawer(true);
    }
  }, [capturedImage, openCamera]);

  return (
    <>
      {isEdit ? (
        // === EDIT MODE ===
        <div className="h-screen ">
          <button
            onClick={() => setIsEdit(false)}
            className="flex items-center justify-center gap-2 text-[#6F6464] text-[16px] font-semibold flex-initial mb-5"
          >
            <FaArrowLeft /> Back{" "}
          </button>
          <h2 className="text-[#151515] text-[20px] font-bold text-center">
            {selectedPart || "Missing part name"}
          </h2>
          <h3 className="text-[#6F6464] text-[16px] font-semibold my-5">
            Existing damages
          </h3>

          {/* No damages yet */}
          <div className="text-center max-w-[277px] w-full mx-auto my-10">
            <h2 className="mb-2.5 text-[#303030] text-[20px] font-bold">
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

          {/* === DRAWER FOR ADDING DAMAGE === */}
          <Drawer
            title={
              <div>
                <h1 className="text-[#6F6464] text-[16px] font-semibold text-center">
                  Add new damage
                </h1>
              </div>
            }
            height="70vh"
            placement="bottom"
            closable={false}
            onClose={handleDrawerClose}
            open={openDrawer}
            key="bottom"
          >
            <div className="space-y-5">
              <Select
                value={damageType.value}
                onChange={(value, option) => {
                  const label = Array.isArray(option)
                    ? option[0]?.label
                    : option?.label;
                  setDamageType({
                    value: value as string,
                    label: label || String(value),
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
                  const label = Array.isArray(option)
                    ? option[0]?.label
                    : option?.label;
                  setDamageSeverity({
                    value: value as string,
                    label: label || String(value),
                  });
                }}
                className="w-full h-[50px]"
                placeholder="Select severity"
                options={[
                  { label: "High", value: "high" },
                  { label: "Medium", value: "medium" },
                  { label: "Low", value: "low" },
                ]}
              />

              {/* Camera / Preview Section */}
              <div>
                {capturedImage && !openCamera ? (
                  <div className="border border-[#B8CBFC] rounded-[10px] flex flex-col justify-center items-center cursor-pointer bg-gray-50">
                    <Image
                      src={capturedImage}
                      alt="Captured damage"
                      width={400}
                      height={140}
                      className="w-full object-contain h-[140px]"
                    />
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      setOpenDrawer(false);
                      setIsEdit(false);
                      setOpenCamera(true);
                    }}
                    className="border border-[#B8CBFC] py-8 rounded-[10px] flex flex-col justify-center items-center cursor-pointer bg-gray-50"
                  >
                    <CameraIcon />
                    <p className="text-[#6F6464] text-[14px] mt-2">
                      Upload damage area image
                    </p>
                  </div>
                )}
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-3 border-t pt-5">
                <button
                  onClick={handleDrawerClose}
                  className="px-4 py-2 border border-[#DDD] w-full text-[#999] text-[14px] font-semibold h-[42px] rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={addDamage}
                  disabled={
                    !capturedImage || !damageType.value || !damageSeverity.value
                  }
                  className="submit-button w-full h-[42px] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add
                </button>
              </div>
            </div>
          </Drawer>
        </div>
      ) : openCamera ? (
        <div className="h-[100vh] ">
          <Webcam
            audio={false}
            // height={720}
            screenshotFormat="image/jpeg"
            ref={webcamRef}
            videoConstraints={{
              facingMode: "environment",
              width: 1280,
              height: 1280,
            }}
            className="w-full rounded-lg"
          />
          <button
            onClick={capture}
            className="flex items-center justify-center text-center w-[80px] mx-auto"
          >
            <ImageCaptureButtonIcon />
          </button>
        </div>
      ) : (
        // === NORMAL VIEW ===
        <div
          className={`border rounded-md ${
            openSide === "Rear"
              ? "border-t border-l border-r border-[#DDD] bg-[#F6F6F6]"
              : "border-b-none rounded-t-md border-[#F6F6F6] bg-white"
          }`}
        >
          <div
            className="flex items-center justify-between p-3 cursor-pointer"
            onClick={() => toggleSide("Rear")}
          >
            <div className="flex items-center gap-[10px]">
              <LeftSideDoorIcon />
              <div>
                <div className="text-[#303030] text-[14px] font-bold">
                  Rear side
                </div>
                <Tag
                  color={getConditionColor("Poor")}
                  className="text-[14px] font-medium leading-4 border-none"
                >
                  Poor
                </Tag>
              </div>
            </div>
            {openSide !== "Rear" ? <ExpandedReportIcon /> : <CollapseIcon />}
          </div>

          {openSide === "Rear" && (
            <div>
              <div className="grid grid-cols-12 bg-[#F5F9FC] font-semibold text-12 text-black-softlight border-t border-gray-200">
                <div className="col-span-6 p-3 border-b border-r border-gray-200 text-[12px] font-semibold text-[#6F6464]">
                  Vehicle parts
                </div>
                <div className="col-span-6 p-3 border-b border-r border-gray-200 text-[12px] font-semibold text-[#6F6464]">
                  Damages
                </div>
              </div>

              <div className="border-gray-200 text-12">
                {leftSideDamageData?.map((item) => (
                  <div
                    key={item.sn}
                    className="grid grid-cols-12 border-b border-gray-200 hover:bg-gray-100"
                  >
                    <div className="col-span-6 p-3 border-r border-gray-200 font-normal text-[12px] leading-4 text-[#151515]">
                      {item.part}
                    </div>
                    <div className="col-span-6 p-3 border-r border-gray-200 font-normal text-[12px] leading-4 text-[#151515] flex justify-between items-center gap-2.5">
                      {renderDamages(item.damages)}
                      <button
                        onClick={() => {
                          setIsEdit(true);
                          setSelectedPart(item?.part);
                        }}
                      >
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

export default RearSideDamagesReviewConfirm;
