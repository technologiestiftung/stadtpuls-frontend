import { FC } from "react";
import { ProjectsList } from "@components/ProjectsList";
import { usePublicProjects } from "@lib/hooks/usePublicProjects";
import { useStoreState } from "@state/hooks";

const ProjectsOverview: FC = () => {
  const recordsLimit = useStoreState(state => state.records.segmentSize);
  const { data, error } = usePublicProjects(recordsLimit);

  if (!data || error) return null;
  else return <ProjectsList {...data} />;
};

export default ProjectsOverview;
