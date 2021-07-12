import React, { useState } from "react";
import CloseIcon from "@material-ui/icons/Close";
import { TextLink } from "@components/TextLink";

export const CookieBanner: React.FC<{
  ignoreCookie?: true;
}> = ({ ignoreCookie }) => {
  const cookie = typeof window !== "undefined" && window.document.cookie;
  const cookieIsAccepted = cookie
    ? Boolean(
        cookie?.split("; ")?.find(row => row.startsWith("disclaimerAccepted"))
      )
    : false;
  const [cookieStatus, setCookieStatus] = useState<boolean>(
    ignoreCookie === undefined ? cookieIsAccepted : false
  );

  const acceptCookies: () => void = () => {
    document.cookie = "disclaimerAccepted=true;path=/;max-age=31536000;";
    setCookieStatus(true);
  };

  if (cookieStatus !== false) return null;
  return (
    <>
      <div
        className={[
          "p-3 border border-gray-200 shadow-xl fixed left-1/2 transform -translate-x-1/2",
          "bottom-0 sm:bottom-4 z-50 bg-white text-sm rounded container max-w-3xl",
          "flex gap-4 justify-between",
        ].join(" ")}
      >
        <p className='max-w-none'>
          Diese Webseite verwendet Cookies, um bestimmte Funktionen zu
          ermöglichen und das Angebot zu verbessern. Indem Sie hier fortfahren,
          stimmen Sie der Nutzung von Cookies zu. &nbsp;
          <TextLink
            href='https://www.technologiestiftung-berlin.de/de/datenschutz/'
            target='_blank'
            rel='noopener noreferrer'
          >
            Weitere Informationen
          </TextLink>
        </p>
        <CloseIcon
          fontSize='large'
          onClick={acceptCookies}
          className='cursor-pointer text-blue opacity-100 hover:opacity-50 transition'
        />
      </div>
    </>
  );
};
