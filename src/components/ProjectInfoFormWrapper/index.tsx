import { Button, Submit } from "@components/Button";
import { HTMLProps, FC } from "react";

export interface ProjectInfoFormWrapperPropType
  extends HTMLProps<HTMLFormElement> {
  type: "create" | "edit";
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
  children,
  ...formProps
}) => {
  const texts = getTextsByType(type);
  const formId = `${type}-project-form`;

  return (
    <>
      <h2 className='text-3xl text-blue-500 font-bold'>{texts.title}</h2>
      <form noValidate {...formProps} id={formId} className='mt-4'>
        {children}
      </form>
      {type === "edit" && (
        <footer className='mt-12 flex place-content-between'>
          <button className='text-red-500'>Projekt löschen</button>
          <div>
            <Button>Abbrechen</Button>
            <Submit variant='primary' form={formId} className='ml-4'>
              Speichern
            </Submit>
          </div>
        </footer>
      )}
      {type === "create" && (
        <footer className='mt-12 flex justify-end'>
          <Submit variant='primary' form={formId} className='ml-4'>
            Weiter
          </Submit>
        </footer>
      )}
    </>
  );
};
