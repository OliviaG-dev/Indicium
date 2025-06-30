import React from "react";
import Card from "../components/UI/Card";
import Button from "../components/UI/Button";

const Dashboard: React.FC = () => {
  return (
    <div className="h-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Tableau de bord
          </h1>
          <p className="text-lg text-muted-foreground">
            Analysez les données électorales et politiques en temps réel
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Carte statistiques */}
          <Card title="Statistiques générales">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Élections analysées
                </span>
                <span className="font-semibold text-card-foreground">24</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Candidats suivis</span>
                <span className="font-semibold text-card-foreground">156</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Données mises à jour
                </span>
                <span className="font-semibold text-card-foreground">
                  Aujourd'hui
                </span>
              </div>
            </div>
          </Card>

          {/* Carte graphiques */}
          <Card title="Graphiques disponibles">
            <div className="space-y-2">
              <div className="text-muted-foreground">
                • Répartition des votes
              </div>
              <div className="text-muted-foreground">
                • Évolution des tendances
              </div>
              <div className="text-muted-foreground">
                • Comparaison par région
              </div>
              <div className="text-muted-foreground">
                • Analyse démographique
              </div>
            </div>
          </Card>

          {/* Carte actions rapides */}
          <Card title="Actions rapides">
            <div className="space-y-3">
              <Button variant="primary" size="md" className="w-full">
                Nouvelle analyse
              </Button>
              <Button variant="secondary" size="md" className="w-full">
                Exporter données
              </Button>
              <Button variant="outline" size="md" className="w-full">
                Paramètres
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
