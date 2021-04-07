/** @jsxRuntime classic */
/** @jsx jsx */
import React from "react";
import { useStoreState } from "../state/hooks";
import {
  jsx,
  Heading,
  Image,
  Grid,
  Box,
  Container,
  Text,
  Divider,
} from "theme-ui";
import { ProjectPreview } from "./ProjectPreview";
import { ProjectType } from "../common/interfaces";

const DatahubLogo = "/images/datahub-logo.svg";

export const Overview: React.FC = () => {
  const projects = useStoreState(state => state.projects.items);

  return (
    <Container mt={[0, 5, 5]} p={4}>
      <Grid gap={[4, null, null]} columns={[1, null, "1fr 2fr"]}>
        <Grid
          gap={[0, 4, 0]}
          columns={[1, "max-content auto", 1]}
          sx={{
            maxWidth: ["60ch", null, "none"],
            gridTemplateRows: "max-content auto",
          }}
        >
          <Image
            src={DatahubLogo}
            alt={"Logo des Berlin IoT Hub"}
            sx={{
              minWidth: "240px",
              display: ["none", "block", null],
            }}
          />
          <Box>
            <Heading
              as='h1'
              variant='h1'
              mt={[0, null, 4]}
              sx={{ color: "text" }}
            >
              Berlin <span sx={{ fontWeight: "body" }}>IoT Hub</span>
            </Heading>
            <Heading
              as='h2'
              variant='h2'
              mt={2}
              mr={2}
              sx={{ color: "primary" }}
            >
              Offene Datenplattform für IoT-Projekte
            </Heading>
          </Box>
        </Grid>
        <Box>
          <Text sx={{ maxWidth: "80ch" }}>
            Das Berlin IoT Hub ist eine prototypische Offene Datenplattform, die
            Sensordaten aus Forschungsprojekten der Technologiestiftung Berlin
            in einr PostgreSQL-Datenbank speichert. Alle Datensätze werden als
            Download, sowie über eine REST-API frei zur Verfügung gestellt.
            Basierend auf diesen Daten können weiterführende Analysen und
            Visualisierungen zu den jeweiligen Projekten erstellt werden. Alle
            hier erfassten Daten sind unter der freien CC-BY-SA-Lizenz
            verfügbar.
          </Text>
          <Heading as='h2' variant='h5' mt={3}>
            Anzahl der IoT-Projekte: 3
          </Heading>
          <Text mt={3}>
            <i>
              Mit Klick auf ein IoT-Projekt werden Detailinformationen sichtbar.
            </i>
          </Text>
          <Divider mt={4} />
          {projects &&
            projects.map((project: ProjectType) => {
              return (
                <ProjectPreview
                  key={project.id}
                  id={project.id}
                  title={project.title}
                  city={project.city}
                  description={project.description}
                />
              );
            })}
        </Box>
      </Grid>
    </Container>
  );
};
