/* import { useAuth } from "@auth/Auth";
import { PleaseLogin } from "@components/PageError/PleaseLogin";
import { ServerError } from "@components/PageError/ServerError";
import { UserProjectsWrapper } from "@components/UserProjectsWrapper";
import { CreateProjectForm } from "@components/CreateProjectForm";
import { useSensorCategories } from "@lib/hooks/useSensorCategories";
import { useUserData } from "@lib/hooks/useUserData";
import { useRouter } from "next/router"; */
import { FC } from "react";
/* import { ProjectsType } from "@common/types/supabase_DEPRECATED";
import { ProjectCreatedInfo } from "@components/ProjectCreatedInfo_DEPRECATED"; */

const AccountProjectNewPage: FC = () => {
  /* const router = useRouter();
  const { authenticatedUser, isLoadingAuth, error: authError } = useAuth();
  const { projects, addProject, error } = useUserData();
  const {
    categories,
    isLoading: isLoadingCategories,
    error: categoriesError,
  } = useSensorCategories();

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
    const res = await addProject(data);
    if (res && Array.isArray(res)) {
      const newProjectId = res[0].id;
      const newProjectName = res[0].name;
      setNewProjectId(newProjectId);
      setNewProjectName(newProjectName);
      setProjectWasCreated(true);
    }
  }; */

  return <div>New project page. TODO: To be deleted</div>;

  /* return (
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
              Dein Projekt muss noch authentifiziert werden, damit die Messwerte
              deiner Sensoren künftig in unsere Datenbank geschrieben werden
              können. Um dein Projekt zu authentifizieren, kopiere den{" "}
              <strong>Token</strong>
              unten in deine Ablage (Strg+C).
              <br />
              &#x26a0; Der Token ist nur einmalig und nur für dich kurz nach
              erstellen deines Projektes sichtbar!
              <br />
              Nachdem du den Token erfolgreich kopiert hast, folge der Anleitung{" "}
              <a href='/docs/ttn-configuration'>
                Applikation auf TTN konfigurieren
              </a>
              und nutze den Token, um deine TTN-Webhook Integration korrekt zu
              konfigurieren.
            </p>
          </ProjectCreatedInfo>
        )}
      </div>
    </UserProjectsWrapper>
  ); */
};

export default AccountProjectNewPage;
