import { FC } from "react";
import { GetServerSideProps } from "next";
import { ParsedSensorType } from "@lib/hooks/usePublicSensors";
import router from "next/router";
import { getLandingStats } from "@lib/requests/getLandingStats";
import { getPublicSensors } from "@lib/requests/getPublicSensors";
import { SensorsMap } from "@components/SensorsMap";

interface SensorsOverviewPropType {
  sensors: ParsedSensorType[];
  sensorsCount: number;
  page: number;
}

export const MAX_SENSORS_PER_PAGE = 15;

export const getRangeByPageNumber = (page: number): [number, number] => {
  const rangeStart = (page - 1) * MAX_SENSORS_PER_PAGE;
  const rangeEnd = rangeStart + MAX_SENSORS_PER_PAGE - 1;
  return [rangeStart, rangeEnd];
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const page = Array.isArray(query.page) ? 1 : Number.parseInt(query.page) || 1;
  const [rangeStart, rangeEnd] = getRangeByPageNumber(page);
  try {
    const sensors = await getPublicSensors({ rangeStart, rangeEnd });
    const { sensorsCount } = await getLandingStats();
    return { props: { sensors, sensorsCount, page } };
  } catch (error) {
    console.error("Error when fetching sensors:");
    console.error(error);
    return { notFound: true };
  }
};

const handlePageChange = ({
  selectedPage,
  pageCount,
}: {
  selectedPage: number;
  pageCount: number;
}): void => {
  const path = router.pathname;
  const query =
    selectedPage === 1 || selectedPage > pageCount
      ? ""
      : `page=${selectedPage}`;

  void router.push({
    pathname: path,
    query: query,
  });
};

const SensorsOverview: FC<SensorsOverviewPropType> = ({
  sensors,
  sensorsCount,
  page,
}) => {
  const pageCount = Math.ceil(sensorsCount / MAX_SENSORS_PER_PAGE);
  const pageIsWithinPageCount = page <= pageCount;
  const pageToRender = pageIsWithinPageCount ? page : 1;

  if ((!sensors || sensors.length === 0) && pageIsWithinPageCount)
    return (
      <h1 className='flex justify-center mt-32'>Keine Sensordaten vorhanden</h1>
    );

  return (
    <div className='pt-[62px]'>
      <SensorsMap
        sensors={sensors}
        paginationProps={{
          currentPage: pageToRender,
          pageCount,
          onPageChange: ({ selected: selectedIndex }) => {
            handlePageChange({ selectedPage: selectedIndex + 1, pageCount });
          },
        }}
      />
    </div>
  );
};

export default SensorsOverview;
