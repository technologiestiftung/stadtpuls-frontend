import { Th, Tr } from "@components/HTMLTable";
import { FC } from "react";

export const SensorsListHeaderRow: FC = () => (
  <thead className='font-normal'>
    <Tr className='border-b border-gray-200 mb-4'>
      <Th p='sm:py-3 sm:pr-3 sm:pl-0'>Gerät-ID</Th>
      <Th className='w-full'>Anzeigename</Th>
      <Th>Letztes Signal</Th>
      <Th />
      <Th className='pr-0' />
    </Tr>
  </thead>
);
