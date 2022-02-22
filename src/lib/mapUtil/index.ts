import { MarkerType } from "@common/interfaces";
import { ViewportType } from "@common/types/ReactMapGl";
import { easeInOutQuint, linear } from "@lib/easingUtil";
import { BBox, bbox, Feature, featureCollection, point } from "@turf/turf";
import { FlyToInterpolator, WebMercatorViewport } from "react-map-gl";

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

interface PointFeatureType extends Omit<Feature, "geometry"> {
  geometry: {
    type: "Point";
    coordinates: [number, number];
  };
}

export const markersArrayToFeatures = (
  markers: MarkerType[]
): PointFeatureType[] =>
  markers.map(marker => ({
    type: "Feature" as const,
    id: marker.id,
    properties: {
      cluster: false,
      ...marker,
    },
    geometry: {
      type: "Point" as const,
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

  try {
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
  } catch (e) {
    return viewport;
  }
}

type FlyToPropType = Pick<
  ViewportType,
  "transitionDuration" | "transitionEasing" | "transitionInterpolator"
>;

const flyInterpolator: FlyToInterpolator = new FlyToInterpolator();
export const smoothFlyToProps: FlyToPropType = {
  transitionDuration: 1000,
  transitionInterpolator: flyInterpolator,
  transitionEasing: easeInOutQuint,
};

export const directFlyToProps: FlyToPropType = {
  transitionDuration: 0,
  transitionInterpolator: undefined,
  transitionEasing: linear,
};
