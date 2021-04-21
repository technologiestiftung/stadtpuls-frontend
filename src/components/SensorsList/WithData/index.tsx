import { DevicesType, ProjectsType, RecordsType } from "@common/types/supabase";
import { useUserData } from "@lib/hooks/useUserData";
import { FC } from "react";
import { SensorsList } from "..";

const getLastRecordedAt = (records: RecordsType[]): Date | null => {
  const sortedRecords = records
    .filter(record => record.recordedAt)
    .map(record => ({
      ...record,
      recordedAt: new Date(record.recordedAt),
    }))
    .sort((a, b) => a.recordedAt.getTime() - b.recordedAt.getTime());

  if (sortedRecords.length === 0) return null;
  return sortedRecords[0].recordedAt;
};

interface SensorsListWithDataPropType {
  projectId: ProjectsType["id"];
  devices: DevicesType[];
}

export const SensorsListWithData: FC<SensorsListWithDataPropType> = ({
  projectId,
  devices,
}) => {
  const { updateDevice, addDevice, deleteDevice } = useUserData();

  return (
    <div className='p-3 pb-8'>
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
            projectId,
            id: parseInt(`${data.id}`, 10),
          })
        }
        onAdd={data => addDevice({ ...data, projectId }, projectId)}
        onDelete={id => deleteDevice(parseInt(`${id}`, 10))}
      />
    </div>
  );
};
