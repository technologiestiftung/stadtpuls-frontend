import { FC, HTMLProps } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Anchor } from "@components/Button";
import {
  UserProjectsNav,
  ProjectListItemType,
} from "@components/UserProjectsNav";

export interface UserProjectWrapperType extends HTMLProps<HTMLElement> {
  projects: ProjectListItemType[];
}

export const UserProjectsWrapper: FC<UserProjectWrapperType> = ({
  projects,
  children,
}) => {
  const router = useRouter();
  const { id } = router.query;

  const handleSelectProject = (projectId: string): void => {
    void router.push(`/account/projects/${projectId}`);
  };

  return (
    <div
      className='max-w-screen-lg mx-auto p-6 block md:grid gap-4 grid-cols-12'
      style={{ paddingTop: "5vmax" }}
    >
      <section className='col-span-4'>
        <h1 className='text-3xl text-blue-500 font-bold mt-6'>
          Meine Projekte
        </h1>
        <div className='mt-8'>
          <Link href={"/account/projects/new"}>
            <Anchor href={"/account/projects/new"} variant='primary'>
              Neues Projekt
            </Anchor>
          </Link>
          <UserProjectsNav
            projects={projects}
            defaultSelectedProject={
              projects.find(project => project.projectId === id) || null
            }
            onSelectProject={handleSelectProject}
            className='mt-12'
          />
        </div>
      </section>
      <main
        className={["md:col-span-8 mt-6 md:mt-0", "bg-white shadow-md"].join(
          " "
        )}
      >
        {children}
      </main>
    </div>
  );
};
