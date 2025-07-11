import React, { useEffect, useState } from "react";
import { Vote, Users, XCircle, FileText } from "lucide-react";
import electionService from "../../services/electionService";
import { useFiltersStore } from "../../store/filterStore";
import type { KPI, ElectionStats, CardProps } from "../../types";

const Card: React.FC<CardProps> = ({
  children,
  className = "",
  title,
  description,
}) => {
  return (
    <div
      className={`bg-card p-4 sm:p-6 rounded-lg shadow-sm border border-border animate-scale-in ${className}`}
    >
      {(title || description) && (
        <div className="mb-4">
          {title && (
            <h3 className="text-base sm:text-lg font-semibold text-card-foreground mb-2">
              {title}
            </h3>
          )}
          {description && (
            <p className="text-xs sm:text-sm text-muted-foreground">
              {description}
            </p>
          )}
        </div>
      )}
      {children}
    </div>
  );
};

export function KPICards() {
  const [kpis, setKpis] = useState<KPI[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState<string>("");
  const { year, round } = useFiltersStore();

  useEffect(() => {
    async function fetchElectionData() {
      try {
        setLoading(true);
        setDataSource("");

        const stats: ElectionStats = await electionService.fetchElectionData(
          year,
          round
        );

        setDataSource(
          stats.dataSource === "API" ? "API officielle" : "Données simulées"
        );

        setKpis([
          {
            title: "Taux de participation",
            value: `${stats.participation.toFixed(1)} %`,
            icon: <Vote className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />,
          },
          {
            title: "Taux d'abstention",
            value: `${stats.abstention.toFixed(1)} %`,
            icon: <XCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />,
          },
          {
            title: "Votes blancs / nuls",
            value: `${stats.blancsNuls.toFixed(1)} %`,
            icon: (
              <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground" />
            ),
          },
          {
            title: "Nombre de votants",
            value: stats.totalVotants.toLocaleString("fr-FR"),
            icon: <Users className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />,
          },
        ]);
      } catch (err) {
        console.error(
          "KPICards: Error fetching data, using recent mock data:",
          err
        );

        // Fallback vers les données récentes (plus réalistes)
        const mockStats = electionService.getRealisticMockData(year, round);
        setDataSource("Données récentes (simulées)");

        setKpis([
          {
            title: "Taux de participation",
            value: `${mockStats.participation.toFixed(1)} %`,
            icon: <Vote className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />,
          },
          {
            title: "Taux d'abstention",
            value: `${mockStats.abstention.toFixed(1)} %`,
            icon: <XCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />,
          },
          {
            title: "Votes blancs / nuls",
            value: `${mockStats.blancsNuls.toFixed(1)} %`,
            icon: (
              <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground" />
            ),
          },
          {
            title: "Nombre de votants",
            value: mockStats.totalVotants.toLocaleString("fr-FR"),
            icon: <Users className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />,
          },
        ]);
      } finally {
        setLoading(false);
      }
    }

    fetchElectionData();
  }, [year, round]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <div className="h-12 sm:h-16 bg-muted rounded"></div>
          </Card>
        ))}
      </div>
    );
  }

  if (!kpis) return null;

  return (
    <div className="space-y-4">
      {dataSource.includes("simulées") && (
        <div className="bg-yellow-50/30 dark:bg-yellow-900/10 border border-yellow-200/50 dark:border-yellow-800/30 rounded-lg p-2 sm:p-3 text-xs text-yellow-700/70 dark:text-yellow-300/70 opacity-80">
          ⚠️ {dataSource} - Les APIs officielles sont temporairement
          indisponibles
        </div>
      )}

      {dataSource.includes("API") && (
        <div className="bg-green-50/30 dark:bg-green-900/10 border border-green-200/50 dark:border-green-800/30 rounded-lg p-2 sm:p-3 text-xs text-green-700/70 dark:text-green-300/70 opacity-80">
          ✅ {dataSource} - Données officielles en temps réel
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {kpis.map((kpi) => (
          <Card key={kpi.title} className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <div className="text-xs sm:text-sm text-muted-foreground truncate">
                {kpi.title}
              </div>
              <div className="text-lg sm:text-xl font-semibold text-card-foreground truncate">
                {kpi.value}
              </div>
            </div>
            <div className="flex-shrink-0 ml-3">{kpi.icon}</div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Card;
