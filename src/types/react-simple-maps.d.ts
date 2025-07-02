declare module "react-simple-maps" {
  import { ReactNode } from "react";

  export interface ComposableMapProps {
    projection?: string;
    projectionConfig?: {
      center?: [number, number];
      scale?: number;
    };
    width?: number;
    height?: number;
    children?: ReactNode;
  }

  export interface GeographiesProps {
    geography: string;
    children: (props: { geographies: Geography[] }) => ReactNode;
  }

  export interface GeographyProps {
    geography: Geography;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    style?: {
      default?: object;
      hover?: object;
      pressed?: object;
    };
  }

  export interface Geography {
    rsmKey: string;
    properties: {
      nom: string;
      [key: string]: any;
    };
  }

  export const ComposableMap: React.FC<ComposableMapProps>;
  export const Geographies: React.FC<GeographiesProps>;
  export const Geography: React.FC<GeographyProps>;
}
