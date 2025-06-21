"use client";
import RightArrowIcon from "@/components/icons/RightArrowIcon";
import CountryCodeSelection from "@/app/(contactUs)/contact/component/CountryCodeSelection";
import { useState } from "react";
import Canada from "@/../public/images/canada.png";
import { TFeedbackFormData } from "@/types/types";
import { toast } from "react-hot-toast";
import axios from "axios";
import { AxiosErrorResponse } from "@/interface/AxiosErrorResponse";
const Feedback = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<TFeedbackFormData>({
    brandName: "",
    brandEmail: "",
    brandPhoneNumber: "",
    message: "",
    countryCode: "+1",
    flag: Canada,
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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

    if (!emailRegex.test(formData.brandEmail.trim())) {
      toast.error("Please enter a valid email address");
      setLoading(false);
      return;
    }

    if (formData.brandPhoneNumber.length > 17) {
      toast.error("Please enter a valid phone number");
    }
    const contactData = {
      brandName: formData.brandName.trim(),
      brandEmail: formData.brandEmail.trim(),
      brandPhoneNumber: `${formData.countryCode}${formData.brandPhoneNumber.trim()}`,
      message: formData.message.trim(),
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
          brandName: "",
          brandEmail: "",
          brandPhoneNumber: "",
          message: "",
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
            <h4 className="text-[#04082C] text-[18px] font-openSans font-bold mb-[8px]">
              Customer Support
            </h4>
            <p className="text-[#333] text-[14px] font-openSans leading-5 mb-[5px]">
              {" "}
              +1 (888) 870 2004
            </p>
            <p className="text-[#333] text-[14px] font-openSans leading-5">
              info@fleetblox.com
            </p>
          </div>
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
            <h5 className="text-[#04082C] text-[14px] font-openSans font-semibold leading-5 mt-4">
              Want to learn more? Contact us
            </h5>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-[10px] w-full">
          {/* name field */}

          <div>
            <label className="relative">
              <input
                type="text"
                required
                name="brandName"
                aria-describedby="Brand Name"
                autoComplete="off"
                maxLength={20}
                value={formData.brandName}
                onChange={handleChange}
                className={`p-4 text-[#333] font-openSans text-[14px] leading-5 outline-none border border-[#DFDFDF] rounded-md focus:border-[#B8CBFC] duration-200 peer bg-white w-full ${formData.brandName ? "has-value" : ""
                  }`}
              />
              <span className="absolute left-0 top-0 text-[#333] font-openSans text-[14px] leading-5 tracking-wide peer-focus:text-[#2D65F2] pointer-events-none duration-200 peer-focus:text-sm peer-focus:-translate-y-[27px] bg-white ml-4 peer-[.has-value]:text-[#2D65F2] peer-[.has-value]:-translate-y-[27px] peer-[.has-value]:text-sm">
                Brand Name
              </span>
            </label>
          </div>
          {/* brand email */}
          <div>
            <label className="relative">
              <input
                type="text"
                name="brandEmail"
                aria-describedby="Brand Email"
                autoComplete="off"
                maxLength={20}
                value={formData.brandEmail}
                onChange={handleChange}
                className={`p-4 text-[#333] font-openSans text-[14px] leading-5 outline-none border border-[#DFDFDF] rounded-md focus:border-[#B8CBFC] duration-200 peer bg-white w-full ${formData.brandEmail ? "has-value" : ""
                  }`}
              />
              <span className="absolute left-0 top-0 text-[#333] font-openSans text-[14px] leading-5 tracking-wide peer-focus:text-[#2D65F2] pointer-events-none duration-200 peer-focus:text-sm peer-focus:-translate-y-[27px] bg-white ml-4 peer-[.has-value]:text-[#2D65F2] peer-[.has-value]:-translate-y-[27px] peer-[.has-value]:text-sm">
                Brand Email
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
                aria-describedby="Brand Phone Number"
                name="brandPhoneNumber"
                maxLength={40}
                value={formData.brandPhoneNumber}
                onChange={handleChange}
                className={`p-4 text-[#333] font-openSans text-[14px] leading-5 outline-none border border-[#DFDFDF] rounded-md focus:border-[#B8CBFC] duration-200 peer bg-white w-full ${formData.brandPhoneNumber ? "has-value" : ""
                  }`}
              />
              <span className="absolute left-0 top-0 text-[#333] font-openSans text-[14px] leading-5 tracking-wide peer-focus:text-[#2D65F2] pointer-events-none duration-200 peer-focus:text-sm peer-focus:-translate-y-[27px] bg-white ml-4 peer-[.has-value]:text-[#2D65F2] peer-[.has-value]:-translate-y-[27px] peer-[.has-value]:text-sm">
                Brand Phone Number
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
                value={formData.brandPhoneNumber}
                onChange={handleChange}
                className={`py-4  ${formData?.countryCode?.length === 4
                  ? "px-[110px]"
                  : "px-[100px]"
                  } text-[#333] font-openSans text-[14px] leading-5 outline-none border border-[#DFDFDF] rounded-md focus:border-[#B8CBFC] duration-200 peer bg-white w-full ${formData.brandPhoneNumber ? "has-value" : ""
                  }`}
              />
              <span
                className={`absolute  ${formData?.countryCode?.length === 4
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
          {/* text area */}
          <div>
            <label className="relative">
              <textarea
                required
                rows={4}
                name="message"
                aria-describedby="Enter your message"
                value={formData.message}
                onChange={handleChange}
                className={`p-4 text-[#333] font-openSans text-[14px] leading-5 outline-none border border-[#DFDFDF] rounded-md focus:border-[#B8CBFC] duration-200 peer bg-white w-full ${formData.message ? "has-value" : ""
                  }`}
              />
              <span className="absolute left-0 bottom-[50px] text-[#333] font-openSans text-[14px] leading-5 tracking-wide peer-focus:text-[#2D65F2] pointer-events-none duration-200 peer-focus:text-sm peer-focus:-translate-y-[58px] bg-white ml-4 peer-[.has-value]:text-[#2D65F2] peer-[.has-value]:-translate-y-[58px] peer-[.has-value]:text-sm">
                Message
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

export default Feedback;
