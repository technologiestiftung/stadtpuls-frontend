import { FC } from "react";
import { Overview } from "@components/Overview";
import { usePublicProjects } from "@lib/hooks/usePublicProjects";
import { useStoreState } from "@state/hooks";

const ProjectsOverview: FC = () => {
  const recordsLimit = useStoreState(state => state.records.segmentSize);
  const { data, error } = usePublicProjects(0, recordsLimit);

  if (!data || error) return null;
  else return <Overview {...data} />;
};

export default ProjectsOverview;
