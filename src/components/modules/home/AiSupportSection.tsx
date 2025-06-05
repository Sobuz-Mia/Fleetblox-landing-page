import Container from "@/components/ui/Container";
import Image from "next/image";
import RightArrowIcon from "@/components/icons/RightArrowIcon";
import Link from "next/link";
const AiSupportSection = () => {
  return (
    <div className="bg-[#0A2540]">
      <Container>
        <section className="py-[60px] flex flex-col lg:flex-row justify-between items-center gap-[40px]">
          <div className="text-white max-w-[570px]">
            <h1 className="text-[36px] font-bold mb-[10px] font-montserrat leading-[1.1]">
              <span className="text-[#2D65F2]">AI</span> Support to Elevate
              Fleet Management
            </h1>
            <p className="text-[16px] leading-6 font-openSans mb-[30px]">
              Your AI Garage Assistant works 24/7, providing real-time insights
              and proactive support. From scheduling maintenance to optimizing
              vehicle performance, ensure uninterrupted operations with smarter
              tools that keep every vehicle at its best.
            </p>
            <Link href="/features/ai-assistant">
              <button className="transition-all hidden md:hidden lg:flex bg-[#2D65F2] hover:bg-[#0336BC] text-white-primary text-white duration-300 hover:w-[144.16px] w-[122.16px] items-center px-4 py-3 text-base font-bold rounded-md group">
                <div className="z-20 whitespace-nowrap">Learn More</div>
                <div className="z-10 transform transition-transform opacity-0 group-hover:opacity-100 -translate-x-4 duration-300 group-hover:translate-x-0">
                  <RightArrowIcon />
                </div>
              </button>
            </Link>
          </div>
          <div className="relative lg:py-[0px] py-[40px] ">
            <Image
              src="/images/aiSupportImg.png"
              className="relative z-[200] hidden lg:block"
              alt="ai support img"
              width={540}
              height={300}
              quality={100}
            />
            <Image
              src="/images/aiSupportImg.webp"
              className="relative z-[200] block lg:hidden"
              alt="ai support img"
              width={540}
              height={300}
              quality={100}
            />
            {/* Blue blur effect for large devices */}
            <div className="absolute left-1/2 top-1/2 hidden lg:block -translate-x-1/2 -translate-y-1/2 max-w-[410px]  lg:w-[410px] max-h-[237px]  lg:h-[237px] opacity-50 rounded-[410px] bg-[#2D65F2] blur-[106px] z-[10]"></div>

            {/* Blue blur effect for small devices */}
            <div className="absolute left-1/2 top-1/2 lg:hidden block -translate-x-1/2 -translate-y-1/2 max-w-[288px] w-full max-h-[180px] h-[180px] opacity-50 rounded-[410px] bg-[#2D65F2] blur-[106px] z-[10]"></div>
            <div className="overflow-hidden">
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[600px] w-[100%] mx-auto max-h-[400px] h-full lg:h-[400px]  bg-[#0A2540] ">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  // preload="auto"
                  className=" z-50 h-full !w-full object-contain mix-blend-plus-lighter "
                >
                  <source src="/videos/ai_support.mov" type="video/mp4" />
                  {/* <source src="/videos/ai_support.webm" type="video/webm" /> */}
                  {/* <source src="/videos/ai_support.mp4" type="video/mp4" /> */}
                </video>
              </div>
            </div>
          </div>
        </section>
        <div className="pb-10 lg:hidden block">
          <Link href="/features/ai-assistant">
            <button className=" bg-[#2D65F2] hover:bg-[#0336BC] text-white w-full flex py-3 px-5 text-[14px] font-openSans font-bold rounded-md justify-center">
              Learn More
            </button>
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default AiSupportSection;
