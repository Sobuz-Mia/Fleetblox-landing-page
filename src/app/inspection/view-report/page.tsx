import { Divider } from "antd";
import DepartureInspectionIcon from "./icons/DepartureInspectionIcon";
import conditionBar from "../../../../public/images/inspection/condition-bar.png";
import Image from "next/image";
import CarDiagram from "./components/CarDiagram";
const InspectionFinalReport = () => {
  return (
    <div className="max-w-[390px] mx-auto w-full p-5">
      <div className="flex items-center gap-[10px]">
        <div
          className="p-[10px] rounded-full w-fit"
          style={{ background: `rgb(45, 101, 242, 0.06)` }}
        >
          <DepartureInspectionIcon />
        </div>
        <div>
          <h2 className="text-[#303030] text-[18px] font-semibold">
            Departure inspection report
          </h2>
          <p className="text-[#999] text-[12px] leading-4">#143563</p>
        </div>
      </div>
      <div className="mt-[10px] mb-8">
        <div className="flex items-center gap-[5px]">
          <p className="text-[12px] text-[#999]">Inspection time:</p>
          <p className="text-[12px] text-[#151515] font-semibold">
            12 Jan 2024 <span className="text-[#6F6464]">12:34 PM</span>
          </p>
        </div>
        <p className="text-[12px] text-[#999]">
          Locations:{" "}
          <span className="text-[#151515] leading-4 font-medium">
            Location name of the phones current location
          </span>
        </p>
      </div>
      {/* basic info section */}
      <div>
        <h1 className="text-[14px] text-[#6F6464] font-bold">Basic info</h1>
        <p className="text-[12px] text-[#999] my-4">
          Odometer reading:{" "}
          <span className="text-[#151515] leading-4 font-medium">1032 M</span>
        </p>
      </div>
      {/* conditions */}
      <div className="flex gap-10 items-center mb-8">
        <div className="text-center w-[220px]">
          <div className="text-center flex-center flex flex-col justify-center items-center">
            <div className=" h-[70px] text-[56px]">😕</div>
            {/* {getVehicleCondition(fullExteriorCondition)} */}
            <p className="mt-[5px] text-[20px] font-semibold text-[#4DB429]">
              {" "}
              Excellent
            </p>
            <p className="text-[#6F6464] text-[10px] font-medium">Overall</p>
          </div>

          {/* <div className="text-center flex-center flex flex-col">
              <div className="text-[56px] h-[70px]">😕</div>
              <p className="text-[#45C817] text-[20px] mt-2 font-bold">
                Invalid score
              </p>
              <p className="text-[#6F6464] text-[10px] font-medium">Overall</p>
            </div> */}
        </div>
        <div className="w-full">
          <div className="flex justify-between items-center">
            <p className="text-[12px] text-[#6F6464] font-medium leading-4">
              Total parts detected
            </p>
            <h2 className="text-[14px] font-bold text-[#151515]">46</h2>
          </div>
          <Divider className="my-[12px]" />
          <div className="flex justify-between items-center">
            <p className="text-[12px] text-[#6F6464] font-medium leading-4">
              Damages found
            </p>
            <h2 className="text-[14px] font-bold text-[#151515]"> 30</h2>
          </div>
          <Divider className="my-[12px]" />
          <div className="flex justify-between items-center">
            <p className="text-[12px] text-[#6F6464] font-medium leading-4">
              Missing parts
            </p>
            <h2 className="text-[14px] font-bold text-[#151515]"> 0</h2>
          </div>
        </div>
      </div>
      {/* damage bar */}
      <div className="flex gap-[10px] items-center justify-center">
        <p className="text-[10px] font-medium whitespace-nowrap">Low damage</p>
        <Image
          src={conditionBar}
          alt="Condition Bar"
          width={150}
          height={8}
          className="border"
        />
        <p className="text-[10px] font-medium whitespace-nowrap">High damage</p>
      </div>
      <CarDiagram />
      {/* <h1 className="h-[400px]">hellow</h1> */}
    </div>
  );
};

export default InspectionFinalReport;
