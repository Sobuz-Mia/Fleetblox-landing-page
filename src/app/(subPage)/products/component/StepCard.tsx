import Image from "next/image";

interface StepCardProps {
  title: string;
  description: string;
  imagePath: string;
  height?: string;
  stepper?: number;
}

const StepCard = ({
  title,
  description,
  imagePath,
  stepper,
  height = "h-[600px] lg:h-[540px]",
}: StepCardProps) => {
  return (
    <div
      className={`relative z-[200] top-[0px] mx-auto transform flex-col ${height} w-full`}
    >
      <div className="bg-white absolute z-50 rounded-[24px] py-10 px-[30px] flex flex-col gap-[10px] w-full h-full">
        {stepper && (
          <div className="max-w-[32px] max-h-[32px] w-full mx-auto mb-2 h-full border-2 border-[#0336BC] rounded-[60px] p-1 lg:hidden flex items-center justify-center text-[#0336BC] font-openSans text-[16px] font-bold">
            {stepper}
          </div>
        )}
        <div className="font-openSans text-center lg:text-left">
          <h3 className="text-[#04082C] text-[22px] font-bold">{title}</h3>
          <p className="text-[14px] text-[#7D7D7D] leading-5 mt-[5px]">
            {description}
          </p>
        </div>
        <div className="w-full mt-10">
          <Image
            src={imagePath}
            alt={title}
            width={327}
            height={344}
            className="object-contain w-full h-[344px]"
            loading="lazy"
            quality={85}
          />
        </div>
      </div>
      <div className="absolute top-[1vh] z-[20] rounded-[2px] bg-black opacity-[0.07] blur-[20px] h-[565px] w-[calc(100%-15px)] max-w-[1000px] left-[8px]" />
    </div>
  );
};

export default StepCard;
