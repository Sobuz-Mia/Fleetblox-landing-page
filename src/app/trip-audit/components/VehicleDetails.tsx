import { useFormContext } from "react-hook-form";
import CustomSelect from "./../../../components/ui/CustomSelect";
import { useEffect, useState } from "react";
import axios from "axios";
import { formSchema } from "./TripAuditInspection";
import z from "zod";
type FormData = z.infer<typeof formSchema>;
const VehicleDetails = ({ onNext }: { onNext: () => void }) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<FormData>();
  const selectedFuelType = watch("vehicle.fuelType");
  const selectedMake = watch("vehicle.make");
  const selectedModel = watch("vehicle.model");
  const [makes, setMakes] = useState<string[]>([]);
  const [models, setModels] = useState<string[]>([]);

  // Fetch makes on component mount
  useEffect(() => {
    const fetchMakes = async () => {
      try {
        const response = await axios.get(
          "https://real-damage.fleetblox.com/api/get_makes"
        );
        setMakes(response.data); // Assuming API returns an array of strings like ["AC", "AK", ...]
      } catch (error) {
        console.error("Error fetching makes:", error);
      }
    };
    fetchMakes();
  }, []);

  // Fetch models when make changes
  useEffect(() => {
    const fetchModels = async () => {
      if (selectedMake) {
        try {
          const response = await axios.get(
            `https://real-damage.fleetblox.com/api/get_models?make=${encodeURIComponent(
              selectedMake
            )}`
          );
          setModels(response.data); // Assuming API returns an array of strings for models
        } catch (error) {
          console.error("Error fetching models:", error);
          setModels([]); // Reset models on error
        }
      } else {
        setModels([]); // Reset models if no make selected
      }
    };
    fetchModels();
  }, [selectedMake]);

  return (
    <div className="">
      <div className="text-center mb-10">
        <h2 className="text-[22px] font-bold text-[#303030] ">
          Vehicle Details
        </h2>
        <p className="text-[14px] leading-5 text-[#6F6464]">
          Provide your vehicle’s details
        </p>
      </div>
      <h2 className="text-[18px] font-semibold text-[#303030] mb-5">
        Vehicle Details
      </h2>
      <div className="mb-5 flex gap-[10px] items-center">
        <div className="flex-1">
          <label className="text-[#6F6464] font-semibold text-[12px] mb-[5px] block">
            Select car make
          </label>
          <CustomSelect
            options={makes}
            value={selectedMake}
            onChange={(value) => {
              setValue("vehicle.make", value);
              setValue("vehicle.model", ""); // Reset model when make changes
            }}
            placeholder="Select car make"
          />
          {errors.vehicle?.make && (
            <p className="text-red-500 text-sm">
              {errors.vehicle.make.message}
            </p>
          )}
        </div>
        <div className="flex-1">
          <label className="text-[#6F6464] font-semibold text-[12px] mb-[5px] block">
            Select car model
          </label>
          <CustomSelect
            options={models}
            value={selectedModel}
            onChange={(value) => setValue("vehicle.model", value)}
            placeholder="Select car model"
          />

          {errors.vehicle?.model && (
            <p className="text-red-500 text-sm">
              {errors.vehicle.model.message}
            </p>
          )}
        </div>
      </div>
      <div className="mb-5">
        <label className="text-[#6F6464] font-semibold text-[12px] mb-[5px]">
          Enter year
        </label>
        <input
          {...register("vehicle.year")}
          placeholder="Type your year"
          className="p-[10px] w-full bg-[#F6F6F6] rounded-[6px] focus:outline-none placeholder:text-[#999] placeholder:text-[12px]"
        />
        {errors.vehicle?.year && (
          <p className="text-red-500 text-sm">{errors.vehicle.year.message}</p>
        )}
      </div>
      <div className="mb-2 flex flex-col">
        <label className="text-[#6F6464] font-semibold text-[12px] mb-[5px]">
          Select fuel type
        </label>
        <div className="flex gap-[10px] w-full">
          {["Gasoline", "Electric", "Hybrid"].map((type) => (
            <label
              key={type}
              className={`border border-[#F6F6F6] px-4 py-3 rounded-md w-full flex items-center gap-[10px] text-[#6F6464] text-[12px] font-medium leading-4 `}
            >
              <input
                type="radio"
                value={type}
                {...register("vehicle.fuelType")}
                className="h-6 w-6 placeholder:text-[#999] placeholder:text-[12px]"
              />{" "}
              <p className={`${selectedFuelType === type ? "font-bold" : ""}`}>
                {" "}
                {type}
              </p>
            </label>
          ))}
        </div>
        {errors.vehicle?.fuelType && (
          <p className="text-red-500 text-sm">
            {errors.vehicle.fuelType.message}
          </p>
        )}
      </div>
      <div className="mb-5">
        <label className="text-[#6F6464] font-semibold text-[12px] mb-[5px]">
          Enter exterior color name (Optional)
        </label>
        <input
          {...register("vehicle.color")}
          placeholder="Enter color"
          className="p-[10px] w-full bg-[#F6F6F6] rounded-[6px] focus:outline-none placeholder:text-[#999] placeholder:text-[12px]"
        />
        {errors.vehicle?.color && (
          <p className="text-red-500 text-sm">{errors.vehicle.color.message}</p>
        )}
      </div>
      <div className="mb-5">
        <label className="text-[#6F6464] font-semibold text-[12px] mb-[5px]">
          Enter VIN (Optional)
        </label>
        <input
          {...register("vehicle.vin")}
          placeholder="Enter or scan VIN"
          className="p-[10px] w-full bg-[#F6F6F6] rounded-[6px] focus:outline-none placeholder:text-[#999] placeholder:text-[12px]"
        />
        {errors.vehicle?.vin && (
          <p className="text-red-500 text-sm">{errors.vehicle.vin.message}</p>
        )}
      </div>
      <button
        onClick={onNext}
        className="bg-[#2D65F2] text-white p-3 rounded-md mt-10 w-full text-[14px] font-semibold"
      >
        Next
      </button>
    </div>
  );
};

export default VehicleDetails;
