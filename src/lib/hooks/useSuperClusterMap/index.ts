import Supercluster from "supercluster";
import { MarkerType } from "@common/interfaces";
import { BBox, Properties } from "@turf/turf";
import { RefObject, useRef } from "react";
import { MapRef } from "react-map-gl";
import useSupercluster from "use-supercluster";
import { markersArrayToFeatures } from "@lib/mapUtil";

interface MapType {
  getBounds: () => {
    _ne: { lat: number; lng: number };
    _sw: { lat: number; lng: number };
    toArray: () => {
      flat: () => BBox;
    };
  };
}

type SuperClusterType =
  | Supercluster.PointFeature<Properties>
  | Supercluster.PointFeature<
      Supercluster.ClusterProperties & Supercluster.AnyProps
    >;

interface UseSuperClusterMapInputType {
  markers: MarkerType[];
  zoom: number;
}
interface UseSuperClusterMapOutputType {
  clusters: SuperClusterType[];
  supercluster: Supercluster;
  mapRef: RefObject<MapRef>;
  map: MapType | undefined;
  bounds: BBox;
}

const fallbackBounds = [0, 0, 0, 0, 0, 0] as BBox;

export const useSuperClusterMap = ({
  markers,
  zoom,
}: UseSuperClusterMapInputType): UseSuperClusterMapOutputType => {
  const mapRef = useRef<MapRef>(null);
  const map = mapRef.current?.getMap() as MapType | undefined;
  const bounds = map?.getBounds().toArray().flat() || fallbackBounds;
  const points = markersArrayToFeatures(markers);
  const useSuperClusterResult = useSupercluster({
    points,
    bounds,
    zoom,
    options: { radius: 30, maxZoom: 20 },
  });
  const clusters = useSuperClusterResult.clusters;
  const supercluster = useSuperClusterResult.supercluster as Supercluster;

  return {
    mapRef,
    map,
    supercluster,
    clusters,
    bounds,
  };
};
