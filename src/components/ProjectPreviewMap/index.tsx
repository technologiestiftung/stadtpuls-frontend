import ReactMapGL, { AttributionControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { InteractiveMapProps } from "react-map-gl/src/components/interactive-map";
import styles from "./ProjectPreviewMap.module.css";

export const ProjectPreviewMap: React.FC<{
  mapWidth: number | string;
  mapHeight: number | string;
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
    attributionControl={false}
    className={styles.mapContainer}
  >
    <AttributionControl compact={true} style={{ top: 8, right: 8 }} />
  </ReactMapGL>
);
