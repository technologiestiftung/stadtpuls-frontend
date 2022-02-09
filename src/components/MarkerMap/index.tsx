import {
  useState,
  useEffect,
  FC,
  SetStateAction,
  Dispatch,
  RefObject,
} from "react";
import ReactMapGL, {
  AttributionControl,
  InteractiveMapProps,
  MapRef,
  Marker,
  WebMercatorViewport,
} from "react-map-gl";
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
import { MapControls } from "@components/MapControls";
import styles from "./MarkerMap.module.css";
import MapIcon from "../../../public/images/icons/16px/map.svg";
import { useWindowSize } from "@lib/hooks/useWindowSize";
import { GeoSearchField } from "@components/GeoSearchField";

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
  withControls?: boolean;
  withPlaceSearch?: boolean;
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
  const [viewport, setViewport] = useState<ViewportType>({
    ...defaultViewport,
    bearing: 0,
  });
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
        bearing: 0,
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
        bearing: 0,
        ...smoothFlyToProps,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [highlightedMarkerIds]);

  useEffect(() => {
    if (!readyForDisplay) return;
    if (markers.length <= 1) {
      setViewport({ ...defaultViewport, bearing: 0 });
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
      bearing: 0,
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
  withControls = true,
  withPlaceSearch = true,
  className = "",
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
  const { width: windowWidth } = useWindowSize();
  const isSm = windowWidth && windowWidth < 640;
  const maxZoom = otherProps.maxZoom || 20;

  return (
    <div
      ref={mapContainerRef}
      className='w-full h-full relative'
      data-cy={`marker-map-${mapIsLoaded ? "loaded" : "loading"}`}
    >
      <ReactMapGL
        {...viewport}
        width={width}
        height={height}
        ref={mapRef}
        attributionControl={false}
        className={`${className} ${styles.mapContainer} ${
          withPlaceSearch ? styles.withSearch : ""
        }`}
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
            bearing: 0,
          })
        }
        mapboxApiAccessToken={MAPBOX_TOKEN}
        maxZoom={maxZoom}
        {...otherProps}
        onLoad={evt => {
          setLoaded(true);
          otherProps.onLoad && otherProps?.onLoad(evt);
        }}
        keyboard={false}
      >
        {withControls && (
          <MapControls
            style={{
              bottom: isSm && withPlaceSearch ? 64 : 8,
              right: 8,
            }}
            onViewportChange={(nextViewport: ViewportType) => {
              setViewport({
                ...nextViewport,
                ...smoothFlyToProps,
                transitionDuration: 500,
                bearing: 0,
              });
            }}
          />
        )}
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
                      maxZoom
                    );
                    setViewport({
                      ...viewport,
                      latitude: cluster.geometry.coordinates[1],
                      longitude: cluster.geometry.coordinates[0],
                      zoom: expansionZoom,
                      bearing: 0,
                      ...smoothFlyToProps,
                    });
                  },
                  mouseEnterHandler: () =>
                    mouseEnterHandler && mouseEnterHandler(leavesIds),
                  mouseLeaveHandler: () =>
                    mouseLeaveHandler && mouseLeaveHandler(leavesIds),
                };

            const isHighlighted = isCluster
              ? leaves.some(leaf =>
                  highlightedMarkerIds.find(id => id === leaf?.properties?.id)
                )
              : cluster.properties.isHighlighted;

            return (
              <Marker
                key={cluster.id}
                latitude={latitude}
                longitude={longitude}
              >
                {viewport.zoom >= maxZoom && isCluster ? (
                  <div
                    data-cy='same-position-markers-group'
                    className={[
                      "bg-white rounded-xl",
                      "transform -translate-x-1/2 -translate-y-1/2",
                      "grid",
                      leaves.length === 2 ||
                        (leaves.length === 4 && "grid-cols-2"),
                      (leaves.length === 3 ||
                        leaves.length === 5 ||
                        leaves.length === 6 ||
                        leaves.length === 7 ||
                        leaves.length === 9) &&
                        "grid-cols-3",
                      leaves.length >= 10 &&
                        leaves.length < 17 &&
                        "grid-cols-4",
                      leaves.length >= 17 &&
                        leaves.length < 26 &&
                        "grid-cols-5",
                      leaves.length >= 26 && "grid-cols-6",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    {leaves.map(leaf => (
                      <MarkerCircle
                        key={leaf.id}
                        {...leaf.properties}
                        clickHandler={() =>
                          clickHandler &&
                          typeof leaf.id === "number" &&
                          clickHandler([leaf.id])
                        }
                        mouseEnterHandler={() =>
                          mouseEnterHandler &&
                          typeof leaf.id === "number" &&
                          mouseEnterHandler([leaf.id])
                        }
                        mouseLeaveHandler={() =>
                          mouseLeaveHandler &&
                          typeof leaf.id === "number" &&
                          mouseLeaveHandler([leaf.id])
                        }
                        isActive={Boolean(leaf.properties.isActive)}
                        isHighlighted={Boolean(leaf.properties.isHighlighted)}
                      />
                    ))}
                  </div>
                ) : (
                  <span className='inline-block transform -translate-x-1/2 -translate-y-1/2'>
                    <MarkerCircle
                      {...cluster.properties}
                      {...handlers}
                      isActive={isActive}
                      isHighlighted={isHighlighted}
                    >
                      {isCluster && pointCount > 1 ? pointCount : null}
                    </MarkerCircle>
                  </span>
                )}
              </Marker>
            );
          })}
        <AttributionControl
          compact={true}
          style={
            withPlaceSearch
              ? { bottom: isSm ? 64 : 8, left: 8 }
              : { top: 20, left: 16 }
          }
          className={`${styles.mapParent}`}
        />
        {withPlaceSearch && (
          <GeoSearchField
            onPlaceClick={item => {
              let newViewport = {
                latitude: item.latitude,
                longitude: item.longitude,
                zoom: mapZoom,
              };
              if (item.bbox) {
                const { latitude, longitude, zoom } = new WebMercatorViewport(
                  viewport
                ).fitBounds(
                  [
                    [item.bbox[0], item.bbox[1]],
                    [item.bbox[2], item.bbox[3]],
                  ],
                  { padding: markersPadding }
                );
                newViewport = { latitude, longitude, zoom };
              }
              setViewport((prevViewport: ViewportType) => ({
                ...prevViewport,
                ...smoothFlyToProps,
                ...newViewport,
              }));
            }}
          />
        )}
        {markersAreLoading && (
          <div
            className={[
              "absolute inset-0 bg-white bg-opacity-90 grid items-center",
              "justify-center z-50 font-bold",
            ].join(" ")}
          >
            <span className='flex gap-2 items-center leading-3'>
              <MapIcon /> Karte Lädt...
            </span>
          </div>
        )}
      </ReactMapGL>
    </div>
  );
};
