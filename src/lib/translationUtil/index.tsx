import { ReactNode } from "react";
import { TextLink } from "@components/TextLink";

export const getTranslatedErrorMessage = (errorMessage: string): ReactNode => {
  if (errorMessage === "The email address you entered is not registered.")
    return (
      <>
        Hast du noch keinen Account?{" "}
        <TextLink href='/signup'>Registriere dich!</TextLink>
      </>
    );
  if (errorMessage === 'body.email should match format "email"')
    return "Die angegebene E-Mail-Adresse ist ungültig";
  if (errorMessage === "Rate limit exceeded, retry in 10 seconds")
    return "Du hast in einem kurzen Zeitraum zu oft versucht, dich einzuloggen. Bitte probiere es in 10 Sekunden noch einmal.";
  if (errorMessage === "Rate limit exceeded, retry in 1 minute")
    return "Du hast in einem kurzen Zeitraum zu oft versucht, dich einzuloggen. Bitte probiere es in einer Minute noch einmal.";
  if (
    errorMessage ===
    "For security purposes, you can only request this once every 60 seconds"
  )
    return "Aus Sicherheitsgründen kannst du dich nur einmal alle 60 Sekunden anmelden.";
  if (
    errorMessage.startsWith("The email ") &&
    errorMessage.endsWith(" is already taken")
  ) {
    const email = errorMessage
      .replace("The email ", "")
      .replace(" is already taken", "");
    return (
      <>
        Die E-Mail-Adresse {email} ist bereits vergeben.{" "}
        <TextLink href='/signin'>Möchtest du dich Einloggen?</TextLink>
      </>
    );
  }
  if (
    errorMessage.startsWith("The username ") &&
    errorMessage.endsWith(" is already taken")
  ) {
    const username = errorMessage
      .replace("The username ", "")
      .replace(" is already taken", "")
      .trim();
    return (
      <>
        Der Nutzername {username} ist bereits vergeben.{" "}
        <TextLink href='/signin'>Möchtest du dich Einloggen?</TextLink>
      </>
    );
  }
  return errorMessage;
};
