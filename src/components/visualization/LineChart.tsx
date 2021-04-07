/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, useThemeUI } from "theme-ui";
import { extent, max } from "d3-array";
import { Group } from "@visx/group";
import { scaleLinear, scaleUtc } from "@visx/scale";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { timeFormat } from "d3-time-format";
import { DateValueType, LineGraphType } from "../../common/interfaces";
import { LinePath } from "./LinePath";

const getX = (d: DateValueType) => d.date;
const getY = (d: DateValueType) => d.value;

export const LineChart = ({ width, height, data }: LineGraphType) => {
  const context = useThemeUI();
  const { theme } = context;

  const padding: number = theme.space ? Number(theme.space[4]) : 0;
  const paddingLeft: number = theme.space ? Number(theme.space[5]) : 0;

  const graphWidth: number = width - paddingLeft - padding;
  const graphHeight: number = height - padding;

  const xScale = scaleUtc<number>({
    domain: extent(data, getX) as [Date, Date],
    range: [0, graphWidth],
  });

  const yScale = scaleLinear<number>({
    domain: [0, max(data, getY) as number],
    range: [graphHeight, 0],
  });

  const xAxis = {
    scale: xScale,
    values: data.map((el) => el.date),
    // TODO: review how to switch to a 24 hour display
    tickFormat: (v: Date) => timeFormat("%H:%M")(v),
  };

  const yAxis = {
    scale: yScale,
    values: data.map((el) => el.value),
  };

  return (
    <svg width={width} height={height} sx={{ overflow: "visible" }}>
      <rect
        sx={{
          fill: "background",
          width: graphWidth,
          height: graphHeight,
        }}
        x={paddingLeft}
      />
      <AxisBottom
        scale={xAxis.scale}
        top={graphHeight}
        left={paddingLeft}
        hideAxisLine={true}
        numTicks={8}
        tickStroke={
          theme.colors?.mediumgrey ? `${theme.colors.mediumgrey}` : "inherit"
        }
      />
      <AxisLeft
        scale={yAxis.scale}
        left={paddingLeft}
        hideAxisLine={true}
        hideTicks={true}
        numTicks={4}
        tickStroke={
          theme.colors?.mediumgrey ? `${theme.colors.mediumgrey}` : "inherit"
        }
      />
      <Group left={paddingLeft}>
        <LinePath width={graphWidth} height={graphHeight} data={data} />
      </Group>
    </svg>
  );
};
