export interface GeoJSONProps {
  type: 'FeatureCollection';
  features: Array<{
    type: 'Feature';
    geometry: {
      type: string;
      coordinates: number[] | number[][] | number[][][];
    };
    properties: {
      color_hex: string;
      [key: string]: any;
    };
  }>;
}
