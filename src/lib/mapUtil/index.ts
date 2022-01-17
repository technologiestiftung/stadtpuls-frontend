import { MarkerType } from "@common/interfaces";
import { ViewportType } from "@common/types/ReactMapGl";
import { BBox, bbox, Feature, featureCollection, point } from "@turf/turf";
import { WebMercatorViewport } from "react-map-gl";

interface CoordinatesType {
  latitude: number;
  longitude: number;
}

export function isWithinBounds(
  [west, south, east, north]: BBox,
  { latitude, longitude }: CoordinatesType
): boolean {
  return (
    latitude < north && latitude > south && longitude < east && longitude > west
  );
}

export const markersArrayToFeatures = (markers: MarkerType[]): Feature[] =>
  markers.map(marker => ({
    type: "Feature",
    id: marker.id,
    properties: {
      cluster: false,
      ...marker,
    },
    geometry: {
      type: "Point",
      coordinates: [marker.longitude, marker.latitude],
    },
  }));

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
