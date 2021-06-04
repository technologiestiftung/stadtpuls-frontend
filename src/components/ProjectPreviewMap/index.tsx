import ReactMapGL from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { ViewportType } from "@common/types/ReactMapGl";

export const ProjectPreviewMap: React.FC<{
  mapWidth: number;
  mapHeight: number;
  viewport: Partial<ViewportType>;
}> = ({ mapWidth, mapHeight, viewport }) => (
  <ReactMapGL
    {...viewport}
    width={mapWidth}
    height={mapHeight}
    mapStyle='mapbox://styles/mapbox/light-v10'
    mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
  />
);
