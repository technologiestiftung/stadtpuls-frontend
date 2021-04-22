import { useAuth } from "@auth/Auth";
import { NoAccess } from "@components/PageError/NoAccess";
import { PleaseLogin } from "@components/PageError/PleaseLogin";
import { InvalidPageId } from "@components/PageError/InvalidPageId";
import { ServerError } from "@components/PageError/ServerError";
import { UserProjectsWrapper } from "@components/UserProjectsWrapper";
import { useUserData } from "@lib/hooks/useUserData";
import { useRouter } from "next/router";
import { FC } from "react";
import { ProjectNotFound } from "@components/PageError/ProjectNotFound";

const AccountProjectEditPage: FC = () => {
  const router = useRouter();
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

  if (!project) return <ProjectNotFound projectId={projectId} />;

  return (
    <UserProjectsWrapper projects={projectsForSidebar}>
      {project.name}
    </UserProjectsWrapper>
  );
};

export default AccountProjectEditPage;
