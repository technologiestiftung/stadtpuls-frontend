import { FC, useEffect, useState } from "react";
import { usePrevious } from "@lib/hooks/usePrevious";
import { SensorType, SubmissionDataType } from "./SensorsListTypes";
import { SensorsListDispalyRow } from "./SensorsListDispalyRow";
import { SensorsListEditRow } from "./SensorsListEditRow";
import { SensorsListHeaderRow } from "./SensorsListHeaderRow";
import { EmptySensorsLink } from "./EmptySensorsLink";
import { NewSensorForm } from "./NewSensorForm";
import { SmallModalOverlay } from "@components/SmallModalOverlay";
import { Button } from "@components/Button";
import { DeviceIcon } from "./DeviceIcon";

interface SensorsListPropType {
  sensors: SensorType[];
  onChange: (data: SensorType) => void;
  onAdd: (data: Omit<SensorType, "id">) => void;
  onDelete: (id: number) => void;
}

interface SensorsListItemPropType extends SensorType {
  onChange: (data: SubmissionDataType) => void;
  onDelete: (sensor: SensorType) => void;
}

interface DeletionPromptPropType extends SensorType {
  onCancel: () => void;
  onConfirm: () => void;
}

const DeletionPrompt: FC<DeletionPromptPropType> = ({
  externalId,
  name,
  onConfirm,
  onCancel,
}) => (
  <SmallModalOverlay
    title='Bitte bestätige die Löschung des Sensors'
    variant='dangerous'
    footerContent={
      <div className='block w-full text-right'>
        <Button variant='dangerous' onClick={onConfirm}>
          Löschen
        </Button>
        <Button variant='primary' onClick={onCancel} className='ml-2'>
          Abbrechen
        </Button>
      </div>
    }
  >
    Der folgende Sensor wird unwiderruflich gelöscht.
    <div className='bg-blue-25 p-3 mt-2'>
      <DeviceIcon />
      <span className='mr-3 inline-block'>{externalId}</span>
      <span className='inline-block'>{name}</span>
    </div>
  </SmallModalOverlay>
);

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
      onDeleteClick={() => onDelete(sensor)}
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
  onChange,
  onAdd,
  onDelete,
}) => {
  const [isAddingSensor, setIsAddingSensor] = useState<boolean>(false);
  const [
    deviceBeingDeleted,
    setDeviceBeingDeleted,
  ] = useState<SensorType | null>(null);

  return (
    <div className='p-6 pb-8'>
      {deviceBeingDeleted && (
        <DeletionPrompt
          {...deviceBeingDeleted}
          onConfirm={() => {
            onDelete(deviceBeingDeleted.id);
            setDeviceBeingDeleted(null);
          }}
          onCancel={() => setDeviceBeingDeleted(null)}
        />
      )}
      <h1 className='text-2xl font-semibold m-0 mb-2 text-blue-500'>
        Sensoren
      </h1>
      <div className='w-full max-w-full overflow-y-hidden overflow-x-auto pb-4'>
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
                onDelete={setDeviceBeingDeleted}
              />
            ))}
            {isAddingSensor && (
              <NewSensorForm
                onSubmit={data => {
                  setIsAddingSensor(false);
                  onAdd(data);
                }}
                onCancel={() => setIsAddingSensor(false)}
              />
            )}
          </tbody>
        </table>
      </div>
      {sensors.length > 0 && !isAddingSensor && (
        <div className='text-right mt-8'>
          <button onClick={() => setIsAddingSensor(true)}>
            Sensor hinzufügen
          </button>
        </div>
      )}
    </div>
  );
};
