import { FC, ReactNode } from "react";
import Link from "next/link";
import { Button, Anchor } from "@components/Button";

export interface ProjectInfoPropType {
  title: string;
  category: string;
  projectViewLink: string;
  onEditProject: () => void;
  children: ReactNode;
}

export const ProjectInfo: FC<ProjectInfoPropType> = ({
  title,
  category,
  projectViewLink,
  onEditProject,
  children,
}) => (
  <section className='bg-blue-25 p-6'>
    <header
      className='grid gap-4 items-start'
      style={{ gridTemplateColumns: "auto max-content" }}
    >
      <h2 className='text-blue-500 text-3xl font-bold'>{title}</h2>
      <Link href={projectViewLink}>
        <Anchor href={projectViewLink}>→ Projektseite</Anchor>
      </Link>
    </header>
    <div className='mt-4'>
      <p>
        <mark className='p-1 text-sm bg-blue-100 text-blue-500'>
          {category}
        </mark>
      </p>
      <div className='mt-4 max-w-prose'>{children}</div>
      <Button onClick={onEditProject} className='mt-4'>
        Projekt bearbeiten
      </Button>
    </div>
  </section>
);
