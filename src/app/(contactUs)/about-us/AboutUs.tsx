"use client"

import Link from "next/link";
import Image from "next/image";

import { useEffect, useState } from "react";
import GlobeSection from "@/components/modules/home/globe";
import RightArrowIcon from "@/components/icons/RightArrowIcon";
import FAQSection from "@/components/modules/home/FAQSection";
import AboutSteps from "./component/AboutSteps";
// import TimelineScrollSection from "./component/ScrollingAboutSteps";



const AboutUsPage = () => {
    const [showMobileCta, setShowMobileCta] = useState(false);

    // const timelineItems = [
    //     { number: 1, title: 'Experience', subtitle: 'User-Driven Innovation', active: true, badge: '920' },
    //     { number: 2, title: 'Operations', subtitle: 'Precision in Action' },
    //     { number: 3, title: 'Scalability', subtitle: 'Engineered for growth' },
    //     { number: 4, title: 'Adaptability', subtitle: 'Future-Ready Mindset' },
    //     { number: 5, title: 'Intelligence', subtitle: 'Cognitive-Led Efficiency' },
    //     { number: 6, title: 'Integrity', subtitle: 'Informed by protocol' },
    // ];
    // Handle scroll events to show/hide floating CTA on mobile
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 400) {
                setShowMobileCta(true);
            } else {
                setShowMobileCta(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            {/* Floating mobile CTA button */}
            <div className={`fixed bottom-4 sm:bottom-6 right-4 z-[1000] transition-all duration-300 transform ${showMobileCta ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-95'} lg:hidden`}>
                <Link href="/getting-started">
                    <button className="bg-[#2D65F2] hover:bg-[#0336BC] text-white rounded-full w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95" aria-label="Get started">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </Link>
            </div>

            {/* hero section */}
            <section className="bg-[#FAFAFF] pt-[60px] sm:pt-[80px] md:pt-[100px] pb-[20px] sm:pb-[30px] overflow-hidden relative">
                <div className="max-w-[1200px] mx-auto px-4 sm:px-5 flex flex-col items-center py-[40px] sm:py-[60px] md:py-[80px] lg:py-[100px] text-center relative z-50">

                    <h1 className="text-[28px] sm:text-[36px] md:text-[42px] lg:text-[52px] font-bold text-[#04082C] leading-tight md:leading-[1.1] max-w-[800px] w-full mx-auto mb-[8px] sm:mb-[10px] mt-[5px] font-montserrat">
                        About Us
                    </h1>
                    <p className="text-[14px] sm:text-[15px] md:text-[16px] text-[#333] leading-6 font-openSans mb-[20px] sm:mb-[30px] max-w-[95%] sm:max-w-[90%] md:max-w-[80%] mx-auto">
                        Get to know <span className="font-bold text-[#2D65F2]">Fleetblox</span>. Driving Simplicity in a Connected World
                    </p>

                </div>
                {/* Blurred spotlight ellipse with animation */}
                <div
                    className="absolute left-1/2 top-2/3 max-w-[664px] w-full max-h-[664px] h-full -translate-x-1/2 -translate-y-1/2 rounded-[664px] bg-[#FBEECA] opacity-40 blur-[50px] xs:blur-[100px] sm:blur-[200px] animate-pulse-slow"
                ></div>
            </section>


            <section className="pt-[40px] sm:pt-[60px] md:pt-[80px] pb-[20px] sm:pb-[30px] overflow-hidden relative">
                <div className="max-w-[1200px] mx-auto px-4 sm:px-5 flex flex-col items-center py-[40px] sm:py-[60px] md:py-[80px] lg:py-[100px] text-center relative z-50">
                    <h5 className="text-[18px] sm:text-[20px] md:text-[24px] lg:text-[28px] text-[#0336BC] font-bold font-montserrat">
                        Our Moto
                    </h5>
                    <h2 className="text-[22px] sm:text-[26px] md:text-[32px] lg:text-[36px] font-bold text-[#04082C] leading-tight md:leading-[1.1] max-w-[800px] w-full mx-auto mb-[8px] sm:mb-[10px] mt-[5px] font-montserrat">
                        Simplifying Operations . <span className="font-bold text-[#2D65F2]">Amplifying</span>  Growth
                    </h2>
                    <p className="text-[14px] sm:text-[15px] md:text-[16px] text-[#333] leading-6 font-openSans mb-[20px] sm:mb-[30px] max-w-[95%] sm:max-w-[90%] md:max-w-[80%] mx-auto">
                        {`At Fleetblox, we strive to simplify and modernize fleet operations in a time of rapid change in mobility and automotive technology. As vehicles become
                                more connected and intelligent, we are built to adapt to that change— designed to manage the pace, complexity, and intelligence
                            of the changing automotive landscape.`}
                    </p>

                </div>

            </section>
            {/* Realtime fleet awareness section */}

            {/* Animation section */}

            <AboutSteps />

            {/* <TimelineScrollSection timelineItems={timelineItems} /> */}
            {/* Reduced risk and downtime section */}

            { /* Multi-powertrains integration section  */}
            <section className="py-10 sm:py-12 md:py-16 lg:py-20 bg-[#FAFAFF] mx-auto w-full px-4 sm:px-5">
                <div className="max-w-[1200px] flex flex-col lg:flex-row-reverse items-center gap-6 sm:gap-8 lg:gap-10 justify-between mx-auto w-full">
                    <div className="w-full lg:w-1/2 order-2 lg:order-1 flex justify-center">
                        <Image
                            src="/images/our-team-about.svg"
                            alt="Fleet management illustration"
                            width={600}
                            height={300}
                            sizes="(max-width: 640px) 90vw, (max-width: 768px) 80vw, (max-width: 1200px) 50vw, 600px"
                            className="object-contain w-full h-auto max-w-[90%] sm:max-w-[80%] lg:max-w-full"
                            priority
                        />
                    </div>
                    {/* right side */}
                    <div className="w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left order-1 lg:order-2">
                        <p className="text-[#0336BC] font-openSans font-[700] text-base sm:text-lg">Our team</p>
                        <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#04082C] font-bold leading-tight mt-2 mb-3 sm:mb-4">
                            Driven By Passion
                        </h3>
                        <p className="text-[#7D7D7D] text-sm sm:text-base leading-6 font-openSans mb-6 sm:mb-8 lg:mb-12 max-w-[95%] sm:max-w-[90%] mx-auto lg:mx-0">
                            Fleetbloxers are passionate about building modern solutions that align
                            with the rapid evolution of today&apos;s automotive market.
                        </p>

                        <Link aria-label="Get started with FleetBlox" href="/getting-started" className="w-full sm:w-auto inline-flex justify-center">
                            <button className="transition-all bg-[#2D65F2] hover:bg-[#0336BC] font-openSans text-white-primary text-white duration-300 flex items-center px-4 py-3 text-[14px] md:text-base font-bold rounded-md group justify-center w-full sm:w-auto sm:min-w-[100.72px] hover:sm:min-w-[130.72px] shadow-sm hover:shadow-md">
                                <div className="z-50 whitespace-nowrap">Join Us</div>
                                <div className="z-50 transform transition-transform opacity-0 group-hover:opacity-100 -translate-x-4 duration-300 group-hover:translate-x-0 ml-2">
                                    <RightArrowIcon />
                                </div>
                            </button>
                        </Link>
                    </div>
                </div>
            </section>
            {/* Footer Call to Action section */}

            <GlobeSection
                title="Built For Today's Demands, Designed For The Future"
                description="Fleetblox is designed for today's automotive transformation, helping businesses adapt to fast-changing market conditions - and simplifying growth to make scaling smarter."
            />
            {/* FAQS */}

            <FAQSection />


            {/* Footer Call to Action section */}
            <section className="bg-[#FAFAFF] py-10 sm:py-12 md:py-16 lg:py-20">
                <div className="max-w-[1200px] mx-auto px-4 sm:px-5 text-center">
                    <p className="text-sm text-[#0339F4]">Feedback</p>
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#04082C] font-bold leading-tight mb-4">
                        Contact Us
                    </h2>
                    <p className="text-sm sm:text-base text-[#7D7D7D] mb-6 max-w-[95%] sm:max-w-[90%] md:max-w-[80%] mx-auto">
                        We&apos;re always eager to hear your feedback and suggestions to help us improve and enhance your experience with our application.
                    </p>
                    <Link href="/contact" className="inline-block">
                        <button className="bg-[#2D65F2] hover:bg-[#0336BC] text-white font-openSans text-base font-bold px-6 py-3 rounded-md shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center">
                            Contact Us
                            <RightArrowIcon />
                        </button>
                    </Link>
                </div>
            </section>
        </>
    );
};

export default AboutUsPage;





