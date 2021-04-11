import { FC } from "react";
import Link from "next/link";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { TextLink } from "@components/TextLink";
import { FormTextInput } from "@components/FormTextInput";

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
    <form
      onSubmit={onInternalSubmit}
      className='max-w-md bg-white p-8 shadow-lg flex flex-col gap-8 place-content-between'
      style={{ minHeight: 360 }}
      noValidate
    >
      <fieldset>
        <h1 className='text-primary text-3xl font-semibold m-0 mb-4'>Login</h1>
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
      </fieldset>
      <fieldset className='flex gap-4 place-content-between'>
        <section className='text-gray-500'>
          Du hast noch keinen Account?{" "}
          <Link href='/signup'>
            <TextLink href='/signup' className='inline-block'>
              Registriere dich
            </TextLink>
          </Link>
        </section>
        <section
          className='flex flex-col'
          style={{ justifyContent: "flex-end" }}
        >
          <input type='submit' value='Weiter' />
        </section>
      </fieldset>
    </form>
  );
};
