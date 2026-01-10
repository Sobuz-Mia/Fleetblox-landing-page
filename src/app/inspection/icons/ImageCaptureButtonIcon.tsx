import React from "react";

const ImageCaptureButtonIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="73"
      height="73"
      viewBox="0 0 73 73"
      fill="none"
    >
      <g filter="url(#filter0_d_9795_52449)">
        <circle cx="36.0996" cy="36.0996" r="25" fill="white" />
        <circle cx="36.5996" cy="36.5996" r="8.5" fill="#FF0000" />
      </g>
      <defs>
        <filter
          id="filter0_d_9795_52449"
          x="-0.000391006"
          y="-0.000391006"
          width="72.2"
          height="72.2"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="5.55" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 0.735577 0 0 0 0 0.735577 0 0 0 0.76 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_9795_52449"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_9795_52449"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default ImageCaptureButtonIcon;
