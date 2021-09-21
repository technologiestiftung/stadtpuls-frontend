import ReactMapGL, { AttributionControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { InteractiveMapProps } from "react-map-gl/src/components/interactive-map";
import styles from "./PreviewMap.module.css";

export const PreviewMap: React.FC<{
  mapWidth: number | string;
  mapHeight: number | string;
  viewport: Partial<InteractiveMapProps>;
  withMapLabels?: boolean;
  className?: string;
}> = ({
  mapWidth,
  mapHeight,
  viewport,
  withMapLabels = true,
  className = "",
}) => (
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
    attributionControl={false}
    className={`${className} ${styles.mapContainer}`}
  >
    <AttributionControl
      compact={true}
      style={{ bottom: 8, right: 8 }}
      className={styles.mapParent}
    />
  </ReactMapGL>
);
