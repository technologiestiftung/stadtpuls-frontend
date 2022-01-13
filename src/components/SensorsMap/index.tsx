import { FC } from "react";
import { SensorsList } from "@components/SensorsList";
import { ParsedSensorType } from "@lib/hooks/usePublicSensors";
import { MarkerMap } from "@components/MarkerMap";
import { Pagination, PaginationType } from "@components/Pagination";

interface SensorsMapType {
  sensors: ParsedSensorType[];
  paginationProps: Omit<
    PaginationType,
    "numberOfDisplayedPages" | "marginPagesDisplayed"
  >;
}

export const SensorsMap: FC<SensorsMapType> = ({
  sensors,
  paginationProps,
}) => {
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
        <SensorsList sensors={sensors} />
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
          clickHandler={() => undefined}
          markers={sensors.map(sensor => ({
            ...sensor,
            isActive: true,
          }))}
        />
      </div>
    </section>
  );
};
