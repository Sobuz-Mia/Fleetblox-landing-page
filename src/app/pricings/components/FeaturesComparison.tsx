"use client";
import {
  complianceAndNotificationsItems,
  financialManagementItems,
  fleetFeatures,
  intelligenceFeatures,
  teamAndAccessManagementItems,
  vehicleFeatures,
} from "@/lib/constant";
import { useAnimation, motion } from "framer-motion";
import { useEffect } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { useInView } from "react-intersection-observer";
import FeaturesAlertToggle from "./FeaturesAlertToggle";
import { TooltipProvider } from "@/components/ui/tooltip";
const FeaturesComparison = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  // Remove console.log to improve performance
  return (
    <TooltipProvider>
      <div className="mt-[160px] md:mt-[100px] flex w-full items-center justify-center">
        <div className="max-w-[1200px] w-full px-5 relative">
          {/* Sticky Header within the scrollable container */}
          <motion.div
            initial="visible"
            animate={controls}
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 1, y: 0 },
            }}
            className="sticky top-[80px] lg:top-[120px] grid grid-cols-4 md:grid-cols-5 h-[60px] items-center bg-[#FAFAFF] rounded-t-lg md:rounded-lg z-10 md:shadow-sm overflow-hidden"
          >
            <h3 className="hidden md:block text-[14px] font-[600] ml-5 text-[#333]">
              Usage
            </h3>
            <h3 className="text-center mx-auto text-[14px] font-normal md:font-bold text-[#04082C] md:text-black/95 flex items-center gap-1">
              Starter <span className="hidden md:block">fleet</span>
            </h3>
            <h3 className="text-center mx-auto text-[14px] font-normal md:font-bold text-[#04082C] md:text-black/95 flex items-center gap-1">
              Eagle eye <span className="hidden md:block">fleet</span>
            </h3>
            <h3 className="text-center mx-auto text-[14px] font-normal md:font-bold text-[#04082C] md:text-black/95 flex items-center gap-1">
              Dynamic <span className="hidden md:block">fleet</span>
            </h3>
            <h3 className="text-center mx-auto text-[14px] font-normal md:font-bold text-[#04082C] md:text-black/95 flex items-center gap-1">
              Smart <span className="hidden md:block">fleet</span>
            </h3>
            {/* Dynamic fleet column commented out - will be added back in the future */}
          </motion.div>
          <div className="sticky top-[58px] lg:top-[96px] left-0 w-full h-[24px] bg-white z-10 hidden md:block"></div>
          {/* Scrollable content section */}
          <div ref={ref}>
            <div className="md:rounded-lg rounded-b-lg md:px-5 p-[10px] md:pb-5 text-center md:text-left flex gap-[5px] items-center bg-[#F7F7F7] md:bg-white justify-center md:justify-start">
              <h3 className="text-[22px] font-[700] text-[#0336BC] font-openSans">
                Fleet Control
              </h3>
              <FeaturesAlertToggle />
            </div>
            {vehicleFeatures?.map((features, index: number) => (
              <FeaturesPermissionRow
                key={index}
                featuresPermissions={features}
              />
            ))}
            <div className="md:rounded-lg rounded-b-lg md:px-5 p-[10px] md:pb-5 text-center md:text-left flex gap-[5px] items-center bg-[#F7F7F7] md:bg-white justify-center md:justify-start">
              <h3 className="text-[22px] font-[700] text-[#0336BC] font-openSans">
                Remote Operations Workflows
              </h3>
              <FeaturesAlertToggle />
            </div>
            {fleetFeatures?.map((features, index: number) => (
              <FeaturesPermissionRow
                key={index}
                featuresPermissions={features}
              />
            ))}
            <div className="md:rounded-lg rounded-b-lg md:px-5 p-[10px] md:pb-5 text-center md:text-left flex gap-[5px] items-center bg-[#F7F7F7] md:bg-white justify-center md:justify-start">
              <h3 className="text-[22px] font-[700] text-[#0336BC] font-openSans">
                Intelligence
              </h3>
              <FeaturesAlertToggle />
            </div>
            {intelligenceFeatures?.map((features, index: number) => (
              <FeaturesPermissionRow
                key={index}
                featuresPermissions={features}
              />
            ))}

            <div className="md:rounded-lg rounded-b-lg md:px-5 p-[10px] md:pb-5 text-center md:text-left flex gap-[5px] items-center bg-[#F7F7F7] md:bg-white justify-center md:justify-start">
              <h3 className="text-[22px] font-[700] text-[#0336BC] font-openSans">
                Compliance & Notifications
              </h3>
              <FeaturesAlertToggle />
            </div>
            {complianceAndNotificationsItems?.map((features, index: number) => (
              <FeaturesPermissionRow
                key={index}
                featuresPermissions={features}
              />
            ))}

            <div className="md:rounded-lg rounded-b-lg md:px-5 p-[10px] md:pb-5 text-center md:text-left flex gap-[5px] items-center bg-[#F7F7F7] md:bg-white justify-center md:justify-start">
              <h3 className="text-[22px] font-[700] text-[#0336BC] font-openSans">
                Financial Management
              </h3>
              <FeaturesAlertToggle />
            </div>
            {financialManagementItems?.map((features, index: number) => (
              <FeaturesPermissionRow
                key={index}
                featuresPermissions={features}
              />
            ))}

            <div className="md:rounded-lg rounded-b-lg md:px-5 p-[10px] md:pb-5 text-center md:text-left flex gap-[5px] items-center bg-[#F7F7F7] md:bg-white justify-center md:justify-start">
              <h3 className="text-[22px] font-[700] text-[#0336BC] font-openSans">
                Team & Access Management
              </h3>
              <FeaturesAlertToggle />
            </div>
            {teamAndAccessManagementItems?.map((features, index: number) => (
              <FeaturesPermissionRow
                key={index}
                featuresPermissions={features}
              />
            ))}
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default FeaturesComparison;

interface PermissionItem {
  permission: boolean;
  message?: string | null;
  plan?: string | null;
  desc?: string;
}

interface FeaturesPermissionRowProps {
  title: string;
  permissions: PermissionItem[];
  border?: boolean;
  desc?: string;
}

interface FeaturesPermissionRowComponentProps {
  featuresPermissions: FeaturesPermissionRowProps;
}

const FeaturesPermissionRow: React.FC<FeaturesPermissionRowComponentProps> = ({
  featuresPermissions,
}) => {
  return (
    <div>
      <div
        className={`w-full ${
          featuresPermissions?.border ? "" : "border-b"
        } flex flex-col md:grid md:grid-cols-5 border-[#e4e2e2] px-5 py-5`}
      >
        {/* features title */}
        {/* <div>
          <h3 className="text-[14px] text-center md:text-left font-openSans font-[600] text-[#202020]">
            {featuresPermissions?.title}
          </h3>
        </div> */}

        <div id="tooltip" className="relative cursor-pointer group ">
          <div className="text-[14px] text-center md:text-left font-openSans font-[600] p-4 text-[#202020] ">
            {" "}
            {featuresPermissions?.title}
          </div>
          <span className="absolute w-[400px] hidden shadow-md group-hover:inline-block bg-[#6F6464] rounded-[8px]  p-4 whitespace-normal left-[90%] -translate-x-1/2 bottom-[calc(100%+8px)] text-[#fff] text-[14px] font-openSans">
            {featuresPermissions?.desc}
          </span>

          <span
            className="absolute hidden group-hover:inline-block left-8 -translate-x-1/2 bottom-full"
            style={{
              width: 0,
              height: 0,
              borderLeft: "10px solid transparent",
              borderRight: "10px solid transparent",
              borderTop: "8px solid #6F6464",
            }}
          ></span>
        </div>
        {/* For desktop/tablet view */}
        {featuresPermissions.permissions?.map((permission, index) => (
          <div
            key={index}
            className="hidden md:flex items-center justify-center"
          >
            {permission?.permission ? (
              <div className="flex items-center gap-[10px]">
                <FaCircleCheck className="text-[#2D65F2]" size={16} />
                {permission?.message && (
                  <p className="text-[#7D7D7D] text-[14px] font-openSans font-semibold leading-5">
                    {permission?.message}
                  </p>
                )}
              </div>
            ) : (
              <div className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#F6F6F6] p-[3px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <path
                    d="M6.99919 7.55973L4.16397 10.395C4.08609 10.4728 3.99342 10.5115 3.88596 10.511C3.77852 10.5104 3.68495 10.4703 3.60526 10.3906C3.52846 10.3109 3.49078 10.219 3.49223 10.1148C3.49367 10.0106 3.53279 9.92008 3.60959 9.84328L6.44049 7.00103L3.60959 4.15877C3.53639 4.08558 3.49889 3.99598 3.49709 3.88996C3.49529 3.78396 3.53279 3.69112 3.60959 3.61143C3.68639 3.53174 3.77762 3.49073 3.88326 3.48838C3.98891 3.48604 4.08248 3.52471 4.16397 3.6044L6.99919 6.44232L9.83711 3.6044C9.91319 3.52832 10.005 3.49055 10.1124 3.49108C10.2199 3.49163 10.3143 3.53174 10.3958 3.61143C10.4708 3.69112 10.5076 3.78306 10.5062 3.88727C10.5047 3.99147 10.4656 4.08197 10.3888 4.15877L7.55789 7.00103L10.3888 9.84328C10.462 9.91647 10.4995 10.0061 10.5013 10.1121C10.5031 10.2181 10.4656 10.3109 10.3888 10.3906C10.312 10.4703 10.2208 10.5113 10.1151 10.5137C10.0095 10.516 9.9168 10.4764 9.83711 10.395L6.99919 7.55973Z"
                    fill="#151515"
                  />
                </svg>
              </div>
            )}
          </div>
        ))}

        {/* For mobile view - show only first item and center it */}
        <div className="md:hidden grid grid-cols-4 justify-items-center gap-[20px] mt-1">
          {featuresPermissions.permissions?.map((permission, index) => (
            <div key={index} className=" ">
              {permission?.permission ? (
                <div className="flex flex-col items-center gap-[10px]">
                  <FaCircleCheck className="text-[#2D65F2]" size={16} />
                  {permission?.message && (
                    <p className="text-[#7D7D7D] text-[12px] font-openSans font-normal leading-5">
                      {permission?.message}
                    </p>
                  )}
                </div>
              ) : (
                <div className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#F6F6F6] p-[3px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                  >
                    <path
                      d="M6.99919 7.55973L4.16397 10.395C4.08609 10.4728 3.99342 10.5115 3.88596 10.511C3.77852 10.5104 3.68495 10.4703 3.60526 10.3906C3.52846 10.3109 3.49078 10.219 3.49223 10.1148C3.49367 10.0106 3.53279 9.92008 3.60959 9.84328L6.44049 7.00103L3.60959 4.15877C3.53639 4.08558 3.49889 3.99598 3.49709 3.88996C3.49529 3.78396 3.53279 3.69112 3.60959 3.61143C3.68639 3.53174 3.77762 3.49073 3.88326 3.48838C3.98891 3.48604 4.08248 3.52471 4.16397 3.6044L6.99919 6.44232L9.83711 3.6044C9.91319 3.52832 10.005 3.49055 10.1124 3.49108C10.2199 3.49163 10.3143 3.53174 10.3958 3.61143C10.4708 3.69112 10.5076 3.78306 10.5062 3.88727C10.5047 3.99147 10.4656 4.08197 10.3888 4.15877L7.55789 7.00103L10.3888 9.84328C10.462 9.91647 10.4995 10.0061 10.5013 10.1121C10.5031 10.2181 10.4656 10.3109 10.3888 10.3906C10.312 10.4703 10.2208 10.5113 10.1151 10.5137C10.0095 10.516 9.9168 10.4764 9.83711 10.395L6.99919 7.55973Z"
                      fill="#151515"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
