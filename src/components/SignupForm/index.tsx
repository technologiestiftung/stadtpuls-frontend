import { FC } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { TextLink } from "@components/TextLink";
import { FormTextInput } from "@components/FormTextInput";
import { FormCheckbox } from "@components/FormCheckbox";
import { SignInUpFormWrapper } from "@components/SignInUpFormWrapper";
import { requiredEmailValidation } from "@lib/formValidationUtil";

interface SignupFormData {
  email: string;
  areConditionsAccepted?: boolean;
}

const formSchema = yup.object().shape({
  email: requiredEmailValidation,
  areConditionsAccepted: yup
    .string()
    .required("Sie müssen die Nutzungsbedingungen akzeptieren"),
});

export const SignupForm: FC<{
  onSubmit?: (data: SignupFormData) => void;
}> = ({ onSubmit = console.log }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: yupResolver(formSchema),
  });
  const onInternalSubmit = handleSubmit(data =>
    onSubmit({
      ...data,
      areConditionsAccepted: Boolean(data.areConditionsAccepted),
    })
  );

  const formatError = (errorMsg?: string): string[] =>
    errorMsg ? [errorMsg] : [];

  return (
    <SignInUpFormWrapper onSubmit={onInternalSubmit} type='up'>
      <Controller
        name='email'
        control={control}
        defaultValue=''
        render={({ field }) => (
          <FormTextInput
            {...field}
            label='E-Mail'
            placeholder='Deine E-Mail-Adresse...'
            type='email'
            errors={formatError(errors.email?.message)}
          />
        )}
      />
      <Controller
        name='areConditionsAccepted'
        control={control}
        defaultValue=''
        render={({ field }) => (
          <FormCheckbox
            {...field}
            label={
              <>
                Ich akzeptiere die{" "}
                <TextLink href='https://www.technologiestiftung-berlin.de/de/datenschutz/'>
                  Nutzungsbedingungen
                </TextLink>
                .
              </>
            }
            errors={formatError(errors.areConditionsAccepted?.message)}
          />
        )}
      />
    </SignInUpFormWrapper>
  );
};
