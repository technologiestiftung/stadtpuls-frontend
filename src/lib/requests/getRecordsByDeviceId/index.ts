import { RecordType } from "@common/interfaces";
import { FetchResponse } from "@common/types";
import { createV1ApiUrl } from "../createV1ApiUrl";

type RecordsResponse = FetchResponse<"records", RecordType[]>;
export async function getRecordsByDeviceId(
  id: string | number
): Promise<RecordType[]> {
  const url = createV1ApiUrl(`/devices/${id}/records`);
  const response = await fetch(url);
  if (!response.ok) {
    console.error(await response.text());
    throw new Error("Failed to fetch records");
  }
  const {
    data: { records },
  } = (await response.json()) as RecordsResponse;
  return records;
}
