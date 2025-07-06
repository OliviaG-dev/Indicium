import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/UI/Button";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto py-8 sm:py-12 lg:py-16">
        <div className="text-center space-y-8 sm:space-y-12 animate-fade-in">
          <div className="space-y-6 sm:space-y-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gradient-primary leading-tight px-4">
              Bienvenue sur Indicium
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-muted-foreground leading-relaxed max-w-4xl mx-auto font-light px-4">
              Votre tableau de bord politique interactif pour analyser,
              visualiser et comparer les données électorales en France.
              <span className="block sm:inline">
                {" "}
                Graphiques clairs, indicateurs clés, et données publiques
                accessibles en temps réel.
              </span>
            </p>
          </div>

          <div className="pt-4 sm:pt-8 animate-slide-up">
            <Link to="/dashboard">
              <Button
                variant="primary"
                size="lg"
                className="px-8 sm:px-12 py-4 sm:py-6 text-lg sm:text-xl transform hover:scale-105 shadow-xl hover:shadow-2xl w-full sm:w-auto"
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
