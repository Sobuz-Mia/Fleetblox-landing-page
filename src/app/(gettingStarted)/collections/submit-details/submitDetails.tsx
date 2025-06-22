"use client";
import { ChevronDown } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import Canada from "@/../public/images/canada.png";
import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useProgressUpdater } from "@/hooks/useProgress";
import axios from "axios";
import { AxiosError } from "axios";
import config from "@/utils/config";

export interface Country {
  country: string;
  countryCode: string; // Add additional fields as needed
  countryFlag: string;
  countryShort: string;
  phoneCode: string;
}

const SubmitDetails = () => {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { setCustomProgress } = useProgressUpdater();
  const [loading, setLoading] = useState(false);
  const [brandModels, setBrandModels] = useState("");
  const [brands, setBrands] = useState("");
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState<Country[] | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    brandName: "",
    fleetSize: "",
    businessType: "",
    teamSize: "",
    locations: "",
    country: "",
    state: "",
    city: "",
    postalCode: "",
    address: "",
    phone: "",
    countryCode: "+1",
    flag: Canada,
  });
  // console.log();

  const [plan, setPlan] = useState("");
  const [vinsResult, setVinsResult] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      setBrandModels(localStorage.getItem("brandModels") || "");
      setBrands(localStorage.getItem("brands") || "");
      setCountry(localStorage.getItem("country") || "");
      setPlan(localStorage.getItem("price_plan") || "");
      setVinsResult(localStorage.getItem("VINS_RESULT") || "");
    }

    const getCountries = async () => {
      const countries = await fetch(
        `${config.api.baseUrl}/api/utils/all-countries`,
      );
      const response = await countries.json();

      setCountries(response.data);
    };

    getCountries();
  }, []);

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

  const contactNumber = `${formData.countryCode}${formData.phone}`;

  const submitData = {
    email: formData.email,
    fullName: formData.fullName,
    brandName: formData.brandName,
    fleetSize: formData.fleetSize,
    businessType: formData.businessType,
    teamSize: formData.teamSize,
    locations: formData.locations,
    country: formData.country,
    state: formData.state,
    city: formData.city,
    postalCode: formData.postalCode,
    address: `${formData.state},${formData.city},${formData.country},`,
    contactNumber: contactNumber,
    brandModels: JSON.parse(brandModels || "{}"),
    brands: JSON.parse(brands || "[]"),
    brandCountry: formData.country,
    selectedCountry: country,
    selectedVin: JSON.parse(vinsResult || "[]"),
    plan: JSON.parse(plan || "{}"),
    isFromPreLunching: true,
  };

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    setCustomProgress(100);

    // Regular expression for validating an email address
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      setLoading(false);
      return; // Prevent further execution if email is invalid
    }

    console.log(submitData, 'submitData'); 

    try {
      setLoading(true);
      const { data } = await axios.post(
        `${config.api.baseUrl}/api/InterestedUser/create`,
        submitData
      );
      console.log(data);
      if (data.statusCode === 201) {
        localStorage.clear();
        return router.push("/");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);

      const axiosError = error as AxiosError<{ error?: { message?: string } }>;
      const errorMessage =
        axiosError?.response?.data?.error?.message ||
        "An unexpected error occurred";
      console.error(errorMessage);
      toast.error(errorMessage);
    }
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
    <div className="flex flex-col h-[94vh] w-full max-w-[950px] mx-auto px-4 sm:px-6">
      {/* Header Section - Fixed */}
      <div className="flex-none mt-[30px]">
        <div className="text-center mb-8">
          <h2 className="font-bold text-[20px] sm:text-[28px] font-openSans text-[#04082C] ">
            Submit your details
          </h2>
          <p className="font-openSans text-base text-[#7D7D7D] mx-auto ">
            Provide your personal and brand information.
          </p>
        </div>

        {/* Search Bar */}
      </div>

      {/* Form Section - Scrollable */}
      <div className="flex-1 overflow-hidden px-[20px] xs:px-[30px] sm:px-[60px] mt-[40px]">
        <div className="h-full overflow-y-auto">
          <form
            onSubmit={handleSubmit}
            id="submitForm"
            className=" flex flex-col gap-[40px]"
          >
            <div>
              <h1 className=" mb-[20px] text-ti_light_black text-[18px] font-semibold font-inter">
                Personal info
              </h1>
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-ti_dark_grey mb-[5px] text-[12px] font-semibold font-inter"
                >
                  Full name
                </label>
                <input
                  type="text"
                  id="fullName"
                  required
                  maxLength={50}
                  name="fullName"
                  placeholder="Enter name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="input-form"
                />
              </div>
              <div className="flex  sm:flex-row flex-col gap-[20px] mt-[16px]">
                <div className="w-full">
                  <label
                    htmlFor="email"
                    className="block text-ti_dark_grey mb-[5px] text-[12px] font-semibold font-inter"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    name="email"
                    maxLength={50}
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input-form"
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="email"
                    className="block text-ti_dark_grey mb-[5px] text-[12px] font-semibold font-inter"
                  >
                    Phone
                  </label>
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
            <div>
              <h1 className=" mb-[20px] text-ti_light_black text-[18px] font-semibold font-inter">
                Brand info
              </h1>
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-ti_dark_grey mb-[5px] text-[12px] font-semibold font-inter"
                >
                  Brand name
                </label>
                <input
                  type="text"
                  id="brandName"
                  required
                  name="brandName"
                  maxLength={50}
                  placeholder="Enter name"
                  value={formData.brandName}
                  onChange={handleChange}
                  className="input-form"
                />
              </div>
              <div className="flex sm:flex-row flex-col gap-[20px] mt-[16px]">
                <div className="w-full">
                  <label
                    htmlFor="fleetSize"
                    className="block text-ti_dark_grey mb-[5px] text-[12px] font-semibold font-inter"
                  >
                    Fleet size
                  </label>
                  <input
                    type="number"
                    required
                    id="fleetSize"
                    name="fleetSize"
                    maxLength={50}
                    placeholder="Enter number"
                    value={formData.fleetSize}
                    onChange={handleChange}
                    className="input-form"
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="businessType"
                    className="block text-ti_dark_grey mb-[5px] text-[12px] font-semibold font-inter"
                  >
                    Business type
                  </label>
                  <input
                    type="text"
                    id="businessType"
                    name="businessType"
                    required
                    placeholder="Enter type"
                    maxLength={50}
                    value={formData.businessType}
                    onChange={handleChange}
                    className="input-form"
                  />
                </div>
              </div>
              <div className="flex sm:flex-row flex-col gap-[20px] mt-[16px]">
                <div className="w-full">
                  <label
                    htmlFor="fullName"
                    className="block text-ti_dark_grey mb-[5px] text-[12px] font-semibold font-inter"
                  >
                    Number of locations
                  </label>
                  <input
                    type="number"
                    maxLength={50}
                    id="locations"
                    required
                    name="locations"
                    placeholder="Enter number"
                    value={formData.locations}
                    onChange={handleChange}
                    className="input-form"
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="teamSize"
                    className="block text-ti_dark_grey mb-[5px] text-[12px] font-semibold font-inter"
                  >
                    Team size
                  </label>
                  <input
                    type="text"
                    maxLength={50}
                    required
                    id="teamSize"
                    name="teamSize"
                    placeholder="Enter type"
                    value={formData.teamSize}
                    onChange={handleChange}
                    className="input-form"
                  />
                </div>
              </div>
              <div className="flex sm:flex-row flex-col gap-[20px] mt-[16px]">
                <div className="w-full">
                  <label
                    htmlFor="fullName"
                    className="block text-ti_dark_grey mb-[5px] text-[12px] font-semibold font-inter"
                  >
                    Country
                  </label>
                  <input
                    type="text"
                    id="country"
                    required
                    name="country"
                    // placeholder="Canada"
                    value={country}
                    disabled
                    // onChange={handleChange}
                    className="input-form"
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="fullName"
                    className="block text-ti_dark_grey mb-[5px] text-[12px] font-semibold font-inter"
                  >
                    State / Province
                  </label>
                  <input
                    type="text"
                    id="state"
                    required
                    name="state"
                    maxLength={50}
                    placeholder="Enter State"
                    value={formData.state}
                    onChange={handleChange}
                    className=" input-form"
                  />
                </div>
              </div>
              <div className="flex sm:flex-row flex-col gap-[20px] mt-[16px]">
                <div className="w-full">
                  <label
                    htmlFor="fullName"
                    className="block text-ti_dark_grey mb-[5px] text-[12px] font-semibold font-inter"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    maxLength={50}
                    name="city"
                    required
                    placeholder="Enter city"
                    value={formData.city}
                    onChange={handleChange}
                    className="input-form"
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="fullName"
                    className="block text-ti_dark_grey mb-[5px] text-[12px] font-semibold font-inter"
                  >
                    Postal code
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={50}
                    id="postalCode"
                    name="postalCode"
                    placeholder="Enter code"
                    value={formData.postalCode}
                    onChange={handleChange}
                    className="input-form"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Button Section - Fixed at Bottom */}
      <div className="flex-shrink-0  p-4 md:px-[60px] md:py-[30px] md:pb-[60px]">
        <button
          disabled={loading}
          type="submit"
          form="submitForm"
          className="w-full rounded-md bg-[#2D65F2] px-[14px] py-[10px] font-openSans text-[14px] font-semibold text-white"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default SubmitDetails;
