import React, { useState, useEffect } from "react";
import { RecordType } from "@common/interfaces";
import { createTimeOutput } from "@lib/dateUtil";
import { createCSVStructure, downloadCSV } from "@lib/downloadCsvUtil";
import colors from "../../style/colors";
import { Button } from "@components/Button";

interface DataTableRowType {
  id: string | number;
  value: string | number;
  recordedAt: string;
}
export interface DataTableType {
  data: DataTableRowType[];
  title: string | undefined;
}

export const DataTable: React.FC<DataTableType> = ({ data, title }) => {
  const [displayedData, setDisplayedData] = useState<DataTableRowType[]>([]);

  const [
    numberOfRecordsToDisplay,
    setNumberOfRecordsToDisplay,
  ] = useState<number>(500);

  useEffect(() => {
    if (!data) return;

    setDisplayedData(
      data
        .sort((a, b) => Date.parse(b.recordedAt) - Date.parse(a.recordedAt))
        .filter((_record, i: number) => i < numberOfRecordsToDisplay)
    );
  }, [data, numberOfRecordsToDisplay]);

  const handleDownload = (): void => {
    const CSVData = createCSVStructure(data as RecordType[]);
    downloadCSV(CSVData, title);
  };

  const handleLoadMore = (): void => {
    setNumberOfRecordsToDisplay(numberOfRecordsToDisplay + 500);
  };

  return (
    <div className='h-[500px] overflow-y-scroll'>
      <div
        className={[
          "grid grid-cols-[auto,max-content]",
          "bg-white",
          "p-3",
          "border-b border-gray-100",
          "sticky top-0",
        ].join(" ")}
      >
        <div>{title}</div>
        <div>
          <Button onClick={handleDownload}>Download</Button>
        </div>
      </div>
      <div
        className={["p-3", "flex flex-wrap justify-center", "bg-white"].join(
          " "
        )}
      >
        <table className='w-full p-2 border-collapse'>
          <thead>
            <tr className='text-gray-600'>
              <th
                className={["py-2 px-1", "font-normal", "text-left"].join(" ")}
              >
                Datum
              </th>
              <th
                className={["py-2 px-1", "font-normal", "text-left"].join(" ")}
              >
                Uhrzeit (UTC)
              </th>
              <th
                className={["py-2 px-1", "font-normal", "text-right"].join(" ")}
              >
                Wert
              </th>
            </tr>
          </thead>
          <tbody>
            {displayedData.map((record: DataTableRowType, i: number) => {
              return (
                <tr
                  key={record.id}
                  style={{
                    backgroundColor: `${
                      i % 2 === 0 ? colors.gray["50"] : colors.white
                    }`,
                  }}
                >
                  <td className='p-2 border-none'>
                    {new Date(record.recordedAt).toLocaleDateString()}
                  </td>
                  <td className='p-2 border-none'>
                    {createTimeOutput(new Date(record.recordedAt))}
                  </td>
                  <td className='p-2 border-none text-right'>{record.value}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {data && data.length > numberOfRecordsToDisplay && (
          <button className='mt-3' onClick={handleLoadMore}>
            Mehr anzeigen
          </button>
        )}
      </div>
    </div>
  );
};
