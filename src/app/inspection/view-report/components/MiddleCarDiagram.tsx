import Antena from "../icons/middleCar/Antena";
import BrakeLight from "../icons/middleCar/BrakeLight";
import BumperFrontSide from "../icons/middleCar/BumperFrontSide";
import BumperRearSide from "../icons/middleCar/BumperRearSide";
import FogLightFrontRightSide from "../icons/middleCar/FogLightFrontRightSide";
import GrillFrontSide from "../icons/middleCar/GrillFrontSide";
import HeadLightLeftSide from "../icons/middleCar/HeadLightLeftSide";
import HeadLightRightSIde from "../icons/middleCar/HeadLightRightSIde";
import Hood from "../icons/middleCar/Hood";
import LicensePlate from "../icons/middleCar/LicensePlate";
import LogoFrontSIde from "../icons/middleCar/LogoFrontSIde";
import Roof from "../icons/middleCar/Roof";
import RoofRailRightSide from "../icons/middleCar/RoofRailRightSide";
import Spoiler from "../icons/middleCar/Spoiler";
import TailLightLeftSide from "../icons/middleCar/TailLightLeftSide";
import TailLightRightSide from "../icons/middleCar/TailLightRightSide";
import Trunk from "../icons/middleCar/Trunk";
import WindShieldFrontSide from "../icons/middleCar/WindShieldFrontSide";
import WindShieldRearSide from "../icons/middleCar/WindShieldRearSide";
import WiperFrontSide from "../icons/middleCar/WiperFrontSide";

const MiddleCarDiagram = () => {
  return (
    <div className="relative h-fit">
      <div className="relative">
        <BumperFrontSide />
        <div className="absolute top-1/2 right-[10px] transform -translate-y-1/2">
          <FogLightFrontRightSide />
        </div>
        <div className="absolute top-1/2 left-[10px] transform -translate-y-1/2">
          <FogLightFrontRightSide />
        </div>
      </div>
      <div className="absolute left-1/2 transform -translate-x-1/2 top-1/2 ">
        <GrillFrontSide />
      </div>
      <div className="-right-1 absolute top-[33px] ">
        <HeadLightRightSIde />
      </div>
      <div className="-left-1 absolute top-[33px] ">
        <HeadLightLeftSide />
      </div>
      <div className="absolute left-1/2 transform -translate-x-1/2 top-[53px] ">
        <div className="relative">
          <Hood />
          <div className="absolute top-1 left-1/2 transform -translate-x-1/2">
            <LogoFrontSIde />
          </div>
        </div>
      </div>
      <div className="absolute left-1/2 transform -translate-x-1/2 top-[120px] z-10">
        <div className="relative">
          <WindShieldFrontSide />
          <div className="absolute top-0 transform -translate-x-1/2 left-1/2">
            <WiperFrontSide />
          </div>
        </div>
      </div>
      <div className="absolute left-1/2 transform -translate-x-1/2 top-[179px] ">
        <div className="relative">
          <Roof />
          <div className="absolute top-1/2 transform -translate-y-1/2 right-4">
            <RoofRailRightSide />
          </div>
          <div className="absolute top-1/2 transform -translate-y-1/2 left-4">
            <RoofRailRightSide />
          </div>
          <div className="absolute bottom-1 transform -translate-x-1/2  left-1/2 z-10">
            <Antena />
          </div>
        </div>
      </div>
      <div className="absolute left-1/2 transform -translate-x-1/2 top-[310px] z-10 ">
        <div className="relative">
          <WindShieldRearSide />
          <div className="absolute top-2 transform -translate-x-1/2 left-1/2">
            <BrakeLight />
          </div>
          <div className="absolute bottom-0 transform -translate-x-1/2 left-1/2">
            <WiperFrontSide />
          </div>
        </div>
      </div>
      <div className="absolute left-1/2 transform -translate-x-1/2 top-[340px] ">
        <Trunk />
      </div>
      <div className="absolute left-1/2 transform -translate-x-1/2 top-[375px] z-10 ">
        <Spoiler />
      </div>
      <div className="absolute -right-3 transform -translate-x-1/2 top-[395px]">
        <TailLightRightSide />
      </div>
      <div className="absolute left-1/2 transform -translate-x-1/2 top-[400px]">
        <LogoFrontSIde />
      </div>
      <div className="absolute left-6 transform -translate-x-1/2 top-[395px]">
        <TailLightLeftSide />
      </div>
      <div className="absolute left-1/2 transform -translate-x-1/2 top-[420px]">
        <div className="relative">
          <BumperRearSide />
          <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
            <FogLightFrontRightSide />
          </div>
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
            <FogLightFrontRightSide />
          </div>
          <div className="absolute left-1/2 bottom-1 transform -translate-x-1/2">
            <LicensePlate />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiddleCarDiagram;
