import { useAuth } from "@auth/Auth";
import { PleaseLogin } from "@components/PageError/PleaseLogin";
import { ServerError } from "@components/PageError/ServerError";
import { UserProjectsWrapper } from "@components/UserProjectsWrapper";
import { CreateProjectForm } from "@components/CreateProjectForm";
import { useProjectCategories } from "@lib/hooks/useProjectCategories";
import { useUserData } from "@lib/hooks/useUserData";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { ProjectsType } from "@common/types/supabase";
import { ProjectCreatedInfo } from "@components/ProjectCreatedInfo";

const AccountProjectNewPage: FC = () => {
  const router = useRouter();
  const { authenticatedUser, isLoadingAuth, error: authError } = useAuth();
  const { projects, addProject, error } = useUserData();
  const {
    categories,
    isLoading: isLoadingCategories,
    error: categoriesError,
  } = useProjectCategories();

  const [projectWasCreated, setProjectWasCreated] = useState(false);
  const [newProjectId, setNewProjectId] = useState<number | undefined>(
    undefined
  );
  const [newProjectName, setNewProjectName] = useState<string | undefined>(
    undefined
  );

  if (isLoadingAuth || (!projects && !error)) return null;

  if (!authenticatedUser) return <PleaseLogin />;
  if (error) return <ServerError error={error.message} />;
  if (authError) return <ServerError error={authError} />;

  const projectsForSidebar = projects?.map(({ id, name }) => ({
    projectId: `${id}`,
    name,
  }));

  const handleCancel = (): void => {
    const exitRoute =
      projectsForSidebar && projectsForSidebar.length !== 0
        ? `/account/projects/${projectsForSidebar[0].projectId}`
        : "/account/profile";
    void router.push(exitRoute);
  };

  const handleSubmit = async (data: ProjectsType): Promise<void> => {
    const res = await addProject({
      ...data,
    });
    if (res && Array.isArray(res)) {
      const newProjectId = res[0].id;
      const newProjectName = res[0].name;
      setNewProjectId(newProjectId);
      setNewProjectName(newProjectName);
      setProjectWasCreated(true);
    }
  };

  return (
    <UserProjectsWrapper projects={projectsForSidebar || null}>
      <div className='p-6'>
        {!projectWasCreated && (
          <>
            {categories && !isLoadingCategories && !categoriesError && (
              <CreateProjectForm
                categoryOptions={categories.map(category => {
                  return {
                    value: `${category.id}`,
                    name: category.name,
                  };
                })}
                integrationOptions={[{ name: "TTN", value: "ttn" }]} // TODO: currently hard-coded, needs a useConnectypes hook
                onCancel={handleCancel}
                onSubmit={handleSubmit}
              />
            )}
          </>
        )}
        {projectWasCreated && newProjectId && newProjectName && (
          <ProjectCreatedInfo
            projectId={newProjectId}
            projectTitle={newProjectName}
          >
            <p>
              Das sind deine nächsten Schritte. Das sind deine nächsten
              Schritte. Das sind deine nächsten Schritte. Das sind deine
              nächsten Schritte. Das sind deine nächsten Schritte.
            </p>
          </ProjectCreatedInfo>
        )}
      </div>
    </UserProjectsWrapper>
  );
};

export default AccountProjectNewPage;
