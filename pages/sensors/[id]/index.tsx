import { getSensorData } from "@lib/requests/getSensorData";
import { GetServerSideProps } from "next";
import { FC } from "react";

export const getServerSideProps: GetServerSideProps = async context => {
  const sensorId = context.query.id;
  if (!sensorId || Array.isArray(sensorId)) return { notFound: true };

  const sensor = await getSensorData(parseInt(sensorId, 10));

  if (!sensor) return { notFound: true };

  return {
    redirect: {
      destination: `/${sensor.authorUsername}/sensors/${sensor.id}`,
      permanent: true,
    },
    props: {},
  };
};

const Nothing: FC = () => null;

export default Nothing;
