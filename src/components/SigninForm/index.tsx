import { FC } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { FormTextInput } from "@components/FormTextInput";
import { SignInUpFormWrapper } from "@components/SignInUpFormWrapper";
import { requiredEmailValidation } from "@lib/formValidationUtil";
import { getTranslatedErrorMessage } from "@lib/translationUtil";

interface SigninFormData {
  email: string;
}

interface SigninFormPropType {
  defaultValues?: Partial<SigninFormData>;
  onSubmit?: (data: SigninFormData) => void;
  serverError?: string | null;
}

const formSchema = yup.object().shape({
  email: requiredEmailValidation,
});

export const SigninForm: FC<SigninFormPropType> = ({
  defaultValues = {},
  onSubmit = console.log,
  serverError,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<SigninFormData>({
    resolver: yupResolver(formSchema),
  });
  const onInternalSubmit = handleSubmit(data => onSubmit(data));

  return (
    <SignInUpFormWrapper onSubmit={onInternalSubmit} type='in'>
      <Controller
        name='email'
        control={control}
        defaultValue={defaultValues.email || ""}
        render={({ field }) => (
          <FormTextInput
            {...field}
            label='E-Mail'
            placeholder='Deine E-Mail-Adresse...'
            type='email'
            errors={(
              [
                errors.email?.message || (!touchedFields.email && serverError),
              ].filter(Boolean) as string[]
            ).map(getTranslatedErrorMessage)}
          />
        )}
      />
    </SignInUpFormWrapper>
  );
};
