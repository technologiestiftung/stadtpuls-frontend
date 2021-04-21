import { useAuth } from "@auth/Auth";
import { Anchor } from "@components/Button";
import { NoAccess } from "@components/PageError/NoAccess";
import { PleaseLogin } from "@components/PageError/PleaseLogin";
import { InvalidPageId } from "@components/PageError/InvalidPageId";
import { ServerError } from "@components/PageError/ServerError";
import { SmallModalOverlay } from "@components/SmallModalOverlay";
import { UserProjectsWrapper } from "@components/UserProjectsWrapper";
import {
  EditProjectForm,
  EditableProjectFieldsType,
} from "@components/EditProjectForm";
import { useProjectCategories } from "@lib/hooks/useProjectCategories";
import { useUserData } from "@lib/hooks/useUserData";
import { useRouter } from "next/router";
import { FC } from "react";

const AccountProjectEditPage: FC = () => {
  const router = useRouter();
  const projectId = router.query.id;
  const { authenticatedUser, isLoadingAuth, error: authError } = useAuth();
  const { projects, error } = useUserData();
  const {
    categories,
    isLoading: isLoadingCategories,
    error: categoriesError,
  } = useProjectCategories();

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

  const currentProjectValues: Partial<EditableProjectFieldsType> = {
    name: project?.name,
    description: project?.description,
    location: project?.location,
    categoryId: project?.category?.id,
  };

  if (!project) {
    return (
      <SmallModalOverlay
        title='Project nicht gefunden'
        footerContent={
          <div className='block w-full text-right'>
            <Anchor href='/account/profile'>Zu meinem profil</Anchor>
          </div>
        }
      >
        {`Sie haben kein Projekt mit der ID "${projectId}".`}
      </SmallModalOverlay>
    );
  }

  return (
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
            onDelete={() => console.log("Delete")}
          />
        )}
      </div>
    </UserProjectsWrapper>
  );
};

export default AccountProjectEditPage;
