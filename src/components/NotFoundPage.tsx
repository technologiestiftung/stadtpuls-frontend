/** @jsxRuntime classic */
/** @jsx jsx */
import React from "react";
import { jsx, Text, Heading, Container, Link } from "theme-ui";

export const NotFoundPage: React.FC = () => {
  return (
    <Container mt={[0, 5, 5]} p={4}>
      <Heading as="h1" variant="h2">
        Die angeforderte Seite existiert nicht.
      </Heading>
      <Text mt={2}>
        Zurück zur&nbsp;
        <Link href="/">Startseite</Link>
      </Text>
    </Container>
  );
};
