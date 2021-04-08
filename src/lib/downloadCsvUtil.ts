import { RecordType } from "../common/interfaces";

export const createCSVStructure = (input: RecordType[] | undefined): string => {
  let csv = "id,deviceId,recordedAt,value\n";

  if (!input) return csv;

  input.forEach((record: RecordType) => {
    csv += `${record.id},${record.deviceId || ""},${record.recordedAt},${
      record.value
    },`;
    csv += "\n";
  });

  return csv;
};

export const downloadCSV = (input: string, title: string | undefined): void => {
  const hiddenElement = document.createElement("a");
  hiddenElement.href = `data:text/csv;charset=utf-8,${encodeURI(input)}`;
  hiddenElement.target = "_blank";
  hiddenElement.download = `${
    title ? title.toLowerCase().split(" ").join("_") : "data"
  }.csv`;
  hiddenElement.click();
  hiddenElement.remove();
};

export const downloadMultiple = (
  input: RecordType[][],
  titles: string[]
): void => {
  input.forEach((records: RecordType[], i: number) => {
    const CSVData = createCSVStructure(records);
    downloadCSV(CSVData, titles[i]);
  });
};
