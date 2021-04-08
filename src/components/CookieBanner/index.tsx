/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState } from "react";
import { jsx, Text, Link, Flex, Box } from "theme-ui";
import CloseIcon from "@material-ui/icons/Close";

export const CookieBanner: React.FC = () => {
  const cookie = typeof window !== "undefined" && window.document.cookie;
  const [cookieStatus, setCookieStatus] = useState<boolean>(
    cookie &&
      cookie.split("; ").find(row => row.startsWith("disclaimerAccepted")) !==
        undefined
      ? true
      : false
  );

  const acceptCookies: () => void = () => {
    document.cookie = "disclaimerAccepted=true;path=/;max-age=31536000;";
    setCookieStatus(true);
  };

  return (
    <React.Fragment>
      {cookieStatus === false && (
        <Flex
          color='text'
          bg='background'
          p={3}
          sx={{
            fontSize: 0,
            width: [theme => `calc(100% - ${theme.space[3]}px)`, "80%", "60%"],
            border: theme => `2px solid ${theme.colors.primary}`,
            position: "fixed",
            bottom: [theme => `${theme.space[2]}px`, "40px", null],
            left: [theme => `${theme.space[2]}px`, "10%", "20%"],
            zIndex: 3,
          }}
        >
          <Box
            sx={{
              "& > *": {
                display: "inline",
              },
            }}
          >
            <Text>
              Diese Webseite verwendet Cookies, um bestimmte Funktionen zu
              ermöglichen und das Angebot zu verbessern. Indem Sie hier
              fortfahren, stimmen Sie der Nutzung von Cookies zu.
            </Text>
            &nbsp;
            <Link
              href='https://www.technologiestiftung-berlin.de/de/datenschutz/'
              target='_blank'
              rel='noopener noreferrer'
              sx={{ color: "primary" }}
            >
              Weitere Informationen
            </Link>
          </Box>
          <CloseIcon
            fontSize='large'
            sx={{ color: "primary", cursor: "pointer" }}
            onClick={acceptCookies}
          />
        </Flex>
      )}
    </React.Fragment>
  );
};
