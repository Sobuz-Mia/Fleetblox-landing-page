import CheckboxIcon from "@/components/icons/CheckboxIcon";
import heroCardImg from "../../../assets/heroCardImage.png";
import Image from "next/image";
import VerticalDividerIcon from "@/components/icons/VerticalDividerIcon";
import { useState, useEffect } from "react";
import StarterFleetActionButton from "@/components/ui/StarterFleetActionButton";

const HeroSection = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    // Preload critical mobile hero image
    if (window.innerWidth < 1024) {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = "/images/hero-2-3.webp";
      document.head.appendChild(link);
    }

    // Delay video loading to improve LCP
    const timer = setTimeout(() => {
      setIsVideoLoaded(true);
    }, 2000); // Increased delay for better LCP

    return () => clearTimeout(timer);
  }, []);
  const features = [
    {
      title: "Intelligent Onboarding",
      description:
        "Integrate your fleet in minutes with zero hassle and minimal setup.",
    },
    {
      title: "Instant Control",
      description:
        "Manage every vehicle and operation remotely from one unified platform.",
    },
    {
      title: "Remote Operations",
      description:
        "Run and scale your fleet across locations without being on-site.",
    },
  ];
  const benefits = [
    { text: "Cloud-Native Architecture" },
    { text: "Multi-Powertrain Integration" },
    { text: "Geo-based Fleet Control" },
    { text: "AI-Powered Workflows" },
  ];
  return (
    <section className="bg-[#FAFAFF] flex flex-col justify-center items-center z-50 overflow-hidden">
      {/* Main content section */}
      <div className="mt-[120px] pb-3 flex flex-col items-center justify-center px-5">
        {/* Text content remains the same */}
        <div className="max-w-[840px] w-full mx-auto text-center flex flex-col items-start lg:items-center ">
          <p className="text-[18px]  lg:text-[28px] text-left lg:text-center font-bold text-[#0336BC] mb-[5px]">
            Fleet Moderniser Platform
          </p>
          <h1
            aria-label="Empower Your Fleet Ecosystem Potentials"
            role="heading"
            property="Hero"
            className="text-[36px] lg:text-[52px] text-left lg:text-center font-bold text-[#04082C] leading-[1.1] font-montserrat"
          >
            Empower Your Fleet Ecosystem Potentials
          </h1>
          <p className="text-left lg:text-center font-openSans text-[#333] leading-6 text-[16px] mt-[10px]">
            Fleetblox is a modern, AI-based platform designed to empower the
            next generation of fleet management—built to adapt the demands of
            today’s automotive technology
          </p>
        </div>
        <div className="flex flex-col lg:flex-row lg:justify-center lg:items-center gap-4 mt-5 pb-[30px] font-openSans w-full ">
          {benefits?.map((benefit, index) => (
            <div
              key={index}
              className="flex gap-[5px] text-[16px] font-openSans leading-6 font-semibold text-[#7D7D7D] lg:text-center items-start lg:items-center"
            >
              <CheckboxIcon />
              <p className="text-left">{benefit?.text}</p>
            </div>
          ))}
        </div>
        {/* <Link aria-label="Get started with FleetBlox" href="/getting-started">
          <button className="hidden lg:flex transition-all font-openSans bg-[#2D65F2] hover:bg-[#0336BC] text-white-primary text-white duration-300 hover:w-[144.16px] w-[122.16px]  items-center px-[13px] hover:px-4 py-3 text-base font-bold rounded-md group">
            <div className="z-20 whitespace-nowrap"> Start Today</div>
            <div className="z-10 transform transition-transform opacity-0 group-hover:opacity-100 -translate-x-4 duration-300 group-hover:translate-x-0">
              <RightArrowIcon />
            </div>
          </button>
        </Link> */}
        <StarterFleetActionButton />
        <div className="w-full flex justify-center lg:hidden">
          <StarterFleetActionButton isMobile={true} />
          {/* <Link aria-label="Get started with FleetBlox" href="/getting-started">
            <button className=" py-3 rounded-md w-full text-center bg-[#2D65F2] font-openSans text-[14px] font-bold text-[#fff] flex justify-center lg:hidden">
              Start Today
            </button>
          </Link> */}
        </div>
        {/* Desktop hero with skeleton loader */}
        <div className="hidden lg:block relative max-h-[800px] lg:h-[800px] md:h-[500px] lg:w-[1200px] xl:w-[1400px] z-[0] overflow-hidden">
          <div className="relative h-full w-full flex justify-center items-center">
            <Image
              src={heroCardImg}
              alt="Fleet management dashboard"
              className="w-full h-auto max-w-[1200px] max-h-[100vh] -mt-[70px] z-30 absolute xl:max-w-[1200px] lg:max-w-[1000px]"
              width={1200}
              height={800}
              quality={80}
              sizes="(max-width: 1200px) 90vw, 1200px"
              priority={true}
            />

            {/* Centered blur effect */}
            <div
              className="max-h-[400px] h-full filter blur-[100px] absolute 
                left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 rounded-[520px] 
                max-w-[520px] w-full bg-[#2D65F2]"
            ></div>

            {/* Centered video container - optimized loading */}
            <div className="absolute inset-0 flex justify-center items-center bg-[#FAFAFF] w-full max-w-[1600px] mx-auto left-1/2 -translate-x-1/2 overflow-hidden sm:max-w-[90%] md:max-w-[1100px] lg:max-w-[1200px] xl:max-w-[1600px]">
              {isVideoLoaded && (
                <video
                  autoPlay
                  preload="none"
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover object-center opacity-5 mix-blend-difference absolute inset-0"
                >
                  <source src="/videos/hero.webm" type="video/webm" />
                </video>
              )}
            </div>
          </div>

          {/* Features section remains unchanged */}
          <div className="absolute -bottom-[10px] z-50 left-1/2 max-w-[880px] w-full gap-5 -translate-x-1/2 py-[30px] grid grid-cols-1 lg:grid-cols-3 text-center items-start justify-items-center">
            {features?.map((feature, index, arr) => (
              <div
                key={feature.title}
                className="flex items-center justify-center gap-5"
              >
                <div className="text-center">
                  <h4 className="text-gray-900 font-bold text-[18px] font-openSans">
                    {feature.title}
                  </h4>
                  <p className="text-gray-700 text-[14px] leading-5 font-openSans">
                    {feature.description}
                  </p>
                </div>
                {index !== arr.length - 1 && <VerticalDividerIcon />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile hero optimized for LCP */}
      <div className="lg:hidden mt-8 relative w-full flex flex-col items-center justify-center">
        <div className="relative w-full flex justify-center items-center overflow-hidden h-[350px]">
          {/* Optimized background - removed blur initially to improve paint */}
          <div className="h-[150px] w-[150px] left-1/2 top-1/2 -translate-x-1/2 blur-md -translate-y-1/2 z-20 rounded-full bg-[#2D65F2] opacity-30 absolute"></div>

          {/* Background video - lazy loaded after initial paint */}
          {isVideoLoaded && (
            <div className="absolute h-full w-full inset-0 bg-[#FAFAFF]">
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="none"
                className="absolute top-0 left-0 w-full h-full object-cover opacity-5 mix-blend-difference"
              >
                <source src="/videos/hero.mp4" type="video/mp4" />
              </video>
            </div>
          )}

          {/* Hero image optimized for LCP */}
          <div className="relative z-30 flex justify-center items-center h-full">
            <Image
              // src="/images/hero-2-mobile-ultra-optimized.webp"
              src="/images/hero-2-3.webp"
              priority={true}
              alt="Mobile hero"
              width={280}
              height={350}
              quality={60}
              className="object-contain w-full h-auto max-w-[280px] max-h-[350px]"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              loading="eager"
              fetchPriority="high"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkbHh8f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyLDSzHq9VgbGhUrmr/AI5iDvOHD6KN8SrjPrt4a5AigfcZGBrcsJjBP6fM7+c/G/TlcmLO4XM6N1X/2Q=="
            />
          </div>
        </div>

        {/* Features section with proper spacing */}
        <div className="px-4 pt-10 pb-6 space-y-6">
          {features?.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col pb-4 items-center last:border-0"
            >
              <h3 className="text-[#04082C] font-bold text-[18px] font-openSans">
                {feature.title}
              </h3>
              <p className="text-[#333333] text-center text-[14px] font-openSans leading-5">
                {feature.description}
              </p>

              <div className="mt-5">
                <svg
                  width="27"
                  height="3"
                  viewBox="0 0 27 3"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M25.5 1.03906H1.5"
                    stroke="#2D65F2"
                    strokeOpacity="0.6"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
