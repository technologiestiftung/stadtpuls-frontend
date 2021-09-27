import { FC } from "react";
import { SensorCard } from "@components/SensorCard";
import { ParsedSensorType } from "@lib/hooks/usePublicSensors";

interface SensorsGridType {
  sensors: ParsedSensorType[];
  showAuthorNames?: boolean;
}

export const SensorsGrid: FC<SensorsGridType> = ({
  sensors,
  showAuthorNames = true,
}) => {
  return (
    <div className='grid sm:grid-cols-2 2xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8'>
      {sensors &&
        sensors.map(sensor => {
          return (
            <SensorCard
              {...sensor}
              authorName={showAuthorNames ? sensor.authorName : ""}
              key={sensor.id}
            />
          );
        })}
    </div>
  );
};
