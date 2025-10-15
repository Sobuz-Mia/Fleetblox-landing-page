import Image from "next/image";
import React from "react";
import image from "../../../assets/growingImg.svg";

const GrowingPlatform = () => {
  return (
    <section className="bg-[#FAFAFF] py-[60px] lg:py-[100px] overflow-hidden px-4 lg:px-8">
      <div className="relative max-w-7xl mx-auto">
        {/* Heading */}
        <h2 className="relative text-[28px] z-[100] font-bold text-[#04082C] text-center">
          A <span className="text-[#0336BC]">Growing</span>{" "}
          <br className="block lg:hidden" /> Platform of
        </h2>

        {/* Cards Container */}
        <div className="grid grid-cols-1  lg:grid-cols-3 gap-[30px] justify-items-center relative z-10 mt-[60px]">
          {/* Card 1 */}
          <div className="bg-white rounded-xl shadow-lg px-10 py-5 lg:py-10 text-center w-full max-w-[340px]">
            <h3 className="text-4xl lg:text-[52px] font-bold text-[#04082C] mb-2">
              1,433
            </h3>
            <p className="text-[14px] lg:text-[18px] text-[#7D7D7D] font-openSans font-semibold">
              Added <span className="text-[#0336BC] font-bold">Gasoline</span>{" "}
              Cars
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-xl shadow-lg px-10 py-5 lg:py-10 text-center w-full max-w-[340px]">
            <h3 className="text-4xl lg:text-[52px] font-bold text-[#04082C] mb-2">
              1,207
            </h3>
            <p className="text-[14px] lg:text-[18px] text-[#7D7D7D] font-openSans font-semibold">
              Added <span className="text-[#0336BC] font-bold">Electric</span>{" "}
              Cars
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-xl shadow-lg px-10 py-5 lg:py-10 text-center w-full max-w-[340px]">
            <h3 className="text-4xl lg:text-[52px] font-bold text-[#04082C] mb-2">
              974
            </h3>
            <p className="text-[14px] lg:text-[18px] text-[#7D7D7D] font-openSans font-semibold">
              Added <span className="text-[#0336BC] font-bold">Hybrid</span>{" "}
              Cars
            </p>
          </div>
        </div>

        {/* SVG Image */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[450px] h-[450px] lg:w-[600px] lg:h-[550px] lg:-bottom-[210px] lg:-right-[450px] lg:left-auto lg:translate-x-0 pointer-events-none">
          <Image
            src={image}
            className="w-full h-full object-contain"
            alt="Growing Platform Illustration"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default GrowingPlatform;
