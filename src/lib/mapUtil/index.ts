import { ViewportType } from "@common/types/ReactMapGl";
import { bbox, featureCollection, point } from "@turf/turf";
import { WebMercatorViewport } from "react-map-gl";

interface CoordinatesType {
  latitude: number;
  longitude: number;
}
interface BoundsType {
  north: number;
  south: number;
  east: number;
  west: number;
}

export function isWithinBounds(
  bounds: BoundsType,
  { latitude, longitude }: CoordinatesType
): boolean {
  return (
    latitude < bounds.north &&
    latitude > bounds.south &&
    longitude < bounds.east &&
    longitude > bounds.west
  );
}

export function fitFeatureToBounds(
  items: CoordinatesType[],
  viewport: ViewportType,
  padding: number
): CoordinatesType & {
  zoom: number;
} {
  const features = featureCollection(
    items.map(({ latitude, longitude }) => point([longitude, latitude]))
  );
  const [minX, minY, maxX, maxY] = bbox(features);

  const { latitude, longitude, zoom } = new WebMercatorViewport(
    viewport
  ).fitBounds(
    [
      [minX, minY],
      [maxX, maxY],
    ],
    { padding: padding }
  );
  return { latitude, longitude, zoom };
}
