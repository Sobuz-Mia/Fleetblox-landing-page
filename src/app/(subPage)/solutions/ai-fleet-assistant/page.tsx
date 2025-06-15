import RightArrowIcon from "@/components/icons/RightArrowIcon";
import TickIcon from "@/components/icons/TickIcon";
import FeatureCard from "@/components/ui/FeatureCard";
import { WhyAiFleetAssistantData } from "@/Static_data/solution";
import Image from "next/image";
import Link from "next/link";




const page = () => {
    const items = [
        {
            id: 1,
            title: "Fleet-Related Q&A",
            description:
                "Ask the AI Fleet Assistant anything related to your fleet, from vehicle performance to maintenance schedules. Get immediate, accurate answers to keep your operations running smoothly.",
        },
        {
            id: 2,
            title: "AI-Driven Recommendations",
            description:
                "The AI continuously analyzes your fleet’s performance and provides suggestions for optimization—whether it’s route planning, fuel efficiency, or maintenance scheduling.",
        },
        {
            id: 3,
            title: "Predictive Problem Solving",
            description:
                "Using historical data and predictive analytics, the AI can identify potential issues, such as upcoming maintenance needs or operational inefficiencies, and suggest proactive solutions.",
        },
        {
            id: 4,
            title: "Real-Time Decision Support",
            description:
                "Get actionable recommendations in real-time based on your fleet’s current data. Whether it’s optimizing routes or resolving vehicle issues, the AI Fleet Coordinator helps you make better decisions faster.",
        },
        {
            id: 5,
            title: "Fleet Performance Insights",
            description:
                "Gain a deeper understanding of your fleet’s performance through AI-powered analytics, with suggestions for improvement and optimization across all areas, from fuel usage to driver behavior.",
        },
    ];
    return (
        <div>
            {/* hero section */}
            <section className="bg-[#FAFAFF] pt-[100px] lg:pt-[140px] pb-[30px] ">
                <div className="lg:max-w-[calc(100vw-30px)] xxl:max-w-[1440px] mx-auto w-full flex flex-col px-5 lg:flex-row items-center justify-between">
                    <div className="lg:pl-[130px] w-[60%]">
                        <h3 className="text-[#0336BC] font-openSans font-bold text-[22px]">
                            AI Fleet Assistant
                        </h3>
                        <h1 className="text-[#04082C] text-[36px] lg:text-[52px] font-bold leading-[1.1]">
                            Your Intelligent Assistant for Smarter Fleet Management
                        </h1>
                        <p className="text-[#333] text-[16px] leading-6 mt-[10px] lg:mt-4 mb-5 font-openSans">
                            Fleetblox’s AI Fleet Assistant leverages advanced artificial intelligence to provide fleet managers with actionable insights, solutions, and answers to questions related to their fleet operations by analyzing real-time data, historical trends.
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
                    <div className=" w-[50%]  py-10 lg:pl-[60px]">
                        <Image
                            src="/images/AIFleetAssistantHero.png"
                            alt="AI assistant for fleet optimization"
                            width={700}
                            height={491}
                            className="object-contain w-[600px] rounded-tl-[40px] rounded-br-[40px]"
                        />
                    </div>
                </div>
            </section>
            {/* hero section end */}
            <section className="max-w-[1200px] mx-auto w-full mt-[60px] lg:mt-[100px] px-5">
                <div className="max-w-[840px] mx-auto w-full text-center">
                    <h2 className="text-[#04082C] text-[28px] lg:text-[36px] font-bold text-center leading-[1.1] mb-[10px]">
                        AI Fleet Assistant Delivers Smarter Logistics & Automated Control
                    </h2>
                    <p className="text-[#333] text-[16px] leading-6 font-openSans">
                        Optimize decision-making and solve problems before they become challenges by AI Fleet Assistant.
                    </p>
                </div>
                <div className="flex flex-col lg:items-center lg:flex-row py-8 lg:py-[60px] justify-between">
                    <div className="">
                        <Image
                            src="/images/AIFleetAssistantBody.png"
                            alt="remote access smarter fleet"
                            width={600}
                            height={430}
                            className="object-contain w-full rounded-[30px]"
                        />
                    </div>
                    <div className="flex flex-col w-[350px] md:w-[600px] mx-auto md:ml-10  gap-5 pt-5">
                        {items.map((item) => (
                            <div key={item.id} className="flex items-center w-full gap-x-4">
                                {/* Consistent icon container */}
                                <div className="w-8 h-8 min-w-[32px]">
                                    <TickIcon />
                                </div>
                                <div>
                                    <h2 className="text-[18px] font-openSans font-bold text-[#333]">
                                        {item.title}
                                    </h2>
                                    <p className="text-[#7D7D7D] leading-6 font-normal font-openSans text-[14px] ">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* why Workforce Connectivity */}
            <section className="max-w-[1100px] mx-auto w-full my-10 lg:my-[100px] px-5">
                <h2 className="mb-[40px] max-w-[840px] mx-auto w-full lg:mb-[60px] text-center text-[#04082C] text-[28px] lg:text-[36px] font-bold">
                    Why Workforce Connectivity and Collaboration Matters
                </h2>

                <div className="lg:grid hidden grid-cols-1 lg:grid-cols-3 justify-items-center gap-[30px]">
                    {WhyAiFleetAssistantData?.slice(0, 3).map((data, index) => (
                        <FeatureCard
                            key={index}
                            icon={<data.icon />}
                            title={data.title}
                            description={data.description}
                            className="max-w-[380px] w-full"
                        />
                    ))}
                </div>
                <div className="grid lg:hidden grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center lg:gap-[30px] gap-[20px]">
                    {WhyAiFleetAssistantData?.map((data, index) => (
                        <FeatureCard
                            key={index}
                            icon={<data.icon />}
                            title={data.title}
                            description={data.description}
                        // className="w-full"
                        />
                    ))}
                </div>
                <div className="lg:flex hidden flex-col items-center justify-items-center justify-center lg:flex-row mt-[30px] gap-[30px]">
                    {WhyAiFleetAssistantData?.slice(3, 5).map((data, index) => (
                        <FeatureCard
                            key={index}
                            icon={<data.icon />}
                            title={data.title}
                            description={data.description}
                            className="max-w-[380px] w-full"
                        />
                    ))}
                </div>
            </section>
            {/* why Cloud section end */}
        </div>
    );
};

export default page;
