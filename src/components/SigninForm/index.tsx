import { FC } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { FormTextInput } from "@components/FormTextInput";
import { SignInUpFormWrapper } from "@components/SignInUpFormWrapper";

interface SigninFormData {
  email: string;
}

const formSchema = yup.object().shape({
  email: yup
    .string()
    .email("Die angegebene E-Mail Adresse ist ungültig")
    .required("Sie müssen eine E-Mail Adresse angeben"),
});

export const SigninForm: FC<{
  onSubmit?: (data: SigninFormData) => void;
}> = ({ onSubmit = console.log }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormData>({
    resolver: yupResolver(formSchema),
  });
  const onInternalSubmit = handleSubmit(data => onSubmit(data));

  return (
    <SignInUpFormWrapper onSubmit={onInternalSubmit} type='in'>
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
            errors={errors.email?.message ? [errors.email?.message] : []}
          />
        )}
      />
    </SignInUpFormWrapper>
  );
};
