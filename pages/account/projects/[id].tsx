import { useAuth } from "@auth/Auth";
import { useUserData } from "@lib/hooks/useUserData";
import { useRouter } from "next/router";
import { FC } from "react";

const AccountProjectPage: FC = () => {
  const router = useRouter();
  const projectId = router.query.id;
  const { authenticatedUser } = useAuth();
  const { projects } = useUserData();

  console.log(authenticatedUser);

  if (!projectId || Array.isArray(projectId)) {
    return <div>Die angegebene Projekt-Id ist ungültig.</div>;
  }

  console.log(projects);

  if (!authenticatedUser || !projects || projects.length === 0) {
    return (
      <div>
        Sie haben nicht die erforderlichen Berechtigungen, um auf diese Seite
        zuzugreifen.
      </div>
    );
  }

  const projectIdInt = parseInt(projectId, 10);
  const project = projects.find(({ id }) => id === projectIdInt);

  if (!project) {
    return <div>{`You don't have any project with ID "${projectId}".`}</div>;
  }

  return <div>{project.name}</div>;
};

export default AccountProjectPage;
