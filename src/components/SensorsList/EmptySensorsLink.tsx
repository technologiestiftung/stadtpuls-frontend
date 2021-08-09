import { Td, Tr } from "@components/HTMLTable";
import { ButtonTextLink } from "@components/TextLink";
import { FC } from "react";

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
      <ButtonTextLink onClick={onClick} className='mt-8'>
        <img
          src='/images/illustrations/microcontroller-1.svg'
          alt='A microcontroller icon'
          className='inline-block w-5 h-5 mr-2 -mt-0.5'
        />
        Ersten Sensor hinzufügen
      </ButtonTextLink>
    </Td>
  </Tr>
);
