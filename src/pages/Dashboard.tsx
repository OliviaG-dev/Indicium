import React, { useState, useEffect } from "react";
import { KPICards } from "../components/Graphs/KPICards";
import { VotesBarChart } from "../components/Graphs/VoteBarChart";
import { RegionMap } from "../components/Graphs/RegionMap";
import { ParticipationLineChart } from "../components/Graphs/ParticipationLineChart";
import { FiltersPanel } from "../components/Graphs/FiltersPanel";
import SmartButton from "../components/UI/SmartButton";
import electionService from "../services/electionService";
import type { ElectionStats } from "../services/electionService";
import { useFiltersStore } from "../store/filterStore";

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<ElectionStats | null>(null);
  const { year, round } = useFiltersStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await electionService.fetchElectionData(year, round);
        setStats(data);
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
      }
    };
    fetchData();
  }, [year, round]);

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Header */}
        <div className="mb-6 sm:mb-8 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2 sm:mb-4">
                Tableau de bord
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground">
                Analysez les données électorales et politiques en temps réel
              </p>
            </div>
            <SmartButton
              stats={stats || undefined}
              variant="primary"
              size="lg"
              className="self-start sm:self-center"
            />
          </div>
        </div>

        {/* Section Filtres */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-4 sm:mb-6">
            Filtres
          </h2>
          <FiltersPanel />
        </div>

        {/* Section KPIs */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-4 sm:mb-6">
            Indicateurs Clés
          </h2>
          <KPICards />
        </div>

        {/* Section Graphiques */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-4 sm:mb-6">
            Analyse des Résultats
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
            <VotesBarChart />
            <RegionMap />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:gap-6">
            <ParticipationLineChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
