
import RightArrowIcon from "@/components/icons/RightArrowIcon";
import Image from "next/image";
import Link from "next/link";
import GlobeSection from "@/components/modules/home/globe";
import Deal from "../auto-dealerships/components/LoadingSection";
import ScrollingSection from "../auto-dealerships/components/scrollingAnnimation";



const FleetManagement = () => {

    const animationItems = [
        {
            title: "Turn Fragmented Operations into One Revenue Network ",
            content: "Unify operations whether you’re managing luxury cars, utility vans, EVs, or specialized vehicles. Track availability, monitor vehicle health, and streamline handoffs all from one intelligent dashboard, in real-time.",
            image: `/images/industries/one-network-1.svg`
        },
        {
            title: "Cut the Cost of Non- Compliance",
            content: "Avoid expensive delays and operations with Fleetblox. Our system automates critical compliance processes, including VIN verification, entry inspections, registration monitoring, and document storage, all in one place. Manage every deadline, keep your roads ready fleet, and reduce costs with ease.",
            image: `/images/industries/one-network-2.png`
        },
        {
            title: "Remote Diagnostic that Keep Revenue Rolling",
            content: "With Fleetblox, you're able to track your entire fleet ecosystem - vehicle health to maintenance schedules, digital inspections, and real-time diagnostics. Have complete visibility into the status of all vehicles, monitor all assets in multiple locations, and coordinate proactive repairs and inspections - all in one platform.",
            image: `/images/industries/one-network-3.svg`
        }
    ];


    const Deals = [
        {
            title: "Unified Ecosystem",
            content: "Bring together all elements of your fleet business—vehicles, personnel, locations, and information—into a single intelligent platform that simplifies management and unlocks total visibility.",
            image: "/images/industries/ecosystem-2.svg"
        },

        {
            title: "Optimized Assets",
            content: "Maintain every vehicle and crew operating at top condition with smart diagnostics, scheduled checks, and synchronized tasks in the cloud—maximizing uptime and value.",
            image: "/images/industries/ecosystem.png"
        },
        {
            title: "Expansion-Ready",
            content: "Scale on a malleable infrastructure that adjusts according to your business model. Growing into new territories or introducing new services, scale with zero drag and complete autonomy.",
            image: "/images/industries/easy-scale-1.svg"
        },

    ];
    return (
        <div>
            {/* hero section */}
            <section className="bg-[#FAFAFF] pt-[100px] lg:pt-[120px] pb-[30px] ">
                <div className="lg:max-w-[calc(100vw-30px)] xxl:max-w-[1440px] mx-auto w-full flex flex-col px-5 lg:flex-row items-center justify-between">
                    <div className="lg:pl-[130px] max-w-[700px] w-full">
                        <h3 className="text-[#0336BC] font-openSans font-bold text-[22px] w-full">
                            Fleetblox for Fleet Management
                        </h3>
                        <h1 className="text-[#04082C] text-[36px] lg:text-[50px] font-bold leading-[1.1] w-full">
                            Operate Smarter, Expand Faster-
                            All in One Platform
                        </h1>
                        <p className="text-[#333] text-[16px] leading-6 mt-[10px] lg:mt-4 mb-5 font-openSans">
                            Fleetblox brings your entire ecosystem together and enables you to customize intricate business models with and grow with ease from one place.
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
                            src="/images/industries/fleetblox-management-hero.svg"
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
                        Built for Scale, Engineered for Control
                    </h1>
                    <p className="text-[#333] text-[16px] leading-6 font-openSans">
                        Expand effortlessly with an infrastructure designed for fleet-first growth
                    </p>
                </div>
                <Deal Deals={Deals} />
            </section>

            {/* animations section with GSAP scrolling */}
            <ScrollingSection animationItems={animationItems} />

            {/* fill the gap section */}

            <section className="max-w-[1200px] mx-auto w-full mt-[60px] lg:mt-[100px] px-5">
                <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-6 lg:gap-10">
                    {/* Left side - Content */}
                    <div className="flex items-center justify-center">
                        <div className="max-w-[500px] w-full">
                            <h3 className="text-[#04082C] leading-[100%] font-bold text-[36px] font-montserrat">Turn Budgeting Into a
                                Profit Strategy</h3>
                            <p className="text-[#333333] mt-4 text-[16px] leading-[150%] font-openSans text-justify">Fleetblox enables easy budgeting across all your locations, with personalized expense categories and real-time budget tracking. Set dynamic budgets for each location, receive smart alerts for potential overages, and leverage data-driven insights to optimize spending and boost profitability in your entire fleet business.</p>
                        </div>
                    </div>

                    {/* Right side - Image */}
                    <div className=" rounded-lg overflow-hidden flex items-center justify-center py-12">
                        <Image
                            src="/images/industries/turn-budget.svg"
                            alt="Turn Budgeting Into a Profit Strategy"
                            width={600}
                            height={440}
                            priority
                            className="object-contain w-full max-w-[600px]"
                        />
                    </div>
                </div>
            </section>
            {/* maximize customer satisfaction section */}
            <section className="bg-[#FAFAFF] w-full mt-[60px] lg:mt-[100px] py-12">
                <div className="max-w-[1200px] mx-auto px-5 grid grid-cols-1 lg:grid-cols-2 items-center gap-6 lg:gap-10">
                    {/* Left side - Image */}
                    <div className="flex items-center justify-center">
                        <Image
                            src="/images/industries/AI-assistant.svg"
                            alt="AI Assistant"
                            width={500}
                            height={280}
                            priority
                            className="object-contain w-full max-w-[450px]"
                        />
                    </div>

                    {/* Right side - Content */}
                    <div className="flex items-center justify-center">
                        <div className="max-w-[500px] w-full">
                            <h3 className="text-[#04082C] leading-[100%] font-bold text-[36px] font-montserrat">Keep Assets Road-Ready with Scheduled Inspections</h3>
                            <p className="text-[#333333] mt-4 text-[16px] leading-[150%] font-openSans">Assign tasks to technicians, maintain vehicles in prime condition. Schedule and track routine maintenance inspections, catch issues early, and prevent costly downtime. Keep the value of your fleet intact and road-ready at all times</p>
                        </div>
                    </div>
                </div>
            </section>
            <GlobeSection
                title="Streamline Your Fleet Ecosystem and Fuel Growth"
                description="Fleetblox empowers you to transform your fleet management business with a new, integrated platform. Simplify operations, boost efficiency, and drive scalable growth across all locations."
            />
        </div>
    );
};

export default FleetManagement;


