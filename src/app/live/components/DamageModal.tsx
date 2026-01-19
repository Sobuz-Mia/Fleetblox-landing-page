import Image from "next/image";
import LoadingButtonAnimation from "./../../../components/ui/shared/ButtonLoadingAnimation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CloseOutlined } from "@ant-design/icons";
import { Select } from "antd";
interface DamageDetail {
  damage_id: number;
  damage_type: string;
  part_name: string;
  severity: string;
  side?: string;
  s3_url: string;
  overlap?: number;
  message?: string | null;
  [key: string]: unknown;
}
import { ReactNode } from "react";
import { vehiclePartOptions } from "./../../tripwise/const/PartsName";
import { extractSideFromPartValue } from "./../../tripwise/utils/helper";

export interface SelectGroupOption {
  label: ReactNode;
  title: string;
  value?: string;
  options: {
    label: ReactNode;
    value: string;
  }[];
}
interface SelectValue {
  label: string | React.ReactNode;
  value: string;
}

const BASE_URL = "https://real-damage.fleetblox.com";
export function DamageModal({
  modalLoading,
  tripId,
  modalData,
  serialNo,
  refetch,
  closeModal,
}: {
  modalLoading: boolean;
  tripId: string;
  modalData: DamageDetail | null;
  serialNo: string;
  refetch: () => void;
  closeModal: () => void;
}) {
  const [selectedPartName, setSelectedPartName] = useState<
    SelectValue | undefined
  >();
  const [selectedDamageType, setSelectedDamageType] = useState<
    SelectValue | undefined
  >();
  const [selectedSide, setSelectedSide] = useState<string | undefined>();
  console.log(modalData, " this is modal data inside the modal");
  console.log(modalData?.part_name, " this is part name in the modal");
  console.log(modalData?.damage_type, " this is damage type in the modal");

  const [isAddDamageLoading, setIsAddDamageLoading] = useState(false);
  const handleAddToList = async () => {
    if (!modalData || !selectedPartName?.value || !selectedDamageType?.value) {
      toast.error("Please ensure part name and damage type are selected");
      return;
    }
    if (!modalData) return;
    setIsAddDamageLoading(true);
    try {
      const base64String = modalData.s3_url.split(",")[1];
      const binaryString = atob(base64String);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      const blob = new Blob([bytes], { type: "image/jpeg" });
      const file = new File([blob], `damage_${modalData.damage_id}.jpeg`, {
        type: "image/jpeg",
      });
      console.log(selectedPartName);
      const formData = new FormData();
      formData.append("trip_id", tripId);
      formData.append("serial_no", serialNo);
      formData.append("image", file);
      formData.append(
        "data",
        JSON.stringify({
          damage_id: modalData.damage_id,
          damage_type: selectedDamageType.value, // Extracting the string value
          part_name: selectedPartName.value, // Extracting the string value
          severity: modalData.severity,
          side: selectedSide,
        }),
      );

      const res = await fetch(`${BASE_URL}/api/damage_pop_up_confirm`, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        toast.success("Damage added!");
        refetch();
        closeModal();
      } else throw new Error();
    } catch (err) {
      console.log(err);
      toast.error("Failed to add damage");
    } finally {
      setIsAddDamageLoading(false);
    }
  };
  useEffect(() => {
    if (modalData) {
      // 1. Find Part Name Label from the grouped options
      const allParts = vehiclePartOptions.flatMap((group) => group.options);
      const foundPart = allParts.find(
        (opt) => opt.value === modalData.part_name,
      );

      setSelectedPartName({
        value: modalData.part_name || "",
        label: foundPart?.label || modalData.part_name || "Select Part",
      });

      // 2. Find Damage Type Label
      const foundDamage = vehiclePartOptions?.find(
        (opt: SelectGroupOption) => opt?.value === modalData.damage_type,
      );

      setSelectedDamageType({
        value: modalData.damage_type || "",
        label: foundDamage?.label || modalData.damage_type || "Select Damage",
      });

      // 3. Side logic
      const side =
        modalData.side || extractSideFromPartValue(modalData.part_name || "");
      setSelectedSide(side);
    }
  }, [modalData]);
  return (
    <div className="relative">
      {modalLoading ? (
        <div className="flex flex-col items-center py-16">
          <LoadingButtonAnimation bg={true} />
          <p className="mt-4 text-sm text-gray-600">Detecting damage...</p>
        </div>
      ) : modalData && !modalData?.message ? (
        <>
          {modalData?.s3_url && (
            <Image
              src={modalData?.s3_url || ""}
              alt="Damage image"
              width={140}
              height={91}
              className="rounded-md object-cover w-full h-[91px]"
            />
          )}
          <div className="mt-4 space-y-4">
            {/* <p className="text-sm text-gray-600 capitalize">
              {modalData?.part_name}
            </p> */}
            <div>
              <p className="text-[12px] font-medium leading-4 text-[#6F6464] mb-1.5">
                Body part name
              </p>
              <Select
                labelInValue // Crucial for using {label, value} objects
                value={selectedPartName}
                onChange={(val: SelectValue) => {
                  setSelectedPartName(val);
                  const sideFromNewPart = extractSideFromPartValue(val.value);
                  if (sideFromNewPart) setSelectedSide(sideFromNewPart);
                }}
                className="w-full h-[38px]"
                showSearch
                options={vehiclePartOptions}
              />
            </div>
            <div>
              <p className="text-[12px] font-medium leading-4 text-[#6F6464] mb-1.5">
                Damage type ({modalData?.severity})
              </p>
              <Select
                labelInValue
                value={selectedDamageType}
                onChange={(val: SelectValue) => setSelectedDamageType(val)}
                className="w-full h-[38px]"
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
            </div>
            {/* <p className="mt-2 text-base font-medium capitalize">
              {modalData?.damage_type} ({modalData?.severity})
            </p> */}
            <button
              onClick={handleAddToList}
              disabled={isAddDamageLoading}
              className="mt-6 w-full  text-white submit-button font-semibold"
            >
              {isAddDamageLoading ? <LoadingButtonAnimation /> : "Add to list"}
            </button>
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg font-medium">No damage detected</p>
          <button
            onClick={closeModal}
            className="mt-6 w-full submit-button  text-white  font-semibold"
          >
            Close
          </button>
        </div>
      )}
      <button
        onClick={closeModal}
        className="absolute -top-7 -right-7 bg-red-600 text-white w-10 h-10 rounded-full flex items-center justify-center"
      >
        <CloseOutlined />
      </button>
    </div>
  );
}
