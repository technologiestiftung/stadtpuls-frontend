import { fireEvent, render, screen } from "@testing-library/react";
import { RadioFieldset } from ".";

describe("RadioFieldset component", () => {
  test("should cover unselected RadioFieldsets with a button", () => {
    render(<RadioFieldset isSelected={false} label='Test' name='test' />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });
  test("should not cover selected RadioFieldsets with a button", () => {
    render(<RadioFieldset isSelected label='Test' name='test' />);

    const button = screen.queryByRole("button");
    expect(button).not.toBeInTheDocument();
  });
  test("should render a checked radio button", () => {
    render(<RadioFieldset isSelected label='Test' name='test' />);

    const radio = screen.queryByRole("radio");
    expect(radio).toBeInTheDocument();
    expect(radio?.getAttribute("checked")).toBeDefined();
  });
  test("should render a unchecked radio button", () => {
    render(<RadioFieldset isSelected={false} label='Test' name='test' />);

    const radio = screen.queryByRole("radio");
    expect(radio).toBeInTheDocument();
    expect(radio?.getAttribute("checked")).toBeNull();
  });
  test("should call onSelect on button click", () => {
    const onSelect = jest.fn();
    render(
      <RadioFieldset
        isSelected={false}
        label='Test'
        name='test'
        onSelect={onSelect}
      />
    );

    const button = screen.getByRole("button");

    fireEvent.click(button);

    expect(onSelect).toHaveBeenCalledTimes(1);
  });
  test("should call onSelect on radio click", () => {
    const onSelect = jest.fn();
    render(
      <RadioFieldset
        isSelected={false}
        label='Test'
        name='test'
        onSelect={onSelect}
      />
    );

    const radio = screen.getByRole("radio");

    fireEvent.click(radio);

    expect(onSelect).toHaveBeenCalledTimes(1);
  });
  test("should have a fallback onSelect if none provided", () => {
    render(<RadioFieldset isSelected={false} label='Test' name='test' />);

    const radio = screen.getByRole("radio");

    fireEvent.click(radio);
  });
});
