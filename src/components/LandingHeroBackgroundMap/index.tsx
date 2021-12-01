import { FC, useEffect, useState } from "react";
import { MarkerMap } from "@components/MarkerMap";
import { ParsedSensorType } from "@lib/hooks/usePublicSensors";
import { useWindowSize } from "@lib/hooks/useWindowSize";

export interface LandingHeroBackgroundMapPropType {
  sensors: ParsedSensorType[];
  activeMarkerIndex: number;
  onMarkerChange: (markerIndex: number) => void;
}

export const LandingHeroBackgroundMap: FC<LandingHeroBackgroundMapPropType> = ({
  sensors,
  activeMarkerIndex,
  onMarkerChange,
}) => {
  const [mapHeight, setMapHeight] = useState(1000);
  const [mapWidth, setMapWidth] = useState(1000);

  const { width: windowWidth } = useWindowSize();

  useEffect(() => {
    const updateWidthAndHeight = (): void => {
      const slider = document.getElementsByClassName("swiper-wrapper")[0];
      if (!slider) return;

      setMapHeight(
        window.innerWidth / (windowWidth && windowWidth < 640 ? 1.5 : 3)
      );
      setMapWidth(window.innerWidth);
    };

    updateWidthAndHeight();
    window.addEventListener("resize", updateWidthAndHeight);
    return () => window.removeEventListener("resize", updateWidthAndHeight);
  }, [windowWidth]);

  return (
    <div
      className='relative overflow-hidden pointer-events-none'
      style={{ height: mapHeight }}
    >
      <MarkerMap
        mapWidth={mapWidth}
        mapHeight={mapHeight}
        mapZoom={9}
        scrollZoom={false}
        dragPan={false}
        dragRotate={false}
        clickHandler={markerIndex => onMarkerChange(markerIndex)}
        markers={sensors.map((sensor, markerIndex) => {
          return {
            latitude: sensor.latitude,
            longitude: sensor.longitude,
            isActive: markerIndex === activeMarkerIndex,
            id: markerIndex,
          };
        })}
      />
    </div>
  );
};
