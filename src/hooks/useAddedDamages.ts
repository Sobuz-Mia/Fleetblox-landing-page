// hooks/useAddedDamages.ts
import { create } from "zustand";

interface DamageItem {
  side: string;
  part: string;
  type: string;
  severity: string;
  confidence: number;
  thumbnail: string;
}

interface Store {
  damages: DamageItem[];
  addDamage: (d: DamageItem) => void;
  clear: () => void;
}

export const useAddedDamages = create<Store>((set) => ({
  damages: [],
  addDamage: (d) => set((s) => ({ damages: [...s.damages, d] })),
  clear: () => set({ damages: [] }),
}));
