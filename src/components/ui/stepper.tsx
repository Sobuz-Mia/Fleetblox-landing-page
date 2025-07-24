"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface Step {
  title: string;
  description: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
}

export function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="space-y-10">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const isDisabled = index > currentStep;

          return (
            <div key={index} className="relative mt-16 flex justify-start">
              {index !== steps.length - 1 && (
                <div
                  className={cn(
                    "absolute left-3 top-[45px] h-[calc(100%-5px)] w-[2px] border-l-2 border-dashed",
                    isCompleted ? "border-white" : "border-white opacity-50"
                  )}
                />
              )}
              <div className="flex items-center space-x-4 gap-y-10">
                <div
                  className={cn(
                    "flex h-6 w-6 shrink-0 items-center justify-center text-center rounded-full text-[14px] font-openSans border-2 font-bold leading-5",
                    isCompleted
                      ? "border-blue-600 bg-white text-blue-600 " // Changed to white bg for completed steps
                      : isCurrent
                      ? "border-white bg-blue-600 text-white"
                      : "border-gray-200 bg-transparent text-gray-400 opacity-50"
                  )}
                >
                  {isCompleted ? <Check className="h-3.5 w-3.5" /> : index + 1}
                </div>
                <div
                  className={cn("space-y-3 pt-1", isDisabled && "opacity-50")}
                >
                  <p
                    className={cn(
                      "text-sm font-bold leading-none",
                      isCompleted
                        ? "text-white/60"
                        : isDisabled
                        ? "text-white opacity-50"
                        : "text-white"
                    )}
                  >
                    {step.title}
                  </p>
                  <p
                    className={cn(
                      "text-xs leading-none mt-2",
                      isCompleted
                        ? "text-white/60"
                        : isDisabled
                        ? "text-white opacity-50"
                        : "text-white"
                    )}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
