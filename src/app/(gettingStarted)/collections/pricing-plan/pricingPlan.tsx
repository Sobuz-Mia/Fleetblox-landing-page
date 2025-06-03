/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { FaCircleCheck } from "react-icons/fa6";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Container from "@/components/ui/Container";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import AccurateSlider from "@/app/pricings/components/AccurateSlider";
import { useProgressUpdater } from "@/hooks/useProgress";

type TSelectedPlan = {
  price: number;
  fleet: string;
  slot: number;
  annually: boolean;
};

const PricingPlan = () => {
  const router = useRouter();
  const [slotCount, setSlotCount] = useState(10);
  const [billAnnually, setBillingAnnually] = useState(true);
  const [billMonthly, setBillingMonthly] = useState(false);

  const [currentPlans, setCurrentPlans] = useState<{ data: any[] } | null>(
    null
  );
  const { currentStep, setCurrentStep } = useProgressUpdater();
  const [selectedPlan, setSelectedPlan] = useState<TSelectedPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Add this at the beginning of the component
  useEffect(() => {
    // Check if user already selected Starter Fleet
    if (typeof window !== "undefined") {
      try {
        const selectedPlanData = localStorage.getItem("selectedPlan");
        if (selectedPlanData) {
          const selectedPlan = JSON.parse(selectedPlanData);
          if (selectedPlan.fleet === "Starter Fleet") {
            // If Starter Fleet is selected, redirect to checkout
            setCurrentStep(2); // Skip to checkout step
            router.push("/collections/checkout");
          }
        }
      } catch (error) {
        console.error("Error parsing selectedPlan:", error);
      }
    }
  }, [router, setCurrentStep]);
  // Fetch plans on mount
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch(
          "https://api.fleetblox.com/api/subscription/plans"
        );
        if (!response.ok) throw new Error("Failed to fetch plans");
        const data = await response.json();

        setCurrentPlans(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

  // Improved calculation function with better precision handling
  const calculateDiscount = (
    totalSlot: number,
    isAnnual: boolean,
    planPrice: number
  ): number => {
    // Calculate slot-based discount percentage
    let slotDiscountPercentage = 0;
    if (totalSlot >= 200) {
      slotDiscountPercentage = 30;
    } else if (totalSlot >= 150) {
      slotDiscountPercentage = 18;
    } else if (totalSlot >= 100) {
      slotDiscountPercentage = 10;
    } else if (totalSlot >= 50) {
      slotDiscountPercentage = 5;
    }

    // Calculate annual discount percentage
    const annualDiscountPercentage = isAnnual ? 15 : 0;

    // Calculate effective discount percentage (not just adding percentages)
    const effectiveDiscount =
      1 -
      (1 - slotDiscountPercentage / 100) * (1 - annualDiscountPercentage / 100);

    // Apply total discount
    const discountedPrice = planPrice * (1 - effectiveDiscount);

    // Return with exactly 2 decimal places
    return parseFloat(discountedPrice.toFixed(2));
  };

  const handleBillingMonthly = () => {
    setBillingAnnually(!billAnnually);
    setBillingMonthly(!billMonthly);
  };

  const TotalForModal = (selectedPlan?.price ?? 0) * (selectedPlan?.slot ?? 0);

  return (
    <main className="min-h-screen pb-10 mb-10">
      <section className="container mx-auto  flex flex-col justify-center items-center">
        <Container>
          <h1 className="text-center text-[22px] md:text-[22px] text-[#04082C] font-bold">
            Set Fleet Size & Choose a Plan
          </h1>
          <p className="text-center font-[400] text-[14px] md:text-[16px] text-[#7d7d7d] my-3 font-openSans">
            Slide the bar to see prices for different vehicle slot ranges. Enjoy
            transparent pricing with no hidden fees
          </p>
          {/* ****************Accurate Slider**************** */}
          <AccurateSlider value={slotCount} setValue={setSlotCount} />
        </Container>
      </section>

      <section className="container mx-auto  flex flex-col justify-center items-center">
        {/* ****************Billing Options**************** */}

        <div className=" flex flex-col justify-center gap-5 md:flex-row">
          {currentPlans?.data?.slice(0, 1).map((plan: any, index: number) => (
            <Card
              key={index}
              className="relative min-w-[350px] max-w-[400px] shadow-none rounded-[16px] "
            >
              {/* Ribbon */}
              {plan && plan?.name !== "Eagle eye fleet" && (
                <div className="absolute -top-2  -right-2 bg-[#0A2540] rounded-[4px] z-50 text-[#000] p-2">
                  <p className="text-[12px] font-normal font-openSans text-white">
                    Launching Soon
                  </p>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-sm font-bold font-openSans leading-[20px]">
                  {plan.name}
                </CardTitle>
                <p className="text-sm font-openSans text-[#999]">
                  {plan?.subHeading}
                </p>
              </CardHeader>
              <CardContent>
                {plan?.name === "Smart fleet" ? (
                  <div className="">
                    <h1 className="text-[32px] font-semibold text-[#999]">
                      Custom
                    </h1>
                  </div>
                ) : (
                  <div>
                    <div className="text-[36px] font-montserrat font-bold text-[#04082C]">
                      $
                      {Math.floor(
                        calculateDiscount(slotCount, billAnnually, plan?.price)
                      )}
                      <span className="text-[18px] font-montserrat font-medium text-[#04082C]">
                        .
                        {
                          calculateDiscount(
                            slotCount,
                            billAnnually,
                            plan?.price
                          )
                            .toFixed(2)
                            .split(".")[1]
                        }
                      </span>
                      <span className="ml-[1px] text-[12px] font-medium text-[#999]">
                        /month per slot
                      </span>
                    </div>

                    {/* Dynamic discount message based on slot count */}
                    <div className="flex ">
                      {slotCount >= 50 && (
                        <p className="text-[#04082C] font-openSans text-[14px] leading-[155%]  font-semibold flex items-center">
                          pricings{" "}
                          {slotCount >= 200
                            ? "30%"
                            : slotCount >= 150
                              ? "18%"
                              : slotCount >= 100
                                ? "10%"
                                : "5%"}{" "}
                          discount {billAnnually && "+"}
                        </p>
                      )}

                      {billAnnually && (
                        <p className="text-[#04082C] font-openSans text-[14px] leading-[155%] font-semibold flex items-center">
                          {""} 15% annual discount
                        </p>
                      )}
                    </div>

                    {/* Show original price for comparison */}
                    {/* {(slotCount >= 50 || billAnnually) && (
                      <div className="mt-2">
                        <p className="text-[#999] text-[12px] font-openSans line-through">
                          ${plan?.price.toFixed(2)}/month per slot
                        </p>
                      </div>
                    )} */}
                  </div>
                )}{" "}
                {plan?.name !== "Eagle eye fleet" && (
                  <div className="flex items-center mt-5 justify-between">
                    <h1 className="text-[14px] font-openSans leading-[155%] font-normal text-[#999]">
                      All features in Eagle eye fleet
                    </h1>
                  </div>
                )}
                {/* <p className="text-sm text-[#999]">{plan.discount}</p> */}
                <ul
                  className={`${plan?.name !== "Eagle eye fleet" ? "mt-2 " : "mt-5"
                    } space-y-2`}
                >
                  {plan?.description.map((feature: any, i: number) => (
                    <li key={i} className="flex items-start gap-[10px]">
                      <FaCircleCheck className="text-[#2D65F2]" size={16} />
                      <p className="font-openSans text-[14px] font-[400]">
                        {feature}
                      </p>
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-center">
                  {plan.name === "Eagle eye fleet" && (
                    <Button
                      variant="outline"
                      className="mt-8 w-full bg-[#2D65F2] text-[14px]  font-semibold text-[#FFF] hover:bg-[#2D65f2]/60 hover:text-bg_white"
                      onClick={() => {
                        // Create plan data directly instead of using state
                        const planData = {
                          price: calculateDiscount(
                            slotCount,
                            billAnnually,
                            plan?.price
                          ),
                          fleet: plan?.name,
                          slot: slotCount,
                          annually: billAnnually,
                          id: plan?.id,
                        };

                        // Set it in localStorage directly
                        try {
                          localStorage.setItem(
                            "selectedPlan",
                            JSON.stringify(planData)
                          );

                          setCurrentStep(2);
                          router.push("/collections/checkout");
                        } catch (error) {
                          console.error(
                            "Failed to save plan to localStorage:",
                            error
                          );
                          // Optionally show an error message to the user
                        }
                      }}
                    >
                      Select Plan
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 mb-5  flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-2">
          <Label
            className="font-openSans text-[#333333] font-bold text-[14px]"
            htmlFor="bill-monthly"
          >
            Bill monthly
          </Label>
          <Switch
            id="bill-monthly"
            checked={billMonthly}
            onCheckedChange={handleBillingMonthly}
            className="cursor-pointer bg-[#2D65F2]"
          />
        </div>
        <div className="font-openSans pb-10 my-2 text-[12px] text-[#333]">
          *A one-time platform setup fee of $99 applies.
        </div>
      </section>
    </main>
  );
};

export default PricingPlan;
