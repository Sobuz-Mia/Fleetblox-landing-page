import Image from "next/image";

const WhyTripAuditSection = () => {
  return (
    <div className="py-20 max-w-[1440px] w-full mx-auto px-5">
      <div className="text-center">
        <h3 className="text-[#0336BC] text-[18px] font-bold font-openSans">
          What Is a
        </h3>
        <h2 className="text-[#04082C] text-[36px] font-bold font-montserrat">
          Trip Audit and <span className="text-[#0336BC]">Why It Matters</span>
        </h2>
        <p className="mt-[10px] text-[16px] text-[#333] leading-6 font-openSans">
          A trip audit, also called a vehicle-condition inspection, records a
          vehicle’s condition before and after each trip. These inspections
          prevent false damage claims, insurance disputes, and misuse, problems
          that are especially common as car rentals and ride-sharing. With
          digital visuals, mobile apps, and cloud-based records, trip audits
          bring transparency, accountability, and protection for both vehicle
          owners and renters. They make rentals safer, reduce administrative
          headaches, and ensure vehicles are properly maintained.
        </p>
      </div>
      <div className="mt-[80px] flex items-center relative">
        {/* deaprture card */}
        <div className="rounded-[20px] z-50  [background:linear-gradient(180deg,#FFF_0.06%,#FAFAFF_108.04%)] p-[15px]  w-full shadow-[0_-16px_31.1px_0_rgba(10,39,156,0.11)]">
          <h2 className="text-[#303030] font-openSans text-[22px] text-center mt-2 mb-10">
            Departure report{" "}
          </h2>
          <div className="flex justify-between items-center gap-[30px]">
            <div className="space-y-[21px]">
              <h3 className="text-[#4DB429] text-[22px] font-bold">
                Excellent
              </h3>
              <div className="flex justify-between items-center w-[251px] py-[11px]">
                <p className="text-[14px] leading-[8px] text-[#6F6464]">
                  Total damage found
                </p>
                <h4 className="text-[#151515] text-[19px] font-bold">03</h4>
              </div>
              <div className="flex justify-between items-center  w-[251px] py-[11px]">
                <p className="text-[14px] leading-[8px] text-[#6F6464]">
                  Need part replacements
                </p>
                <h4 className="text-[#151515] text-[19px] font-bold">01</h4>
              </div>
              <div className="flex justify-between items-center  w-[251px] py-[11px]">
                <p className="text-[14px] leading-[8px] text-[#6F6464]">
                  Need part repairs
                </p>
                <h4 className="text-[#151515] text-[19px] font-bold">01</h4>
              </div>
              <div className="flex items-center gap-5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Image
                    key={i}
                    src="/images/trip-audit/departure-default-img.svg"
                    width={35}
                    height={35}
                    alt={`departure-default-${i + 1}`}
                  />
                ))}
              </div>
            </div>
            <Image
              src="/images/trip-audit/departure-report-diagram.svg"
              width={296}
              height={296}
              alt="image"
            />
          </div>
        </div>
        {/* VS card */}
        <div className="px-6  ">
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
          className="object-contain absolute transform translate-y-[80%] translate-x-1/2 right-1/2 z-20"
        />
        {/* return card */}
        <div className="rounded-[20px] [background:linear-gradient(180deg,#FFF_0.06%,#FAFAFF_108.04%)] p-[15px]  w-full shadow-[0_-16px_31.1px_0_rgba(10,39,156,0.11)]">
          <h2 className="text-[#303030] font-openSans text-[22px] text-center mt-2 mb-10">
            Return report
          </h2>
          <div className="flex justify-between items-center gap-[30px]">
            <div className="space-y-[10px]">
              <h3 className="text-[#F00] text-[22px] font-bold text-right">
                Very poor
              </h3>
              <div className="flex justify-between items-center w-[251px] py-[11px]">
                <p className="text-[14px] leading-[8px] text-[#6F6464]">
                  New damage detected
                </p>
                <h4 className="text-[#F00] text-[19px] font-bold">27</h4>
              </div>
              <div className="flex justify-between items-center  w-[251px] py-[11px]">
                <p className="text-[14px] leading-[8px] text-[#6F6464]">
                  Total damage found
                </p>
                <h4 className="text-[#151515] text-[19px] font-bold">30</h4>
              </div>
              <div className="flex justify-between items-center  w-[251px] py-[11px]">
                <p className="text-[14px] leading-[8px] text-[#6F6464]">
                  Need part repairs
                </p>
                <h4 className="text-[#151515] text-[19px] font-bold">12</h4>
              </div>
              <div className="flex items-center gap-5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Image
                    key={i}
                    src="/images/trip-audit/departure-default-img.svg"
                    width={35}
                    height={35}
                    alt={`departure-default-${i + 1}`}
                  />
                ))}
              </div>
            </div>
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
  );
};

export default WhyTripAuditSection;
