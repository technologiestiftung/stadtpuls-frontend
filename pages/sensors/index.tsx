import { FC } from "react";
import { SensorsGrid } from "@components/SensorsGrid";
import { GetServerSideProps } from "next";
import {
  getPublicSensors,
  PublicSensorType,
} from "@lib/hooks/usePublicSensors";

interface SensorsOverviewPropType {
  sensorsData: {
    count: number;
    sensors: PublicSensorType[];
  };
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const sensorsData = await getPublicSensors();
    return { props: { sensorsData } };
  } catch (error) {
    console.error("Error when fetching sensors:");
    console.error(error);
    return { notFound: true };
  }
};

const SensorsOverview: FC<SensorsOverviewPropType> = ({ sensorsData }) => {
  if (!sensorsData || sensorsData.sensors.length === 0)
    return (
      <h1 className='flex justify-center mt-8'>Keine Sensordaten vorhanden</h1>
    );
  return (
    <div className='container mx-auto max-w-8xl py-24 px-4'>
      <h1
        className={[
          "font-bold text-xl sm:text-2xl md:text-3xl font-headline",
          "sm:mt-1 md:mt-2",
          "mb-4 sm:mb-5 md:mb-6",
        ].join(" ")}
      >
        Alle Sensoren
      </h1>
      <SensorsGrid sensors={sensorsData.sensors} />
    </div>
  );
};

export default SensorsOverview;
