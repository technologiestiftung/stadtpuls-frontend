import {
  useState,
  useEffect,
  FC,
  SetStateAction,
  Dispatch,
  RefObject,
} from "react";
import ReactMapGL, { InteractiveMapProps, MapRef, Marker } from "react-map-gl";
import { useMeasure } from "react-use";
import { MarkerType } from "../../common/interfaces";
import { MarkerCircle } from "../MarkerCircle";
import { ViewportType } from "@common/types/ReactMapGl";
import "mapbox-gl/dist/mapbox-gl.css";
import {
  directFlyToProps,
  fitFeatureToBounds,
  isWithinBounds,
  smoothFlyToProps,
} from "@lib/mapUtil";
import { Properties } from "@turf/turf";
import Supercluster from "supercluster";
import { useSuperClusterMap } from "@lib/hooks/useSuperClusterMap";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

type ClickHandlerType = (markerIds: number[]) => void;

export interface MarkerMapType extends InteractiveMapProps {
  markers: MarkerType[];
  clickHandler?: ClickHandlerType;
  mouseEnterHandler?: ClickHandlerType;
  mouseLeaveHandler?: ClickHandlerType;
  withMapLabels?: boolean;
  mapZoom?: number;
  markersPadding?: number;
  highlightedMarkerIds?: number[];
  markersAreLoading?: boolean;
}

interface ClusterBaseType {
  type: "Feature";
  id: number;
  geometry: {
    coordinates: [number, number];
    type: "Point";
  };
}
interface ClusterType extends ClusterBaseType {
  properties: {
    cluster_id: number;
    cluster: true;
    point_count: number;
    point_count_abbreviated: number;
  };
}

interface NonClusterType extends ClusterBaseType {
  properties: MarkerType & {
    cluster: false;
  };
}

interface UseClusterMarkersMapInputType {
  markers: MarkerType[];
  defaultViewport: ViewportType;
  readyForDisplay: boolean;
  highlightedMarkerIds: number[];
  markersPadding: number;
}

type SuperClusterType =
  | Supercluster.PointFeature<Properties>
  | Supercluster.PointFeature<
      Supercluster.ClusterProperties & Supercluster.AnyProps
    >;

interface UseClusterMarkersMapOutputType {
  viewport: ViewportType;
  setViewport: Dispatch<SetStateAction<ViewportType>>;
  clusters: SuperClusterType[];
  supercluster: Supercluster;
  mapRef: RefObject<MapRef>;
}

const useClusterMarkersMap = ({
  markers,
  defaultViewport,
  readyForDisplay,
  highlightedMarkerIds,
  markersPadding,
}: UseClusterMarkersMapInputType): UseClusterMarkersMapOutputType => {
  const [viewport, setViewport] = useState<ViewportType>(defaultViewport);
  const { mapRef, map, clusters, supercluster, bounds } = useSuperClusterMap({
    markers,
    zoom: viewport.zoom,
  });
  const idsString = markers.map(m => m.id).join(",");

  useEffect(() => {
    if (highlightedMarkerIds.length === 0 || !map || markers.length === 0)
      return;
    const highlightedMarkers = markers.filter(m =>
      highlightedMarkerIds.find(id => id === m.id)
    );
    if (!highlightedMarkers || highlightedMarkers.length === 0) return;
    if (highlightedMarkers.every(m => isWithinBounds(bounds, m))) return;
    if (highlightedMarkers.length === 1) {
      setViewport((prevViewport: ViewportType) => ({
        ...prevViewport,
        latitude: highlightedMarkers[0].latitude,
        longitude: highlightedMarkers[0].longitude,
        ...smoothFlyToProps,
      }));
    } else {
      const { latitude, longitude, zoom } = fitFeatureToBounds(
        markers,
        viewport,
        markersPadding
      );
      setViewport((prevViewport: ViewportType) => ({
        ...prevViewport,
        latitude,
        longitude,
        zoom,
        ...smoothFlyToProps,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [highlightedMarkerIds]);

  useEffect(() => {
    if (!readyForDisplay) return;
    if (markers.length <= 1) {
      setViewport(defaultViewport);
      return;
    }

    const { latitude, longitude, zoom } = fitFeatureToBounds(
      markers,
      viewport,
      markersPadding
    );

    setViewport((prevViewport: ViewportType) => ({
      ...prevViewport,
      longitude,
      latitude,
      zoom,
      ...smoothFlyToProps,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [readyForDisplay, idsString]);

  return { viewport, setViewport, mapRef, clusters, supercluster };
};

export const MarkerMap: FC<MarkerMapType> = ({
  markers,
  clickHandler,
  mouseEnterHandler,
  mouseLeaveHandler,
  mapZoom = 12,
  withMapLabels = true,
  markersPadding = 80,
  highlightedMarkerIds = [],
  markersAreLoading = false,
  ...otherProps
}) => {
  const defaultCoordinates = {
    latitude: markers[0]?.latitude || 52.52,
    longitude: markers[0]?.longitude || 13.405,
  };
  const [mapIsLoaded, setLoaded] = useState(false);
  const [mapContainerRef, { width, height }] = useMeasure<HTMLDivElement>();
  const readyForDisplay =
    !markersAreLoading && mapIsLoaded && width > 0 && height > 0;
  const { mapRef, supercluster, clusters, viewport, setViewport } =
    useClusterMarkersMap({
      readyForDisplay,
      markers,
      markersPadding,
      highlightedMarkerIds,
      defaultViewport: {
        ...defaultCoordinates,
        width: width || 1200,
        height: height || 800,
        zoom: mapZoom,
        ...smoothFlyToProps,
      } as ViewportType,
    });

  return (
    <div ref={mapContainerRef} className='w-full h-full'>
      <ReactMapGL
        {...viewport}
        width={width}
        height={height}
        ref={mapRef}
        mapStyle={
          (withMapLabels
            ? process.env.NEXT_PUBLIC_MAPBOX_LABELS_TILESET_URL
            : process.env.NEXT_PUBLIC_MAPBOX_NO_LABELS_TILESET_URL) ||
          "mapbox://styles/mapbox/light-v10"
        }
        onViewportChange={(nextViewport: ViewportType) =>
          setViewport({
            ...nextViewport,
            ...directFlyToProps,
          })
        }
        mapboxApiAccessToken={MAPBOX_TOKEN}
        {...otherProps}
        onLoad={evt => {
          setLoaded(true);
          otherProps.onLoad && otherProps?.onLoad(evt);
        }}
      >
        {mapIsLoaded &&
          width > 0 &&
          height > 0 &&
          (clusters as ClusterType[] | NonClusterType[]).map(cluster => {
            const [longitude, latitude] = cluster.geometry.coordinates;
            const isCluster = cluster.properties.cluster;
            const isActive =
              "isActive" in cluster.properties
                ? cluster.properties.isActive
                : true;
            const pointCount =
              "point_count" in cluster.properties
                ? cluster.properties.point_count
                : 0;
            const id = "id" in cluster.properties ? cluster.properties.id : 0;
            const leaves = isCluster
              ? supercluster.getLeaves(cluster.id, Infinity)
              : [];
            const leavesIds = leaves.map(
              leaf => (leaf?.properties?.id as number) || 0
            );

            const handlers = !isCluster
              ? {
                  clickHandler: () => clickHandler && clickHandler([id]),
                  mouseEnterHandler: () =>
                    mouseEnterHandler && mouseEnterHandler([id]),
                  mouseLeaveHandler: () =>
                    mouseLeaveHandler && mouseLeaveHandler([id]),
                }
              : {
                  clickHandler: () => {
                    const expansionZoom = Math.min(
                      supercluster.getClusterExpansionZoom(cluster.id),
                      20
                    );
                    setViewport({
                      ...viewport,
                      latitude: cluster.geometry.coordinates[1],
                      longitude: cluster.geometry.coordinates[0],
                      zoom: expansionZoom,
                      ...smoothFlyToProps,
                    });
                  },
                  mouseEnterHandler: () =>
                    mouseEnterHandler && mouseEnterHandler(leavesIds),
                  mouseLeaveHandler: () =>
                    mouseLeaveHandler && mouseLeaveHandler(leavesIds),
                };

            const isHighlighted = isCluster
              ? supercluster
                  .getLeaves(cluster.id)
                  .some(leaf =>
                    highlightedMarkerIds.find(id => id === leaf?.properties?.id)
                  )
              : cluster.properties.isHighlighted;

            return (
              <Marker
                key={cluster.id}
                latitude={latitude}
                longitude={longitude}
              >
                <MarkerCircle
                  {...cluster.properties}
                  {...handlers}
                  isActive={isActive}
                  isHighlighted={isHighlighted}
                >
                  {isCluster && pointCount > 1 ? pointCount : null}
                </MarkerCircle>
              </Marker>
            );
          })}
      </ReactMapGL>
    </div>
  );
};
