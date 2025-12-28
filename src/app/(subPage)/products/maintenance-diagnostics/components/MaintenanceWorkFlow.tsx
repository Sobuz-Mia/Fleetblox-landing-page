import Image from "next/image";

const MaintenanceWorkFlow = () => {
  return (
    <div>
      <div className="max-w-[850px] w-full mx-auto rounded-[24px] border border-[#DFDFDF] bg-white pl-[30px] pr-[20px] py-[30px] flex justify-between">
        <div className="w-1/2">
          <h3 className="leading-[1.1] text-[28px] text-[#333] font-bold mb-[10px]">
            Get Alerts and Create Custom Checklist
          </h3>
          <p className="font-openSans text-[14px] leading-5">
            Receive timely maintenance alerts and create custom maintenance
            checklists tailored to your vehicle’s needs.
          </p>
        </div>
        <Image
          src="/images/products/maintenance/scheduleMaintenance.svg"
          alt="Remote Scalability Hero"
          width={363}
          height={210}
          className=" "
          quality={100}
        />
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="6"
        height="150"
        viewBox="0 0 6 150"
        fill="none"
        className="max-w-[6px] w-full mx-auto"
      >
        <path
          d="M3 208L3 3.00001"
          stroke="url(#paint0_linear_8039_38501)"
          strokeWidth="5"
          stroke-linecap="square"
        />
        <defs>
          <linearGradient
            id="paint0_linear_8039_38501"
            x1="3"
            y1="5.92858"
            x2="3"
            y2="183.107"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#CFCFCF" />
            <stop offset="1" stop-color="white" />
          </linearGradient>
        </defs>
      </svg>
      <Image
        src="/images/products/maintenance/tecnicalTask1.svg"
        alt="Remote Scalability Hero"
        width={400}
        height={459}
        className="object-contain max-w-[400px] w-full mx-auto -mt-[90px]"
        quality={100}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="6"
        height="150"
        viewBox="0 0 6 150"
        fill="none"
        className="max-w-[6px] w-full mx-auto"
      >
        <path
          d="M3 208L3 3.00001"
          stroke="url(#paint0_linear_8039_38501)"
          strokeWidth="5"
          stroke-linecap="square"
        />
        <defs>
          <linearGradient
            id="paint0_linear_8039_38501"
            x1="3"
            y1="5.92858"
            x2="3"
            y2="183.107"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#CFCFCF" />
            <stop offset="1" stop-color="white" />
          </linearGradient>
        </defs>
      </svg>
      <Image
        src="/images/products/maintenance/sentVehicleToServicing.svg"
        alt="Remote Scalability Hero"
        width={400}
        height={459}
        className="object-contain max-w-[400px] w-full mx-auto -mt-[90px]"
        quality={100}
      />
      <Image
        src="/images/products/maintenance/double-line.svg"
        alt="Remote Scalability Hero"
        width={400}
        height={459}
        className="object-contain max-w-[400px] w-full mx-auto"
        quality={100}
      />
      <Image
        src="/images/products/maintenance/third-double-card.svg"
        alt="Remote Scalability Hero"
        width={400}
        height={459}
        className="object-contain  w-full mx-auto -mt-[40px]"
        quality={100}
      />
    </div>
  );
};

export default MaintenanceWorkFlow;
