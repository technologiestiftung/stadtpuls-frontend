import { Td, Tr } from "@components/HTMLTable";
import { ButtonTextLink } from "@components/TextLink";
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
      style={{ height: 50 }}
    >
      <ButtonTextLink onClick={onClick}>
        <DeviceIcon />
        Ersten Sensor hinzufügen
      </ButtonTextLink>
    </Td>
  </Tr>
);
