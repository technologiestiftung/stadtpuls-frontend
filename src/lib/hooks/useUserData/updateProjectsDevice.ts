import { DevicesType, ProjectsType } from "@common/types/supabase";

const updateDevices = (
  devices: DevicesType[],
  device: DevicesType
): DevicesType[] =>
  devices.reduce(
    (devicesAcc, currDevice) => [
      ...devicesAcc,
      currDevice.id === device.id ? device : currDevice,
    ],
    [] as DevicesType[]
  );

const removeDevice = (
  devices: DevicesType[],
  deviceId: DevicesType["id"]
): DevicesType[] => devices.filter(device => device.id !== deviceId);

export const updateProjectsDevice = (
  projects: ProjectsType[],
  device: DevicesType
): ProjectsType[] =>
  projects.reduce(
    (acc, project) => [
      ...acc,
      {
        ...project,
        devices: project.devices ? updateDevices(project.devices, device) : [],
      },
    ],
    [] as ProjectsType[]
  );

export const deleteProjectsDevice = (
  projects: ProjectsType[],
  deviceId: DevicesType["id"]
): ProjectsType[] =>
  projects.reduce(
    (acc, project) => [
      ...acc,
      {
        ...project,
        devices: project.devices ? removeDevice(project.devices, deviceId) : [],
      },
    ],
    [] as ProjectsType[]
  );

export const addProjectsDevice = (
  projects: ProjectsType[],
  device: Omit<DevicesType, "id">,
  projectId: ProjectsType["id"]
): ProjectsType[] =>
  projects.reduce(
    (acc, project) => [
      ...acc,
      {
        ...project,
        devices:
          project.devices && projectId === project.id
            ? [
                ...project.devices,
                {
                  ...device,
                  id: project.devices[project.devices.length - 1].id + 1,
                },
              ]
            : project.devices || [],
      },
    ],
    [] as ProjectsType[]
  );
