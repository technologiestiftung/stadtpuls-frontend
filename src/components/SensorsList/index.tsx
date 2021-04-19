import { formatDateFromNow } from "@lib/dateUtil";
import { FC } from "react";

interface SensorType {
  id: string | number;
  name: string;
  lastRecordedAt?: Date | null;
}

interface SensorsListPropType {
  sensors: SensorType[];
  onEdit?: (id: string | number) => void;
  onDelete?: (id: string | number) => void;
}

export const SensorsList: FC<SensorsListPropType> = ({
  sensors,
  onEdit = () => undefined,
  onDelete = () => undefined,
}) => (
  <table>
    <thead>
      <tr>
        <th>Gerät-ID</th>
        <th>Anzeigename</th>
        <th>Letztes Signal</th>
        <th />
      </tr>
    </thead>
    <tbody>
      {sensors.map(({ id, name, lastRecordedAt }) => (
        <tr key={id}>
          <td>device-{id}</td>
          <td>{name}</td>
          <td>{lastRecordedAt ? formatDateFromNow(lastRecordedAt) : "—"}</td>
          <td>
            <button onClick={() => onDelete(id)}>Löschen</button>
          </td>
          <td>
            <button onClick={() => onEdit(id)}>Bearbeiten</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
