import * as yup from "yup";

export const requiredEmailValidation = yup
  .string()
  .email("Die angegebene E-Mail Adresse ist ungültig")
  .required("Sie müssen eine E-Mail Adresse angeben");

export const requiredSensorNameValidation = yup
  .string()
  .required("Der Sensor muss eine Name haben")
  .max(50, "Der Name darf maximal 50 Zeichen haben");

export const requiredSensorCategoryValidation = yup
  .string()
  .required("Eine Kategorie muss ausgewählt sein");

export const requiredSymbolIdValidation = yup
  .number()
  .min(1, "Bitte wählen Sie ein gültiges Symbol")
  .max(31, "Bitte wählen Sie ein gültiges Symbol")
  .required("Bitte wählen Sie ein gültiges Symbol");

export const requiredLatitude = yup
  .number()
  .min(-90, "Bitte wählen Sie ein gültige Latitude")
  .max(90, "Bitte wählen Sie ein gültige Latitude")
  .required("Bitte wählen Sie ein gültige Latitude");

export const requiredLongitude = yup
  .number()
  .min(-180, "Bitte wählen Sie ein gültige Longitude")
  .max(180, "Bitte wählen Sie ein gültige Longitude")
  .required("Bitte wählen Sie ein gültige Longitude");

export const requiredSensorDescriptionValidation = yup
  .string()
  .required(
    "Der Sensor muss eine Beschreibung zwischen 10 und 140 Zeichen haben"
  )
  .min(10, "Die Beschreibung kann 10 bis 140 Zeichen enthalten")
  .max(140, "Die Beschreibung kann 10 bis 140 Zeichen enthalten");

export const requiredSensorIntegrationValidation = yup
  .string()
  .required("Eine Integration muss ausgewählt sein");

export const requiredUsernameValidation = yup
  .string()
  .min(3, "Nutzernamen können 3 bis 20 Zeichen lang sein")
  .max(20, "Nutzernamen können 3 bis 20 Zeichen lang sein")
  .matches(
    /^[\w_]{3,20}$/gm,
    "Nutzernamen dürfen nur Buchstaben, Zahlen und _ enthalten"
  )
  .required("Sie müssen einen Nutzernamen angeben");

export const requiredTTNDeviceIDValidation = yup.string().when("integration", {
  is: "ttn",
  then: yup
    .string()
    .min(3, "Min. 3 Zeichen")
    .max(36, "Max. 36 Zeichen")
    .required("Device-ID ist erforderlich"),
  otherwise: yup.string().optional(),
});

export const requiredDeviceName = yup
  .string()
  .min(3, "Min. 3 Zeichen")
  .max(20, "Max. 50 Zeichen")
  .required("Geräte-ID ist erforderlich");
