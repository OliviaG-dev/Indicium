import type { ElectionStats } from "./election";

// Types pour l'export PDF
export interface PDFReportData {
  title: string;
  date: string;
  stats: ElectionStats;
  filters: {
    year: string;
    round: string;
  };
}
