import { Button, Submit } from "@components/Button";
import * as yup from "yup";
import { FormTextInput } from "@components/FormTextInput";
import { SmallModalOverlay } from "@components/SmallModalOverlay";
import { Controller, useForm } from "react-hook-form";
import {
  requiredUsernameValidation,
  requiredEmailValidation,
  requiredDisplaynameValidation,
  optionalDescriptionValidation,
  optionalLinkValidation,
} from "@lib/formValidationUtil";
import React, { FC, useEffect, useCallback } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormTextarea } from "@components/FormTextarea";
import { AccountWithSensorsType } from "@lib/requests/getAccountDataByUsername";

interface DefaultValuesType extends AccountWithSensorsType {
  email: string;
}

export interface EditAccountModalPropType {
  defaultValues: DefaultValuesType;
  onSubmit?: (accountData: DefaultValuesType) => void;
  submitButtonText?: string;
  onCancel?: () => void;
  cancelButtonText?: string;
  onDelete?: () => void;
  deleteButtonText?: string;
}

const formSchema = yup.object().shape({
  username: requiredUsernameValidation,
  displayName: requiredDisplaynameValidation,
  email: requiredEmailValidation,
  description: optionalDescriptionValidation,
  link: optionalLinkValidation,
});

export const EditAccountModal: FC<EditAccountModalPropType> = ({
  defaultValues,
  onSubmit = () => undefined,
  onCancel = () => undefined,
  onDelete,
  submitButtonText = "Speichern",
  cancelButtonText = "Abbrechen",
  deleteButtonText = "Löschen",
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm<DefaultValuesType>({
    resolver: yupResolver(formSchema),
  });
  const isDirty = Object.values(dirtyFields).length > 0;

  const formatError = (errorMsg?: string): string[] =>
    errorMsg ? [errorMsg] : [];

  const handleKeyDown = useCallback(
    (evt: KeyboardEvent): void => {
      if (evt.key === "Escape" && !isDirty) {
        onCancel();
      }
    },
    [isDirty, onCancel]
  );

  useEffect(() => {
    const to = setTimeout(() => {
      const input = document.querySelector(
        "input#displayName"
      ) as HTMLInputElement;
      input?.focus();
    }, 100);
    return () => clearTimeout(to);
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <SmallModalOverlay
      className='w-[640px] max-w-full'
      title='Profil editieren'
      onClickOutside={!isDirty ? onCancel : undefined}
    >
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-2 sm:gap-4'
      >
        <fieldset className='xs:grid xs:grid-cols-2 gap-4'>
          <Controller
            name='username'
            control={control}
            defaultValue={defaultValues?.username}
            render={({ field }) => (
              <FormTextInput
                {...field}
                readOnly={true}
                disabled={true}
                label='Nutzername'
                type='text'
              />
            )}
          />
          <Controller
            name='email'
            control={control}
            defaultValue={defaultValues?.email}
            render={({ field }) => (
              <FormTextInput
                {...field}
                readOnly={true}
                disabled={true}
                label='E-Mail-Addresse'
                type='email'
              />
            )}
          />
        </fieldset>
        <Controller
          name='displayName'
          control={control}
          defaultValue={defaultValues?.displayName}
          render={({ field }) => (
            <FormTextInput
              {...field}
              placeholder='Dein Anzeigename'
              label='Anzeigename'
              type='text'
            />
          )}
        />
        <Controller
          name='description'
          control={control}
          defaultValue={defaultValues?.description}
          render={({ field }) => (
            <FormTextarea
              {...field}
              optional
              label='Beschreibung'
              maxCharacters={500}
              placeholder='Gebe deinem Profil eine kurze Beschreibung'
              errors={formatError(errors.description?.message)}
            />
          )}
        />
        <Controller
          name='link'
          control={control}
          defaultValue={defaultValues?.link}
          render={({ field }) => (
            <FormTextInput
              {...field}
              optional
              placeholder='Ein öffentlicher Link'
              label='Link'
              type='url'
            />
          )}
        />
        <div className='flex w-full sm:justify-between flex-wrap gap-4 items-end'>
          <div className='border-b sm:border-none w-full sm:w-auto pb-4 sm:pb-0'>
            {typeof onDelete === "function" && (
              <Button
                variant='dangerous'
                onClick={onDelete}
                className='w-full sm:w-auto'
              >
                {deleteButtonText}
              </Button>
            )}
          </div>
          <div className='w-full sm:w-auto flex gap-4'>
            <Button variant='secondary' onClick={onCancel}>
              {cancelButtonText}
            </Button>
            <Submit variant='primary'>{submitButtonText}</Submit>
          </div>
        </div>
      </form>
    </SmallModalOverlay>
  );
};
