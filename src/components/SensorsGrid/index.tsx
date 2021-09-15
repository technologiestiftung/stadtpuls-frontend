import { FC } from "react";
import { SensorCard } from "@components/SensorCard";
import { PublicSensorType } from "@lib/hooks/usePublicSensors";

interface SensorsGridType {
  sensors: PublicSensorType[];
}

export const SensorsGrid: FC<SensorsGridType> = ({ sensors }) => {
  return (
    <div className='p-4 sm:p-6 md:p-8'>
      <div
        className='grid sm:grid-cols-2 2xl:grid-cols-3 mx-auto gap-4 sm:gap-6 md:gap-8'
        style={{ maxWidth: 1920 }}
      >
        {sensors &&
          sensors.map(sensor => {
            return (
              <SensorCard
                {...sensor}
                key={sensor.id}
                parsedRecords={sensor.parsedRecords}
              />
            );
          })}
      </div>
    </div>
  );
};
