import { FC, useState } from "react";
import { SensorsListRow } from "@components/SensorsListRow";
import { ParsedSensorType } from "@lib/hooks/usePublicSensors";
import { MarkerMap } from "@components/MarkerMap";
import { Pagination, PaginationType } from "@components/Pagination";
import { useRouter } from "next/router";

interface SensorsMapType {
  sensors?: ParsedSensorType[];
  paginationProps: Omit<
    PaginationType,
    "numberOfDisplayedPages" | "marginPagesDisplayed"
  >;
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
}) => {
  const { push } = useRouter();
  const [hoveredSensorId, setHoveredSensorId] = useState<number | null>(null);
  return (
    <section className='grid grid-cols-2 relative'>
      <aside className='p-4 bg-white overflow-y-auto'>
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
            Seite {paginationProps.currentPage} von {paginationProps.pageCount}
          </h2>
        </div>
        <ul className='flex flex-col w-[calc(100%+16px)] ml-[-8px]'>
          {sensors.map((sensor: ParsedSensorType) => (
            <SensorsListRow
              {...sensor}
              isHighlighted={hoveredSensorId === sensor.id}
              onMouseEnter={() => setHoveredSensorId(sensor.id)}
              onMouseLeave={() => setHoveredSensorId(null)}
              onHighlighted={(_id, el) => scrollToTargetAdjusted(el)}
              key={sensor.id}
            />
          ))}
        </ul>
        <div className='mt-12 flex justify-center'>
          <Pagination
            {...paginationProps}
            numberOfDisplayedPages={5}
            marginPagesDisplayed={1}
          />
        </div>
      </aside>
      <div className='h-[calc(100vh-62px)] sticky w-full top-[62px]'>
        <MarkerMap
          clickHandler={id => {
            const sensor = sensors.find(s => s.id === id);
            if (!sensor) return;
            void push(`${sensor.authorUsername}/sensors/${sensor.id}`);
          }}
          highlightedMarkerId={hoveredSensorId || undefined}
          mouseEnterHandler={id => setHoveredSensorId(id)}
          mouseLeaveHandler={() => setHoveredSensorId(null)}
          markers={sensors.map(sensor => ({
            ...sensor,
            isActive: true,
            isHighlighted: hoveredSensorId === sensor.id,
          }))}
        />
      </div>
    </section>
  );
};
