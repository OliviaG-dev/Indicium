// Types pour les cartes et géographie
export interface GeoProperties {
  nom: string;
  [key: string]: unknown;
}

export interface Geo {
  rsmKey: string;
  properties: GeoProperties;
}

export interface GeographiesProps {
  geographies: Geo[];
}
