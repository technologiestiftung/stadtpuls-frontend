import * as yup from "yup";

export const requiredEmailValidation = yup
  .string()
  .email("Die angegebene E-Mail Adresse ist ungültig")
  .required("Sie müssen eine E-Mail Adresse angeben");

export const requiredUsernameValidation = yup
  .string()
  .min(3, "Nutzernamen können 3 bis 20 Zeichen lang sein")
  .max(20, "Nutzernamen können 3 bis 20 Zeichen lang sein")
  .matches(
    /^[\w_]{3,20}$/gm,
    "Nutzernamen dürfen nur Buchstaben, Zahlen und _ enthalten"
  )
  .required("Sie müssen einen Nutzernamen angeben");
