import { FC } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { TextLink } from "@components/TextLink";

interface SigninFormData {
  email: string;
}

export const SigninForm: FC<{
  onSubmit?: (data: SigninFormData) => void;
}> = ({ onSubmit = console.log }) => {
  const { register, handleSubmit } = useForm<SigninFormData>();
  const onInternalSubmit = handleSubmit(data => onSubmit(data));

  return (
    <form
      onSubmit={onInternalSubmit}
      className='max-w-md bg-white p-8 shadow-lg flex flex-col gap-8 place-content-between'
      style={{ minHeight: 360 }}
    >
      <fieldset>
        <h1 className='text-primary text-3xl font-semibold m-0 mb-4'>Login</h1>
        <label htmlFor='email' className='block mb-2'>
          E-Mail
        </label>
        <input
          {...register("email")}
          type='email'
          placeholder='Deine E-Mail-Adresse...'
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
