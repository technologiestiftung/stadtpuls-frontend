import { ChangeEvent, FC, HTMLProps, useEffect, useRef, useState } from "react";
import { formatDateFromNow } from "@lib/dateUtil";
import useClickOutside from "@lib/onClickOutsideHook";
import { DeviceIcon } from "./DeviceIcon";
import { FormTextInput } from "@components/FormTextInput";

interface SensorType {
  id: string | number;
  externalId: string | number;
  name: string;
  lastRecordedAt?: Date | null;
}

interface SensorsListPropType {
  sensors: SensorType[];
  onChange?: (data: SensorType) => void;
  onDelete?: (id: string | number) => void;
}

type SubmissionDataType = Omit<SensorType, "lastRecordedAt">;

interface SensorsListEditItemPropType {
  currentDraft: SubmissionDataType;
  onDraftChange: (data: SubmissionDataType) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

interface SensorsListDisplayItemPropType extends SensorType {
  onEditClick: () => void;
  onDeleteClick: () => void;
}

interface SensorsListItemPropType extends SensorType {
  onChange: (data: SubmissionDataType) => void;
  onDelete: (id: SensorType["id"]) => void;
}

interface ThProps extends HTMLProps<HTMLTableHeaderCellElement> {
  p?: string;
}
interface TdProps extends HTMLProps<HTMLTableCellElement> {
  p?: string;
}

const commonStyles = `whitespace-nowrap font-normal w-auto`;
const Th: FC<ThProps> = ({
  children,
  className = "",
  p = "py-3 px-6",
  ...rest
}) => (
  <th className={`${className} text-gray-400 ${p} ${commonStyles}`} {...rest}>
    {children}
  </th>
);

const Td: FC<TdProps> = ({
  children,
  className = "",
  p = "py-3 px-6",
  ...rest
}) => (
  <td className={`${className} ${p} ${commonStyles}`} {...rest}>
    {children}
  </td>
);

// eslint-disable-next-line react/display-name
const SensorsListDisplayItem: FC<SensorsListDisplayItemPropType> = ({
  externalId,
  name,
  lastRecordedAt,
  onEditClick,
  onDeleteClick,
}) => (
  <tr className='transition hover:bg-blue-25 cursor-pointer'>
    <Td className='pl-0' style={{ minWidth: "20vw" }}>
      <DeviceIcon />
      {externalId}
    </Td>
    <Td className='w-full'>{name}</Td>
    <Td>{lastRecordedAt ? formatDateFromNow(lastRecordedAt) : "—"}</Td>
    <Td>
      <button onClick={() => onDeleteClick()}>Löschen</button>
    </Td>
    <Td className='pr-0'>
      <button onClick={() => onEditClick()}>Bearbeiten</button>
    </Td>
  </tr>
);

const SensorsListEditItem: FC<SensorsListEditItemPropType> = ({
  currentDraft,
  onSubmit,
  onCancel,
  onDraftChange,
}) => {
  const ref = useClickOutside<HTMLTableRowElement>(onSubmit);
  const externalIdInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    externalIdInputRef.current?.focus();
  }, [externalIdInputRef]);

  return (
    <tr ref={ref} className='transition hover:bg-blue-25 cursor-pointer'>
      <Td className='pl-0' p='pr-1 py-1' style={{ minWidth: "20vw" }}>
        <div
          className='grid items-center'
          style={{ gridTemplateColumns: "auto 1fr" }}
        >
          <DeviceIcon />
          <FormTextInput
            ref={externalIdInputRef}
            name='externalId'
            value={currentDraft.externalId}
            type='text'
            className='mb-0'
            containerClassName='mb-0'
            autoComplete='off'
            onChange={(evt: ChangeEvent<HTMLInputElement>) =>
              onDraftChange({
                ...currentDraft,
                externalId: evt.target.value,
              })
            }
            onKeyUp={evt => evt.key === "Enter" && onSubmit()}
          />
        </div>
      </Td>
      <Td className='w-full' p='pl-1 py-1'>
        <FormTextInput
          name='name'
          value={currentDraft.name}
          type='text'
          className='mb-0'
          containerClassName='mb-0'
          autoComplete='off'
          onChange={(evt: ChangeEvent<HTMLInputElement>) =>
            onDraftChange({
              ...currentDraft,
              name: evt.target.value,
            })
          }
          onKeyUp={evt => evt.key === "Enter" && onSubmit()}
        />
      </Td>
      <Td p='px-6 py-1' />
      <Td p='px-6 py-1'>
        <button onClick={onCancel}>Abbrechen</button>
      </Td>
      <Td className='pr-0' p='px-6 py-1'>
        <button onClick={onSubmit}>Speichern</button>
      </Td>
    </tr>
  );
};

const SensorListItem: FC<SensorsListItemPropType> = props => {
  const { onChange, onDelete, ...sensor } = props;
  const [isInEditMode, setIsInEditMode] = useState<boolean>(false);
  const [currentDraft, setFormDraft] = useState<SubmissionDataType>(sensor);
  const hasChanged =
    currentDraft.externalId !== sensor.externalId ||
    currentDraft.name !== sensor.name;

  const Component = isInEditMode ? SensorsListEditItem : SensorsListDisplayItem;
  return (
    <Component
      {...sensor}
      onEditClick={() => setIsInEditMode(true)}
      onDeleteClick={() => onDelete(sensor.id)}
      currentDraft={currentDraft}
      onDraftChange={setFormDraft}
      onSubmit={() => {
        setIsInEditMode(false);
        if (!hasChanged) return;
        onChange(currentDraft);
        setFormDraft(sensor);
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
  onDelete = () => undefined,
}) => (
  <table className='w-full text-left'>
    <thead className='font-normal'>
      <tr className='border-b border-gray-200 mb-4'>
        <Th className='pl-0'>Gerät-ID</Th>
        <Th className='w-full'>Anzeigename</Th>
        <Th>Letztes Signal</Th>
        <Th />
        <Th className='pr-0' />
      </tr>
    </thead>
    <tbody>
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
    </tbody>
  </table>
);
