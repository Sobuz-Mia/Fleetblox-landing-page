/* eslint-disable @typescript-eslint/no-explicit-any */

import RightArrowIcon from "@/components/icons/RightArrowIcon";
import Image from "next/image";
import Link from "next/link";
import GlobeSection from "@/components/modules/home/globe";
import Deal from "../../industries/auto-dealerships/components/LoadingSection";
import ScrollingSection from "../../industries/auto-dealerships/components/scrollingAnnimation";
import FeatureCard from "@/components/ui/FeatureCard";




const EMobilityServices = () => {

    const FleetsFit: any[] = [
        {
            icon: TeamCoordinator,
            title: "Team Coordination Across Locations",
            description:
                "Align remote teams with smart task management and real-time updates for efficient operations.",
        },
        {
            icon: InstantInAppMessaging,
            title: "Instant In-App Messaging",
            description:
                "Share updates and resolve issues instantly with real-time team communication.",
        },
        {
            icon: UnifiedTaskWorkflowManagement,
            title: "Unified Task & Workflow Management",
            description:
                "Centralize task assignments, tracking, and scheduling for seamless team coordination.",
        },
        {
            icon: DigitalVehicleInspectionWorkflow,
            title: "Digital Vehicle Inspection Workflow",
            description:
                "Monitor inspections with AI-powered issue detection for proactive fleet maintenance.",
        },
        {
            icon: ScalableandFlexibleOperations,
            title: "Scalable and Flexible Operations",
            description:
                "Scale teams across locations with adaptable workflows to meet growing business demands.",
        },
        {
            icon: FleetMaintenanceTaskManagement,
            title: "Fleet Maintenance Task Management",
            description:
                "Prioritize repairs based on AI insights to minimize downtime and maintain fleet readiness.",
        },

    ];

    const animationItems = [
        {
            title: "Multiply Your Team’s Reach",
            content: "Scale your operations effortlessly with a system built for growth. Deploy teams to multiple locations, assign roles with flexible workflows, and maintain unified control—all designed to expand in step with your fleet.",
            image: `/images/industries/a-mobile-scroll-1.svg`
        },
        {
            title: "Command Operations Across Borders",
            content: "Take full control of your day-to-day operations with a centralized dashboard and calendar view. Track progress, manage timelines, and keep your entire team aligned to ensure timely execution, enhanced accountability, and zero delays—no matter where they are.",
            image: `/images/industries/a-mobile-scroll-2.svg`
        },
        {
            title: "Stay Ahead with Real-Time Coordination",
            content: "Maintain seamless communication and responsiveness through in-app messaging. Share updates, issue instructions, and receive instant feedback—ensuring every task moves forward smoothly and your team stays in sync at all times.",
            image: `/images/industries/a-mobile-scroll-3.svg`
        }
    ];


    const Deals = [
        {
            title: "Build Location-Based Teams & Assign Roles",
            content: "Easily organize your workforce by location and assign specific roles to streamline operations and team responsibilities.",
            image: "/images/industries/mobile-crew-1.svg"
        },

        {
            title: "Coordinate Seamlessly Across Cities or Regions",
            content: "Whether you're operating in one city or managing teams across multiple regions, Fleetblox ensures smooth coordination at every level.",
            image: "/images/industries/mobile-crew-2.svg"
        },
        {
            title: "Stay Aligned, On Track, and Optimized—Anywhere",
            content: "Keep your team on the same page, monitor task progress, and optimize overall performance no matter where your operations are based.",
            image: "/images/industries/mobile-crew-3.svg"
        },

    ];
    return (
        <div>
            {/* hero section */}
            <section className="bg-[#FAFAFF] pt-[100px] lg:pt-[120px] pb-[30px] ">
                <div className="lg:max-w-[calc(100vw-30px)] xxl:max-w-[1440px] mx-auto w-full flex flex-col px-5 lg:flex-row items-center justify-between">
                    <div className="lg:pl-[130px] max-w-[700px] w-full">
                        <h3 className="text-[#0336BC] font-openSans font-bold text-[22px] w-full">
                            Fleetblox crew
                        </h3>
                        <h1 className="text-[#04082C] text-[36px] lg:text-[50px] font-bold leading-[1.1] w-full">
                            Assemble Your fleet coordinators
                        </h1>
                        <p className="text-[#333] text-[16px] leading-6 mt-[10px] lg:mt-4 mb-5 font-openSans">
                            Fleetblox makes your dispersed team become a coordinated team — with intelligent task streams, real-time notifications, and built-in tools that grow alongside your operation needs.
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
                    <div className=" w-full py-10 lg:pl-[60px]">
                        <Image
                            src="/images/industries/mobile-crew-hero.svg"
                            alt="Remote Scalability Hero"
                            width={560}
                            height={420}
                            priority
                            className="object-contain w-full"
                        />
                    </div>
                </div>
            </section>

            {/* smart dealership section */}

            <section className=" mx-auto w-full mt-[60px] lg:mt-[100px] px-5">
                <div className="max-w-[840px] mx-auto w-full text-center">
                    <h1 className="text-[#04082C] text-[28px] lg:text-[36px] font-bold text-center leading-[1.1] mb-[10px]">
                        Electrify Smarter
                    </h1>
                    <p className="text-[#333] text-[16px] leading-6 font-openSans">
                        Unify charging, battery health, and remote control across your entire EV fleet
                    </p>
                </div>
                <Deal Deals={Deals} />
            </section>


            {/*  crew solution */}
            <section className="mx-auto py-20 h-full  bg-[#FAFAFF] mt-[60px] lg:mt-[100px] px-5">
                <div className="max-w-[840px] mx-auto w-full text-center mb-[60px]">
                    <h1 className="text-[#04082C] text-[28px] lg:text-[36px] font-bold text-center leading-[1.1] mb-[10px]">
                        Fleet Operations Sync
                    </h1>
                    <p className="text-[#333] text-[16px] leading-6 font-openSans">
                        Stay connected—real-time updates bring your team together.
                    </p>
                </div>
                <div className="max-w-[1200px] flex flex-col lg:flex-row items-stretch justify-center gap-10 mx-auto w-full">
                    <div className="w-full lg:flex-1 flex flex-col items-center justify-center gap-y-5 h-full">
                        <div className="px-5 lg:px-10 py-8 m-auto w-full max-w-[500px] h-auto lg:h-[160px] flex flex-col lg:flex-row justify-center items-center lg:items-center rounded-[16px] rounded-tl-[60px] shadow-lg bg-white">
                            <div className="mb-4 lg:mb-0">
                                <TeamUnity />
                            </div>
                            <div className="lg:ml-5 text-center lg:text-left">
                                <h3 className="text-[#333] text-[22px] font-bold leading-[1.1] mb-[10px]">
                                    Team Unity
                                </h3>
                                <p className="text-[#7d7d7d] text-[16px] leading-6 font-openSans">
                                    Keep your dispersed teams in sync and aligned with each other through clear task assignments, shared objectives, and effective communication
                                </p>
                            </div>
                        </div>

                        <div className="px-5 lg:px-10 py-8 m-auto w-full max-w-[500px] h-auto lg:h-[160px] flex flex-col lg:flex-row justify-center items-center lg:items-center rounded-[16px]  shadow-lg bg-white">
                            <div className="mb-4 lg:mb-0">
                                <WorkflowsEfficiency />
                            </div>
                            <div className="lg:ml-5 text-center lg:text-left">
                                <h3 className="text-[#333] text-[22px] font-bold leading-[1.1] mb-[10px]">
                                    Workflows Efficiency
                                </h3>
                                <p className="text-[#7d7d7d] text-[16px] leading-6 font-openSans">
                                    Maximize task scheduling, maintenance, and inspections with smart workflows that reduce manual effort and downtime.
                                </p>
                            </div>
                        </div>
                        <div className="px-5 lg:px-10 py-8 m-auto w-full max-w-[500px] h-auto lg:h-[160px] flex flex-col lg:flex-row justify-center items-center lg:items-center rounded-[16px] rounded-br-[60px] shadow-lg bg-white">
                            <div className="mb-4 lg:mb-0">
                                <RealTimeCoordination />
                            </div>
                            <div className="lg:ml-5 text-center lg:text-left">
                                <h3 className="text-[#333] text-[22px] font-bold leading-[1.1] mb-[10px]">
                                    Real-Time Coordination
                                </h3>
                                <p className="text-[#7d7d7d] text-[16px] leading-6 font-openSans">
                                    Make instant task updates, real-time messaging, and shared calendars possible so everyone is up-to-date and responsive.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full lg:flex-1 flex items-center justify-center mt-10 lg:mt-0 h-full">
                        {/* Image for Fleet Operations Sync */}
                        <Image
                            src="/images/industries/FleetOperationsSync.svg"
                            alt="Fleet Operations Sync"
                            width={720}
                            height={630}
                            priority
                            className="object-contain w-full h-full max-w-[600px] lg:max-w-[700px]"
                        />

                    </div>
                </div>
            </section>

            {/* animations section with GSAP scrolling */}
            <section className="mx-auto py-20 h-full  mt-[60px] lg:mt-[100px] px-5">
                <div className="max-w-[840px] mx-auto w-full text-center">
                    <h1 className="text-[#04082C] text-[28px] lg:text-[36px] font-bold text-center leading-[1.1] mb-[10px]">
                        Remote Operations That Moves You Beyond
                    </h1>
                    <p className="text-[#333] text-[16px] leading-6 font-openSans">
                        Enhance team connectivity and accelerate operations through real-time monitoring.
                    </p>
                </div>
                <ScrollingSection animationItems={animationItems} />
            </section>


            <section className="max-w-[1200px] mx-auto w-full mb-[60px] px-5">
                <h1 className="mb-[40px] lg:mb-[60px] text-center max-w-[700px] w-full mx-auto text-[#04082C] text-[28px] lg:text-[36px] font-bold">
                    A Dashboard That Moves Business Forward
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center items-center lg:gap-[30px] gap-[20px]">
                    {FleetsFit?.map((data, index) => (
                        <FeatureCard
                            key={index}
                            icon={<data.icon />}
                            title={data.title}
                            description={data.description}
                            className={`w-full h-[250px] ${index === 8 &&
                                "md:col-span-2 lg:col-span-3 md:max-w-[380px] mx-auto "
                                }`}
                        />
                    ))}
                </div>
            </section>

            {/* fill the gap section */}

            <section className="max-w-[1200px] mx-auto w-full mt-[60px] lg:mt-[100px] px-5">
                <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-6 lg:gap-10">
                    {/* Left side - Content */}
                    <div className=" rounded-lg overflow-hidden flex items-center justify-center py-12">
                        <Image
                            src="/images/industries/ai-assistant-1.svg"
                            alt="Empower Every Mile with No Unscheduled Stops"
                            width={600}
                            height={440}
                            priority
                            className="object-contain w-full max-w-[600px]"
                        />
                    </div>

                    {/* Right side - Image */}


                    <div className="flex items-center justify-center">
                        <div className="max-w-[500px] w-full">
                            <h3 className="text-[#04082C] leading-[100%] font-bold text-[36px] font-montserrat">Empower Every Keep Your Fleet Road-Ready with Remote Inspection Assignments</h3>
                            <p className="text-[#333333] mt-4 text-[16px] leading-[150%] font-openSans text-justify">Assign inspection tasks directly to your crew—whether it&apos;s a delivery check-in, condition review, or safety check. Results upload instantly via the app, enabling fast response and keeping your fleet in top shape.</p>
                        </div>
                    </div>
                </div>
            </section>
            {/* maximize customer satisfaction section */}
            <section className="bg-[#FAFAFF] w-full mt-[60px] lg:mt-[100px] py-12">
                <div className="max-w-[1200px] mx-auto px-5 grid grid-cols-1 lg:grid-cols-2 items-center gap-6 lg:gap-10">
                    {/* Left side - Image */}

                    <div className="flex items-center justify-center">
                        <div className="max-w-[500px] w-full">
                            <h3 className="text-[#04082C] leading-[100%] font-bold text-[36px] font-montserrat">Run It All Minimize Downtime with Intelligent Maintenance Workflow</h3>
                            <p className="text-[#333333] mt-4 text-[16px] leading-[150%] font-openSans">Assign specific repair tasks based on reported issues or AI-driven recommendations. Technicians receive clear instructions via the app, carry out work on-site, and update progress in real time. With integrated chat and live tracking, managers stay informed while crews deliver faster, more accurate results.</p>
                        </div>
                    </div>
                    {/* Right side - Content */}


                    <div className="flex items-center justify-center">
                        <Image
                            src="/images/industries/ai-assistant-2.svg"
                            alt="Run It All Remotely - "
                            width={500}
                            height={280}
                            priority
                            className="object-contain w-full max-w-[450px]"
                        />
                    </div>
                </div>
            </section>
            <GlobeSection
                title="Empower Your EV Fleet Instantly "
                description="Seamlessly integrate, streamline charging, and remotely control with Fleetblox - maximizing efficiency and uptime across your fleet"
            />
        </div>
    );
};

export default EMobilityServices;


const TeamUnity = () => {
    return (
        <svg width="42" height="25" viewBox="0 0 42 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.0002 0C17.1339 0 13.9999 3.2645 13.9999 7.29141C13.9999 9.72402 15.2425 11.6959 17.0001 13.0205C12.108 14.7165 8.49996 19.531 8.49996 25H33.4998C33.4998 19.5311 29.8918 14.7166 25 13.0205C26.7577 11.696 27.9999 9.72402 27.9999 7.29141C27.9999 3.2645 24.8659 0 21 0H21.0002ZM11.0002 1.04144C7.59802 1.04144 5.00018 3.76764 5.00018 7.29141C5.00018 9.41998 5.95348 11.3406 7.49997 12.4999C3.1952 13.9836 0 18.1313 0 22.9164H6.65638C7.30147 18.4505 9.97455 14.6086 13.6562 12.3697C12.6685 10.9398 12 9.24165 12 7.29162C12 5.21836 12.6591 3.29903 13.7659 1.74142C12.934 1.30004 11.9868 1.04159 11.0002 1.04159V1.04144ZM31.0002 1.04144C30.0131 1.04144 29.0661 1.29989 28.2345 1.74126C29.3409 3.29877 30 5.2182 30 7.29146C30 9.2415 29.3316 10.9396 28.3438 12.3695C32.026 14.6087 34.6989 18.4507 35.3436 22.9162H42C42 18.1309 38.8048 13.9833 34.5 12.4998C36.0469 11.3404 37.0001 9.41983 37.0001 7.29126C37.0001 3.76749 34.4019 1.04128 31.0001 1.04128L31.0002 1.04144Z" fill="#2D65F2" fill-opacity="0.8" />
        </svg>

    )
}



const WorkflowsEfficiency = () => {
    return (
        <svg width="42" height="43" viewBox="0 0 42 43" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M41.831 18.5543C41.424 17.888 40.8617 17.3291 40.1914 16.9244L39.9179 15.9422H39.9184C40.2887 15.2533 40.4904 14.4874 40.5067 13.7065C40.5247 13.4145 40.4089 13.1306 40.1914 12.9334L38.6568 11.408C38.4564 11.1954 38.172 11.0808 37.879 11.0945C37.0934 11.1269 36.325 11.3339 35.6298 11.7005L34.6417 11.4497H34.6422C34.2233 10.7928 33.663 10.2363 33.0025 9.81988C32.7548 9.65585 32.4467 9.61008 32.1615 9.69432L30.0594 10.2585C29.7807 10.3395 29.5464 10.5275 29.4079 10.781C29.0412 11.4716 28.8399 12.2367 28.8191 13.0167L28.0832 13.7482C27.2952 13.7656 26.5235 13.9734 25.8341 14.3541C25.579 14.4918 25.3899 14.7251 25.3089 15.0018L24.7624 17.0913H24.762C24.6862 17.3683 24.7319 17.6648 24.8883 17.9062C25.3052 18.5721 25.874 19.1306 26.5488 19.536L26.8222 20.5389V20.5393C26.4465 21.2193 26.2379 21.9784 26.2126 22.7539C26.2085 23.0496 26.3218 23.3352 26.528 23.5482L28.0625 25.0525C28.2658 25.2741 28.5604 25.3899 28.8611 25.366C29.6402 25.3308 30.4014 25.1238 31.0895 24.7601L32.0984 25.0318C32.5046 25.6928 33.0677 26.2453 33.738 26.6406C33.9071 26.7492 34.1043 26.8071 34.3056 26.8079C34.3977 26.8027 34.4894 26.7885 34.579 26.7658L36.6599 26.2016V26.202C36.9492 26.1421 37.1917 25.9476 37.3119 25.6795C37.679 24.997 37.8807 24.2385 37.9003 23.4644L38.6361 22.7123C39.4238 22.7127 40.1987 22.5114 40.8853 22.127C41.1416 21.9812 41.3302 21.7411 41.4109 21.4588L41.9573 19.3903V19.3899C42.0437 19.1068 41.9977 18.7997 41.831 18.5543ZM33.3598 19.9751C32.8953 19.9723 32.4512 19.7868 32.124 19.4591C31.7972 19.1314 31.6138 18.6883 31.615 18.2266C31.6159 17.7653 31.8008 17.323 32.1288 16.9965C32.4573 16.6701 32.9022 16.4866 33.3667 16.4854C33.8308 16.4846 34.2766 16.6664 34.6062 16.9917C34.9359 17.3165 35.1225 17.7584 35.1253 18.2198C35.131 18.6872 34.9469 19.1367 34.6144 19.4672C34.2823 19.7977 33.8296 19.9808 33.3598 19.9751ZM14.5877 6.01677C14.007 6.01677 13.5364 6.48417 13.5364 7.06132V13.9756H8.53359C7.95296 13.9756 7.48235 14.4434 7.48235 15.0205C7.48235 15.5973 7.95297 16.0651 8.53359 16.0651H14.5877C14.8664 16.0651 15.1337 15.9549 15.3309 15.7593C15.5277 15.5633 15.6385 15.2976 15.6385 15.0205V7.0613C15.6385 6.78426 15.5277 6.51856 15.3309 6.32253C15.1337 6.1265 14.8664 6.01677 14.5877 6.01677ZM27.6839 8.62875L27.6835 8.62835C26.4974 6.18113 24.6377 4.11838 22.3192 2.67972C20.0011 1.24065 17.3204 0.485286 14.5876 0.500217C10.2563 0.506698 6.15104 2.4233 3.38045 5.73237C0.609747 9.04185 -0.541007 13.4024 0.238924 17.6377C1.01881 21.8727 3.64894 25.5455 7.41925 27.6646C7.57734 27.761 7.75948 27.8116 7.94488 27.8108C8.32464 27.8112 8.67262 27.6018 8.84905 27.2676C8.99085 27.0299 9.03078 26.7456 8.95947 26.4782C8.88816 26.2109 8.71214 25.9833 8.47052 25.8468C5.2373 24.0384 2.97877 20.8958 2.30596 17.2691C1.63365 13.6424 2.61646 9.90606 4.98873 7.07053C7.36096 4.23532 10.8778 2.59374 14.5877 2.59011C16.9266 2.57594 19.2214 3.22236 21.205 4.45409C23.1885 5.68579 24.7793 7.45252 25.7918 9.54813C26.0473 10.0674 26.6781 10.2829 27.2004 10.0289C27.7228 9.77495 27.9392 9.14797 27.6837 8.62871L27.6839 8.62875ZM30.3748 33.7241L30.3744 33.7237C30.0574 33.2178 29.6597 32.7658 29.1972 32.3864L29.1133 31.1952L29.1129 31.1956C29.5375 30.774 29.8793 30.2782 30.1222 29.7327C30.2522 29.4528 30.2444 29.1288 30.101 28.855L29.0921 26.7866C28.9511 26.514 28.6977 26.3159 28.3982 26.2434C27.8225 26.0952 27.2239 26.0526 26.6326 26.1179L25.7289 25.324H25.7285C25.724 24.7302 25.6099 24.1425 25.3923 23.5896C25.2733 23.311 25.046 23.0923 24.7616 22.9837L22.5755 22.2316V22.2312C22.2809 22.1279 21.9545 22.1664 21.6925 22.3357C21.1775 22.6346 20.7216 23.0238 20.3471 23.4851L19.1488 23.5686H19.1492C18.7238 23.1538 18.2247 22.8209 17.6775 22.5864C17.3992 22.4507 17.0732 22.4507 16.795 22.5864L14.7141 23.6103H14.7137C14.437 23.7371 14.2353 23.9841 14.1672 24.279C14.0063 24.857 13.9635 25.4608 14.0409 26.055L13.2423 26.9534V26.9538C12.6482 26.9696 12.0598 27.0753 11.4975 27.2673C11.2155 27.3937 10.9959 27.627 10.8879 27.9149L10.1313 30.0879C10.0388 30.3819 10.0771 30.7011 10.236 30.9656C10.5334 31.4739 10.9258 31.9206 11.3924 32.2819L11.4763 33.4938C11.0611 33.9102 10.7262 34.399 10.4886 34.9357C10.3623 35.222 10.3623 35.5481 10.4886 35.8344L11.5187 37.8822L11.5183 37.8818C11.6474 38.1682 11.9046 38.3772 12.2122 38.446C12.79 38.5854 13.3878 38.621 13.9782 38.5505L14.8819 39.3444V39.3448C14.8933 39.9357 14.9997 40.5214 15.1973 41.0792C15.3114 41.3684 15.551 41.5907 15.8488 41.6851L18.0349 42.4372C18.1424 42.4781 18.2565 42.4996 18.3714 42.5C18.5625 42.4935 18.7496 42.4433 18.9178 42.3538C19.4235 42.0419 19.8717 41.6462 20.2421 41.1837L21.4404 41.1002V41.0998C21.8646 41.5219 22.3633 41.8617 22.9117 42.1031C23.1937 42.2323 23.5196 42.2246 23.7947 42.082L25.8756 41.0792H25.876C26.1551 40.9403 26.3617 40.6891 26.4432 40.3894C26.5833 39.8155 26.6192 39.2209 26.5483 38.6344L27.3469 37.7361L27.3473 37.7356C27.9414 37.7049 28.5285 37.5927 29.0921 37.4015C29.381 37.2962 29.6055 37.0653 29.7017 36.7745L30.4583 34.6015C30.5586 34.3103 30.528 33.9908 30.3744 33.7239L30.3748 33.7241ZM20.3052 35.4791C19.4691 35.4791 18.6668 35.1486 18.0755 34.5609C17.4843 33.9733 17.1522 33.1758 17.1522 32.3446C17.1522 31.5135 17.4843 30.716 18.0755 30.1283C18.6668 29.5406 19.469 29.2105 20.3052 29.2105C21.1417 29.2105 21.9436 29.5406 22.5348 30.1283C23.126 30.716 23.4585 31.5135 23.4585 32.3446C23.4585 33.1758 23.126 33.9733 22.5348 34.5609C21.9436 35.1486 21.1417 35.4791 20.3052 35.4791Z" fill="#2D65F2" fill-opacity="0.8" />
        </svg>

    )
}


const RealTimeCoordination = () => {
    return (<svg width="42" height="43" viewBox="0 0 42 43" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M39.7027 0.605469H14.6286C13.3746 0.605469 12.5391 1.44144 12.5391 2.69501V27.7701C12.5391 29.0237 13.375 29.8596 14.6286 29.8596H33.0166L37.8225 36.1283V29.8596H39.912C41.1656 29.8596 42.0015 29.0236 42.0015 27.7701V2.69501C41.7923 1.4414 40.9568 0.605469 39.7028 0.605469H39.7027ZM37.6131 25.6805H16.7177V21.5014H37.6131V25.6805ZM37.6131 17.3223H16.7177V13.1432H37.6131V17.3223ZM37.6131 8.96402H16.7177V4.78494H37.6131V8.96402Z" fill="#2D65F2" fill-opacity="0.8" />
        <path d="M8.35825 27.7704V19.4121H2.08954C0.835935 19.4121 0 20.2481 0 21.5016V36.129C0 37.3826 0.835975 38.2186 2.08954 38.2186H4.17908V42.3976L7.31339 38.2186L22.9849 38.2182C24.2385 38.2182 25.0745 37.3822 25.0745 36.1286V34.0391H14.6268C11.0744 34.0391 8.35805 31.3227 8.35805 27.7708L8.35825 27.7704Z" fill="#2D65F2" fill-opacity="0.8" />
    </svg>
    )
}


const TeamCoordinator = () => {
    return (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.63217 42.9998C2.1842 42.9998 1.80018 42.8255 1.48011 42.4769C1.16004 42.1284 1 41.7102 1 41.2223V40.4545C1 39.0059 1.68953 37.8288 3.06858 36.9232C4.44764 36.0171 6.24018 35.5641 8.4462 35.5641C8.87709 35.5641 9.2899 35.5796 9.68464 35.6106C10.0797 35.6412 10.4677 35.6957 10.8487 35.7741C10.4741 36.4461 10.1972 37.1357 10.0181 37.843C9.83932 38.5504 9.74992 39.2756 9.74992 40.0186V42.9998H2.63217ZM14.77 42.9998C14.2845 42.9998 13.8769 42.8195 13.5471 42.4589C13.2177 42.0979 13.0529 41.6577 13.0529 41.1381V40.1028C13.0529 39.1111 13.3101 38.194 13.8243 37.3514C14.3389 36.5091 15.0915 35.7816 16.0822 35.1687C17.0732 34.5558 18.24 34.0898 19.5826 33.7708C20.9255 33.4518 22.3913 33.2923 23.9799 33.2923C25.599 33.2923 27.08 33.4518 28.4229 33.7708C29.7655 34.0898 30.9306 34.5558 31.9183 35.1687C32.9059 35.7816 33.6576 36.5053 34.1732 37.3399C34.6891 38.1741 34.9471 39.0951 34.9471 40.1028V41.1381C34.9471 41.6577 34.7798 42.0979 34.4454 42.4589C34.1106 42.8195 33.7046 42.9998 33.2275 42.9998H14.77ZM38.24 42.9998V40.0252C38.24 39.25 38.1532 38.5077 37.9794 37.7982C37.8056 37.0887 37.5482 36.4149 37.207 35.7768C37.6011 35.6966 37.9869 35.6412 38.3646 35.6106C38.7426 35.5796 39.1422 35.5641 39.5633 35.5641C41.769 35.5641 43.5599 36.0166 44.9359 36.9215C46.312 37.8265 47 39.0021 47 40.4485V41.2223C47 41.7102 46.839 42.1284 46.5169 42.4769C46.1948 42.8255 45.8084 42.9998 45.3578 42.9998H38.24ZM8.44118 33.219C7.52114 33.219 6.73652 32.8633 6.08734 32.152C5.43849 31.4406 5.11407 30.5857 5.11407 29.587C5.11407 28.5756 5.44067 27.7203 6.09387 27.021C6.74707 26.322 7.53218 25.9725 8.44921 25.9725C9.37796 25.9725 10.1666 26.322 10.8151 27.021C11.4633 27.7203 11.7874 28.5787 11.7874 29.5963C11.7874 30.5837 11.4668 31.4343 10.8256 32.1482C10.1842 32.862 9.38934 33.219 8.44118 33.219ZM39.5638 33.219C38.6532 33.219 37.8701 32.8611 37.2145 32.1454C36.559 31.4297 36.2312 30.5789 36.2312 29.593C36.2312 28.5776 36.5598 27.7203 37.217 27.021C37.8743 26.322 38.6587 25.9725 39.5704 25.9725C40.5095 25.9725 41.3 26.322 41.9418 27.021C42.5839 27.7203 42.905 28.5765 42.905 29.5898C42.905 30.5902 42.5848 31.4452 41.9443 32.1547C41.3038 32.8642 40.5103 33.219 39.5638 33.219Z" fill="#B8CBFC" />
            <path d="M24.0669 5C21.8273 5 19.6582 5.84178 17.9554 7.37524C17.3591 7.91125 16.8223 8.52827 16.3667 9.20302C15.8027 10.0388 15.3687 10.9442 15.0708 11.9013C14.7561 12.9102 14.5938 13.9767 14.5938 15.0666C14.5938 15.8736 14.6966 16.7328 14.9029 17.6263C14.9356 17.759 14.9627 17.8858 15.0006 18.0181C16.0201 21.9326 18.7532 25.8471 20.9928 28.5684H21.1556V28.7643C21.1827 28.7932 21.2098 28.828 21.2314 28.8568C21.5026 29.1795 21.779 29.5027 22.061 29.8254C22.3374 30.1366 22.5979 30.4305 22.8472 30.696C23.3406 31.232 23.7582 31.6586 24.0618 31.9643C24.6693 31.3592 25.7211 30.2693 26.9085 28.8567C28.5299 26.9256 29.8909 25.0054 30.9482 23.1607C32.6674 20.1625 33.5349 17.4417 33.5349 15.0661C33.5354 9.52023 29.2893 5.00012 24.067 5.00012L24.0669 5ZM24.0669 18.3011C22.3913 18.3011 21.0247 16.8542 21.0247 15.0667C21.0247 13.2852 22.3911 11.8323 24.0669 11.8323C25.7427 11.8323 27.1091 13.2851 27.1091 15.0667C27.104 16.8537 25.7427 18.3011 24.0669 18.3011Z" fill="#2D65F2" fill-opacity="0.5" />
        </svg>

    )
}

const InstantInAppMessaging = () => {
    return (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.86595 8C1.83223 8 1 8.80034 1 9.80289V33.3481C1 34.351 1.83226 35.1509 2.86595 35.1509H38.3192C39.3529 35.1509 40.1852 34.3506 40.1852 33.3481V9.80289C40.1852 8.79992 39.3529 8 38.3192 8H2.86595ZM17.3269 36.1212L15.4609 40H25.7241L24.3247 36.1212H17.3269Z" fill="#B8CBFC" />
            <path d="M29.9111 17.2656C29.4733 17.2653 29.0528 17.4372 28.7432 17.7432C28.4333 18.049 28.2589 18.4646 28.2588 18.8975V29.5273C28.2588 29.9602 28.4335 30.3757 28.7432 30.6816C29.0528 30.9875 29.4725 31.1592 29.9102 31.1592V35.0312L34.4336 31.1592H45.3496C45.7872 31.1591 46.207 30.9876 46.5166 30.6816C46.8261 30.3757 47 29.9602 47 29.5273V18.8975C46.9999 18.465 46.8259 18.0501 46.5166 17.7441C46.207 17.4381 45.7873 17.2667 45.3496 17.2666H29.9111V17.2656ZM37.6299 23.4063C37.8488 23.4063 38.0591 23.4926 38.2139 23.6455C38.3687 23.7985 38.4561 24.0061 38.4561 24.2227C38.456 24.439 38.3687 24.6468 38.2139 24.7998C38.0591 24.9527 37.8488 25.0381 37.6299 25.0381C37.4113 25.038 37.2016 24.9526 37.0469 24.7998C36.8921 24.6468 36.8047 24.439 36.8047 24.2227C36.8047 24.0061 36.8921 23.7986 37.0469 23.6455C37.2016 23.4926 37.4112 23.4064 37.6299 23.4063ZM40.1064 23.3857C40.3253 23.3857 40.5356 23.471 40.6904 23.624C40.8452 23.777 40.9316 23.9847 40.9316 24.2012C40.9316 24.4175 40.8451 24.6253 40.6904 24.7783C40.5356 24.9314 40.3253 25.0176 40.1064 25.0176C39.8874 25.0176 39.6773 24.9313 39.5225 24.7783C39.3678 24.6253 39.2812 24.4175 39.2812 24.2012C39.2813 23.9847 39.3677 23.777 39.5225 23.624C39.6772 23.471 39.8874 23.3858 40.1064 23.3857ZM35.1543 23.3857C35.3731 23.3857 35.5835 23.471 35.7383 23.624C35.8929 23.777 35.9794 23.9847 35.9795 24.2012C35.9795 24.4175 35.8929 24.6253 35.7383 24.7783C35.5835 24.9314 35.3732 25.0176 35.1543 25.0176C34.9354 25.0176 34.725 24.9314 34.5703 24.7783C34.4156 24.6253 34.3291 24.4174 34.3291 24.2012C34.3292 23.9848 34.4156 23.777 34.5703 23.624C34.7249 23.471 34.9354 23.3857 35.1543 23.3857Z" fill="#2D65F2" fill-opacity="0.5" />
        </svg>

    )
}

const UnifiedTaskWorkflowManagement = () => {
    return (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.99637 2.99897H26.2046C26.5781 2.99897 26.9515 3.27932 26.9515 3.69948L26.9519 7.55264C26.9519 8.6737 26.6992 9.61959 24.7857 9.58431H21.7978C21.4244 11.1958 19.9306 12.3867 18.1379 12.3867C16.3453 12.3867 14.8515 11.1957 14.4781 9.58431H11.4902C9.324 9.58431 9.324 8.67371 9.324 7.55264V3.69948C9.24908 3.27932 9.54839 2.99897 9.99637 2.99897Z" fill="#B8CBFC" />
            <path d="M4.17104 5.55469H7.83091V8.84755C7.83091 9.96861 8.80179 10.8792 9.99707 10.8792H13.9635C13.9635 10.8792 14.9125 13.5047 18.1394 13.5047C21.3662 13.5047 22.505 10.8792 22.505 10.8792H26.2063C27.4016 10.8792 28.3725 9.96862 28.3725 8.84755V5.55469H32.1073C33.3025 5.55469 34.2734 6.46529 34.2734 7.58635V42.8957C34.2734 44.087 33.3022 44.9976 32.1073 44.9976H4.17143C2.97617 44.9976 2.00528 44.087 2.00528 42.9659V7.58681C2.00528 6.46612 2.97577 5.55469 4.17104 5.55469ZM6.7105 40.5129H18.7365C19.11 40.5129 19.4834 40.2325 19.4834 39.8124C19.4834 39.3919 19.1845 39.1119 18.7365 39.1119H6.7105C6.33706 39.1119 5.96362 39.3922 5.96362 39.8124C5.96362 40.2329 6.26253 40.5129 6.7105 40.5129ZM6.7105 36.94H18.7365C19.11 36.94 19.4834 36.6597 19.4834 36.2395C19.4834 35.819 19.1845 35.539 18.7365 35.539H6.7105C6.33706 35.539 5.96362 35.8193 5.96362 36.2395C5.96362 36.6597 6.26253 36.94 6.7105 36.94ZM6.7105 29.7241H18.7365C19.11 29.7241 19.4834 29.4437 19.4834 29.0235C19.4834 28.603 19.1845 28.323 18.7365 28.323H6.7105C6.33706 28.323 5.96362 28.6034 5.96362 29.0235C5.96362 29.4437 6.26253 29.7241 6.7105 29.7241ZM6.7105 26.2211H18.7365C19.11 26.2211 19.4834 25.9408 19.4834 25.5206C19.4834 25.1001 19.1845 24.8201 18.7365 24.8201H6.7105C6.33706 24.8201 5.96362 25.1004 5.96362 25.5206C5.96362 25.9411 6.26253 26.2211 6.7105 26.2211ZM6.7105 18.9352H18.7365C19.11 18.9352 19.4834 18.6549 19.4834 18.2347C19.4834 17.8142 19.1845 17.5342 18.7365 17.5342H6.7105C6.33706 17.5342 5.96362 17.8145 5.96362 18.2347C5.96362 18.6549 6.26253 18.9352 6.7105 18.9352Z" fill="#B8CBFC" />
            <path d="M34.6296 20.8086C31.6136 20.8086 28.7212 21.9828 26.5885 24.0728C24.4557 26.1627 23.2578 28.9974 23.2578 31.9534C23.2578 34.909 24.4559 37.7438 26.5885 39.8334C28.721 41.9234 31.6135 43.0976 34.6296 43.0976C37.6454 43.0976 40.538 41.9234 42.6702 39.8334C44.8027 37.7435 46.0008 34.9087 46.0008 31.9534C46.0008 29.9969 45.4754 28.0751 44.4775 26.3811C43.4793 24.6868 42.0438 23.2799 40.315 22.3019C38.5864 21.3237 36.6255 20.8088 34.6292 20.8088L34.6296 20.8086ZM40.0537 29.3231L34.3679 36.0097C34.1644 36.2499 33.8673 36.3954 33.549 36.4108H33.4923C33.1899 36.4127 32.8994 36.2963 32.6849 36.0877L29.2733 32.7443C28.9849 32.4616 28.8723 32.0495 28.9779 31.6634C29.0835 31.2773 29.3912 30.9755 29.7852 30.8723C30.1792 30.7688 30.5997 30.8791 30.8881 31.1618L33.4125 33.647L38.3023 27.8964H38.3025C38.5624 27.5899 38.9695 27.4426 39.3705 27.5098C39.7715 27.5772 40.1052 27.8491 40.2461 28.2232C40.3871 28.5971 40.3136 29.0164 40.0536 29.323L40.0537 29.3231Z" fill="#2D65F2" fill-opacity="0.5" />
        </svg>

    )
}


const DigitalVehicleInspectionWorkflow = () => {
    return (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M30.0613 17.2972C30.0613 16.5924 30.7711 16.1127 31.3915 16.447C33.6221 17.649 35.4692 19.5383 36.6103 21.9119L37.1873 23.1122C37.3406 23.4312 37.6632 23.6341 38.0172 23.6341C42.5945 23.6341 46.3051 27.3447 46.3051 31.922V34.4122C46.3051 35.0736 45.7689 35.6098 45.1075 35.6098H3.69751C2.76 35.6098 2 34.8498 2 33.9123V27.4535C2 25.3441 3.71 23.6341 5.8194 23.6341H6.76489C7.41738 23.6341 8.01212 23.2601 8.29481 22.672L8.66021 21.9119C9.73856 19.6686 11.4476 17.858 13.5149 16.6513C14.1348 16.2895 14.868 16.7682 14.868 17.4859V21.7376C14.868 22.6699 15.6238 23.4257 16.5561 23.4257H28.3732C29.3055 23.4257 30.0613 22.6699 30.0613 21.7376V17.2972Z" fill="#B8CBFC" />
            <path d="M13.9357 26.7148C12.4249 26.7148 10.948 27.1629 9.69179 28.0022C8.43559 28.8416 7.45651 30.0346 6.87834 31.4304C6.30018 32.8262 6.14891 34.3621 6.44365 35.8439C6.7384 37.3257 7.46592 38.6868 8.53423 39.7551C9.60254 40.8234 10.9636 41.5509 12.4454 41.8457C13.9272 42.1404 15.4631 41.9892 16.8589 41.411C18.2547 40.8328 19.4478 39.8537 20.2871 38.5975C21.1265 37.3413 21.5745 35.8645 21.5745 34.3537H16.9912C16.9912 34.958 16.812 35.5487 16.4763 36.0512C16.1405 36.5537 15.6633 36.9453 15.105 37.1766C14.5467 37.4079 13.9323 37.4684 13.3396 37.3505C12.7469 37.2326 12.2024 36.9416 11.7751 36.5142C11.3478 36.0869 11.0568 35.5425 10.9389 34.9498C10.821 34.357 10.8815 33.7427 11.1127 33.1844C11.344 32.626 11.7356 32.1488 12.2381 31.8131C12.7406 31.4773 13.3314 31.2981 13.9357 31.2981V26.7148Z" fill="#2D65F2" fill-opacity="0.5" />
            <path d="M27.3281 34.3537C27.3281 32.8428 27.7761 31.366 28.6155 30.1098C29.4549 28.8536 30.6479 27.8745 32.0437 27.2963C33.4395 26.7181 34.9754 26.5669 36.4572 26.8616C37.939 27.1564 39.3001 27.8839 40.3684 28.9522C41.4367 30.0205 42.1642 31.3816 42.459 32.8634C42.7537 34.3452 42.6024 35.8811 42.0243 37.2769C41.4461 38.6727 40.467 39.8657 39.2108 40.7051C37.9546 41.5444 36.4777 41.9925 34.9669 41.9925L34.9669 37.4092C35.5713 37.4092 36.162 37.23 36.6645 36.8942C37.167 36.5585 37.5586 36.0813 37.7899 35.5229C38.0211 34.9646 38.0816 34.3503 37.9637 33.7575C37.8458 33.1648 37.5548 32.6204 37.1275 32.1931C36.7002 31.7657 36.1557 31.4747 35.563 31.3568C34.9703 31.2389 34.356 31.2995 33.7976 31.5307C33.2393 31.762 32.7621 32.1536 32.4264 32.6561C32.0906 33.1586 31.9114 33.7493 31.9114 34.3537H27.3281Z" fill="#2D65F2" fill-opacity="0.5" />
            <path d="M21.9999 15.6815C22.8808 15.6815 23.6291 15.372 24.2445 14.753C24.86 14.1341 25.1677 13.3824 25.1677 12.4982C25.1677 11.6139 24.8594 10.8629 24.2427 10.2451C23.626 9.62736 22.8772 9.31847 21.9963 9.31847C21.1153 9.31847 20.3671 9.62797 19.7516 10.247C19.1362 10.8659 18.8284 11.6176 18.8284 12.5018C18.8284 13.3861 19.1368 14.1371 19.7534 14.7549C20.3701 15.3726 21.1189 15.6815 21.9999 15.6815ZM22 14.6391C21.4085 14.6391 20.9052 14.4313 20.4899 14.0157C20.0746 13.6002 19.867 13.0956 19.867 12.5019C19.867 11.9083 20.074 11.403 20.488 10.9862C20.902 10.5693 21.4047 10.3609 21.9962 10.3609C22.5876 10.3609 23.091 10.5687 23.5062 10.9843C23.9215 11.3998 24.1292 11.9044 24.1292 12.4981C24.1292 13.0917 23.9222 13.597 23.5082 14.0138C23.0941 14.4307 22.5914 14.6391 22 14.6391ZM21.9989 18C20.3481 18 18.8378 17.5565 17.4682 16.6695C16.0986 15.7824 15.0034 14.6184 14.1826 13.1774C14.1158 13.0674 14.0687 12.9564 14.0412 12.8444C14.0137 12.7323 14 12.6173 14 12.4993C14 12.3814 14.0137 12.2666 14.0412 12.155C14.0687 12.0434 14.1158 11.9326 14.1826 11.8226C15.0034 10.3816 16.0983 9.21755 17.4673 8.33054C18.8364 7.44351 20.3463 7 21.9972 7C23.6481 7 25.1583 7.44351 26.528 8.33054C27.8976 9.21755 28.9928 10.3813 29.8135 11.8217C29.8803 11.9311 29.9281 12.0421 29.9569 12.1547C29.9856 12.2674 30 12.383 30 12.5015C30 12.6201 29.9856 12.7352 29.9569 12.8468C29.9281 12.9585 29.8803 13.0689 29.8135 13.1783C28.9928 14.6187 27.8979 15.7824 26.5288 16.6695C25.1598 17.5565 23.6498 18 21.9989 18Z" fill="#2D65F2" fill-opacity="0.5" />
        </svg>

    )
}

const ScalableandFlexibleOperations = () => {
    return (
        <svg width="48" height="49" viewBox="0 0 48 49" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.0323 29.5742H12.7301C13.2999 29.5742 13.762 29.0509 13.762 28.4054L13.7616 19.5047C13.7616 18.8593 13.2996 18.3359 12.7297 18.3359H11.0319C10.462 18.3359 10 18.8593 10 19.5047V28.4059C10.0003 29.0509 10.4624 29.5742 11.0323 29.5742Z" fill="#B8CBFC" />
            <path d="M20.4314 35.4798L23.5029 37.2329C23.683 37.3347 23.8928 37.3077 24.0427 37.1582C24.1627 37.0361 24.2228 36.8662 24.2048 36.6893C24.1869 36.5127 24.1029 36.3562 23.965 36.2681L22.4893 35.317C22.2015 35.1334 22.0995 34.7189 22.2612 34.3928C22.4292 34.0668 22.7952 33.9513 23.083 34.1345L24.097 34.7936L27.3424 36.5601C27.5705 36.6893 27.8521 36.6212 28.0204 36.4039C28.1704 36.2071 28.1645 35.9894 28.1462 35.8806C28.1341 35.7718 28.0743 35.5612 27.8763 35.432L24.3068 33.0202C24.0248 32.8299 23.9287 32.4088 24.097 32.0894C24.2708 31.7633 24.6368 31.6612 24.9188 31.8518L27.0783 33.3125L29.3461 34.4066C29.814 34.6375 30.3479 34.4406 30.6178 33.9513C30.7678 33.6863 30.8099 33.374 30.7436 33.0679C30.6835 32.7689 30.5155 32.5105 30.2816 32.3477L29.0517 31.5054L28.5537 31.159L26.4179 29.6912C26.1359 29.4944 26.0461 29.0798 26.2199 28.7604C26.3937 28.4344 26.7597 28.3393 27.0417 28.5295L29.6754 30.3371L30.9053 31.1864L32.5251 32.3008C32.9989 32.6268 33.5989 32.5114 33.9531 32.0291C34.157 31.7505 34.2472 31.397 34.1992 31.0369C34.1511 30.6835 33.9832 30.3711 33.7133 30.1742L24.0604 22.9311C21.8587 24.2901 19.6093 24.0181 18.0853 23.5292C16.8436 23.135 15.9738 21.8442 15.9738 20.3901C15.9738 20.1114 16.1179 19.8667 16.3397 19.765C16.6096 19.6358 22.8968 16.6532 26.4898 16.6532C26.6937 16.6532 26.9038 16.6669 27.1077 16.6806C26.2797 16.2661 24.972 16.0352 23.2983 16.0352C21.8047 16.0352 19.8311 16.9593 18.0852 17.7746C16.8854 18.3386 15.8116 18.8345 14.9598 19.0111V29.6856C14.9598 29.7807 14.9477 29.8692 14.9297 29.9572L17.4072 32.9265C18.277 33.9716 19.2968 34.8277 20.4307 35.4801L20.4314 35.4798Z" fill="#B8CBFC" />
            <path d="M17.2188 20.8205C17.3566 21.4796 17.8066 22.0299 18.4065 22.2202C19.7802 22.655 21.826 22.8997 23.7696 21.5474C23.9676 21.4115 24.2196 21.4182 24.4114 21.5611L34.3757 29.0351C34.6397 29.2391 34.8615 29.497 35.0354 29.796L35.0357 20.175C34.4237 20.0525 33.6441 19.7809 32.7141 19.4548C30.8545 18.8094 28.5388 18.0078 26.487 18.0078C23.6315 18.0078 18.6703 20.1614 17.219 20.8205L17.2188 20.8205Z" fill="#B8CBFC" />
            <path d="M37.2741 30.668H38.9657C39.5356 30.668 39.9976 30.1446 39.9976 29.4992V20.5984C39.9976 19.953 39.5356 19.4297 38.9657 19.4297H37.2741C36.7042 19.4297 36.2422 19.953 36.2422 20.5984V29.4996C36.2422 30.1447 36.7042 30.668 37.2741 30.668Z" fill="#B8CBFC" />
            <path d="M43.1777 13.4717C43.9234 13.0703 44.854 13.3442 45.2588 14.0918C50.0675 22.9667 48.4318 34.1541 41.2822 41.2988L40.8711 41.7002C36.5735 45.7885 30.9606 48.0342 25.002 48.0342C20.0098 48.0341 15.2763 46.4346 11.3398 43.5195V46.502C11.3398 47.3496 10.652 48.0351 9.80469 48.0352C8.95695 48.0352 8.26953 47.3492 8.26953 46.502V40.2148C8.26953 39.3672 8.95735 38.6816 9.80469 38.6816H16.0986C16.9464 38.6816 17.6338 39.3676 17.6338 40.2148C17.6335 41.0623 16.9458 41.7471 16.0986 41.7471H14.1328C21.8637 46.7651 32.3365 45.8968 39.1113 39.1299C45.3077 32.9382 46.7256 23.2418 42.5586 15.5498C42.1556 14.8057 42.4319 13.876 43.1777 13.4717ZM40.1953 2.03516C41.0426 2.03516 41.7305 2.72074 41.7305 3.56836V9.85547C41.7305 10.7027 41.043 11.3887 40.1953 11.3887H33.9014C33.0542 11.3885 32.3672 10.703 32.3672 9.85547C32.3672 9.00838 33.0538 8.32243 33.9014 8.32227H35.8672C32.6606 6.23357 28.918 5.10352 24.998 5.10352C19.6665 5.10356 14.6553 7.17748 10.8877 10.9404L10.8896 10.9395C4.69239 17.1317 3.27494 26.8275 7.44238 34.5186C7.84517 35.2627 7.56789 36.1923 6.82227 36.5967C6.59012 36.721 6.33996 36.7812 6.09375 36.7812C5.54843 36.7812 5.0202 36.4902 4.74219 35.9766C-0.0671044 27.1032 1.56812 15.9167 8.71875 8.77246C16.8721 0.62795 29.6552 -0.092984 38.6611 6.55566V3.56836C38.6611 2.72128 39.3478 2.03538 40.1953 2.03516Z" fill="#2D65F2" fill-opacity="0.5" />
            <path d="M43.1777 13.4717C43.9234 13.0703 44.854 13.3442 45.2588 14.0918C50.0675 22.9667 48.4318 34.1541 41.2822 41.2988L40.8711 41.7002C36.5735 45.7885 30.9606 48.0342 25.002 48.0342C20.0098 48.0341 15.2763 46.4346 11.3398 43.5195V46.502C11.3398 47.3496 10.652 48.0351 9.80469 48.0352C8.95695 48.0352 8.26953 47.3492 8.26953 46.502V40.2148C8.26953 39.3672 8.95735 38.6816 9.80469 38.6816H16.0986C16.9464 38.6816 17.6338 39.3676 17.6338 40.2148C17.6335 41.0623 16.9458 41.7471 16.0986 41.7471H14.1328C21.8637 46.7651 32.3365 45.8968 39.1113 39.1299C45.3077 32.9382 46.7256 23.2418 42.5586 15.5498C42.1556 14.8057 42.4319 13.876 43.1777 13.4717ZM40.1953 2.03516C41.0426 2.03516 41.7305 2.72074 41.7305 3.56836V9.85547C41.7305 10.7027 41.043 11.3887 40.1953 11.3887H33.9014C33.0542 11.3885 32.3672 10.703 32.3672 9.85547C32.3672 9.00838 33.0538 8.32243 33.9014 8.32227H35.8672C32.6606 6.23357 28.918 5.10352 24.998 5.10352C19.6665 5.10356 14.6553 7.17748 10.8877 10.9404L10.8896 10.9395C4.69239 17.1317 3.27494 26.8275 7.44238 34.5186C7.84517 35.2627 7.56789 36.1923 6.82227 36.5967C6.59012 36.721 6.33996 36.7812 6.09375 36.7812C5.54843 36.7812 5.0202 36.4902 4.74219 35.9766C-0.0671044 27.1032 1.56812 15.9167 8.71875 8.77246C16.8721 0.62795 29.6552 -0.092984 38.6611 6.55566V3.56836C38.6611 2.72128 39.3478 2.03538 40.1953 2.03516Z" stroke="#2D65F2" />
        </svg>

    )
}


const FleetMaintenanceTaskManagement = () => {
    return (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M30.0613 18.2972C30.0613 17.5924 30.7711 17.1127 31.3915 17.447C33.6221 18.649 35.4692 20.5383 36.6103 22.9119L37.1873 24.1122C37.3406 24.4312 37.6632 24.6341 38.0172 24.6341C42.5945 24.6341 46.3051 28.3447 46.3051 32.922V35.4122C46.3051 36.0736 45.7689 36.6098 45.1075 36.6098H3.69751C2.76 36.6098 2 35.8498 2 34.9123V28.4535C2 26.3441 3.71 24.6341 5.8194 24.6341H6.76489C7.41738 24.6341 8.01212 24.2601 8.29481 23.672L8.66021 22.9119C9.73856 20.6686 11.4476 18.858 13.5149 17.6513C14.1348 17.2895 14.868 17.7682 14.868 18.4859V22.7376C14.868 23.6699 15.6238 24.4257 16.5561 24.4257H28.3732C29.3055 24.4257 30.0613 23.6699 30.0613 22.7376V18.2972Z" fill="#B8CBFC" />
            <path d="M13.9357 27.7148C12.4249 27.7148 10.948 28.1629 9.69179 29.0022C8.43559 29.8416 7.45651 31.0346 6.87834 32.4304C6.30018 33.8262 6.14891 35.3621 6.44365 36.8439C6.7384 38.3257 7.46592 39.6868 8.53423 40.7551C9.60254 41.8234 10.9636 42.5509 12.4454 42.8457C13.9272 43.1404 15.4631 42.9892 16.8589 42.411C18.2547 41.8328 19.4478 40.8537 20.2871 39.5975C21.1265 38.3413 21.5745 36.8645 21.5745 35.3537H16.9912C16.9912 35.958 16.812 36.5487 16.4763 37.0512C16.1405 37.5537 15.6633 37.9453 15.105 38.1766C14.5467 38.4079 13.9323 38.4684 13.3396 38.3505C12.7469 38.2326 12.2024 37.9416 11.7751 37.5142C11.3478 37.0869 11.0568 36.5425 10.9389 35.9498C10.821 35.357 10.8815 34.7427 11.1127 34.1844C11.344 33.626 11.7356 33.1488 12.2381 32.8131C12.7406 32.4773 13.3314 32.2981 13.9357 32.2981V27.7148Z" fill="#2D65F2" fill-opacity="0.5" />
            <path d="M27.3281 35.3537C27.3281 33.8428 27.7761 32.366 28.6155 31.1098C29.4549 29.8536 30.6479 28.8745 32.0437 28.2963C33.4395 27.7181 34.9754 27.5669 36.4572 27.8616C37.939 28.1564 39.3001 28.8839 40.3684 29.9522C41.4367 31.0205 42.1642 32.3816 42.459 33.8634C42.7537 35.3452 42.6024 36.8811 42.0243 38.2769C41.4461 39.6727 40.467 40.8657 39.2108 41.7051C37.9546 42.5444 36.4777 42.9925 34.9669 42.9925L34.9669 38.4092C35.5713 38.4092 36.162 38.23 36.6645 37.8942C37.167 37.5585 37.5586 37.0813 37.7899 36.5229C38.0211 35.9646 38.0816 35.3503 37.9637 34.7575C37.8458 34.1648 37.5548 33.6204 37.1275 33.1931C36.7002 32.7657 36.1557 32.4747 35.563 32.3568C34.9703 32.2389 34.356 32.2995 33.7976 32.5307C33.2393 32.762 32.7621 33.1536 32.4264 33.6561C32.0906 34.1586 31.9114 34.7493 31.9114 35.3537H27.3281Z" fill="#2D65F2" fill-opacity="0.5" />
            <path d="M17.2534 12.9746C17.2534 14.5225 17.8062 15.8492 18.9118 16.9548C19.2007 17.2438 19.5032 17.4878 19.8193 17.6869C20.1353 17.886 20.472 18.0563 20.8291 18.1977L20.8183 25.8508C20.8169 26.426 21.0183 26.9205 21.4224 27.3341C21.8266 27.7478 22.3165 27.9556 22.8924 27.9576C23.4637 27.9596 23.9565 27.7534 24.3707 27.3391C24.785 26.9249 24.9928 26.4324 24.9942 25.8617L24.9717 18.2094C25.3239 18.082 25.6566 17.9178 25.9699 17.717C26.2831 17.5162 26.5886 17.2669 26.8864 16.9691C27.9932 15.8624 28.5465 14.5309 28.5465 12.9746C28.5465 11.4184 27.993 10.0868 26.886 8.97976C26.6975 8.79129 26.4939 8.61801 26.275 8.45991C26.0562 8.30182 25.8237 8.17133 25.5776 8.06844C25.4389 8.01313 25.3075 7.99563 25.1833 8.01593C25.0591 8.03624 24.9406 8.08028 24.8276 8.14806C24.7136 8.21497 24.6217 8.30912 24.5521 8.43051C24.4825 8.55192 24.4468 8.68733 24.4449 8.83673L24.4381 12.5694L21.3601 12.5552L21.3499 8.81633C21.3512 8.66356 21.3187 8.52791 21.2523 8.40939C21.1859 8.29088 21.0942 8.19747 20.977 8.12916C20.8599 8.06085 20.7375 8.01707 20.6098 7.99781C20.4821 7.97857 20.3498 7.99758 20.2131 8.05484C19.9692 8.16453 19.7394 8.30055 19.5236 8.4629C19.3077 8.62525 19.1038 8.80244 18.9118 8.99446C17.8062 10.1001 17.2534 11.4268 17.2534 12.9746Z" fill="#2D65F2" fill-opacity="0.5" />
        </svg>


    )
}