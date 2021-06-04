import { FC } from "react";
import { ProjectsList } from "@components/ProjectsList";
import { getPublicProjects, PublicProject } from "@lib/hooks/usePublicProjects";
import { GetServerSideProps } from "next";

interface ProjectsOverviewPropType {
  projects: {
    count: number;
    projects: PublicProject[];
  };
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const projects = await getPublicProjects(500);
    return { props: { projects } };
  } catch (error) {
    console.log(error);
    return { notFound: true };
  }
};

const ProjectsOverview: FC<ProjectsOverviewPropType> = ({ projects }) => {
  if (!projects) return null;
  else return <ProjectsList {...projects} />;
};

export default ProjectsOverview;
