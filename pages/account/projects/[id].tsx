import { useAuth } from "@auth/Auth";
import { RecordsType } from "@common/types/supabase";
import { Anchor } from "@components/Button";
import { NoAccess } from "@components/PageError/NoAccess";
import { PleaseLogin } from "@components/PageError/PleaseLogin";
import { InvalidPageId } from "@components/PageError/InvalidPageId";
import { ServerError } from "@components/PageError/ServerError";
import { ProjectInfo } from "@components/ProjectInfo";
import { SensorsList } from "@components/SensorsList";
import { SmallModalOverlay } from "@components/SmallModalOverlay";
import { UserProjectsWrapper } from "@components/UserProjectsWrapper";
import { useUserData } from "@lib/hooks/useUserData";
import { useRouter } from "next/router";
import { FC } from "react";

const getLastRecordedAt = (records: RecordsType[]): Date | null => {
  const sortedRecords = records
    .filter(record => record.recordedAt)
    .map(record => ({
      ...record,
      recordedAt: new Date(record.recordedAt),
    }))
    .sort((a, b) => a.recordedAt.getTime() - b.recordedAt.getTime());

  if (sortedRecords.length === 0) return null;
  return sortedRecords[0].recordedAt;
};

const AccountProjectPage: FC = () => {
  const router = useRouter();
  const projectId = router.query.id;
  const { authenticatedUser, isLoadingAuth, error: authError } = useAuth();
  const {
    projects,
    updateDevice,
    addDevice,
    deleteDevice,
    error,
  } = useUserData();

  if (isLoadingAuth || (!projects && !error)) return null;

  if (!projectId || Array.isArray(projectId))
    return <InvalidPageId pageType='Projekt' id={projectId.toString()} />;
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
      <ProjectInfo
        title={project.name}
        category={project.category?.name}
        projectViewLink={`/${project.id}`}
        onEditProject={() => undefined}
      >
        {project.description}
      </ProjectInfo>
      <div className='p-3 pb-8'>
        <SensorsList
          sensors={(project.devices || []).map(device => ({
            id: device.id,
            externalId: device.externalId,
            lastRecordedAt: Array.isArray(device.records)
              ? getLastRecordedAt(device.records)
              : null,
            name: device.name || "",
          }))}
          onChange={data =>
            updateDevice({
              ...data,
              projectId: projectIdInt,
              id: parseInt(`${data.id}`, 10),
            })
          }
          onAdd={data =>
            addDevice({ ...data, projectId: projectIdInt }, projectIdInt)
          }
          onDelete={id => deleteDevice(parseInt(`${id}`, 10))}
        />
      </div>
    </UserProjectsWrapper>
  );
};

export default AccountProjectPage;
