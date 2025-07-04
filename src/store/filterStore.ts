import { create } from "zustand";

type FiltersState = {
  year: string;
  round: "1" | "2";
  setYear: (y: string) => void;
  setRound: (r: FiltersState["round"]) => void;
};

export const useFiltersStore = create<FiltersState>((set) => ({
  year: "2022",
  round: "2",
  setYear: (year) => set({ year }),
  setRound: (round) => set({ round }),
}));