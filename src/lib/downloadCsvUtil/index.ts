import { definitions } from "@technologiestiftung/stadtpuls-supabase-definitions";

export const createCSVStructure = (
  input: definitions["records"][] | undefined
): string => {
  let csv = "id,recorded_at,value\n";

  if (!input) return csv;

  input.forEach(record => {
    csv += `${record.id},${record.recorded_at},${record.measurements[0]},`;
    csv += "\n";
  });

  return csv;
};

export const downloadCSVString = (input: string, title?: string): void => {
  const hiddenElement = document.createElement("a");
  hiddenElement.href = `data:text/csv;charset=utf-8,${encodeURI(input)}`;
  hiddenElement.target = "_blank";
  hiddenElement.download = `${
    title ? title.toLowerCase().split(" ").join("_") : "data"
  }.csv`;
  hiddenElement.click();
  hiddenElement.remove();
};
