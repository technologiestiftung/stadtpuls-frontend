import { SensorPageHeader } from "@components/SensorPageHeader";
import { PublicSensorType } from "@lib/hooks/usePublicSensors";
import { getSensorData } from "@lib/requests/getSensorData";
import { GetServerSideProps } from "next";
import { FC, useRef } from "react";

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
  const fallbackIconId = useRef(Math.random() * 10);
  return (
    <>
      <SensorPageHeader
        id={sensor.id}
        name={sensor.name || ""}
        description={sensor.description}
        category={sensor.category}
        symbol={sensor.icon_id || fallbackIconId.current}
        geocoordinates={{ latitude: 52.4961458, longitude: 13.4335723 }}
        author={{
          username: sensor.user.name || "anonymous",
          displayName: sensor.user.display_name || "Anonymous",
        }}
      />
    </>
  );
};

export default SensorPage;
