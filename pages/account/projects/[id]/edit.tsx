import { useAuth } from "@auth/Auth";
import { AnchorButton } from "@components/Button";
import { NoAccess } from "@components/PageError/NoAccess";
import { PleaseLogin } from "@components/PageError/PleaseLogin";
import { InvalidPageId } from "@components/PageError/InvalidPageId";
import { ServerError } from "@components/PageError/ServerError";
import { SmallModalOverlay } from "@components/SmallModalOverlay";
import { UserProjectsWrapper } from "@components/UserProjectsWrapper";
import { Button } from "@components/Button";
import { EditProjectForm } from "@components/EditProjectForm";
import { useProjectCategories } from "@lib/hooks/useProjectCategories";
import { useUserData } from "@lib/hooks/useUserData";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { ProjectsType } from "@common/types/supabase";

const AccountProjectEditPage: FC = () => {
  const router = useRouter();
  const projectId = router.query.id;
  const { authenticatedUser, isLoadingAuth, error: authError } = useAuth();
  const { projects, updateProject, deleteProject, error } = useUserData();
  const {
    categories,
    isLoading: isLoadingCategories,
    error: categoriesError,
  } = useProjectCategories();

  const [deleteIsInitiated, setDeleteIsInitiated] = useState(false);

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
    void router.push(`/account/projects/${projectId}`);
  };

  const handleDelete = (): void => {
    const exitRoute =
      projectsForSidebar.length !== 0
        ? `/account/projects/${projectsForSidebar[0].projectId}`
        : "/account/profile";

    void deleteProject(parseInt(`${projectId}`, 10));
    void router.push(exitRoute);
  };

  if (!project) {
    return (
      <SmallModalOverlay
        title='Project nicht gefunden'
        footerContent={
          <div className='block w-full text-right'>
            <AnchorButton href='/account/profile'>
              Zu meinem profil
            </AnchorButton>
          </div>
        }
      >
        {`Sie haben kein Projekt mit der ID "${projectId}".`}
      </SmallModalOverlay>
    );
  }

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
              onCancel={() => router.push(`/account/projects/${projectId}`)}
              onDelete={() => setDeleteIsInitiated(true)}
              onSubmit={handleSubmit}
            />
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
          <div className='bg-blue-25 p-3 mt-2'>
            <span className='mr-3 inline-block'>{project.name}</span>
          </div>
        </SmallModalOverlay>
      )}
    </>
  );
};

export default AccountProjectEditPage;
