import jsPDF from "jspdf";
import type { ElectionStats, PDFReportData } from "../types";
import { useFiltersStore } from "../store/filterStore";

class PDFExportService {
  private addHeader(doc: jsPDF, title: string, date: string): void {
    // Titre principal
    doc.setFontSize(24);
    doc.setTextColor(59, 130, 246); // blue-500
    doc.text("Indicium", 20, 30);

    // Sous-titre
    doc.setFontSize(16);
    doc.setTextColor(107, 114, 128); // gray-500
    doc.text(title, 20, 45);

    // Date
    doc.setFontSize(12);
    doc.setTextColor(156, 163, 175); // gray-400
    doc.text(`Généré le ${date}`, 20, 55);

    // Ligne de séparation
    doc.setDrawColor(229, 231, 235); // gray-200
    doc.line(20, 65, 190, 65);
  }

  private addKPISection(
    doc: jsPDF,
    stats: ElectionStats,
    yPosition: number
  ): number {
    doc.setFontSize(14);
    doc.setTextColor(17, 24, 39); // gray-900
    doc.text("Indicateurs Clés", 20, yPosition);

    const kpiData = [
      {
        label: "Taux de Participation",
        value: `${stats.participation}%`,
        color: [34, 197, 94],
      }, // green-500
      {
        label: "Taux d'Abstention",
        value: `${stats.abstention}%`,
        color: [239, 68, 68],
      }, // red-500
      {
        label: "Blancs et Nuls",
        value: `${stats.blancsNuls}%`,
        color: [245, 158, 11],
      }, // yellow-500
      {
        label: "Total Votants",
        value: stats.totalVotants.toLocaleString("fr-FR"),
        color: [59, 130, 246],
      }, // blue-500
    ];

    const currentY = yPosition + 15;

    kpiData.forEach((kpi, index) => {
      const x = 20 + (index % 2) * 85;
      const y = currentY + Math.floor(index / 2) * 25;

      // Rectangle de fond
      doc.setFillColor(249, 250, 251); // gray-50
      doc.roundedRect(x, y - 15, 80, 20, 3, 3, "F");

      // Bordure
      doc.setDrawColor(kpi.color[0], kpi.color[1], kpi.color[2]);
      doc.setLineWidth(0.5);
      doc.roundedRect(x, y - 15, 80, 20, 3, 3, "S");

      // Texte
      doc.setFontSize(10);
      doc.setTextColor(107, 114, 128); // gray-500
      doc.text(kpi.label, x + 5, y - 8);

      doc.setFontSize(12);
      doc.setTextColor(kpi.color[0], kpi.color[1], kpi.color[2]);
      doc.setFont("helvetica", "bold");
      doc.text(kpi.value, x + 5, y + 2);
      doc.setFont("helvetica", "normal");
    });

    return currentY + 60;
  }

  private addFiltersSection(
    doc: jsPDF,
    filters: { year: string; round: string },
    yPosition: number
  ): number {
    doc.setFontSize(14);
    doc.setTextColor(17, 24, 39); // gray-900
    doc.text("Filtres Appliqués", 20, yPosition);

    doc.setFontSize(12);
    doc.setTextColor(107, 114, 128); // gray-500
    doc.text(`Année: ${filters.year}`, 20, yPosition + 15);
    doc.text(
      `Tour: ${filters.round === "1" ? "Premier tour" : "Deuxième tour"}`,
      20,
      yPosition + 25
    );

    return yPosition + 40;
  }

  private addFooter(doc: jsPDF): void {
    const pageHeight = doc.internal.pageSize.height;

    doc.setFontSize(10);
    doc.setTextColor(156, 163, 175); // gray-400
    doc.text(
      "Rapport généré automatiquement par Indicium",
      20,
      pageHeight - 20
    );
    doc.text(
      "Données publiques - Analyse électorale française",
      20,
      pageHeight - 15
    );
  }

  async generateDashboardReport(data: PDFReportData): Promise<void> {
    const doc = new jsPDF("p", "mm", "a4");

    // En-tête
    this.addHeader(doc, data.title, data.date);

    // Section KPIs
    const currentY = this.addKPISection(doc, data.stats, 80);

    // Section filtres
    this.addFiltersSection(doc, data.filters, currentY + 20);

    // Pied de page
    this.addFooter(doc);

    // Sauvegarder le PDF
    const fileName = `indicium-rapport-${data.filters.year}-tour-${
      data.filters.round
    }-${new Date().toISOString().split("T")[0]}.pdf`;
    doc.save(fileName);
  }

  // Méthode publique pour l'export du dashboard
  async exportDashboard(stats: ElectionStats): Promise<void> {
    const { year, round } = useFiltersStore.getState();

    const reportData: PDFReportData = {
      title: "Rapport d'Analyse Électorale",
      date: new Date().toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      stats,
      filters: {
        year: year?.toString() || "2022",
        round: round?.toString() || "1",
      },
    };

    await this.generateDashboardReport(reportData);
  }
}

export const pdfExportService = new PDFExportService();
