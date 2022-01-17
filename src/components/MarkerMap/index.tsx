import { useState, useEffect, useRef, FC } from "react";
import ReactMapGL, {
  FlyToInterpolator,
  InteractiveMapProps,
  MapRef,
  Marker,
} from "react-map-gl";
import { useMeasure } from "react-use";
import useSupercluster from "use-supercluster";
import { MarkerType } from "../../common/interfaces";
import { MarkerCircle } from "../MarkerCircle";
import { ViewportType } from "@common/types/ReactMapGl";

import "mapbox-gl/dist/mapbox-gl.css";
import {
  fitFeatureToBounds,
  isWithinBounds,
  markersArrayToFeatures,
} from "@lib/mapUtil";
import { easeInOutQuint, linear } from "@lib/easingUtil";
import { BBox } from "@turf/turf";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

type FlyToPropType = Pick<
  ViewportType,
  "transitionDuration" | "transitionEasing" | "transitionInterpolator"
>;

const flyInterpolator: FlyToInterpolator = new FlyToInterpolator();
const smoothFlyToProps: FlyToPropType = {
  transitionDuration: 1000,
  transitionInterpolator: flyInterpolator,
  transitionEasing: easeInOutQuint,
};

const directFlyToProps: FlyToPropType = {
  transitionDuration: 0,
  transitionInterpolator: undefined,
  transitionEasing: linear,
};

const fallbackBounds = [0, 0, 0, 0, 0, 0] as BBox;

type ClickHandlerType = (markerId: number) => void;

export interface MarkerMapType extends InteractiveMapProps {
  markers: MarkerType[];
  clickHandler?: ClickHandlerType;
  mouseEnterHandler?: ClickHandlerType;
  mouseLeaveHandler?: ClickHandlerType;
  withMapLabels?: boolean;
  mapZoom?: number;
  markersPadding?: number;
  highlightedMarkerId?: number;
}

interface MapType {
  getBounds: () => {
    _ne: { lat: number; lng: number };
    _sw: { lat: number; lng: number };
    toArray: () => {
      flat: () => BBox;
    };
  };
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

export const MarkerMap: FC<MarkerMapType> = ({
  markers,
  clickHandler,
  mouseEnterHandler,
  mouseLeaveHandler,
  mapZoom = 12,
  withMapLabels = true,
  markersPadding = 80,
  highlightedMarkerId,
  ...otherProps
}) => {
  const defaultCoordinates = {
    latitude: markers[0]?.latitude || 52.52,
    longitude: markers[0]?.longitude || 13.405,
  };
  const [loaded, setLoaded] = useState(false);
  const mapRef = useRef<MapRef>(null);
  const [mapContainerRef, { width, height }] = useMeasure<HTMLDivElement>();
  const [viewport, setViewport] = useState<ViewportType>({
    ...defaultCoordinates,
    width: width || 1200,
    height: height || 800,
    zoom: mapZoom,
    ...smoothFlyToProps,
  } as ViewportType);
  const map = mapRef.current?.getMap() as MapType | undefined;
  const bounds = map?.getBounds().toArray().flat() || fallbackBounds;
  const points = markersArrayToFeatures(markers);
  const { clusters } = useSupercluster({
    points,
    bounds,
    zoom: viewport.zoom,
    options: { radius: 20, maxZoom: 20 },
  });

  const idsString = markers.map(m => m.id).join(",");

  useEffect(() => {
    if (!highlightedMarkerId || !mapRef.current) return;
    const highlightedMarker = markers.find(m => m.id === highlightedMarkerId);
    if (!highlightedMarker) return;
    if (isWithinBounds(bounds, highlightedMarker)) return;
    setViewport((prevViewport: ViewportType) => ({
      ...prevViewport,
      latitude: highlightedMarker.latitude,
      longitude: highlightedMarker.longitude,
      ...smoothFlyToProps,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [highlightedMarkerId]);

  useEffect(() => {
    if (width == 0 || height == 0) return;
    if (markers.length === 1) {
      setViewport({
        ...viewport,
        ...defaultCoordinates,
        ...smoothFlyToProps,
      });
      return;
    }

    const { latitude, longitude, zoom } = fitFeatureToBounds(
      markers,
      viewport,
      markersPadding
    );

    const newViewport: ViewportType = {
      ...viewport,
      longitude,
      latitude,
      zoom,
      ...smoothFlyToProps,
    };

    setViewport(newViewport);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded, width, height, idsString]);

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
        {loaded &&
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

            const handlers = !isCluster
              ? {
                  clickHandler: () => clickHandler && clickHandler(cluster.id),
                  mouseEnterHandler: () =>
                    mouseEnterHandler && mouseEnterHandler(cluster.id),
                  mouseLeaveHandler: () =>
                    mouseLeaveHandler && mouseLeaveHandler(cluster.id),
                }
              : {};

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
