import { definitions } from "@common/types/supabase";

const MAX_DOWNLOADABLE_RECORDS = 1e6;
const maxRows = parseInt(
  `${process.env.NEXT_PUBLIC_SUPABASE_MAX_ROWS || 30}`,
  10
);

const createCSVStructure = (input: definitions["records"][]): string => {
  let csv = "id,recorded_at,value\n";

  if (!input) return csv;

  input.forEach(record => {
    csv += `${record.id},${record.recorded_at || ""},${
      (record.measurements && record.measurements[0]) || ""
    }`;
    csv += "\n";
  });

  return csv;
};

interface QueueItemType {
  id: string;
  title: string;
  progress: number;
  totalCount: number;
  result?: string;
  options?: {
    startDate: string;
    endDate: string;
  };
  error?: Error;
  callback: (data: QueueItemType) => void;
}

const cancellationList: Record<string, boolean> = {};

// eslint-disable-next-line no-undef
self.addEventListener("message", event => {
  if (typeof event.data === "number" || typeof event.data === "string") {
    cancellationList[`${event.data}`] = true;
    return;
  }
  const data = event.data as QueueItemType;
  void getRecordsCount(data).then((totalCount: number) => {
    void getAllRecrodsBySensorId({ ...data, totalCount });
  });
});

// eslint-disable-next-line no-undef
const headers = new Headers({
  "content-type": "application/json",
  apikey: process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_KEY || "",
  authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_KEY || ""}`,
  prefer: "count=exact",
});

async function getRecordsCount(data: QueueItemType): Promise<number> {
  const { id, options } = data;

  const url = new URL(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL || ""}/rest/v1/records`
  );

  const params = { select: "*", sensor_id: `eq.${id}` };
  url.search = new URLSearchParams(params).toString();

  if (options && options.startDate && options.endDate) {
    url.search += `&recorded_at=gte.${options.startDate}&recorded_at=lte.${options.endDate}`;
  }

  // eslint-disable-next-line no-undef
  const response = await fetch(url.toString(), { method: "HEAD", headers });
  const count = parseInt(
    response.headers.get("content-range")?.split("/")[1] || `${maxRows}`,
    10
  );
  return count;
}

async function getAllRecrodsBySensorId(
  data: QueueItemType,
  iterationIndex = 0,
  prevRecords: definitions["records"][] = []
): Promise<QueueItemType | void> {
  const { id, totalCount, options } = data;
  const max = Math.min(totalCount, MAX_DOWNLOADABLE_RECORDS);

  if (cancellationList[id]) {
    delete cancellationList[id];
    return;
  }

  const url = new URL(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL || ""}/rest/v1/records`
  );

  const params = {
    select: "*",
    sensor_id: `eq.${id}`,
    order: `recorded_at.desc.nullslast`,
    limit: `${maxRows}`,
    offset: `${iterationIndex * maxRows}`,
  };

  url.search = new URLSearchParams(params).toString();

  if (options && options.startDate && options.endDate) {
    url.search += `&recorded_at=gte.${options.startDate}&recorded_at=lte.${options.endDate}`;
  }

  // eslint-disable-next-line no-undef
  const response = await fetch(url.toString(), { headers });
  const records = (await response.json()) as definitions["records"][];

  if (!records)
    throw new Error(
      `No records found for sensor ID ${id} at range "${prevRecords.length},${
        prevRecords.length + maxRows
      }"`
    );

  if (cancellationList[id]) {
    delete cancellationList[id];
    return;
  }

  const aggregatedRecords = [...prevRecords, ...records];
  if (
    aggregatedRecords.length >= totalCount ||
    aggregatedRecords.length >= max
  ) {
    self.postMessage(
      Object.assign({}, data, {
        result: createCSVStructure(aggregatedRecords),
        progress: 100,
      })
    );
    return;
  }
  self.postMessage(
    Object.assign({}, data, {
      progress: Math.ceil((aggregatedRecords.length / totalCount) * 100),
    })
  );
  return getAllRecrodsBySensorId(data, iterationIndex + 1, aggregatedRecords);
}

export {};
