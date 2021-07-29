import { Th, Tr } from "@components/HTMLTable";
import { QuestionMarkTooltip } from "@components/QuestionMarkTooltip";
import { FC } from "react";

export const SensorsListHeaderRow: FC = () => {
  return (
    <thead className='font-normal'>
      <Tr className='border-b border-gray-200 mb-4'>
        <Th p='sm:py-3 sm:pr-3 sm:pl-0'>
          Device-ID{" "}
          <QuestionMarkTooltip content='Nutze hier die exakte Device-ID aus Deiner TTN-Konsole. Die ID ist für andere Stadtpuls-Nutzer:innen nicht sichtbar.' />
        </Th>
        <Th className='w-full'>
          Anzeigename{" "}
          <QuestionMarkTooltip content='Der Anzeigename kann frei gewählt werden und ist auch für andere Stadtpuls-Nutzer:innen öffentlich sichtbar. Werde kreativ!' />
        </Th>
        <Th>Letztes Signal</Th>
        <Th />
        <Th className='pr-0' />
      </Tr>
    </thead>
  );
};
