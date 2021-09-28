import { FC, useState } from "react";
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
import useUniqueUsernameValidation from "@lib/hooks/useUniqueUsernameValidation";

interface SignupFormData {
  username: string;
  email: string;
  areConditionsAccepted?: boolean;
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
    msg: "Nicht länger als 20 Zeichen",
    isFulfilled: !!value && value.length > 0 && value.length <= 20,
  },
];

export const SignupForm: FC<{
  onSubmit?: (data: SignupFormData) => void;
}> = ({ onSubmit = console.log }) => {
  const [usernameWasFocused, setUsernameWasFocused] = useState(false);
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitted },
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
  const { isUnique: isUsernameUnique, isLoading } = useUniqueUsernameValidation(
    debouncedUsername
  );
  const onInternalSubmit = handleSubmit(data =>
    onSubmit({
      ...data,
      areConditionsAccepted: Boolean(data.areConditionsAccepted),
    })
  );

  const usernameRules = getUsernameRules({
    value: watchUsername,
    isUnique: !!isUsernameUnique,
    isLoading: !!isLoading,
  });
  const usernameIsInvalid = usernameRules.some(
    ({ isFulfilled }) => !isFulfilled
  );
  const usernameHasError = isSubmitted && usernameIsInvalid;

  const formatError = (errorMsg?: string): string[] =>
    errorMsg ? [errorMsg] : [];

  return (
    <SignInUpFormWrapper onSubmit={onInternalSubmit} type='up'>
      <Controller
        name='username'
        control={control}
        defaultValue=''
        render={({ field }) => (
          <div className='mb-2'>
            <FormTextInput
              {...field}
              label='Nutzername'
              placeholder='Dein einzigartigen Nutzername...'
              type='text'
              errors={usernameHasError ? [" "] : []}
              onFocus={() => setUsernameWasFocused(true)}
              onBlur={() => {
                field.onBlur();
                setUsernameWasFocused(false);
              }}
              className='mb-0'
            />
            <FormFieldRules
              isTouched={!!usernameIsInvalid || usernameWasFocused}
              rules={usernameRules}
              withSubmittedErrors={usernameHasError}
            />
          </div>
        )}
      />
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
        defaultValue={false}
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
