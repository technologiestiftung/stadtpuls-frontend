import { useAuth } from "@auth/Auth";
import { NoAccess } from "@components/PageError/NoAccess";
import { PleaseLogin } from "@components/PageError/PleaseLogin";
import { InvalidPageId } from "@components/PageError/InvalidPageId";
import { ServerError } from "@components/PageError/ServerError";
import { UserProjectsWrapper } from "@components/UserProjectsWrapper";
import { Button } from "@components/Button";
import { EditProjectForm } from "@components/EditProjectForm";
import { useSensorCategories } from "@lib/hooks/useSensorCategories";
import { useUserData } from "@lib/hooks/useUserData";
import { useRouter } from "next/router";
import React, { FC, useState } from "react";
import { ProjectsType } from "@common/types/supabase_DEPRECATED";
import { ProjectNotFound } from "@components/PageError/ProjectNotFound";
import { SmallModalOverlay } from "@components/SmallModalOverlay";
import { ButtonTextLink } from "@components/TextLink";
import { TokenDisplay } from "@components/TokenDisplay";
import { useProjectTokens } from "@lib/hooks/useProjectTokens";
import { TokenResponseObjectType } from "@common/interfaces";

const AccountProjectEditPage: FC = () => {
  const router = useRouter();
  const { id: editingProjectId } = router.query;
  const {
    authenticatedUser,
    isLoadingAuth,
    error: authError,
    accessToken,
  } = useAuth();
  const { projects, updateProject, deleteProject, error } = useUserData();
  const {
    categories,
    isLoading: isLoadingCategories,
    error: categoriesError,
  } = useSensorCategories();

  const parsedProjectId = Array.isArray(editingProjectId)
    ? editingProjectId[0]
    : editingProjectId;

  const { createToken, error: tokenError } = useProjectTokens(
    parseInt(parsedProjectId, 10)
  );

  const [token, setToken] = useState<string | undefined>(undefined);

  const generateNewToken: () => void = () => {
    const createTokenFunction = async (): Promise<void> => {
      const responseString = await createToken(
        `Token for project ID ${parsedProjectId}`
      );
      const parsedResponse: TokenResponseObjectType = JSON.parse(
        responseString
      ) as TokenResponseObjectType;
      setToken(parsedResponse.data.token);
    };

    if (!accessToken) return;
    void createTokenFunction();
  };

  const [deleteIsInitiated, setDeleteIsInitiated] = useState(false);

  if (isLoadingAuth || (!projects && !error)) return null;

  if (!editingProjectId || Array.isArray(editingProjectId))
    return (
      <InvalidPageId
        pageType='Projekt'
        id={editingProjectId ? editingProjectId.toString() : editingProjectId}
      />
    );
  if (!authenticatedUser) return <PleaseLogin />;
  if (error) return <ServerError error={error.message} />;
  if (authError) return <ServerError error={authError} />;
  if (!projects || projects.length === 0) return <NoAccess />;

  const editingProjectIdInt = parseInt(editingProjectId, 10);
  const project = projects.find(({ id }) => id === editingProjectIdInt);
  const projectsForSidebar = projects.map(({ id, name }) => ({
    projectId: `${id}`,
    name,
  }));

  const currentProjectValues: Partial<ProjectsType> = {
    name: project?.name,
    description: project?.description,
    location: project?.location,
    categoryId: project?.category?.id,
  };

  const handleSubmit = (data: ProjectsType): void => {
    void updateProject({
      ...project,
      ...data,
    });
    void router.push(`/account/projects/${editingProjectId}`);
  };

  const handleDelete = (): void => {
    const remainingProjects = projectsForSidebar.filter(
      project => project.projectId !== editingProjectId
    );
    const exitRoute =
      projectsForSidebar.length !== 0
        ? `/account/projects/${remainingProjects[0].projectId}`
        : "/account/profile";

    void deleteProject(parseInt(`${editingProjectId}`, 10));
    void router.push(exitRoute);
  };

  if (!project) return <ProjectNotFound projectId={editingProjectId} />;

  return (
    <>
      <UserProjectsWrapper projects={projectsForSidebar}>
        <div className='p-6'>
          {categories && !isLoadingCategories && !categoriesError && (
            <EditProjectForm
              categoryOptions={categories.map(category => {
                return {
                  value: `${category.id}`,
                  name: category.name,
                };
              })}
              defaultValues={currentProjectValues}
              onCancel={() =>
                router.push(`/account/projects/${editingProjectId}`)
              }
              onDelete={() => setDeleteIsInitiated(true)}
              onSubmit={handleSubmit}
            >
              <div className='block'>
                <TokenDisplay hasError={!!tokenError}>
                  {token && !tokenError ? token : tokenError}
                </TokenDisplay>
                <div className='w-full mt-2 flex justify-end'>
                  <ButtonTextLink onClick={generateNewToken}>
                    Neu generieren
                  </ButtonTextLink>
                </div>
              </div>
            </EditProjectForm>
          )}
        </div>
      </UserProjectsWrapper>
      {deleteIsInitiated && (
        <SmallModalOverlay
          title='Bitte bestätige die Löschung deines Projekts'
          variant='dangerous'
          footerContent={
            <div className='flex justify-end w-full'>
              <Button
                className='mr-4'
                variant='dangerous'
                onClick={handleDelete}
              >
                Löschen
              </Button>
              <Button
                variant='primary'
                onClick={() => setDeleteIsInitiated(false)}
              >
                Abbrechen
              </Button>
            </div>
          }
        >
          Der folgende Projekt samt aller Sensoren und Daten wird unwiderruflich
          gelöscht.
          <div className='bg-gray-50 p-3 mt-2'>
            <span className='mr-3 inline-block'>{project.name}</span>
          </div>
        </SmallModalOverlay>
      )}
    </>
  );
};

export default AccountProjectEditPage;
