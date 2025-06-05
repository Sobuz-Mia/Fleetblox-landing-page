/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { ChevronDown } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import Canada from "../../../../../public/images/canada.png";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import axios from "axios";

import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

import trueIcon from "@/../public/images/true.svg";
import falseIcon from "@/../public/images/false.svg";
import useBrandCarList from "@/hooks/useCompatibility";
import { Country } from "../../components/SelectCountry";
import Loader from "../../components/Loader";
import { AxiosErrorResponse } from "@/interface/AxiosErrorResponse";
import config from "@/utils/config";

interface PlanType {
  id?: string;
  price?: number;
  slot?: number;
  fleet?: string;
  annually?: boolean;
}

const CheckOutPage = () => {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const {
    selectedBrands,
    storedBrandModels,

    vins,
    countrySelect,
  } = useBrandCarList(null);

  const [loading, setLoading] = useState(false);
  const [brandModels, setBrandModels] = useState("");
  const [brands, setBrands] = useState("");
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState<Country[] | null>(null);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);

  const [selectedPlan, setSelectedPlan] = useState<PlanType>({});
  const [interestedUser, setInterestedUser] = useState({});
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState("");
  const [brandCarList, setBrandCarList] = useState<any[]>([]);
  const baseUrl = config.api.baseUrl;
  const isDev = config.isDevelopment;

  useEffect(() => {
    // Client-side initialization
    const storedSelectedPlan = localStorage.getItem("selectedPlan");
    const storedInterestedUser = localStorage.getItem("interestedUser");
    if (storedSelectedPlan) setSelectedPlan(JSON.parse(storedSelectedPlan));
    if (storedInterestedUser)
      setInterestedUser(JSON.parse(storedInterestedUser));
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        // Load brand car list
        const brandCarListUser = localStorage.getItem("brandCarList");
        if (brandCarListUser) {
          setBrandCarList(JSON.parse(brandCarListUser));
        }
      } catch (error) {
        console.error("Error loading brand car list:", error);
        setBrandCarList([]);
      }
    }
  }, []);


  const calculateDisplayTotal = () => {

    let basePrice = (selectedPlan?.price ?? 0) * (selectedPlan?.slot ?? 0);


    if (selectedPlan?.annually) {
      basePrice = basePrice * 12;
    }

    return basePrice;
  };


  const oneTimeSet = 100;


  const TotalForModal = calculateDisplayTotal();

  const totalAmount = TotalForModal + oneTimeSet;

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    countryCode: "+1",
    flag: Canada,
  });



  useEffect(() => {
    if (typeof window !== "undefined") {
      setBrandModels(localStorage.getItem("brandModels") || "");
      setBrands(localStorage.getItem("brands") || "");
      setCountry(localStorage.getItem("country") || "");
      const storedSelectedCountries = localStorage.getItem("selectedCountries");
      setSelectedCountries(
        storedSelectedCountries ? JSON.parse(storedSelectedCountries) : []
      );
      //   setPlan(localStorage.getItem("price_plan") || "");
      //   setVinsResult(localStorage.getItem("VINS_RESULT") || "");
    }

    const getCountries = async () => {
      const countries = await fetch(

        `${baseUrl}/api/utils/all-countries`
      );
      const response = await countries.json();

      setCountries(response.data);
    };

    getCountries();
  }, []);

  const showAccessPoint = (modelName: string) => {
    if (isOpen === modelName) {
      setIsOpen("");
    } else {
      setIsOpen(modelName);
    }
  };

  useEffect(() => {
    if (countries?.length && country) {
      const selectedCountryFetch = countries.find((c) => c.country === country);
      setFormData((prev) => ({
        ...prev,
        countryCode: selectedCountryFetch?.phoneCode.toString() || "+1",
        flag: selectedCountryFetch?.countryFlag as unknown as StaticImageData,
      }));
    }
  }, [countries, country]);

  const contactNumber = `${formData.phone}`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const selectCountryCode = (data: Country) => {
    setFormData((prev) => ({
      ...prev,
      countryCode: data.phoneCode,
      flag: data.countryFlag as unknown as StaticImageData,
    }));
    setIsDropdownOpen(false);
  };



  const filteredCompatibleBrands = useCallback(() => {
    return brandCarList
      .filter((brand: any) =>
        selectedBrands.some(
          (selectedBrand) =>
            selectedBrand.toLowerCase() === brand.brand.toLowerCase()
        )
      )
      .map((brand: any) => {
        // Normalize brand name from API the same way
        const normalizedBrand = brand.brand.replace(/_/g, " ").toLowerCase();
        const hasModels =
          storedBrandModels[normalizedBrand] &&
          storedBrandModels[normalizedBrand]!.length > 0;

        return {
          brand: brand.brand,
          brandLogo: brand.brandLogo,
          compatible: !!hasModels,
          models: storedBrandModels[normalizedBrand] || [],
        };
      });
  }, [selectedBrands, storedBrandModels, brandCarList]);

  if (filteredCompatibleBrands().length > 0) {
    const areAllUncompatible = filteredCompatibleBrands()?.every(
      (brand: any) => brand.compatible === false
    );
    if (!areAllUncompatible) {
      console.log("areAllUncompatible", areAllUncompatible);
    } else {
      console.log(areAllUncompatible, "areAllUncompatible");
      router.push("/result/not-compatible");
    }
  }

  if (vins && vins?.length > 0) {
    const areAllUncompatible = vins?.every(
      (brand) => brand.isCompatible === false
    );
    if (!areAllUncompatible) {
      console.log("areAllUncompatible", areAllUncompatible);
    } else {
      console.log(areAllUncompatible, "areAllUncompatible");
      router.push("/result/not-compatible");
    }
  }


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChangePlan = () => {
    router.back();
    localStorage.removeItem("selectedPlan");
  };

  const filterSelectedCountry = useMemo(
    () =>
      countries?.filter((country) =>
        selectedCountries.includes(country.country)
      ),
    [countries, selectedCountries]
  );

  useEffect(() => {
    if (filterSelectedCountry && filterSelectedCountry.length > 0) {
      setFormData((prev) => ({
        ...prev,
        countryCode: filterSelectedCountry[0].phoneCode,
        flag: filterSelectedCountry[0]
          .countryFlag as unknown as StaticImageData,
      }));
    }
  }, [filterSelectedCountry]);

  const submitData = {
    email: formData.email,
    fullName: formData.fullName,
    planId: selectedPlan?.id,
    phone: contactNumber,
    isFromPreLunching: true,
    successUrl: isDev ? `https://test-landing.fleetblox.com/result/paymentSuccess` : `https://fleetblox.com/result/paymentSuccess`,
    cancelUrl: isDev ? `https://test-landing.fleetblox.com/result/paymentFaild` : `https://fleetblox.com/result/paymentFaild`,
    slot: selectedPlan?.slot,
    price: selectedPlan?.price,
    interval: selectedPlan?.annually ? "year" : "month",
    // @ts-ignore
    phoneCountryId: filterSelectedCountry?.[0]?.id,
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);


      const { data } = await axios.post(
        `${baseUrl}/api/payment/create-session`,
        submitData
      );

      if (data.statusCode === 200) {
        // localStorage.clear();
        return router.push(data?.data.sessionUrl);
      }
      setLoading(false);
    } catch (error) {
      const axiosError = error as AxiosErrorResponse;
      setLoading(false);

      const errorMessage =
        axiosError?.response?.data?.error?.message ||
        "An unexpected error occurred";
      console.error(errorMessage, "test");
      toast.error(errorMessage);
    }
  };

  return (
    <main className="flex flex-col h-[94vh] w-full  mx-auto px-5 xl:px-6 py-6 sm:py-8 scrollbar-hidden">
      <div className="flex flex-shrink-0 flex-col items-center">
        <div className="mb-8 text-center">
          <h2 className="font-bold text-[22px] sm:text-[22px] font-openSans text-[#04082C] ">
            Complete Your Purchase
          </h2>
          <p className="font-openSans text-[14px] leading-relaxed  text-[#7D7D7D] mx-auto">
            Confirm your vehicle compatibility, provide contact info and
            continue to payment.
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row justify-between md:gap-x-[20px] xl:gap-x-[40px]">
        <div className="basis-2/3">
          {/* Summary Section */}
          <div className="rounded-lg">
            <div className="flex items-center justify-between">
              <div className="my-2 font-openSans text-[14px] font-[700] text-[#6F6464]">
                Subscription Summary
              </div>
              <div className="">
                <button
                  onClick={handleChangePlan}
                  className="text-[#2D65F2] font-openSans font-bold text-[14px]"
                >
                  Change Plan
                </button>
              </div>
            </div>
            {/* monthly  */}
            <div className="flex flex-col md:flex-row md:justify-between rounded-[12px] border border-[#f7f7f7] p-3 md:p-4">
              <div className="flex items-center gap-x-[10px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                >
                  <path
                    d="M4.40775 21.737C3.9352 21.737 3.53296 21.5711 3.20103 21.2391C2.86909 20.9072 2.70312 20.505 2.70312 20.0324V10.7648C2.70312 10.2922 2.86909 9.88999 3.20103 9.55806C3.53296 9.22613 3.9352 9.06016 4.40775 9.06016H19.5946C20.0672 9.06016 20.4694 9.22613 20.8013 9.55806C21.1333 9.88999 21.2992 10.2922 21.2992 10.7648V20.0324C21.2992 20.505 21.1333 20.9072 20.8013 21.2391C20.4694 21.5711 20.0672 21.737 19.5946 21.737H4.40775ZM10.3118 18.8159L15.4377 15.3986L10.3118 11.9813V18.8159ZM4.39253 7.63513V6.23613H19.6098V7.63513H4.39253ZM7.35215 4.81111V3.41211H16.6502V4.81111H7.35215Z"
                    fill="#2D65F2"
                  />
                </svg>
                <div className="">
                  <h1 className="text-[#04082C] font-openSans text-[16px] font-[600] leading-[160%]">
                    {selectedPlan?.fleet} (
                    {selectedPlan?.annually ? "Annual" : "Monthly"})
                  </h1>
                  <p className="text-[12px] font-openSans font-normal text-[#7d7d7d]">
                    Pricing plan
                  </p>
                </div>
              </div>
              <h1>
                <span className="text-[22px] font-bold text-[#04082C] font-openSans">
                  ${Math.floor(selectedPlan?.price ?? 0)}
                </span>
                <span className="text-[14px] font-[400] leading-[155%] text-[#7d7d7d]">
                  .{selectedPlan?.price?.toFixed(2).split(".")[1]} /
                  {selectedPlan?.annually ? "month" : "month"} per slot
                </span>
              </h1>
            </div>
            {/* vehicle slots */}
            <div className="mt-[10px] flex-col md:flex-row flex md:justify-between rounded-md border border-[#F6F6F6] p-3 md:p-4">
              <div className="flex items-start justify-start gap-x-[10px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M8 11.5263L9.5 7.26316H18.5L20 11.5263M18.5 16.2632C18.1022 16.2632 17.7206 16.1134 17.4393 15.8469C17.158 15.5804 17 15.219 17 14.8421C17 14.4652 17.158 14.1038 17.4393 13.8373C17.7206 13.5708 18.1022 13.4211 18.5 13.4211C18.8978 13.4211 19.2794 13.5708 19.5607 13.8373C19.842 14.1038 20 14.4652 20 14.8421C20 15.219 19.842 15.5804 19.5607 15.8469C19.2794 16.1134 18.8978 16.2632 18.5 16.2632ZM9.5 16.2632C9.10218 16.2632 8.72064 16.1134 8.43934 15.8469C8.15804 15.5804 8 15.219 8 14.8421C8 14.4652 8.15804 14.1038 8.43934 13.8373C8.72064 13.5708 9.10218 13.4211 9.5 13.4211C9.89782 13.4211 10.2794 13.5708 10.5607 13.8373C10.842 14.1038 11 14.4652 11 14.8421C11 15.219 10.842 15.5804 10.5607 15.8469C10.2794 16.1134 9.89782 16.2632 9.5 16.2632ZM19.92 6.78947C19.71 6.22105 19.14 5.84211 18.5 5.84211H9.5C8.86 5.84211 8.29 6.22105 8.08 6.78947L6 12.4737V20.0526C6 20.3039 6.10536 20.5449 6.29289 20.7225C6.48043 20.9002 6.73478 21 7 21H8C8.26522 21 8.51957 20.9002 8.70711 20.7225C8.89464 20.5449 9 20.3039 9 20.0526V19.1053H19V20.0526C19 20.3039 19.1054 20.5449 19.2929 20.7225C19.4804 20.9002 19.7348 21 20 21H21C21.2652 21 21.5196 20.9002 21.7071 20.7225C21.8946 20.5449 22 20.3039 22 20.0526V12.4737L19.92 6.78947ZM14.92 3.94737C14.71 3.37895 14.14 3 13.5 3H4.5C3.86 3 3.29 3.37895 3.08 3.94737L1 9.63158V17.2105C1 17.4618 1.10536 17.7028 1.29289 17.8804C1.48043 18.0581 1.73478 18.1579 2 18.1579H3C3.26522 18.1579 3.51957 18.0581 3.70711 17.8804C3.89464 17.7028 4 17.4618 4 17.2105V13.3358C3.81541 13.2731 3.64569 13.1765 3.50053 13.0516C3.35538 12.9267 3.23764 12.7759 3.15405 12.6078C3.07046 12.4397 3.02266 12.2577 3.01339 12.0722C3.00411 11.8866 3.03355 11.7011 3.1 11.5263C3.32 10.9579 3.87 10.5789 4.5 10.5789H4.57L5.27 8.68421H3L4.5 4.42105H15.09L14.92 3.94737Z"
                    fill="#2D65F2"
                  />
                </svg>

                <div className="">
                  <h1 className="text-[#04082C] font-openSans text-[16px] font-[600] leading-[160%]">
                    Total Vehicle Slot
                    {/* (
                    {selectedPlan?.annually ? "Annually" : "Monthly"}) */}
                  </h1>
                  <p className="text-[12px] font-openSans font-normal text-[#7d7d7d]">
                    Fleet Size
                  </p>
                </div>
              </div>
              <h1>
                <span className="text-[22px] font-bold text-[#04082C] font-openSans">
                  {selectedPlan?.slot}
                </span>
                {/* <span className="ml-1 text-[12px] font-normal text-[#999]">
                  slots
                </span> */}
              </h1>
            </div>
          </div>

          {/* Selected Vehicle and VINs */}
          <div className="max-h-[400px] hidden lg:block overflow-y-auto md:pr-2 scrollbar-hidden">
            <h3 className="mb-2 mt-5 text-[14px] font-openSans font-[700] text-[#7d7d7d]">
              {!vins ? "Selected Vehicles" : "Selected Vins"}{" "}
            </h3>
            <div className="space-y-[10px] font-openSans">
              {loading && !vins ? (
                <Loader />
              ) : (
                filteredCompatibleBrands().map((brand: any) => (
                  <div
                    key={brand.brand}
                    className="flex items-center justify-between rounded-md border  px-2 py-[10px]"
                  >
                    <div className="flex items-center ">
                      <Image
                        src={brand.brandLogo}
                        alt={brand.brand}
                        width={100}
                        height={100}
                        className="flex h-[40px] w-[50px] items-center justify-center object-contain mix-blend-multiply"
                      />
                      <div className="flex flex-col gap-2">
                        <h4 className="font-openSans text-[14px] leading-[160%] font-semibold text-[#04082C]">
                          {brand.brand}
                        </h4>

                        {brand.compatible &&
                          brand.models &&
                          brand.models.length > 0 ? (
                          <div>
                            {/* Preview first 2 models */}
                            <p className="font-openSans text-[12px] font-[500] text-[#6F6464]">
                              {brand.models.slice(0, 2).join(", ")}
                              {brand.models.length > 2 && (
                                <button
                                  onClick={() => showAccessPoint(brand.brand)}
                                  className="ml-1 text-[#2D65F2]"
                                >
                                  {isOpen === brand.brand
                                    ? `, ${brand.models.length - 2} less`
                                    : `, ${brand.models.length - 2} more`}
                                  {/* Toggle button text */}

                                  {/* {isOpen === brand.brand ? "less" : "more"} */}
                                </button>
                              )}
                            </p>

                            {/* Expanded model list */}
                            {isOpen === brand.brand && (
                              <div className="mt-2 pl-2 border-l-2 border-[#EEF3FD]">
                                {brand.models.map((model: any, idx: number) => (
                                  <p
                                    key={idx}
                                    className="font-openSans text-[12px] font-[500] text-[#6F6464] mb-1"
                                  >
                                    • {model}
                                  </p>
                                ))}
                              </div>
                            )}
                          </div>
                        ) : (
                          <p className="font-openSans text-[12px] ml-2 font-[500] text-[#6F6464] italic">
                            {brand.compatible
                              ? "No models selected"
                              : "Incompatible models"}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="w-[110px]">
                      {brand.compatible ? (
                        <div className="flex items-center gap-x-2">
                          <Image
                            src={trueIcon}
                            width={16}
                            height={16}
                            alt="success"
                          />
                          <span className="font-openSans text-[12px]  text-[#2D65F2]">
                            Compatible
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-x-2">
                          <Image
                            src={falseIcon}
                            width={16}
                            height={16}
                            alt="failed"
                          />
                          <span className="font-openSans text-[12px]  text-[#F00]">
                            Incompatible
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}

              {vins &&
                vins?.map((vin, idx) => (
                  <div
                    key={idx}
                    className="rounded-[12px] border border-[#f7f7f7] p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-[10px]">
                        {vin.isCompatible ? (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              showAccessPoint(vin.vin);
                            }}
                            className="flex h-5 w-5 items-center justify-center"
                          >
                            {/* <Image
                              className="size-[20px] object-cover"
                              src={isOpen === vin.vin ? open : close}
                              alt="toggle"
                            /> */}
                          </button>
                        ) : (
                          <div className="h-5 w-5"></div>
                        )}
                        <div className="text-left font-openSans font-semibold text-[14px] leading-[160%] text-[#04082C]">
                          {`VIN - ${vin.vin}`}
                        </div>
                      </div>
                      <div className="w-[110px]">
                        {vin.isCompatible ? (
                          <div className="flex items-center gap-[5px]">
                            <Image
                              src={trueIcon}
                              width={16}
                              height={16}
                              alt="success"
                            />
                            <span className="font-openSans text-[14px] text-[#2D65F2]">
                              Compatible
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-[5px]">
                            <Image
                              src={falseIcon}
                              width={16}
                              height={16}
                              alt="failed"
                            />
                            <span className="font-openSans text-[14px] text-[#F00]">
                              Incompatible
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          {/* MAKE THIS PART SCROLL ABLE */}
        </div>

        {/* Contact Info & Payment */}
        <div className="mt-10 basis-1/3 rounded-[16px] lg:p-5 lg:shadow-[0px_4px_12px_0px_rgba(0,0,0,0.14)] lg:border border-[#f7f7f7] flex flex-col h-full">
          <form
            onSubmit={handleSubmit}
            id="submitForm"
            className="flex flex-col justify-between h-full gap-4"
          >
            {/* Contact Info Section */}
            <div className="flex-none lg:min-h-[35vh] max-h-[50vh] lg:h-[36vh]">
              <h1 className="mb-4 font-openSans text-[14px] font-bold text-[#7d7d7d]">
                Contact Info
              </h1>
              <div className="space-y-4">
                {/* Full Name Input */}
                <div>
                  <input
                    type="text"
                    id="fullName"
                    required
                    aria-describedby="Enter your fullName"
                    maxLength={50}
                    name="fullName"
                    placeholder="Full name"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full h-12 rounded bg-[#F7F7F7] px-4 font-openSans text-[14px] text-[#04082C] outline-none placeholder:text-[#7D7D7D]"
                  />
                </div>

                {/* Email Input */}
                <div>
                  <input
                    type="email"
                    id="email"
                    required
                    name="email"
                    aria-describedby="email-help"
                    maxLength={50}
                    placeholder="Business email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full h-12 rounded bg-[#F7F7F7] px-4 font-openSans text-[14px] text-[#04082C] outline-none placeholder:text-[#7D7D7D]"
                  />
                </div>

                {/* Phone Number Input */}
                <div className="w-full">
                  <div className="flex h-12 w-full">
                    {/* Country Code Dropdown */}
                    <div className="relative h-full" ref={dropdownRef}>
                      <button
                        type="button"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="h-full flex items-center rounded-l bg-[#F7F7F7] px-3 border-r border-[#e5e5e5]"
                      >
                        {formData.flag ? (
                          <Image
                            src={formData.flag}
                            alt="Flag"
                            className="mr-2 h-[20px] w-[24px] rounded-[6px]"
                            width={50}
                            height={50}
                          />
                        ) : (
                          <Image
                            src={Canada}
                            alt="Flag"
                            className="mr-2 h-[20px] w-[24px] rounded-[6px]"
                            width={50}
                            height={50}
                          />
                        )}
                        <span className="text-[14px] text-[#04082C]">
                          {formData.countryCode}
                        </span>
                        <ChevronDown className="ml-1 h-4 w-4 text-[#04082C]" />
                      </button>

                      {/* Dropdown Menu */}
                      {isDropdownOpen && (
                        <div className="absolute z-10 mt-1 w-full max-h-60 overflow-auto rounded-md bg-white py-1 shadow-lg border">
                          {countries?.map((country) => (
                            <li
                              key={country.country}
                              className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 cursor-pointer list-none"
                              onClick={() => selectCountryCode(country)}
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

                    {/* Phone Number Input */}
                    <input
                      type="number"
                      id="phone"
                      name="phone"
                      maxLength={17}
                      required
                      aria-describedby="Phone-help"
                      placeholder="Phone number"
                      value={formData.phone}
                      onChange={handleChange}
                      className="flex-1 h-12 rounded-r bg-[#F7F7F7] px-4 font-openSans text-[14px] text-[#04082C] outline-none placeholder:text-[#7D7D7D]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Summary Section */}
            <div className="lg:mt-auto mt-5 lg:pt-4 lg:border-t border-[#f7f7f7]">
              <div className="flex flex-col gap-3">
                <div className="flex justify-between">
                  <span className="text-[14px] hidden lg:block font-openSans lg:font-semibold lg:text-[#7D7D7D] text-[#04082C]">
                    Subscription fee (
                    {selectedPlan?.annually ? "Annual" : "Monthly"})
                  </span>
                  <p className="text-[14px] block lg:hidden font-openSans lg:font-semibold lg:text-[#7D7D7D] text-[#04082C]">
                    Subscription fee <br />
                    <span className="text-[#7D7D7D]">
                      {selectedPlan?.annually ? "Annual" : "Monthly"}
                    </span>
                  </p>
                  <span className="text-[14px] font-openSans text-[#04082C] font-bold">
                    ${TotalForModal.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-[14px] hidden lg:block font-openSans lg:font-semibold lg:text-[#7D7D7D] text-[#04082C]">
                    Platform setup fee
                  </span>
                  <p className="text-[14px] block lg:hidden font-openSans lg:font-semibold lg:text-[#7D7D7D] text-[#04082C]">
                    Platform setup <br />
                    <span className="text-[#7D7D7D]">One time</span>
                  </p>
                  <span className="text-[14px] font-openSans text-[#04082C] font-bold">
                    ${oneTimeSet.toFixed(2)}
                  </span>
                </div>

                {/* Total Amount */}
                <div className="flex justify-between mt-3 pt-2 lg:border-t border-[#f7f7f7]">
                  <span className="text-[16px] text-[#04082C] font-openSans font-semibold">
                    Total
                  </span>
                  <span className="text-[28px] font-montserrat text-[#04082C] font-bold">
                    ${totalAmount.toFixed(2)}
                  </span>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full h-12 mt-6 hidden lg:block rounded-lg bg-[#2D65F2] hover:bg-[#2D65F2]/90 text-white font-semibold font-openSans text-[16px]"
                >
                  {loading ? "Processing..." : "Proceed to Payment"}
                </Button>
                {/* Submit button for mobile view */}
                <Button
                  type="submit"
                  className="w-full h-12 mt-6 block lg:hidden rounded-lg bg-[#2D65F2] hover:bg-[#2D65F2]/90 text-white font-semibold font-openSans text-[16px]"
                >
                  {loading ? "Processing..." : "Checkout"}
                </Button>
                <div className="border-b block lg:hidden border-[#f7f7f7] my-8"></div>
              </div>
            </div>
          </form>
        </div>

        {/* selected vehicle and VINS for mobile view*/}
        <div className=" lg:hidden block  pr-2 pb-5">
          <h3 className="mb-2 mt-5 text-[14px] font-openSans font-[700] text-[#7d7d7d]">
            {!vins ? "Selected Vehicles" : "Selected Vins"}{" "}
          </h3>
          <div className="space-y-[10px] font-openSans">
            {loading && !vins ? (
              <Loader />
            ) : (
              filteredCompatibleBrands().map((brand: any) => (
                <div
                  key={brand.brand}
                  className="flex items-center justify-between rounded-md border px-[10px] py-[10px]"
                >
                  <div className="flex items-center gap-[10px]">
                    <Image
                      src={brand.brandLogo}
                      alt={brand.brand}
                      width={100}
                      height={100}
                      className="flex h-[40px] w-[50px] items-center justify-center object-contain mix-blend-multiply"
                    />
                    <div className="flex flex-col gap-2">
                      <h4 className="font-openSans text-[14px] leading-[160%] font-semibold text-[#04082C]">
                        {brand.brand}
                      </h4>

                      {brand.compatible &&
                        brand.models &&
                        brand.models.length > 0 ? (
                        <div>
                          {/* Preview first 2 models */}
                          <p className="font-openSans text-[12px] font-[500] text-[#6F6464]">
                            {brand.models.slice(0, 2).join(", ")}
                            {brand.models.length > 2 && (
                              <button
                                onClick={() => showAccessPoint(brand.brand)}
                                className="ml-1 text-[#2D65F2]"
                              >
                                +{brand.models.length - 2} more
                              </button>
                            )}
                          </p>

                          {/* Expanded model list */}
                          {isOpen === brand.brand && (
                            <div className="mt-2 pl-2 border-l-2 border-[#EEF3FD]">
                              {brand.models.map((model: any, idx: number) => (
                                <p
                                  key={idx}
                                  className="font-openSans text-[12px] font-[500] text-[#6F6464] mb-1"
                                >
                                  • {model}
                                </p>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <p className="font-openSans text-[12px] font-[500] text-[#6F6464] italic">
                          {brand.compatible
                            ? "No models selected"
                            : "Incompatible models"}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="w-[110px]">
                    {brand.compatible ? (
                      <div className="flex justify-end">
                        <Image
                          src={trueIcon}
                          width={16}
                          height={16}
                          alt="success"
                        />
                        <span className="font-openSans text-[14px] text-[#2D65F2]">
                          Compatible
                        </span>
                      </div>
                    ) : (
                      <div className="flex justify-end">
                        <Image
                          src={falseIcon}
                          width={16}
                          height={16}
                          alt="failed"
                        />
                        <span className="font-openSans text-[14px] text-[#F00]">
                          Incompatible
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}

            {vins &&
              vins?.map((vin, idx) => (
                <div
                  key={idx}
                  className="rounded-[12px] border border-[#f7f7f7] p-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-[10px]">
                      {/* {vin.isCompatible ? (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              showAccessPoint(vin.vin);
                            }}
                            className="flex h-5 w-5 items-center justify-center"
                          >
                            <Image
                              className="size-[20px] object-cover"
                              src={isOpen === vin.vin ? open : close}
                              alt="toggle"
                            />
                          </button>
                        ) : (
                          <div className="h-5 w-5"></div>
                        )} */}
                      <div className="text-left font-openSans font-semibold text-[14px] leading-[160%] text-[#04082C]">
                        {`VIN - ${vin.vin}`}
                      </div>
                    </div>
                    <div className="w-[110px]">
                      {vin.isCompatible ? (
                        <div className="flex items-center gap-[5px]">
                          <Image
                            src={trueIcon}
                            width={16}
                            height={16}
                            alt="success"
                          />
                          <span className="font-openSans text-[12px] text-[#2D65F2]">
                            Compatible
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-[5px]">
                          <Image
                            src={falseIcon}
                            width={16}
                            height={16}
                            alt="failed"
                          />
                          <span className="font-openSans text-[12px] text-[#F00]">
                            Incompatible
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        {/* selected vehicle and VINS for mobile view ends*/}
      </div>
    </main>
  );
};

export default CheckOutPage;
