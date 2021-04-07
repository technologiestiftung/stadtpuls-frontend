/** @jsxRuntime classic */
/** @jsx jsx */
import React from "react";
import { jsx, Heading, Text, Box } from "theme-ui";
import { SummaryType } from "../common/interfaces";

export const ProjectSummary: React.FC<SummaryType> = ({
  title,
  description,
  noOfDevices,
}) => {
  return (
    <Box sx={{ maxWidth: "60ch" }}>
      <Heading as='h1' variant='h1' sx={{ fontSize: [4, 4, 5] }}>
        {title}
      </Heading>
      <Text mt={3}>{description}</Text>
      <Text mt={1} sx={{ fontWeight: "bold" }}>
        Anzahl der Sensoren: {noOfDevices}
      </Text>
    </Box>
  );
};
