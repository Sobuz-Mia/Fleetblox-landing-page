import { useFormContext } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { formSchema } from "./TripAuditInspection";
import z from "zod";
import Image, { StaticImageData } from "next/image";
import { Country } from "./../../(gettingStarted)/components/SelectCountry";
import config from "@/utils/config";
import Canada from "../../../../public/images/canada.png";
type FormData = z.infer<typeof formSchema>;
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
      <div className="text-center mb-5 md:mb-10">
        <h2 className="text-[18px] md:text-[22px] font-bold text-[#303030]">
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
      <div className="mb-5 flex flex-col md:flex-row gap-[10px] md:items-center">
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
      <div className="mb-5 flex flex-col md:flex-row gap-[10px] md:items-center">
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
export default OwnerDriverInfo;
