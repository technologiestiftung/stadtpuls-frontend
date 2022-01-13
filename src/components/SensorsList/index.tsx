import { FC } from "react";
import { SensorsListRow } from "@components/SensorsListRow";
import { ParsedSensorType } from "@lib/hooks/usePublicSensors";

interface SensorsListType {
  sensors: ParsedSensorType[];
}

export const SensorsList: FC<SensorsListType> = ({ sensors }) => {
  return (
    <ul className='flex flex-col w-[calc(100%+16px)] ml-[-8px]'>
      {sensors &&
        sensors.map(sensor => <SensorsListRow {...sensor} key={sensor.id} />)}
    </ul>
  );
};
