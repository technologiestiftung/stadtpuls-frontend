/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState, useEffect } from "react";
import { jsx, Grid, Card, Box, Button } from "theme-ui";
import { IconButton } from "../IconButton";
import { RecordType, DataTableType } from "../../common/interfaces";
import { createTimeOutput } from "../../lib/utils";
import { createCSVStructure, downloadCSV } from "../../lib/download-handlers";
import { useStoreState } from "../../state/hooks";

const downloadIcon = "/images/download.svg";

export const DataTable: React.FC<DataTableType> = ({ data, title }) => {
  const recordsSegmentSize = useStoreState(state => state.records.segmentSize);

  const [displayedData, setDisplayedData] = useState<undefined | RecordType[]>(
    undefined
  );

  const [
    numberOfRecordsToDisplay,
    setNumberOfRecordsToDisplay,
  ] = useState<number>(recordsSegmentSize);

  useEffect(() => {
    if (!data) return;

    setDisplayedData(
      data
        .sort((a, b) => Date.parse(b.recordedAt) - Date.parse(a.recordedAt))
        .filter((_record, i: number) => i < numberOfRecordsToDisplay)
    );
  }, [data, numberOfRecordsToDisplay]);

  const handleDownload = (): void => {
    const CSVData = createCSVStructure(data);
    downloadCSV(CSVData, title);
  };

  const handleLoadMore = (): void => {
    setNumberOfRecordsToDisplay(numberOfRecordsToDisplay + recordsSegmentSize);
  };

  return (
    <Card mt={4} p={0} sx={{ height: "500px", overflowY: "scroll" }}>
      <Grid
        columns={["auto max-content"]}
        p={3}
        bg='background'
        sx={{
          borderBottom: theme => `1px solid ${theme.colors.lightgrey}`,
          position: "sticky",
          top: 0,
        }}
      >
        {title && <Box color='primary'>{title}</Box>}
        <Box>
          <IconButton
            value={"Download"}
            iconSource={downloadIcon}
            clickHandler={handleDownload}
          />
        </Box>
      </Grid>
      <Box
        p={3}
        sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        <table
          sx={{
            width: "100%",
            p: 2,
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr
              sx={{
                color: "mediumgrey",
                "& > th": {
                  py: 2,
                  px: 1,
                  fontWeight: "body",
                  borderBottom: theme => `1px solid ${theme.colors.lightgrey}`,
                },
              }}
            >
              <th sx={{ textAlign: "left" }}>Datum</th>
              <th sx={{ textAlign: "left" }}>Uhrzeit</th>
              <th sx={{ textAlign: "right" }}>Wert</th>
            </tr>
          </thead>
          <tbody>
            {displayedData &&
              displayedData.map((record: RecordType, i: number) => {
                return (
                  <tr
                    key={record.id}
                    sx={{
                      backgroundColor: () =>
                        `${i % 2 === 0 ? "muted" : "background"}`,
                      "& > td": {
                        p: 2,
                        border: "none",
                      },
                    }}
                  >
                    <td>{new Date(record.recordedAt).toLocaleDateString()}</td>
                    <td>{createTimeOutput(new Date(record.recordedAt))}</td>
                    <td sx={{ textAlign: "right" }}>{record.value}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {data && data.length > numberOfRecordsToDisplay && (
          <Button variant='text' mt={3} onClick={handleLoadMore}>
            Mehr anzeigen
          </Button>
        )}
      </Box>
    </Card>
  );
};
