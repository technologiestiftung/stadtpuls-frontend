import { Td, Tr } from "@components/HTMLTable";
import { FC } from "react";
import { DeviceIcon } from "./DeviceIcon";

export const EmptySensorsLink: FC<{
  onClick: () => void;
}> = ({ onClick }) => (
  <Tr>
    <Td
      p='p-0'
      colSpan={5}
      className='text-center align-middle'
      style={{ height: "20vmax" }}
    >
      <button onClick={onClick}>
        <DeviceIcon />
        Ersten Sensor hinzufügen
      </button>
    </Td>
  </Tr>
);
