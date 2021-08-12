import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FC, useState } from "react";
import { DeviceLineChartFilters, DeviceLineChartFiltersPropType } from ".";

const TestComponent: FC<Partial<DeviceLineChartFiltersPropType>> = ({
  activeFilterType = "devicesByAmount",
  onActiveFilterTypeChange = jest.fn(),
  temporalityOfRecords = "today",
  onTemporalityOfRecordsChange = jest.fn(),
  startDatetimeString = "2021-12-01T00:00:00.000Z",
  endDatetimeString = "2021-12-01T00:00:00.000Z",
  onDatetimeRangeChange = jest.fn(),
}) => {
  const [internalActiveFilterType, setActiveFilterType] = useState<
    DeviceLineChartFiltersPropType["activeFilterType"]
  >(activeFilterType);
  const [
    internalTemporalityOfRecords,
    setInternalTemporaityOfRecords,
  ] = useState<DeviceLineChartFiltersPropType["temporalityOfRecords"]>(
    temporalityOfRecords
  );
  const [currentDatetimeRange, setCurrentDatetimeRange] = useState<
    Pick<
      DeviceLineChartFiltersPropType,
      "startDatetimeString" | "endDatetimeString"
    >
  >({
    startDatetimeString,
    endDatetimeString,
  });
  return (
    <DeviceLineChartFilters
      activeFilterType={internalActiveFilterType}
      onActiveFilterTypeChange={filter => {
        setActiveFilterType(filter);
        onActiveFilterTypeChange(filter);
      }}
      temporalityOfRecords={internalTemporalityOfRecords}
      onTemporalityOfRecordsChange={temp => {
        setInternalTemporaityOfRecords(temp);
        onTemporalityOfRecordsChange(temp);
      }}
      startDatetimeString={currentDatetimeRange.startDatetimeString}
      endDatetimeString={currentDatetimeRange.endDatetimeString}
      onDatetimeRangeChange={dateTimeRange => {
        setCurrentDatetimeRange(dateTimeRange);
        onDatetimeRangeChange(dateTimeRange);
      }}
    />
  );
};

describe("DeviceLineChartFilters", () => {
  test("should have a regular tabbing flow", () => {
    render(<TestComponent />);

    const [radio1, radio2] = screen.getAllByRole("radio");
    const [todayB, weekB, monthB, allB] = screen.getAllByRole("button");
    const [date1, time1, date2, time2] = screen.getAllByRole("textbox");

    radio1.focus();
    expect(radio1).toHaveFocus();

    userEvent.tab();
    expect(todayB).toHaveFocus();

    userEvent.tab();
    expect(weekB).toHaveFocus();

    userEvent.tab();
    expect(monthB).toHaveFocus();

    userEvent.tab();
    expect(allB).toHaveFocus();

    userEvent.tab();
    expect(radio2).toHaveFocus();

    fireEvent.click(radio2);
    expect(radio2).toHaveFocus();

    userEvent.tab();
    expect(date1).toHaveFocus();

    userEvent.tab();
    userEvent.tab();
    expect(time1).toHaveFocus();

    userEvent.tab();
    expect(date2).toHaveFocus();

    userEvent.tab();
    userEvent.tab();
    expect(time2).toHaveFocus();
  });
  test("onActiveFilterTypeChange should call handler", () => {
    const onActiveFilterTypeChange = jest.fn();
    render(
      <TestComponent onActiveFilterTypeChange={onActiveFilterTypeChange} />
    );

    const [radio1, radio2] = screen.getAllByRole("radio");

    fireEvent.click(radio2);

    expect(onActiveFilterTypeChange).toHaveBeenCalledWith(
      "devicesByDatetimeRange"
    );

    fireEvent.click(radio1);

    expect(onActiveFilterTypeChange).toHaveBeenCalledWith("devicesByAmount");
  });
  test("onTemporalityOfRecordsChange should call handler", () => {
    const onTemporalityOfRecordsChange = jest.fn();
    render(
      <TestComponent
        onTemporalityOfRecordsChange={onTemporalityOfRecordsChange}
      />
    );

    const [todayB, weekB, monthB, allB] = screen.getAllByRole("button");

    fireEvent.click(weekB);

    expect(onTemporalityOfRecordsChange).toHaveBeenLastCalledWith("week");

    fireEvent.click(monthB);

    expect(onTemporalityOfRecordsChange).toHaveBeenLastCalledWith("month");

    fireEvent.click(allB);

    expect(onTemporalityOfRecordsChange).toHaveBeenLastCalledWith("all");

    fireEvent.click(todayB);

    expect(onTemporalityOfRecordsChange).toHaveBeenLastCalledWith("today");
  });
  test("onDatetimeRangeChange should call handler", () => {
    const onDatetimeRangeChange = jest.fn();
    render(<TestComponent onDatetimeRangeChange={onDatetimeRangeChange} />);
    const [date1, time1, date2, time2] = screen.getAllByRole("textbox");

    const offset = Math.round(new Date().getTimezoneOffset() / 60);

    fireEvent.change(date1, { target: { value: "01/02/2021" } });
    fireEvent.change(time1, { target: { value: "23:59" } });
    fireEvent.change(date2, { target: { value: "24/12/2021" } });
    fireEvent.change(time2, { target: { value: "00:01" } });

    expect(onDatetimeRangeChange).toHaveBeenLastCalledWith({
      startDatetimeString: `2021-02-01T${23 + offset}:59:00.000Z`,
      endDatetimeString: `2021-12-24T${0 + offset}:01:00.000Z`,
    });
  });
});
