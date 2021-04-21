import { FormTextInput } from "@components/FormTextInput";
import { Td, Tr } from "@components/HTMLTable";
import { requiredDeviceId, requiredDeviceName } from "@lib/formValidationUtil";
import useClickOutside from "@lib/hooks/useClickOutside";
import {
  ChangeEvent,
  FC,
  forwardRef,
  HTMLProps,
  useEffect,
  useRef,
  useState,
} from "react";
import { DeviceIcon } from "./DeviceIcon";
import { SubmissionDataType } from "./SensorsListTypes";

interface SensorsListEditRowPropType {
  currentDraft: SubmissionDataType;
  onDraftChange: (data: SubmissionDataType) => void;
  onSubmit: () => void;
  onClickOutside: () => void;
  onCancel: () => void;
}

// eslint-disable-next-line react/display-name
const TableEditRow = forwardRef<
  HTMLTableRowElement,
  HTMLProps<HTMLTableRowElement>
>(({ children }, ref) => (
  <Tr
    ref={ref}
    className='transition hover:bg-blue-25 cursor-pointer px-3 sm:px-0'
    style={{
      gridTemplateAreas: `
        'id         id'
        'name       name'
        'button1    button2'
        'lastSeen   lastSeen'
      `,
    }}
  >
    {children}
  </Tr>
));

const DeviceIdEditField: FC = ({ children }) => (
  <Td
    p='sm:pl-0 sm:pr-1 sm:py-1'
    className='whitespace-normal'
    style={{ minWidth: 140, gridArea: "id" }}
  >
    <div
      className='grid items-start'
      style={{ gridTemplateColumns: "auto 1fr" }}
    >
      <span className='mt-2'>
        <DeviceIcon />
      </span>
      {children}
    </div>
  </Td>
);

const NameEditField: FC = ({ children }) => (
  <Td
    className='w-full whitespace-normal'
    p='sm:pl-1 sm:py-1'
    style={{ gridArea: "name" }}
    colSpan={2}
  >
    {children}
  </Td>
);

const Button1EditField: FC = ({ children }) => (
  <Td
    p='sm:px-6 sm:py-1'
    className='sm:text-right'
    style={{ gridArea: "button1" }}
  >
    {children}
  </Td>
);

const Button2EditField: FC = ({ children }) => (
  <Td
    className='sm:text-right'
    p='sm:pr-0 sm:py-1'
    style={{ gridArea: "button2" }}
  >
    {children}
  </Td>
);

export const SensorsListEditRow: FC<SensorsListEditRowPropType> = ({
  currentDraft,
  onSubmit,
  onCancel,
  onClickOutside,
  onDraftChange,
}) => {
  const ref = useClickOutside<HTMLTableRowElement>(onClickOutside);
  const externalIdInputRef = useRef<HTMLInputElement>(null);
  const [deviceIdError, setDeviceIdError] = useState<string | null>(null);
  const [deviceNameError, setDeviceNameError] = useState<string | null>(null);

  const onKeyUp = (key: string): void => {
    if (key === "Enter") onSubmit();
    if (key === "Escape") onCancel();
  };

  useEffect(() => {
    externalIdInputRef.current?.focus();
  }, [externalIdInputRef]);

  useEffect(() => {
    try {
      requiredDeviceId.validateSync(currentDraft.externalId);
      setDeviceIdError(null);
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      setDeviceIdError(err.errors[0]);
    }
  }, [currentDraft.externalId, setDeviceIdError]);

  useEffect(() => {
    try {
      requiredDeviceName.validateSync(currentDraft.name);
      setDeviceNameError(null);
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      setDeviceNameError(err.errors[0]);
    }
  }, [currentDraft.name, setDeviceNameError]);

  return (
    <TableEditRow ref={ref}>
      <DeviceIdEditField>
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
          onKeyUp={evt => onKeyUp(evt.key)}
          errors={deviceIdError ? [deviceIdError] : []}
        />
      </DeviceIdEditField>
      <NameEditField>
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
          onKeyUp={evt => onKeyUp(evt.key)}
          errors={deviceNameError ? [deviceNameError] : []}
        />
      </NameEditField>
      <Button1EditField>
        <span className='h-10 flex items-center'>
          <button
            onClick={evt => {
              evt.preventDefault();
              evt.stopPropagation();
              onCancel();
            }}
          >
            Abbrechen
          </button>
        </span>
      </Button1EditField>
      <Button2EditField>
        <span className='h-10 flex items-center'>
          <button
            onClick={evt => {
              evt.preventDefault();
              evt.stopPropagation();
              onSubmit();
            }}
          >
            Speichern
          </button>
        </span>
      </Button2EditField>
    </TableEditRow>
  );
};
