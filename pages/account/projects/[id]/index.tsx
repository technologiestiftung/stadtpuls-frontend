/* import { useAuth } from "@auth/Auth";
import { NoAccess } from "@components/PageError/NoAccess";
import { PleaseLogin } from "@components/PageError/PleaseLogin";
import { InvalidPageId } from "@components/PageError/InvalidPageId";
import { ServerError } from "@components/PageError/ServerError";
import { ProjectInfo } from "@components/ProjectInfo";
import { UserProjectsWrapper } from "@components/UserProjectsWrapper";
import { useUserData } from "@lib/hooks/useUserData";
import { useRouter } from "next/router"; */
import { FC } from "react";
/* import { SensorsListWithData } from "@components/SensorsList/WithData";
import { ProjectNotFound } from "@components/PageError/ProjectNotFound"; */

const AccountProjectPage: FC = () => {
  /* const router = useRouter();
  const projectId = router.query.id;
  const { authenticatedUser, isLoadingAuth, error: authError } = useAuth();
  const { projects, error } = useUserData();

  if (isLoadingAuth || (!projects && !error)) return null;

  if (!projectId || Array.isArray(projectId))
    return (
      <InvalidPageId
        pageType='Projekt'
        id={projectId ? projectId.toString() : projectId}
      />
    );
  if (!authenticatedUser) return <PleaseLogin />;
  if (error) return <ServerError error={error.message} />;
  if (authError) return <ServerError error={authError} />;
  if (!projects || projects.length === 0) return <NoAccess />;

  const projectIdInt = parseInt(projectId, 10);
  const project = projects.find(({ id }) => id === projectIdInt);
  const projectsForSidebar = projects.map(({ id, name }) => ({
    projectId: `${id}`,
    name,
  }));

  if (!project) return <ProjectNotFound projectId={projectId} />; */

  return <div>Project page. TODO: To be deleted</div>;

  /* return (
    <UserProjectsWrapper projects={projectsForSidebar}>
      <ProjectInfo
        title={project.name}
        category={project.category?.name}
        projectViewLink={`/${project.id}`}
        projectEditLink={`/account/projects/${project.id}/edit`}
      >
        {project.description}
      </ProjectInfo>
      <SensorsListWithData
        devices={project.devices || []}
        projectId={projectIdInt}
      />
    </UserProjectsWrapper>
  ); */
};

export default AccountProjectPage;
