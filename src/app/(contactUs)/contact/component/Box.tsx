"use client";
import Link from "next/link";
import React from "react";

interface BoxProps {
  title: string;
  description: string;
  linkText: string;
  linkHref: string;
}

const Box: React.FC<BoxProps> = ({ title, description, linkText, linkHref }) => {

  const handleClick = () => {
    if (title === "Get Demo") {
      localStorage.setItem("isGetDemo", "true");
    }
  };

  return (
    <div className="bg-white rounded-[16px] p-[20px] w-full shadow-[0px_4px_10px_0px_rgba(0,0,0,0.10)] hover:shadow-xl hover:scale-100 transition-all">
      <h2 className="text-[22px] font-bold mb-[5px] font-openSans text-[#333]">{title}</h2>
      <p className="text-[#7D7D7D] mb-[10px] font-openSans text-[16px]">{description}</p>      <Link
        href={linkHref}
        onClick={handleClick}
        className="text-[#2D65F2] font-openSans font-bold"
      >
        {linkText}
      </Link>
    </div>
  );
};

export default Box;
 