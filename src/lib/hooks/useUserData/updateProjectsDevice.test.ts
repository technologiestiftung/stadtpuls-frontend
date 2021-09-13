import { ProjectsType, DevicesType } from "@common/types/supabase_DEPRECATED";
import {
  addProjectsDevice,
  deleteProjectsDevice,
  updateProjectsDevice,
} from "./updateProjectsDevice";

const createFakeDevice = (id: number): DevicesType => ({
  id,
  externalId: `external-${id}`,
  name: `Device ${id}`,
  projectId: 1,
});

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
  devices: [
    createFakeDevice(1 * id),
    createFakeDevice(2 * id),
    createFakeDevice(3 * id),
  ],
});

const fakeProjects: ProjectsType[] = [
  createFakeProject(1),
  createFakeProject(2),
  createFakeProject(3),
];

describe("updateProjectsDevice", () => {
  it("should update the provided device", () => {
    const newDevice2 = {
      ...createFakeDevice(2),
      name: "Mamamia",
    };
    const updatedProjects = updateProjectsDevice(fakeProjects, newDevice2);
    if (!updatedProjects[0]) throw new Error("First project not found");
    if (!Array.isArray(updatedProjects[0].devices))
      throw new Error("First project has no devices");
    if (!updatedProjects[0].devices[1])
      throw new Error("Second device not found");
    expect(updatedProjects[0].devices[1]).toStrictEqual(newDevice2);
  });
});

describe("deleteProjectsDevice", () => {
  it("should delete the provided device", () => {
    const newDevice2 = createFakeDevice(2);
    const updatedProjects = deleteProjectsDevice(fakeProjects, newDevice2.id);
    if (!updatedProjects[0]) throw new Error("First project not found");
    if (!Array.isArray(updatedProjects[0].devices))
      throw new Error("First project has no devices");
    if (!updatedProjects[0].devices[1])
      throw new Error("Second device not found");
    expect(updatedProjects[0].devices[1]).not.toStrictEqual(newDevice2);
  });
});

describe("addProjectsDevice", () => {
  it("should add the provided device", () => {
    const newDevice = createFakeDevice(4);
    const updatedProjects = addProjectsDevice(fakeProjects, newDevice);
    if (!updatedProjects[0]) throw new Error("First project not found");
    if (!Array.isArray(updatedProjects[0].devices))
      throw new Error("First project has no devices");
    if (!updatedProjects[0].devices[3])
      throw new Error("Second device not found");
    expect(updatedProjects[0].devices[3]).toStrictEqual({
      ...newDevice,
      id: 10000000,
    });
  });
});
