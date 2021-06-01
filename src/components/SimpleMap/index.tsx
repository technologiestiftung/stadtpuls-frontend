import ReactMapGL from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { ViewportType } from "@common/types/ReactMapGl";

const defaultViewport = {
  latitude: 52.5065133,
  longitude: 13.2445544,
  zoom: 10,
};

export const SimpleMap: React.FC<{
  mapWidth: number;
  mapHeight: number;
  viewport?: ViewportType;
}> = ({ mapWidth, mapHeight, viewport = {} }) => {
  return (
    <ReactMapGL
      {...{
        ...defaultViewport,
        ...viewport,
      }}
      width={mapWidth}
      height={mapHeight}
      mapStyle='mapbox://styles/mapbox/light-v10'
      mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
    />
  );
};
