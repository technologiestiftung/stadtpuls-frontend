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

// eslint-disable-next-line no-undef
self.addEventListener("message", event => {
  void getAllRecrodsBySensorId(event.data);
});

async function getAllRecrodsBySensorId(
  data: QueueItemType,
  prevRecords: definitions["records"][] = []
): Promise<QueueItemType> {
  const { id, totalCount, options } = data;
  const max = Math.min(totalCount, MAX_DOWNLOADABLE_RECORDS);

  const url = new URL(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL || ""}/rest/v1/records`
  );

  const params = {
    select: "*",
    sensor_id: `eq.${id}`,
    order: `recorded_at.desc.nullslast`,
    limit: `${maxRows}`,
    offset: `${prevRecords.length / maxRows}`,
  };

  url.search = new URLSearchParams(params).toString();

  if (options && options.startDate && options.endDate) {
    url.search += `&recorded_at=gte.${options.startDate}&recorded_at=lte.${options.endDate}`;
  }

  // eslint-disable-next-line no-undef
  const headers = new Headers({
    "content-type": "application/json",
    apikey: process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_KEY || "",
    authorization: `Bearer ${
      process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_KEY || ""
    }`,
  });
  // eslint-disable-next-line no-undef
  const response = await fetch(url.toString(), { headers });
  const records = (await response.json()) as definitions["records"][];

  if (!records)
    throw new Error(
      `No records found for sensor ID ${id} at range "${prevRecords.length},${
        prevRecords.length + maxRows
      }"`
    );

  const aggregatedRecords = [...prevRecords, ...records];
  if (records.length < maxRows || aggregatedRecords.length >= max) {
    self.postMessage(
      Object.assign({}, data, {
        result: createCSVStructure(aggregatedRecords),
        progress: 100,
      })
    );
  }
  self.postMessage(
    Object.assign({}, data, {
      progress: (aggregatedRecords.length / totalCount) * 100,
    })
  );
  return getAllRecrodsBySensorId(data, aggregatedRecords);
}

export {};
