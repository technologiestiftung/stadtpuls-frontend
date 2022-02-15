import { FC } from "react";
import { usePublicSensors } from "@lib/hooks/usePublicSensors";
import router, { useRouter } from "next/router";
import { SensorsMap } from "@components/SensorsMap";
import { useReducedMotion } from "@lib/hooks/useReducedMotion";
import { useSensorsRecords } from "@lib/hooks/useSensorsRecords";

interface SensorsOverviewPropType {
  rangeStart: number;
  rangeEnd: number;
  page: number;
  totalSensors: number;
}

export const MAX_SENSORS_PER_PAGE = 30;

export const getRangeByPageNumber = (page: number): [number, number] => {
  const rangeStart = (page - 1) * MAX_SENSORS_PER_PAGE;
  const rangeEnd = rangeStart + MAX_SENSORS_PER_PAGE - 1;
  return [rangeStart, rangeEnd];
};

const handlePageChange = ({
  selectedPage,
  pageCount,
}: {
  selectedPage: number;
  pageCount: number;
}): Promise<boolean> => {
  const path = router.pathname;
  const query =
    selectedPage === 1 || selectedPage > pageCount
      ? ""
      : `page=${selectedPage}`;

  return router.push({
    pathname: path,
    query: query,
  });
};

const SensorsOverview: FC<SensorsOverviewPropType> = () => {
  const { reload, query } = useRouter();
  const reducedMotionIsWished = useReducedMotion(false);

  const page =
    typeof query.page === "string" ? parseInt(query.page, 10) || 1 : 1;
  const [rangeStart, rangeEnd] = getRangeByPageNumber(page);
  const { sensors, count, error, isLoading } = usePublicSensors({
    rangeStart,
    rangeEnd,
  });
  const ids = sensors.map(({ id }) => id);
  const { sensorsRecordsMap } = useSensorsRecords(ids);
  const sensorsAreThere =
    !error && Array.isArray(sensors) && sensors.length > 0;
  const totalPages = count ? Math.ceil(count / MAX_SENSORS_PER_PAGE) : 1;
  const pageIsWithinPageCount = page <= totalPages;
  const pageToRender = pageIsWithinPageCount ? page : 1;

  if (error?.message === "JWT expired") reload();

  const sensorsToDisplay = !isLoading && sensorsAreThere ? sensors : [];
  return (
    <div className='pt-[62px]'>
      <SensorsMap
        error={error || undefined}
        sensors={sensorsToDisplay.map(s => ({
          ...s,
          parsedRecords: sensorsRecordsMap[s.id],
        }))}
        sensorsAreLoading={isLoading}
        paginationProps={{
          currentPage: pageToRender,
          pageCount: totalPages,
          onPageChange: async ({ selected: selectedIndex }) => {
            window.scrollTo({
              top: 0,
              behavior: reducedMotionIsWished ? "auto" : "smooth",
            });
            await handlePageChange({
              selectedPage: selectedIndex + 1,
              pageCount: totalPages,
            });
          },
        }}
      />
    </div>
  );
};

export default SensorsOverview;
