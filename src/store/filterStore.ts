import { create } from "zustand";
import type { FiltersState } from "../types";

export const useFiltersStore = create<FiltersState>((set) => ({
  year: "2022",
  round: "2",
  setYear: (year) => set({ year }),
  setRound: (round) => set({ round }),
}));