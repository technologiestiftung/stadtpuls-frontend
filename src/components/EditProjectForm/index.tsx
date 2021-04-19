import { FC } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { ProjectInfoFormWrapper } from "@components/ProjectInfoFormWrapper";
import { FormTextInput } from "@components/FormTextInput";
import { FormSelect, SelectOptionType } from "@components/FormSelect";
import { FormTextarea } from "@components/FormTextarea";
import {
  requiredProjectTitleValidation,
  requiredProjectCategoryValidation,
  requiredProjectDescriptionValidation,
} from "@lib/formValidationUtil";

interface ProjectFormDataToSubmit {
  title: string;
  category: string;
  description: string;
  location?: string;
}

export interface ProjectForm {
  categoryOptions: SelectOptionType[];
  defaultValues?: Partial<ProjectFormDataToSubmit>;
  onSubmit?: (data: ProjectFormDataToSubmit) => void;
}

const formSchema = yup.object().shape({
  title: requiredProjectTitleValidation,
  category: requiredProjectCategoryValidation,
  description: requiredProjectDescriptionValidation,
});

export const EditProjectForm: FC<ProjectForm> = ({
  categoryOptions,
  defaultValues,
  onSubmit = console.log,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormDataToSubmit>({
    resolver: yupResolver(formSchema),
  });

  const onInternalSubmit = handleSubmit(data => onSubmit(data));

  const formatError = (errorMsg?: string): string[] =>
    errorMsg ? [errorMsg] : [];

  return (
    <ProjectInfoFormWrapper onSubmit={onInternalSubmit} type='edit'>
      <Controller
        name='title'
        control={control}
        defaultValue={defaultValues?.title}
        render={({ field }) => (
          <FormTextInput
            {...field}
            label='Titel'
            placeholder='Wie soll dein Projekt heißen?'
            type='text'
            errors={formatError(errors.title?.message)}
          />
        )}
      />
      <Controller
        name='category'
        control={control}
        defaultValue={defaultValues?.category}
        render={({ field }) => (
          <FormSelect
            {...field}
            label='Kategorie'
            options={categoryOptions}
            errors={formatError(errors.category?.message)}
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
            label='Beschreibung'
            placeholder='Beschreibe kurz das Projekt'
            errors={formatError(errors.description?.message)}
          />
        )}
      />
      <Controller
        name='location'
        control={control}
        defaultValue={defaultValues?.location}
        render={({ field }) => (
          <FormTextInput
            {...field}
            label='Standort'
            placeholder='Wo befindet sich dein Projekt?'
            type='text'
            optional={true}
          />
        )}
      />
      <button className='mt-6 text-blue-500 underline'>
        Token neu generieren (placeholder)
      </button>
    </ProjectInfoFormWrapper>
  );
};
