import AllowRimFrontLeftSide from "../icons/leftCarParts/AllowRimFrontLeftSide";
import AllowRimRearLeftSide from "../icons/leftCarParts/AllowRimRearLeftSide";
import ArcPanelFrontLeftSide from "../icons/leftCarParts/ArcPanelFrontLeftSide";
import ArcPanelRearLeftSide from "../icons/leftCarParts/ArcPanelRearLeftSide";
import DoorHandleFrontLeftSide from "../icons/leftCarParts/DoorHandleFrontLeftSide";
import DoorsFrontLeftSide from "../icons/leftCarParts/DoorsFrontLeftSide";
import DoorsRearLeftSide from "../icons/leftCarParts/DoorsRearLeftSide";
import FenderLeftSide from "../icons/leftCarParts/FenderLeftSide";
import FuelCap from "../icons/leftCarParts/FuelCap";
import IndicatorLightLeftSide from "../icons/leftCarParts/IndicatorLightLeftSide";
import IndicatorsLightLeftSide from "../icons/leftCarParts/IndicatorsLightLeftSide";
import MoldingRearLeftSide from "../icons/leftCarParts/MoldingRearLeftSide";
import QuarterGlassLeftSide from "../icons/leftCarParts/QuarterGlassLeftSide";
import QuaterPanelLeftSide from "../icons/leftCarParts/QuaterPanelLeftSide";
import SideBumberRearLeftSide from "../icons/leftCarParts/SideBumberRearLeftSide";
import SideBumperFrontLeftSide from "../icons/leftCarParts/SideBumperFrontLeftSide";
import SideMirrorLeftSide from "../icons/leftCarParts/SideMirrorLeftSide";
import SideRockerPanelLeftSide from "../icons/leftCarParts/SideRockerPanelLeftSide";
import WheelFrontLeftSide from "../icons/leftCarParts/WheelFrontLeftSide";
import WheelRearLeftSide from "../icons/leftCarParts/WheelRearLeftSide";
import WindowFrontLeftSide from "../icons/leftCarParts/WindowFrontLeftSide";
import WindowRearLeftSide from "../icons/leftCarParts/WindowRearLeftSide";
import DoorHandleRearLeftSide from "./../icons/leftCarParts/DoorHandleRearLeftSide";

const LeftSideCarDiaGram = () => {
  return (
    <div className="relative ">
      <div className="absolute left-[32px] top-[68px]">
        <FenderLeftSide />
      </div>
      <div className="absolute left-[55px] top-[53px]">
        <IndicatorsLightLeftSide />
      </div>
      <div className="absolute left-[33px] top-[290px]">
        <div className="relative ">
          <QuaterPanelLeftSide />

          <div className="absolute left-[23px] bottom-[0px]">
            <IndicatorLightLeftSide />
          </div>
          <div className="absolute left-[38px] top-[30px]">
            <FuelCap />
          </div>
          <div className="absolute right-[5px] top-[18px]">
            <QuarterGlassLeftSide />
          </div>
        </div>
      </div>
      <div className="absolute left-[24px] top-[50px]">
        <SideBumperFrontLeftSide />
      </div>
      <div className="absolute left-[32px] top-[238px]">
        <div className="relative">
          <DoorsRearLeftSide />
        </div>
        <div className="absolute right-1 top-[8px]">
          <WindowRearLeftSide />
        </div>
        <div className="absolute left-[35px] z-10 -top-[77px]">
          <MoldingRearLeftSide />
        </div>
        <div className="absolute left-[45px] z-10 bottom-[5px]">
          <DoorHandleRearLeftSide />
        </div>
      </div>
      <div className="absolute left-[32px] top-[157px]">
        <div className="relative">
          <DoorsFrontLeftSide />
          <div className="absolute right-1 top-2">
            <div className="relative">
              <WindowFrontLeftSide />
              <div className="absolute left-[0px] top-[5px]">
                <SideMirrorLeftSide />
              </div>
            </div>
          </div>
          <div className="absolute left-[45px] bottom-[12px]">
            <DoorHandleFrontLeftSide />
          </div>
        </div>
      </div>
      <div className="absolute left-[30px] top-[335px]">
        <SideBumberRearLeftSide />
      </div>
      <div className="absolute left-[30px] top-[297px]">
        <ArcPanelRearLeftSide />
      </div>
      <div className="absolute left-[3px] top-[300px]">
        <WheelRearLeftSide />
      </div>
      <div className="absolute left-[9.5px] top-[307px]">
        <AllowRimRearLeftSide />
      </div>
      <div className="absolute left-[26px] top-[143.5px]">
        <SideRockerPanelLeftSide />
      </div>
      <div className="absolute left-[31px] top-[86.5px]">
        <ArcPanelFrontLeftSide />
      </div>
      <div className="absolute left-[5px] top-[90px]">
        <WheelFrontLeftSide />
      </div>
      <div className="absolute left-[12px] top-[96px]">
        <AllowRimFrontLeftSide />
      </div>
    </div>
  );
};

export default LeftSideCarDiaGram;
