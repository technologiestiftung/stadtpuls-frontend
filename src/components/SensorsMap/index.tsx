import { FC } from "react";
import { SensorsListRow } from "@components/SensorsListRow";
import { ParsedSensorType } from "@lib/hooks/usePublicSensors";
import { MarkerMap } from "@components/MarkerMap";

interface SensorsMapType {
  sensors: ParsedSensorType[];
}

export const SensorsMap: FC<SensorsMapType> = ({ sensors }) => {
  return (
    <section className='grid grid-cols-2 h-screen'>
      <aside className='p-4 bg-white'>
        <h2 className='text-xl font-bold'>Sensors</h2>
        <ul className='flex flex-col'>
          {sensors &&
            sensors.map(sensor => (
              <SensorsListRow {...sensor} key={sensor.id} />
            ))}
        </ul>
      </aside>
      <section className='grid'>
        <MarkerMap
          clickHandler={() => undefined}
          markers={sensors.map(sensor => ({
            ...sensor,
            isActive: true,
          }))}
        />
      </section>
    </section>
  );
};
