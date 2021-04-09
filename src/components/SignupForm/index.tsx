import { FC } from "react";
import { useForm } from "react-hook-form";

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
    <form onSubmit={onInternalSubmit}>
      <label htmlFor='email'>E-Mail</label>
      <input
        {...register("email")}
        type='email'
        placeholder='Deine E-Mail-Adresse...'
      />
      <input type='checkbox' {...register("areConditionsAccepted")} />
      <label htmlFor='areConditionsAccepted'>
        Ich akzeptiere die Nutzungsbedingungen
      </label>
      <button type='submit'>Weiter</button>
    </form>
  );
};
