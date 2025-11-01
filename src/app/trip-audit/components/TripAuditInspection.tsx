// app/inspection/page.tsx
"use client"; // Required for client-side state management

import { useEffect, useRef, useState } from "react";
import { useForm, FormProvider, useFormContext, Path } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image, { StaticImageData } from "next/image";
import { Country } from "./../../(gettingStarted)/components/SelectCountry";
import config from "@/utils/config";
import Canada from "../../../../public/images/canada.png";
import axios from "axios";
import CustomSelect from "./../../../components/ui/CustomSelect";
import toast from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
import { Modal } from "antd";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

// Load Stripe with your publishable key (replace with your actual Stripe publishable key)
// You should store this in environment variables, e.g., process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
const stripePromise = loadStripe(
  "pk_test_51SLMzECojuVcQ35Z7Bz9LWfmTHcH0OPB96YxZcydW5SgEKTb7Y9jduYcloWoTJbNDFaorcZxJgNL0MGPoG4wopLu009qkojqaz"
); // Replace with your key

// Define the form schema with Zod
const formSchema = z.object({
  vehicle: z.object({
    make: z.string().min(1, "Car make is required"),
    model: z.string().min(1, "Car model is required"),
    year: z.string().min(4, "Year is required"),
    fuelType: z.enum(["Gasoline", "Electric", "Hybrid"], {
      error: "Fuel type is required",
    }),
    color: z.string().optional(),
    vin: z.string().optional(),
  }),
  owner: z.object({
    fullName: z.string().min(1, "Owner name is required"),
    email: z.string().email("Invalid email").optional(),
    phone: z.string().min(10, "Invalid phone").optional(),
    address: z.string().optional(),
  }),
  driver: z
    .object({
      sameAsOwner: z.boolean().optional(),
      fullName: z.string().optional(),
      email: z.string().email("Invalid email").optional(),
      phone: z.string().min(10, "Invalid phone").optional(),
      license: z.string().optional(),
      address: z.string().optional(),
    })
    .refine((data) => data.sameAsOwner || data.fullName, {
      message: "Driver name is required if not same as owner",
      path: ["driver.fullName"],
    }),
  inspection: z.object({
    plan: z.enum(["Single", "Dual"] as const, {
      error: "Inspection plan is required",
    }),
    duration: z.enum(["7", "15", "30"] as const, {
      error: "Duration is required",
    }),
  }),
});
type FormData = z.infer<typeof formSchema>;

// Step Components
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

const OwnerDriverInfo = ({ onNext }: { onNext: () => void }) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<FormData>();

  const sameAsOwner = watch("driver.sameAsOwner");
  const ownerFullName = watch("owner.fullName");
  const ownerEmail = watch("owner.email");
  const ownerAddress = watch("owner.address");

  const [countries, setCountries] = useState<Country[] | null>(null);

  // Separate states for owner
  const ownerDropdownRef = useRef<HTMLDivElement>(null);
  const [isOwnerDropdownOpen, setIsOwnerDropdownOpen] = useState(false);
  const [ownerCountryCode, setOwnerCountryCode] = useState("+1");
  const [ownerFlag, setOwnerFlag] = useState<StaticImageData>(Canada);
  const [ownerPhoneNumber, setOwnerPhoneNumber] = useState("");

  // Separate states for driver
  const driverDropdownRef = useRef<HTMLDivElement>(null);
  const [isDriverDropdownOpen, setIsDriverDropdownOpen] = useState(false);
  const [driverCountryCode, setDriverCountryCode] = useState("+1");
  const [driverFlag, setDriverFlag] = useState<StaticImageData>(Canada);
  const [driverPhoneNumber, setDriverPhoneNumber] = useState("");

  const baseUrl = config.api.baseUrl;

  const selectOwnerCountryCode = (data: Country) => {
    setOwnerCountryCode(data.phoneCode);
    setOwnerFlag(data.countryFlag as unknown as StaticImageData);
    setIsOwnerDropdownOpen(false);
    setValue("owner.phone", `${data.phoneCode}${ownerPhoneNumber}`);
  };

  const selectDriverCountryCode = (data: Country) => {
    setDriverCountryCode(data.phoneCode);
    setDriverFlag(data.countryFlag as unknown as StaticImageData);
    setIsDriverDropdownOpen(false);
    setValue("driver.phone", `${data.phoneCode}${driverPhoneNumber}`);
  };

  useEffect(() => {
    const getCountries = async () => {
      const countries = await fetch(`${baseUrl}/api/utils/all-countries`);
      const response = await countries.json();
      setCountries(response.data);
    };
    getCountries();
  }, [baseUrl]);

  // Sync driver fields with owner fields when sameAsOwner is true
  useEffect(() => {
    if (sameAsOwner) {
      setValue("driver.fullName", ownerFullName || "");
      setValue("driver.email", ownerEmail || "");
      setValue("driver.address", ownerAddress || "");
      setDriverCountryCode(ownerCountryCode);
      setDriverFlag(ownerFlag);
      setDriverPhoneNumber(ownerPhoneNumber);
      setValue("driver.phone", `${ownerCountryCode}${ownerPhoneNumber}`);
    }
  }, [
    sameAsOwner,
    ownerFullName,
    ownerEmail,
    ownerAddress,
    ownerCountryCode,
    ownerFlag,
    ownerPhoneNumber,
    setValue,
  ]);

  const handleOwnerPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // Allow only digits
    setOwnerPhoneNumber(value);
    setValue("owner.phone", `${ownerCountryCode}${value}`);
  };

  const handleDriverPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // Allow only digits
    setDriverPhoneNumber(value);
    setValue("driver.phone", `${driverCountryCode}${value}`);
  };
  return (
    <div className="">
      <div className="text-center mb-10">
        <h2 className="text-[22px] font-bold text-[#303030]">
          Owner & Driver Info
        </h2>
        <p className="text-[14px] leading-5 text-[#6F6464]">
          Provide car owner and driver information
        </p>
      </div>
      <h2 className="text-[18px] font-semibold text-[#303030] mb-[10px]">
        Car Owner
      </h2>
      <div className="mb-5">
        <label className="text-[#6F6464] font-semibold text-[12px] mb-[5px]">
          Full name
        </label>
        <input
          {...register("owner.fullName")}
          placeholder="Enter name"
          className="p-[10px] w-full bg-[#F6F6F6] rounded-[6px] focus:outline-none placeholder:text-[#999] placeholder:text-[12px]"
        />
        {errors.owner?.fullName && (
          <p className="text-red-500 text-sm">
            {errors.owner.fullName.message}
          </p>
        )}
      </div>
      <div className="mb-5 flex gap-[10px] items-center">
        <div className="flex-1">
          <label className="text-[#6F6464] font-semibold text-[12px] mb-[5px] block">
            Email
          </label>
          <input
            {...register("owner.email")}
            placeholder="Enter email"
            className="p-[10px] w-full bg-[#F6F6F6] rounded-[6px] focus:outline-none placeholder:text-[#999] placeholder:text-[12px]"
          />
          {errors.owner?.email && (
            <p className="text-red-500 text-sm">{errors.owner.email.message}</p>
          )}
        </div>
        <div className="flex-1">
          <label className="text-[#6F6464] font-semibold text-[12px] mb-[5px] block">
            Phone
          </label>
          <div className="flex h-[45px] w-full rounded-md">
            <div className="relative h-full" ref={ownerDropdownRef}>
              <button
                type="button"
                onClick={() => setIsOwnerDropdownOpen(!isOwnerDropdownOpen)}
                className="h-full flex items-center rounded-md bg-[#F7F7F7] px-3 border-r border-[#e5e5e5]"
              >
                <Image
                  src={ownerFlag}
                  alt="Flag"
                  className="mr-2 h-[20px] w-[24px] rounded-[6px]"
                  width={50}
                  height={50}
                />
                <span className="text-[14px] text-[#04082C]">
                  {ownerCountryCode}
                </span>
                <div className="w-[25px] ml-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                  >
                    <path
                      d="M6.99927 9.68884C6.93099 9.68884 6.86778 9.67687 6.80963 9.65295C6.75149 9.62901 6.69755 9.59125 6.64781 9.53965L4.05905 6.95087C3.97993 6.87363 3.93944 6.77929 3.93756 6.66786C3.93569 6.55643 3.97701 6.45846 4.06152 6.37396C4.14416 6.29132 4.24026 6.25 4.34982 6.25C4.45938 6.25 4.55593 6.29084 4.63947 6.37251L6.99781 8.73366L9.35896 6.37251C9.43689 6.29458 9.53158 6.25468 9.64301 6.2528C9.75444 6.25093 9.85241 6.29132 9.93691 6.37396C10.0195 6.45846 10.0609 6.5555 10.0609 6.66506C10.0609 6.77462 10.0204 6.86989 9.93937 6.95087L7.35061 9.53965C7.29901 9.59125 7.24462 9.62901 7.18746 9.65295C7.13028 9.67687 7.06755 9.68884 6.99927 9.68884Z"
                      fill="#6F6464"
                    />
                  </svg>
                </div>
              </button>
              {isOwnerDropdownOpen && (
                <div className="absolute z-10 mt-1 w-full max-h-60 overflow-auto rounded-md bg-white py-1 shadow-lg border">
                  {countries?.map((country) => (
                    <li
                      key={country.country}
                      className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 cursor-pointer list-none"
                      onClick={() => selectOwnerCountryCode(country)}
                    >
                      {country.countryFlag ? (
                        <Image
                          src={country.countryFlag}
                          alt={country.country}
                          className="h-[20px] w-[24px] rounded-[6px]"
                          width={20}
                          height={20}
                        />
                      ) : (
                        <div className="h-[20px] w-[24px] rounded-[6px] bg-gray-200"></div>
                      )}
                      <span className="text-[14px] text-[#04082C]">
                        {country.phoneCode}
                      </span>
                    </li>
                  ))}
                </div>
              )}
            </div>
            <input
              maxLength={17}
              placeholder="Phone number"
              value={ownerPhoneNumber}
              onChange={handleOwnerPhoneChange}
              className="flex-1 h-[45px] rounded-r bg-[#F7F7F7] px-4 font-openSans text-[14px] text-[#04082C] outline-none placeholder:text-[#7D7D7D]"
            />
          </div>
          {errors.owner?.phone && (
            <p className="text-red-500 text-sm">{errors.owner.phone.message}</p>
          )}
        </div>
      </div>
      <div className="mb-5">
        <label className="text-[#6F6464] font-semibold text-[12px] mb-[5px]">
          Current address (Optional)
        </label>
        <input
          {...register("owner.address")}
          placeholder="Enter address"
          className="p-[10px] w-full bg-[#F6F6F6] rounded-[6px] focus:outline-none placeholder:text-[#999] placeholder:text-[12px]"
        />
        {errors.owner?.address && (
          <p className="text-red-500 text-sm">{errors.owner.address.message}</p>
        )}
      </div>

      <label className="flex justify-end text-[#6F6464] text-[12px] font-medium">
        <input
          type="checkbox"
          {...register("driver.sameAsOwner")}
          className="mr-2"
        />
        Same person
      </label>

      <h2 className="text-[18px] font-semibold text-[#303030] mb-[10px]">
        Car Driver
      </h2>
      <div className="mb-5">
        <label className="text-[#6F6464] font-semibold text-[12px] mb-[5px]">
          Full name
        </label>
        <input
          {...register("driver.fullName")}
          placeholder="Enter name"
          className="p-[10px] w-full bg-[#F6F6F6] rounded-[6px] focus:outline-none placeholder:text-[#999] placeholder:text-[12px]"
          readOnly={sameAsOwner}
          value={sameAsOwner ? ownerFullName || "" : undefined}
        />
        {errors.driver?.fullName && (
          <p className="text-red-500 text-sm">
            {errors.driver.fullName.message}
          </p>
        )}
      </div>
      <div className="mb-5 flex gap-[10px] items-center">
        <div className="flex-1">
          <label className="text-[#6F6464] font-semibold text-[12px] mb-[5px] block">
            Email
          </label>
          <input
            {...register("driver.email")}
            placeholder="Enter email"
            className="p-[10px] w-full bg-[#F6F6F6] rounded-[6px] focus:outline-none placeholder:text-[#999] placeholder:text-[12px]"
            readOnly={sameAsOwner}
            value={sameAsOwner ? ownerEmail || "" : undefined}
          />
          {errors.driver?.email && (
            <p className="text-red-500 text-sm">
              {errors.driver.email.message}
            </p>
          )}
        </div>
        <div className="flex-1">
          <label className="text-[#6F6464] font-semibold text-[12px] mb-[5px] block">
            Phone
          </label>
          <div className="flex h-[45px] w-full rounded-md">
            <div className="relative h-full" ref={driverDropdownRef}>
              <button
                type="button"
                onClick={() => setIsDriverDropdownOpen(!isDriverDropdownOpen)}
                className="h-full flex items-center rounded-l bg-[#F7F7F7] px-3 border-r border-[#e5e5e5]"
                disabled={sameAsOwner}
              >
                <Image
                  src={driverFlag}
                  alt="Flag"
                  className="mr-2 h-[20px] w-[24px] rounded-[6px]"
                  width={50}
                  height={50}
                />
                <span className="text-[14px] text-[#04082C]">
                  {driverCountryCode}
                </span>
                <div className="w-[25px] ml-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                  >
                    <path
                      d="M6.99927 9.68884C6.93099 9.68884 6.86778 9.67687 6.80963 9.65295C6.75149 9.62901 6.69755 9.59125 6.64781 9.53965L4.05905 6.95087C3.97993 6.87363 3.93944 6.77929 3.93756 6.66786C3.93569 6.55643 3.97701 6.45846 4.06152 6.37396C4.14416 6.29132 4.24026 6.25 4.34982 6.25C4.45938 6.25 4.55593 6.29084 4.63947 6.37251L6.99781 8.73366L9.35896 6.37251C9.43689 6.29458 9.53158 6.25468 9.64301 6.2528C9.75444 6.25093 9.85241 6.29132 9.93691 6.37396C10.0195 6.45846 10.0609 6.5555 10.0609 6.66506C10.0609 6.77462 10.0204 6.86989 9.93937 6.95087L7.35061 9.53965C7.29901 9.59125 7.24462 9.62901 7.18746 9.65295C7.13028 9.67687 7.06755 9.68884 6.99927 9.68884Z"
                      fill="#6F6464"
                    />
                  </svg>
                </div>
              </button>
              {isDriverDropdownOpen && !sameAsOwner && (
                <div className="absolute z-10 mt-1 w-full max-h-60 overflow-auto rounded-md bg-white py-1 shadow-lg border">
                  {countries?.map((country) => (
                    <li
                      key={country.country}
                      className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 cursor-pointer list-none"
                      onClick={() => selectDriverCountryCode(country)}
                    >
                      {country.countryFlag ? (
                        <Image
                          src={country.countryFlag}
                          alt={country.country}
                          className="h-[20px] w-[24px] rounded-[6px]"
                          width={20}
                          height={20}
                        />
                      ) : (
                        <div className="h-[20px] w-[24px] rounded-[6px] bg-gray-200"></div>
                      )}
                      <span className="text-[14px] text-[#04082C]">
                        {country.phoneCode}
                      </span>
                    </li>
                  ))}
                </div>
              )}
            </div>
            <input
              maxLength={17}
              placeholder="Phone number"
              value={sameAsOwner ? ownerPhoneNumber : driverPhoneNumber}
              onChange={sameAsOwner ? undefined : handleDriverPhoneChange}
              readOnly={sameAsOwner}
              className="flex-1 h-[45px] rounded-r bg-[#F7F7F7] px-4 font-openSans text-[14px] text-[#04082C] outline-none placeholder:text-[#7D7D7D]"
            />
          </div>
          {errors.driver?.phone && (
            <p className="text-red-500 text-sm">
              {errors.driver.phone.message}
            </p>
          )}
        </div>
      </div>
      <div className="mb-5">
        <label className="text-[#6F6464] font-semibold text-[12px] mb-[5px]">
          Driving license (Optional)
        </label>
        <input
          {...register("driver.license")}
          placeholder="Enter license number"
          className="p-[10px] w-full bg-[#F6F6F6] rounded-[6px] focus:outline-none placeholder:text-[#999] placeholder:text-[12px]"
        />
        {errors.driver?.license && (
          <p className="text-red-500 text-sm">
            {errors.driver.license.message}
          </p>
        )}
      </div>
      <div className="mb-5">
        <label className="text-[#6F6464] font-semibold text-[12px] mb-[5px]">
          Current address (Optional)
        </label>
        <input
          {...register("driver.address")}
          placeholder="Enter address"
          className="p-[10px] w-full bg-[#F6F6F6] rounded-[6px] focus:outline-none placeholder:text-[#999] placeholder:text-[12px]"
          readOnly={sameAsOwner}
          value={sameAsOwner ? ownerAddress || "" : undefined}
        />
        {errors.driver?.address && (
          <p className="text-red-500 text-sm">
            {errors.driver.address.message}
          </p>
        )}
      </div>

      <button
        onClick={onNext}
        className="bg-[#2D65F2] text-white p-3 rounded-md text-[14px] font-semibold w-full"
      >
        Next
      </button>
    </div>
  );
};

const CheckoutForm = ({
  clientSecret,
  onClose,
}: {
  clientSecret: string;
  onClose?: () => void;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);
    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: { card: elements.getElement(CardElement)! },
      }
    );

    if (error) {
      toast.error(error.message || "Payment failed");
    } else if (paymentIntent?.status === "succeeded") {
      toast.success("Payment successful!");
      if (onClose) onClose(); // ✅ Close popup after success
    }

    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-5">
      <label className="text-[#6F6464] font-semibold text-[12px] mb-[5px] block">
        Card details
      </label>
      <div className="p-[10px] bg-[#F6F6F6] rounded-[6px] mb-5">
        <CardElement options={{ hidePostalCode: true }} />
      </div>
      <button
        type="submit"
        disabled={isProcessing || !stripe || !elements}
        className="bg-[#2D65F2] text-white p-3 rounded-md w-full text-[14px] font-semibold"
      >
        {isProcessing ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

const InspectionWorkflow = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useFormContext<FormData>();

  const inspectionPlan = watch("inspection.plan");
  const durations = watch("inspection.duration");

  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [paymentAmount, setPaymentAmount] = useState<string | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const onSubmit = async (data: FormData) => {
    try {
      // Create order
      const orderResponse = await axios.post(
        "https://real-damage.fleetblox.com/api/create_order",
        {
          car_make: data.vehicle.make,
          car_model: data.vehicle.model,
          car_year: Number(data.vehicle.year),
          fuel_type: data.vehicle.fuelType,
          exterior_color: data.vehicle.color || null,
          car_owner_name: data.owner.fullName,
          car_owner_email: data.owner.email,
          car_owner_phone: data.owner.phone,
          car_owner_address: data.owner.address || null,
          driver_name: data.driver.fullName,
          driver_email: data.driver.email,
          driver_phone: data.driver.phone,
          driving_license: data.driver.license || null,
          driver_address: data.driver.address || null,
          inspection_type:
            data.inspection.plan?.toLowerCase() === "single"
              ? "single"
              : "dual",
          trip_duration: Number(data.inspection.duration),
        },
        { headers: { "Content-Type": "application/json" } }
      );

      toast.success("Order created successfully!");
      const tripId = orderResponse.data.trip_id;

      // Create payment intent
      const paymentResponse = await axios.post(
        "https://real-damage.fleetblox.com/api/create_payment_intent",
        { trip_id: tripId },
        { headers: { "Content-Type": "application/json" } }
      );

      setClientSecret(paymentResponse.data.client_secret);
      setPaymentAmount(paymentResponse.data.amount);

      // ✅ Open the payment modal
      setIsPaymentModalOpen(true);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to create order or payment intent.");
    }
  };

  return (
    <div>
      <div className="text-center mb-10">
        <h2 className="text-[22px] font-bold text-[#303030]">
          Inspection workflow
        </h2>
        <p className="text-[14px] leading-5 text-[#6F6464]">
          Select an inspection plan suitable for the trip
        </p>
      </div>
      <div className="mb-[10px]">
        <div
          className={`px-4 py-5 border rounded-[10px] mb-5 ${
            inspectionPlan === "Single"
              ? "border-[#2D65F2] bg-[#F5F9FC]  "
              : "border-[#DFDFDF] bg-white"
          }`}
        >
          <label className="flex items-center gap-[5px]">
            <input
              type="radio"
              value="Single"
              {...register("inspection.plan")}
            />{" "}
            <p className="text-[#151515] text-[16px] font-openSans font-bold capitalize">
              Single Inspection workflow (One-time)
            </p>
          </label>
          <div className="flex items-start text-[#04082C] my-5">
            <span className="text-[32px] font-semibold">$14</span>
            <span className="text-[14px] font-semibold self-end mb-1">.99</span>
          </div>
          <p className="text-[#333] text-[14px] font-openSans leading-5">
            One-time vehicle inspection workflow with report, valid for either
            departure or return within the selected period after purchase.
          </p>
        </div>
        <div
          className={`px-4 py-5 border rounded-[10px] mb-5 ${
            inspectionPlan === "Dual"
              ? "border-[#2D65F2] bg-[#F5F9FC]  "
              : "border-[#DFDFDF] bg-white"
          }`}
        >
          <label className="flex items-center gap-[5px]">
            <input type="radio" value="Dual" {...register("inspection.plan")} />{" "}
            <p className="text-[#151515] text-[16px] font-openSans font-bold capitalize">
              Dual Inspection workflow (departure & return)
            </p>
          </label>
          <div className="flex items-start text-[#04082C] my-5">
            <span className="text-[32px] font-semibold">$24</span>
            <span className="text-[14px] font-semibold self-end mb-1">.99</span>
          </div>
          <p className="text-[#333] text-[14px] font-openSans leading-5">
            Two inspections with reports, One at the time of departure, another
            when returns from the trip.
          </p>
        </div>
      </div>
      {errors.inspection?.plan && (
        <p className="text-red-500 text-sm">{errors.inspection.plan.message}</p>
      )}
      <div className="mb-2 mt-10">
        <h3 className="text-[18px] font-semibold text-[#303030] mb-4">
          Trip duration
        </h3>

        <div className="flex gap-[5px]">
          {["7", "15", "30"].map((days) => (
            <div
              key={days}
              className={`border rounded-md flex p-4 gap-[5px] justify-between w-[180px] ${
                durations === days ? "border-[#2D65F2]" : "border-[#DFDFDF]"
              }`}
            >
              <label className="flex items-center gap-[5px]">
                <input
                  type="radio"
                  value={days}
                  {...register("inspection.duration")}
                />{" "}
                <p
                  className={`text-[16px] font-openSans capitalize font-bold ${
                    durations === days ? "text-[#151515]  " : " text-[#6F6464]"
                  }`}
                >
                  {days} Days
                </p>
              </label>
              <p className="text-[#7D7D7D] text-[12px] font-openSans">
                Use within <br /> 07 days
              </p>
            </div>
          ))}
        </div>
      </div>
      {errors.inspection?.duration && (
        <p className="text-red-500 text-sm">
          {errors.inspection.duration.message}
        </p>
      )}

      <button
        onClick={handleSubmit(onSubmit)}
        className="bg-[#2D65F2] text-white p-3 rounded-md mt-10 w-full text-[14px] font-semibold"
      >
        Proceed to pay
      </button>

      {/* ✅ Payment Modal */}
      <Modal
        title={`Pay $${paymentAmount || ""}`}
        open={isPaymentModalOpen}
        onCancel={() => setIsPaymentModalOpen(false)}
        footer={null}
        centered
        width={450}
      >
        {clientSecret && (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm
              clientSecret={clientSecret}
              onClose={() => setIsPaymentModalOpen(false)}
            />
          </Elements>
        )}
      </Modal>
    </div>
  );
};

// Parent Component
export default function InspectionPage() {
  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      vehicle: {
        make: "",
        model: "",
        year: "",
        fuelType: "Gasoline",
        color: "",
        vin: "",
      },
      owner: { fullName: "", email: "", phone: "", address: "" },
      driver: {
        sameAsOwner: false,
        fullName: "",
        email: "",
        phone: "",
        license: "",
        address: "",
      },
      inspection: { plan: "Single", duration: "7" },
    },
  });
  const { trigger } = methods;
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = async () => {
    const fieldsToValidate: Path<FormData>[] =
      currentStep === 1
        ? ["vehicle"]
        : currentStep === 2
        ? ["owner", "driver"]
        : ["inspection"];
    const isValid = await trigger(fieldsToValidate);
    if (isValid) setCurrentStep((prev) => prev + 1);
  };
  const handleStepClick = async (step: number) => {
    if (step < currentStep) {
      setCurrentStep(step);
      return;
    }
    // For forward, validate previous
    for (let i = currentStep; i < step; i++) {
      let fieldsToValidate: Path<FormData>[] = [];
      if (i === 1) {
        fieldsToValidate = ["vehicle"];
      } else if (i === 2) {
        fieldsToValidate = ["owner", "driver"];
      } else if (i === 3) {
        fieldsToValidate = ["inspection"];
      }
      const isValid = await trigger(fieldsToValidate);
      if (!isValid) return; // Stop if invalid
    }
    setCurrentStep(step);
  };
  const steps = [
    {
      title: "Provide car details",
      component: <VehicleDetails onNext={handleNext} />,
      desc: "Choose make and provide other car info.",
    },
    {
      title: "Submit owner & driver info",
      component: <OwnerDriverInfo onNext={handleNext} />,
      desc: "Provide car owner info and current driver info of this car.",
    },
    {
      title: "Purchase an inspection",
      component: <InspectionWorkflow />,
      desc: "Select an inspection plan suitable for this vehicle and get the trip id.",
    },
  ];
  return (
    <FormProvider {...methods}>
      <div className="bg-white">
        <div className="flex max-w-[1200px] flex-col md:flex-row items-center mx-auto w-full py-[60px] md:py-[120px] px-5 ">
          {/* Left Sidebar (Steps) */}
          <div className="md:w-1/2 w-full">
            <p className="text-[#0336BC] text-[18px] font-openSans font-bold mb-[5px] md:mb-[10px]">
              Protect Your assets
            </p>
            <h1 className="text-[36px] font-bold text-[#04082C] font-montserrat leading-[1.1] mb-[10px] md:mb-5">
              Audit Every Trip <br className="hidden md:block" /> &{" "}
              <span className="text-[#0336BC]">Prevent Costly disputes</span>
            </h1>
            <p className=" text-[#7D7D7D] text-[16px] font-openSans leading-6">
              Simply purchase a one-time or two-time inspection workflow to
              create detailed vehicle condition reports of your vehicles before
              and after each trip.
            </p>
            <div className="mt-8  flex items-center gap-5">
              <div>
                <Image
                  src="/images/trip-audit/3-line.svg"
                  alt="Logo"
                  width={65}
                  height={100}
                />
              </div>
              <div className="space-y-[67px] max-w-[415px]">
                {steps.map((step, index) => (
                  <div
                    key={index}
                    onClick={() => handleStepClick(index + 1)}
                    className={`flex items-center rounded-[16px] px-5 py-4 gap-5 cursor-pointer shadow-[0_4px_5px_0_rgba(0,0,0,0.05)] ${
                      currentStep === index + 1 ? "border border-[#2D65F2]" : ""
                    }`}
                  >
                    <div
                      className={` rounded-full  bg-white border border-[#2D65F2] text-center`}
                    >
                      <span className="text-[12px] font-bold text-[#2D65F2] leading-none w-7 h-7 flex items-center justify-center">
                        {index + 1}
                      </span>
                    </div>
                    <div>
                      <p className="text-[#333] text-[18px] font-bold">
                        {step.title}
                      </p>
                      <p className="text-[16px] text-[#7D7D7D] font-openSans leading-6">
                        {step?.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="border-r h-[600px] mx-[60px] border-[#DFDFDF]"></div>
          {/* Right Content (Dynamic) */}
          <div className="md:w-1/2 w-full">
            {steps[currentStep - 1].component}
          </div>
        </div>
      </div>
    </FormProvider>
  );
}
