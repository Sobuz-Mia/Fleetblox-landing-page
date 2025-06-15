import { ReactNode } from "react";

type TFeaturesCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
};

const FeatureCard = ({
  icon,
  title,
  description,
  className = "",
}: TFeaturesCardProps) => {
  return (
    <div className={`flex relative ${className}`}>
      <div className="absolute top-[8px] left-[8px] right-[8px] z-[10] rounded-[24px] bg-[rgba(0,0,0,0.08)] blur-[10px] h-[calc(100%+8px)]"></div>
      {/* right card */}
      <div className="z-50 p-[30px] bg-white w-full rounded-[16px] flex flex-col items-center text-center">
        {icon}
        <h3 className="text-[#333] text-[18px] font-bold font-openSans mt-[10px] mb-[5px]">
          {title}
        </h3>
        <p className="text-[#7D7D7D] font-openSans text-[14px] leading-5 text-center">
          {description}
        </p>
      </div>
    </div>
  );
};

export default FeatureCard;
