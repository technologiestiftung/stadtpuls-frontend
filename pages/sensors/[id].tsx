import { PublicSensorType } from "@lib/hooks/usePublicSensors";
import { getSensorData } from "@lib/requests/getSensorData";
import { GetServerSideProps } from "next";
import { FC } from "react";

export const getServerSideProps: GetServerSideProps = async context => {
  try {
    const sensorId = context.query.id;
    if (!sensorId || Array.isArray(sensorId)) return { notFound: true };

    const sensorData = await getSensorData(parseInt(sensorId, 10));
    return { props: { sensor: sensorData, error: null } };
  } catch (error) {
    return { notFound: true };
  }
};

const SensorPage: FC<{
  sensor: PublicSensorType;
}> = ({ sensor }) => {
  return (
    <>
      <h1>Sensor page: {sensor.name || ""}</h1>
      <p>I am a sensor page</p>
      <p>ID: {sensor.id}</p>
    </>
  );
};

export default SensorPage;
