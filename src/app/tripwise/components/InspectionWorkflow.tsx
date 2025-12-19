"use client";
import axios from "axios";
import toast from "react-hot-toast";
import { useFormContext } from "react-hook-form";
import z from "zod";
import { formSchema } from "./TripAuditInspection";
import Link from "next/link";

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
        window.location.href = paymentResponse?.data?.checkout_url;
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to create order or payment intent.");
    }
  };

  return (
    <div>
      <div className="text-center mb-5 md:mb-10">
        <h2 className="text-[18px] md:text-[22px] font-bold text-[#303030]">
          Inspection workflow
        </h2>
        <p className="text-[14px] leading-5 text-[#6F6464]">
          Select an inspection plan suitable for the trip
        </p>
      </div>
      <div className="mb-[10px]">
        <div
          className={`px-4 py-5 border rounded-[10px] mb-5 ${
            inspectionPlan === "Single"
              ? "border-[#2D65F2] bg-[#F5F9FC]  "
              : "border-[#DFDFDF] bg-white"
          }`}
        >
          <label className="flex items-center gap-[5px]">
            <input
              type="radio"
              value="Single"
              {...register("inspection.plan")}
            />{" "}
            <p
              className={` ${
                inspectionPlan === "Single"
                  ? "text-[#151515]"
                  : "text-[#6F6464]"
              } text-[14px] md:text-[16px] font-openSans font-bold capitalize`}
            >
              Single Inspection workflow (One-time)
            </p>
          </label>
          <div className="flex items-start text-[#04082C] my-5">
            <span className="text-[32px] font-semibold">$14</span>
            <span className="text-[14px] font-semibold self-end mb-1">.99</span>
          </div>
          <p className="text-[#333] text-[14px] font-openSans leading-5">
            One-time vehicle inspection workflow with report, valid for either
            departure or return within the selected period after purchase.
          </p>
        </div>
        <div
          className={`px-4 py-5 border rounded-[10px] mb-5 ${
            inspectionPlan === "Dual"
              ? "border-[#2D65F2] bg-[#F5F9FC]  "
              : "border-[#DFDFDF] bg-white"
          }`}
        >
          <label className="flex items-center gap-[5px]">
            <input type="radio" value="Dual" {...register("inspection.plan")} />{" "}
            <p
              className={` ${
                inspectionPlan === "Dual" ? "text-[#151515]" : "text-[#6F6464]"
              } text-[14px] md:text-[16px] font-openSans font-bold capitalize`}
            >
              Dual Inspection workflow (departure & return)
            </p>
          </label>
          <div className="flex items-start text-[#04082C] my-5">
            <span className="text-[32px] font-semibold">$24</span>
            <span className="text-[14px] font-semibold self-end mb-1">.99</span>
          </div>
          <p className="text-[#333] text-[14px] font-openSans leading-5">
            Two inspections with reports, One at the time of departure, another
            when returns from the trip.
          </p>
        </div>
        <div
          className={`px-4 py-5 border rounded-[10px] mb-5 ${
            inspectionPlan === "trip_audit_pluse"
              ? "border-[#2D65F2] bg-[#F5F9FC]  "
              : "border-[#DFDFDF] bg-white"
          }`}
        >
          <label className="flex items-center gap-[5px]">
            <input
              type="radio"
              value="trip_audit_pluse"
              {...register("inspection.plan")}
            />{" "}
            <p
              className={` ${
                inspectionPlan === "trip_audit_pluse"
                  ? "text-[#151515]"
                  : "text-[#6F6464]"
              } text-[14px] md:text-[16px] font-openSans font-bold capitalize`}
            >
              Trip audit +
            </p>
          </label>
          <div className="flex items-start text-[#04082C] my-5">
            <span className="text-[32px] font-semibold">$24</span>
            <span className="text-[14px] font-semibold self-end mb-1">.99</span>
          </div>
          <p className="text-[#333] text-[14px] font-openSans leading-5">
            Departure and return inspection workflow with detailed reports,
            pre/post-trip invoices, and quick driver-license verification before
            trip-staring.
          </p>
        </div>
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
