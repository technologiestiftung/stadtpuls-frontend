import { FC, useEffect, useState } from "react";
import { MarkerMap } from "@components/MarkerMap";
import { ParsedSensorType } from "@lib/hooks/usePublicSensors";

export interface LandingHeroBackgroundMapPropType {
  sensors: ParsedSensorType[];
  activeMarkerIndex: number;
}

const getElTopOffset = (el: Element): number => {
  const rect = el.getBoundingClientRect();
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return rect.top + scrollTop + rect.height / 2;
};

export const LandingHeroBackgroundMap: FC<LandingHeroBackgroundMapPropType> = ({
  sensors,
  activeMarkerIndex,
}) => {
  const [mapHeight, setMapHeight] = useState(1000);
  const [mapWidth, setMapWidth] = useState(1000);

  useEffect(() => {
    const updateWidthAndHeight = (): void => {
      const slider = document.getElementsByClassName("swiper-wrapper")[0];
      if (!slider) return;

      setMapHeight(getElTopOffset(slider));
      setMapWidth(window.innerWidth);
    };

    updateWidthAndHeight();
    window.addEventListener("resize", updateWidthAndHeight);
    return () => window.removeEventListener("resize", updateWidthAndHeight);
  }, []);

  return (
    <div
      className='relative overflow-hidden pointer-events-none'
      style={{ height: mapHeight }}
    >
      <MarkerMap
        mapWidth={mapWidth}
        mapHeight={typeof mapHeight === "string" ? mapHeight : mapHeight * 1.7}
        mapZoom={9}
        clickHandler={id => console.log(id)}
        markers={sensors.map((sensor, markerIndex) => {
          return {
            latitude: sensor.latitude,
            longitude: sensor.longitude,
            isActive: markerIndex === activeMarkerIndex,
            id: sensor.id,
          };
        })}
      />
    </div>
  );
};
