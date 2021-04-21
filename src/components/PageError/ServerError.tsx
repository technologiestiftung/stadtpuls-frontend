import { SmallModalOverlay } from "@components/SmallModalOverlay";
import { FC } from "react";

export const ServerError: FC<{ error: string }> = ({ error }) => (
  <SmallModalOverlay title='Server-Fehler'>
    An error has occured on the server when rendering the page:
    <pre className='p-4 border border-gray-300 bg-gray-50 mt-3 text-gray-500 whitespace-pre-wrap'>
      {error}
    </pre>
  </SmallModalOverlay>
);
