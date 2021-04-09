/** @jsxRuntime classic */
/** @jsx jsx */
import React from "react";
import { jsx, Link, Flex, Text, Image, Grid } from "theme-ui";

const TSBLogo = "/images/tsb-logo.svg";
const SenWEBLogo = "/images/senweb-logo.svg";

export const Footer: React.FC = () => {
  return (
    <Grid
      as='footer'
      columns={[1, null, "auto max-content"]}
      sx={{
        bg: "background",
        p: 4,
      }}
    >
      <Grid
        columns={[1, "max-content max-content", "max-content max-content"]}
        gap={[4]}
      >
        <Flex>
          <Flex sx={{ alignItems: "center" }}>
            <Text>Ein Projekt der:</Text>
          </Flex>
          <Image
            src={TSBLogo}
            alt={"Logo der Technologiestiftung Berlin"}
            ml={3}
            sx={{ width: "148px", height: "100%" }}
          />
        </Flex>
        <Flex>
          <Flex sx={{ alignItems: "center" }}>
            <Text>Gefördert von:</Text>
          </Flex>
          <Image
            src={SenWEBLogo}
            alt={
              "Logo der Senatsverwaltung für Wirtschaft, Energie und Betriebe"
            }
            ml={3}
            sx={{ width: "250px", height: "100%" }}
          />
        </Flex>
      </Grid>
      <Flex
        mt={[4, null, 0]}
        sx={{
          alignItems: "center",
          justifyContent: ["center", "flex-end", "flex-end"],
        }}
      >
        <Link
          href='https://www.technologiestiftung-berlin.de/de/impressum/'
          target='_blank'
          rel='noopener noreferrer'
          variant='footer'
        >
          Impressum
        </Link>
        <Link
          href='https://www.technologiestiftung-berlin.de/de/datenschutz/'
          target='_blank'
          rel='noopener noreferrer'
          variant='footer'
          ml={3}
        >
          Datenschutz
        </Link>
      </Flex>
    </Grid>
  );
};
