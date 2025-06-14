import RightArrowIcon from "@/components/icons/RightArrowIcon";

import Image from "next/image";
import Link from "next/link";
import proofOfCondition from "../icons/proofofCondition";
import stayCompliant from "../icons/stayCompliant";
import zeroPaper from "../icons/zeroPaper";
import GlobeSection from "@/components/modules/home/globe";
import FeatureCard from "@/components/ui/FeatureCard";
import StepCard from "../component/StepCard";
import FleetConnectionStep from "../component/FleetConnectionStep";

const page = () => {
  const items = [
    {
      id: 1,
      title: "Proof of Condition",
      icon: proofOfCondition,
    },
    {
      id: 2,
      title: "Zero Paper",
      icon: zeroPaper,
    },
    {
      id: 3,
      title: "Stay Compliant",
      icon: stayCompliant,
    },
  ];

  const whyFleetManager = [
    {
      icon: ReduceRisk,
      title: "Reduce Risk",
      description:
        "Document vehicle condition upfront to avoid disputes and hidden damage.",
    },
    {
      icon: EnsureCompliance,
      title: "Ensure Compliance",
      description:
        "Meet policy and regulatory standards with digital, time-stamped records.",
    },
    {
      icon: SpeedOnboard,
      title: "Speed Up Onboarding",
      description:
        "Go paperless for faster approvals and instant system updates.",
    },
    {
      icon: IncreaseTransparency,
      title: "Increase Transparency",
      description: "Share real-time inspection data with teams and partners.",
    },
    {
      icon: BuildTrust,
      title: "Build Trust",
      description:
        "A verified process boosts confidence and smooths transactions.",
    },
  ];
  return (
    <div>
      {/* hero section */}
      <section className="bg-[#FAFAFF] pt-[100px] lg:pt-[140px] pb-[30px] ">
        <div className="lg:max-w-[calc(100vw-30px)] xxl:max-w-[1440px] mx-auto w-full flex flex-col px-5 lg:flex-row items-center justify-between">
          <div className="xl:pl-[120px]">
            <h3 className="text-[#0336BC] font-openSans font-bold text-[22px]">
              Digital Inspections
            </h3>
            <h1 className="text-[#04082C] text-[36px] lg:text-[52px] font-bold leading-tight lg:leading-[1.1]">
              Smarter Inspections Powered by AI
            </h1>
            <p className="text-[#333] text-[16px] leading-6 mt-4 mb-5 font-openSans">
              Ensure every vehicle meets your standards before it hits the road.
              Capture vehicle condition, performance, compliance, and
              documentation—right from the start.
            </p>
            <Link
              aria-label="Get started with FleetBlox"
              href="/getting-started"
            >
              <button className="hidden transition-all bg-[#2D65F2] hover:bg-[#0336BC] font-openSans text-white-primary text-white duration-300 hover:w-[144.16px] w-[122.16px] lg:flex items-center px-4 py-3 text-base font-bold rounded-md group">
                <div className="z-20 whitespace-nowrap">Start today</div>
                <div className="z-10 transform transition-transform opacity-0 group-hover:opacity-100 -translate-x-4 duration-300 group-hover:translate-x-0">
                  <RightArrowIcon />
                </div>
              </button>
            </Link>
            <Link
              aria-label="Get started with FleetBlox"
              href="/getting-started"
            >
              <button className="lg:hidden bg-[#2D65F2] hover:bg-[#0336BC] text-white w-full flex px-4 py-3 text-[14px] font-openSans font-bold rounded-md justify-center">
                Start today
              </button>
            </Link>
          </div>
          <div className=" w-full py-5 lg:pl-[60px]">
            <Image
              src="/images/ai-powered-inspectionHero.png"
              alt="AI assistant for fleet optimization"
              width={700}
              height={491}
              className="object-contain w-full"
            />
          </div>
        </div>
      </section>
      {/* hero section end */}
      <section className="max-w-[1200px] mx-auto w-full mt-[60px] lg:mt-[100px] px-5">
        <div className="max-w-[840px] mx-auto w-full text-center px-5">
          <h1 className="text-[#04082C] text-[28px] lg:text-[36px] font-bold text-center leading-[1.1] mb-[10px]">
            Compliance Made Simple for Smarter Fleets
          </h1>
          <p className="text-[#333] text-[16px] leading-6 font-openSans">
            Enjoy a cleaner, smarter fleet experience that keeps future problems
            out of the way.
          </p>
        </div>
        <div className=" grid grid-cols-1 justify-items-center md:flex items-center my-5  justify-center gap-4">
          {/* Additional content can be added here */}
          {items.map((item) => (
            <IconCard
              key={item.id}
              icon={<item.icon />}
              title={item.title}
              className="max-w-[300px] w-full border mt-8 border-[#DFDFDF] rounded-[16px] p-[30px] flex flex-col items-center justify-center"
            />
          ))}
        </div>
      </section>
      {/* why Cloud section */}
      <section className="bg-[#FAFAFF] py-[100px] px-5">
        <h3 className="text-[#04082C] text-[36px] font-bold leading-[1.1] text-center ">
          Simplify Inspections in 3 Easy Steps
        </h3>
        <p className="text-[#333] text-[16px] mt-[10px] leading-6 text-center font-openSans">
          Quick, accurate, and AI-powered inspections with easy steps for <br />
          complete vehicle health
        </p>
        <div className="max-w-[1200px] w-full mx-auto mt-[60px] mb-10 px-5">
          <FleetConnectionStep />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 relative max-w-[1200px] mx-auto w-full gap-5 justify-items-center items-center ">
          <div className="absolute hidden lg:block left-1/2 top-1/2 mt-[90px] max-w-[664px] max-h-[664px] h-full w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FBEECA] opacity-40 blur-[200px]"></div>
          <StepCard
            title="Assign a Technician"
            description="Choose a team member or partner to handle the inspection."
            imagePath="/images/ai-powered-inspection.png"
          />
          <StepCard
            title="Perform the Inspection"
            description="Complete the digital checklist, capture photos, and test the
                  vehicle’s performance."
            imagePath="/images/ai-powered-inspection2.png"
          />

          <div
            className={`relative z-[200] top-[0px] mx-auto transform flex-col h-[600px] lg:h-[536px] w-full`}
          >
            <div className=" bg-white absolute z-50 rounded-[24px] pt-10 px-[30px] flex flex-col gap-[10px] w-full h-full">
              {/* Card Header */}
              <div className="font-openSans text-center lg:text-left">
                <h3 className="text-[#04082C] text-[22px] font-bold">
                  Generate Report
                </h3>
                <p className="text-[14px] text-[#7D7D7D] leading-5 mt-[5px]">
                  Generate a seamless report showcasing the full status and
                  condition of your vehicle.
                </p>
              </div>
              <div className="w-full mt-10 overflow-hidden">
                <Image
                  src="/images/ai-powered-inspection3.png"
                  alt="Remote Scalability Hero"
                  width={327}
                  height={700}
                  className="object-contain w-full h-[550px] lg:h-[400px]"
                  quality={100}
                />
              </div>
            </div>
            <div className="absolute top-[1vh] z-[20] rounded-[2px] bg-black opacity-[0.07] blur-[20px] h-[610px] lg:h-[565px] w-full max-w-[358px] left-[8px]"></div>
          </div>
        </div>
      </section>

      {/* why Cloud section end */}

      <section className="py-[100px] ">
        <div className="max-w-[840px] w-full mx-auto text-center px-5">
          <h3 className="text-[#04082C] text-[18px] md:text-[36px] font-bold leading-[1.1]">
            A Seamless Process to Ensure Vehicle Compliance and Condition
          </h3>
          <p className="text-[#333] text-[16px] font-normal leading-6 font-openSans mt-[5px] ">
            An easy and streamlined process guiding you through inspections,
            compliance tracking, and overall vehicle condition assessment.
          </p>
        </div>
        <div className="max-w-[1200px] hidden md:block w-full mx-auto mt-[60px] px-5">
          <Image
            src="/images/products/maintenance/vehicle-complience-condition.svg"
            alt="Remote Scalability Hero"
            width={700}
            height={491}
            className="object-contain w-full"
            quality={100}
          />
        </div>
        <div className="max-w-[1200px] md:hidden block w-full mx-auto mt-[40px] px-5">
          <Image
            src="/images/products/vehicle-complience-condition-mobile.svg"
            alt="Remote Scalability Hero"
            width={700}
            height={491}
            className="object-contain w-full"
            quality={100}
          />
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto w-full mb-[60px] px-5">
        <h1 className="mb-[40px] lg:mb-[60px] text-center max-w-[840px] w-full mx-auto text-[#04082C] text-[28px] lg:text-[36px] font-bold">
          {`Fleet Check-In That Reduce Risk and Disputes`}
        </h1>
        <div className="lg:grid hidden grid-cols-1 lg:grid-cols-3 justify-items-center items-center gap-[30px]">
          {whyFleetManager?.slice(0, 3).map((data, index) => (
            <FeatureCard
              key={index}
              icon={<data.icon />}
              title={data.title}
              description={data.description}
              // className="lg:max-w-[380px] lg:w-full"
            />
          ))}
        </div>
        <div className="grid lg:hidden grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center items-center lg:gap-[30px] gap-[20px]">
          {whyFleetManager?.map((data, index) => (
            <FeatureCard
              key={index}
              icon={<data.icon />}
              title={data.title}
              description={data.description}
              className={`w-full ${
                index === 4 && "md:col-span-2 md:max-w-[380px] mx-auto"
              }`}
            />
          ))}
        </div>
        <div className="lg:flex hidden flex-col items-center justify-items-center justify-center lg:flex-row mt-[30px] gap-[30px]">
          {whyFleetManager?.slice(3, 5).map((data, index) => (
            <FeatureCard
              key={index}
              icon={<data.icon />}
              title={data.title}
              description={data.description}
              className="lg:max-w-[380px] lg:w-full"
            />
          ))}
        </div>
      </section>

      {/* Brand Globe Section */}
      <GlobeSection
        title="Your Vehicles Might Be Smarter <br /> Than You Think"
        description="  Check your fleet’s compatibility and take the first step toward
            smarter, cloud-powered solutions designed for greater efficiency,
            flexibility, and future readiness."
      />

      {/* Brand Globe Section End */}
    </div>
  );
};

export default page;

const IconCard = ({
  icon,
  title,
  className,
}: {
  icon: React.ReactNode;
  title: string;
  className: string;
}) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className="flex items-center justify-center w-[60px] h-[60px] bg-[#F2F4FF] rounded-full mb-4">
        {icon}
      </div>
      <h2 className="text-[18px] font-openSans font-bold text-[#333]">
        {title}
      </h2>
    </div>
  );
};

const ReduceRisk = () => {
  return (
    <svg
      width="46"
      height="46"
      viewBox="0 0 46 46"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 42.9922C17.766 42.9922 17.5204 42.9719 17.2633 42.9313C17.0061 42.8907 16.7651 42.8298 16.5401 42.7486C11.4804 40.9218 7.45886 37.8233 4.47557 33.4532C1.49186 29.0827 0 24.3525 0 19.2626V8.83089C0 7.99543 0.250929 7.2434 0.752786 6.57479C1.25464 5.90658 1.90371 5.42207 2.7 5.12126L16.5459 0.24977C17.0473 0.0780499 17.532 -0.0078125 18 -0.0078125C18.468 -0.0078125 18.9527 0.0780499 19.4541 0.24977L33.3 5.12126C34.0963 5.42207 34.7454 5.90658 35.2472 6.57479C35.7491 7.2434 36 7.99543 36 8.83089V19.2626C36 24.3525 34.5081 29.0827 31.5244 33.4532C28.5411 37.8233 24.5196 40.9218 19.4599 42.7486C19.2349 42.8298 18.9939 42.8907 18.7367 42.9313C18.4796 42.9719 18.234 42.9922 18 42.9922Z"
        fill="#B8CBFC"
      />
      <path
        d="M34.5003 23.4531C31.4502 23.4531 28.5251 24.6406 26.3683 26.7542C24.2115 28.8678 23 31.7345 23 34.7238C23 37.7128 24.2116 40.5797 26.3683 42.6929C28.5249 44.8065 31.4501 45.994 34.5003 45.994C37.5502 45.994 40.4755 44.8065 42.6317 42.6929C44.7884 40.5794 46 37.7126 46 34.7238C46 32.7453 45.4687 30.8018 44.4594 29.0886C43.45 27.3751 41.9983 25.9524 40.2499 24.9633C38.5018 23.974 36.5187 23.4533 34.4999 23.4533L34.5003 23.4531ZM39.9857 32.0638L34.2357 38.826C34.0298 39.0689 33.7294 39.2161 33.4075 39.2316H33.3502C33.0444 39.2335 32.7506 39.1159 32.5336 38.9049L29.0835 35.5237C28.7918 35.2378 28.678 34.8211 28.7848 34.4306C28.8915 34.0401 29.2027 33.735 29.6011 33.6305C29.9996 33.5259 30.4248 33.6375 30.7165 33.9233L33.2695 36.4366L38.2145 30.621H38.2147C38.4775 30.311 38.8892 30.1621 39.2948 30.2301C39.7003 30.2982 40.0377 30.5732 40.1803 30.9515C40.3228 31.3297 40.2485 31.7537 39.9855 32.0637L39.9857 32.0638Z"
        fill="#2D65F2"
        fillOpacity="0.5"
      />
    </svg>
  );
};
const EnsureCompliance = () => {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.80019 3.99219V8.87034H11.7543C12.1823 10.556 13.6929 11.7972 15.5003 11.7972C17.3077 11.7972 18.8183 10.5564 19.2462 8.87034H24.2004V3.99219H6.80019ZM3.90009 5.94333C2.29358 5.94333 1 7.24848 1 8.87024V41.0653C1 42.6866 2.29319 43.9922 3.90009 43.9922H27.0999C28.7064 43.9922 30 42.687 30 41.0653V8.87024C30 7.24887 28.7068 5.94333 27.0999 5.94333H25.1666V9.84572H19.8651C19.1093 11.5488 17.4604 12.7726 15.5001 12.7726C13.5398 12.7726 11.8909 11.5487 11.1351 9.84572H5.83356V5.94333H3.90009Z"
        fill="#B8CBFC"
      />
      <path
        d="M34.271 24.9047C34.271 24.1999 34.9813 23.7215 35.5905 24.0759C37.2189 25.0236 38.5652 26.4479 39.414 28.2136L39.8671 29.1562C39.9875 29.4067 40.2409 29.566 40.5188 29.566C44.1134 29.566 47.0273 32.48 47.0273 36.0745V38.0301C47.0273 38.5495 46.6063 38.9706 46.0869 38.9706H13.5674C12.8312 38.9706 12.2344 38.3737 12.2344 37.6375V32.5654C12.2344 30.9089 13.5772 29.566 15.2338 29.566H15.9763C16.4887 29.566 16.9557 29.2723 17.1777 28.8105L17.4647 28.2136C18.2626 26.5536 19.5003 25.1953 20.9989 24.2512C21.6061 23.8686 22.3397 24.3455 22.3397 25.0632V28.0767C22.3397 28.8089 22.9332 29.4024 23.6654 29.4024H32.9453C33.6775 29.4024 34.271 28.8089 34.271 28.0767V24.9047Z"
        fill="#2D65F2"
        fillOpacity="0.5"
      />
      <path
        d="M21.6158 31.9883C20.4293 31.9883 19.2696 32.3401 18.2831 32.9992C17.2967 33.6584 16.5278 34.5952 16.0738 35.6913C15.6198 36.7874 15.501 37.9935 15.7324 39.1571C15.9639 40.3207 16.5352 41.3896 17.3741 42.2285C18.213 43.0674 19.2819 43.6387 20.4455 43.8701C21.6091 44.1016 22.8152 43.9828 23.9113 43.5288C25.0074 43.0748 25.9442 42.3059 26.6034 41.3195C27.2625 40.333 27.6143 39.1732 27.6143 37.9868H24.0152C24.0152 38.4614 23.8745 38.9253 23.6108 39.3199C23.3471 39.7145 22.9724 40.022 22.534 40.2036C22.0955 40.3852 21.6131 40.4327 21.1476 40.3402C20.6822 40.2476 20.2547 40.0191 19.9191 39.6835C19.5835 39.3479 19.355 38.9204 19.2624 38.4549C19.1698 37.9895 19.2174 37.5071 19.399 37.0686C19.5806 36.6302 19.8881 36.2554 20.2827 35.9918C20.6773 35.7281 21.1412 35.5874 21.6158 35.5874V31.9883Z"
        fill="#2D65F2"
        fillOpacity="0.5"
      />
      <path
        d="M32.125 37.9868C32.125 36.8004 32.4768 35.6407 33.1359 34.6542C33.7951 33.6678 34.7319 32.8989 35.828 32.4449C36.9241 31.9909 38.1302 31.8721 39.2938 32.1035C40.4574 32.335 41.5263 32.9063 42.3652 33.7452C43.2041 34.5841 43.7754 35.653 44.0069 36.8166C44.2383 37.9802 44.1195 39.1863 43.6655 40.2824C43.2115 41.3785 42.4426 42.3153 41.4562 42.9745C40.4697 43.6336 39.31 43.9854 38.1236 43.9854L38.1236 40.3863C38.5981 40.3863 39.062 40.2455 39.4566 39.9819C39.8512 39.7182 40.1587 39.3435 40.3403 38.9051C40.522 38.4666 40.5695 37.9842 40.4769 37.5187C40.3843 37.0533 40.1558 36.6258 39.8202 36.2902C39.4846 35.9546 39.0571 35.7261 38.5917 35.6335C38.1262 35.5409 37.6438 35.5885 37.2053 35.7701C36.7669 35.9517 36.3922 36.2592 36.1285 36.6538C35.8649 37.0484 35.7241 37.5123 35.7241 37.9868L32.125 37.9868Z"
        fill="#2D65F2"
        fillOpacity="0.5"
      />
    </svg>
  );
};
const SpeedOnboard = () => {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.73268 41.072C2.98963 41.072 2.34842 40.8023 1.80905 40.2629C1.26968 39.7235 1 39.0823 1 38.3393V17.2783C1 16.5353 1.26968 15.8941 1.80905 15.3547C2.34842 14.8153 2.98963 14.5456 3.73268 14.5456H12.3684V10.6472C12.3684 9.90417 12.6381 9.2628 13.1775 8.72312C13.7168 8.18375 14.3581 7.91406 15.1011 7.91406H22.8989C23.6419 7.91406 24.2832 8.18375 24.8225 8.72312C25.3619 9.2628 25.6316 9.90417 25.6316 10.6472V14.5456H34.2673C35.0104 14.5456 35.6516 14.8153 36.1909 15.3547C36.7303 15.8941 37 16.5353 37 17.2783V38.3393C37 39.0823 36.7303 39.7235 36.1909 40.2629C35.6516 40.8023 35.0104 41.072 34.2673 41.072H3.73268ZM14.5185 14.5456H23.4815V10.6472C23.4815 10.5013 23.4209 10.3676 23.2996 10.246C23.1781 10.1247 23.0445 10.0641 22.8989 10.0641H15.1011C14.9555 10.0641 14.8219 10.1247 14.7004 10.246C14.5791 10.3676 14.5185 10.5013 14.5185 10.6472V14.5456Z"
        fill="#B8CBFC"
      />
      <path
        d="M37 20.9922C31.4763 20.9922 27 25.4685 27 30.9922C27 36.5155 31.4763 40.9922 37 40.9922C42.5237 40.9922 47 36.5159 47 30.9922C46.9998 25.4685 42.5237 20.9922 37 20.9922ZM42.8186 31.4015L37.8542 35.8818C37.5116 36.1573 36.9999 35.9133 36.9999 35.4723V32.307L32.8541 35.8818C32.5115 36.1573 31.9998 35.9134 31.9998 35.4723V26.5238C31.9998 26.0829 32.5078 25.8388 32.8541 26.1143L36.9999 29.6774V26.5238C36.9999 26.0829 37.5078 25.8388 37.8542 26.1144L42.8186 30.5827C43.0824 30.7915 43.0824 31.189 42.8186 31.4016V31.4015Z"
        fill="#2D65F2"
        fillOpacity="0.5"
      />
    </svg>
  );
};
const IncreaseTransparency = () => {
  return (
    <svg
      width="46"
      height="46"
      viewBox="0 0 46 46"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.0322 23.085H27.9792V21.2042H18.0322V23.085ZM18.0322 17.7075H27.9792V15.8267H18.0322V17.7075ZM32.7478 34.3337L27.9197 28.0385C27.569 27.5775 27.144 27.2194 26.6449 26.9643C26.1458 26.7092 25.6026 26.5817 25.0154 26.5817H13.1641V13.2867C13.1641 12.6495 13.3872 12.1078 13.8334 11.6615C14.2796 11.2153 14.8205 10.9922 15.4559 10.9922H30.549C31.1844 10.9922 31.7253 11.2153 32.1715 11.6615C32.6177 12.1078 32.8408 12.6485 32.8408 13.2837V33.6972C32.8408 33.8064 32.8331 33.914 32.8176 34.0199C32.8021 34.1258 32.7788 34.2304 32.7478 34.3337ZM15.4558 35.9922C14.8204 35.9922 14.2796 35.7691 13.8334 35.3228C13.3872 34.8766 13.1641 34.3356 13.1641 33.6998V28.4625H25.019C25.3041 28.4625 25.5691 28.5266 25.8142 28.6549C26.0593 28.7832 26.2682 28.9617 26.4409 29.1902L31.4616 35.7616C31.3256 35.8412 31.1791 35.8995 31.022 35.9366C30.8649 35.9737 30.7048 35.9922 30.5416 35.9922H15.4558Z"
        fill="#B8CBFC"
      />
      <path
        d="M41.1777 11.4287C41.9234 11.0273 42.854 11.3013 43.2588 12.0488C48.0675 20.9237 46.4318 32.1111 39.2822 39.2559L38.8711 39.6572C34.5735 43.7455 28.9606 45.9912 23.002 45.9912C18.0098 45.9912 13.2763 44.3916 9.33984 41.4766V44.459C9.33984 45.3066 8.65201 45.9922 7.80469 45.9922C6.95695 45.9922 6.26953 45.3062 6.26953 44.459V38.1719C6.26953 37.3242 6.95735 36.6387 7.80469 36.6387H14.0986C14.9464 36.6387 15.6338 37.3246 15.6338 38.1719C15.6335 39.0193 14.9458 39.7041 14.0986 39.7041H12.1328C19.8637 44.7221 30.3365 43.8538 37.1113 37.0869C43.3077 30.8952 44.7256 21.1988 40.5586 13.5068C40.1556 12.7628 40.4319 11.833 41.1777 11.4287ZM38.1953 -0.0078125C39.0426 -0.0078125 39.7305 0.677767 39.7305 1.52539V7.8125C39.7305 8.65972 39.043 9.3457 38.1953 9.3457H31.9014C31.0542 9.34554 30.3672 8.66002 30.3672 7.8125C30.3672 6.96541 31.0538 6.27946 31.9014 6.2793H33.8672C30.6606 4.1906 26.918 3.06055 22.998 3.06055C17.6665 3.06059 12.6553 5.13451 8.8877 8.89746L8.88965 8.89648C2.69239 15.0887 1.27494 24.7845 5.44238 32.4756C5.84517 33.2197 5.56789 34.1493 4.82227 34.5537C4.59012 34.678 4.33996 34.7382 4.09375 34.7383C3.54843 34.7383 3.0202 34.4472 2.74219 33.9336C-2.0671 25.0603 -0.431878 13.8737 6.71875 6.72949C14.8721 -1.41502 27.6552 -2.13595 36.6611 4.5127V1.52539C36.6611 0.678308 37.3478 -0.00758413 38.1953 -0.0078125Z"
        fill="#2D65F2"
        fillOpacity="0.5"
      />
    </svg>
  );
};
const BuildTrust = () => {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.0323 29.5312H12.7301C13.2999 29.5312 13.762 29.0079 13.762 28.3625L13.7616 19.4617C13.7616 18.8163 13.2996 18.293 12.7297 18.293H11.0319C10.462 18.293 10 18.8163 10 19.4617V28.3629C10.0003 29.0079 10.4624 29.5312 11.0323 29.5312Z"
        fill="#B8CBFC"
      />
      <path
        d="M20.4314 35.4368L23.5029 37.19C23.683 37.2917 23.8928 37.2647 24.0427 37.1152C24.1627 36.9931 24.2228 36.8232 24.2048 36.6463C24.1869 36.4698 24.1029 36.3132 23.965 36.2251L22.4893 35.274C22.2015 35.0904 22.0995 34.6759 22.2612 34.3499C22.4292 34.0238 22.7952 33.9084 23.083 34.0915L24.097 34.7507L27.3424 36.5171C27.5705 36.6463 27.8521 36.5782 28.0204 36.361C28.1704 36.1641 28.1645 35.9465 28.1462 35.8376C28.1341 35.7288 28.0743 35.5182 27.8763 35.3891L24.3068 32.9772C24.0248 32.787 23.9287 32.3658 24.097 32.0464C24.2708 31.7204 24.6368 31.6182 24.9188 31.8088L27.0783 33.2696L29.3461 34.3636C29.814 34.5945 30.3479 34.3976 30.6178 33.9084C30.7678 33.6434 30.8099 33.331 30.7436 33.0249C30.6835 32.7259 30.5155 32.4676 30.2816 32.3047L29.0517 31.4624L28.5537 31.116L26.4179 29.6483C26.1359 29.4514 26.0461 29.0369 26.2199 28.7175C26.3937 28.3914 26.7597 28.2963 27.0417 28.4865L29.6754 30.2941L30.9053 31.1435L32.5251 32.2578C32.9989 32.5838 33.5989 32.4684 33.9531 31.9862C34.157 31.7075 34.2472 31.354 34.1992 30.9939C34.1511 30.6405 33.9832 30.3281 33.7133 30.1313L24.0604 22.8881C21.8587 24.2471 19.6093 23.9751 18.0853 23.4862C16.8436 23.0921 15.9738 21.8012 15.9738 20.3471C15.9738 20.0684 16.1179 19.8238 16.3397 19.722C16.6096 19.5928 22.8968 16.6102 26.4898 16.6102C26.6937 16.6102 26.9038 16.6239 27.1077 16.6376C26.2797 16.2231 24.972 15.9922 23.2983 15.9922C21.8047 15.9922 19.8311 16.9163 18.0852 17.7316C16.8854 18.2956 15.8116 18.7915 14.9598 18.9681V29.6426C14.9598 29.7377 14.9477 29.8262 14.9297 29.9143L17.4072 32.8836C18.277 33.9287 19.2968 34.7847 20.4307 35.4371L20.4314 35.4368Z"
        fill="#B8CBFC"
      />
      <path
        d="M17.2188 20.7775C17.3566 21.4366 17.8066 21.9869 18.4065 22.1772C19.7802 22.6121 21.826 22.8567 23.7696 21.5044C23.9676 21.3686 24.2196 21.3752 24.4114 21.5181L34.3757 28.9922C34.6397 29.1961 34.8615 29.454 35.0354 29.7531L35.0357 20.1321C34.4237 20.0095 33.6441 19.7379 32.7141 19.4119C30.8545 18.7664 28.5388 17.9648 26.487 17.9648C23.6315 17.9648 18.6703 20.1184 17.219 20.7775L17.2188 20.7775Z"
        fill="#B8CBFC"
      />
      <path
        d="M37.2741 30.625H38.9657C39.5356 30.625 39.9976 30.1017 39.9976 29.4562V20.5555C39.9976 19.91 39.5356 19.3867 38.9657 19.3867H37.2741C36.7042 19.3867 36.2422 19.91 36.2422 20.5555V29.4566C36.2422 30.1017 36.7042 30.625 37.2741 30.625Z"
        fill="#B8CBFC"
      />
      <path
        d="M43.1777 13.4287C43.9234 13.0273 44.854 13.3013 45.2588 14.0488C50.0675 22.9237 48.4318 34.1111 41.2822 41.2559L40.8711 41.6572C36.5735 45.7455 30.9606 47.9912 25.002 47.9912C20.0098 47.9912 15.2763 46.3916 11.3398 43.4766V46.459C11.3398 47.3066 10.652 47.9922 9.80469 47.9922C8.95695 47.9922 8.26953 47.3062 8.26953 46.459V40.1719C8.26953 39.3242 8.95735 38.6387 9.80469 38.6387H16.0986C16.9464 38.6387 17.6338 39.3246 17.6338 40.1719C17.6335 41.0193 16.9458 41.7041 16.0986 41.7041H14.1328C21.8637 46.7221 32.3365 45.8538 39.1113 39.0869C45.3077 32.8952 46.7256 23.1988 42.5586 15.5068C42.1556 14.7628 42.4319 13.833 43.1777 13.4287ZM40.1953 1.99219C41.0426 1.99219 41.7305 2.67777 41.7305 3.52539V9.8125C41.7305 10.6597 41.043 11.3457 40.1953 11.3457H33.9014C33.0542 11.3455 32.3672 10.66 32.3672 9.8125C32.3672 8.96541 33.0538 8.27946 33.9014 8.2793H35.8672C32.6606 6.1906 28.918 5.06055 24.998 5.06055C19.6665 5.06059 14.6553 7.13451 10.8877 10.8975L10.8896 10.8965C4.69239 17.0887 3.27494 26.7845 7.44238 34.4756C7.84517 35.2197 7.56789 36.1493 6.82227 36.5537C6.59012 36.678 6.33996 36.7382 6.09375 36.7383C5.54843 36.7383 5.0202 36.4472 4.74219 35.9336C-0.0671044 27.0603 1.56812 15.8737 8.71875 8.72949C16.8721 0.584981 29.6552 -0.135953 38.6611 6.5127V3.52539C38.6611 2.67831 39.3478 1.99242 40.1953 1.99219Z"
        fill="#2D65F2"
        fillOpacity="0.5"
      />
    </svg>
  );
};
