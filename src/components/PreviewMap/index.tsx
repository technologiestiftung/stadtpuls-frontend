import ReactMapGL, { AttributionControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { InteractiveMapProps } from "react-map-gl/src/components/interactive-map";
import styles from "./PreviewMap.module.css";
import { FC, useEffect, useState } from "react";
import { ViewportType } from "@common/types/ReactMapGl";

interface PreviewMapPropType {
  mapWidth: number | string;
  mapHeight: number | string;
  viewport: Partial<InteractiveMapProps>;
  withMapLabels?: boolean;
  className?: string;
  interactive?: boolean;
  onViewportChange?: (viewport: ViewportType) => void;
}

export const PreviewMap: FC<PreviewMapPropType> = ({
  mapHeight = "100%",
  mapWidth = "100%",
  viewport: initialViewport,
  withMapLabels = true,
  className = "",
  onViewportChange = () => undefined,
  interactive = false,
}) => {
  const [viewport, setViewport] = useState<Partial<InteractiveMapProps>>({
    latitude: initialViewport.latitude,
    longitude: initialViewport.longitude,
    zoom: initialViewport.zoom || 12,
    ...initialViewport,
  } as ViewportType);

  useEffect(() => {
    if (
      initialViewport.zoom === viewport.zoom &&
      initialViewport.latitude === viewport.latitude &&
      initialViewport.longitude === viewport.longitude
    )
      return;
    setViewport(initialViewport);
  }, [initialViewport]);

  const displayViewport = interactive ? viewport : initialViewport;

  return (
    <ReactMapGL
      {...displayViewport}
      zoom={displayViewport.zoom || 12}
      height={mapHeight}
      width={mapWidth}
      mapStyle={
        (withMapLabels
          ? process.env.NEXT_PUBLIC_MAPBOX_LABELS_TILESET_URL
          : process.env.NEXT_PUBLIC_MAPBOX_NO_LABELS_TILESET_URL) ||
        "mapbox://styles/mapbox/light-v10"
      }
      mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      attributionControl={false}
      className={`${className} ${styles.mapContainer}`}
      onViewportChange={(nextViewport: ViewportType) => {
        onViewportChange && onViewportChange(nextViewport);
        !onViewportChange && setViewport(nextViewport);
      }}
    >
      <AttributionControl
        compact={true}
        style={{ bottom: 8, right: 8 }}
        className={styles.mapParent}
      />
    </ReactMapGL>
  );
};
