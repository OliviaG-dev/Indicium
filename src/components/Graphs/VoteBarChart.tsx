import { useEffect, useState } from "react";
import {
  BarChart,
  XAxis,
  YAxis,
  Bar,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import electionService from "../../services/electionService";

type CandidateResult = {
  name: string;
  votes: number;
  percent: number;
};

// Légende personnalisée
function CustomLegend() {
  return (
    <div className="flex justify-center gap-6 mt-4">
      <div className="flex items-center gap-2">
        <span
          className="inline-block w-3 h-3 rounded-full"
          style={{ background: "#6366f1" }}
        ></span>
        <span className="text-sm text-card-foreground font-medium">
          Nombre de voix
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span
          className="inline-block w-3 h-3 rounded-full"
          style={{ background: "#a21caf" }}
        ></span>
        <span className="text-sm text-card-foreground font-medium">
          Pourcentage des exprimés
        </span>
      </div>
    </div>
  );
}

export function VotesBarChart() {
  const [data, setData] = useState<CandidateResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchVotes() {
      try {
        setLoading(true);
        setError(null);

        // Utiliser le service d'élection pour obtenir les données
        const stats = await electionService.fetchElectionData();

        // Calculer les votes par candidat basé sur les statistiques
        // Simulation réaliste des résultats du 2ème tour 2022
        const totalVotants = stats.totalVotants;
        const participation = stats.participation / 100;
        const exprimes = Math.round(totalVotants * participation * 0.972); // 97.2% des votants sont exprimés

        // Résultats réels du 2ème tour 2022 (approximatifs)
        const macronPercent = 58.55; // Emmanuel Macron
        const lepenPercent = 41.45; // Marine Le Pen

        const macronVotes = Math.round((exprimes * macronPercent) / 100);
        const lepenVotes = exprimes - macronVotes;

        const candidates: CandidateResult[] = [
          {
            name: "Emmanuel Macron",
            votes: macronVotes,
            percent: macronPercent,
          },
          {
            name: "Marine Le Pen",
            votes: lepenVotes,
            percent: lepenPercent,
          },
        ];

        setData(candidates);
      } catch (err) {
        console.error("Error fetching vote data:", err);
        setError("Impossible de charger les données électorales");

        // Données de fallback basées sur les résultats réels
        const fallbackData: CandidateResult[] = [
          {
            name: "Emmanuel Macron",
            votes: 18760444,
            percent: 58.55,
          },
          {
            name: "Marine Le Pen",
            votes: 13286006,
            percent: 41.45,
          },
        ];
        setData(fallbackData);
      } finally {
        setLoading(false);
      }
    }

    fetchVotes();
  }, []);

  if (loading) {
    return (
      <div className="bg-card rounded-2xl p-6 shadow-sm border border-border animate-pulse w-full md:w-1/2 mx-auto">
        <div className="h-6 bg-muted rounded mb-4"></div>
        <div className="h-[300px] bg-muted rounded"></div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-2xl p-6 shadow-sm border border-border w-full md:w-1/2 mx-auto">
      <h2 className="text-lg font-semibold mb-4 text-card-foreground">
        Résultats par candidat
      </h2>
      {error && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3 text-sm text-yellow-800 dark:text-yellow-200 mb-4">
          ⚠️ {error} - Affichage des données de référence
        </div>
      )}
      <ResponsiveContainer width="100%" height={320}>
        <BarChart
          data={data}
          barCategoryGap={32}
          margin={{ top: 16, right: 24, left: 48, bottom: 32 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis
            dataKey="name"
            tick={{
              fill: "#e0e7ef",
              fontFamily: "Inter",
              fontWeight: 500,
              fontSize: 15,
            }}
            axisLine={{ stroke: "#334155" }}
            tickLine={false}
          />
          <YAxis
            tick={{
              fill: "#e0e7ef",
              fontFamily: "Inter",
              fontWeight: 500,
              fontSize: 11,
            }}
            axisLine={{ stroke: "#334155" }}
            tickLine={false}
            tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
          />
          <Tooltip
            formatter={(value: number, name: string) =>
              name === "Pourcentage des exprimés"
                ? value.toFixed(2) + " %"
                : value.toLocaleString("fr-FR") + " voix"
            }
            contentStyle={{
              background: "#181f2a",
              border: "1px solid #334155",
              borderRadius: "10px",
              color: "#e0e7ef",
              fontFamily: "Inter",
              fontSize: 15,
            }}
            itemStyle={{ color: "#e0e7ef" }}
            labelStyle={{ color: "#818cf8", fontWeight: 600 }}
            cursor={{ fill: "#334155", opacity: 0.15 }}
          />
          <Legend content={<CustomLegend />} />
          <Bar
            dataKey="votes"
            name="Nombre de voix"
            fill="url(#barGradient)"
            radius={[8, 8, 0, 0]}
            animationDuration={1200}
            maxBarSize={64}
          />
          <Bar
            dataKey="percent"
            name="Pourcentage des exprimés"
            fill="#a21caf"
            radius={[8, 8, 0, 0]}
            animationDuration={1200}
            maxBarSize={32}
          />
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#a21caf" />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
