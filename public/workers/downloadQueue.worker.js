const MAX_DOWNLOADABLE_RECORDS = 1000000;
const NEXT_PUBLIC_SUPABASE_MAX_ROWS = 30;
const NEXT_PUBLIC_SUPABASE_URL = ``;
const NEXT_PUBLIC_SUPABASE_PUBLIC_KEY = '';

const createCSVStructure = (input) => {
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

// eslint-disable-next-line no-undef
addEventListener("message", event => {
  getAllRecrodsBySensorId(event.data);
});

async function getAllRecrodsBySensorId(
  data,
  prevRecords = []
) {
  const { id, totalCount, options } = data;
  const max = Math.min(totalCount, MAX_DOWNLOADABLE_RECORDS);
  
  const url = new URL(`${NEXT_PUBLIC_SUPABASE_URL}/rest/v1/records`);
  
  const params = {
    select: '*',
    sensor_id: `eq.${id}`,
    order: `recorded_at.desc.nullslast`,
    limit: NEXT_PUBLIC_SUPABASE_MAX_ROWS,
    offset: prevRecords.length / NEXT_PUBLIC_SUPABASE_MAX_ROWS,
  };

  url.search = new URLSearchParams(params).toString();

  if (options && options.startDate && options.endDate) {
    url.search += `&recorded_at=gte.${options.startDate}&recorded_at=lte.${options.endDate}`;
  }

  // eslint-disable-next-line no-undef
  const headers = new Headers({
    'content-type': 'application/json',
    apikey: NEXT_PUBLIC_SUPABASE_PUBLIC_KEY,
    authorization: `Bearer ${NEXT_PUBLIC_SUPABASE_PUBLIC_KEY}`,
  });
  // eslint-disable-next-line no-undef
  const response = await fetch(url, { headers });
  const records = await response.json();

  if (!records)
    throw new Error(
      `No records found for sensor ID ${id} at range "${
        prevRecords.length
      },${prevRecords.length + NEXT_PUBLIC_SUPABASE_MAX_ROWS}"`
    );

  const aggregatedRecords = [...prevRecords, ...records];
  if (records.length < NEXT_PUBLIC_SUPABASE_MAX_ROWS || aggregatedRecords.length >= max) {
    // eslint-disable-next-line no-undef
    postMessage(Object.assign({}, data, { result: createCSVStructure(aggregatedRecords), progress: 100 }));
  }
  // eslint-disable-next-line no-undef
  postMessage(Object.assign({}, data, { progress: aggregatedRecords.length / totalCount * 100 }));
  return getAllRecrodsBySensorId(data, aggregatedRecords);
}
