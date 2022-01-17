import { useState, useEffect, useRef, FC } from "react";
import ReactMapGL, {
  FlyToInterpolator,
  InteractiveMapProps,
  MapRef,
  Marker,
} from "react-map-gl";
import { useMeasure } from "react-use";
import { MarkerType } from "../../common/interfaces";
import { MarkerCircle } from "../MarkerCircle";
import { ViewportType } from "@common/types/ReactMapGl";

import "mapbox-gl/dist/mapbox-gl.css";
import { fitFeatureToBounds, isWithinBounds } from "@lib/mapUtil";
import { easeInOutQuint, linear } from "@lib/easingUtil";

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

const fallbackBounds = {
  _ne: { lat: 0, lng: 0 },
  _sw: { lat: 0, lng: 0 },
};

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

  const idsString = markers.map(m => m.id).join(",");

  useEffect(() => {
    if (!highlightedMarkerId || !mapRef.current) return;
    const mapGL = mapRef.current.getMap() as MapType | undefined;
    const bounds = mapGL?.getBounds() || fallbackBounds;
    const limits = {
      north: bounds._ne.lat,
      south: bounds._sw.lat,
      west: bounds._sw.lng,
      east: bounds._ne.lng,
    };
    const highlightedMarker = markers.find(m => m.id === highlightedMarkerId);
    if (!highlightedMarker) return;
    if (isWithinBounds(limits, highlightedMarker)) return;
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

  const markersGroupedByLatLng = markers.reduce<Record<string, MarkerType>>(
    (acc, marker) => {
      const latLngKey = `${marker.latitude}-${marker.longitude}`;
      const prevElWithSameLatLng = acc[latLngKey];
      return {
        ...acc,
        [latLngKey]: {
          ...marker,
          children:
            typeof prevElWithSameLatLng?.children === "number"
              ? prevElWithSameLatLng.children + 1
              : 1,
        },
      };
    },
    {}
  );

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
          Object.values(markersGroupedByLatLng).map(marker => (
            <Marker
              key={marker.id}
              latitude={marker.latitude}
              longitude={marker.longitude}
            >
              <MarkerCircle
                {...marker}
                clickHandler={() => clickHandler && clickHandler(marker.id)}
                mouseEnterHandler={() =>
                  mouseEnterHandler && mouseEnterHandler(marker.id)
                }
                mouseLeaveHandler={() =>
                  mouseLeaveHandler && mouseLeaveHandler(marker.id)
                }
              >
                {marker.children && marker.children > 1 ? marker.children : ""}
              </MarkerCircle>
            </Marker>
          ))}
      </ReactMapGL>
    </div>
  );
};
