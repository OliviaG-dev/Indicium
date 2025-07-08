// Types pour le store Zustand
export type FiltersState = {
  year: string;
  round: "1" | "2";
  setYear: (y: string) => void;
  setRound: (r: "1" | "2") => void;
};
