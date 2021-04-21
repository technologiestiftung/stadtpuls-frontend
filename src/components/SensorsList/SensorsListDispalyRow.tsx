import { Td, Tr } from "@components/HTMLTable";
import { formatDateFromNow } from "@lib/dateUtil";
import { FC, forwardRef, HTMLProps } from "react";
import { DeviceIcon } from "./DeviceIcon";
import { SensorType } from "./SensorsListTypes";

// eslint-disable-next-line react/display-name
const TableDisplayRow = forwardRef<
  HTMLTableRowElement,
  HTMLProps<HTMLTableRowElement> & {
    onClick: () => void;
  }
>(({ children, onClick }, ref) => (
  <Tr
    ref={ref}
    className='transition hover:bg-blue-25 cursor-pointer'
    onClick={() => onClick()}
    style={{
      gridTemplateColumns: "auto 1fr",
      gridTemplateAreas: `
      'id         name'
      'lastSeen   lastSeen'
      'button1    button2'
    `,
    }}
  >
    {children}
  </Tr>
));

const DeviceIdDisplayField: FC = ({ children }) => (
  <Td
    p='pl-0 sm:py-3'
    className='font-bold sm:font-normal'
    style={{ minWidth: "20vw", gridArea: "id" }}
  >
    <DeviceIcon />
    {children}
  </Td>
);

const NameDisplayField: FC = ({ children }) => (
  <Td className='w-full' style={{ gridArea: "name" }}>
    {children}
  </Td>
);

const LastSeenDisplayField: FC = ({ children }) => (
  <Td className='italic text-gray-500' style={{ gridArea: "lastSeen" }}>
    {children}
  </Td>
);

const Button1DisplayField: FC = ({ children }) => (
  <Td className='sm:text-right' style={{ gridArea: "button1" }}>
    {children}
  </Td>
);

const Button2DisplayField: FC = ({ children }) => (
  <Td
    className='sm:text-right'
    p='pr-0 sm:py-3'
    style={{ gridArea: "button2" }}
  >
    {children}
  </Td>
);

interface SensorsListDisplayItemPropType extends SensorType {
  onEditClick: () => void;
  onDeleteClick: () => void;
}

// eslint-disable-next-line react/display-name
export const SensorsListDispalyRow: FC<SensorsListDisplayItemPropType> = ({
  externalId,
  name,
  lastRecordedAt,
  onEditClick,
  onDeleteClick,
}) => (
  <TableDisplayRow onClick={() => onEditClick()}>
    <DeviceIdDisplayField>{externalId}</DeviceIdDisplayField>
    <NameDisplayField>{name}</NameDisplayField>
    <LastSeenDisplayField>
      {lastRecordedAt ? formatDateFromNow(lastRecordedAt) : "—"}
    </LastSeenDisplayField>
    <Button1DisplayField>
      <button onClick={() => onEditClick()}>Bearbeiten</button>
    </Button1DisplayField>
    <Button2DisplayField>
      <button onClick={() => onDeleteClick()}>Löschen</button>
    </Button2DisplayField>
  </TableDisplayRow>
);