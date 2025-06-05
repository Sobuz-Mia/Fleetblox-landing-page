"use client";
import { ChevronDown } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";
import { Country } from "@/app/(gettingStarted)/components/SelectCountry";
// import { TContactFormData } from "@/types/types"; // Removed unused import
import Canada from "../../../../../public/images/canada.png";
import React from "react";
import config from "@/utils/config";
// import DownArrow from "@/components/icons/DownArrow"; // Removed incorrect import

// Define a base interface for props that CountryCodeSelection needs
interface FormWithCountryCode {
  countryCode: string;
  flag: StaticImageData | string; // Adjust 'any' to be more specific if possible, e.g., StaticImageData or string for URL
  // Add any other fields from TContactFormData that CountryCodeSelection *actually* uses or modifies here.
  // If it only uses/modifies countryCode and flag, this is sufficient.
}

// Make the component generic
const CountryCodeSelection = <T extends FormWithCountryCode>({
  setFormData,
  formData,
}: {
  setFormData: React.Dispatch<React.SetStateAction<T>>;
  formData: T;
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [countries, setCountries] = useState<Country[] | null>(null);
  const baseUrl = config.api.baseUrl;


  useEffect(() => {
    if (typeof window !== "undefined") {
      //   setBrandModels(localStorage.getItem("brandModels") || "");
      //   setBrands(localStorage.getItem("brands") || "");
      //   setCountry(localStorage.getItem("country") || "");
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

  // Close dropdown when clicking outside
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

  const selectCountryCode = (data: Country) => {
    setFormData((prev: T) => ({
      ...prev,
      countryCode: data.phoneCode,
      flag: data.countryFlag as unknown as StaticImageData,
    }));
    setIsDropdownOpen(false);
  };
  // Close dropdown when clicking outside
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
  return (
    <div className="relative h-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="h-full flex items-center pr-1 bg-white border-r border-[#e5e5e5]"
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
        <div
          className="absolute z-10 mt-1 w-[100px] max-h-[180px] overflow-y-auto rounded-md bg-white py-1 shadow-lg border"
          onWheel={(e) => e.stopPropagation()}
        >
          <div className="">
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
        </div>
      )}
    </div>
  );
};

export default CountryCodeSelection;
