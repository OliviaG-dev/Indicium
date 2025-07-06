import { useFiltersStore } from "../../store/filterStore";
import { CalendarDays, Repeat } from "lucide-react";

const years = ["2022", "2017", "2012", "2007"];
const rounds = ["1", "2"];

export function FiltersPanel() {
  const { year, round, setYear, setRound } = useFiltersStore();

  return (
    <div className="bg-card rounded-xl sm:rounded-2xl shadow-sm border border-border p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6 items-stretch sm:items-center w-full animate-fade-in">
      {/* Année */}
      <div className="flex-1 flex items-center gap-3 w-full">
        <div className="bg-teal-100 dark:bg-teal-900/20 rounded-lg flex items-center justify-center h-10 w-10 flex-shrink-0">
          <CalendarDays className="w-5 h-5 text-teal-600 dark:text-teal-400" />
        </div>
        <div className="w-full flex items-center">
          <select
            className="w-full h-10 px-3 border border-border rounded-md bg-card text-foreground focus:ring-2 focus:ring-primary/40 transition hover:bg-zinc-100 dark:hover:bg-zinc-800 appearance-none text-sm sm:text-base"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            <option value="" disabled>
              Année
            </option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Tour */}
      <div className="flex-1 flex items-center gap-3 w-full">
        <div className="bg-teal-100 dark:bg-teal-900/20 rounded-lg flex items-center justify-center h-10 w-10 flex-shrink-0">
          <Repeat className="w-5 h-5 text-teal-600 dark:text-teal-400" />
        </div>
        <div className="w-full flex items-center">
          <select
            className="w-full h-10 px-3 border border-border rounded-md bg-card text-foreground focus:ring-2 focus:ring-primary/40 transition hover:bg-zinc-100 dark:hover:bg-zinc-800 appearance-none text-sm sm:text-base"
            value={round}
            onChange={(e) => setRound(e.target.value as "1" | "2")}
          >
            <option value="" disabled>
              Tour
            </option>
            {rounds.map((r) => (
              <option key={r} value={r}>
                {r}ᵉ tour
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
