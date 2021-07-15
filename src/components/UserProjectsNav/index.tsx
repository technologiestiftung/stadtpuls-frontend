import { FC, useState, HTMLProps } from "react";

export interface ProjectListItemType {
  projectId: string;
  name: string;
}

export interface UserProjectsNavType extends HTMLProps<HTMLElement> {
  projects: ProjectListItemType[];
  defaultSelectedProject?: ProjectListItemType | null;
  onSelectProject: (projectId: string) => void;
}

export const UserProjectsNav: FC<UserProjectsNavType> = ({
  projects,
  defaultSelectedProject,
  onSelectProject,
  children,
  ...props
}) => {
  const [selectedProject, setSelectedProject] = useState(
    defaultSelectedProject
  );

  const handleSelectProject = (projectId: string): void => {
    const newlySelectedProject = projects.find(
      project => project.projectId === projectId
    );

    if (!newlySelectedProject) return;

    setSelectedProject(newlySelectedProject);
    onSelectProject(newlySelectedProject.projectId);

    return;
  };
  return (
    <nav aria-label='Projekte-Navigation' {...props}>
      {children}
      <ul>
        {projects.map(project => {
          return (
            <li
              aria-labelledby={`user-project-item-${project.projectId}`}
              key={project.projectId}
              className={[
                `my-4`,
                `${
                  project.projectId === selectedProject?.projectId
                    ? "border-opacity-100"
                    : "border-opacity-0"
                }`,
              ].join(" ")}
            >
              <button
                id={`user-project-item-${project.projectId}`}
                onClick={() => handleSelectProject(project.projectId)}
                className={[
                  `py-0 pl-4 border-l-2 border-purple focus-offset text-left transition focus:ring-blue`,
                  `${
                    project.projectId === selectedProject?.projectId
                      ? "text-blue border-opacity-100"
                      : "text-gray-500 border-opacity-0"
                  }`,
                ].join(" ")}
              >
                {project.name}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
