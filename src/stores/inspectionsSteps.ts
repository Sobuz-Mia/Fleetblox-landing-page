// stores/inspectionSteps.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type InspectionState = {
  currentStep: number;
  startedInspection: boolean;
  completedVin: boolean;
  completedLicense: boolean;
  completedOdometer: boolean;
  completedExterior: boolean;
  completedDamages: boolean;
  exteriorImagesCount: number;

  // Actions
  setCurrentStep: (step: number) => void;
  setStartedInspection: (value: boolean) => void;
  markVinDone: () => void;
  markLicenseDone: () => void;
  markOdometerDone: () => void;
  markExteriorDone: () => void;
  resetInspection: () => void;
  markDamagesDone: () => void;
  addExteriorImage: () => void;
  resetExteriorImages: () => void;
  resetInspectionStart: () => void; // if needed for retakes
};

export const useInspectionStepsStore = create<InspectionState>()(
  persist(
    (set) => ({
      currentStep: 1,
      startedInspection: false,

      completedVin: false,
      completedLicense: false,
      completedOdometer: false,
      completedExterior: false,
      completedDamages: false,
      exteriorImagesCount: 0,
      markDamagesDone: () => set({ completedDamages: true }),
      addExteriorImage: () =>
        set((state) => ({
          exteriorImagesCount: state.exteriorImagesCount + 1,
        })),
      resetExteriorImages: () => set({ exteriorImagesCount: 0 }),
      setCurrentStep: (step) => set({ currentStep: step }),

      setStartedInspection: (value) => set({ startedInspection: value }),

      markVinDone: () => set({ completedVin: true }),
      markLicenseDone: () => set({ completedLicense: true }),
      markOdometerDone: () => set({ completedOdometer: true, currentStep: 3 }),
      markExteriorDone: () => set({ completedExterior: true }),
      resetInspectionStart: () =>
        set({
          startedInspection: false,
        }),
      resetInspection: () =>
        set({
          currentStep: 1,
          startedInspection: false,
          completedVin: false,
          completedLicense: false,
          completedOdometer: false,
          completedExterior: false,
        }),
    }),

    {
      name: "inspection-progress", // key in localStorage
      storage: createJSONStorage(() => localStorage), // can use sessionStorage too
      partialize: (state) => ({
        // only persist what's really needed
        currentStep: state.currentStep,
        startedInspection: state.startedInspection,
        completedVin: state.completedVin,
        completedLicense: state.completedLicense,
        completedOdometer: state.completedOdometer,
        completedExterior: state.completedExterior,
        completedDamages: state.completedDamages,
        exteriorImagesCount: state.exteriorImagesCount,
      }),

      // Optional: version your storage format
      version: 1,

      // Optional: migrate old data if format changes
      migrate: (persistedState, version) => {
        const state = persistedState as Partial<InspectionState>;
        if (version === 0) {
          return {
            ...state,
            completedExterior: false,
          };
        }
        return state as InspectionState;
      },
    },
  ),
);
