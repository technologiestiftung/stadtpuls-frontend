import { FC } from "react";
import { ProjectPreview } from "../ProjectPreview";
import { PublicProjects } from "@lib/hooks/usePublicProjects";

export const Overview: FC<PublicProjects> = ({ projects }) => (
  <div className='p-4 sm:p-6 md:p-8'>
    <div
      className='grid sm:grid-cols-2 2xl:grid-cols-3 mx-auto gap-4 sm:gap-6 md:gap-8'
      style={{ maxWidth: 1920 }}
    >
      {projects &&
        projects.map(project => {
          return <ProjectPreview key={project.id} {...project} />;
        })}
    </div>
  </div>
);
