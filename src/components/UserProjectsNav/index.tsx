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
              className='my-4'
            >
              <button
                id={`user-project-item-${project.projectId}`}
                onClick={() => handleSelectProject(project.projectId)}
                className={[
                  `focus-offset text-left transition`,
                  `${
                    project.projectId === selectedProject?.projectId
                      ? "navigation-link-active"
                      : "navigation-link"
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
