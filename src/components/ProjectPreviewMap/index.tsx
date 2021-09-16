import ReactMapGL from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { InteractiveMapProps } from "react-map-gl/src/components/interactive-map";

export const ProjectPreviewMap: React.FC<{
  mapWidth: number | string;
  mapHeight: number | string;
  viewport: Partial<InteractiveMapProps>;
  withMapLabels?: boolean;
}> = ({ mapWidth, mapHeight, viewport, withMapLabels = true }) => (
  <ReactMapGL
    zoom={10}
    {...viewport}
    width={mapWidth}
    height={mapHeight}
    mapStyle={
      (withMapLabels
        ? process.env.NEXT_PUBLIC_MAPBOX_LABELS_TILESET_URL
        : process.env.NEXT_PUBLIC_MAPBOX_NO_LABELS_TILESET_URL) ||
      "mapbox://styles/mapbox/light-v10"
    }
    mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
  />
);
