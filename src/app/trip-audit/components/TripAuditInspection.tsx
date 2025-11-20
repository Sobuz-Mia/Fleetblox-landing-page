"use client";
import { useState } from "react";
import { useForm, FormProvider, Path } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import VehicleDetails from "./VehicleDetails";
import OwnerDriverInfo from "./OwnerDriverInfo";
import InspectionWorkflow from "./InspectionWorkflow";
import { Divider } from "antd";

// Define the form schema with Zod
export const formSchema = z.object({
  vehicle: z.object({
    make: z.string().min(1, "Car make is required"),
    model: z.string().min(1, "Car model is required"),
    year: z.string().min(4, "Year is required"),
    fuelType: z.enum(["Gasoline", "Electric", "Hybrid"], {
      error: "Fuel type is required",
    }),
    color: z.string().optional(),
    vin: z.string().optional(),
  }),
  owner: z.object({
    fullName: z.string().min(1, "Owner name is required"),
    email: z.string().email("Invalid email").optional(),
    phone: z.string().min(10, "Invalid phone").optional(),
    address: z.string().optional(),
  }),
  driver: z
    .object({
      sameAsOwner: z.boolean().optional(),
      fullName: z.string().optional(),
      email: z.string().email("Invalid email").optional(),
      phone: z.string().min(10, "Invalid phone").optional(),
      license: z.string().optional(),
      address: z.string().optional(),
    })
    .refine((data) => data.sameAsOwner || data.fullName, {
      message: "Driver name is required if not same as owner",
      path: ["driver.fullName"],
    }),
  inspection: z.object({
    plan: z.enum(["Single", "Dual"] as const, {
      error: "Inspection plan is required",
    }),
    duration: z.enum(["7", "15", "30"] as const, {
      error: "Duration is required",
    }),
  }),
});
type FormData = z.infer<typeof formSchema>;

// Parent Component
export default function InspectionPage({ step = 1 }: { step?: number }) {
  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      vehicle: {
        make: "",
        model: "",
        year: "",
        fuelType: "Gasoline",
        color: "",
        vin: "",
      },
      owner: { fullName: "", email: "", phone: "", address: "" },
      driver: {
        sameAsOwner: false,
        fullName: "",
        email: "",
        phone: "",
        license: "",
        address: "",
      },
      inspection: { plan: "Single", duration: "7" },
    },
  });
  const { trigger } = methods;
  const [currentStep, setCurrentStep] = useState(step);

  const handleNext = async () => {
    const fieldsToValidate: Path<FormData>[] =
      currentStep === 1
        ? ["vehicle"]
        : currentStep === 2
        ? ["owner", "driver"]
        : ["inspection"];
    const isValid = await trigger(fieldsToValidate);
    if (isValid) setCurrentStep((prev) => prev + 1);
  };
  const handleStepClick = async (step: number) => {
    if (step < currentStep) {
      setCurrentStep(step);
      return;
    }
    // For forward, validate previous
    for (let i = currentStep; i < step; i++) {
      let fieldsToValidate: Path<FormData>[] = [];
      if (i === 1) {
        fieldsToValidate = ["vehicle"];
      } else if (i === 2) {
        fieldsToValidate = ["owner", "driver"];
      } else if (i === 3) {
        fieldsToValidate = ["inspection"];
      }
      const isValid = await trigger(fieldsToValidate);
      if (!isValid) return; // Stop if invalid
    }
    setCurrentStep(step);
  };
  const steps = [
    {
      title: "Provide car details",
      component: <VehicleDetails onNext={handleNext} />,
      desc: "Choose make and provide other car info.",
    },
    {
      title: "Submit owner & driver info",
      component: <OwnerDriverInfo onNext={handleNext} />,
      desc: "Provide car owner info and current driver info of this car.",
    },
    {
      title: "Purchase an inspection",
      component: <InspectionWorkflow />,
      desc: "Select an inspection plan suitable for this vehicle and get the trip id.",
    },
  ];
  return (
    <FormProvider {...methods}>
      <div className="bg-white">
        <div className="flex max-w-[1200px] flex-col md:flex-row items-center mx-auto w-full py-[60px] md:py-[120px] px-5 ">
          {/* Left Sidebar (Steps) */}
          <div className="md:w-1/2 w-full">
            <p className="text-[#0336BC] text-[18px] font-openSans font-bold mb-[5px] md:mb-[10px]">
              Protect Your assets
            </p>
            <h1 className="text-[36px] font-bold text-[#04082C] font-montserrat leading-[1.1] mb-[10px] md:mb-5">
              Audit Every Trip <br className="hidden md:block" /> &{" "}
              <span className="text-[#0336BC]">Prevent Costly disputes</span>
            </h1>
            <p className=" text-[#7D7D7D] text-[16px] font-openSans leading-6">
              Simply purchase a one-time or two-time inspection workflow to
              create detailed vehicle condition reports of your vehicles before
              and after each trip.
            </p>
            <div className="mt-8  flex items-center gap-5">
              <div>
                <Image
                  src="/images/trip-audit/3-line.svg"
                  alt="Logo"
                  width={65}
                  height={100}
                />
              </div>
              <div className="space-y-[30px] md:space-y-[67px] max-w-[415px]">
                {steps.map((step, index) => (
                  <div
                    key={index}
                    onClick={() => handleStepClick(index + 1)}
                    className={`flex items-center rounded-[16px] px-5 py-4 gap-[10px] md:gap-5 cursor-pointer shadow-[0_4px_5px_0_rgba(0,0,0,0.05)] ${
                      currentStep === index + 1 ? "border border-[#2D65F2]" : ""
                    }`}
                  >
                    <div
                      className={` rounded-full  bg-white border border-[#2D65F2] text-center`}
                    >
                      <span className="text-[12px] font-bold text-[#2D65F2] leading-none w-7 h-7 flex items-center justify-center">
                        {index + 1}
                      </span>
                    </div>
                    <div>
                      <p className="text-[#333] text-[14px] md:text-[18px] font-bold">
                        {step.title}
                      </p>
                      <p className="text-[12px] md:text-[16px] text-[#7D7D7D] font-openSans leading-6">
                        {step?.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="border-r h-[600px] mx-[60px] border-[#DFDFDF] hidden md:block"></div>
          <Divider className="my-10 block md:hidden" />
          {/* Right Content (Dynamic) */}
          <div className="md:w-1/2 w-full">
            {steps[currentStep - 1].component}
          </div>
        </div>
      </div>
    </FormProvider>
  );
}
