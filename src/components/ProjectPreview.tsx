/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { jsx, Box, Card, Heading, Text, Grid, Flex } from "theme-ui";
import { ProjectType, DateValueType, RecordType } from "../common/interfaces";
import { LinePath } from "./visualization/LinePath";
import { getDevices, getRecords, API_VERSION } from "../lib/requests";
import { createDateValueArray } from "../lib/utils";
import { useStoreState } from "../state/hooks";

export const ProjectPreview: React.FC<ProjectType> = ({
  id,
  title,
  city,
  description,
}) => {
  const [dateValueArray, setDateValueArray] = useState<
    DateValueType[] | undefined
  >(undefined);

  const numberOfRecordsToDisplay = useStoreState(
    state => state.records.segmentSize
  );

  useEffect(() => {
    let isMounted = true;

    const fetchFirstDeviceRecords = async () => {
      const {
        data: { devices },
      } = await getDevices(
        `${process.env.NEXT_PUBLIC_API_URL}/api/${API_VERSION}/projects/${id}/devices`
      );

      if (devices.length < 1) return;

      const {
        data: { records },
      } = await getRecords(
        `${process.env.NEXT_PUBLIC_API_URL}/api/${API_VERSION}/devices/${devices[0].id}/records`
      );
      return records;
    };

    fetchFirstDeviceRecords()
      .then((result: undefined | RecordType[]) => {
        if (!result || !isMounted) return;

        const dataToDisplay =
          result.length > numberOfRecordsToDisplay
            ? result
                .sort(
                  (a, b) => Date.parse(b.recordedAt) - Date.parse(a.recordedAt)
                )
                .filter((_record, i: number) => i < numberOfRecordsToDisplay)
            : result;

        setDateValueArray(createDateValueArray(dataToDisplay));
      })
      .catch(error => console.error(error));

    return () => {
      isMounted = false;
    };
  }, [id, numberOfRecordsToDisplay]);

  const parentRef = useRef<HTMLDivElement>(null);
  const [svgWrapperWidth, setSvgWrapperWidth] = useState(0);
  const [svgWrapperHeight, setSvgWrapperHeight] = useState(0);

  const updateWidthAndHeight = () => {
    if (parentRef.current === null) return;
    setSvgWrapperWidth(parentRef.current.offsetWidth);
    setSvgWrapperHeight(parentRef.current.offsetWidth / 2);
  };

  useEffect(() => {
    if (parentRef.current === null) return;
    setSvgWrapperWidth(parentRef.current.offsetWidth);
    setSvgWrapperHeight(parentRef.current.offsetWidth / 2);

    window.addEventListener("resize", updateWidthAndHeight);

    return () => window.removeEventListener("resize", updateWidthAndHeight);
  }, []);

  return (
    <Box mt={4}>
      <Link href={`${id}`}>
        <a sx={{ textDecoration: "none", color: "text" }}>
          <Card
            sx={{
              transition: "all .2s ease-out",
              ":hover": {
                bg: "muted",
              },
            }}
          >
            <Grid gap={2} columns={[1, 2, 2]}>
              <Box>
                <Heading as='h3' variant='h3'>
                  {title}
                </Heading>
                <Heading as='h4' variant='h5' mt={1}>
                  {city}
                </Heading>
                <Text mt={3}>{description}</Text>
              </Box>
              <Flex
                ref={parentRef}
                mt={[4, 0, 0]}
                sx={{ alignItems: "center" }}
              >
                {dateValueArray && (
                  <svg
                    viewBox={`0 0  `}
                    xmlns='http://www.w3.org/2000/svg'
                    width={svgWrapperWidth}
                    height={svgWrapperHeight}
                    sx={{ overflow: "visible" }}
                  >
                    <LinePath
                      width={svgWrapperWidth}
                      height={svgWrapperHeight}
                      data={dateValueArray}
                    />
                  </svg>
                )}
              </Flex>
            </Grid>
          </Card>
        </a>
      </Link>
    </Box>
  );
};
