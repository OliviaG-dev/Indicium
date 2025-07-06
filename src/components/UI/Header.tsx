import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Gestion du scroll pour l'effet de transparence
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-card/95 backdrop-blur-md border-b border-border shadow-lg"
          : "bg-card/80 backdrop-blur-sm border-b border-border/50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo et titre */}
          <div className="flex items-center space-x-3">
            <div className="relative group">
              {/* Aura externe animée */}
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-xl blur-md opacity-40 animate-pulse"></div>

              {/* Aura interne */}
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl blur-sm opacity-60"></div>

              {/* Conteneur du logo avec background harmonieux */}
              <div className="relative bg-gradient-to-br from-white/95 via-indigo-50/80 to-purple-50/80 backdrop-blur-md rounded-xl border border-white/40 shadow-xl hover:shadow-2xl transition-all duration-300 group-hover:scale-105 group-hover:from-white group-hover:via-indigo-100/90 group-hover:to-purple-100/90">
                <img
                  src="/logo.png"
                  alt="Indicium Logo"
                  className="h-8 w-8 sm:h-10 sm:w-10 object-contain filter brightness-110 contrast-110 p-1.5 rounded-lg"
                />

                {/* Reflet subtil */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent rounded-xl pointer-events-none"></div>
              </div>

              {/* Particules lumineuses */}
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-pink-400 rounded-full animate-ping opacity-75"></div>
              <div
                className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-indigo-400 rounded-full animate-ping opacity-75"
                style={{ animationDelay: "0.5s" }}
              ></div>
            </div>

            <span className="text-xl sm:text-2xl font-bold text-gradient-primary">
              Indicium
            </span>
          </div>

          {/* Navigation desktop */}
          <div className="hidden lg:flex items-center space-x-8">
            <nav className="flex space-x-8">
              <Link
                to="/"
                className="relative text-muted-foreground hover:text-foreground px-3 py-2 text-sm font-medium transition-all duration-300 focus:outline-none focus:text-foreground before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-0 before:bg-gradient-to-r before:from-indigo-600 before:via-purple-600 before:to-pink-600 before:transition-all before:duration-300 hover:before:w-full focus:before:w-full"
              >
                Accueil
              </Link>
              <Link
                to="/dashboard"
                className="relative text-muted-foreground hover:text-foreground px-3 py-2 text-sm font-medium transition-all duration-300 focus:outline-none focus:text-foreground before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-0 before:bg-gradient-to-r before:from-indigo-600 before:via-purple-600 before:to-pink-600 before:transition-all before:duration-300 hover:before:w-full focus:before:w-full"
              >
                Tableau de bord
              </Link>
            </nav>
            <ThemeToggle />
          </div>

          {/* ThemeToggle pour mobile/tablette */}
          <div className="lg:hidden">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
