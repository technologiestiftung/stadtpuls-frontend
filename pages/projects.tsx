import { FC } from "react";
import { ProjectsList } from "@components/ProjectsList";
import { usePublicProjects } from "@lib/hooks/usePublicProjects";

const ProjectsOverview: FC = () => {
  const { data, error } = usePublicProjects(500);

  if (!data || error) return null;
  else return <ProjectsList {...data} />;
};

export default ProjectsOverview;
