"use client";
import Link from "next/link";
import Image from "next/image";

import { useEffect, useState } from "react";
import GlobeSection from "@/components/modules/home/globe";
// import StarterFleetActionButton from "@/components/ui/StarterFleetActionButton";

const StarterFleetPage = () => {
  const [showMobileCta, setShowMobileCta] = useState(false);

  // Handle scroll events to show/hide floating CTA on mobile
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowMobileCta(true);
      } else {
        setShowMobileCta(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* Floating mobile CTA button */}
      <div
        className={`fixed bottom-6 right-4 z-[1000] transition-all duration-300 transform ${
          showMobileCta
            ? "translate-y-0 opacity-100 scale-100"
            : "translate-y-20 opacity-0 scale-95"
        } lg:hidden`}
      >
        <Link href="/getting-started">
          <button
            className="bg-[#2D65F2] hover:bg-[#0336BC] text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95"
            aria-label="Get started"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 12H19M19 12L13 6M19 12L13 18"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </Link>
      </div>

      {/* hero section */}
      <section className="bg-[#FAFAFF] pt-[60px] sm:pt-[80px] md:pt-[100px] pb-[20px] sm:pb-[30px] overflow-hidden relative">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-5 flex flex-col items-center py-[60px] sm:py-[80px] md:py-[100px] lg:py-[120px] text-center relative z-50">
          <h1 className="text-[20px] sm:text-[24px] md:text-[28px] text-[#0336BC] font-bold font-montserrat">
            Starter Fleet
          </h1>
          <h2 className="text-[28px] sm:text-[36px] md:text-[42px] lg:text-[52px] font-bold text-[#04082C] leading-tight md:leading-[1.1] max-w-[800px] w-full mx-auto mb-[8px] sm:mb-[10px] mt-[5px] font-montserrat">
            Get Your Fleet Online—Without Touching a Wrench
          </h2>
          <p className="text-[14px] sm:text-[15px] md:text-[16px] text-[#333] leading-6 font-openSans mb-[20px] sm:mb-[30px] max-w-[90%] md:max-w-[80%] mx-auto">
            {`Unlock real-time visibility into your fleet with no hardware, no installation, and no downtime. Plug in instantly to smarter data and empower your team with the intelligence they need to get your fleet running at peak performance from day one.`}
          </p>
          {/* <Link aria-label="Get started with FleetBlox" href="/getting-started">
            <button className="hidden transition-all bg-[#2D65F2] hover:bg-[#0336BC] font-openSans text-white-primary text-white duration-300 hover:w-[190.72px] w-[168.72px] lg:flex items-center px-4 py-3 text-base font-bold rounded-md group">
              <div className="z-50 whitespace-nowrap">View Pricing Plan</div>
              <div className="z-50 transform transition-transform opacity-0 group-hover:opacity-100 -translate-x-4 duration-300 group-hover:translate-x-0">
                <RightArrowIcon />
              </div>
            </button>
          </Link> */}
          {/* <StarterFleetActionButton text="Start Today" /> */}
        </div>
        {/* Blurred spotlight ellipse with animation */}
        <div
          className={`absolute left-1/2 top-2/3 max-w-[664px] w-full max-h-[664px] h-full -translate-x-1/2 -translate-y-1/2 rounded-[664px] bg-[#FBEECA] opacity-40 blur-[100px] sm:blur-[200px] animate-pulse-slow`}
        ></div>
      </section>
      {/* Realtime fleet awareness section */}
      {/* <RealtimeFleetAwareness /> */}

      {/* Fleet connection section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-12 max-w-[1200px] mx-auto w-full flex flex-col-reverse xl:flex-row items-stretch gap-8 sm:gap-10 md:gap-12 relative px-4 sm:px-5">
        {/* left side - now uses flex to center content vertically */}
        <div className="flex-1 w-full flex flex-col justify-center text-center xl:text-left">
          <p className="text-[#0336BC] font-openSans font-bold text-base sm:text-lg">
            Link your fleet
          </p>
          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#04082C] font-bold leading-tight mt-2 mb-3 sm:mb-4">
            Plug In Your Fleet Remotely Within Few Clicks
          </h3>
          <p className="text-[#7D7D7D] text-sm sm:text-base leading-6 font-openSans mb-6 sm:mb-8 lg:mb-12 max-w-[90%] sm:max-w-none mx-auto xl:mx-0">
            Easily verify your fleets with a simple compatibility check and
            securely connect through your OEM account to start streaming
            real-time data for monitoring vehicle health, performance, and key
            metrics—without the need for any installations.
          </p>{" "}
          <div className="grid grid-cols-1 gap-4 sm:gap-5 justify-items-center xl:justify-items-start">
            {[
              { title: "Compatibility check" },
              { title: "Connect through OEM" },
              { title: "Streaming real-time data" },
            ]?.map((data, index) => (
              <div
                key={index}
                className="flex relative max-w-[480px] w-full group"
              >
                <div className="absolute top-2 left-2 right-2 z-10 rounded-2xl bg-[rgba(0,0,0,0.08)] blur-md h-[calc(100%+8px)] transition-all duration-300 group-hover:bg-[rgba(0,0,0,0.12)]"></div>
                <div className="z-50 p-4 sm:p-5 bg-white w-full rounded-xl flex items-center gap-3 sm:gap-4 transition-transform duration-300 group-hover:translate-y-[-2px]">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border-2 border-[#0336BC] text-[#0336BC] font-semibold text-sm sm:text-base transition-colors duration-300 group-hover:bg-[#0336BC] group-hover:text-white">
                    {index + 1}
                  </div>
                  <div className="text-left">
                    <h2 className="text-[#333] text-sm sm:text-base font-bold font-openSans">
                      {data?.title}
                    </h2>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right side - responsive image container */}
        <div className="flex-1 w-full flex items-center justify-center mb-6 xl:mb-0">
          <div className="relative w-full max-w-[400px] sm:max-w-[500px] lg:max-w-[600px] aspect-[4/3] sm:aspect-[3/4]">
            <Image
              src="/images/subscription/starter-fleet-banner.svg"
              alt="Fleet connection illustration"
              fill
              sizes="(max-width: 768px) 90vw, (max-width: 1200px) 50vw, 600px"
              className="object-contain"
              priority
            />
          </div>
        </div>
      </section>

      {/* Reduced risk and downtime section */}

      {/* Call to action section */}
      <section className="py-12 sm:py-16 md:py-20 max-w-[1300px] mx-auto flex flex-col w-full px-4 sm:px-5">
        <div className="max-w-[900px] mx-auto w-full text-center">
          <p className="text-[#0336BC] font-openSans mb-1 sm:mb-2 font-bold text-base sm:text-lg">
            Instant vehicle profile
          </p>
          <h2 className="text-[#04082C] text-[22px] sm:text-[26px] md:text-[28px] lg:text-[36px] font-bold text-center leading-[1.2] sm:leading-[1.1] mb-[8px] sm:mb-[10px]">
            Create Detailed Digital Profiles
            <span className="hidden sm:inline">
              <br />
            </span>
            <span className="sm:hidden"> </span>
            For Your Fleet in Seconds
          </h2>
          <p className="text-[#7D7D7D] text-[14px] sm:text-[15px] md:text-[16px] leading-[1.6] sm:leading-6 font-openSans max-w-[95%] mx-auto">
            Build detailed digital profiles for all vehicles instantly via VIN
            scanning and auto-extracting of vehicle technical details like
            <span className="hidden md:inline">
              <br />
            </span>
            <span className="md:hidden"> </span>
            make, model, drivetrain, engine type, and more quickly turning your
            fleet into an entirely searchable, data-rich asset.
          </p>
        </div>
        <div className="w-full h-[250px] sm:h-[350px] md:h-[420px] lg:h-[450px] mx-auto mt-6 sm:mt-8 md:mt-10 relative overflow-hidden">
          <Image
            src="/images/subscription/management-section.svg"
            alt="Vehicle profile illustration"
            width={800}
            height={450}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
            className="object-contain w-full h-full mx-auto transition-transform duration-700 hover:scale-[1.02]"
            loading="lazy"
            quality={90}
          />
        </div>
      </section>
      {/* Multi-powertrains integration section  */}
      <section className="py-12 sm:py-16 md:py-20 bg-[#FAFAFF] mx-auto w-full px-4 sm:px-5">
        <div className="max-w-[1200px] flex flex-col lg:flex-row items-center gap-6 sm:gap-8 lg:gap-10 justify-between mx-auto w-full">
          <div className="w-full lg:w-1/2 order-2 lg:order-1 relative">
            <Image
              src="/images/subscription/starter-fleet-hero.svg"
              alt="Fleet management illustration"
              width={600}
              height={300}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
              className="object-contain w-full h-auto"
              priority
            />
            <div className="absolute left-1/2 top-10 -translate-x-1/2 -translate-y-1/2 w-[86px] h-[57px]">
              <video
                autoPlay
                loop
                muted
                playsInline
                className=" z-50 h-full !w-full object-contain mix-blend-plus-lighter "
              >
                <source src="/videos/wi-fi-signal.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
          {/* right side */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left order-1 lg:order-2">
            <p className="text-[#0336BC] font-openSans font-[700] text-base sm:text-lg">
              Multi-powertrain integration
            </p>
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#04082C] font-bold leading-tight mt-2 mb-3 sm:mb-4">
              Seamlessly Integrate Across Brands
            </h3>
            <p className="text-[#7D7D7D] text-sm sm:text-base leading-6 font-openSans mb-6 sm:mb-8 lg:mb-12 max-w-[90%] mx-auto lg:mx-0">
              FleetBlox connects to vehicles with any type of powertrain -
              combustion, hybrid, or electric - and enables real-time insights
              into performance, health, and energy use.
            </p>
            <div className="grid grid-cols-1 gap-4 sm:gap-5 justify-items-center lg:justify-items-start">
              {[
                {
                  title: "No complicated setup",
                  icon: <NoCompatibilityCheckIcon />,
                },
                {
                  title: "No installation",
                  icon: <NoInstallationIcon />,
                },
                {
                  title: "Instant control",
                  icon: <InstantControlIcon />,
                },
              ]?.map((data, index) => (
                <div
                  key={index}
                  className="flex relative max-w-[300px] w-full group"
                >
                  <div className="absolute top-2 left-2 right-2 z-10 rounded-2xl bg-[rgba(0,0,0,0.08)] blur-md h-[calc(100%+8px)] transition-all duration-300 group-hover:bg-[rgba(0,0,0,0.12)]"></div>
                  <div className="z-50 p-4 sm:p-5 bg-white w-full rounded-xl flex items-center gap-3 sm:gap-4 transition-transform duration-300 group-hover:translate-y-[-2px]">
                    <div className="flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                      {data?.icon}
                    </div>
                    <div className="text-left">
                      <h2 className="text-[#333] text-sm sm:text-base font-[600] font-openSans">
                        {data?.title}
                      </h2>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Footer Call to Action section */}

      <GlobeSection
        title="Turn Every Vehicle Into An Intelligent Data Point Without Complicity"
        description="Start with zero friction, monitor, manage, and move faster from day one."
      />
    </>
  );
};

export default StarterFleetPage;

const NoCompatibilityCheckIcon = () => {
  return (
    <svg
      width="32"
      height="33"
      viewBox="0 0 32 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.5906 19.1664H15.3314C14.8927 19.1664 14.5151 18.8484 14.4531 18.4262L14.2464 17.2658C13.8413 17.1476 13.4498 16.9866 13.0783 16.7839L12.1081 17.4644C11.753 17.7179 11.2664 17.6766 10.9548 17.3643L10.0674 16.4864C9.76152 16.1894 9.71764 15.7169 9.9662 15.3657L10.6588 14.3929C10.4537 14.0173 10.2896 13.6249 10.1689 13.221L8.99556 13.019C8.569 12.9483 8.25781 12.5838 8.25781 12.1527V10.9083C8.25781 10.4772 8.56902 10.1125 8.99759 10.0416L10.1668 9.84045C10.2837 9.44423 10.4478 9.05142 10.6582 8.66828L9.96695 7.69634C9.72191 7.34959 9.76382 6.87907 10.0658 6.57642L10.9555 5.69061C11.2806 5.38563 11.7623 5.34987 12.1103 5.59852L13.079 6.27378C13.4524 6.07267 13.8435 5.91247 14.2462 5.79532L14.4549 4.62314C14.5153 4.21279 14.8927 3.89453 15.3314 3.89453H16.5905C17.0292 3.89453 17.4068 4.21258 17.4688 4.63471L17.6755 5.7951C18.0776 5.91182 18.4697 6.07202 18.8466 6.27356L19.8145 5.59594C20.1601 5.35071 20.6414 5.38562 20.9572 5.68161L21.8555 6.57536C22.1579 6.87885 22.1996 7.34894 21.9565 7.69441L21.2639 8.66783C21.4739 9.05056 21.6382 9.44338 21.7553 9.84L22.9265 10.0415C23.3531 10.1126 23.6642 10.4772 23.6642 10.9079V12.1522C23.6642 12.5831 23.353 12.9477 22.9245 13.019L21.7533 13.2205C21.6329 13.6245 21.4686 14.0166 21.2634 14.3925L21.9551 15.3644C22.2039 15.7167 22.1598 16.1888 21.8521 16.4882L20.9653 17.3652C20.6547 17.6758 20.169 17.7171 19.8111 17.4616L18.8437 16.7833C18.4719 16.9859 18.081 17.1474 17.6754 17.2652L17.4668 18.4374C17.4068 18.8484 17.0292 19.1664 16.5905 19.1664L16.5906 19.1664ZM13.0559 15.8921C13.1331 15.8921 13.2103 15.9127 13.2782 15.9544C13.725 16.2267 14.2081 16.4261 14.7138 16.5479C14.8748 16.5869 14.9972 16.7141 15.0255 16.8728L15.2796 18.2994C15.2848 18.3358 15.3065 18.3543 15.3314 18.3543H16.5906C16.6155 18.3543 16.6371 18.3361 16.6404 18.3114L16.8965 16.8731C16.9247 16.7144 17.0471 16.5871 17.2081 16.5482C17.7143 16.4267 18.1971 16.2269 18.6442 15.9547C18.7876 15.8662 18.9726 15.8722 19.1116 15.9695L20.3046 16.806C20.3271 16.8223 20.3471 16.8187 20.3668 16.799L21.2578 15.9179C21.2832 15.8933 21.2856 15.8532 21.2664 15.8258L20.4278 14.647C20.3354 14.5172 20.3286 14.3476 20.4106 14.2109C20.6839 13.7571 20.8862 13.2724 21.0117 12.7702C21.0509 12.6134 21.1817 12.4941 21.3454 12.4663L22.7815 12.2196C22.8048 12.2155 22.828 12.1889 22.828 12.153V10.9084C22.828 10.8722 22.8046 10.8457 22.7835 10.8422L21.3454 10.5951C21.1804 10.5668 21.0487 10.446 21.0108 10.2877C20.8939 9.80136 20.6917 9.31778 20.4107 8.85042C20.3286 8.71399 20.3355 8.54416 20.4279 8.41437L21.2673 7.23446C21.2865 7.20662 21.2825 7.16871 21.2554 7.14173L20.3672 6.25784C20.3575 6.24906 20.3284 6.23771 20.3072 6.25313L19.1164 7.0869C18.9803 7.18221 18.7982 7.18971 18.6539 7.10404C18.1947 6.83225 17.7082 6.6335 17.2082 6.51337C17.0472 6.47439 16.9248 6.34718 16.8965 6.18847L16.6425 4.76184C16.6372 4.72543 16.6155 4.70723 16.5906 4.70723H15.3314C15.3065 4.70723 15.2849 4.72543 15.2816 4.75006L15.0255 6.18842C14.9973 6.34712 14.8749 6.47434 14.7139 6.51333C14.2114 6.63433 13.7273 6.83266 13.2754 7.10317C13.132 7.18841 12.9489 7.18284 12.8122 7.08732L11.6192 6.2559C11.5899 6.23534 11.5588 6.25462 11.5457 6.26661L10.6657 7.14299C10.6399 7.16912 10.6355 7.20638 10.6562 7.23572L11.4946 8.41431C11.587 8.5441 11.5938 8.71372 11.5118 8.85037C11.2299 9.31855 11.0281 9.80213 10.9116 10.2873C10.8737 10.4455 10.742 10.567 10.5771 10.595L9.14098 10.8417C9.11738 10.8458 9.09444 10.8724 9.09444 10.9084V12.1527C9.09444 12.1889 9.11738 12.2154 9.13899 12.2189L10.577 12.466C10.7409 12.4939 10.8715 12.6131 10.9108 12.7699C11.0363 13.2722 11.2383 13.7568 11.5118 14.2106C11.5939 14.3471 11.587 14.5169 11.4946 14.6467L10.6552 15.8266C10.6369 15.8527 10.6397 15.8928 10.662 15.9146L11.5537 16.7968C11.5762 16.8195 11.5963 16.821 11.6155 16.8075L12.8109 15.9688C12.8841 15.9178 12.9699 15.8921 13.056 15.8921L13.0559 15.8921Z"
        fill="#2D65F2"
        fillOpacity="0.8"
      />
      <path
        d="M15.9652 23.6595C15.7341 23.6595 15.5469 23.4779 15.5469 23.2533L15.5471 18.7539C15.5471 18.5295 15.7341 18.3477 15.9654 18.3477C16.1965 18.3477 16.3838 18.5293 16.3838 18.7539V23.2533C16.3836 23.4779 16.1965 23.6595 15.9652 23.6595Z"
        fill="#2D65F2"
        fillOpacity="0.8"
      />
      <path
        d="M24.6052 23.6688C24.374 23.6688 24.1868 23.4872 24.1868 23.2625V21.8316C24.1868 21.6119 24.0028 21.4332 23.7765 21.4332L8.20798 21.4335C7.98169 21.4335 7.79774 21.6121 7.79774 21.8318V23.2627C7.79774 23.4872 7.61071 23.669 7.37934 23.669C7.14819 23.669 6.96094 23.4874 6.96094 23.2627V21.8318C6.96094 21.1642 7.52027 20.6211 8.20775 20.6211H23.7769C24.4644 20.6211 25.0237 21.1642 25.0237 21.8318V23.2627C25.0239 23.4872 24.8369 23.6688 24.6055 23.6688L24.6052 23.6688Z"
        fill="#2D65F2"
        fillOpacity="0.8"
      />
      <path
        d="M15.9653 15.2212C13.8736 15.2212 12.1719 13.566 12.1719 11.5318C12.1719 9.5004 13.8735 7.84766 15.9653 7.84766C18.057 7.84766 19.7588 9.50024 19.7588 11.5318C19.7586 13.5661 18.057 15.2212 15.9653 15.2212ZM15.9653 8.66043C14.3348 8.66043 13.0085 9.94846 13.0085 11.5321C13.0085 13.1185 14.3348 14.4088 15.9653 14.4088C17.5959 14.4088 18.9221 13.1185 18.9221 11.5321C18.9221 9.94846 17.5959 8.66043 15.9653 8.66043Z"
        fill="#2D65F2"
        fillOpacity="0.8"
      />
      <path
        d="M9.53875 29.8912H5.22834C4.55111 29.8912 4 29.356 4 28.6978V24.5172C4 23.8595 4.55109 23.3242 5.22834 23.3242H9.53892C10.2166 23.3242 10.7677 23.8594 10.7677 24.5172L10.7675 28.6978C10.7675 29.356 10.2164 29.8912 9.53875 29.8912ZM5.22834 24.1364C5.01222 24.1364 4.83668 24.3069 4.83668 24.5168L4.83646 28.6977C4.83646 28.9076 5.012 29.0785 5.22812 29.0785H9.5387C9.75481 29.0785 9.93079 28.9076 9.93079 28.6977V24.517C9.93079 24.3071 9.75481 24.1367 9.5387 24.1367L5.22834 24.1364Z"
        fill="#2D65F2"
        fillOpacity="0.8"
      />
      <path
        d="M26.7659 29.8912H22.4554C21.7777 29.8912 21.2266 29.356 21.2266 28.6978V24.5172C21.2266 23.8595 21.7777 23.3242 22.4554 23.3242H26.7659C27.4432 23.3242 27.9943 23.8594 27.9943 24.5172L27.994 28.6978C27.994 29.356 27.4432 29.8912 26.7659 29.8912ZM22.4554 24.1364C22.2392 24.1364 22.0633 24.3069 22.0633 24.5168V28.6977C22.0633 28.9076 22.2392 29.0785 22.4554 29.0785H26.7659C26.982 29.0785 27.1576 28.9076 27.1576 28.6977V24.517C27.1576 24.3071 26.982 24.1367 26.7659 24.1367L22.4554 24.1364Z"
        fill="#2D65F2"
        fillOpacity="0.8"
      />
      <path
        d="M18.1175 29.8912H13.8069C13.1292 29.8912 12.5781 29.356 12.5781 28.6978L12.5783 24.5172C12.5783 23.8595 13.1294 23.3242 13.8071 23.3242H18.1177C18.7949 23.3242 19.3461 23.8594 19.3461 24.5172L19.3458 28.6978C19.3458 29.356 18.7947 29.8912 18.1175 29.8912ZM13.8069 24.1364C13.5908 24.1364 13.4148 24.3069 13.4148 24.5168V28.6977C13.4148 28.9076 13.5908 29.0785 13.8069 29.0785H18.1175C18.3336 29.0785 18.5091 28.9076 18.5091 28.6977V24.517C18.5091 24.3071 18.3336 24.1367 18.1175 24.1367L13.8069 24.1364Z"
        fill="#2D65F2"
        fillOpacity="0.8"
      />
    </svg>
  );
};

const NoInstallationIcon = () => {
  return (
    <svg
      width="32"
      height="33"
      viewBox="0 0 32 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M25.3535 21.5608V13.6277C25.3535 11.7937 24.4009 10.0991 22.8546 9.18207C21.3085 8.26504 19.4032 8.26504 17.8571 9.18207C16.3108 10.0991 15.3582 11.7937 15.3582 13.6277V26.6946C15.3573 27.5606 15.0219 28.3908 14.4256 29.0033C13.8295 29.6156 13.021 29.9602 12.1779 29.9611H11.2693C10.4262 29.9602 9.61772 29.6156 9.02164 29.0033C8.42534 28.3908 8.08984 27.5606 8.08897 26.6946V15.9611H8.99775C9.59994 15.9604 10.1773 15.7142 10.6031 15.2768C11.029 14.8393 11.2686 14.2463 11.2693 13.6278V6.16126C11.2693 6.0376 11.2213 5.9188 11.1361 5.83127C11.0511 5.74373 10.9354 5.69464 10.8148 5.69464H9.90629V3.36137C9.90629 3.23749 9.85849 3.11892 9.77327 3.03139C9.68805 2.94385 9.5724 2.89453 9.45201 2.89453H5.81733C5.5664 2.89453 5.36305 3.10364 5.36305 3.36137V5.69464H4.45428C4.20335 5.69464 4 5.90352 4 6.16126V13.6278C4.00068 14.2463 4.24033 14.8394 4.6662 15.2768C5.09207 15.7142 5.66945 15.9603 6.27159 15.9611H7.18013L7.18035 26.6946C7.18148 27.808 7.61254 28.8755 8.37926 29.6631C9.14576 30.4504 10.1851 30.8932 11.2693 30.8945H12.1778C13.262 30.8931 14.3013 30.4504 15.0678 29.6631C15.8343 28.8755 16.2656 27.808 16.2667 26.6946V13.6277C16.2667 12.1272 17.0461 10.7408 18.3113 9.9905C19.5765 9.24023 21.135 9.24023 22.4002 9.9905C23.6655 10.7408 24.4448 12.1272 24.4448 13.6277V21.5608C23.8424 21.5615 23.2651 21.8077 22.8392 22.2451C22.4134 22.6825 22.174 23.2756 22.173 23.8941V28.5609C22.173 28.6846 22.221 28.8034 22.3063 28.8909C22.3915 28.9782 22.5069 29.0275 22.6275 29.0275H23.0818V30.4276C23.0818 30.5512 23.1296 30.67 23.2148 30.7576C23.3 30.8449 23.4157 30.8942 23.5361 30.8942H26.2622C26.3826 30.8942 26.4982 30.8449 26.5834 30.7576C26.6684 30.67 26.7164 30.5512 26.7164 30.4276V29.0275H27.1707C27.2913 29.0275 27.4068 28.9782 27.492 28.8909C27.5772 28.8034 27.625 28.6846 27.625 28.5609V23.8941C27.6243 23.2755 27.3847 22.6825 26.959 22.2451C26.5332 21.8077 25.9556 21.5615 25.3535 21.5608ZM6.27189 3.82728H8.99775L8.99797 5.69394H6.27189L6.27189 3.82728ZM4.90885 13.6271V6.62715H10.3609V13.6271C10.3609 13.9983 10.2172 14.3545 9.96158 14.6171C9.70615 14.8797 9.35939 15.0272 8.99804 15.0272H6.27195C5.91056 15.0272 5.56379 14.8797 5.30817 14.6171C5.05252 14.3545 4.90885 13.9983 4.90885 13.6271ZM25.8078 29.9604H23.9905V29.0272H25.8078V29.9604ZM26.7164 28.0938H23.0819V23.8938C23.0819 23.5226 23.2255 23.1664 23.4812 22.9038C23.7366 22.6412 24.0834 22.4937 24.445 22.4937H25.3535C25.7151 22.4937 26.0617 22.6412 26.3173 22.9038C26.573 23.1664 26.7166 23.5226 26.7166 23.8938L26.7164 28.0938Z"
        fill="#2D65F2"
        fillOpacity="0.8"
      />
    </svg>
  );
};

const InstantControlIcon = () => {
  return (
    <svg
      width="32"
      height="33"
      viewBox="0 0 32 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 4.89453C5.44772 4.89453 5 5.34225 5 5.89453V20.8945C5 21.4468 5.44772 21.8945 6 21.8945H26C26.5523 21.8945 27 21.4468 27 20.8945V5.89453C27 5.34225 26.5523 4.89453 26 4.89453H6ZM6.00459 7.118C6.00459 6.56571 6.4523 6.118 7.00459 6.118H24.9949C25.5472 6.118 25.9949 6.56571 25.9949 7.118V19.6704C25.9949 20.2227 25.5472 20.6704 24.9949 20.6704H7.00459C6.4523 20.6704 6.00459 20.2227 6.00459 19.6704V7.118Z"
        fill="#2D65F2"
        fillOpacity="0.8"
      />
      <path
        d="M5.78467 20.8125C5.54687 20.8125 5.33342 20.9584 5.24707 21.18L2.53493 28.1002C2.27786 28.7561 2.76149 29.4651 3.46598 29.4651H28.5434C29.2453 29.4651 29.7288 28.7608 29.4766 28.1057L26.9152 21.4532C26.7665 21.0672 26.3956 20.8125 25.982 20.8125L5.78467 20.8125ZM5.71425 22.9329C5.86452 22.55 6.23384 22.2983 6.64511 22.2983H25.4084C25.8222 22.2983 26.1932 22.5531 26.3418 22.9392L27.7577 26.6198C28.0097 27.2748 27.5262 27.9789 26.8244 27.9789H5.20041C4.4957 27.9789 4.01206 27.2695 4.26955 26.6135L5.71425 22.9329Z"
        fill="#2D65F2"
        fillOpacity="0.8"
      />
      <path
        d="M20.8518 11.7084C21.0494 11.5042 21.0494 11.1733 20.8518 10.9691C19.5577 9.63132 17.8349 8.89453 16 8.89453C14.1651 8.89453 12.4423 9.63131 11.1482 10.9691C10.9506 11.1733 10.9506 11.5042 11.1482 11.7084C11.2468 11.8104 11.3764 11.8615 11.5059 11.8615C11.6355 11.8615 11.7647 11.8104 11.8637 11.7084C12.9667 10.5682 14.4357 9.94016 16.0003 9.94016C17.5653 9.94016 19.034 10.5683 20.1369 11.7084C20.3342 11.9127 20.6542 11.9127 20.8518 11.7084Z"
        fill="#2D65F2"
        fillOpacity="0.8"
      />
      <path
        d="M18.7284 13.6791C18.8579 13.6791 18.9872 13.6279 19.0861 13.526C19.2837 13.3217 19.2837 12.9905 19.0861 12.7866C18.2636 11.9366 17.1693 11.4688 16.0039 11.4688C14.8381 11.4688 13.7435 11.9367 12.9216 12.7866C12.724 12.9909 12.724 13.322 12.9216 13.526C13.1192 13.7302 13.4392 13.7302 13.6368 13.526C14.2676 12.8736 15.1084 12.5146 16.0038 12.5146C16.899 12.5146 17.7394 12.8739 18.3708 13.526C18.4694 13.6279 18.599 13.6791 18.7282 13.6791H18.7284Z"
        fill="#2D65F2"
        fillOpacity="0.8"
      />
      <path
        d="M14.1406 15.9771C14.1406 17.0351 14.9734 17.8959 15.9968 17.8959C17.0202 17.8959 17.853 17.0351 17.853 15.9771C17.853 14.919 17.0202 14.0586 15.9968 14.0586C14.9734 14.0586 14.1406 14.9191 14.1406 15.9771ZM16.8412 15.9771C16.8412 16.4585 16.4625 16.8504 15.9965 16.8504C15.5308 16.8504 15.152 16.4588 15.152 15.9771C15.152 15.4957 15.5308 15.1041 15.9965 15.1041C16.4625 15.1041 16.8412 15.4957 16.8412 15.9771Z"
        fill="#2D65F2"
        fillOpacity="0.8"
      />
    </svg>
  );
};
