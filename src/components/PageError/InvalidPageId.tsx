import { SmallModalOverlay } from "@components/SmallModalOverlay";
import { FC } from "react";

export const InvalidPageId: FC<{
  pageType?: string;
  id: string | number;
}> = ({ pageType = "Seiten", id }) => (
  <SmallModalOverlay title='Ungültige ID'>
    {`Die aktuelle ${pageType}-ID "${id}" ist ungültig.`}
    {`Bitte prüfen Sie die ${pageType}-ID in die URL.`}
  </SmallModalOverlay>
);
