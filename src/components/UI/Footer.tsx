import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-card/80 backdrop-blur-sm border-t border-border/50">
      <div className="max-w-7xl mx-auto py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
        {/* Version Desktop */}
        <div className="hidden lg:flex justify-between items-center">
          <div className="text-muted-foreground text-sm">
            © 2024 Indicium. Tous droits réservés.
          </div>
          <div className="flex space-x-6">
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground text-sm transition-colors duration-300 hover:scale-105"
            >
              Politique de confidentialité
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground text-sm transition-colors duration-300 hover:scale-105"
            >
              Conditions d'utilisation
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground text-sm transition-colors duration-300 hover:scale-105"
            >
              Contact
            </a>
          </div>
        </div>

        {/* Version Mobile/Tablette */}
        <div className="lg:hidden space-y-4">
          {/* Titre et description */}
          <div className="flex flex-col items-center space-y-2">
            <span className="text-lg font-bold text-gradient-primary">
              Indicium
            </span>
            <p className="text-muted-foreground text-xs text-center max-w-xs">
              Plateforme de visualisation des données électorales
            </p>
          </div>

          {/* Liens de navigation */}
          <div className="flex flex-col space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <a
                href="#"
                className="group flex items-center justify-center sm:justify-start space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500/5 to-purple-500/5 border border-indigo-500/10 hover:from-indigo-500/10 hover:to-purple-500/10 transition-all duration-300"
              >
                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full group-hover:scale-125 transition-transform duration-300"></div>
                <span className="text-muted-foreground group-hover:text-foreground text-sm font-medium transition-colors duration-300">
                  Politique de confidentialité
                </span>
              </a>
              <a
                href="#"
                className="group flex items-center justify-center sm:justify-start space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500/5 to-pink-500/5 border border-purple-500/10 hover:from-purple-500/10 hover:to-pink-500/10 transition-all duration-300"
              >
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full group-hover:scale-125 transition-transform duration-300"></div>
                <span className="text-muted-foreground group-hover:text-foreground text-sm font-medium transition-colors duration-300">
                  Conditions d'utilisation
                </span>
              </a>
              <a
                href="#"
                className="group flex items-center justify-center sm:justify-start space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500/5 to-indigo-500/5 border border-pink-500/10 hover:from-pink-500/10 hover:to-indigo-500/10 transition-all duration-300"
              >
                <div className="w-1.5 h-1.5 bg-pink-500 rounded-full group-hover:scale-125 transition-transform duration-300"></div>
                <span className="text-muted-foreground group-hover:text-foreground text-sm font-medium transition-colors duration-300">
                  Contact
                </span>
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-4 border-t border-border/30">
            <div className="text-center">
              <p className="text-muted-foreground text-xs">
                © 2024 Indicium. Tous droits réservés.
              </p>
              <p className="text-muted-foreground/70 text-xs mt-1">
                Conçu avec ❤️ pour la transparence démocratique
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
