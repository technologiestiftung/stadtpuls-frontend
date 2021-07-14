import { FC, ReactNode } from "react";
import Link from "next/link";
import { AnchorButton } from "@components/Button";
import { TextLink } from "@components/TextLink";

export interface ProjectInfoPropType {
  title: string;
  category?: string;
  projectViewLink: string;
  projectEditLink: string;
  children: ReactNode;
}

export const ProjectInfo: FC<ProjectInfoPropType> = ({
  title,
  category,
  projectViewLink,
  projectEditLink,
  children,
}) => (
  <section className='bg-gray-50 p-6'>
    <header
      className='grid gap-4 items-start'
      style={{ gridTemplateColumns: "auto max-content" }}
    >
      <h2 className='text-blue text-3xl font-bold'>{title}</h2>
      <Link href={projectViewLink}>
        <AnchorButton href={projectViewLink}>→ Projektseite</AnchorButton>
      </Link>
    </header>
    <div className='mt-3'>
      {category && (
        <p>
          <mark className='p-1 text-sm bg-gray-100 text-blue'>{category}</mark>
        </p>
      )}
      <div className='mt-2 max-w-prose'>{children}</div>
      <Link href={projectEditLink}>
        <TextLink href={projectEditLink} className='mt-4 inline-block'>
          Projekt bearbeiten
        </TextLink>
      </Link>
    </div>
  </section>
);
