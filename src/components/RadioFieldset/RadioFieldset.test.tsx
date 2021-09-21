import { fireEvent, render, screen } from "@testing-library/react";
import { RadioFieldset } from ".";

describe("RadioFieldset component", () => {
  test("should cover unselected RadioFieldsets with a transparent div", () => {
    render(<RadioFieldset isSelected={false} label='Test' name='test' />);

    const coverDiv = document.querySelector(".absolute.bg-white");

    if (!coverDiv) throw "coverDiv not found";

    expect(coverDiv).toBeInTheDocument();
  });
  test("should not cover selected RadioFieldsets with a transparent div", () => {
    render(<RadioFieldset isSelected label='Test' name='test' />);

    const coverDiv = document.querySelector(".absolute.bg-white");
    expect(coverDiv).not.toBeInTheDocument();
  });
  test("should call onSelect on fieldset click", () => {
    const onSelect = jest.fn();
    render(
      <RadioFieldset
        isSelected={false}
        label='Test'
        name='test'
        onSelect={onSelect}
      />
    );

    const fieldset = screen.getByRole("group");

    fireEvent.click(fieldset);

    expect(onSelect).toHaveBeenCalledTimes(1);
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
  test("should have a fallback onSelect if none provided", () => {
    render(<RadioFieldset isSelected={false} label='Test' name='test' />);

    const radio = screen.getByRole("radio");

    fireEvent.click(radio);
  });
});
