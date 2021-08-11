import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FC, useState } from "react";
import { DeviceLineChartFilters, DeviceLineChartFiltersPropType } from ".";

const TestComponent: FC<Partial<DeviceLineChartFiltersPropType>> = ({
  activeFilterType = "devicesByAmount",
  onActiveFilterTypeChange = jest.fn(),
  temporalityOfRecords = "newest",
  onTemporalityOfRecordsChange = jest.fn(),
  numberOfRecordsToDisplay = 500,
  onNumberOfRecordsChange = jest.fn(),
  maxNumberOfRecordsToDisplay = 1000,
  startDatetimeString = "2021-12-01T00:00:00.000Z",
  endDatetimeString = "2021-12-01T00:00:00.000Z",
  onDatetimeRangeChange = jest.fn(),
}) => {
  const [internalActiveFilterType, setActiveFilterType] = useState<
    DeviceLineChartFiltersPropType["activeFilterType"]
  >(activeFilterType);
  const [
    internalNumberOfRecordsToDisplay,
    setInternalNumberOfRecordsToDisplay,
  ] = useState<DeviceLineChartFiltersPropType["numberOfRecordsToDisplay"]>(
    numberOfRecordsToDisplay
  );
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
      numberOfRecordsToDisplay={internalNumberOfRecordsToDisplay}
      onNumberOfRecordsChange={num => {
        setInternalNumberOfRecordsToDisplay(num);
        onNumberOfRecordsChange(num);
      }}
      maxNumberOfRecordsToDisplay={maxNumberOfRecordsToDisplay}
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
    const select = screen.getByRole("combobox");
    const numRecords = screen.getByRole("spinbutton");
    const [date1, time1, date2, time2] = screen.getAllByRole("textbox");

    radio1.focus();
    expect(radio1).toHaveFocus();

    userEvent.tab();
    expect(select).toHaveFocus();

    userEvent.tab();
    expect(numRecords).toHaveFocus();

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

    const select = screen.getByRole("combobox");

    fireEvent.change(select, { target: { value: "oldest" } });

    expect(onTemporalityOfRecordsChange).toHaveBeenCalledWith("oldest");
  });
  test("onNumberOfRecordsChange should call handler", () => {
    const onNumberOfRecordsChange = jest.fn();
    render(<TestComponent onNumberOfRecordsChange={onNumberOfRecordsChange} />);

    const select = screen.getByRole("spinbutton");

    fireEvent.change(select, { target: { value: 200 } });

    expect(onNumberOfRecordsChange).toHaveBeenCalledWith(200);
  });
  test("onNumberOfRecordsChange should call handler", () => {
    const onNumberOfRecordsChange = jest.fn();
    render(<TestComponent onNumberOfRecordsChange={onNumberOfRecordsChange} />);

    const select = screen.getByRole("spinbutton");

    fireEvent.change(select, { target: { value: 200 } });

    expect(onNumberOfRecordsChange).toHaveBeenCalledWith(200);
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
