import { fireEvent, render, screen } from "@testing-library/react";
import { TimeInput } from ".";

describe("TimeInput component", () => {
  test("should accept only time formatted values", () => {
    render(<TimeInput value='12:30' onChange={jest.fn()} />);
    const input = screen.getByRole("textbox") as HTMLInputElement;
    expect(input).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "I like to change" } });
    expect(input.value).toBe("12:30");
  });
  test("should call onChange handler when changed", () => {
    const onChangeHandler = jest.fn();
    render(<TimeInput value='12:30' onChange={onChangeHandler} />);
    const input = screen.getByRole("textbox") as HTMLInputElement;
    expect(input).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "14:33" } });
    expect(input.value).toBe("14:33");
    expect(onChangeHandler).toHaveBeenCalledWith("14:33");
  });
});
