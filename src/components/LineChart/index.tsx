/** @jsxRuntime classic */
/** @jsx jsx */
import { useCallback } from "react";
import { jsx, useThemeUI } from "theme-ui";
import { bisector, extent, max } from "d3-array";
import { Group } from "@visx/group";
import { scaleLinear, scaleUtc } from "@visx/scale";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { timeFormat } from "d3-time-format";
import { DateValueType, LineGraphType } from "@common/interfaces";
import { LinePath } from "../LinePath";

import { TooltipWithBounds, withTooltip, defaultStyles } from "@visx/tooltip";
import { WithTooltipProvidedProps } from "@visx/tooltip/lib/enhancers/withTooltip";
import { Bar, Line } from "@visx/shape";
import { localPoint } from "@visx/event";
import { GridRows } from "@visx/grid";

const getX = (d: DateValueType): Date => d.date;
const getY = (d: DateValueType): number => d.value;
// eslint-disable-next-line @typescript-eslint/unbound-method
const bisectDate = bisector<DateValueType, Date>(d => new Date(d.date)).left;
const formatDate = timeFormat("%d.%m.%Y - %H:%M:%S");

const tooltipStyles = {
  ...defaultStyles,
  border: "1px solid white",
  color: "white",
};

delete tooltipStyles.backgroundColor;
delete tooltipStyles.boxShadow;

export const LineChart = withTooltip<LineGraphType, DateValueType>(
  ({
    data,
    width,
    height,
    showTooltip,
    hideTooltip,
    tooltipData,
    tooltipTop = 0,
    tooltipLeft = 0,
  }: LineGraphType & WithTooltipProvidedProps<DateValueType>) => {
    if (width < 10) return null;

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
      domain: [0, (max(data, getY) as number) * 1.2],
      range: [graphHeight, 0],
    });

    const xAxis = {
      scale: xScale,
      values: data.map(el => el.date),
      // TODO: review how to switch to a 24 hour display
      tickFormat: (v: Date) => timeFormat("%H:%M")(v),
    };

    const yAxis = {
      scale: yScale,
      values: data.map(el => el.value),
    };

    const handleTooltip = useCallback(
      (
        event:
          | React.TouchEvent<SVGRectElement>
          | React.MouseEvent<SVGRectElement>
      ) => {
        const { x } = localPoint(event) || { x: 0 };
        const x0 = xScale.invert(x - paddingLeft);
        const index = bisectDate(data, x0, 1);
        const d0 = data[index - 1];
        const d1 = data[index];
        let d = d0;
        if (d1 && getX(d1)) {
          d =
            x0.valueOf() - getX(d0).valueOf() >
            getX(d1).valueOf() - x0.valueOf()
              ? d1
              : d0;
        }
        showTooltip({
          tooltipData: d,
          tooltipLeft: x,
          tooltipTop: yScale(getY(d)),
        });
      },
      [showTooltip, yScale, xScale, data, paddingLeft]
    );

    return (
      <div>
        <svg width={width} height={height} sx={{ overflow: "visible" }}>
          <rect
            sx={{
              fill: "background",
              width: graphWidth,
              height: graphHeight,
            }}
            x={paddingLeft}
          />
          <GridRows
            scale={yScale}
            width={graphWidth}
            left={paddingLeft}
            numTicks={4}
          />
          <AxisBottom
            scale={xAxis.scale}
            top={graphHeight}
            left={paddingLeft}
            stroke={
              theme.colors?.lightgrey
                ? String(theme.colors.lightgrey)
                : "inherit"
            }
            numTicks={8}
            tickStroke={
              theme.colors?.lightgrey
                ? String(theme.colors.lightgrey)
                : "inherit"
            }
          />
          <AxisLeft
            scale={yAxis.scale}
            left={paddingLeft}
            hideAxisLine={true}
            hideTicks={true}
            numTicks={4}
            tickStroke={
              theme.colors?.mediumgrey
                ? String(theme.colors.mediumgrey)
                : "inherit"
            }
          />
          {tooltipData && (
            <g>
              <Line
                className='stroke-current text-gray-400'
                from={{ x: tooltipLeft, y: 0 }}
                to={{ x: tooltipLeft, y: graphHeight + 0 }}
                strokeWidth={1}
                pointerEvents='none'
              />
              <circle
                cx={tooltipLeft}
                cy={tooltipTop + 1}
                r={4}
                className='stroke-current fill-current text-blue-500'
                fillOpacity={0.2}
                strokeOpacity={0.2}
                strokeWidth={2}
                pointerEvents='none'
              />
              <circle
                cx={tooltipLeft}
                cy={tooltipTop}
                className='fill-current text-blue-500'
                r={4}
                stroke='white'
                strokeWidth={2}
                pointerEvents='none'
              />
            </g>
          )}
          <Group left={paddingLeft}>
            <LinePath width={graphWidth} height={graphHeight} data={data} />
          </Group>
          <Bar
            x={paddingLeft}
            y={0}
            width={graphWidth}
            height={graphHeight}
            fill='transparent'
            rx={14}
            onTouchStart={handleTooltip}
            onTouchMove={handleTooltip}
            onMouseMove={handleTooltip}
            onMouseLeave={hideTooltip}
          />
        </svg>
        {tooltipData && (
          <div>
            <TooltipWithBounds
              key={Math.random()}
              top={tooltipTop - 12}
              left={tooltipLeft}
              style={tooltipStyles}
              className='bg-blue-500'
            >
              {`${getY(tooltipData)}`}
            </TooltipWithBounds>
            <TooltipWithBounds
              top={graphHeight - padding}
              left={tooltipLeft}
              offsetLeft={10}
              style={{
                position: "absolute",
                fontSize: "14px",
                minWidth: 72,
                textAlign: "center",
              }}
              className='text-blue-500'
            >
              {formatDate(getX(tooltipData))}
            </TooltipWithBounds>
          </div>
        )}
      </div>
    );
  }
);
