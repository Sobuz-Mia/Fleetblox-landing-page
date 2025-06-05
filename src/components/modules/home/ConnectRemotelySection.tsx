import RightArrowIcon from "@/components/icons/RightArrowIcon";
import Link from "next/link";

const ConnectRemotelySection = () => {
  return (
    <>
      <main className="bg-white lg:py-20 py-[60px] ">
        <div className="container mx-auto w-full px-4 lg:max-w-7xl">
          <div className="flex flex-col z-50">
            {/* Connect Remotely Section */}
            <section className="flex flex-col text-left md:text-center md:items-center items-start">
              <h3 className="text-[#0336BC] text-[22px] font-openSans font-bold mb-[10px]">
                Plug-and-go live
              </h3>
              <h1 className="text-[28px] md:text-[36px] font-bold text-[#04082C] leading-tight font-montserrat">
                Deploy Your Fleet in Minutes <br className="hidden md:block" />{" "}
                From Your Desk
              </h1>
              <p className="my-4  text-[#333] leading-6 font-openSans text-[14px] md:text-[16px]">
                Fleetblox is built to simplify-what used to take weeks, by
                providing instant fleet activation, and real-time visibility for
                your entire fleet, without the headache of physical
                installations and time-consuming configuration. Once a vehicle
                is onboarded it is 100% visible on the platform, with instant
                accessibility to status, location , and readiness.
              </p>
              <Link href="/products/fleet-integration">
                <button className="hidden md:flex lg:flex mb-10 transition-all bg-[#2D65F2] hover:bg-[#0336BC] text-white duration-300 hover:w-[144.16px] w-[122.16px] items-center px-4 py-3 text-[16px] font-bold rounded-md group">
                  <div className="z-20 whitespace-nowrap font-openSans font-bold">
                    Learn More
                  </div>
                  <div className="z-10 transform transition-transform opacity-0 group-hover:opacity-100 -translate-x-4 duration-300 group-hover:translate-x-0">
                    <RightArrowIcon />
                  </div>
                </button>
              </Link>
            </section>

            {/* Video Section */}
            <section className="border border-[#DFDFDF] h-[250px] xs:h-[280px] sm:h-[350px] md:h-[425px] rounded-[24px] bg-white overflow-hidden">
              <div className="relative w-full h-full">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  className="absolute inset-0 w-full h-full object-cover"
                >
                  <source src="/videos/connect-remotely.mov" type="video/mp4" />
                  {/* <source
                    src="/videos/connect-remotely.webm"
                    type="video/webm"
                  /> */}
                  {/* <source
                    src="/videos/connect-remotely.mp4"
                    type="video/mp4"
                    media="(min-width: 768px)"
                  /> */}
                </video>
              </div>
            </section>

            {/* <div className=" flex md:hidden lg:hidden justify-center w-full"> */}
            <Link href="/products/fleet-integration">
              <button className="lg:hidden mt-10 bg-[#2D65F2] hover:bg-[#0336BC] text-white w-full flex px-4 py-3 text-[14px] font-openSans font-bold rounded-md justify-center">
                Learn More
              </button>
            </Link>
            {/* </div> */}
            {/* <div className="border-b block md:hidden mt-[80px]  mb-[60px] border-[#DFDFDF]"></div> */}
          </div>
        </div>
      </main>
      {/* Optimize section */}
      {/* <div className="bg-[#FAFAFF] pt-[90px] pb-[120px] md:pt-[0px] md:pb-[0px] md:py-10">
        <section className="flex mx-auto w-full lg:max-w-7xl flex-col py-[0px] md:py-[120px] lg:flex-row p-0 rounded-[24px] px-5 items-center gap-[60px] h-auto md:rounded-[24px]">
          <div className="lg:w-[570px] w-full">
            <h1 className="text-[28px] sm:text-[32px] md:text-[36px] font-bold text-[#04082C] leading-tight font-montserrat">
              Optimize Fleet Safety
              <span className="md:block"> and Ensure Compliance</span>
            </h1>

            <p className="my-4 md:my-5 text-[#333] leading-6 text-[15px] font-openSans md:text-[16px]">
              Stay ahead with dynamic reminders for registration and insurance
              renewals, seamless repair coordination, and real-time location
              allocation. Access detailed vehicle condition reports, including
              diagnostic diagrams, all from a single platform. Your data is
              secured with HTTPS encryption, AES-256, SOC 2 Type 2, and complies
              with CCPA & GDPR, ensuring top-notch security and privacy
              standards.
            </p>
            <Link href="/products/documents-management">
              <button className="hidden lg:flex font-openSans transition-all bg-[#2D65F2] text-white-primary text-white duration-300 hover:w-[144.16px] w-[122.16px]  items-center px-[13px] hover:px-4 py-3 text-base font-bold rounded-md group">
                <div className="z-20 whitespace-nowrap">Learn More</div>
                <div className="z-10 transform transition-transform opacity-0 group-hover:opacity-100 -translate-x-4 duration-300 group-hover:translate-x-0">
                  <RightArrowIcon />
                </div>
              </button>
            </Link>
          </div>

          <Image
            src="/images/aI-assistant.webp"
            alt="AI assistant for fleet optimization"
            width={500}
            height={300}
            className="object-contain w-full h-auto rounded-[24px] lg:max-w-[548px] max-h-[294px]"
            quality={90}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
            priority
          />
          <div className="lg:hidden block w-full">
            <Link href="/products/document-management">
              <button className="bg-[#2D65F2] mt-5 hover:bg-[#0336BC] text-white w-full flex px-4 py-3 text-[14px] font-openSans font-bold rounded-md justify-center">
                Learn More
              </button>
            </Link>
          </div>
        </section>
      </div> */}
    </>
  );
};

export default ConnectRemotelySection;
