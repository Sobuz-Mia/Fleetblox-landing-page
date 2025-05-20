/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import { ChevronLeft, Search } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useProgressUpdater } from "@/hooks/useProgress";

import { getCode } from "country-list";
import toast from "react-hot-toast";
import Loader from "./Loader";
import NotCompatibilityDialog from "./NotCompatibilityDialog";
import NextStepButton from "@/components/ui/shared/NextStepButton";
import Head from "next/head";


export interface Country {
  country: string;
  countryCode: string;
  countryFlag: string;
  countryShort: string;
  phoneCode: string;
}

const SelectCountry = () => {
  const { setCustomProgress, progress, setCurrentStep } = useProgressUpdater();
  // Update the cleanup useEffect
  useEffect(() => {
    setCurrentStep(0);

    // Add client-side check
    if (typeof window !== "undefined") {
      localStorage.removeItem("country");
      localStorage.removeItem("countries");
      localStorage.removeItem("brands");
      localStorage.removeItem("brandModels");
      localStorage.removeItem("VINS");
      localStorage.removeItem("VINS_RESULT");
      localStorage.removeItem("compatibility");
      localStorage.removeItem("selectedCountries");
    }
  }, []);

  const router = useRouter();
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [countries, setCountries] = useState<Country[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCountries = localStorage.getItem("countries");
      if (savedCountries) {
        try {
          setSelectedCountries(JSON.parse(savedCountries));
        } catch (e: any) {
          // Handle invalid JSON
          console.log(e);
          setSelectedCountries([]);
        }
      }
    }

    const getCountries = async () => {
      try {
        setLoading(true);
        const countries = await fetch(
          "https://api.fleetblox.com/api/utils/all-countries"
        );
        const response = await countries.json();
        setCountries(response.data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch countries");
      } finally {
        setLoading(false);
      }
    };

    getCountries();
  }, []);

  const filteredCountries = countries?.filter((country) =>
    country.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCountrySelect = (country: Country) => {
    // Toggle selection: if already selected, remove it; otherwise add it
    setSelectedCountries((prev) => {
      if (prev.includes(country.country)) {
        return prev.filter((c) => c !== country.country);
      } else {
        return [...prev, country.country];
      }
    });
  };

  // Save selected countries to localStorage whenever the selection changes
  useEffect(() => {
    if (selectedCountries.length > 0) {
      localStorage.setItem("countries", JSON.stringify(selectedCountries));
      // localStorage.setItem(
      //   "selectedCountries",
      //   JSON.stringify(selectedCountries)
      // );
    } else {
      localStorage.removeItem("countries");
    }
  }, [selectedCountries]);

  const handleNext = () => {
    setDisabled(true);
    if (disabled) {
      return;
    }

    // Store selected countries in localStorage
    localStorage.setItem(
      "selectedCountries",
      JSON.stringify(selectedCountries)
    );

    // Process selected countries into groups (US, CA, EUROPE)
    const groups = selectedCountries.map((country) => {
      const code = getCode(country);
      if (code === "US") return "US";
      if (code === "CA") return "CA";
      return "EUROPE";
    });

    // Remove duplicates and sort in order US, CA, EUROPE
    const uniqueGroups = Array.from(new Set(groups)).sort((a, b) => {
      const order = ["US", "CA", "EUROPE"];
      return order.indexOf(a) - order.indexOf(b);
    });

    const countryParam = uniqueGroups.join(",");

    setCustomProgress(progress + 10);

    // Determine the route
    if (uniqueGroups.length === 1 && uniqueGroups[0] === "US") {
      // router.push(`/collections/compatibility?country=${countryParam}`);
      router.push(`/collections/select-brand?country=${countryParam}`);
    } else {
      router.push(`/collections/select-brand?country=${countryParam}`);
    }
    // Clear other storage items when moving forward
    localStorage.removeItem("brands");
    localStorage.removeItem("brandModels");
    localStorage.removeItem("VINS");
    localStorage.removeItem("brandCarList");
    localStorage.removeItem("VINS_RESULT");
    localStorage.removeItem("compatibility");
  };

  // Function to remove a country from selection
  // const removeCountry = (country: string) => {
  //   setSelectedCountries((prev) => prev.filter((c) => c !== country));
  // };

  const handleBack = () => {
    router.back()
  };

  return (
    <>
      <Head>
        <link
          rel="canonical"
          href="https://www.fleetblox.com/collections/select-country"
        />
      </Head>
      <main className="flex flex-col h-[94vh] w-full max-w-[900px] mx-auto px-4 sm:px-6 ">
        {/* Header - Fixed at the Top */}
        <div
          onClick={handleBack}
          className="mb-4 flex cursor-pointer items-center gap-1"
          aria-label="Get started with FleetBlox"
        >
          <ChevronLeft size={16} className="text-[#999]" />
          <span className="font-openSans text-sm font-semibold text-[#999]">
            Back
          </span>
        </div>
        <div className="my-4 text-center flex-none">
          <h2 className="font-bold text-[20px] sm:text-[28px] font-openSans text-[#04082C] ">
            Select Registered Countries
          </h2>
          <p className="font-openSans text-[14px] leading-[155%] sm:text-[16px] text-[#7D7D7D] mx-auto">
            Choose all the countries where your fleet vehicles were originally
            registered.
          </p>

        </div>

        {/* Main Content - Scrollable */}
        <div className="flex-grow overflow-y-auto scrollbar-hidden pb-4">
          {/* Search Bar */}
          <div className="relative mb-4 w-full">
            <div className="flex items-center w-full bg-[#F7F7F7] rounded-md px-4 py-4">
              <Search className="text-[#7D7D7D] mr-3" size={20} />
              <input
                type="text"
                aria-describedby="email-help"
                placeholder="Search country"
                className="w-full bg-[#F7F7F7] font-openSans text-[14px] text-[#333] outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Selected Countries Chips */}
          {selectedCountries.length > 0 && (
            <div className="my-3 mx-1">
              <p className="font-openSans text-sm font-[600] mb-2">
                {selectedCountries.length}{" "}
                {selectedCountries.length === 1 ? "country" : "countries"}{" "}
                selected
              </p>
              {/* <div className="flex flex-wrap gap-2 mb-4">
              {selectedCountries.map((country) => (
                <div
                  key={country}
                  className="px-3 py-1.5 bg-[#EEF3FD] rounded-full flex items-center gap-1.5 border border-[#B8CBFC]"
                >
                  <span className="text-sm font-medium text-[#2D65F2]">
                    {country}
                  </span>
                  <button
                    onClick={() => removeCountry(country)}
                    className="text-[#2D65F2] hover:bg-[#2D65F20F] rounded-full p-0.5"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div> */}
            </div>
          )}

          {/* Scrollable Country List */}
          <div className="h-full overflow-y-auto scrollbar-hidden">
            <div className="space-y-3">
              {loading ? (
                <div className="flex justify-center items-center h-[200px]">
                  <Loader />
                </div>
              ) : filteredCountries && filteredCountries.length > 0 ? (
                filteredCountries.map((country) => (
                  <div
                    key={country.country}
                    className={`flex items-center p-4 rounded-[12px] cursor-pointer transition-all duration-200 hover:bg-[#F5F9FC] border ${selectedCountries.includes(country.country)
                      ? "border-[#B8CBFC] bg-[#2D65F20F]"
                      : "border-[#F7F7F7]"
                      }`}
                    onClick={() => handleCountrySelect(country)}
                  >
                    <div className="flex-shrink-0 w-[28px] h-[28px] rounded-full overflow-hidden mr-4 border border-gray-300">
                      <Image
                        src={country.countryFlag}
                        alt={country.country}
                        width={200}
                        height={200}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="font-[400] md:font-semibold text-[14px] font-openSans sm:text-[16px] text-[#04082C]">
                      {country.country}
                    </span>
                  </div>
                ))
              ) : (
                <div className="flex justify-center items-center h-[200px] text-[#6F6464]">
                  No countries found matching your search
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer - Fixed at the Bottom */}
        <div className="flex flex-col justify-center items-center gap-4 flex-none">
          <NextStepButton
            onClick={handleNext}
            disabled={selectedCountries.length === 0 || disabled}
          />
        </div>

        <NotCompatibilityDialog title="Can't Find My Country" />
      </main>
    </>
  );
};

export default SelectCountry;
