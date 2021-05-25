import { FC, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { Button, Submit } from "@components/Button";
import { FormTextInput } from "@components/FormTextInput";
import {
  requiredUsernameValidation,
  requiredEmailValidation,
} from "@lib/formValidationUtil";

interface UserInfoData {
  username: string;
  email: string;
}

interface UserInfoEditProps extends UserInfoData {
  onSubmit?: (data: UserInfoData) => void;
}

const formSchema = yup.object().shape({
  email: requiredEmailValidation,
  username: requiredUsernameValidation,
});

export const UserInfoEdit: FC<UserInfoEditProps> = ({
  onSubmit = data => console.log(data),
  username,
  email,
}) => {
  const [edit, setEdit] = useState(false);

  const {
    control,
    handleSubmit,
    reset: resetForm,
    formState: { errors },
  } = useForm<UserInfoData>({
    resolver: yupResolver(formSchema),
  });

  const formatError = (errorMsg?: string): string[] =>
    errorMsg ? [errorMsg] : [];

  const onInternalSubmit = handleSubmit(data => {
    onSubmit(data);
    setEdit(false);
  });

  return (
    <div className='flex flex-col pt-3 w-full sm:min-w-md md:min-w-xs lg:min-w-md'>
      <h1 className='text-blue-500 text-3xl font-semibold m-0 mb-10'>
        Profil bearbeiten
      </h1>
      <form id='user-info-form' onSubmit={onInternalSubmit}>
        <Controller
          name='email'
          control={control}
          defaultValue={email}
          render={({ field }) => (
            <FormTextInput
              {...field}
              label='E-Mail'
              placeholder='Deine E-Mail-Adresse...'
              type='email'
              disabled={!edit}
              errors={formatError(errors.email?.message)}
            />
          )}
        />
        <Controller
          name='username'
          control={control}
          defaultValue={username}
          render={({ field }) => (
            <FormTextInput
              {...field}
              label='Nutzername'
              placeholder='Dein Nutzername...'
              type='text'
              disabled={!edit}
              errors={formatError(errors.username?.message)}
            />
          )}
        />
        <div className='flex justify-end mt-8'>
          {edit ? (
            <>
              <Button
                onClick={() => {
                  resetForm({ email, username });
                  setEdit(false);
                }}
                className='mr-4'
              >
                Abbrechen
              </Button>
              <Submit variant='primary'>Speichern</Submit>
            </>
          ) : (
            <Button onClick={() => setEdit(true)}>Ändern</Button>
          )}
        </div>
      </form>
    </div>
  );
};
