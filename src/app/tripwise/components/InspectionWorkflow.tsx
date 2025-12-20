"use client";
import axios from "axios";
import toast from "react-hot-toast";
import { useFormContext } from "react-hook-form";
import z from "zod";
import { formSchema } from "./TripAuditInspection";
import Link from "next/link";
import UnorderListIcon from "../icons/UnorderListIcon";
import { pricingPlans } from "@/Static_data/data";

type FormData = z.infer<typeof formSchema>;
const InspectionWorkflow = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useFormContext<FormData>();
  const inspectionPlan = watch("inspection.plan");
  const durations = watch("inspection.duration");
  const onSubmit = async (data: FormData) => {
    try {
      const orderResponse = await axios.post(
        "https://real-damage.fleetblox.com/api/create_order",
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
        { headers: { "Content-Type": "application/json" } }
      );
      const tripId = orderResponse.data.trip_id;
      const createSessionData = {
        // success_url: "https://fleetblox.com/trip-audit/payment-success",
        success_url: "http://localhost:3000/trip-audit/payment-success",
        cancel_url: "http://localhost:3000/trip-audit/payment-failed",
      };
      // Create payment intent
      const paymentResponse = await axios.post(
        `https://real-damage.fleetblox.com/api/create_checkout_session?trip_id=${tripId}`,
        createSessionData
      );
      if (paymentResponse?.data?.checkout_url) {
        console.log(paymentResponse);
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
        {pricingPlans.plans.map((plan) => (
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
              <p
                className={`${
                  inspectionPlan === plan.value
                    ? "text-[#151515]"
                    : "text-[#6F6464]"
                } text-[14px] md:text-[16px] font-openSans font-bold capitalize`}
              >
                {plan.name} {plan.subtitle && `(${plan.subtitle})`}
              </p>
            </label>

            <div className="flex items-center justify-between mt-[30px]">
              <div className="flex items-start text-[#04082C] my-5">
                <span className="text-[36px] font-bold">
                  ${Math.floor(plan.price)}
                </span>
                <span className="text-[14px] font-semibold self-end mb-1">
                  .{(plan.price % 1).toFixed(2).slice(2)}
                </span>
              </div>

              {/* Render features if available */}
              {plan.features && plan.features.length > 0 && (
                <div className="mb-4">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2.5 mb-2">
                      <UnorderListIcon />
                      <p className="text-[14px] text-[#04082C] leading-5 font-openSans">
                        {feature}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
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
          Proceed to pay
        </button>
      )}
    </div>
  );
};

export default InspectionWorkflow;
