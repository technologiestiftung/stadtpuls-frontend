import { Project } from "@components/Project";
import { useStoreActions } from "@state/hooks";
import { FC, useEffect } from "react";

const ProjectPage: FC = () => {
  const loadDevices = useStoreActions(action => action.projects.load);

  useEffect(() => {
    loadDevices();
  }, [loadDevices]);

  return <Project />;
};

export default ProjectPage;
