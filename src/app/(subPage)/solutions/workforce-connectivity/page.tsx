import RightArrowIcon from "@/components/icons/RightArrowIcon";
import TickIcon from "@/components/icons/TickIcon";
import FeatureCard from "@/components/ui/FeatureCard";
import { WhyWorkforceConnectivityData } from "@/Static_data/solution";
import Image from "next/image";
import Link from "next/link";

const page = () => {
    const items = [
        {
            id: 1,
            title: "Task Assignment and Tracking",
            description:
                "Easily assign tasks to team members and monitor their progress in real time, ensuring everyone stays on track and deadlines are met. Track completed tasks and identify any bottlenecks to keep operations moving smoothly.",
        },
        {
            id: 2,
            title: "Customizable Roles and Responsibilities",
            description:
                " Design and manage your workforce based on your specific business needs. Fleetblox allows you to customize roles and responsibilities, ensuring that each team member is aligned with the tasks that matter most to your fleet operations.",
        },
        {
            id: 3,
            title: "Real-Time Collaboration and Insights",
            description:
                "Facilitate smooth communication and data sharing across your team, so everyone has access to the tools and insights they need to perform effectively. With the employee app, all tasks, updates, and data are managed seamlessly in one place, ensuring a collaborative environment regardless of location.",
        },
        {
            id: 4,
            title: "Centralized Communication Hub",
            description:
                " All workforce communication and updates are centralized, reducing miscommunication and ensuring that everyone stays informed with the latest information.",
        },
        {
            id: 5,
            title: "Mobile Workforce Management",
            description:
                "Empower your team to perform tasks, receive updates, and report issues on the go, using the employee app. This ensures that no matter where your team members are, they can stay productive and connected.",
        },
    ];
    return (
        <div>
            {/* hero section */}
            <section className="bg-[#FAFAFF] pt-[100px] lg:pt-[140px] pb-[30px] ">
                <div className="lg:max-w-[calc(100vw-30px)] xxl:max-w-[1440px] mx-auto w-full flex flex-col px-5 lg:flex-row items-center justify-between">
                    <div className="lg:pl-[130px] w-[60%]">
                        <h3 className="text-[#0336BC] font-openSans font-bold text-[22px]">
                            Workforce Connectivity
                        </h3>
                        <h1 className="text-[#04082C] text-[36px] lg:text-[52px] font-bold leading-[1.1]">
                            Empower Your Team with Seamless Communication and Efficient Task Management
                        </h1>
                        <p className="text-[#333] text-[16px] leading-6 mt-[10px] lg:mt-4 mb-5 font-openSans">
                            Fleetblox’s Workforce Connectivity and Collaboration tools are designed to streamline team communication, task management, and real-time collaboration, ensuring that your fleet operations run smoothly. Your team will stay connected, efficient, and aligned—no matter where they are.
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
                            src="/images/WorkforceConnectivityHero.png"
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
                        Transform Teamwork with Fleetblox’s End-to-End Connectivity Solutions
                    </h2>
                    <p className="text-[#333] text-[16px] leading-6 font-openSans">
                        Ensure team alignment and efficiency with task management, role-based access, and actionable insights.
                    </p>
                </div>
                <div className="flex flex-col lg:items-center lg:flex-row py-8 lg:py-[60px] justify-between">
                    <div className="">
                        <Image
                            src="/images/WorkforceConnectivityBody.png"
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
            {/* why AI Remote section */}
            <section className="max-w-[1100px] mx-auto w-full my-10 lg:my-[100px] px-5">
                <h2 className="mb-[40px] max-w-[840px] mx-auto w-full lg:mb-[60px] text-center text-[#04082C] text-[28px] lg:text-[36px] font-bold">
                    Why Workforce Connectivity and Collaboration Matters
                </h2>
                <div className="lg:grid hidden grid-cols-1 lg:grid-cols-3 justify-items-center gap-[30px]">
                    {WhyWorkforceConnectivityData?.slice(0, 3).map((data, index) => (
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
                    {WhyWorkforceConnectivityData?.map((data, index) => (
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
                    {WhyWorkforceConnectivityData?.slice(3, 5).map((data, index) => (
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
