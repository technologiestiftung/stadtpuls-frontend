/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, WebMercatorViewport } from "react-map-gl";
import { bbox, featureCollection, point } from "@turf/turf";
import { jsx } from "theme-ui";
import { MarkerType } from "../../common/interfaces";
import { MarkerCircle } from "../MarkerCircle";
import { ViewportType } from "@common/types/ReactMapGl";

// import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

type ClickHandlerType = (markerId: number) => void;

export const MarkerMap: React.FC<{
  markers: MarkerType[];
  clickHandler: ClickHandlerType;
  mapWidth: number;
  mapHeight: number;
}> = ({ markers, clickHandler, mapWidth, mapHeight }) => {
  const [viewport, setViewport] = useState<ViewportType>({
    latitude: 52.520952,
    longitude: 13.400033,
    zoom: 12,
    bearing: 0,
    pitch: 0,
    maxZoom: 16,
    width: mapWidth,
    height: mapHeight,
  } as ViewportType);

  const latLonItems: { latitude: number; longitude: number }[] = markers.map(
    (marker: MarkerType) => {
      return {
        latitude: marker.latitude,
        longitude: marker.longitude,
      };
    }
  );

  const allDevicesHaveSameLocation: boolean = latLonItems.every(item => {
    return (
      item.latitude === latLonItems[0].latitude &&
      item.longitude === latLonItems[0].longitude
    );
  });

  useEffect(() => {
    if (markers.length === 1 || allDevicesHaveSameLocation) {
      setViewport({
        ...viewport,
        latitude: markers[0].latitude,
        longitude: markers[0].longitude,
      });
      return;
    }

    const features = featureCollection(
      markers.map((marker: MarkerType) => {
        return point([marker.longitude, marker.latitude]);
      })
    );

    const [minX, minY, maxX, maxY] = bbox(features);

    const { latitude, longitude, zoom } = new WebMercatorViewport({
      ...viewport,
      width: mapWidth,
      height: mapHeight,
    }).fitBounds(
      [
        [minX, minY],
        [maxX, maxY],
      ],
      { padding: 24 }
    );

    const newViewport: ViewportType = {
      ...viewport,
      longitude,
      latitude,
      zoom,
    };

    setViewport(newViewport);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [markers, mapWidth, mapHeight]);

  const handleClick: ClickHandlerType = (markerId: number) => {
    clickHandler(markerId);
  };

  return (
    <ReactMapGL
      {...viewport}
      width={mapWidth}
      height={mapHeight}
      mapStyle='mapbox://styles/technologiestiftung/ckqv0ehnl80ww17nw3ytxz5r4'
      onViewportChange={(nextViewport: ViewportType) =>
        setViewport(nextViewport)
      }
      mapboxApiAccessToken={MAPBOX_TOKEN}
    >
      {!allDevicesHaveSameLocation &&
        markers.map((marker: MarkerType) => {
          return (
            <Marker
              key={marker.id}
              latitude={marker.latitude}
              longitude={marker.longitude}
            >
              <MarkerCircle
                isActive={marker.isActive}
                clickHandler={() => handleClick(marker.id)}
              ></MarkerCircle>
            </Marker>
          );
        })}
      {allDevicesHaveSameLocation && (
        <Marker latitude={markers[0].latitude} longitude={markers[0].longitude}>
          <MarkerCircle isActive>
            {markers.length === 1 ? "" : markers.length}
          </MarkerCircle>
        </Marker>
      )}
    </ReactMapGL>
  );
};
