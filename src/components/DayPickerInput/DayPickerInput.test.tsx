import { fireEvent, render, screen } from "@testing-library/react";
import { DayPickerInput, formatDate } from ".";

describe("DayPickerInput", () => {
  test("should set date when input has valid date", () => {
    const initialValue = "01/01/2021";
    const targetValue = "24/12/2021";
    render(<DayPickerInput value={new Date(initialValue)} />);
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();

    fireEvent.change(input, { target: { value: targetValue } });
    fireEvent.focus(input);
    const day = screen.getByLabelText("Fr. 24. Dez. 2021");
    expect(day).toBeInTheDocument();
    expect(day.getAttribute("aria-selected")).toBe("true");
    expect((input as HTMLInputElement).value).toBe(targetValue);
  });
  test("should call onDayChange when input changes", () => {
    const initialValue = "01/01/2021";
    const targetValue = new Date("01/12/2021");
    const onDayChange = jest.fn();
    render(
      <DayPickerInput
        value={new Date(initialValue)}
        onDayChange={onDayChange}
      />
    );
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();

    fireEvent.change(input, {
      target: { value: formatDate(targetValue) },
    });
    expect(onDayChange).toHaveBeenCalledWith(targetValue);
  });
  test("should focus nextEl if defined after day click", () => {
    render(
      <>
        <DayPickerInput
          value={new Date("12/24/2021")}
          nextElSelector='#nextEl'
        />
        <input type='text' id='nextEl' data-testid='nextEl' />
      </>
    );
    const input = screen.getAllByRole("textbox")[0] as HTMLInputElement;
    expect(input).toBeInTheDocument();
    fireEvent.focus(input);
    const day = screen.getByLabelText("Fr. 24. Dez. 2021");
    expect(day).toBeInTheDocument();
    const nextEl = screen.getByTestId("nextEl");
    expect(nextEl).toBeInTheDocument();

    fireEvent.click(day);

    expect(document.activeElement === nextEl).toBe(true);
  });
  test("should not focus nextEl if not defined after day click", () => {
    render(
      <>
        <DayPickerInput value={new Date("12/24/2021")} />
        <input type='text' id='nextEl' data-testid='nextEl' />
      </>
    );
    const input = screen.getAllByRole("textbox")[0] as HTMLInputElement;
    expect(input).toBeInTheDocument();
    fireEvent.focus(input);
    const day = screen.getByLabelText("Fr. 24. Dez. 2021");
    expect(day).toBeInTheDocument();
    const nextEl = screen.getByTestId("nextEl");
    expect(nextEl).toBeInTheDocument();

    fireEvent.click(day);

    expect(document.activeElement !== nextEl).toBe(true);
  });
  test("should not focus nextEl if not found after day click", () => {
    render(
      <>
        <DayPickerInput
          value={new Date("12/24/2021")}
          nextElSelector='#unexistingEl'
        />
        <input type='text' id='nextEl' data-testid='nextEl' />
      </>
    );
    const input = screen.getAllByRole("textbox")[0] as HTMLInputElement;
    expect(input).toBeInTheDocument();
    fireEvent.focus(input);
    const day = screen.getByLabelText("Fr. 24. Dez. 2021");
    expect(day).toBeInTheDocument();
    const nextEl = screen.getByTestId("nextEl");
    expect(nextEl).toBeInTheDocument();

    fireEvent.click(day);

    expect(document.activeElement !== nextEl).toBe(true);
  });
});
