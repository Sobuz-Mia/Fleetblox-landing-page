"use client";
import axios from "axios";
import toast from "react-hot-toast";
import { useFormContext } from "react-hook-form";
import z from "zod";
import { formSchema } from "./TripAuditInspection";
import Link from "next/link";
import UnorderListIcon from "../icons/UnorderListIcon";
import { pricingPlans } from "@/Static_data/data";
import { Tooltip } from "antd";
import { useEffect } from "react";

type FormData = z.infer<typeof formSchema>;

const InspectionWorkflow = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<FormData>();
  const inspectionPlan = watch("inspection.plan");
  const durations = watch("inspection.duration");
  // initialize default values if not set
  useEffect(() => {
    if (!inspectionPlan) {
      setValue("inspection.plan", "Single", { shouldValidate: true });
    }
    if (!durations) {
      setValue("inspection.duration", "7", { shouldValidate: true });
    }
  }, [setValue, inspectionPlan, durations]);

  // Get dynamic price
  const currentPrice =
    inspectionPlan && durations
      ? (pricingPlans.prices[
          inspectionPlan as keyof typeof pricingPlans.prices
        ]?.[durations] ?? 0)
      : 0;
  const onSubmit = async (data: FormData) => {
    try {
      const orderResponse = await axios.post(
        "https://dev-real-damage.fleetblox.com/api/create_order",
        {
          car_make: data.vehicle.make,
          car_model: data.vehicle.model,
          car_year: Number(data.vehicle.year),
          fuel_type: data.vehicle.fuelType,
          exterior_color: data.vehicle.color || null,
          car_owner_name: data.owner.fullName,
          car_owner_email: data.owner.email,
          car_owner_phone: data.owner.phone,
          car_owner_address: data.owner.address || null,
          driver_name: data.driver.fullName,
          driver_email: data.driver.email,
          driver_phone: data.driver.phone,
          driving_license: data.driver.license || null,
          driver_address: data.driver.address || null,
          inspection_type:
            data.inspection.plan?.toLowerCase() === "single"
              ? "single"
              : "dual",
          trip_duration: Number(data.inspection.duration),
        },
        { headers: { "Content-Type": "application/json" } },
      );
      const tripId = orderResponse.data.trip_id;
      const createSessionData = {
        // success_url: "https://fleetblox.com/trip-audit/payment-success",
        success_url: "https://fleetblox.com/tripwise/payment-success",
        cancel_url: "https://fleetblox.com/tripwise/payment-failed",
      };
      // Create payment intent
      const paymentResponse = await axios.post(
        `https://dev-real-damage.fleetblox.com/api/create_checkout_session?trip_id=${tripId}`,
        createSessionData,
      );
      if (paymentResponse?.data?.checkout_url) {
        // router.push(paymentResponse.data.checkout_url);
        window.open(paymentResponse.data.checkout_url, "_blank");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to create order or payment intent.");
    }
  };

  return (
    <div className="mt-10">
      <div className="text-center mb-5 md:mb-10">
        <h2 className="text-[18px] md:text-[22px] font-bold text-[#303030]">
          Inspection workflow
        </h2>
        <p className="text-[14px] leading-5 text-[#6F6464]">
          Select an inspection plan suitable for the trip
        </p>
      </div>
      <div className="mb-2.5">
        {pricingPlans.plans.map((plan) => {
          const isSelected = inspectionPlan === plan.value;
          // ─── Decide which price to show in this card ───
          let displayPrice = 0;
          if (isSelected) {
            // Selected → use current duration
            displayPrice =
              pricingPlans.prices[
                plan.value as keyof typeof pricingPlans.prices
              ]?.[durations] ?? 0;
          } else {
            // Not selected → always show the 7-day (default) price
            displayPrice =
              pricingPlans.prices[
                plan.value as keyof typeof pricingPlans.prices
              ]?.["7"] ?? 0;
          }
          return (
            <div
              key={plan.id}
              className={`px-4 py-5 border rounded-[10px] mb-5 ${
                inspectionPlan === plan.value
                  ? "border-[#2D65F2] bg-[#F5F9FC]"
                  : "border-[#DFDFDF] bg-white"
              }`}
            >
              <label className="flex items-center gap-[5px] cursor-pointer">
                <input
                  type="radio"
                  value={plan.value}
                  {...register("inspection.plan")}
                />
                <div className="flex items-center gap-1.5">
                  <p
                    className={`${
                      inspectionPlan === plan.value
                        ? "text-[#151515]"
                        : "text-[#6F6464]"
                    } text-[14px] md:text-[16px] font-openSans font-bold capitalize`}
                  >
                    {plan.name} {plan.subtitle && `(${plan.subtitle})`}
                  </p>
                  {/* <FeaturesAlertToggle /> */}
                  <Tooltip
                    placement="top"
                    title={"Hover on the feature’s names to view the details."}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M12.0096 16.6502C12.202 16.6502 12.3667 16.5817 12.5035 16.4447C12.6404 16.3077 12.7088 16.1422 12.7088 15.9483V11.7185C12.7088 11.5282 12.6402 11.3645 12.5028 11.2273C12.3655 11.09 12.2017 11.0214 12.0114 11.0214C11.8174 11.0214 11.6519 11.09 11.5151 11.2273C11.3782 11.3645 11.3098 11.5282 11.3098 11.7185V15.9483C11.3098 16.1422 11.3784 16.3077 11.5154 16.4447C11.6525 16.5817 11.8172 16.6502 12.0096 16.6502ZM11.9966 9.37043C12.2169 9.37043 12.4003 9.29807 12.5468 9.15335C12.6933 9.00863 12.7665 8.82611 12.7665 8.60578C12.7665 8.38543 12.6942 8.20202 12.5494 8.05555C12.4047 7.90907 12.2222 7.83582 12.0018 7.83582C11.7815 7.83582 11.5981 7.90819 11.4516 8.05293C11.3052 8.19764 11.2319 8.38017 11.2319 8.6005C11.2319 8.82083 11.3043 9.00424 11.449 9.15072C11.5937 9.29719 11.7762 9.37043 11.9966 9.37043ZM12.0015 21.2992C10.7157 21.2992 9.50677 21.0548 8.37487 20.5661C7.24297 20.0774 6.25837 19.4141 5.42107 18.5762C4.58377 17.7384 3.92113 16.7546 3.43315 15.6249C2.94516 14.4951 2.70117 13.288 2.70117 12.0035C2.70117 10.7176 2.94555 9.50873 3.4343 8.37682C3.92303 7.24493 4.58632 6.26033 5.42417 5.42303C6.26201 4.58573 7.2458 3.92308 8.37555 3.4351C9.5053 2.94712 10.7124 2.70312 11.9969 2.70312C13.2828 2.70312 14.4917 2.9475 15.6236 3.43625C16.7555 3.92498 17.7401 4.58827 18.5774 5.42612C19.4147 6.26396 20.0773 7.24775 20.5653 8.3775C21.0533 9.50725 21.2973 10.7144 21.2973 11.9989C21.2973 13.2847 21.0529 14.4936 20.5641 15.6255C20.0754 16.7574 19.4121 17.742 18.5743 18.5793C17.7364 19.4166 16.7526 20.0793 15.6229 20.5673C14.4931 21.0552 13.286 21.2992 12.0015 21.2992Z"
                        fill="#999999"
                      />
                    </svg>
                  </Tooltip>
                </div>
              </label>

              <div className="flex items-center justify-between mt-[30px]">
                {
                  <div className="flex items-start text-[#04082C] my-5">
                    <span className="text-[36px] font-bold">
                      ${Math.floor(displayPrice)}
                    </span>
                    <span className="text-[14px] font-semibold self-end mb-1">
                      .{(displayPrice % 1).toFixed(2).slice(2)}
                    </span>
                  </div>
                }

                {/* Render features if available */}
                {plan.features && plan.features.length > 0 && (
                  <div className="mb-4">
                    {plan.features.map((feature, index) => (
                      <div key={index}>
                        <Tooltip
                          placement="top"
                          title={
                            feature?.des
                              ? feature.des
                              : "No description available"
                          }
                          className="flex items-center gap-2.5 mb-2 "
                        >
                          <UnorderListIcon />
                          <p className="text-[14px] text-[#04082C] leading-5 font-openSans">
                            {feature?.title || ""}
                          </p>
                        </Tooltip>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {errors.inspection?.plan && (
        <p className="text-red-500 text-sm">{errors.inspection.plan.message}</p>
      )}
      <div className="mb-2 mt-10">
        <h3 className="text-[18px] font-semibold text-[#303030] mb-4">
          Trip duration
        </h3>

        <div className="flex gap-[5px] flex-col md:flex-row items-center">
          {["7", "15", "30"].map((days) => (
            <div
              key={days}
              className={`border rounded-md flex p-4 gap-[5px] justify-between w-full md:w-[180px] ${
                durations === days ? "border-[#2D65F2]" : "border-[#DFDFDF]"
              }`}
            >
              <label className="flex items-center gap-[5px]">
                <input
                  type="radio"
                  value={days}
                  {...register("inspection.duration")}
                />{" "}
                <p
                  className={`text-[16px] font-openSans capitalize font-bold ${
                    durations === days ? "text-[#151515]  " : " text-[#6F6464]"
                  }`}
                >
                  {days} Days
                </p>
              </label>
              <p className="text-[#7D7D7D] text-[12px] font-openSans">
                Use within <br /> 07 days
              </p>
            </div>
          ))}
        </div>
      </div>
      {errors.inspection?.duration && (
        <p className="text-red-500 text-sm">
          {errors.inspection.duration.message}
        </p>
      )}

      {inspectionPlan === "trip_audit_pluse" ? (
        <Link href={"/trip-audit/invoice-setup"}>
          <button className="bg-[#2D65F2] text-white p-3 rounded-md mt-10 w-full text-[14px] font-semibold">
            Next
          </button>
        </Link>
      ) : (
        <button
          onClick={handleSubmit(onSubmit)}
          className="bg-[#2D65F2] text-white p-3 rounded-md mt-10 w-full text-[14px] font-semibold"
        >
          Proceed to pay{" "}
          {currentPrice > 0 ? ` – $${currentPrice.toFixed(2)}` : ""}
        </button>
      )}
    </div>
  );
};

export default InspectionWorkflow;
