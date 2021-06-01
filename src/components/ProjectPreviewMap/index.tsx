import ReactMapGL from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { ViewportType } from "@common/types/ReactMapGl";
import useGeocodedLocation from "@lib/hooks/useGeocodedLocation";

const defaultViewport = {
  latitude: 52.5065133,
  longitude: 13.2845544,
  zoom: 10,
};

export const ProjectPreviewMap: React.FC<{
  mapWidth: number;
  mapHeight: number;
  viewport?: ViewportType;
  location?: string;
}> = ({ mapWidth, mapHeight, viewport, location }) => {
  const cleanLocation = location && !viewport ? location : null;
  const { viewport: locationViewport } = useGeocodedLocation(cleanLocation);
  const finalViewport = {
    ...defaultViewport,
    ...(locationViewport || {}),
    ...(viewport || {}),
  };
  return (
    <ReactMapGL
      {...finalViewport}
      latitude={finalViewport.latitude - 0.01}
      longitude={finalViewport.longitude - 0.1}
      width={mapWidth}
      height={mapHeight}
      mapStyle='mapbox://styles/mapbox/light-v10'
      mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
    />
  );
};
