import { DevicesType, ProjectsType } from "@common/types/supabase";

let lastDeviceId = 10000000;

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
  device: Omit<DevicesType, "projectId">
): ProjectsType[] =>
  projects.reduce(
    (acc, project) => [
      ...acc,
      {
        ...project,
        devices: project.devices
          ? updateDevices(project.devices, device as DevicesType)
          : [],
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
  device: Omit<DevicesType, "id">
): ProjectsType[] =>
  projects.reduce(
    (acc, project) => [
      ...acc,
      {
        ...project,
        devices:
          project.devices && device.projectId === project.id
            ? [
                ...project.devices,
                {
                  ...device,
                  id: lastDeviceId++,
                },
              ]
            : project.devices || [],
      },
    ],
    [] as ProjectsType[]
  );
