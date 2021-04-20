import { FC, useEffect, useState } from "react";
import { usePrevious } from "@lib/hooks/usePrevious";
import { SensorType, SubmissionDataType } from "./SensorsListTypes";
import { SensorsListDispalyRow } from "./SensorsListDispalyRow";
import { SensorsListEditRow } from "./SensorsListEditRow";
import { SensorsListHeaderRow } from "./SensorsListHeaderRow";
import { EmptySensorsLink } from "./EmptySensorsLink";
import { NewSensorForm } from "./NewSensorForm";

interface SensorsListPropType {
  sensors: SensorType[];
  onChange?: (data: SensorType) => void;
  onAdd?: (data: SensorType) => void;
  onDelete?: (id: string | number) => void;
}

interface SensorsListItemPropType extends SensorType {
  onChange: (data: SubmissionDataType) => void;
  onDelete: (id: SensorType["id"]) => void;
}

const SensorListItem: FC<SensorsListItemPropType> = props => {
  const { onChange, onDelete, ...sensor } = props;
  const [isInEditMode, setIsInEditMode] = useState<boolean>(false);
  const [currentDraft, setFormDraft] = useState<SubmissionDataType>(sensor);
  const previousProps = usePrevious<SensorsListItemPropType>(props);
  const hasChanged =
    currentDraft.externalId !== sensor.externalId ||
    currentDraft.name !== sensor.name;

  useEffect(() => {
    if (
      props.externalId === previousProps?.externalId &&
      props.name === previousProps?.name &&
      props.lastRecordedAt === previousProps?.lastRecordedAt
    )
      return;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { onChange, onDelete, ...newDraft } = props;
    setFormDraft(newDraft);
  }, [previousProps, props]);

  const Component = isInEditMode ? SensorsListEditRow : SensorsListDispalyRow;
  return (
    <Component
      {...sensor}
      onEditClick={() => setIsInEditMode(true)}
      onDeleteClick={() => onDelete(sensor.id)}
      currentDraft={currentDraft}
      onDraftChange={setFormDraft}
      onClickOutside={() => !hasChanged && setIsInEditMode(false)}
      onSubmit={() => {
        if (hasChanged) {
          setIsInEditMode(false);
          onChange(currentDraft);
        } else {
          setIsInEditMode(false);
          setFormDraft(sensor);
        }
      }}
      onCancel={() => {
        setIsInEditMode(false);
        setFormDraft(sensor);
      }}
    />
  );
};

export const SensorsList: FC<SensorsListPropType> = ({
  sensors,
  onChange = () => undefined,
  onAdd = () => undefined,
  onDelete = () => undefined,
}) => {
  const [isAddingSensor, setIsAddingSensor] = useState<boolean>(false);

  return (
    <>
      <table className='w-full text-left'>
        <SensorsListHeaderRow />
        <tbody>
          {sensors.length === 0 && !isAddingSensor && (
            <EmptySensorsLink onClick={() => setIsAddingSensor(true)} />
          )}
          {sensors.map(({ id, externalId, name, lastRecordedAt }) => (
            <SensorListItem
              key={id}
              id={id}
              externalId={externalId}
              name={name}
              lastRecordedAt={lastRecordedAt}
              onChange={onChange}
              onDelete={onDelete}
            />
          ))}
          {isAddingSensor && (
            <NewSensorForm
              onSubmit={(data: SubmissionDataType) => {
                setIsAddingSensor(false);
                onAdd(data);
              }}
              onCancel={() => setIsAddingSensor(false)}
            />
          )}
        </tbody>
      </table>
      {sensors.length > 0 && !isAddingSensor && (
        <div className='text-right mt-8'>
          <button onClick={() => setIsAddingSensor(true)}>
            Sensor hinzufügen
          </button>
        </div>
      )}
    </>
  );
};
