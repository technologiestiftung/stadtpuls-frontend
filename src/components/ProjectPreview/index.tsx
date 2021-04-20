/** @jsxRuntime classic */
/** @jsx jsx */
import { useEffect, useState, useRef, FC } from "react";
import Link from "next/link";
import { jsx, Box, Card, Heading, Text, Grid, Flex } from "theme-ui";
import { LinePath } from "@components/LinePath";
import { PublicProject } from "@lib/hooks/usePublicProjects";

export const ProjectPreview: FC<PublicProject> = ({
  id,
  name,
  location,
  description,
  records,
}) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const [svgWrapperWidth, setSvgWrapperWidth] = useState(0);
  const [svgWrapperHeight, setSvgWrapperHeight] = useState(0);

  const updateWidthAndHeight = (): void => {
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
                  {name}
                </Heading>
                <Heading as='h4' variant='h5' mt={1}>
                  {location}
                </Heading>
                <Text mt={3}>{description}</Text>
              </Box>
              <Flex
                ref={parentRef}
                mt={[4, 0, 0]}
                sx={{ alignItems: "center" }}
              >
                {records && (
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
                      //FIXME: Figure out how we want to handle multiple data points
                      data={records[0]}
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
