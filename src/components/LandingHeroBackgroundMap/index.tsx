import { FC, useEffect, useState } from "react";
import { PublicProject } from "@lib/hooks/usePublicProjects";
import { ViewportType } from "@common/types/ReactMapGl";
import { getGeocodedViewportByString } from "@lib/requests/getGeocodedViewportByString";
import { MarkerMap } from "@components/MarkerMap";

interface LandingHeroBackgroundMapPropType {
  project: PublicProject;
}

type LatLngType = Pick<ViewportType, "latitude" | "longitude">;
const location2ViewportCache: Record<string, LatLngType> = {};

export const LandingHeroBackgroundMap: FC<LandingHeroBackgroundMapPropType> = ({
  project,
}) => {
  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const [locationViewport, setLocationViewport] = useState<LatLngType | null>(
    null
  );

  useEffect(() => {
    const updateWidthAndHeight = (): void => {
      if (typeof window === "undefined") return;
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };

    updateWidthAndHeight();
    window.addEventListener("resize", updateWidthAndHeight);
    return () => window.removeEventListener("resize", updateWidthAndHeight);
  }, []);

  useEffect(() => {
    let isMounted = true;
    if (!project.location) return;
    const cachedViewport = location2ViewportCache[project.location];

    if (cachedViewport && isMounted) {
      setLocationViewport(cachedViewport);
      return;
    }

    void getGeocodedViewportByString(project.location).then(viewport => {
      if (!project.location || !viewport) return;
      location2ViewportCache[project.location] = {
        latitude: viewport.latitude,
        longitude: viewport.longitude,
      };
      isMounted && setLocationViewport(viewport);
    });
    return () => {
      isMounted = false;
    };
  }, [project.location, locationViewport]);

  if (!locationViewport) return null;
  return (
    <div
      className='relative overflow-hidden pointer-events-none'
      style={{ height: "200vh" }}
    >
      <MarkerMap
        mapWidth={windowWidth}
        mapHeight={Math.round(windowHeight * 3)}
        clickHandler={() => undefined}
        markers={[
          {
            ...locationViewport,
            isActive: true,
            id: 0,
          },
        ]}
      />
      <div className='absolute bg-gradient-to-b from-white inset-0' />
    </div>
  );
};
