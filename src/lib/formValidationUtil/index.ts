import * as yup from "yup";

export const requiredEmailValidation = yup
  .string()
  .email("Die angegebene E-Mail Adresse ist ungültig")
  .required("Sie müssen eine E-Mail Adresse angeben");

export const requiredProjectTitleValidation = yup
  .string()
  .required("Das Projekt muss einen Titel haben")
  .max(60, "Der Titel darf maximal 60 Zeichen haben");

export const requiredProjectCategoryValidation = yup
  .string()
  .required("Eine Kategorie muss ausgewählt sein");

export const requiredProjectDescriptionValidation = yup
  .string()
  .required(
    "Das Projekt muss eine Beschreibung zwischen 10 und 140 Zeichen haben"
  )
  .min(10, "Die Beschreibung kann 10 bis 140 Zeichen enthalten")
  .max(140, "Die Beschreibung kann 10 bis 140 Zeichen enthalten");

export const requiredProjectConnectypeValidation = yup
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

export const requiredDeviceId = yup
  .string()
  .min(3, "Min. 3 Zeichen")
  .max(36, "Max. 36 Zeichen")
  .required("Device-ID ist erforderlich");

export const requiredDeviceName = yup
  .string()
  .min(3, "Min. 3 Zeichen")
  .max(20, "Max. 50 Zeichen")
  .required("Geräte-ID ist erforderlich");
