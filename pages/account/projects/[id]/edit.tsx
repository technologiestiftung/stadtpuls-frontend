import { useAuth } from "@auth/Auth";
import { Anchor } from "@components/Button";
/* import { NoAccess } from "@components/PageError/NoAccess";
import { PleaseLogin } from "@components/PageError/PleaseLogin";
import { InvalidPageId } from "@components/PageError/InvalidPageId";
import { ServerError } from "@components/PageError/ServerError"; */
import {
  EditProjectForm,
  EditableProjectFieldsType,
} from "@components/EditProjectForm";
import { SmallModalOverlay } from "@components/SmallModalOverlay";
import { UserProjectsWrapper } from "@components/UserProjectsWrapper";
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

  // TODO: replace with actual components
  if (!projectId || Array.isArray(projectId)) return <p>Invalid page id</p>;
  if (!authenticatedUser) return <p>Please login</p>;
  if (error) return <p>Server error</p>;
  if (authError) return <p>Auth error</p>;
  if (!projects || projects.length === 0) return <p>No access</p>;

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
