import * as yup from "yup";

export const requiredEmailValidation = yup
  .string()
  .email("Die angegebene E-Mail-Adresse ist ungültig")
  .required("Eine E-Mail Adresse muss angeben werden");

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
  .max(31, "Ungültiges Symbol")
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

export const requiredSensorDescriptionValidation = yup
  .string()
  .required("Die Beschreibung zwischen 10 und 140 Zeichen lang sein")
  .min(10, "Die Beschreibung zwischen 10 und 140 Zeichen lang sein")
  .max(140, "Die Beschreibung zwischen 10 und 140 Zeichen lang sein");

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
