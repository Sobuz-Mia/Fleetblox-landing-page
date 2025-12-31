import Image from "next/image";
import ConditionDocumentIcon from "../icons/ConditionDocumentIcon";
import ConditionComparisonIcon from "../icons/ConditionComparisonIcon";

const WhyTripAuditSection = () => {
  return (
    <div className="py-20 max-w-[1440px] w-full mx-auto px-5">
      <div className="text-center">
        <h3 className="text-[#0336BC] text-[18px] font-bold font-openSans">
          What Is a
        </h3>
        <h2 className="text-[#04082C] text-[22px] md:text-[36px] font-bold font-montserrat">
          Trip Wise and <span className="text-[#0336BC]">Why It Matters</span>
        </h2>
        <p className="mt-2.5 text-[14px] md:text-[16px] text-[#333] leading-6 font-openSans">
          A trip wise, also called a vehicle-condition inspection, records a
          vehicle’s condition before and after each trip. These inspections
          prevent false damage claims, insurance disputes, and misuse, problems
          that are especially common as car rentals and ride-sharing. With
          digital visuals, mobile apps, and cloud-based records, trip audits
          bring transparency, accountability, and protection for both vehicle
          owners and renters. They make rentals safer, reduce administrative
          headaches, and ensure vehicles are properly maintained.
        </p>
      </div>
      {/* departure and return card sections */}
      <div className="mt-20 flex flex-col md:flex-row items-center relative">
        {/* deaprture card */}
        <div className="rounded-[20px] z-50  [background:linear-gradient(180deg,#FFF_0.06%,#FAFAFF_108.04%)] p-[15px]  w-full shadow-[0_-16px_31.1px_0_rgba(10,39,156,0.11)]">
          <h2 className="text-[#303030] font-openSans text-[14px] md:text-[22px] text-center mt-2 mb-7 md:mb-10">
            Departure report{" "}
          </h2>
          <div className="flex justify-between items-center md:gap-[30px] gap-2.5 ">
            <div className="space-y-3.5 md:space-y-[21px]">
              <h3 className="text-[#4DB429] text-[14px] md:text-[22px] font-bold">
                Excellent
              </h3>
              <div className="flex justify-between items-center w-[159px] md:w-[251px] py-[11px]">
                <p className="text-[11px] md:text-[14px] leading-2 text-[#6F6464]">
                  Total damage found
                </p>
                <h4 className="text-[#151515] text-[11px] md:text-[19px] font-bold">
                  03
                </h4>
              </div>
              <div className="flex justify-between items-center w-[159px] md:w-[251px] py-[11px]">
                <p className="text-[11px] md:text-[14px] leading-2 text-[#6F6464]">
                  Need part replacements
                </p>
                <h4 className="text-[#151515] text-[11px] md:text-[19px] font-bold">
                  01
                </h4>
              </div>
              <div className="flex justify-between items-center w-[159px] md:w-[251px] py-[11px]">
                <p className="text-[11px] md:text-[14px] leading-2 text-[#6F6464]">
                  Need part repairs
                </p>
                <h4 className="text-[#151515] text-[11px] md:text-[19px] font-bold">
                  01
                </h4>
              </div>
              <div className="flex items-center gap-2.5 md:gap-5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="">
                    <Image
                      src="/images/trip-audit/departure-default-img.svg"
                      width={35}
                      height={35}
                      alt={`departure-default-${i + 1}`}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="w-[200px] md:w-[296px] ">
              <Image
                src="/images/trip-audit/departure-report-diagram.svg"
                width={296}
                height={296}
                alt="image"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
        {/* VS card */}
        <div className="px-6 py-2.5 w-40 h-[70px] md:w-[296px] ">
          <Image
            src="/images/trip-audit/VS.svg"
            width={296}
            height={296}
            alt="image"
          />
        </div>
        <Image
          src="/images/trip-audit/car-image-for-matter-section.svg"
          width={332}
          height={147}
          alt="image"
          className="object-contain absolute transform translate-y-[80%] translate-x-1/2 right-1/2 z-20 hidden md:block"
        />
        {/* return card */}

        <div className="rounded-[20px] [background:linear-gradient(180deg,#FFF_0.06%,#FAFAFF_108.04%)] p-[15px]  w-full shadow-[0_-16px_31.1px_0_rgba(10,39,156,0.11)]">
          <h2 className="text-[#303030] font-openSans text-[14px] md:text-[22px] text-center mt-2 mb-7 md:mb-10">
            Return report
          </h2>
          <div className="flex justify-between items-center md:gap-[30px] gap-2.5 ">
            <div className="space-y-3.5 md:space-y-[21px]">
              <h3 className="text-[#F00] text-right text-[14px] md:text-[22px] font-bold">
                Very poor
              </h3>
              <div className="flex justify-between items-center w-[159px] md:w-[251px] py-[11px]">
                <p className="text-[11px] md:text-[14px] leading-2 text-[#6F6464]">
                  New damage detected
                </p>
                <h4 className="text-[#F00] text-[11px] md:text-[19px] font-bold">
                  03
                </h4>
              </div>
              <div className="flex justify-between items-center w-[159px] md:w-[251px] py-[11px]">
                <p className="text-[11px] md:text-[14px] leading-2 text-[#6F6464]">
                  Total damage found
                </p>
                <h4 className="text-[#151515] text-[11px] md:text-[19px] font-bold">
                  30
                </h4>
              </div>
              <div className="flex justify-between items-center w-[159px] md:w-[251px] py-[11px]">
                <p className="text-[11px] md:text-[14px] leading-2 text-[#6F6464]">
                  Repair
                </p>
                <h4 className="text-[#151515] text-[11px] md:text-[19px] font-bold">
                  12
                </h4>
              </div>

              <div className="flex items-center gap-2.5 md:gap-5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="">
                    <Image
                      src="/images/trip-audit/departure-default-img.svg"
                      width={35}
                      height={35}
                      alt={`departure-default-${i + 1}`}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="w-[200px] md:w-[296px] ">
              <Image
                src="/images/trip-audit/return-report-diagram.svg"
                width={296}
                height={296}
                alt="image"
              />
            </div>
          </div>
        </div>
      </div>

      {/* condition document and comparison section */}
      <div className="mt-5 md:mt-[60px] z-50 grid grid-cols-1 md:grid-cols-3 items-center justify-items-center px-5 md:px-10 gap-10 md:gap-0">
        <div className="flex flex-col items-center justify-center text-center md:p-5">
          <div className="relative">
            <ConditionDocumentIcon />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="38"
              height="16"
              viewBox="0 0 38 16"
              fill="none"
              className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2"
            >
              <path
                d="M37.7465 9.39181C37.7159 9.18725 37.6301 8.99648 37.5014 8.87657C35.7056 7.16113 33.1991 6.32098 29.8466 6.32098C29.6874 6.32098 29.5404 6.2505 29.4236 6.12332C24.1653 0.355233 12.0428 -3.25224 5.01327 4.21708C4.9644 4.27338 4.90286 4.31591 4.84168 4.34427L0.809114 6.36354C0.318936 6.60334 0 7.16111 0 7.77515V14.4607C0 15.3077 0.600594 16 1.34218 16H2.83766C2.78878 15.6893 2.75784 15.3786 2.75784 15.0542C2.75784 12.1949 4.77407 9.87218 7.25634 9.87218C9.73221 9.87218 11.7425 12.1948 11.7425 15.0542C11.7425 15.379 11.7119 15.6966 11.6627 16H26.2979C26.249 15.6893 26.2181 15.3786 26.2181 15.0542C26.2181 12.1949 28.2343 9.87218 30.7166 9.87218C33.1989 9.87218 35.2151 12.1948 35.2151 15.0542C35.2151 15.379 35.1845 15.6966 35.1353 16H36.6062C37.2986 16 37.8872 15.3786 37.9484 14.581C38.0591 13.0843 37.9916 11.3827 37.7465 9.39181ZM15.2238 7.5986H2.83814C8.21289 5.01471 9.63491 2.39555 15.2238 2.01437V7.5986ZM17.0625 7.5986V2.01437C17.0625 2.01437 23.1606 2.79817 28.1735 7.5986H17.0625Z"
                fill="#2D65F2"
                fillOpacity="0.5"
              />
            </svg>
          </div>

          <h3 className="text-[#333] font-openSans text-[22px] font-bold space-y-2.5">
            Condition Documentation
          </h3>
          <p className="text-[#7D7D7D] text-sm leading-5">
            Capture pre-trip vehicle condition with a smart inspection workflow,
            providing a detailed condition report with damage diagrams and
            digital visuals.
          </p>
        </div>
        <div className="w-0.5 h-16 bg-[#DFDFDF] hidden md:block"></div>
        <div className="flex flex-col items-center justify-center text-center md:p-5">
          <ConditionComparisonIcon />
          <h3 className="text-[#333] font-openSans text-[22px] font-bold space-y-2.5">
            Condition Comparison
          </h3>
          <p className="text-[#7D7D7D] text-sm leading-5">
            Capture post-trip conditions with a smart workflow. Then Fleetblox
            highlights differences and generates a before-and-after damage
            condition report.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhyTripAuditSection;
