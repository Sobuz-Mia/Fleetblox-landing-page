import React from "react";

const StepperDotIcon = ({ color }: { color?: boolean }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="2"
      height="34"
      viewBox="0 0 2 34"
      fill="none"
    >
      <path
        d="M1 1V33"
        stroke={color ? "#2D65F2" : "#999999"}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="1 4"
      />
    </svg>
  );
};

export default StepperDotIcon;
