"use client";
import React, { useEffect, useMemo, useState } from "react";
import { ChevronLeft, Search } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useProgressUpdater } from "@/hooks/useProgress";
import useBrandCarList from "@/hooks/useCompatibility";
import Loader from "./Loader";
import NotCompatibilityDialog from "./NotCompatibilityDialog";
import NextStepButton from "@/components/ui/shared/NextStepButton";

interface CarBrand {
  brand: string;
  brandLogo: string;
  year: string;
}

const BrandSelector = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const countryParam = searchParams.get("country");
  const [searchQuery, setSearchQuery] = useState("");
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setSearchQuery("");
  }, [pathname]);
  const { brandCarList, selectedBrands, setSelectedBrands, loading } =
    useBrandCarList(countryParam);

  const handleBrandSelect = (brand: string) => {
    const updatedBrands = selectedBrands.includes(brand)
      ? selectedBrands.filter((b) => b !== brand)
      : [...selectedBrands, brand];
    setSelectedBrands(updatedBrands);
    localStorage.setItem("brands", JSON.stringify(updatedBrands));
  };

  const filteredBrands = useMemo(() => {
    return brandCarList.filter((brand: CarBrand) =>
      brand.brand.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, brandCarList]);

  const { setCustomProgress, progress } = useProgressUpdater();

  const handleNext = () => {
    if (disabled || !selectedBrands.length) return;
    setDisabled(true);
    setCustomProgress(progress + 10);
    router.push(`/collections/select-brand/${selectedBrands.join(",")}`);
  };

  const handleBack = () => {
    setCustomProgress(progress - 10);
    router.push("/getting-started");
  };

  return (
    <main className="flex flex-col h-[94vh] w-full max-w-[900px] mx-auto px-4 sm:px-6">
      {/* Header */}
      <div className="flex-none">
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

        <div className="text-center mb-8">
          <h2 className="font-bold text-[20px] sm:text-[28px] font-openSans text-[#04082C] ">
            Select Your Vehicle Makes
          </h2>
          <p className="font-openSans text-base text-[#7D7D7D] mx-auto ">
            Choose your vehicle makes currently in your fleet or those you wish
            to add
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4 w-full">
          <div className="flex items-center w-full bg-[#F7F7F7] rounded-lg px-4 py-3">
            <Search className="text-[#7D7D7D] mr-3" size={20} />
            <input
              type="text"
              aria-describedby="email-help"
              placeholder="Search vehicle makes"
              className="w-full bg-transparent font-openSans text-base text-[#333] outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Selected Count */}
        {selectedBrands.length > 0 ? (
          <div className="my-3">
            <p className="font-openSans text-sm font-[600] text-[#04082C]">
              {selectedBrands.length} brand{selectedBrands.length > 1 && "s"}{" "}
              make selected
            </p>
          </div>
        ) : (
          <div className="my-3">
            <p className="font-openSans text-sm font-semibold text-[#333333]">
              0 make selected
            </p>
          </div>
        )}
      </div>

      {/* Scrollable Brand List */}

      <div className=" min-h-0 overflow-y-auto flex-grow pb-2 scrollbar-hidden">
        <div className="space-y-3">
          {loading ? (
            <div className="flex justify-center items-center h-[200px]">
              <Loader />
            </div>
          ) : filteredBrands.length > 0 ? (
            filteredBrands.map((brand: CarBrand) => (
              <div
                key={brand.brand}
                className={`flex items-center px-4 py-3 gap-x-5 h-[64px] rounded-xl cursor-pointer transition-all duration-200 hover:bg-[#F5F9FC] border ${selectedBrands.includes(brand.brand)
                    ? "border-[#B8CBFC] bg-[#2D65F20F]"
                    : "border-[#F7F7F7]"
                  }`}
                onClick={() => handleBrandSelect(brand.brand)}
              >
                {brand.brandLogo && (
                  <div className="flex-shrink-0 w-10 h-8 ">
                    <Image
                      src={brand.brandLogo}
                      alt={brand.brand}
                      width={200}
                      height={200}
                      className="w-full h-full object-contain mix-blend-multiply"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="font-openSans text-base font-semibold text-[#04082C]">
                    {brand.brand.replace(/[-_]/g, " ")}
                  </h3>
                  {/* <p className="font-openSans text-sm text-[#7D7D7D]">
                    Year: {brand.year}
                  </p> */}
                </div>
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center h-[200px] text-[#6F6464]">
              No brands found matching your search
            </div>
          )}
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="mt-6 flex flex-none w-full  justify-center items-center gap-4 lg:flex-row">
        <NextStepButton
          onClick={handleNext}
          disabled={!selectedBrands.length || disabled}
        />
      </div>
      <NotCompatibilityDialog title="Can’t Find My Make" />
    </main>
  );
};

export default BrandSelector;
