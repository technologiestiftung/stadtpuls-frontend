import * as yup from "yup";

export const requiredEmailValidation = yup
  .string()
  .email("Die angegebene E-Mail Adresse ist ungültig")
  .required("Sie müssen eine E-Mail Adresse angeben");

export const requiredProjectTitleValidation = yup
  .string()
  .required("Das Projekt muss einen Titel haben");

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

export const requiredProjectIntegrationValidation = yup
  .string()
  .required("Eine Integration muss ausgewählt sein");
