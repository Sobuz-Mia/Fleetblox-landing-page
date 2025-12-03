import Image from "next/image";

const CommonProblemSection = () => {
  return (
    <div className="bg-white">
      <div className=" pt-[100px] pb-[80px] ">
        <h2 className="text-[#04082C] text-[36px] font-bold max-w-[840px] w-full mx-auto text-center font-montserrat px-5">
          Common Problems That <br />{" "}
          <span className="text-[#0336BC]">Trip Audits</span> Solve
        </h2>
        <div className="pt-[60px] ">
          <div className="flex gap-[30px] items-center  ">
            <div className="py-20 pl-[170px] pr-[50px] bg-custom-gradient ">
              <Image
                src={"/images/trip-audit/condition-documentation.svg"}
                width={760}
                height={540}
                alt="vehicle conditions "
                className="px-5"
              />
            </div>
            <div className="max-w-[570px] flex-1 bg-white px-5">
              <h1 className="text-[#04082C] text-[28px] font-bold font-montserrat">
                Lack of Vehicle Condition Documentation
              </h1>
              <p className="text-[#333] text-[16px] font-openSans leading-6 py-4">
                Paper checklists are misplaced or incomplete. Signatures go
                missing, and photos are stored locally instead of centrally.
              </p>

              <p className="text-[14px] font-bold text-[#04082C] font-openSans">
                Impact:{" "}
                <span className="font-normal leading-5">
                  Slow claim processing, heavy administration, and complex
                  dispute handling.
                </span>
              </p>
            </div>
          </div>
          <div className="flex gap-[30px] items-center  ">
            <div className="py-20 pl-[170px] pr-[50px] bg-[#FFF5F5] ">
              <Image
                src={"/images/trip-audit/hidden-damage-img.svg"}
                width={760}
                height={540}
                alt="vehicle conditions "
                className="px-5"
              />
            </div>
            <div className="max-w-[570px] flex-1 bg-white px-5">
              <h1 className="text-[#04082C] text-[28px] font-bold font-montserrat">
                Hidden or Pre-Existing Vehicle Damage
              </h1>
              <p className="text-[#333] text-[16px] font-openSans leading-6 py-4">
                Minor scratches, underbody dents, or windshield chips go
                unnoticed. Renters may skip thorough checks due to time
                constraints or lack of guidance.
              </p>

              <p className="text-[14px] font-bold text-[#04082C] font-openSans">
                Impact:{" "}
                <span className="font-normal leading-5">
                  Unnoticed damages lead to costly disputes, sometimes hundreds
                  of dollars.
                </span>
              </p>
            </div>
          </div>
          <div className="flex gap-[30px] items-center  ">
            <div className="py-20 pl-[170px] pr-[50px] bg-[linear-gradient(180deg,#FFF5F5_0%,#FFF_100%)]">
              <Image
                src={"/images/trip-audit/inspection-process.svg"}
                width={760}
                height={540}
                alt="vehicle conditions "
                className="px-5"
              />
            </div>
            <div className="max-w-[570px] flex-1 bg-white px-5">
              <h1 className="text-[#04082C] text-[28px] font-bold font-montserrat">
                Slow and Inefficient Inspection Processes
              </h1>
              <p className="text-[#333] text-[16px] font-openSans leading-6 py-4">
                Manual inspections vary by employee without proper workflow and
                lack automation. Fleet data is not centralized, causing delays.
              </p>

              <p className="text-[14px] font-bold text-[#04082C] font-openSans">
                Impact:{" "}
                <span className="font-normal leading-5">
                  Idle vehicles, frustrated customers, and lost revenue.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommonProblemSection;
