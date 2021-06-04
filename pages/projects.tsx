import { FC } from "react";
import { ProjectsList } from "@components/ProjectsList";
import {
  getPublicProjects,
  PublicProject,
  usePublicProjects,
} from "@lib/hooks/usePublicProjects";
import { GetServerSideProps } from "next";

interface ProjectsOverviewPropType {
  initialData: {
    count: number;
    projects: PublicProject[];
  };
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const initialData = await getPublicProjects(500);
    return { props: { initialData } };
  } catch (error) {
    return { notFound: true };
  }
};

const ProjectsOverview: FC<ProjectsOverviewPropType> = ({ initialData }) => {
  const { data, error } = usePublicProjects({
    recordsLimit: 500,
    initialData,
  });

  if (!data || error) return null;
  else return <ProjectsList {...data} />;
};

export default ProjectsOverview;
