import { AnchorButton } from "@components/Button";
import { SmallModalOverlay } from "@components/SmallModalOverlay";
import Link from "next/link";
import { FC } from "react";

export const ProjectNotFound: FC<{
  projectId: string | number;
}> = ({ projectId }) => (
  <SmallModalOverlay
    title='Projekt nicht gefunden'
    footerContent={
      <div className='block w-full text-right'>
        <Link href='/account/profile'>
          <AnchorButton href='/account/profile'>Zu meinem profil</AnchorButton>
        </Link>
      </div>
    }
  >
    {`Sie haben kein Projekt mit der ID "${projectId}".`}
  </SmallModalOverlay>
);
