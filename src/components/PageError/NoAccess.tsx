import { SmallModalOverlay } from "@components/SmallModalOverlay";
import { FC } from "react";

export const NoAccess: FC = () => (
  <SmallModalOverlay title='Zugriff verweigert'>
    Sie haben nicht die erforderlichen Berechtigungen, um auf diese Seite
    zuzugreifen.
  </SmallModalOverlay>
);
