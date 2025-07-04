import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { TrendingUp } from "lucide-react";
import electionService from "../../services/electionService";

// Légende personnalisée
function CustomLegend() {
  return (
    <div className="flex justify-center gap-6 mt-4">
      <div className="flex items-center gap-2">
        <span
          className="inline-block w-3 h-3 rounded-full"
          style={{ background: "#6366f1" }}
        ></span>
        <span className="text-sm text-muted-foreground font-medium">
          Taux de participation
        </span>
      </div>
    </div>
  );
}

export function ParticipationLineChart() {
  const [data, setData] = useState<{ year: string; participation: number }[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState<string>("");

  useEffect(() => {
    async function fetchParticipationData() {
      try {
        setLoading(true);
        setDataSource("");

        console.log(
          "ParticipationLineChart: Starting to fetch participation history..."
        );
        const historyData = await electionService.fetchParticipationHistory();

        console.log(
          "ParticipationLineChart: Received history data:",
          historyData
        );
        setDataSource("API officielle");
        setData(historyData);
      } catch (err) {
        console.error(
          "ParticipationLineChart: Error fetching data, using mock data:",
          err
        );

        // Fallback vers les données simulées
        const mockData = electionService.getMockParticipationHistory();
        setDataSource("Données simulées");
        setData(mockData);
      } finally {
        setLoading(false);
      }
    }

    fetchParticipationData();
  }, []);

  if (loading) {
    return (
      <div className="bg-card rounded-2xl p-6 shadow-sm border border-border animate-pulse w-full">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-6 w-6 bg-muted rounded"></div>
          <div className="h-6 bg-muted rounded w-48"></div>
        </div>
        <div className="h-[300px] bg-muted rounded"></div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-2xl p-6 shadow-sm border border-border w-full">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
          <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
        </div>
        <h2 className="text-lg font-semibold text-card-foreground">
          Évolution de la participation présidentielle
        </h2>
      </div>

      {dataSource.includes("simulées") && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3 text-sm text-yellow-800 dark:text-yellow-200 mb-4">
          ⚠️ {dataSource} - Les APIs officielles sont temporairement
          indisponibles
        </div>
      )}
      {dataSource.includes("API") && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 text-sm text-green-800 dark:text-green-200 mb-4">
          ✅ {dataSource} - Données officielles en temps réel
        </div>
      )}

      <div className="relative">
        <ResponsiveContainer width="100%" height={320}>
          <LineChart
            data={data}
            margin={{ top: 16, right: 32, left: 16, bottom: 32 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis
              dataKey="year"
              tick={{
                fill: "#475569",
                fontFamily: "Inter",
                fontWeight: 500,
                fontSize: 15,
              }}
              axisLine={{ stroke: "#334155" }}
              tickLine={false}
            />
            <YAxis
              domain={[60, 90]}
              tickFormatter={(value) => `${value}%`}
              tick={{
                fill: "#475569",
                fontFamily: "Inter",
                fontWeight: 500,
                fontSize: 15,
              }}
              axisLine={{ stroke: "#334155" }}
              tickLine={false}
            />
            <Tooltip
              formatter={(value) => [`${value} %`, "Taux de participation"]}
              labelStyle={{
                color: "#6366f1",
                fontFamily: "Inter",
                fontWeight: 700,
                fontSize: 15,
                marginBottom: "8px",
                textTransform: "capitalize",
              }}
              contentStyle={{
                background: "rgba(24, 31, 42, 0.95)",
                border: "1px solid #334155",
                borderRadius: "16px",
                color: "#e0e7ef",
                fontFamily: "Inter",
                fontSize: 13,
                padding: "16px 20px",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                backdropFilter: "blur(8px)",
              }}
              itemStyle={{
                color: "#e0e7ef",
                padding: "6px 0",
                fontSize: 12,
              }}
              cursor={{ fill: "#334155", opacity: 0.2 }}
            />
            <Legend content={<CustomLegend />} />
            <Line
              type="monotone"
              dataKey="participation"
              name="Taux de participation"
              stroke="url(#lineGradient)"
              strokeWidth={3}
              dot={{
                r: 5,
                fill: "#6366f1",
                stroke: "#ffffff",
                strokeWidth: 2,
              }}
              activeDot={{
                r: 7,
                fill: "#a21caf",
                stroke: "#ffffff",
                strokeWidth: 3,
              }}
            />
            <defs>
              <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#a21caf" />
              </linearGradient>
            </defs>
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
