import { useState, useEffect, FC } from "react";
import ReactMapGL, {
  FlyToInterpolator,
  InteractiveMapProps,
  Marker,
  WebMercatorViewport,
} from "react-map-gl";
import { useMeasure } from "react-use";
import { bbox, featureCollection, point } from "@turf/turf";
import { MarkerType } from "../../common/interfaces";
import { MarkerCircle } from "../MarkerCircle";
import { ViewportType } from "@common/types/ReactMapGl";

import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

type FlyToPropType = Pick<
  ViewportType,
  "transitionDuration" | "transitionEasing" | "transitionInterpolator"
>;

const easeInOutQuint = (t: number): number =>
  t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
const smoothFlyToProps: FlyToPropType = {
  transitionDuration: 1000,
  transitionInterpolator: new FlyToInterpolator(),
  transitionEasing: easeInOutQuint,
};

const directFlyToProps: FlyToPropType = {
  transitionDuration: 0,
  transitionInterpolator: undefined,
  transitionEasing: t => t,
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
}

export const MarkerMap: FC<MarkerMapType> = ({
  markers,
  clickHandler,
  mouseEnterHandler,
  mouseLeaveHandler,
  mapZoom = 12,
  withMapLabels = true,
  markersPadding = 80,
  ...otherProps
}) => {
  const [loaded, setLoaded] = useState(false);
  const [mapContainerRef, { width, height }] = useMeasure<HTMLDivElement>();
  const [viewport, setViewport] = useState<ViewportType>({
    latitude: markers[0].latitude,
    longitude: markers[0].longitude,
    width: width || 1200,
    height: height || 800,
    zoom: mapZoom,
    ...smoothFlyToProps,
  } as ViewportType);

  useEffect(() => {
    if (width == 0 || height == 0) return;
    if (markers.length === 1) {
      setViewport({
        ...viewport,
        latitude: markers[0].latitude,
        longitude: markers[0].longitude,
        ...smoothFlyToProps,
      });
      return;
    }

    const features = featureCollection(
      markers.map((marker: MarkerType) =>
        point([marker.longitude, marker.latitude])
      )
    );

    const [minX, minY, maxX, maxY] = bbox(features);

    const { latitude, longitude, zoom } = new WebMercatorViewport(
      viewport
    ).fitBounds(
      [
        [minX, minY],
        [maxX, maxY],
      ],
      { padding: markersPadding }
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
  }, [loaded, width, height]);

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
