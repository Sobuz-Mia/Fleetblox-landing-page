import { create } from "zustand";

interface InspectionState {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  resetInspection: () => void;
  startedInspection: boolean;
  setStartedInspection: (value: boolean) => void;
}

export const useInspectionStepsStore = create<InspectionState>((set) => ({
  currentStep: 1,
  startedInspection: false,
  setCurrentStep: (step) => set({ currentStep: step }),
  resetInspection: () => set({ currentStep: 1 }),
  setStartedInspection: (value) => set({ startedInspection: value }),
}));
