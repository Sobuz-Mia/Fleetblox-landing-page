import React from "react";

const TickIcon = () => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 32 29"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      className="scale-90" // Optional: Adjust scale if needed
    >
      <path
        d="M30.5133 0.183594H25.4525C25.2003 0.183594 24.9639 0.306511 24.8191 0.51297L5.41211 28.1836H12.3742L31.1467 1.40117C31.5061 0.888506 31.1393 0.183594 30.5133 0.183594Z"
        fill="#4DB429"
      />
      <path
        d="M1.1446 14.7305H6.42778C6.74347 14.7305 7.02749 14.9223 7.14539 15.2152L12.3652 28.182H5.40314L0.426774 15.7924C0.222623 15.2841 0.596859 14.7305 1.1446 14.7305Z"
        fill="#939607"
        fillOpacity="0.6" // Changed to React-compatible prop
      />
    </svg>
  );
};

export default TickIcon;
