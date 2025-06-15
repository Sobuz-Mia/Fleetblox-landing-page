"use client";
import RightArrowIcon from "@/components/icons/RightArrowIcon";
import CountryCodeSelection from "@/app/(contactUs)/contact/component/CountryCodeSelection";
import { useState } from "react";
import Canada from "@/../public/images/canada.png";
import { TSalesFormData } from "@/types/types";
import { toast } from "react-hot-toast";
import axios from "axios";
import { AxiosErrorResponse } from "@/interface/AxiosErrorResponse";
const ContactUs = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<TSalesFormData>({
    fleetSize: "",
    firstName: "",
    lastName: "",
    companyName: "",
    phoneNumber: "",
    companyEmail: "",
    additionalMessage: "",
    countryCode: "+1",
    flag: Canada,
  });

  const fleetSizeOptions = [
    { value: "", label: "Select Fleet Size" }, // Placeholder
    { value: "1-10", label: "1-10" }, // Added based on common ranges, original image had 10-30 as first actual option
    { value: "10-30", label: "10-30" },
    { value: "30-50", label: "30-50" },
    { value: "50-100", label: "50-100" },
    { value: "100-150", label: "100-150" },
    { value: "150-200", label: "150-200" },
    { value: "200+", label: "200+" },
  ];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    // Regular expression for validating an email address
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (!emailRegex.test(formData.companyEmail.trim())) {
      toast.error("Please enter a valid email address");
      setLoading(false);
      return;
    }

    if (formData.phoneNumber.length > 17) {
      toast.error("Please enter a valid phone number");
    }
    const contactData = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      company: formData.companyName.trim(),
      email: formData.companyEmail.trim(),
      phoneNumber: `${formData.countryCode}${formData.phoneNumber.trim()}`,
      message: formData.additionalMessage.trim(),
      fleetSize: formData.fleetSize.trim(),
    };

    try {
      setLoading(true);
      const { data } = await axios.post(
        "https://api.fleetblox.com/api/contact/create",
        contactData
      );
      if (data?.success) {
        toast.success("Message sent successfully!");
        setFormData({
          fleetSize: "",
          firstName: "",
          lastName: "",
          companyName: "",
          companyEmail: "",
          phoneNumber: "",
          additionalMessage: "",
          countryCode: "+1",
          flag: Canada,
        });
      }
      setLoading(false);
    } catch (e) {
      const axiosError = e as AxiosErrorResponse;
      const errorMessage =
        axiosError?.response?.data?.error?.message ||
        "An unexpected error occurred";
      toast.error(errorMessage);
      setLoading(false);
    }
  };

  return (
    <div>
      <section className="flex justify-between  flex-col-reverse lg:flex-row max-w-[1120px] mx-auto w-full py-5 lg:py-[100px] gap-10 lg:gap-[100px] items-start px-5">
        <div className="flex lg:flex-col justify-between flex-col-reverse gap-10 lg:gap-[60px] w-full lg:w-1/2 ">
          <div>
            <h2 className="text-[#04082C] text-[18px] font-openSans font-bold mb-[8px]">
              Connect with Fleetblox
            </h2>
            <p className="text-[#7D7D7D] text-[16px] font-openSans leading-[24px] mb-[5px]">
              Fleetblox is an AI-powered, cloud-based fleet connectivity
              solution that reduces costs, minimizes downtime, and
              revolutionizes fleet management for smarter, more efficient
              operations.
            </p>
            {/* <h1 className="text-[#04082C] text-[14px] font-openSans font-semibold leading-5 mt-4">
              Want to learn more? Contact us
            </h1> */}
          </div>
          <div>
            <h3 className="text-[#04082C] text-[18px] font-openSans font-bold mb-[8px]">
              Headquarter
            </h3>
            <p className="text-[#7D7D7D] text-[14px] font-openSans leading-[24px] ">
              {" "}
              45 Oconnell St,
            </p>
            <p className="text-[#7D7D7D] text-[14px] font-openSans leading-[24px]">
              Toronto, ON M4Y 1Y2
            </p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-[10px] w-full">
          {/* Fleet Size */}
          <div>
            <label className="relative">
              <select
                name="fleetSize"
                aria-describedby="Select your fleet size"
                value={formData.fleetSize}
                onChange={handleChange}
                required
                className={`p-4 text-[#7D7D7D] font-openSans text-[14px] leading-5 outline-none border border-[#DFDFDF] rounded-md focus:border-[#B8CBFC] duration-200 bg-white  w-full appearance-none ${formData.fleetSize ? "text-[#333333]" : "text-[#7D7D7D]"
                  }`}
              >
                {fleetSizeOptions.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    disabled={option.value === ""}
                  >
                    {option.label}
                  </option>
                ))}
              </select>
              <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </span>
            </label>
          </div>
          {/* name field */}
          <div>
            <label className="relative">
              <input
                type="text"
                required
                name="firstName"
                aria-describedby="Enter your first name"
                autoComplete="off"
                maxLength={20}
                value={formData.firstName}
                onChange={handleChange}
                className={`p-4 text-[#333] font-openSans text-[14px] leading-5 outline-none border border-[#DFDFDF] rounded-md focus:border-[#B8CBFC] duration-200 peer bg-white w-full ${formData.firstName ? "has-value" : ""
                  }`}
              />
              <span className="absolute left-0 top-0 text-[#333] font-openSans text-[14px] leading-5 tracking-wide peer-focus:text-[#2D65F2] pointer-events-none duration-200 peer-focus:text-sm peer-focus:-translate-y-[27px] bg-white ml-4 peer-[.has-value]:text-[#2D65F2] peer-[.has-value]:-translate-y-[27px] peer-[.has-value]:text-sm">
                First name
              </span>
            </label>
          </div>
          {/* last name */}
          <div>
            <label className="relative">
              <input
                type="text"
                name="lastName"
                aria-describedby="Enter your last name"
                autoComplete="off"
                maxLength={20}
                value={formData.lastName}
                onChange={handleChange}
                className={`p-4 text-[#333] font-openSans text-[14px] leading-5 outline-none border border-[#DFDFDF] rounded-md focus:border-[#B8CBFC] duration-200 peer bg-white w-full ${formData.lastName ? "has-value" : ""
                  }`}
              />
              <span className="absolute left-0 top-0 text-[#333] font-openSans text-[14px] leading-5 tracking-wide peer-focus:text-[#2D65F2] pointer-events-none duration-200 peer-focus:text-sm peer-focus:-translate-y-[27px] bg-white ml-4 peer-[.has-value]:text-[#2D65F2] peer-[.has-value]:-translate-y-[27px] peer-[.has-value]:text-sm">
                Last name
              </span>
            </label>
          </div>
          {/* company name */}
          <div>
            <label className="relative">
              <input
                type="text"
                required
                autoComplete="off"
                aria-describedby="Enter your company name"
                name="companyName"
                maxLength={40}
                value={formData.companyName}
                onChange={handleChange}
                className={`p-4 text-[#333] font-openSans text-[14px] leading-5 outline-none border border-[#DFDFDF] rounded-md focus:border-[#B8CBFC] duration-200 peer bg-white w-full ${formData.companyName ? "has-value" : ""
                  }`}
              />
              <span className="absolute left-0 top-0 text-[#333] font-openSans text-[14px] leading-5 tracking-wide peer-focus:text-[#2D65F2] pointer-events-none duration-200 peer-focus:text-sm peer-focus:-translate-y-[27px] bg-white ml-4 peer-[.has-value]:text-[#2D65F2] peer-[.has-value]:-translate-y-[27px] peer-[.has-value]:text-sm">
                Company Name
              </span>
            </label>
          </div>
          {/* phone number */}
          <div>
            <label className="relative">
              <input
                required
                type="number"
                name="phoneNumber"
                aria-describedby="Enter your phone number"
                autoComplete="off"
                pattern="[0-9]*"
                value={formData.phoneNumber}
                onChange={handleChange}
                className={`py-4  ${formData.countryCode && formData.countryCode.length === 4
                  ? "px-[110px]"
                  : "px-[100px]"
                  } text-[#333] font-openSans text-[14px] leading-5 outline-none border border-[#DFDFDF] rounded-md focus:border-[#B8CBFC] duration-200 peer bg-white w-full ${formData.phoneNumber ? "has-value" : ""
                  }`}
              />
              <span
                className={`absolute  ${formData.countryCode && formData.countryCode.length === 4
                  ? "left-[90px]"
                  : "left-[85px]"
                  }  top-0 text-[#333] font-openSans text-[14px] leading-5 tracking-wide peer-focus:text-[#2D65F2] pointer-events-none duration-200 peer-focus:text-sm peer-focus:-translate-y-[27px] bg-white ml-4 peer-[.has-value]:text-[#2D65F2] peer-[.has-value]:-translate-y-[27px] peer-[.has-value]:text-sm`}
              >
                Phone number
              </span>
              <span className="absolute z-10 left-4 top-0">
                <CountryCodeSelection
                  setFormData={setFormData}
                  formData={formData}
                />
              </span>
            </label>
          </div>
          {/* email */}
          <div>
            <label className="relative">
              <input
                required
                type="email"
                name="companyEmail"
                aria-describedby="email-help"
                autoComplete="off"
                value={formData.companyEmail}
                onChange={handleChange}
                className={`p-4 text-[#333] font-openSans text-[14px] leading-5 outline-none border border-[#DFDFDF] rounded-md focus:border-[#B8CBFC] duration-200 peer bg-white w-full ${formData.companyEmail ? "has-value" : ""
                  }`}
              />
              <span className="absolute left-0 top-0 text-[#333] font-openSans text-[14px] leading-5 tracking-wide peer-focus:text-[#2D65F2] pointer-events-none duration-200 peer-focus:text-sm peer-focus:-translate-y-[27px] bg-white ml-4 peer-[.has-value]:text-[#2D65F2] peer-[.has-value]:-translate-y-[27px] peer-[.has-value]:text-sm">
                Company Email Address
              </span>
            </label>
          </div>
          {/* text area */}
          <div>
            <label className="relative">
              <textarea
                required
                rows={4}
                name="additionalMessage"
                aria-describedby="Enter your message"
                value={formData.additionalMessage}
                onChange={handleChange}
                className={`p-4 text-[#333] font-openSans text-[14px] leading-5 outline-none border border-[#DFDFDF] rounded-md focus:border-[#B8CBFC] duration-200 peer bg-white w-full ${formData.additionalMessage ? "has-value" : ""
                  }`}
              />
              <span className="absolute left-0 bottom-[50px] text-[#333] font-openSans text-[14px] leading-5 tracking-wide peer-focus:text-[#2D65F2] pointer-events-none duration-200 peer-focus:text-sm peer-focus:-translate-y-[58px] bg-white ml-4 peer-[.has-value]:text-[#2D65F2] peer-[.has-value]:-translate-y-[58px] peer-[.has-value]:text-sm">
                Additional Message
              </span>
            </label>
          </div>
          {/* hover:w-[105px] w-[83px]  */}
          <div className="!mt-[20px]">
            <button
              type="submit"
              className="hidden lg:flex transition-all font-openSans bg-[#2D65F2] hover:bg-[#0336BC] text-white-primary text-white duration-300  items-center px-[13px]  hover:w-[105px] w-[83px] hover:px-4 py-3 text-base font-bold rounded-md group"
            >
              <div className="z-20 whitespace-nowrap">
                {" "}
                {loading ? "Sending.." : "Submit"}
              </div>
              <div className="z-10 transform transition-transform opacity-0 group-hover:opacity-100 -translate-x-4 duration-300 group-hover:translate-x-0">
                <RightArrowIcon />
              </div>
            </button>
            <button
              type="submit"
              className="md:hidden bg-[#2D65F2] hover:bg-[#0336BC] text-white w-full flex px-4 py-3 text-[14px] font-openSans font-bold rounded-md justify-center"
            >
              {loading ? "Sending.." : "Submit"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default ContactUs;
