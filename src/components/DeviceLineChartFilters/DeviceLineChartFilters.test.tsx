import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import moment from "moment";
import { FC } from "react";
import { DeviceLineChartFilters, DeviceLineChartFiltersPropType } from ".";

const TestComponent: FC<Partial<DeviceLineChartFiltersPropType>> = ({
  startDateTimeString = "2021-01-01T00:00:00.000Z",
  endDateTimeString = "2021-02-01T23:59:00.000Z",
  onDatetimeRangeChange = jest.fn(),
}) => {
  return (
    <DeviceLineChartFilters
      startDateTimeString={startDateTimeString}
      endDateTimeString={endDateTimeString}
      onDatetimeRangeChange={onDatetimeRangeChange}
    />
  );
};

describe("DeviceLineChartFilters", () => {
  test("should have a regular tabbing flow", () => {
    render(<TestComponent />);

    const [, group2] = screen.getAllByRole("group");
    const [todayB, weekB, monthB, allB] = screen.getAllByRole("button");
    const [date1, time1, date2, time2] = screen.getAllByRole("textbox");

    date1.focus();
    expect(date1).toHaveFocus();

    userEvent.tab();
    userEvent.tab();
    expect(time1).toHaveFocus();

    userEvent.tab();
    expect(date2).toHaveFocus();

    userEvent.tab();
    userEvent.tab();
    expect(time2).toHaveFocus();

    fireEvent.click(group2);

    userEvent.tab();
    expect(todayB).toHaveFocus();

    userEvent.tab();
    expect(weekB).toHaveFocus();

    userEvent.tab();
    expect(monthB).toHaveFocus();

    userEvent.tab();
    expect(allB).toHaveFocus();
  });
  test("should reduce opacity of inactive filedset", () => {
    render(<TestComponent />);

    const [group1, group2] = screen.getAllByRole("group");

    fireEvent.click(group2);

    const coverDiv1 = group1.querySelector(".opacity-50");
    if (!coverDiv1) throw "coverDiv was not found";
    expect(coverDiv1).toBeInTheDocument();

    fireEvent.click(group1);

    const coverDiv2 = group2.querySelector(".opacity-50");
    if (!coverDiv2) throw "coverDiv was not found";
    expect(coverDiv2).toBeInTheDocument();
  });
  test("should have no active button when inactive filedset", () => {
    render(<TestComponent />);

    const [group1, group2] = screen.getAllByRole("group");

    fireEvent.click(group2);

    expect(group1.querySelector("bg-primary")).not.toBeInTheDocument();

    const activeButton = group2.querySelector("bg-primary");
    expect(activeButton).toBeNull();
  });
  test("onDatetimeRangeChange should call handler", () => {
    const onDatetimeRangeChange = jest.fn();
    render(<TestComponent onDatetimeRangeChange={onDatetimeRangeChange} />);
    const [date1, time1, date2, time2] = screen.getAllByRole("textbox");

    fireEvent.change(date1, { target: { value: "01/02/2021" } });
    fireEvent.change(time1, { target: { value: "23:59" } });
    fireEvent.change(date2, { target: { value: "24/12/2021" } });
    fireEvent.change(time2, { target: { value: "00:01" } });

    expect(onDatetimeRangeChange).toHaveBeenLastCalledWith({
      startDateTimeString: moment("2021-02-01 23:59").toISOString(),
      endDateTimeString: moment("2021-12-24 00:01").toISOString(),
    });
  });
  test("onDatetimeRangeChange should call handler", () => {
    const onDatetimeRangeChange = jest.fn();
    render(<TestComponent onDatetimeRangeChange={onDatetimeRangeChange} />);
    const [todayB, weekB, monthB, yearB] = screen.getAllByRole("button");

    fireEvent.click(todayB);
    expect(onDatetimeRangeChange).toHaveBeenLastCalledWith({
      startDateTimeString: moment().startOf("day").toISOString(),
      endDateTimeString: moment().endOf("day").toISOString(),
    });

    fireEvent.click(weekB);
    expect(onDatetimeRangeChange).toHaveBeenLastCalledWith({
      startDateTimeString: moment().startOf("week").toISOString(),
      endDateTimeString: moment().endOf("week").toISOString(),
    });

    fireEvent.click(monthB);
    expect(onDatetimeRangeChange).toHaveBeenLastCalledWith({
      startDateTimeString: moment().startOf("month").toISOString(),
      endDateTimeString: moment().endOf("month").toISOString(),
    });

    fireEvent.click(yearB);
    expect(onDatetimeRangeChange).toHaveBeenLastCalledWith({
      startDateTimeString: undefined,
      endDateTimeString: undefined,
    });
  });
});
