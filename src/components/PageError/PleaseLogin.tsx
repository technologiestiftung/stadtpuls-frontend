import { SmallModalOverlay } from "@components/SmallModalOverlay";
import { Anchor as AnchorButton } from "@components/Button";
import { FC } from "react";

export const PleaseLogin: FC = () => (
  <SmallModalOverlay
    title='Bitte melden Sie sich an'
    footerContent={
      <div className='block w-full text-right'>
        <AnchorButton href='/signin'>Zur Anmeldung</AnchorButton>
      </div>
    }
  >
    Sie müssen eingeloggt sein, um auf diese Seite zuzugreifen.
  </SmallModalOverlay>
);
