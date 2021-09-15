import { FC } from "react";
import { ProjectsList } from "@components/ProjectsList";
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
    console.log(error);
    return { notFound: true };
  }
};

const SensorsOverview: FC<SensorsOverviewPropType> = ({ sensorsData }) => {
  if (!sensorsData) return null;
  else return <ProjectsList sensors={sensorsData.sensors} />;
};

export default SensorsOverview;
