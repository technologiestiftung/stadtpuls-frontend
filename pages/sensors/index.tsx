import { useState, FC, useEffect } from "react";
import { GetServerSideProps } from "next";
import { usePublicSensors } from "@lib/hooks/usePublicSensors";
import router, { useRouter } from "next/router";
import { SensorsMap } from "@components/SensorsMap";
import { supabase } from "@auth/supabase";
import { definitions } from "@common/types/supabase";

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

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const page = Array.isArray(query.page) ? 1 : Number.parseInt(query.page) || 1;
  const [rangeStart, rangeEnd] = getRangeByPageNumber(page);

  const { count: totalSensors, error } = await supabase
    .from<definitions["sensors"]>("sensors")
    .select("name", { count: "exact", head: true });

  if (error) {
    console.error("Error when fetching totalSensors");
    console.error(error);
    return { notFound: true };
  }

  return { props: { page, rangeStart, rangeEnd, totalSensors } };
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

const SensorsOverview: FC<SensorsOverviewPropType> = ({
  rangeStart,
  rangeEnd,
  page,
  totalSensors,
}) => {
  const { reload } = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const { sensors, error } = usePublicSensors({
    rangeStart,
    rangeEnd,
  });
  const sensorsAreThere =
    !error && Array.isArray(sensors) && sensors.length > 0;
  const totalPages = Math.ceil(totalSensors / MAX_SENSORS_PER_PAGE);
  const pageIsWithinPageCount = page <= totalPages;
  const pageToRender = pageIsWithinPageCount ? page : 1;

  useEffect(() => {
    if (error || sensors?.length !== 0) {
      setIsLoading(false);
    }
  }, [sensors, error]);

  if (error?.message === "JWT expired") reload();

  return (
    <div className='pt-[62px]'>
      <SensorsMap
        error={error || undefined}
        sensors={!isLoading && sensorsAreThere ? sensors : []}
        sensorsAreLoading={isLoading}
        paginationProps={{
          currentPage: pageToRender,
          pageCount: totalPages,
          onPageChange: async ({ selected: selectedIndex }) => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            setIsLoading(true);
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
