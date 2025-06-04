/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronUp } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useProgressUpdater } from "@/hooks/useProgress";
import close from "@/../public/images/access_point/down.svg";
import open from "@/../public/images/access_point/up.svg";
import AccessPoint from "./Access";
import axios from "axios";
import { CarBrandsData as OriginalCarBrandsData } from "@/app/(gettingStarted)/components/compatibility";

// Extended type with region property
interface CarBrandsData extends OriginalCarBrandsData {
  region: string;
}
import Loader from "@/app/(gettingStarted)/components/Loader";
import toast from "react-hot-toast";
import config from "@/utils/config";

interface CountryObject {
  country: string;
  countryCode: string;
  countryFlag: string;
  countryShort: string;
  phoneCode: string;
}

const ModelSelector = ({ params }: any) => {
  const { setCustomProgress, progress } = useProgressUpdater();
  const [totalBrands, setTotalBrands] = useState(0);

  const [expandedCountries, setExpandedCountries] = useState<Set<string>>(
    new Set()
  );
  const [expandedModel, setExpandedModel] = useState<string | null>(null);
  const router = useRouter();
  const resolvedParams = React.use(params);
  const modelParam = (resolvedParams as { model: string }).model;
  const [loading, setLoading] = useState(false);
  const [regionData, setRegionData] = useState<{
    [key: string]: CarBrandsData;
  }>({});
  const [regionsWithCountryData, setRegionsWithCountryData] = useState<{
    [key: string]: CountryObject[];
  }>({});
  const [currentBrandIndex, setCurrentBrandIndex] = useState(0);
  const [countrySpecificModels, setCountrySpecificModels] = useState<{
    [countryCode: string]: any[];
  }>({});
  const [selectedModels, setSelectedModels] = useState<{
    [countryCode: string]: string[];
  }>({});

  const baseUrl = config.api.baseUrl;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const selectedCountriesData = localStorage.getItem("selectedCountries");
        const selectedCountries = selectedCountriesData
          ? JSON.parse(selectedCountriesData)
          : [];



        // Group countries by region as before
        const regionsWithCountries = selectedCountries.reduce(
          (acc: { [key: string]: string[] }, country: string) => {
            let region: string;
            if (country === "United States of America") region = "US";
            else if (country === "Canada") region = "CA";
            else region = "EUROPE";
            if (!acc[region]) acc[region] = [];
            acc[region].push(country);
            return acc;
          },
          {}
        );

        // Fetch all countries
        const countriesResponse = await axios.get(

          `${baseUrl}/api/utils/all-countries`,
        );
        const allCountries = countriesResponse.data.data;

        // Map country names to country objects
        const regionsWithCountryData = Object.entries(
          regionsWithCountries
        ).reduce((acc, [region, countryNames]) => {
          const countries = (countryNames as string[])
            .map((name) =>
              allCountries.find((c: CountryObject) => c.country === name)
            )
            .filter(Boolean);
          acc[region] = countries;
          return acc;
        }, {} as { [key: string]: CountryObject[] });

        setRegionsWithCountryData(regionsWithCountryData);

        // Fetch models for each region with retry logic
        const regions = Object.keys(regionsWithCountries);

        // Function to make API call with retry logic
        const fetchWithRetry = async (region: string, retries = 3, delay = 1000) => {
          for (let attempt = 0; attempt < retries; attempt++) {
            try {
              const response = await axios.get(
                `${baseUrl}/api/dummy/check-compatibility-matrix?region=${region}`,

                { timeout: 10000 } // 10 second timeout
              );
              return response;
            } catch (error: any) {
              console.log(`Error fetching data for region ${region} (Attempt ${attempt + 1}/${retries}):`, error.message);

              if (attempt === retries - 1) {
                // This was the last attempt, throw the error
                throw error;
              }

              // Wait before retrying
              await new Promise(resolve => setTimeout(resolve, delay));
              // Increase delay for next attempt (exponential backoff)
              delay *= 2;
            }
          }
        };

        // Create promises with fallback to empty arrays if a region fails
        const regionPromises = regions.map(async (region) => {
          try {
            return await fetchWithRetry(region);
          } catch (error) {
            console.error(`Failed to fetch data for region ${region} after multiple attempts:`, error);
            toast.error(`Failed to load data for ${region} region`);
            // Return a mock response with empty data to prevent breaking the app
            return { data: { data: [] } };
          }
        });

        const responses = await Promise.all(regionPromises);
        const regionData = responses.reduce((acc, res, index) => {
          const region = regions[index];
          // Make sure res.data.data exists and is an array before mapping
          const brandsData = res?.data?.data || [];
          if (Array.isArray(brandsData)) {
            // @ts-expect-error
            acc[region] = brandsData.map((brand: any) => ({
              ...brand,
              region,
            }));
          } else {
            console.error(`Invalid data format for region ${region}:`, res?.data);
            // @ts-expect-error
            acc[region] = []; // Set empty array for invalid data
          }
          return acc;
        }, {} as { [key: string]: CarBrandsData });

        setRegionData(regionData);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Error loading vehicle data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredModels = React.useMemo(() => {
    if (!Object.keys(regionData).length) return [];
    const allBrands = Object.values(regionData).flat();
    const decodedBrandNames = decodeURIComponent(modelParam).split(",");
    setTotalBrands(decodedBrandNames.length);
    return allBrands.filter((brand) =>
      decodedBrandNames.some(
        (name) =>
          brand.brand.toLowerCase().replace(/[_\-\s]/g, "") ===
          name.toLowerCase().replace(/[_\-\s]/g, "")
      )
    );
  }, [regionData, modelParam]);

  const combinedBrands = React.useMemo(() => {
    // Group brands by name (case-insensitive)
    const brandGroups: Record<string, any[]> = {};

    filteredModels.forEach((brand) => {
      const normalizedName = brand.brand.toLowerCase();
      if (!brandGroups[normalizedName]) {
        brandGroups[normalizedName] = [];
      }
      brandGroups[normalizedName].push(brand);
    });

    // Combine models from all regions for each brand
    return Object.values(brandGroups).map((brands) => {
      // Use the first brand as the base
      const combined = { ...brands[0] };
      // Add a special property to hold all regions this brand appears in
      combined.regions = brands.map((b) => b.region);

      return combined;
    });
  }, [filteredModels]);

  useEffect(() => {
    if (
      filteredModels.length > 0 &&
      currentBrandIndex < filteredModels.length
    ) {
      const currentBrandKey = `${filteredModels[currentBrandIndex].brand}-${filteredModels[currentBrandIndex].region}`;
      const storedBrandModels = JSON.parse(
        localStorage.getItem("brandModels") || "{}"
      );
      setSelectedModels(storedBrandModels[currentBrandKey] || []);
    }
  }, [currentBrandIndex, filteredModels]);



  // 2. Update your useEffect that loads country models
  useEffect(() => {
    if (
      combinedBrands.length > 0 &&
      currentBrandIndex < combinedBrands.length
    ) {
      const currentBrand = combinedBrands[currentBrandIndex];
      const loadCountryModels = async () => {
        setLoading(true);

        try {
          // Get all regions this brand belongs to
          const regions = currentBrand.regions || [currentBrand.region];

          // Get all countries from all regions this brand belongs to
          const allCountries: CountryObject[] = [];
          regions.forEach((region: any) => {
            const countriesForRegion = regionsWithCountryData[region] || [];
            allCountries.push(...countriesForRegion);
          });

          // Initialize country-specific models with empty arrays
          const countryModels: { [countryCode: string]: any[] } = {};

          // For each country, try to find models in its own region first
          await Promise.all(
            allCountries.map(async (country) => {
              // Find which region this country belongs to
              let countryRegion = "EUROPE";
              if (country.country === "United States") countryRegion = "US";
              else if (country.country === "Canada") countryRegion = "CA";

              // Look for the brand in that region's data
              const regionBrands = regionData[countryRegion] || [];
              const brandInRegion = regionBrands.find(
                (b) =>
                  b.brand.toLowerCase() === currentBrand.brand.toLowerCase()
              );

              // Use region-specific models if available, otherwise use combined models
              countryModels[country.countryCode] =
                brandInRegion?.models || currentBrand.models || [];
            })
          );

          setCountrySpecificModels(countryModels);

          // Load saved selections
          // Rest of your code for loading selections remains the same
          const countrySelections: { [countryCode: string]: string[] } = {};
          if (typeof window !== "undefined") {
            // ... your existing selection loading code
          }

          setSelectedModels(countrySelections);
        } catch (error) {
          console.error("Error loading country-specific models:", error);
        } finally {
          setLoading(false);
        }
      };

      loadCountryModels();
    }
  }, [currentBrandIndex, combinedBrands, regionsWithCountryData, regionData]);

  const handleModelSelect = (model: string, country: CountryObject) => {
    if (!combinedBrands[currentBrandIndex]) return;

    const currentBrand = combinedBrands[currentBrandIndex];
    // Determine which region this country belongs to
    let countryRegion = "EUROPE";
    if (country.country === "United States") countryRegion = "US";
    else if (country.country === "Canada") countryRegion = "CA";

    const key = `${currentBrand.brand}-${countryRegion}-${country.countryCode}`;

    // Update the selected models state correctly
    setSelectedModels((prevSelected) => {
      const currentSelected = prevSelected[country.countryCode] || [];
      const newSelected = currentSelected.includes(model)
        ? currentSelected.filter((m) => m !== model)
        : [...currentSelected, model];

      const updatedSelections = {
        ...prevSelected,
        [country.countryCode]: newSelected,
      };

      // Update localStorage with the updated state
      if (typeof window !== "undefined") {
        try {
          const storedModels = JSON.parse(
            localStorage.getItem("brandModels") || "{}"
          );
          storedModels[key] = newSelected;
          localStorage.setItem("brandModels", JSON.stringify(storedModels));
        } catch (e) {
          console.error("Error updating localStorage:", e);
        }
      }

      return updatedSelections;
    });
  };

  const calculateProgress = 60 / totalBrands;

  const handleNext = () => {
    // Check if any models are selected for any country
    const hasSelections = Object.values(selectedModels).some(
      (models) => models && models.length > 0
    );

    if (!hasSelections) {
      toast.error("Please select at least one model for any country");
      return;
    }

    if (currentBrandIndex < combinedBrands.length - 1) {
      setCurrentBrandIndex((prev) => prev + 1);
      setCustomProgress(progress + calculateProgress);
    } else {
      router.push("/collections/compatible");
    }
  };

  const handleNotFindModel = () => {
    if (currentBrandIndex < filteredModels.length - 1) {
      setCurrentBrandIndex((prev) => prev + 1);
      setCustomProgress(progress + calculateProgress);
    } else {
      router.push("/collections/compatible");
    }
  };

  const backButton = () => {
    if (currentBrandIndex > 0) {
      setCurrentBrandIndex((prev) => prev - 1);
      setCustomProgress(progress - calculateProgress);
    } else {
      router.back();
      setCustomProgress(progress - 10);
    }
  };

  const currentBrandData = combinedBrands[currentBrandIndex];
  // Replace your current countries memo with this version
  const currentCountries = React.useMemo(() => {
    // Instead of filtering by region, get ALL selected countries
    const allSelectedCountries: CountryObject[] = [];

    // Combine countries from all regions
    Object.values(regionsWithCountryData).forEach((countries) => {
      allSelectedCountries.push(...countries);
    });

    return allSelectedCountries;
  }, [regionsWithCountryData]);

  const [initialExpansionDone, setInitialExpansionDone] = useState(false);

  // Replace your current auto-expand effect with this fixed version
  useEffect(() => {
    // Only auto-expand on initial load, not after user interactions
    if (currentCountries.length > 0 && !initialExpansionDone) {
      // Use setExpandedCountries instead of setExpandedCountry
      setExpandedCountries(new Set([currentCountries[0].countryCode]));
      setInitialExpansionDone(true);
    }
  }, [currentCountries, initialExpansionDone]);

  // Add this effect to log what's happening

  return (
    <main className="flex flex-col h-[94vh] w-full max-w-[900px] mx-auto px-4 sm:px-6 ">
      <div className="flex-none">
        <div
          onClick={backButton}
          className="mb-4 flex cursor-pointer items-center gap-1"
        >
          <ChevronLeft size={16} className="text-[#999]" />
          <span className="font-openSans text-sm font-semibold text-[#999]">
            Back
          </span>
        </div>

        <div className="text-center mb-6">
          <h2 className="font-bold text-[20px] sm:text-[28px] font-openSans text-[#04082C] ">
            Select Your Vehicle Models
          </h2>
          <p className="font-openSans text-base text-[#7D7D7D] mx-auto ">
            Select vehicle models for each chosen make based on their registered
            countries
          </p>
        </div>

        {currentBrandData && (
          <div className="mb-8 flex items-center flex-col">
            {currentBrandData.brandLogo && (
              <Image
                className="h-[60px] w-auto object-contain"
                src={currentBrandData.brandLogo}
                alt="brand logo"
                width={100}
                height={100}
              />
            )}
            <h1 className="text-[#002D9F] font-openSans font-bold text-3xl mt-0.5">
              {currentBrandData.brand.replace(/[-_]/g, " ")}
            </h1>
          </div>
        )}
      </div>

      {/* Country wise brand selection */}
      <section className="flex-1 flex-col overflow-y-auto h-[calc(100vh-400px)] mb-4 scrollbar-hidden">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <Loader />
          </div>
        ) : currentCountries.length > 0 ? (
          <div className="space-y-4 pb-4">
            {currentCountries.map((country) => (
              <div
                key={country.countryCode}
                className={`border rounded-[16px] overflow-hidden transition-all duration-200 ${expandedCountries.has(country.countryCode)
                  ? "border-[#DFDFDF] shadow-sm"
                  : "border-[#DFDFDF]"
                  }`}
              >
                {/* Country Header - Always visible */}
                <div
                  className="p-4 flex items-center justify-between cursor-pointer "
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpandedCountries((prev) => {
                      const newSet = new Set(prev);
                      if (newSet.has(country.countryCode)) {
                        newSet.delete(country.countryCode);
                      } else {
                        newSet.add(country.countryCode);
                      }
                      return newSet;
                    });
                  }}
                >
                  <div className="flex items-center flex-1">
                    {/* Collapse/Expand icon on the right */}
                    <div className="flex-shrink-0 mr-5">
                      {expandedCountries.has(country.countryCode) ? (
                        <ChevronUp className="size-[18px] text-[#666] transition-transform" />
                      ) : (
                        <ChevronDown className="size-[18px] text-[#666] transition-transform" />
                      )}
                    </div>
                    <div className="flex-shrink-0 w-[28px] h-[28px] rounded-full overflow-hidden mr-3 border border-gray-300">
                      <Image
                        src={country.countryFlag}
                        alt={country.country}
                        width={200}
                        height={200}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="font-semibold text-[#04082C] font-openSans">
                      {country.country}
                    </span>

                    {/* Show selection count */}
                    {/* {selectedModels[country.countryCode]?.length > 0 && (
                      <span className="ml-2 bg-[#EEF3FD] text-[#2D65F2] text-xs px-2 py-0.5 rounded-full">
                        {selectedModels[country.countryCode].length} selected
                      </span>
                    )} */}
                  </div>
                </div>

                {/* Expandable Content */}
                {expandedCountries.has(country.countryCode) && (
                  <div className="p-4 space-y-2.5  bg-white scrollbar-hidden">
                    {loading ? (
                      <Loader />
                    ) : countrySpecificModels[country.countryCode]?.length >
                      0 ? (
                      countrySpecificModels[country.countryCode].map(
                        (model) => (
                          <div
                            key={model.name}
                            className="flex justify-between flex-col items-center border-b border-[#DFDFDF]/50 p-4 cursor-pointer  scrollbar-hidden"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="flex items-center justify-between w-full">
                              <div
                                className="flex items-center w-full"
                                onClick={() =>
                                  handleModelSelect(model.name, country)
                                }
                              >
                                <input
                                  type="checkbox"
                                  checked={
                                    selectedModels[
                                      country.countryCode
                                    ]?.includes(model.name) || false
                                  }
                                  aria-describedby="model-selection"
                                  className="mr-2 cursor-pointer"
                                  onChange={() => { }} // Required for controlled component
                                />
                                <span className="font-semibold w-full text-[#333] font-openSans leading-relaxed text-sm">
                                  {model.name
                                    .replace("(Unknown)", "")
                                    .replace("Electric", "EV")}
                                </span>
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setExpandedModel((prev) =>
                                    prev ===
                                      `${country.countryCode}-${model.name}`
                                      ? null
                                      : `${country.countryCode}-${model.name}`
                                  );
                                }}
                                className="w-5 h-5 flex items-center justify-center"
                              >
                                <Image
                                  src={
                                    expandedModel ===
                                      `${country.countryCode}-${model.name}`
                                      ? open
                                      : close
                                  }
                                  alt="toggle"
                                  className="size-[18px]"
                                />
                              </button>
                            </div>
                            {expandedModel ===
                              `${country.countryCode}-${model.name}` && (
                                <AccessPoint permission={model.endpoints} />
                              )}
                          </div>
                        )
                      )
                    ) : (
                      <div className="text-center py-6 text-[#7D7D7D] bg-[#FAFAFA] rounded-lg">
                        No models available for this country
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center py-8 text-[#7D7D7D]">
              No countries available for this brand
            </div>
          </div>
        )}
      </section>

      <div className="flex-none mt-6 flex flex-col-reverse items-center gap-4">
        <button
          onClick={handleNotFindModel}
          className="w-full font-openSans text-[#7D7D7D] px-[14px] py-[8px] font-bold text-[14px] rounded-md"
        >
          {`Can’t find my make`}
        </button>
        <button
          className={`w-full text-white px-[14px] py-[10px] font-openSans rounded-md ${Object.values(selectedModels).some((models) => models.length > 0)
            ? "bg-[#2D65F2]"
            : "bg-[#2D65F2]/50"
            }`}
          disabled={
            !Object.values(selectedModels).some((models) => models.length > 0)
          }
          onClick={handleNext}
        >
          Next Step
        </button>
      </div>
    </main>
  );
};

export default ModelSelector;
