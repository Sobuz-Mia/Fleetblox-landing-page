"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import useScrollSpy from "@/hooks/useScrollSpy";
import Image from "next/image";

const ScrollingSection = ({ animationItems }: { animationItems: Array<{ title: string; content: string; image: string }> }) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const { activeIndex, componentRef } = useScrollSpy(".scroll-section", isMobile ? 0.4 : 0.8);

    return (
        <div ref={componentRef}>
            {isMobile ? (
                // Mobile View - Vertical Cards
                <div className="flex flex-col bg-white">
                    {animationItems.map((data, index) => (
                        <section
                            key={index}
                            className="scroll-section min-h-screen flex flex-col p-4"
                            data-index={index}
                        >
                            {/* Image Container */}
                            <div className="flex-1 relative flex items-center justify-center py-6">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                                    transition={{ duration: 0.2 }}
                                    className="relative w-full h-[350px]"
                                >
                                    <Image
                                        src={data.image}
                                        alt={data.title}
                                        fill
                                        className="object-contain"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                </motion.div>
                            </div>

                            {/* Text Container */}
                            <div className="flex-1 flex items-center justify-center p-4">
                                <div className="max-w-[500px]">
                                    <h2 className="pb-3 pt-2 font-montserrat text-2xl font-bold text-[#04082C]">
                                        {data.title}
                                    </h2>
                                    <p className="font-openSans text-[#333] text-base">
                                        {data.content}
                                    </p>
                                </div>
                            </div>
                        </section>
                    ))}
                </div>
            ) : (
                // Desktop View - Original Layout
                <div className="flex flex-col md:flex-row bg-white">
                    {/* Left Image Column */}
                    <div className="md:sticky md:top-0 flex h-auto md:h-screen w-full md:w-1/2 items-center justify-center bg-gradient-to-b from-white via-[#FEFAF0] to-white py-8 md:py-0">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.1 }}
                            >
                                <div className="relative flex items-center justify-center px-4 sm:px-0">
                                    <div className="relative h-[200px] sm:h-[300px] md:h-[350px] lg:h-[430px] w-full sm:w-[400px] md:w-[500px] lg:w-[630px]">
                                        <Image
                                            src={animationItems[activeIndex].image}
                                            alt={`Animation slide ${activeIndex + 1}`}
                                            width={630}
                                            height={430}
                                            className="h-full w-full object-contain"
                                            priority
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Right Text Column */}
                    <div className="relative flex w-full md:w-1/2 flex-col">
                        <div className="hidden md:block absolute left-0 top-0 h-[200px] w-full bg-gradient-to-b from-bg_white z-10"></div>
                        <div className="hidden md:block absolute bottom-0 left-0 h-[200px] w-full bg-gradient-to-t from-bg_white z-10"></div>

                        <div className="flex flex-col">
                            {animationItems.map((data, index) => (
                                <div
                                    key={index}
                                    className={`scroll-section flex h-auto md:h-screen items-center p-4 md:p-8 ${activeIndex === index ? 'active-section' : ''}`}
                                    data-index={index}
                                >
                                    <div className="w-full md:max-w-[480px] lg:max-w-[520px]">
                                        <h2 className="pb-4 pt-2 font-montserrat text-3xl font-bold text-[#04082C]">
                                            {data.title}
                                        </h2>
                                        <p className="font-openSans text-[#333] text-lg">
                                            {data.content}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ScrollingSection;