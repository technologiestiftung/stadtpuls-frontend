import { FC, useState } from "react";
import { SensorsListRow } from "@components/SensorsListRow";
import { ParsedSensorType } from "@lib/hooks/usePublicSensors";
import { MarkerMap } from "@components/MarkerMap";
import { Pagination, PaginationType } from "@components/Pagination";
import { useRouter } from "next/router";
import { SensorsListRowLoadingSkeleton } from "@components/SensorsListRowLoadingSkeleton";
import { Alert } from "@components/Alert";
import { useWindowSize } from "@lib/hooks/useWindowSize";
import MapIcon from "../../../public/images/icons/16px/map.svg";
import ListIcon from "../../../public/images/icons/16px/list.svg";
import { Switch } from "@headlessui/react";

interface SensorsMapType {
  sensors?: ParsedSensorType[];
  paginationProps: Omit<
    PaginationType,
    "numberOfDisplayedPages" | "marginPagesDisplayed"
  >;
  sensorsAreLoading?: boolean;
  error?: Error;
}

function isInViewport(el: HTMLLIElement): boolean {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function scrollToTargetAdjusted(el: HTMLLIElement): void {
  if (isInViewport(el)) return;
  const paddingTop = 10;
  const elementPosition = el.getBoundingClientRect().top;
  const footerHeight =
    document.querySelector("#__next > footer")?.getBoundingClientRect()
      .height || 0;
  const headerHeight =
    document.querySelector("#__next > main > header")?.getBoundingClientRect()
      .height || 0;
  const maxScrollDist =
    document.documentElement.scrollHeight -
    window.outerHeight -
    footerHeight +
    headerHeight;
  const offsetPosition =
    elementPosition + window.pageYOffset - headerHeight - paddingTop;

  window.scrollTo({
    top: Math.min(offsetPosition, maxScrollDist),
    behavior: "smooth",
  });
}

export const SensorsMap: FC<SensorsMapType> = ({
  sensors = [],
  paginationProps,
  sensorsAreLoading = false,
  error,
}) => {
  const { push } = useRouter();
  const [hoveredSensorIds, setHoveredSensorIds] = useState<number[]>([]);
  const [showList, setShowList] = useState(true);
  const { width: windowWidth } = useWindowSize();
  const isSm = windowWidth && windowWidth < 640;

  const markers = sensors.map(sensor => ({
    ...sensor,
    isActive: true,
    isHighlighted: hoveredSensorIds.includes(sensor.id),
  }));
  return (
    <>
      {isSm && (
        <div
          className={[
            "bg-white rounded-full border border-gray-200",
            "fixed w-[calc(100vw-2rem)] left-4 bottom-4 z-20",
            "shadow flex transform justify-center gap-2",
            "transition-transform translate-y-0",
            !showList && isSm && "-translate-y-6",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              setShowList(false);
            }}
            className={[
              "px-4 py-3 flex gap-2 items-center justify-center",
              !showList && "font-bold text-blue",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            Karte <MapIcon />
          </button>
          <div className='grid items-center justify-center'>
            <Switch
              checked={showList}
              onChange={setShowList}
              className={`bg-blue relative inline-flex items-center h-6 rounded-full w-11`}
            >
              <span
                className={`${
                  showList ? "translate-x-6" : "translate-x-1"
                } inline-block w-4 h-4 transform bg-white rounded-full`}
              />
            </Switch>
          </div>
          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              setShowList(true);
            }}
            className={[
              "px-4 py-3 flex gap-2 items-center justify-center",
              showList && "font-bold text-blue",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            Liste <ListIcon />
          </button>
        </div>
      )}
      <section className='sm:grid sm:grid-cols-2 relative'>
        <aside
          className={[
            "p-4 bg-white overflow-y-auto",
            !showList && isSm && "hidden",
            showList && isSm && "pt-8 pb-24",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <div
            className={[
              "sm:mt-1 md:mt-2",
              "mb-4 sm:mb-5 md:mb-6",
              "flex place-content-between",
              "px-2",
            ].join(" ")}
          >
            <h1
              className={[
                "font-bold text-lg sm:text-xl md:text-2xl font-headline",
              ].join(" ")}
            >
              Alle Sensoren
            </h1>
            <h2 className='text-gray-600 mt-0 md:mt-2'>
              Seite {paginationProps.currentPage} von{" "}
              {paginationProps.pageCount}
            </h2>
          </div>
          {error?.message && (
            <Alert
              type='error'
              title='Fehler'
              message={
                <>
                  Die Sensoren konnten nicht geladen werden: <br />
                  <code className='px-2 py-1 font-mono bg-error bg-opacity-20'>
                    {error.message}
                  </code>
                </>
              }
              isRemovable={false}
            />
          )}
          {!error && (
            <ul className='flex flex-col w-[calc(100%+16px)] ml-[-8px]'>
              {sensorsAreLoading
                ? Array.from(Array(30).keys()).map(i => (
                    <SensorsListRowLoadingSkeleton key={i} />
                  ))
                : markers.map(marker => (
                    <SensorsListRow
                      {...marker}
                      isHighlighted={
                        !!hoveredSensorIds.find(s => s === marker.id)
                      }
                      onMouseEnter={
                        !isSm
                          ? () => setHoveredSensorIds([marker.id])
                          : undefined
                      }
                      onMouseLeave={() => setHoveredSensorIds([])}
                      onHighlighted={(_id, el) => scrollToTargetAdjusted(el)}
                      key={marker.id}
                    />
                  ))}
            </ul>
          )}
          <div className='mt-12 flex justify-center'>
            <Pagination
              {...paginationProps}
              numberOfDisplayedPages={5}
              marginPagesDisplayed={1}
            />
          </div>
        </aside>
        <div
          className={[
            "h-[calc(100vh-62px)] sticky w-full top-[62px]",
            isSm && showList && "hidden",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <MarkerMap
            clickHandler={ids => {
              if (ids.length === 0) return;
              const sensor = sensors.find(s => s.id === ids[0]);
              if (!sensor) return;
              const path = `${sensor.authorUsername}/sensors/${sensor.id}`;
              void push(path, path, { scroll: false });
            }}
            highlightedMarkerIds={hoveredSensorIds}
            mouseEnterHandler={
              !isSm ? ids => setHoveredSensorIds(ids) : undefined
            }
            mouseLeaveHandler={() => setHoveredSensorIds([])}
            markers={markers}
            markersAreLoading={sensorsAreLoading}
          />
        </div>
      </section>
    </>
  );
};
