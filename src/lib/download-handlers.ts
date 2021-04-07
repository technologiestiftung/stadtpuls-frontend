import { RecordType } from "../common/interfaces";

export const createCSVStructure = (input: RecordType[] | undefined): string => {
  let csv = "id,deviceId,recordedAt,value\n";

  if (!input) return csv;

  input.forEach((record: RecordType) => {
    csv += `${record.id},${record.deviceId},${record.recordedAt},${record.value},`;
    csv += "\n";
  });

  return csv;
};

export const downloadCSV = (input: string, title: string | undefined): void => {
  let hiddenElement = document.createElement("a");
  hiddenElement.href = `data:text/csv;charset=utf-8,${encodeURI(input)}`;
  hiddenElement.target = "_blank";
  hiddenElement.download = `${
    // @ts-ignore replaceAll IS implemented in all modern browsers
    title ? title.toLowerCase().replaceAll(" ", "_") : "data"
  }.csv`;
  hiddenElement.click();
  hiddenElement.remove();
};

export const downloadMultiple = (input: RecordType[][], titles: string[]) => {
  input.forEach((records: RecordType[], i: number) => {
    const CSVData = createCSVStructure(records);
    downloadCSV(CSVData, titles[i]);
  });
};
