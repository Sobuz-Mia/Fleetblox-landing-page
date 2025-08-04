import CheckIcon from "@/components/icons/CheckIcon";
import CrossIcon from "@/components/icons/CrossIcon";
import FleetbloxIcon from "@/components/icons/FleetbloxIcon";
import { TVersesCard } from "@/types/types";
import { useTransform, motion } from "framer-motion";

const VirtualCard: React.FC<TVersesCard> = ({
  index,
  number,
  title,
  traditionDes,
  fleetBloxDes,
  targetScale,
  progress,
  range,
}) => {
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      key={index}
      className="sticky z-50 top-[5vh] flex h-[100vh] flex-col items-center justify-center xl:top-[13vh] xl:w-[500px]  max-w-[500px]"
    >
      <motion.div
        className={`relative z-[200] top-[0px] mx-auto transform flex-col gap-x-[30px] max-h-[500px] h-full xl:h-[500px]  w-full `}
        style={{ top: `calc(-5vh + ${index * 15}px)`, scale: scale }}
      >
        {index === 0 && (
          <div className="absolute left-1/2 top-1/2 mt-[90px] w-[50vw] h-[50vw] max-w-[664px] max-h-[664px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ffe1bf] opacity-40 blur-[200px]"></div>
        )}
        <div className="hidden md:block ml-0 lg:ml-10 xl:ml-20 absolute top-[0vh] xl:-top-[8vh] z-[200] w-full h-full">
          {/* <div className="w-[500px] h-[500px] bg-[#FFE1BF] opacity-30 blur-[100px] rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div> */}
          <div className="max-w-[500px] w-full h-[500px] bg-white rounded-[24px] pt-8 px-4 pb-4 flex flex-col gap-[10px]">
            {/* Card Header */}
            <div className="flex flex-col items-center mb-8">
              <div className="w-8 h-8 rounded-full border-2 border-[#0336BC] flex items-center justify-center mb-3">
                <span className="text-[#0336BC] font-semibold">{number}</span>
              </div>
              <h3 className="text-[#0336BC] text-xl font-bold font-openSans">
                {title}
              </h3>
            </div>
            {/* Fleetblox Advantage */}
            <div className="bg-[#FEFAF0] p-5 rounded-xl flex items-center gap-4">
              <div className="w-8 h-[29px]">
                <CheckIcon />
              </div>
              <div>
                <FleetbloxIcon />
                <p className="text-[16px] font-openSans text-[#4A4A4A] mt-1">
                  {fleetBloxDes}
                </p>
              </div>
            </div>

            {/* Traditional Solution */}
            <div className="bg-[#F7F7F7] p-5 rounded-xl flex items-center justify-start gap-4">
              <div className="w-8 h-[29px]">
                <CrossIcon />
              </div>
              <div>
                <div className="text-[#333] font-bold mb-1 font-openSans">
                  Traditional Solutions
                </div>
                <p className="text-[16px] text-[#4A4A4A] font-openSans">
                  {traditionDes}
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* lg:left-10 xl:left-20 */}
        {/* right side card end */}
        <div className="absolute top-[0vh] xl:-top-[8vh] z-[20] rounded-[2px] bg-black opacity-[0.07] blur-[20px] h-[530px] w-[435px] lg:left-[70px] xl:left-[110px]"></div>
        {/* <div className="absolute bottom-[10px] left-[60px] z-[20] rounded-[15px] bg-black opacity-[0.07] blur-[20px] h-[530px] w-[420px]"></div> */}
      </motion.div>
    </div>
  );
};

export default VirtualCard;
