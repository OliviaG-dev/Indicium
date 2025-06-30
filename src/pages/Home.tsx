import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/UI/Button";

const Home: React.FC = () => {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <div className="text-center space-y-12 animate-fade-in">
          <div className="space-y-8">
            <h1 className="text-6xl md:text-7xl font-bold text-gradient-primary leading-tight">
              Bienvenue sur Indicium
            </h1>
            <p className="text-2xl md:text-3xl text-muted-foreground leading-relaxed max-w-4xl mx-auto font-light">
              Votre tableau de bord politique interactif pour analyser,
              visualiser et comparer les données électorales en France.
              Graphiques clairs, indicateurs clés, et données publiques
              accessibles en temps réel.
            </p>
          </div>

          <div className="pt-8 animate-slide-up">
            <Link to="/dashboard">
              <Button
                variant="primary"
                size="lg"
                className="px-12 py-6 text-xl transform hover:scale-105 shadow-xl hover:shadow-2xl"
              >
                Commencer
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
