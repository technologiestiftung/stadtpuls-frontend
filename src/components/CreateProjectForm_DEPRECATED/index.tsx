// import { FC } from "react";
// import * as yup from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { Controller, useForm } from "react-hook-form";
// import { ProjectInfoFormWrapper } from "@components/ProjectInfoFormWrapper_DEPRECATED";
// import { FormTextInput } from "@components/FormTextInput";
// import { FormSelect, SelectOptionType } from "@components/FormSelect";
// import { FormTextarea } from "@components/FormTextarea";
// import {
//   requiredProjectTitleValidation,
//   requiredProjectCategoryValidation,
//   requiredProjectDescriptionValidation,
//   requiredProjectConnectypeValidation,
// } from "@lib/formValidationUtil";
// import { ProjectsType } from "@common/types/supabase_DEPRECATED";

import { FC } from "react";

// type ChoosableProjectFieldsType = Pick<
//   ProjectsType,
//   "name" | "location" | "categoryId" | "description" | "connectype"
// >;

// export interface ProjectForm {
//   categoryOptions: SelectOptionType[];
//   integrationOptions: SelectOptionType[];
//   onSubmit?: (data: ProjectsType) => void;
//   onCancel: () => void;
// }

// const formSchema = yup.object().shape({
//   name: requiredProjectTitleValidation,
//   categoryId: requiredProjectCategoryValidation,
//   description: requiredProjectDescriptionValidation,
//   connectype: requiredProjectConnectypeValidation,
// });

// export const CreateProjectForm: FC<ProjectForm> = ({
//   categoryOptions,
//   integrationOptions,
//   onSubmit = console.log,
//   onCancel,
// }) => {
//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<ChoosableProjectFieldsType>({
//     resolver: yupResolver(formSchema),
//   });

//   const onInternalSubmit = handleSubmit(data =>
//     onSubmit({
//       categoryId: data.categoryId,
//       name: data.name,
//       description: data.description,
//       location: data.location,
//       connectype: data.connectype,
//     })
//   );

//   const formatError = (errorMsg?: string): string[] =>
//     errorMsg ? [errorMsg] : [];

//   return (
//     <ProjectInfoFormWrapper
//       onSubmit={onInternalSubmit}
//       handleCancel={onCancel}
//       type='create'
//     >
//       <Controller
//         name='name'
//         control={control}
//         defaultValue=''
//         render={({ field }) => (
//           <FormTextInput
//             {...field}
//             label='Titel'
//             placeholder='Wie soll dein Projekt heißen?'
//             type='text'
//             errors={formatError(errors.name?.message)}
//           />
//         )}
//       />
//       <Controller
//         name='categoryId'
//         control={control}
//         defaultValue=''
//         render={({ field }) => (
//           <FormSelect
//             {...field}
//             label='Kategorie'
//             options={categoryOptions}
//             errors={formatError(errors.categoryId?.message)}
//           />
//         )}
//       />
//       <Controller
//         name='description'
//         control={control}
//         defaultValue=''
//         render={({ field }) => (
//           <FormTextarea
//             {...field}
//             label='Beschreibung'
//             placeholder='Beschreibe kurz das Projekt'
//             errors={formatError(errors.description?.message)}
//           />
//         )}
//       />
//       <Controller
//         name='location'
//         control={control}
//         defaultValue=''
//         render={({ field }) => (
//           <FormTextInput
//             {...field}
//             label='Standort'
//             placeholder='Wo befindet sich dein Projekt?'
//             type='text'
//             optional={true}
//           />
//         )}
//       />
//       <Controller
//         name='connectype'
//         control={control}
//         defaultValue=''
//         render={({ field }) => (
//           <FormSelect
//             {...field}
//             label='Integration'
//             placeholder='Wie möchtest du dein Projekt integrieren?'
//             options={integrationOptions}
//             errors={formatError(errors.connectype?.message)}
//           />
//         )}
//       />
//     </ProjectInfoFormWrapper>
//   );
// };

export const CreateProjectForm: FC = () => null;
