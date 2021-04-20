import { DeviceType } from "@common/interfaces";
import { FetchResponse } from "@common/types";
import { createV1ApiUrl } from "@lib/requests/createV1ApiUrl";

type DeviceResponse = FetchResponse<"devices", DeviceType[]>;
export async function getDevicesByProjectId(
  id: string | number
): Promise<DeviceType[]> {
  const url = createV1ApiUrl(`/projects/${id}/devices`);
  const response = await fetch(url);
  if (!response.ok) {
    console.error(await response.text());
    throw new Error("Failed to fetch device");
  }
  const {
    data: { devices },
  } = (await response.json()) as DeviceResponse;
  return devices;
}
