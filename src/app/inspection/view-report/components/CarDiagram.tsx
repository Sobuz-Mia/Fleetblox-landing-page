import LeftSideCarDiaGram from "./LeftSideCarDiaGram";
import MiddleCarDiagram from "./MiddleCarDiagram";
import RightSIdeCarDiagram from "./RightSIdeCarDiagram";

const CarDiagram = () => {
  return (
    <div className="relative w-[290px] h-[500px] mt-8 mx-auto">
      {/* Middle Base Car */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10">
        <MiddleCarDiagram />
      </div>

      {/* Left Side View */}
      <div className="absolute -top-[10px] -left-[28px] z-20">
        <LeftSideCarDiaGram />
      </div>

      {/* Right Side View */}
      <div className="absolute top-[50px] right-0 z-20">
        <RightSIdeCarDiagram />
      </div>
    </div>
  );
};

export default CarDiagram;
