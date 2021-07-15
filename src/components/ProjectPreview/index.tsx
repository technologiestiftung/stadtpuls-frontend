import { useEffect, useState, useRef, FC } from "react";
import Link from "next/link";
import { PublicProject } from "@lib/hooks/usePublicProjects";
import { ProjectPreviewMap } from "@components/ProjectPreviewMap";
import useIsInViewport from "use-is-in-viewport";
import { AreaPath } from "@components/AreaPath";
import { UserAvatar } from "@components/UserAvatar";
import { ViewportType } from "@common/types/ReactMapGl";
import { getGeocodedViewportByString } from "@lib/requests/getGeocodedViewportByString";

interface ProjectPreviewPropType extends PublicProject {
  withMapBackground?: boolean;
}

export const ProjectPreview: FC<ProjectPreviewPropType> = ({
  id,
  name,
  location,
  description,
  records,
  devicesNumber,
  authorName,
  category,
  withMapBackground = true,
}) => {
  const animationFrameRef = useRef(0);
  const parentRef = useRef<HTMLDivElement>(null);
  const [svgWrapperWidth, setSvgWrapperWidth] = useState(0);
  const [svgWrapperHeight, setSvgWrapperHeight] = useState(0);
  const [isInViewport, mapWrapperRef] = useIsInViewport({ threshold: 50 });
  const [locationViewport, setLocationViewport] = useState<Pick<
    ViewportType,
    "latitude" | "longitude"
  > | null>(null);

  useEffect(() => {
    const updateWidthAndHeight = (): void => {
      if (parentRef.current === null) return;
      setSvgWrapperWidth(parentRef.current.offsetWidth);
      setSvgWrapperHeight(parentRef.current.offsetHeight);

      animationFrameRef.current = requestAnimationFrame(updateWidthAndHeight);
    };

    animationFrameRef.current = requestAnimationFrame(updateWidthAndHeight);
    return () => cancelAnimationFrame(animationFrameRef.current);
  }, [parentRef]);

  useEffect(() => {
    let isMounted = true;
    if (locationViewport || !isInViewport || !location) return;
    void getGeocodedViewportByString(location).then(
      viewport => isMounted && setLocationViewport(viewport)
    );
    return () => {
      isMounted = false;
    };
  }, [location, isInViewport, locationViewport]);

  return (
    <div
      ref={parentRef}
      className={[
        "bg-white shadow hover:bg-gray-50",
        "border border-gray-200 group",
        "hover:animate-borderpulse",
        "cursor-pointer transition-all",
        "relative overflow-hidden group",
      ].join(" ")}
      style={{ paddingBottom: 100, minHeight: 340 }}
    >
      <Link href={`/${id}`}>
        <a href={`/${id}`} ref={mapWrapperRef}>
          {locationViewport && isInViewport && (
            <div
              className={[
                "absolute inset-0 overflow-hidden pointer-events-none",
                "transition opacity-40 group-hover:opacity-60",
              ].join(" ")}
              style={{
                animationDuration: "1s",
                animationFillMode: "both",
                animationName: "fadeIn",
                animationDelay: "1s",
              }}
            >
              {withMapBackground && (
                <>
                  <ProjectPreviewMap
                    viewport={locationViewport}
                    mapWidth={Math.round(svgWrapperWidth * 1.5)}
                    mapHeight={svgWrapperHeight}
                  />
                  <span
                    className={[
                      "absolute inset-0 bg-purple mix-blend-hue",
                      "pointer-events-none group-hover:animate-bgpulse",
                    ].join(" ")}
                  />
                </>
              )}
            </div>
          )}
          <div
            className={[
              "absolute inset-0 pointer-events-none",
              "bg-gradient-to-r from-white",
            ].join(" ")}
          />
          <div
            className={[
              "grid sm:grid-cols-6 gap-4",
              "px-4 py-3 sm:px-5 sm:py-4 md:px-8 md:py-7",
              "relative z-10",
            ].join(" ")}
          >
            <div className='sm:col-span-4'>
              <h3
                className={[
                  "font-headline text-xl sm:text-2xl md:text-3xl",
                  "font-bold flex justify-between items-start",
                ].join(" ")}
              >
                <span className='leading-8'>{name}</span>
                {category && (
                  <div
                    className={[
                      "sm:absolute z-10",
                      "text-base font-normal",
                      "ml-4 bg-white bg-opacity-50",
                      "right-0 bottom-0 sm:bottom-auto sm:right-5",
                      "sm:top-4 md:right-8 md:top-7",
                      "text-purple",
                      "bg-purple group-hover:animate-bgpulse",
                    ].join(" ")}
                  >
                    <span
                      className={[
                        "text-purple group-hover:animate-textpulse",
                        "bg-white bg-opacity-80 px-3 py-1 inline-block",
                      ].join(" ")}
                    >
                      {category}
                    </span>
                  </div>
                )}
              </h3>
              <p className='mt-4 mb-2 flex gap-2 flex-wrap'>
                {location && (
                  <>
                    <span className='font-bold inline-block'>{location}</span>
                    <span className='text-gray-400'>·</span>
                  </>
                )}
                <span className='inline-block'>
                  {devicesNumber} {devicesNumber > 1 ? "Sensoren" : "Sensor"}
                </span>
                {authorName && (
                  <>
                    <span className='text-gray-400'>·</span>
                    <span
                      className='inline-block truncate'
                      style={{ maxWidth: "calc(100vw - 64px)" }}
                    >
                      <UserAvatar
                        username={authorName}
                        size={20}
                        className='mr-1.5'
                      />
                      {authorName}
                    </span>
                  </>
                )}
              </p>
              <p className='text-base'>{description}</p>
            </div>
          </div>
          <svg
            viewBox={`0 0 ${svgWrapperWidth + 4} 82`}
            xmlns='http://www.w3.org/2000/svg'
            width={svgWrapperWidth + 4}
            height={82}
            className={[
              "overflow-visible absolute -bottom-1 -left-1 -right-1",
              "text-purple group-hover:animate-textpulse",
            ].join(" ")}
          >
            <AreaPath
              width={svgWrapperWidth + 4}
              height={82}
              //FIXME: Figure out how we want to handle multiple data points
              data={records}
            />
          </svg>
        </a>
      </Link>
    </div>
  );
};
