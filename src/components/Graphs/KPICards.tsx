import React, { useEffect, useState } from "react";
import { Vote, Users, XCircle, FileText } from "lucide-react";
import electionService, {
  type KPI,
  type ElectionStats,
} from "../../services/electionService";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
}

const Card: React.FC<CardProps> = ({
  children,
  className = "",
  title,
  description,
}) => {
  return (
    <div
      className={`bg-card p-6 rounded-lg shadow-sm border border-border animate-scale-in ${className}`}
    >
      {(title || description) && (
        <div className="mb-4">
          {title && (
            <h3 className="text-lg font-semibold text-card-foreground mb-2">
              {title}
            </h3>
          )}
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
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

  useEffect(() => {
    async function fetchElectionData() {
      try {
        setLoading(true);
        setDataSource("");

        console.log("KPICards: Starting to fetch election data...");
        const stats: ElectionStats = await electionService.fetchElectionData();

        console.log("KPICards: Received stats:", stats);
        setDataSource(
          stats.dataSource === "API" ? "API officielle" : "Données simulées"
        );

        setKpis([
          {
            title: "Taux de participation",
            value: `${stats.participation.toFixed(1)} %`,
            icon: <Vote className="w-6 h-6 text-green-500" />,
          },
          {
            title: "Taux d'abstention",
            value: `${stats.abstention.toFixed(1)} %`,
            icon: <XCircle className="w-6 h-6 text-red-500" />,
          },
          {
            title: "Votes blancs / nuls",
            value: `${stats.blancsNuls.toFixed(1)} %`,
            icon: <FileText className="w-6 h-6 text-muted-foreground" />,
          },
          {
            title: "Nombre de votants",
            value: stats.totalVotants.toLocaleString("fr-FR"),
            icon: <Users className="w-6 h-6 text-blue-500" />,
          },
        ]);
      } catch (err) {
        console.error(
          "KPICards: Error fetching data, using recent mock data:",
          err
        );

        // Fallback vers les données récentes (plus réalistes)
        const mockStats = electionService.getRecentMockData();
        setDataSource("Données récentes (simulées)");

        setKpis([
          {
            title: "Taux de participation",
            value: `${mockStats.participation.toFixed(1)} %`,
            icon: <Vote className="w-6 h-6 text-green-500" />,
          },
          {
            title: "Taux d'abstention",
            value: `${mockStats.abstention.toFixed(1)} %`,
            icon: <XCircle className="w-6 h-6 text-red-500" />,
          },
          {
            title: "Votes blancs / nuls",
            value: `${mockStats.blancsNuls.toFixed(1)} %`,
            icon: <FileText className="w-6 h-6 text-muted-foreground" />,
          },
          {
            title: "Nombre de votants",
            value: mockStats.totalVotants.toLocaleString("fr-FR"),
            icon: <Users className="w-6 h-6 text-blue-500" />,
          },
        ]);
      } finally {
        setLoading(false);
      }
    }

    fetchElectionData();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <div className="h-16 bg-muted rounded"></div>
          </Card>
        ))}
      </div>
    );
  }

  if (!kpis) return null;

  return (
    <div className="space-y-4">
      {dataSource.includes("simulées") && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3 text-sm text-yellow-800 dark:text-yellow-200">
          ⚠️ {dataSource} - Les APIs officielles sont temporairement
          indisponibles
        </div>
      )}

      {dataSource.includes("API") && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 text-sm text-green-800 dark:text-green-200">
          ✅ {dataSource} - Données officielles en temps réel
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <Card key={kpi.title} className="flex items-center justify-between">
            <div>
              <div className="text-sm text-muted-foreground">{kpi.title}</div>
              <div className="text-xl font-semibold text-card-foreground">
                {kpi.value}
              </div>
            </div>
            <div>{kpi.icon}</div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Card;
