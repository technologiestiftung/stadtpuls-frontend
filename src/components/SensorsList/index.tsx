import { FC } from "react";
import { SensorsListRow } from "@components/SensorsListRow";
import { ParsedSensorType } from "@lib/hooks/usePublicSensors";

interface SensorsListType {
  sensors: ParsedSensorType[];
  showAuthorNames?: boolean;
}

export const SensorsList: FC<SensorsListType> = ({
  sensors,
  showAuthorNames = true,
}) => {
  return (
    <ul className='flex flex-col'>
      {sensors &&
        sensors.map(sensor => {
          return (
            <SensorsListRow
              {...sensor}
              authorName={showAuthorNames ? sensor.authorName : ""}
              key={sensor.id}
            />
          );
        })}
    </ul>
  );
};
