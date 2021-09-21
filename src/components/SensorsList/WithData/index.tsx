import { DevicesType, ProjectsType } from "@common/types/supabase_DEPRECATED";
/* import { useUserData } from "@lib/hooks/useUserData"; */
import { FC } from "react";
/* import { SensorsList } from ".."; */

/* const getLastRecordedAt = (records: RecordsType[]): Date | null => {
  const sortedRecords = records
    .filter(record => record.recordedAt)
    .map(record => ({
      ...record,
      recordedAt: new Date(record.recordedAt),
    }))
    .sort((a, b) => b.recordedAt.getTime() - a.recordedAt.getTime());

  if (sortedRecords.length === 0) return null;
  return sortedRecords[0].recordedAt;
}; */

interface SensorsListWithDataPropType {
  projectId: ProjectsType["id"];
  devices: DevicesType[];
}

export const SensorsListWithData: FC<SensorsListWithDataPropType> = () => {
  /* const { updateDevice, addDevice, deleteDevice } = useUserData(); */

  return <div>SensorsList. TODO: To be deleted.</div>;

  /* return (
    <SensorsList
      sensors={(devices || []).map(device => ({
        id: device.id,
        externalId: device.externalId,
        lastRecordedAt: Array.isArray(device.records)
          ? getLastRecordedAt(device.records)
          : null,
        name: device.name || "",
      }))}
      onChange={data =>
        updateDevice({
          ...data,
          id: parseInt(`${data.id}`, 10),
        })
      }
      onAdd={data => addDevice({ ...data, projectId })}
      onDelete={id => deleteDevice(parseInt(`${id}`, 10))}
    />
  ); */
};
