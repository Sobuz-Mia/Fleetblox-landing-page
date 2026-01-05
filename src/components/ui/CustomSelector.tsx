import React, { useState } from "react";
import { DownOutlined, SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import classNames from "classnames";
import useClickOutside from "./../../utils/useClickOutside";
import DropDownIcon from "../icons/DropDownIcon";

export type TLocationDropdown = {
  value: string | number;
  label: string;
  disabled?: boolean;
  proPlan?: boolean;
  countryFlag?: string;
};

interface CustomSelectorProps {
  setSelector: React.Dispatch<React.SetStateAction<TLocationDropdown>>;
  selectorValue: TLocationDropdown;
  label?: string;
  height?: string;
  search?: boolean;
  width?: string;
  options?: TLocationDropdown[];
  dropdownWidth?: string;
  searchInputHeight?: string;
  dropdownHeight?: string;
  dropdownshowright?: boolean;
  placeholder?: string;
  disabled?: boolean;
  truncateLength?: number;
  inputTextColor?: string;
  showDropDownToTop?: string;
}

const CustomSelector: React.FC<CustomSelectorProps> = ({
  setSelector,
  selectorValue,
  inputTextColor = "text-[#6F6464]",
  label = "",
  height = "h-[42px]",
  options = [],
  search = true,
  dropdownWidth = "w-[240px]",
  dropdownHeight = "h-[240px]",
  searchInputHeight = "h-[36px]",
  disabled = false,
  placeholder = "Select location",
  dropdownshowright = true,
  width = "auto",
  truncateLength,
  showDropDownToTop,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchText, setSearchText] = useState("");

  // Close dropdown when clicking outside
  const ref = useClickOutside(() => setShowDropdown(false));

  // Handle option selection
  const handleOptionClick = (option: TLocationDropdown) => {
    if (option?.disabled) return;
    setSelector(option);
    setShowDropdown(false);
  };

  // Filter options based on search text
  const filterOptions = searchText
    ? options?.filter((option) =>
        option.label.toLowerCase().includes(searchText?.toLowerCase())
      )
    : options;
  // Toggle dropdown visibility
  const toggleDropdown = () => {
    if (!disabled) {
      setShowDropdown((prev) => !prev);
    }
  };

  // Truncate label if necessary
  const getTruncatedLabel = (label?: string) => {
    if (label && truncateLength) {
      return label.substring(0, truncateLength);
    }
    return label || "";
  };

  // Classes for the main button
  const inputClasses = classNames(
    height,
    label ? "fbinput" : "border font-semibold rounded-md",
    inputTextColor,
    "focus:outline-none px-[10px]",
    {
      "mt-[5px]": label,
      "cursor-not-allowed": disabled,
      "cursor-pointer": !disabled,
    }
  );

  // Classes for the dropdown
  const dropdownClasses = classNames(
    "absolute border pb-2 overflow-y-auto hide-scroll border-white-light shadow-lg z-10 bg-white-primary rounded-md",
    dropdownHeight,
    dropdownshowright ? "right-0" : "left-0",
    showDropDownToTop ? "top-0" : label ? "top-[78px]" : "top-[37px]",
    dropdownWidth,
    search ? "p-[10px]" : "px-[10px]",
    showDropDownToTop && showDropDownToTop
  );

  return (
    <div
      ref={ref}
      className="relative"
      style={{ width: label ? "100%" : width }}
    >
      <div className="relative" style={{ width: label ? "100%" : width }}>
        {label && (
          <label className="text-black-softlight text-[12px] font-semibold">
            {label}
          </label>
        )}
        <button
          type="button"
          onClick={toggleDropdown}
          disabled={disabled}
          className={` ${inputClasses} flex justify-between items-center flex-between space-x-[5px]`}
          style={{
            width: "100%",
            color:
              selectorValue?.value || selectorValue?.label ? "#151515" : "#999",
            fontSize: "12px",
            lineHeight: "16px",
            textAlign: "left",
          }}
        >
          <span>
            {getTruncatedLabel(
              selectorValue?.label ? selectorValue.label : placeholder
            )}
          </span>
          {label ? (
            <DownOutlined className=" text-[12px] text-[#999] right-[10px]" />
          ) : (
            <div>
              <DropDownIcon />
            </div>
          )}
        </button>
      </div>
      {showDropdown && (
        <div
          className={dropdownClasses}
          style={{
            boxShadow: "0px 4px 12px  0px rgba(0, 0, 0, 0.14)",
          }}
        >
          {search && (
            <Input
              onChange={(e) => setSearchText(e.target.value)}
              className={`w-full ${searchInputHeight} bg-white-light hover:bg-white-light border-none focus:border-none`}
              placeholder="Type here"
              prefix={
                <SearchOutlined className="site-form-item-icon text-black-light" />
              }
            />
          )}
          <div className="mt-3">
            {filterOptions?.length ? (
              <div role="listbox">
                {filterOptions?.map((option) => (
                  <button
                    key={option?.value}
                    type="button"
                    onClick={() => handleOptionClick(option)}
                    className={classNames(
                      `text-[12px] ${option?.proPlan ? "flex-between" : ""} ${
                        option?.countryFlag ? "flex gap-2" : ""
                      } ${
                        option?.disabled
                          ? "cursor-not-allowed"
                          : "cursor-pointer"
                      } p-[8px] rounded-md font-normal text-[#6F6464] w-full text-left`,
                      {
                        "bg-blue-50 text-black-primary":
                          selectorValue?.value === option?.value,
                      },
                      `${option?.disabled ? "" : "hover:bg-gray-50"} `
                    )}
                    role="option"
                    aria-selected={selectorValue?.value === option?.value}
                  >
                    {option?.countryFlag && (
                      <img
                        src={option?.countryFlag}
                        alt="country flag"
                        className="h-[20px] w-[24px] rounded-[6px]"
                      />
                    )}
                    {option?.label}
                    {option?.proPlan && (
                      <span>
                        {/* <KingCrownIcon /> */}
                        proplan
                      </span>
                    )}
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex-center mt-[80px]">
                <p className="font-semibold text-[#999] text-[14px]">
                  Data not found
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomSelector;
