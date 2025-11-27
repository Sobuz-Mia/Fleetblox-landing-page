import AllowRimFrontRightSide from "../icons/RightSIdeParts/AllowRimFrontRightSide";
import AllowRimRearRightSide from "../icons/RightSIdeParts/AllowRimRearRightSide";
import ArcPanelFrontRightSide from "../icons/RightSIdeParts/ArcPanelFrontRightSide";
import ArcPanelRearRightSide from "../icons/RightSIdeParts/ArcPanelRearRightSide";
import DoorFrontRightSide from "../icons/RightSIdeParts/DoorFrontRightSide";
import DoorHandleFrontRightSide from "../icons/RightSIdeParts/DoorHandleFrontRightSide";
import DoorRearRightSide from "../icons/RightSIdeParts/DoorRearRightSide";
import FenderRightSide from "../icons/RightSIdeParts/FenderRightSide";
import FrontBumperRightSIde from "../icons/RightSIdeParts/FrontBumperRightSIde";
import IndicatorLightFrondRightSide from "../icons/RightSIdeParts/IndicatorLightFrondRightSide";
import MirrorFrontRightSide from "../icons/RightSIdeParts/MirrorFrontRightSide";
import MoldingRightSide from "../icons/RightSIdeParts/MoldingRightSide";
import QuaterGlassRightSide from "../icons/RightSIdeParts/QuaterGlassRightSide";
import QuaterPanelRightSide from "../icons/RightSIdeParts/QuaterPanelRightSide";
import SideBumperRearRightSide from "../icons/RightSIdeParts/SideBumperRearRightSide";
import SideRockerRightSide from "../icons/RightSIdeParts/SideRockerRightSide";
import WheelFrontRightSide from "../icons/RightSIdeParts/WheelFrontRightSide";
import WheelRearRightSIde from "../icons/RightSIdeParts/WheelRearRightSIde";
import WindowFrontRightSide from "../icons/RightSIdeParts/WindowFrontRightSide";
import WindowRearRightSide from "../icons/RightSIdeParts/WindowRearRightSide";

const RightSIdeCarDiagram = () => {
  return (
    <div className="relative">
      <div className="absolute right-[2px] top-[11px]">
        <FenderRightSide />
      </div>
      <div className="absolute right-[26px] -top-[5px] ">
        <IndicatorLightFrondRightSide />
      </div>

      <div className="absolute -right-[5px] -top-[7px]">
        <FrontBumperRightSIde />
      </div>
      <div className="absolute right-[3px] top-[29px]">
        <ArcPanelFrontRightSide />
      </div>
      <div className="absolute -right-[27px] top-[32px]">
        <WheelFrontRightSide />
      </div>
      <div className="absolute -right-[20px] top-[39px]">
        <AllowRimFrontRightSide />
      </div>
      <div className="absolute right-[2px] top-[106px]">
        <div className="relative">
          <DoorFrontRightSide />
          <div className="absolute top-[7px] left-1">
            <WindowFrontRightSide />
          </div>
          <div className="absolute top-[4px] left-[49px] z-10">
            <MoldingRightSide />
          </div>
          <div className="absolute bottom-[13px] left-[39px] z-10">
            <DoorHandleFrontRightSide />
          </div>
          <div className="absolute top-[11px] left-[26px] z-10">
            <MirrorFrontRightSide />
          </div>
        </div>
      </div>
      <div className="absolute right-[2px] top-[186px]">
        <div className="relative">
          <DoorRearRightSide />

          <div className="absolute top-[6.5px] left-1">
            <WindowRearRightSide />
          </div>
          <div className="absolute bottom-[10px] left-[39px] z-10">
            <DoorHandleFrontRightSide />
          </div>
        </div>
      </div>
      <div className="absolute right-[2px] top-[240px]">
        <QuaterPanelRightSide />
      </div>
      <div className="absolute -right-[4px] top-[88px]">
        <SideRockerRightSide />
      </div>
      <div className="absolute right-[0px] top-[287px]">
        <SideBumperRearRightSide />
      </div>
      <div className="absolute right-[2px] top-[248px]">
        <ArcPanelRearRightSide />
      </div>
      <div className="absolute -right-[28px] top-[251px]">
        <WheelRearRightSIde />
      </div>
      <div className="absolute -right-[21px] top-[258px]">
        <AllowRimRearRightSide />
      </div>
      <div className="absolute right-[59px] top-[257px]">
        <QuaterGlassRightSide />
      </div>
    </div>
  );
};

export default RightSIdeCarDiagram;
