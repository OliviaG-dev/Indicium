import React from "react";
import { KPICards } from "../components/Graphs/KPICards";
import { VotesBarChart } from "../components/Graphs/VoteBarChart";
import { RegionMap } from "../components/Graphs/RegionMap";
import { ParticipationLineChart } from "../components/Graphs/ParticipationLineChart";
import { FiltersPanel } from "../components/Graphs/FiltersPanel";

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Header */}
        <div className="mb-6 sm:mb-8 animate-fade-in">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2 sm:mb-4">
            Tableau de bord
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground">
            Analysez les données électorales et politiques en temps réel
          </p>
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
