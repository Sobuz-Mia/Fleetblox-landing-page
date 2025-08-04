"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
// import { LeftSideTimeLine } from "./AboutSteps";
import useScrollSpy from "@/hooks/useScrollSpy";

const TimelineScrollSection = ({ timelineItems }: { timelineItems: Array<{ title: string; subtitle: string }> }) => {
    const [isMobile, setIsMobile] = useState(false);
    const { activeIndex, componentRef } = useScrollSpy(".scroll-section", isMobile ? 0.4 : 0.8);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        handleResize();

        // Add event listener with debounce for performance
        let timeoutId: NodeJS.Timeout;
        const debouncedResize = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(handleResize, 100);
        };

        window.addEventListener("resize", debouncedResize);
        return () => {
            window.removeEventListener("resize", debouncedResize);
            clearTimeout(timeoutId);
        };
    }, []);

    return (
        <section ref={componentRef} className="max-w-[1200px] mx-auto px-4 sm:px-5 py-12 sm:py-16 lg:py-20">
            {isMobile ? (
                // Mobile: Stack vertically
                <div className="flex flex-col gap-10">
                    <div className="text-center">
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-[#0336BC] font-openSans font-bold text-base sm:text-lg"
                        >
                            Our core values
                        </motion.p>
                        <motion.h3
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-xl sm:text-2xl md:text-3xl font-bold text-[#04082C] mt-2 mb-3"
                        >
                            Foundations That Turn Vision Into <span className="text-[#2D65F2]">Values</span>
                        </motion.h3>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-[#7D7D7D] text-sm sm:text-base font-openSans leading-6 max-w-[90%] mx-auto"
                        >
                            Bridging the gaps between today&apos;s traditional fleet management and the new generation of connected vehicles.
                        </motion.p>
                    </div>

                    <div className="flex flex-col gap-8">
                        {timelineItems.map((data, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                                className="flex items-start gap-4 bg-white rounded-xl shadow p-4"
                            >
                                <div className="w-8 h-8 rounded-full border-2 border-[#0336BC] text-[#0336BC] flex items-center justify-center font-semibold text-sm">
                                    {index + 1}
                                </div>
                                <div>
                                    <h4 className="text-[#333] text-sm font-bold font-openSans">{data.title}</h4>
                                    <p className="text-sm text-gray-500">{data.subtitle}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            ) : (
                // Desktop: Sticky left, scrollable right
                <div className="flex flex-col xl:flex-row gap-12">
                    {/* Sticky Left Column */}
                    <div className="xl:w-1/2 sticky top-0 self-start h-screen flex flex-col justify-center text-left pr-4">
                        <AnimatePresence mode="wait">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <p className="text-[#0336BC] font-openSans font-bold text-lg">Our core values</p>
                                <h3 className="text-3xl lg:text-4xl font-bold text-[#04082C] mt-3 mb-4">
                                    Foundations That Turn Vision Into <span className="text-[#2D65F2]">Values</span>
                                </h3>
                                <p className="text-[#7D7D7D] text-base font-openSans leading-6">
                                    Bridging the gaps between today&apos;s traditional fleet management and the new generation of connected vehicles.
                                </p>


                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Scrollable Right Column */}
                    <div className="xl:w-1/2 flex flex-col gap-12">
                        {timelineItems.map((data, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: false, margin: "-100px 0px -100px 0px" }}
                                transition={{ duration: 0.5 }}
                                className={`relative group max-w-[480px] w-full scroll-section ${activeIndex === index ? 'active-section' : ''}`}
                                data-index={index}
                            >
                                {/* Shadow */}
                                <div className="absolute top-2 left-0 right-0 z-10 rounded-2xl bg-[rgba(0,0,0,0.08)] blur-md h-full group-hover:bg-[rgba(0,0,0,0.12)] transition" />

                                {/* Content */}
                                <div className="relative z-20 bg-white p-5 rounded-xl flex gap-4 items-start group-hover:translate-y-[-2px] transition-transform">
                                    <motion.div
                                        className={`w-8 h-8 rounded-full border-2 border-[#0336BC] font-semibold flex items-center justify-center text-sm bg-white transition-colors ${activeIndex === index ? 'bg-[#0336BC] text-white' : 'text-[#0336BC] group-hover:bg-[#0336BC] group-hover:text-white'}`}
                                        whileHover={{
                                            scale: 1.1,
                                            transition: { duration: 0.2 }
                                        }}
                                    >
                                        {index + 1}
                                    </motion.div>
                                    <div>
                                        <h4 className="text-[#333] text-base font-bold font-openSans">{data.title}</h4>
                                        <p className="text-sm text-gray-500">{data.subtitle}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
};

export default TimelineScrollSection;
