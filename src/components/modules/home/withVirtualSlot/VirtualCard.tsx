import { CardProps } from "@/types/types";
import { useTransform, motion } from "framer-motion";
import Image from "next/image";

const VirtualCard: React.FC<CardProps> = ({
  index,
  icon,
  title,
  description,
  image,
  targetScale,
  progress,
  range,
}) => {
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      key={index}
      className="sticky z-50 top-[10vh] flex h-[100vh] flex-col items-center justify-center lg:top-[15vh] xl:top-[13vh] "
    >
      <motion.div
        className={`relative z-[200] top-[0px] mx-auto transform flex-col gap-x-[30px] max-h-[560px] h-full lg:h-[560px] max-w-[900px] w-full lg:w-[900px]`}
        style={{ top: `calc(-5vh + ${index * 30}px)`, scale: scale }}
      >
        {index === 0 && (
          <div
            className={`absolute left-1/2 top-1/2 mt-[90px] size-[664px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ffe1bf] opacity-40 blur-[200px]`}
          ></div>
        )}
        <div className="absolute -top-[5vh] z-[200] flex rounded-[24px] bg-white p-[10px] w-full justify-between h-full">
          {/* left side */}
          <div className="flex flex-col items-start bg-white px-[20px] pb-[20px] max-w-[380px] w-full pt-[70px] font-openSans">
            <Image className="" src={icon} alt="icon" />
            {title === "Remote Management" ? (
              <h3 className="text-[28px] font-bold text-[#04082C] font-montserrat leading-[1.1] mb-4 mt-[10px]">
                Remote <br /> Management
              </h3>
            ) : (
              <h3 className="text-[28px] font-bold text-[#04082C] font-montserrat leading-[1.1] mb-4 mt-[10px]">
                {title}
              </h3  >
            )}
            <p className="text-[14px] font-openSans font-normal leading-[20px] text-[#333] mb-[30px]">
              {description}
            </p>
            {/* <Link href="/under-development">
              <button className="hidden md:flex transition-all font-openSans bg-[#2D65F2] hover:bg-[#0336BC] text-white-primary text-white duration-300 hover:w-[144.16px] w-[122.16px]  items-center px-[13px] hover:px-4 py-3 text-base font-bold rounded-md group">
                <div className="z-20 whitespace-nowrap">Learn More</div>
                <div className="z-10 transform transition-transform opacity-0 group-hover:opacity-100 -translate-x-4 duration-300 group-hover:translate-x-0">
                  <RightArrowIcon />
                </div>
              </button>
            </Link> */}
          </div>
          {/* right side */}
          <Image
            src={image}
            className="object-fill w-full rounded-r-[24px]"
            alt="image"
            width={500}
            height={500}
            quality={90}
            priority={true}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
          />
        </div>

        <div
          className="absolute -top-[5vh] z-[20] rounded-[2px] bg-black opacity-[0.07] blur-[7px] h-full"
          style={{ width: "calc(100% - 30px)" }}
        ></div>
        <div
          className="absolute bottom-[10px] left-[60px] z-[20] rounded-[15px] bg-black opacity-[0.07] blur-[20px] h-full"
          style={{ width: "calc(100% - 30px)" }}
        ></div>
      </motion.div>
    </div>
  );
};

export default VirtualCard;
