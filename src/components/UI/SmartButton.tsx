import React from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "./Button";
import { pdfExportService } from "../../services/pdfExportService";
import type { SmartButtonProps } from "../../types";

const SmartButton: React.FC<SmartButtonProps> = ({
  stats,
  variant = "primary",
  size = "lg",
  className = "",
}) => {
  const location = useLocation();
  const isDashboard = location.pathname === "/dashboard";

  const handleExport = async () => {
    if (stats) {
      try {
        await pdfExportService.exportDashboard(stats);
      } catch (error) {
        console.error("Erreur lors de l'export PDF:", error);
      }
    }
  };

  if (isDashboard) {
    return (
      <Button
        variant={variant}
        size={size}
        className={`${className}`}
        onClick={handleExport}
        disabled={!stats}
      >
        <svg
          className="w-4 h-4 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        Exporter PDF
      </Button>
    );
  }

  return (
    <Link to="/dashboard">
      <Button
        variant={variant}
        size={size}
        className={`px-8 sm:px-12 py-4 sm:py-6 text-lg sm:text-xl transform hover:scale-105 shadow-xl hover:shadow-2xl w-full sm:w-auto ${className}`}
      >
        Commencer
      </Button>
    </Link>
  );
};

export default SmartButton;
