import { fireEvent, render, screen } from "@testing-library/react";
import { DatetimeRangePicker } from ".";

describe("DatetimeRangePicker component", () => {
  test("should work as expected", () => {
    render(
      <DatetimeRangePicker
        startDateTimeString='2021-08-11T10:19:43.000Z'
        endDateTimeString='2021-08-11T19:24:56.000Z'
        onDatetimeRangeChange={jest.fn()}
      />
    );
    const [datePicker1, timePicker1, datePicker2, timePicker2] =
      screen.getAllByRole("textbox");
    expect(datePicker1).toBeInTheDocument();
    expect(timePicker1).toBeInTheDocument();
    expect(datePicker2).toBeInTheDocument();
    expect(timePicker2).toBeInTheDocument();

    fireEvent.focus(datePicker1);
    const firstDay = document.querySelector(
      '.DayPicker-Day[aria-disabled="false"]'
    );
    if (!firstDay) throw "'firstDay' element was not found";

    fireEvent.click(firstDay);
    expect(document.activeElement === timePicker1).toBe(true);
    fireEvent.change(timePicker1, { target: { value: "12:24" } });

    fireEvent.focus(datePicker2);
    fireEvent.change(datePicker2, { target: { value: "24/12/2021" } });
    const secondDay = screen.getByLabelText("Fr. 24. Dez. 2021");
    expect(secondDay).toBeInTheDocument();

    fireEvent.click(secondDay);
    expect(document.activeElement === timePicker2).toBe(true);
    fireEvent.change(timePicker1, { target: { value: "23:00" } });
  });
});
