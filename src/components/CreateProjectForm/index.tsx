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
  requiredProjectIntegrationValidation,
} from "@lib/formValidationUtil";

interface ProjectFormDataToSubmit {
  title: string;
  category: string;
  description: string;
  location?: string;
  integration: string;
}

export interface ProjectForm {
  categoryOptions: SelectOptionType[];
  integrationOptions: SelectOptionType[];
  onSubmit?: (data: ProjectFormDataToSubmit) => void;
}

const formSchema = yup.object().shape({
  title: requiredProjectTitleValidation,
  category: requiredProjectCategoryValidation,
  description: requiredProjectDescriptionValidation,
  integration: requiredProjectIntegrationValidation,
});

export const CreateProjectForm: FC<ProjectForm> = ({
  categoryOptions,
  integrationOptions,
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
    <ProjectInfoFormWrapper onSubmit={onInternalSubmit} type='create'>
      <Controller
        name='title'
        control={control}
        defaultValue=''
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
        defaultValue=''
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
        defaultValue=''
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
        defaultValue=''
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
      <Controller
        name='integration'
        control={control}
        defaultValue=''
        render={({ field }) => (
          <FormSelect
            {...field}
            label='Integration'
            placeholder='Wie möchtest du dein Projekt integrieren?'
            options={integrationOptions}
            errors={formatError(errors.integration?.message)}
          />
        )}
      />
    </ProjectInfoFormWrapper>
  );
};
