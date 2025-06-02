import React from 'react'

const AboutSteps = () => {
    const timelineItems = [
        { number: 1, title: 'Experience', subtitle: 'User-Driven Innovation', active: true, badge: '920' },
        { number: 2, title: 'Operations', subtitle: 'Precision in Action' },
        { number: 3, title: 'Scalability', subtitle: 'Engineered for growth' },
        { number: 4, title: 'Adaptability', subtitle: 'Future-Ready Mindset' },
        { number: 5, title: 'Intelligence', subtitle: 'Cognitive-Led Efficiency' },
        { number: 6, title: 'Integrity', subtitle: 'Informed by protocol' },
    ];

    return (
        <section className=" py-12 sm:py-16 md:py-20 lg:py-12 max-w-[1200px] mx-auto w-full flex flex-col-reverse xl:flex-row items-stretch gap-8 sm:gap-10 md:gap-12 relative px-4 sm:px-5">
            {/* left side - now uses flex to center content vertically */}
            <div className=" sticky flex-1 w-full flex flex-col justify-start text-center xl:text-left">
                <p className="text-[#0336BC] font-openSans font-bold text-base sm:text-lg">Our core values</p>
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#04082C] font-bold leading-tight mt-2 mb-3 sm:mb-4">
                    Foundations That Turns Vision
                    Into <span className="font-bold text-[#2D65F2]">Values</span>
                </h3>
                <p className="text-[#7D7D7D] text-sm sm:text-base leading-6 font-openSans mb-6 sm:mb-8 lg:mb-12 max-w-[90%] sm:max-w-none mx-auto xl:mx-0">
                    Bridging the gaps between today’s traditional fleet management and
                    the new generation of connected vehicles.
                </p>

            </div>

            {/* Right side */}
            <div className="flex-1 w-full mt-32 flex items-center justify-center mb-6 xl:mb-0">
                <div className="ml-20">
                    <LeftSideTimeLine />
                </div>
                <div className="grid grid-cols-1 gap-12 sm:gap-12 justify-items-center xl:justify-items-start relative pl-[80px] sm:pl-[90px]">
                    {/* Main vertical timeline connector line */}

                    {timelineItems?.map((data, index) => {

                        return (
                            <div key={index} className="flex relative max-w-[480px] w-[360px] group ml-[15px]">

                                {/* Card shadow */}
                                <div className="absolute top-2 -ml-[100px] left-0 right-20 z-10 rounded-2xl bg-[rgba(0,0,0,0.08)] blur-md h-[calc(100%+8px)] transition-all duration-300 group-hover:bg-[rgba(0,0,0,0.12)]" />

                                {/* Card content */}
                                <div className="-ml-[100px] z-50 p-4 sm:p-5 bg-white w-full rounded-xl flex items-center gap-3 sm:gap-4 transition-transform duration-300 group-hover:translate-y-[-2px]">
                                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border-2 border-[#0336BC] text-[#0336BC] font-semibold text-sm sm:text-base transition-colors duration-300 group-hover:bg-[#0336BC] group-hover:text-white z-30 relative bg-white">
                                        {index + 1}
                                    </div>
                                    <div className="text-left">
                                        <h2 className="text-[#333] text-sm sm:text-base font-bold font-openSans">
                                            {data?.title}
                                        </h2>
                                        <p className="text-sm text-gray-500">{data?.subtitle}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default AboutSteps


export const LeftSideTimeLine = () => {
    return (
        <svg width="89" height="680" viewBox="0 0 89 684" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M77.6667 6C77.6667 8.94552 80.0545 11.3333 83 11.3333C85.9455 11.3333 88.3333 8.94552 88.3333 6C88.3333 3.05448 85.9455 0.666667 83 0.666667C80.0545 0.666667 77.6667 3.05448 77.6667 6ZM77.6667 678C77.6667 680.946 80.0545 683.333 83 683.333C85.9455 683.333 88.3333 680.946 88.3333 678C88.3333 675.055 85.9455 672.667 83 672.667C80.0545 672.667 77.6667 675.055 77.6667 678ZM83 6V5H31V6V7H83V6ZM1 36H0V122.308H1H2V36H1ZM1 122.308H0V232.8H1H2V122.308H1ZM1 232.8H0V345.877H1H2V232.8H1ZM1 345.877H0V451.2H1H2V345.877H1ZM1 451.2H0V567.508H1H2V451.2H1ZM1 567.508H0V648H1H2V567.508H1ZM31 678V679H83V678V677H31V678ZM1 648H0C0 665.121 13.8792 679 31 679V678V677C14.9837 677 2 664.016 2 648H1ZM31 6V5C13.8792 5 0 18.8792 0 36H1H2C2 19.9837 14.9837 7 31 7V6Z" fill="#0336BC" />
            <path d="M77.6667 144C77.6667 146.946 80.0545 149.333 83 149.333C85.9455 149.333 88.3333 146.946 88.3333 144C88.3333 141.054 85.9455 138.667 83 138.667C80.0545 138.667 77.6667 141.054 77.6667 144ZM1 144V145H83V144V143H1V144Z" fill="#0336BC" />
            <path d="M77.6667 276C77.6667 278.946 80.0545 281.333 83 281.333C85.9455 281.333 88.3333 278.946 88.3333 276C88.3333 273.054 85.9455 270.667 83 270.667C80.0545 270.667 77.6667 273.054 77.6667 276ZM1 276V277H83V276V275H1V276Z" fill="#0336BC" />
            <path d="M77.6667 408C77.6667 410.946 80.0545 413.333 83 413.333C85.9455 413.333 88.3333 410.946 88.3333 408C88.3333 405.054 85.9455 402.667 83 402.667C80.0545 402.667 77.6667 405.054 77.6667 408ZM1 408V409H83V408V407H1V408Z" fill="#0336BC" />
            <path d="M77.6667 540C77.6667 542.946 80.0545 545.333 83 545.333C85.9455 545.333 88.3333 542.946 88.3333 540C88.3333 537.054 85.9455 534.667 83 534.667C80.0545 534.667 77.6667 537.054 77.6667 540ZM1 540V541H83V540V539H1V540Z" fill="#0336BC" />
        </svg>

    )
}