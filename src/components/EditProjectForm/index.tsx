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
import { ProjectsType } from "@common/types/supabase";

type EditableProjectFieldsType = Pick<
  ProjectsType,
  "name" | "location" | "categoryId" | "description"
>;

export interface ProjectForm {
  categoryOptions: SelectOptionType[];
  defaultValues?: Partial<ProjectsType>;
  onSubmit?: (data: ProjectsType) => void;
  onCancel: () => void;
  onDelete: () => void;
}

const formSchema = yup.object().shape({
  name: requiredProjectTitleValidation,
  categoryId: requiredProjectCategoryValidation,
  description: requiredProjectDescriptionValidation,
});

export const EditProjectForm: FC<ProjectForm> = ({
  categoryOptions,
  defaultValues,
  onSubmit = console.log,
  onCancel,
  onDelete,
  children,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EditableProjectFieldsType>({
    resolver: yupResolver(formSchema),
  });

  const onInternalSubmit = handleSubmit(data => onSubmit(data));

  const formatError = (errorMsg?: string): string[] =>
    errorMsg ? [errorMsg] : [];

  return (
    <ProjectInfoFormWrapper
      onSubmit={onInternalSubmit}
      handleCancel={onCancel}
      handleDelete={onDelete}
      type='edit'
    >
      <Controller
        name='name'
        control={control}
        defaultValue={defaultValues?.name}
        render={({ field }) => (
          <FormTextInput
            {...field}
            label='Titel'
            placeholder='Wie soll dein Projekt heißen?'
            type='text'
            errors={formatError(errors.name?.message)}
          />
        )}
      />
      <Controller
        name='categoryId'
        control={control}
        defaultValue={defaultValues?.categoryId}
        render={({ field }) => (
          <FormSelect
            {...field}
            label='Kategorie'
            options={categoryOptions}
            errors={formatError(errors.categoryId?.message)}
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
      <div className='mt-12'>{children}</div>
    </ProjectInfoFormWrapper>
  );
};
