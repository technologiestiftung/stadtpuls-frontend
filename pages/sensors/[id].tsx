import {
  getPublicSensors,
  PublicSensorType,
} from "@lib/hooks/usePublicSensors";
import { GetServerSideProps } from "next";
import { FC } from "react";

export const getServerSideProps: GetServerSideProps = async context => {
  try {
    const sensorId = context.query.id;
    if (!sensorId || Array.isArray(sensorId)) return { notFound: true };

    // TODO: this is not working yet. We need to fetch data for the one sensor corresponding to the sensor ID from the query
    const sensorData = await getPublicSensors();
    return { props: { sensor: sensorData, error: null } };
  } catch (error) {
    return { notFound: true };
  }
};

const SensorPage: FC<{
  sensor: PublicSensorType;
}> = ({ sensor }) => {
  console.log("sensor:", sensor);

  return (
    <>
      <h1>Sensor page</h1>
      <p>I am a sensor page</p>
      <p>ID: {sensor.id}</p>
    </>
  );
};

export default SensorPage;
