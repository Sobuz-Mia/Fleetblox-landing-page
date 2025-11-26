import BumperFrontSide from "../icons/middleCar/BumperFrontSide";
import BumperRearSide from "../icons/middleCar/BumperRearSide";
import FogLightFrontRightSide from "../icons/middleCar/FogLightFrontRightSide";
import GrillFrontSide from "../icons/middleCar/GrillFrontSide";
import HeadLightLeftSide from "../icons/middleCar/HeadLightLeftSide";
import HeadLightRightSIde from "../icons/middleCar/HeadLightRightSIde";
import Hood from "../icons/middleCar/Hood";
import Roof from "../icons/middleCar/Roof";
import Spoiler from "../icons/middleCar/Spoiler";
import TailLightLeftSide from "../icons/middleCar/TailLightLeftSide";
import TailLightRightSide from "../icons/middleCar/TailLightRightSide";
import Trunk from "../icons/middleCar/Trunk";
import WindShieldFrontSide from "../icons/middleCar/WindShieldFrontSide";
import WindShieldRearSide from "../icons/middleCar/WindShieldRearSide";

const MiddleCarDiagram = () => {
  return (
    <div className="relative border h-fit">
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
        <Hood />
      </div>
      <div className="absolute left-1/2 transform -translate-x-1/2 top-[120px] z-10">
        <WindShieldFrontSide />
      </div>
      <div className="absolute left-1/2 transform -translate-x-1/2 top-[179px] ">
        <Roof />
      </div>
      <div className="absolute left-1/2 transform -translate-x-1/2 top-[310px] z-10 ">
        <WindShieldRearSide />
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
      <div className="absolute left-6 transform -translate-x-1/2 top-[395px]">
        <TailLightLeftSide />
      </div>
      <div className="absolute left-1/2 transform -translate-x-1/2 top-[420px]">
        <BumperRearSide />
      </div>
    </div>
  );
};

export default MiddleCarDiagram;
