import { ProjectsType } from "@common/types/supabase_DEPRECATED";
import { Project } from "@components/Project";
import { getProjectData } from "@lib/requests/getProjectData";
import { GetServerSideProps } from "next";
import { FC } from "react";

export const getServerSideProps: GetServerSideProps = async context => {
  try {
    const projectId = context.query.id;
    if (!projectId || Array.isArray(projectId)) return { notFound: true };

    const projectData = await getProjectData(parseInt(projectId, 10));
    return { props: { project: projectData, error: null } };
  } catch (error) {
    return { notFound: true };
  }
};

const ProjectPage: FC<{
  project: ProjectsType;
}> = ({ project }) => <Project {...project} />;

export default ProjectPage;
