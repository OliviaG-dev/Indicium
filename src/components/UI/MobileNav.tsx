import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, BarChart3 } from "lucide-react";

const MobileNav: React.FC = () => {
  const location = useLocation();

  const navItems = [
    {
      path: "/",
      label: "Accueil",
      icon: Home,
    },
    {
      path: "/dashboard",
      label: "Dashboard",
      icon: BarChart3,
    },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-t border-border/50">
      <div className="flex items-center justify-around px-4 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-all duration-300 ${
                isActive
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? "text-primary" : ""}`} />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNav;
