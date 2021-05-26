import ReactMapGL from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export const SimpleMap: React.FC<{
  mapWidth: number;
  mapHeight: number;
}> = ({ mapWidth, mapHeight }) => {
  return (
    <ReactMapGL
      width={mapWidth}
      height={mapHeight}
      mapStyle='mapbox://styles/mapbox/light-v10'
      mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
    />
  );
};
