import Image from "next/image";
import FooterLogo from "../../../../public/images/footerLogo.png";
import FacebookIcon from "@/components/icons/FacebookIcon";
// import InstagramIcon from "@/components/icons/InstagramIcon";
// import XIcon from "@/components/icons/XIcon";
import RightArrowIcon from "@/components/icons/RightArrowIcon";
import LinkdinIcon from "@/components/icons/LinkdinIcon";
import Link from "next/link";
import AppleStore from "@/components/icons/AppleStore";
import GoogleStore from "@/components/icons/GoogleStore";
import GoogleStoreMobile from "@/components/icons/GoogleStoreMobile";
import { RequestDemoModal } from "../RequestDemoModal";
const Footer = () => {
  return (
    <div className="bg-[#0A2540]">
      <div className="md:block h-auto w-full text-[#fff] max-w-[1450px] mx-auto px-4">
        <div className="">
          {/* animation */}
          <div className="relative flex flex-col items-center justify-center py-[120px]">
            <div className="max-w-[860px] w-full text-center z-[200] flex flex-col mt-[20px] lg:mt-[30px]">
              <h1 className="z-50 font-montserrat text-[28px] lg:text-[52px] font-bold mb-[32px] lg:mb-0 leading-[1.1]">
                Fleet Management Has Never Been This Easy
              </h1>
              <div className="md:flex hidden justify-center z-[100] lg:mt-8">
                <Link
                  aria-label="Get started with FleetBlox"
                  href="/getting-started"
                >
                  <button className="transition-all bg-[#2D65F2] text-white-primary text-white duration-300 hover:w-[165.39px] w-[143.39px] flex items-center px-4 py-3 text-base font-bold rounded-md group">
                    <div className="z-20 whitespace-nowrap font-openSans">
                      Switch Today
                    </div>
                    {/* 143.39 */}
                    {/* hover:w-[165.39px]  */}
                    <div className="z-10 transform transition-transform opacity-0 group-hover:opacity-100 -translate-x-4 duration-300 group-hover:translate-x-0">
                      <RightArrowIcon />
                    </div>
                  </button>
                </Link>
              </div>
              <Link
                aria-label="Get started with FleetBlox"
                href="/getting-started"
              >
                <button className="md:hidden bg-[#2D65F2] hover:bg-[#0336BC] text-white w-full flex px-4 py-3 text-[14px] font-openSans font-bold rounded-md justify-center">
                  Switch Today
                </button>
              </Link>
            </div>
            <div className="max-h-[520px] h-[400px] lg:h-[520px] md:h-[400px] filter blur-[210px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50  rounded-[520px] w-[400px] lg:w-[520px] bg-[#B8CBFC] absolute opacity-50 "></div>
            <div className="absolute z-[100] mix-blend-multiply -top-14 h-[500px] lg:h-[660px]">
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="z-30 h-full object-cover object-center opacity-55 mix-blend-multiply"
              >
                <source src="/videos/Footer.webm" type="video/webm" />
              </video>
            </div>
          </div>
          <div className="flex items-center lg:items-start space-y-[30px] lg:space-y-0 gap-10 flex-col lg:flex-row justify-between mb-10 mt-[20px] lg:mt-[125px]">
            {/* logo section */}
            <div className="max-w-[390px] w-full flex flex-col lg:h-[400px] justify-between">
              <div className="cursor-pointer text-left space-y-[10px] ">
                <div className="flex justify-center lg:justify-start">
                  <Link href="/">
                    <Image src={FooterLogo} alt="footer_logo" />
                  </Link>
                </div>
                <p className="mt-5 leading-6 text-[16px] font-openSans lg:block hidden">
                  Empowering Your Fleet With Artificial Intelligence. Cut Costs.
                  Minimize Downtime. Maximize Performance.
                </p>
              </div>
              <div className="hidden lg:block">
                <h2 className="mb-[10px] text-[14px] leading-5 text-[#DFDFDF] font-openSans">
                  Download Fleetblox Apps
                </h2>
                <div className="flex gap-[10px]">
                  <AppleStore />
                  <GoogleStore />
                </div>
              </div>
            </div>
            {/* pages section */}
            <div className="lg:flex grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 text-[16px] font-openSans font-normal text-white leading-6 gap-10 lg:gap-[60px]">
              {/* product section */}
              <div className="text-[14px] leading-5">
                <h5 className=" font-openSans text-[#DFDFDF] text-[12px] leading-normal mb-[10px] ">
                  Products
                </h5>
                <Link className="cursor-pointer" href="/features/dashboard">
                  <h5 className="font-openSans py-[2px] mb-[5px] cursor-pointer">
                    Dashboard
                  </h5>
                </Link>
                <Link href="/features/getting-started">
                  <h5 className="font-openSans py-[2px] mb-[5px]">
                    Getting Started
                  </h5>
                </Link>
                <Link href="/features/fleet-integration">
                  <h5 className="font-openSans py-[2px] mb-[5px]">
                    Fleet Integration
                  </h5>
                </Link>
                <Link href="/features/fleet-expansion">
                  <h5 className="font-openSans py-[2px] mb-[5px]">
                    Fleet Expansion
                  </h5>
                </Link>
                <Link href="/features/digital-inspections">
                  <h5 className="font-openSans py-[2px] mb-[5px]">
                    Digital Inspections
                  </h5>
                </Link>
                <Link href="/features/maintenance-diagnostics">
                  <h5 className="font-openSans py-[2px] mb-[5px]">
                    Maintenance & Diagnostics
                  </h5>
                </Link>
                <Link href="/features/expenses-management">
                  <h5 className="font-openSans py-[2px] mb-[5px]">
                    Expenses Management
                  </h5>
                </Link>
                <Link href="/features/documents-management">
                  <h5 className="font-openSans py-[2px] mb-[5px]">
                    Documents Management
                  </h5>
                </Link>
                <Link href="/features/intelligent-alerts">
                  <h5 className="font-openSans py-[2px] mb-[5px]">
                    Intelligent Alerts
                  </h5>
                </Link>
                <Link href="/features/team-management">
                  <h5 className="font-openSans py-[2px] mb-[5px]">
                    Team Management
                  </h5>
                </Link>
                <Link href="/features/ai-assistant">
                  <h5 className="font-openSans py-[2px] mb-[5px]">
                    AI Assistant
                  </h5>
                </Link>

                {/* <div className="mt-[10px] text-white text-[14px] font-openSans leading-5 font-semibold">
                  <button className="pt-2">View All Features</button>
                </div> */}
              </div>
              {/* solutions */}
              <div className=" text-[14px] leading-5 ">
                <h5 className=" font-openSans text-[#DFDFDF] text-[12px] leading-normal mb-[10px] ">
                  Solutions
                </h5>
                <Link href="/solutions/cloud-telematic">
                  <h5 className=" font-openSans py-[2px] mb-[5px]">
                    Cloud Telematics
                  </h5>
                </Link>
                <Link href="/solutions/remote-access">
                  <h5 className=" font-openSans py-[2px] mb-[5px]">
                    Remote Access
                  </h5>
                </Link>
                <Link href="/solutions/remote-scalability">
                  <h5 className=" font-openSans py-[2px] mb-[5px]">
                    Remote Scalability
                  </h5>
                </Link>
                <Link href="/solutions/cost-optimization">
                  <h5 className=" font-openSans py-[2px] mb-[5px]">
                    Cost Optimization
                  </h5>
                </Link>
                <Link href="/solutions/compliance-and-safety">
                  <h5 className="font-openSans py-[2px] mb-[5px]">
                    Compliance and Safety
                  </h5>
                </Link>

                <Link href="/solutions/ev-fleet-integration">
                  <h5 className=" font-openSans py-[2px] mb-[5px]">
                    EV Fleet Integration
                  </h5>
                </Link>
                <Link href="/solutions/remote-inspection">
                  <h5 className="font-openSans py-[2px] mb-[5px]">
                    Remote Inspection
                  </h5>
                </Link>
                <Link href="/solutions/maintenance-diagnostics">
                  <h5 className="font-openSans py-[2px] mb-[5px]">
                    Maintenance and Diagnostics
                  </h5>
                </Link>
                <Link href="/solutions/workforce-connectivity">
                  <h5 className="font-openSans py-[2px] mb-[5px]">
                    Workforce Connectivity
                  </h5>
                </Link>
                <Link href="/solutions/ai-fleet-assistant">
                  <h5 className="font-openSans py-[2px] mb-[5px]">
                    AI Fleet Assistant
                  </h5>
                </Link>
              </div>
              {/* Industries section */}
              <div className="text-[14px] leading-5 ">
                <h5 className=" font-openSans text-[#DFDFDF] text-[12px] leading-normal mb-[10px] ">
                  Industries
                </h5>
                <Link href="/industries/fleet-management">
                  <h5 className=" font-openSans py-[2px] mb-[5px]">
                    Fleet Management
                  </h5>
                </Link>
                <Link href="/industries/auto-dealerships">
                  <h5 className=" font-openSans py-[2px] mb-[5px]">
                    Auto Dealerships
                  </h5>
                </Link>
                <Link href="/industries/car-rental-providers">
                  <h5 className=" font-openSans py-[2px] mb-[5px]">
                    Car Rental Providers
                  </h5>
                </Link>
                <Link href="/industries/e-mobility-services">
                  <h5 className=" font-openSans py-[2px] mb-[5px]">
                    E-Mobility Services
                  </h5>
                </Link>
              </div>
              {/* mobile view company and resources */}
              <div className="flex md:hidden  flex-col gap-[35px] ">
                {/* Resourse pages */}
                <div className="text-[14px] leading-5 ">
                  <h5 className=" font-openSans text-[#DFDFDF] text-[12px] leading-normal mb-[10px] ">
                    Resources
                  </h5>
                  <Link href="/under-development">
                    <h5 className=" font-openSans py-[2px] mb-[5px]">Blogs</h5>
                  </Link>
                  <Link href="/under-development">
                    <h5 className=" font-openSans py-[2px] mb-[5px]">
                      Next Updates
                    </h5>
                  </Link>
                </div>
                {/* company section */}
                <div className="text-[14px] leading-5 ">
                  <h5 className=" font-openSans text-[#DFDFDF] text-[12px] leading-normal mb-[10px] ">
                    Company
                  </h5>
                  <Link href="/pricings">
                    <h5 className=" font-openSans py-[2px] mb-[5px]">
                      Pricings
                    </h5>
                  </Link>
                  <Link href="/under-development">
                    <h5 className=" font-openSans py-[2px] mb-[5px] block lg:hidden">
                      Request Demo
                    </h5>
                  </Link>
                  <div className="cursor-pointer hidden lg:block">
                    <RequestDemoModal
                      button={
                        <h5 className=" font-openSans py-[2px] mb-[5px]">
                          Request Demo
                        </h5>
                      }
                    />
                  </div>
                  <Link href="/contact">
                    <h5 className=" font-openSans py-[2px] mb-[5px]">
                      Contact
                    </h5>
                  </Link>
                  <Link href="/under-development">
                    <h5 className=" font-openSans py-[2px] mb-[5px]">About</h5>
                  </Link>
                </div>
              </div>

              {/* Desktop view company and resources */}
              {/* company section */}
              <div className="text-[14px] hidden md:block leading-5 ">
                <h5 className=" font-openSans text-[#DFDFDF] text-[12px] leading-normal mb-[10px] ">
                  Company
                </h5>
                <Link href="/pricings">
                  <h5 className=" font-openSans py-[2px] mb-[5px]">Pricings</h5>
                </Link>
                <Link href="/under-development">
                  <h5 className=" font-openSans py-[2px] mb-[5px] block lg:hidden">
                    Request Demo
                  </h5>
                </Link>
                <div className="cursor-pointer hidden lg:block">
                  <RequestDemoModal
                    button={
                      <h5 className=" font-openSans py-[2px] mb-[5px]">
                        Request Demo
                      </h5>
                    }
                  />
                </div>
                <Link href="/contact">
                  <h5 className=" font-openSans py-[2px] mb-[5px]">Contact</h5>
                </Link>
                <Link href="/under-development">
                  <h5 className=" font-openSans py-[2px] mb-[5px]">About</h5>
                </Link>
              </div>
              {/* resources pages */}
              <div className="text-[14px] hidden md:block leading-5 ">
                <h5 className=" font-openSans text-[#DFDFDF] text-[12px] leading-normal mb-[10px] ">
                  Resources
                </h5>
                <Link href="/under-development">
                  <h5 className=" font-openSans py-[2px] mb-[5px]">Blogs</h5>
                </Link>
                <Link href="/under-development">
                  <h5 className=" font-openSans py-[2px] mb-[5px]">
                    Next Updates
                  </h5>
                </Link>
              </div>
            </div>
          </div>
          <div className="lg:hidden block text-center">
            <h2 className="mb-[10px] text-[14px] leading-5 text-[#DFDFDF] font-openSans">
              Download Fleetblox Apps
            </h2>
            <div className="flex gap-[10px] justify-center">
              <AppleStore />
              <GoogleStoreMobile />
            </div>
          </div>
          <div className="flex items-center flex-col lg:flex-row justify-between pb-[40px] mt-10">
            <div className="flex md:space-x-[20px] space-y-[10px] md:space-y-0 items-center justify-center flex-col md:flex-row">
              <div className="flex cursor-pointer items-center gap-[10px]">
                <FacebookIcon />
                <LinkdinIcon />
                {/* <InstagramIcon />
            <XIcon /> */}
              </div>
              <div className="flex items-center space-x-[20px] -ml-[40px] md:ml-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="2"
                  height="18"
                  viewBox="0 0 2 18"
                  fill="none"
                  className="hidden md:block"
                >
                  <path
                    d="M1 0.683594V16.6836"
                    stroke="#7D7D7D"
                    strokeLinecap="round"
                  />
                </svg>
                <Link href="/under-development">
                  <p className="text-[14px] font-openSans leading-5 font-normal text-white">
                    Terms of Service
                  </p>
                </Link>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="2"
                  height="18"
                  viewBox="0 0 2 18"
                  fill="none"
                >
                  <path
                    d="M1 0.683594V16.6836"
                    stroke="#7D7D7D"
                    strokeLinecap="round"
                  />
                </svg>
                <Link href="/under-development">
                  <p className="text-[14px] font-openSans leading-5 font-normal text-white">
                    Privacy Policy
                  </p>
                </Link>
              </div>
            </div>
            <h5 className="font-openSans text-[16px] leading-6 mt-[10px] mt:mt-0">
              &copy; {new Date().getFullYear()} Fleetblox. All Rights Reserved
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
