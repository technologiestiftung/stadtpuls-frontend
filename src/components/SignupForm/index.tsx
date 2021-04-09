import { FC } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { TextLink } from "@components/TextLink";

interface SignupFormData {
  email: string;
  areConditionsAccepted?: boolean;
}

export const SignupForm: FC<{
  onSubmit?: (data: SignupFormData) => void;
}> = ({ onSubmit = console.log }) => {
  const { register, handleSubmit } = useForm<SignupFormData>();
  const onInternalSubmit = handleSubmit(data => onSubmit(data));

  return (
    <form
      onSubmit={onInternalSubmit}
      className='max-w-md bg-white p-8 shadow-lg flex flex-col gap-8 place-content-between'
      style={{ minHeight: 360 }}
    >
      <fieldset>
        <h1 className='text-primary text-3xl font-semibold m-0 mb-4'>
          Registrierung
        </h1>
        <label htmlFor='email' className='block mb-2'>
          E-Mail
        </label>
        <input
          {...register("email")}
          type='email'
          placeholder='Deine E-Mail-Adresse...'
        />
        <section className='flex'>
          <input type='checkbox' {...register("areConditionsAccepted")} />
          <label htmlFor='areConditionsAccepted' className='leading-5'>
            Ich akzeptiere die{" "}
            <TextLink href='https://www.technologiestiftung-berlin.de/de/datenschutz/'>
              Nutzungsbedingungen
            </TextLink>
            .
          </label>
        </section>
      </fieldset>
      <fieldset className='flex gap-4 place-content-between'>
        <section className='text-gray-500'>
          Du hast bereits einen Account?{" "}
          <Link href='/login'>
            <TextLink href='/login' className='inline-block'>
              Logge dich ein
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
