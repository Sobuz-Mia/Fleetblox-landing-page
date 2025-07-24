import React from "react";

interface NextStepButtonProps {
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  text?: string;
}

const NextStepButton: React.FC<NextStepButtonProps> = ({
  onClick,
  disabled = false,
  className = "",
  text = "Next Step",
}) => {
  return (
    <button
      className={`w-full py-3 px-4 font-openSans rounded-md font-medium text-[14px] text-white transition-colors ${
        disabled
          ? "bg-[#2D65F2]/50 cursor-not-allowed"
          : "bg-[#2D65F2] hover:bg-[#2D65F2]/90"
      } ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default NextStepButton;
