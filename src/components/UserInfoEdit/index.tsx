import { FC, useEffect, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { Button, Submit } from "@components/Button";
import { FormTextInput } from "@components/FormTextInput";
import {
  requiredUsernameValidation,
  requiredEmailValidation,
} from "@lib/formValidationUtil";
import { isUsernameAlreadyTaken } from "@lib/requests/isUsernameAlreadyTaken";

interface UserInfoData {
  username: string;
  email: string;
}

type UniqueUsernameErrorType = string | null | undefined;

interface UserInfoEditProps extends UserInfoData {
  onSubmit?: (data: UserInfoData) => void;
}

const formSchema = yup.object().shape({
  email: requiredEmailValidation,
  username: requiredUsernameValidation,
});

const getCancelableIsUsernameAlreadyTaken = (): {
  call: typeof isUsernameAlreadyTaken;
  cancel: () => void;
} => {
  let hasCanceled_ = false;

  const wrappedPromise: typeof isUsernameAlreadyTaken = username =>
    new Promise((resolve, reject) => {
      isUsernameAlreadyTaken(username).then(
        val => !hasCanceled_ && resolve(val),
        error => !hasCanceled_ && reject(error)
      );
    });

  return {
    call: wrappedPromise,
    cancel() {
      hasCanceled_ = true;
    },
  };
};

export const UserInfoEdit: FC<UserInfoEditProps> = ({
  onSubmit = data => console.log(data),
  username,
  email,
}) => {
  const [edit, setEdit] = useState(false);
  const [
    uniqueUsernameError,
    setUniqueUsernameError,
  ] = useState<UniqueUsernameErrorType | null>(null);
  const isUsernameAlreadyTakenCancelable = getCancelableIsUsernameAlreadyTaken();

  const {
    control,
    handleSubmit,
    reset: resetForm,
    formState: { errors },
  } = useForm<UserInfoData>({
    resolver: yupResolver(formSchema),
  });

  const formatErrors = (errorMsgs: (string | null | undefined)[]): string[] =>
    errorMsgs.filter(Boolean) as string[];

  useEffect(() => {
    return () => isUsernameAlreadyTakenCancelable.cancel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const afterValidationSubmit = (data: UserInfoData): void => {
    onSubmit(data);
    setUniqueUsernameError(null);
    setEdit(false);
  };

  const onInternalSubmit = handleSubmit(data => {
    if (data.username === username) return afterValidationSubmit(data);
    void isUsernameAlreadyTakenCancelable.call(data.username).then(isTaken => {
      if (isTaken)
        return setUniqueUsernameError(
          `Ein Nutzer mit der Nutzername "${data.username}" existiert bereits`
        );
      afterValidationSubmit(data);
    });
  });

  return (
    <div className='flex flex-col pt-3 w-full sm:min-w-md md:min-w-xs lg:min-w-md'>
      <h1 className='text-blue text-3xl font-semibold m-0 mb-10'>
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
              errors={formatErrors([errors.email?.message])}
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
              errors={formatErrors([
                errors.username?.message,
                uniqueUsernameError,
              ])}
            />
          )}
        />
        <div className='flex justify-end mt-8'>
          {edit ? (
            <>
              <Button
                onClick={() => {
                  resetForm({ email, username });
                  setUniqueUsernameError(null);
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
