import { SmallModalOverlay } from "@components/SmallModalOverlay";
import { FC } from "react";

export const ServerError: FC<{ error: string }> = ({ error }) => (
  <SmallModalOverlay title='Server-Fehler'>
    Beim Rendern der Seite ist ein Fehler auf dem Server aufgetreten:s
    <pre className='p-4 border border-gray-300 bg-gray-50 mt-3 text-gray-500 whitespace-pre-wrap'>
      {error}
    </pre>
  </SmallModalOverlay>
);
