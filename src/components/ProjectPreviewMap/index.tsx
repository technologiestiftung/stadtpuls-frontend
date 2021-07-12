import ReactMapGL from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { InteractiveMapProps } from "react-map-gl/src/components/interactive-map";

export const ProjectPreviewMap: React.FC<{
  mapWidth: number;
  mapHeight: number;
  viewport: Partial<InteractiveMapProps>;
}> = ({ mapWidth, mapHeight, viewport }) => (
  <ReactMapGL
    zoom={10}
    {...viewport}
    width={mapWidth}
    height={mapHeight}
    mapStyle={
      process.env.NEXT_PUBLIC_MAPBOX_TILESET_URL ||
      "mapbox://styles/mapbox/light-v10"
    }
    mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
  />
);
