/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { TransformedCarData } from "@/utils/transformCompatibilityData";
import { CarBrandsData } from "@/app/(gettingStarted)/components/compatibility";
import toast from "react-hot-toast";
import config from "@/utils/config";

const useBrandCarList = (initialCountry: string | null) => {
  const [brandCarList, setBrandCarList] = useState<CarBrandsData>([]);
  const [countrySelect, setCountrySelect] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [storedBrandModels, setStoredBrandModels] = useState<
    Record<string, string[] | null>
  >({});
  const [loading, setLoading] = useState(false);
  const [vins, setVins] = useState<TransformedCarData[] | null>(null);
  const [country, setCountry] = useState<string>("");
  const baseUrl = config.api.baseUrl;

  // Initialize from localStorage and URL params
  useEffect(() => {
    if (typeof window !== "undefined") {
      const brands = localStorage.getItem("brands");
      const VINS = localStorage.getItem("VINS_RESULT");

      if (VINS) {
        const parsedVins: TransformedCarData[] = JSON.parse(VINS);
        setVins(parsedVins);
      }
      setStoredBrandModels(
        JSON.parse(localStorage.getItem("brandModels") || "{}")
      );
      if (brands) setSelectedBrands(JSON.parse(brands));
    }
  }, []);

  // Add this function to process the stored brand models
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const rawBrandModels = localStorage.getItem("brandModels");

        if (!rawBrandModels) return;

        const brandModelsData = JSON.parse(rawBrandModels);

        const processedBrandModels: Record<string, string[] | null> = {};

        // Process each country-specific entry
        Object.entries(brandModelsData).forEach(([key, models]) => {
          // Replace underscores with spaces for consistent normalization
          const [originalBrand, region, countryCode] = key.split("-");
          const normalizedBrand = originalBrand
            .replace(/_/g, " ")
            .toLowerCase();

          // Only process entries with actual selections
          if (Array.isArray(models) && models.length > 0) {
            if (!processedBrandModels[normalizedBrand]) {
              processedBrandModels[normalizedBrand] = [];
            }
            // Merge models from all country entries while preserving case
            processedBrandModels[normalizedBrand] = [
              ...new Set([
                ...(processedBrandModels[normalizedBrand] || []),
                ...models,
              ]),
            ];
          }
        });

        // Handle brands with no selections
        Object.keys(processedBrandModels).forEach((brand) => {
          if (processedBrandModels[brand]?.length === 0) {
            processedBrandModels[brand] = null;
          }
        });

        setStoredBrandModels(processedBrandModels);
      } catch (error) {
        console.error("Error processing brand models:", error);
        setStoredBrandModels({});
      }
    }
  }, []);

  // Process country parameter from URL
  useEffect(() => {
    if (initialCountry) {
      const regions = initialCountry.split(",");
      setCountrySelect(regions);
      setCountry(initialCountry);
      localStorage.setItem("country", initialCountry);
    }
  }, [initialCountry]);

  // Fetch brand data for selected regions
  useEffect(() => {
    const fetchBrandData = async () => {
      if (countrySelect.length === 0) return;

      try {
        setLoading(true);
        // Create raw JSON array string
        const regionParam = `["${countrySelect.join('","')}"]`;

        const { data } = await axios.get(
          `${baseUrl}/api/dummy/check-compatibility-common`,
          {
            params: {
              region: regionParam,
            },
            paramsSerializer: (params) => {
              // Bypass default encoding and maintain raw format
              return `region=${params.region}`;
            },
          }
        );

        setBrandCarList(data.data);
        localStorage.setItem("brandCarList", JSON.stringify(data.data));
      } catch (error) {
        console.error("Error fetching brand data:", error);
        toast.error("Failed to load vehicle makes");
      } finally {
        setLoading(false);
      }
    };

    fetchBrandData();
  }, [countrySelect]);

  return {
    vins,
    loading,
    brandCarList,
    countrySelect,
    selectedBrands,
    setSelectedBrands,
    storedBrandModels,
    country,
  };
};

export default useBrandCarList;
