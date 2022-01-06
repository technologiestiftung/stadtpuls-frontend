import { NUMBER_OF_SENSOR_SYMBOLS } from "@components/SensorSymbol";
import * as yup from "yup";

export const requiredEmailValidation = yup
  .string()
  .email("Die angegebene E-Mail-Adresse ist ungültig")
  .required("Eine E-Mail Adresse muss angeben werden");

export const optionalLinkValidation = yup
  .string()
  .url("Die angegebene Url muss gültig sein")
  .max(100, "Der Name darf maximal 50 Zeichen haben")
  .nullable()
  .optional();

export const requiredSensorNameValidation = yup
  .string()
  .required("Der Sensor muss eine Name haben")
  .max(50, "Der Name darf maximal 50 Zeichen haben");

export const requiredSensorCategoryValidation = yup
  .string()
  .required("Eine Kategorie muss ausgewählt sein");

export const requiredSymbolIdValidation = yup
  .number()
  .min(1, "Ungültiges Symbol")
  .max(NUMBER_OF_SENSOR_SYMBOLS, "Ungültiges Symbol")
  .required("Ungültiges Symbol");

export const requiredLatitude = yup
  .number()
  .min(-90, "Ungültige Latitude")
  .max(90, "Ungültige Latitude")
  .required("Ungültige Latitude");

export const requiredLongitude = yup
  .number()
  .min(-180, "Ungültige Longitude")
  .max(180, "Ungültige Longitude")
  .required("Ungültige Longitude");

export const optionalDescriptionValidation = yup
  .string()
  .max(500, "Die Beschreibung darf nicht länger als 500 Zeichen sein")
  .nullable()
  .optional();

export const requiredSensorIntegrationValidation = yup
  .string()
  .required("Eine Integration muss ausgewählt sein");

export const requiredUsernameValidation = yup
  .string()
  .min(3, "Nutzernamen können 3 bis 20 Zeichen lang sein")
  .max(20, "Nutzernamen können 3 bis 20 Zeichen lang sein")
  .notOneOf(
    [
      "sensors",
      "sensor",
      "account",
      "accounts",
      "devices",
      "device",
      "project",
      "projects",
      "docs",
      "404",
      "500",
      "501",
      "signin",
      "signup",
      "robots",
      "manifest",
      "sitemap",
    ],
    "Diese Nutzername darf nicht verwendet werden"
  )
  .matches(
    /^[a-zA-Z0-9_-]*$/gm,
    "Nutzernamen dürfen nur Buchstaben, Zahlen und _ enthalten"
  )
  .required("Sie müssen einen Nutzernamen angeben");

export const requiredDisplaynameValidation = yup
  .string()
  .min(3, "Anzeigenamen können 3 bis 50 Zeichen lang sein")
  .max(50, "Anzeigenamen können 3 bis 50 Zeichen lang sein")
  .required("Sie müssen einen Anzeigenamen angeben");

export const requiredTTNDeviceIDValidation = yup.string().when("integration", {
  is: "ttn",
  then: yup
    .string()
    .min(3, "Min. 3 Zeichen")
    .max(36, "Max. 36 Zeichen")
    .required("Device-ID ist erforderlich"),
  otherwise: yup.string().optional(),
});

export const requiredTokenDescriptionValidation = yup
  .string()
  .min(3, "Token-Beschreibung muss mindestens 3 Zeichen haben")
  .max(200, "Token-Beschreibung darf maximal 200 Zeichen haben")
  .required("Eine Token-Beschreibung ist erforderlich");
