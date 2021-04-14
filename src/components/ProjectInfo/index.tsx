import { FC, ReactNode } from "react";

export interface ProjectInfoPropType {
  title: string;
  category: string;
  projectViewLink: string;
  editLink: string;
  children: ReactNode;
}

export const ProjectInfo: FC<ProjectInfoPropType> = ({
  title,
  category,
  projectViewLink,
  editLink,
  children,
}) => (
  <section className='bg-blue-25 p-6'>
    <header
      className='grid gap-4 items-start'
      style={{ gridTemplateColumns: "auto max-content" }}
    >
      <h2 className='text-primary text-3xl font-bold'>{title}</h2>
      <a
        href={projectViewLink}
        className='p-2 border border-blue-500 text-blue-500 hover:bg-blue-50 transition-colors'
      >
        → Projektseite
      </a>
    </header>
    <div className='mt-4'>
      <p>
        <mark className='p-1 text-sm bg-blue-100 text-blue-500'>
          {category}
        </mark>
      </p>
      <p className='mt-4'>{children}</p>
      <p className='mt-4'>
        <a
          href={editLink}
          className='text-blue-500 hover:text-blue-400 underline transition-colors'
        >
          Projekt bearbeiten
        </a>
      </p>
    </div>
  </section>
);
