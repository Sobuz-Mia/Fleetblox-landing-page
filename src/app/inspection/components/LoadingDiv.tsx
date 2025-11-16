import React from "react";

const LoadingDiv = ({
  title = "Processing images",
  desc = "Please wait while we process your captured images. This won't take long. Thank you!",
}: {
  title?: string;
  desc?: string;
}) => {
  return (
    <div className="max-w-[390px] w-full mx-auto h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center w-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full !w-full object-contain"
        >
          <source src="/videos/extracting.mp4" type="video/mp4" />
        </video>

        <h2 className="mt-10 text-[24px] text-[#303030] font-bold text-center">
          {title}
        </h2>

        <p className="text-[14px] leading-5 text-[#6F6464] text-center mt-[10px]">
          {desc}
        </p>
      </div>
    </div>
  );
};

export default LoadingDiv;
