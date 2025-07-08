// Types pour les données électorales
export interface ElectionData {
  Inscrits: string;
  Votants: string;
  Blancs: string;
  Nuls: string;
  Abstentions: string;
}

export interface ElectionStats {
  participation: number;
  abstention: number;
  blancsNuls: number;
  totalVotants: number;
  dataSource: "API" | "Simulated";
}

export interface KPI {
  title: string;
  value: string;
  icon?: React.ReactElement;
}

// Types pour les résultats des candidats
export type CandidateResult = {
  name: string;
  votes: number;
  percent: number;
  color?: string;
};

// Types pour les données régionales
export type RegionData = {
  nom: string;
  macron: number;
  lepen: number;
  gagnant: string;
  participation: number;
};
