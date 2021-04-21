import { Button, Submit } from "@components/Button";
import { HTMLProps, FC } from "react";

export interface ProjectInfoFormWrapperPropType
  extends HTMLProps<HTMLFormElement> {
  type: "create" | "edit";
  handleCancel: () => void;
  handleDelete?: () => void;
}

interface TextsObjectType {
  title: string;
}

const getTextsByType = (type: "create" | "edit"): TextsObjectType =>
  type === "create"
    ? {
        title: "Projekt erstellen",
      }
    : {
        title: "Projekt bearbeiten",
      };

export const ProjectInfoFormWrapper: FC<ProjectInfoFormWrapperPropType> = ({
  type,
  handleCancel,
  handleDelete,
  children,
  ...formProps
}) => {
  const texts = getTextsByType(type);
  const formId = `${type}-project-form`;

  return (
    <div>
      <h2 className='text-3xl text-blue-500 font-bold'>{texts.title}</h2>
      <form noValidate {...formProps} id={formId} className='mt-4'>
        {children}
      </form>
      <footer className='mt-24'>
        {type === "edit" && (
          <div className='flex place-content-between'>
            <button
              className='text-red-500 focus-offset'
              onClick={handleDelete}
            >
              Projekt löschen
            </button>
            <div>
              <Button onClick={handleCancel}>Abbrechen</Button>
              <Submit variant='primary' form={formId} className='ml-4'>
                Speichern
              </Submit>
            </div>
          </div>
        )}
        {type === "create" && (
          <div className='flex justify-end'>
            <Button onClick={handleCancel}>Abbrechen</Button>
            <Submit variant='primary' form={formId} className='ml-4'>
              Weiter
            </Submit>
          </div>
        )}
      </footer>
    </div>
  );
};
