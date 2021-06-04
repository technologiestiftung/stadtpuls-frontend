import { ViewportType } from "@common/types/ReactMapGl";

interface GeoFeatureType {
  center: [latitude: number, longitude: number];
}
interface GeocodeingResponseType {
  features: GeoFeatureType[];
}

interface RetrunedViewportType extends Partial<ViewportType> {
  latitude: number;
  longitude: number;
}

type GeocodeingReturnType = RetrunedViewportType | null;

export async function getGeocodedViewportByString(
  location: string | null
): Promise<GeocodeingReturnType> {
  if (!location) return null;
  const encordedLocation = encodeURI(location);
  const res = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${encordedLocation}.json?access_token=${
      process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ""
    }`
  );
  if (!res.ok)
    throw new Error(
      `Error ${res.statusText} - Geocoding the following location failed: "${location}"`
    );
  const { features } = (await res.json()) as GeocodeingResponseType;

  return {
    latitude: features[0].center[1],
    longitude: features[0].center[0],
  };
}
