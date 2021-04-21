import { ProjectsType } from "@common/types/supabase";
import {
  deleteProjectsProject,
  updateProjectsProject,
} from "./updateProjectsProject";

const createFakeProject = (id: number): ProjectsType => ({
  id,
  name: `Project ${id}`,
  description: `Description for ${id}`,
  createdAt: new Date().toISOString(),
  connectype: "ttn",
  location: "Berlin",
  userId: "A",
  categoryId: 5,
  category: {
    id: 5,
    name: "Temperatur",
    description: "Temperatur description",
  },
  devices: [],
});

const fakeProjects: ProjectsType[] = [
  createFakeProject(1),
  createFakeProject(2),
  createFakeProject(3),
];

describe("updateProjectsDevice", () => {
  it("should update the provided device", () => {
    const newProject = {
      ...createFakeProject(2),
      name: "Mamamia",
    };
    const updatedProjects = updateProjectsProject(fakeProjects, newProject);
    if (!updatedProjects[1]) throw new Error("First project not found");
    expect(updatedProjects[1]).toBe(newProject);
  });
});

describe("deleteProjectsDevice", () => {
  it("should delete the provided device", () => {
    const newProject = createFakeProject(2);
    const updatedProjects = deleteProjectsProject(fakeProjects, newProject.id);
    if (!updatedProjects[1]) throw new Error("First project not found");
    expect(updatedProjects[1]).not.toBe(newProject);
  });
});
