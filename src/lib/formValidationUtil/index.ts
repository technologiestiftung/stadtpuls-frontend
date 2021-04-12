import * as yup from "yup";

export const requiredEmailValidation = yup
  .string()
  .email("Die angegebene E-Mail Adresse ist ungültig")
  .required("Sie müssen eine E-Mail Adresse angeben");
