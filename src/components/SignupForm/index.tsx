import { FC, useEffect, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { TextLink } from "@components/TextLink";
import { FormTextInput } from "@components/FormTextInput";
import { FormCheckbox } from "@components/FormCheckbox";
import { SignInUpFormWrapper } from "@components/SignInUpFormWrapper";
import { useDebounce } from "use-debounce";
import {
  requiredEmailValidation,
  requiredUsernameValidation,
} from "@lib/formValidationUtil";
import {
  FormFieldRules,
  FormFieldRulesPropType,
} from "@components/FormFieldRules";
import { useUniqueUsernameValidation } from "@lib/hooks/useUniqueUsernameValidation";
import { getTranslatedErrorMessage } from "@lib/translationUtil";

interface SignupFormData {
  username: string;
  email: string;
  areConditionsAccepted?: boolean;
}

interface SignupFormPropType {
  defaultValues?: Partial<SignupFormData>;
  onSubmit?: (data: SignupFormData) => void;
  serverErrors?: Partial<Record<keyof SignupFormData, string | undefined>>;
}

const formSchema = yup.object().shape({
  username: requiredUsernameValidation,
  email: requiredEmailValidation,
  areConditionsAccepted: yup
    .boolean()
    .oneOf([true], "Sie müssen die Nutzungsbedingungen akzeptieren"),
});

interface GetUsernameRulesParamType {
  value?: string;
  isUnique?: boolean;
  isLoading?: boolean;
}

const getUsernameRules = ({
  value,
  isUnique,
  isLoading,
}: GetUsernameRulesParamType): FormFieldRulesPropType["rules"] => [
  {
    id: "unique",
    msg: "Einzigartig",
    isFulfilled: !!isUnique,
    isLoading,
  },
  {
    id: "validchars",
    msg: "Nur Buchstaben, Zahlen, - und _",
    isFulfilled: !!value && /^[a-zA-Z0-9_-]+$/.test(value),
  },
  {
    id: "length",
    msg: "Zwischen 3 und 20 Zeichen",
    isFulfilled: !!value && value.length > 3 && value.length <= 20,
  },
];

export const SignupForm: FC<SignupFormPropType> = ({
  defaultValues = {},
  onSubmit = console.log,
  serverErrors = {},
}) => {
  const [usernameWasFocused, setUsernameWasFocused] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitted: formIsSubmitted, touchedFields },
  } = useForm<SignupFormData>({
    resolver: yupResolver(formSchema),
  });
  const watchUsername = watch("username");
  // FIXME: Understand why the types here are not right
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const [debouncedUsername] = useDebounce<string>(
    watchUsername,
    500
  ) as string[];
  const { isUnique: isUsernameUnique, isLoading } =
    useUniqueUsernameValidation(debouncedUsername);

  useEffect(() => setIsSubmitted(formIsSubmitted), [formIsSubmitted]);

  const usernameRules = getUsernameRules({
    value: watchUsername,
    isUnique: !!isUsernameUnique,
    isLoading: !!isLoading,
  });
  const usernameIsInvalid = usernameRules.some(
    ({ isFulfilled }) => !isFulfilled
  );
  const usernameHasError = isSubmitted && usernameIsInvalid;

  const onInternalSubmit = handleSubmit(data => {
    setIsSubmitted(true);
    if (usernameIsInvalid) return;
    onSubmit({
      ...data,
      areConditionsAccepted: Boolean(data.areConditionsAccepted),
    });
  });

  return (
    <SignInUpFormWrapper onSubmit={onInternalSubmit} type='up'>
      <Controller
        name='username'
        control={control}
        defaultValue={defaultValues.username || ""}
        render={({ field }) => (
          <div className='mb-2'>
            <FormTextInput
              {...field}
              label='Nutzername'
              placeholder='Dein Nutzername...'
              type='text'
              errors={(
                [
                  !touchedFields.username && serverErrors.username,
                  usernameHasError && " ",
                ].filter(Boolean) as string[]
              ).map(getTranslatedErrorMessage)}
              onFocus={() => setUsernameWasFocused(true)}
              className='mb-0'
            />
            <FormFieldRules
              isTouched={!!usernameIsInvalid && usernameWasFocused}
              rules={usernameRules}
              withSubmittedErrors={usernameHasError}
            />
          </div>
        )}
      />
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
                errors.email?.message ||
                  (!touchedFields.email && serverErrors.email),
              ].filter(Boolean) as string[]
            ).map(getTranslatedErrorMessage)}
          />
        )}
      />
      <Controller
        name='areConditionsAccepted'
        control={control}
        defaultValue={defaultValues.areConditionsAccepted || false}
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
            errors={(
              [
                errors.areConditionsAccepted?.message ||
                  (!touchedFields.areConditionsAccepted &&
                    serverErrors.areConditionsAccepted),
              ].filter(Boolean) as string[]
            ).map(getTranslatedErrorMessage)}
          />
        )}
      />
    </SignInUpFormWrapper>
  );
};
