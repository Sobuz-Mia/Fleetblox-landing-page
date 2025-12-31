"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Switch } from "antd"; // adjust path if needed
import PreviousButtonIcon from "../icons/PreviousButtonIcon";

// Zod Schema
const invoiceSchema = z.object({
  tripCharge: z.string().min(1, "Trip charge is required"),
  driverCharge: z.string().min(1, "Driver charge is required"),
  securityDeposit: z.string().min(1, "Security deposit is required"),
  standardCleaningCharge: z
    .string()
    .min(1, "Standard cleaning charge is required"),
  excessMileageFee: z.string().optional(),
  excessFuelFee: z.string().optional(),
  lateReturnFee: z.string().optional(),
  tripMileageLimit: z.string().optional(),
});

type InvoiceFormData = z.infer<typeof invoiceSchema>;

const InvoiceSetupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InvoiceFormData>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      tripCharge: "",
      driverCharge: "",
      securityDeposit: "",
      standardCleaningCharge: "",
      excessMileageFee: "",
      excessFuelFee: "",
      lateReturnFee: "",
      tripMileageLimit: "",
    },
  });

  // Watch switch states (we manage them manually since they're not form inputs)
  const [primaryInvoice, setPrimaryInvoice] = React.useState(true);
  const [additionalCharges, setAdditionalCharges] = React.useState(false);
  const [vehicleDamageCharge, setVehicleDamageCharge] = React.useState(true);
  const [verifyLicense, setVerifyLicense] = React.useState(false);

  const onSubmit = (data: InvoiceFormData) => {
    const fullData = {
      ...data,
      switches: {
        primaryInvoice,
        additionalCharges,
        vehicleDamageCharge,
        verifyLicense,
      },
    };
    console.log("Full Invoice Data:", fullData);
    alert("Invoice setup saved successfully!");
    // TODO: Call your API here
  };

  return (
    <div className="bg-[#FAFAFF] pt-[60px] md:pt-[100px] min-h-screen">
      <div className="bg-white py-[30px] shadow-sm">
        <div className="max-w-[1600px] w-full mx-auto px-5">
          <button className="flex items-center gap-2 mb-8">
            <PreviousButtonIcon />
            <span className="text-[14px] font-semibold text-[#999]">
              Previous
            </span>
          </button>

          <div className="max-w-[1200px] mx-auto w-full py-10">
            <div className="text-center mb-10">
              <h1 className="text-[20px] font-bold text-[#303030]">
                Invoice setup
              </h1>
              <p className="text-[#6F6464] text-[14px] leading-6 mt-2 ">
                Create trip billings, pre- and post-trip invoices, and pricing
                details from here. These will be attached to the condition
                report.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-[10px]">
              {/* Currency */}
              {/* <div className="flex justify-end">
                <select className="px-6 py-3 bg-[#F0F0FF] text-[#303030] rounded-lg text-sm font-medium border border-[#F6F6F6]">
                  <option>USD ($)</option>
                  <option>EUR (€)</option>
                  <option>GBP (£)</option>
                </select>
              </div> */}

              {/* Primary Invoice Section */}
              <div className="bg-white border border-[#F6F6F6] rounded-md p-4">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <Switch
                      checked={primaryInvoice}
                      onChange={setPrimaryInvoice}
                      className="bg-gray-300"
                    />
                    <h2 className="text-[18px] font-bold text-[#303030]">
                      Primary invoice
                    </h2>
                  </div>
                </div>

                {primaryInvoice && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Trip Charge */}
                    <div>
                      <label className="text-[#6F6464] font-semibold text-[12px] mb-[5px] block">
                        Trip charge
                      </label>
                      <input
                        {...register("tripCharge")}
                        placeholder="Enter amount"
                        className="p-[10px] w-full bg-[#F6F6F6] rounded-[6px] focus:outline-none placeholder:text-[#999] placeholder:text-[12px]"
                      />
                      {errors.tripCharge && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.tripCharge.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="text-[#6F6464] font-semibold text-[12px] mb-[5px] block">
                        Security deposit
                      </label>
                      <input
                        {...register("securityDeposit")}
                        placeholder="Enter amount"
                        className="p-[10px] w-full bg-[#F6F6F6] rounded-[6px] focus:outline-none placeholder:text-[#999] placeholder:text-[12px]"
                      />
                      {errors.securityDeposit && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.securityDeposit.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="text-[#6F6464] font-semibold text-[12px] mb-[5px] block">
                        Driver charge
                      </label>
                      <input
                        {...register("driverCharge")}
                        placeholder="Enter amount"
                        className="p-[10px] w-full bg-[#F6F6F6] rounded-[6px] focus:outline-none placeholder:text-[#999] placeholder:text-[12px]"
                      />
                      {errors.driverCharge && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.driverCharge.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="text-[#6F6464] font-semibold text-[12px] mb-[5px] block">
                        Standard cleaning charge
                      </label>
                      <input
                        {...register("standardCleaningCharge")}
                        placeholder="Enter amount"
                        className="p-[10px] w-full bg-[#F6F6F6] rounded-[6px] focus:outline-none placeholder:text-[#999] placeholder:text-[12px]"
                      />
                      {errors.standardCleaningCharge && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.standardCleaningCharge.message}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Additional Charges */}
              <div className="bg-white border border-[#F6F6F6] rounded-md p-4">
                <div className="flex items-center gap-4 mb-4">
                  <Switch
                    checked={additionalCharges}
                    onChange={setAdditionalCharges}
                  />
                  <h3 className="text-[16px] font-semibold text-[#303030]">
                    Additional charges (While return)
                  </h3>
                </div>

                {/* {additionalCharges && ( */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="text-[#6F6464] font-semibold text-[12px] mb-[5px] block">
                      Excess mileage fee (per km/mile)
                    </label>
                    <input
                      {...register("excessMileageFee")}
                      placeholder="Enter amount"
                      className="p-[10px] w-full bg-[#F6F6F6] rounded-[6px] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[#6F6464] font-semibold text-[12px] mb-[5px] block">
                      Trip mileage limit
                    </label>
                    <div className="relative">
                      <input
                        {...register("tripMileageLimit")}
                        placeholder="Enter mileage"
                        className="p-[10px] w-full bg-[#F6F6F6] rounded-[6px] focus:outline-none pr-20"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#999] text-[12px]">
                        (km/mile)
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="text-[#6F6464] font-semibold text-[12px] mb-[5px] block">
                      Excess fuel usage fee (per liter/gallon)
                    </label>
                    <input
                      {...register("excessFuelFee")}
                      placeholder="Enter amount"
                      className="p-[10px] w-full bg-[#F6F6F6] rounded-[6px] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[#6F6464] font-semibold text-[12px] mb-[5px] block">
                      Late return fee (per hour)
                    </label>
                    <input
                      {...register("lateReturnFee")}
                      placeholder="Enter amount"
                      className="p-[10px] w-full bg-[#F6F6F6] rounded-[6px] focus:outline-none"
                    />
                  </div>
                </div>
                {/* )} */}
              </div>

              {/* Damage & License */}
              <div className="space-y-[10px]">
                <div className="flex items-center justify-between bg-white border border-[#F6F6F6] rounded-md p-4 gap-4">
                  <Switch
                    checked={vehicleDamageCharge}
                    onChange={setVehicleDamageCharge}
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-[#333] text-[12px]">
                      Vehicle damage charge
                    </h4>
                    <p className="text-[#7D7D7D] text-[12px] leading-4">
                      During the return inspection, the inspector can apply a
                      damage fee if any chargeable damage is identified.
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between bg-white border border-[#F6F6F6] rounded-md p-4 gap-4">
                  <Switch checked={verifyLicense} onChange={setVerifyLicense} />
                  <div className="flex-1">
                    <h4 className="font-semibold text-[#333] text-[12px]">
                      Verify driver’s license
                    </h4>
                    <p className="text-[#7D7D7D] text-[12px] leading-4">
                      The trip driver will have to verify his driver’s license
                      before starting the trip.
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit */}
              <div className="flex justify-center mt-12">
                <button
                  type="submit"
                  className="bg-[#2D65F2] text-white p-3 rounded-md mt-10 w-full text-[14px] font-semibold"
                >
                  Proceed to pay
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceSetupPage;
