import { FC } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import useClickOutside from ".";

const createChildComponent =
  (clickOutsideHandler: () => void): FC =>
  () => {
    const ref = useClickOutside<HTMLDivElement>(clickOutsideHandler);
    return (
      <>
        <article ref={ref} />
        <button>Trigger outside</button>
      </>
    );
  };

describe("useClickOutside hook", () => {
  it("should call the callback when clicked outside", () => {
    const clickOutsideHandler = jest.fn();
    const Component = createChildComponent(clickOutsideHandler);
    render(<Component />);
    const outsideTrigger = screen.getByRole("button");
    fireEvent.click(outsideTrigger);
    expect(clickOutsideHandler).toHaveBeenCalledTimes(1);
  });
  it("should call the callback when touched outside", () => {
    const clickOutsideHandler = jest.fn();
    const Component = createChildComponent(clickOutsideHandler);
    Object.defineProperty(document.documentElement, "ontouchstart", {});
    render(<Component />);
    fireEvent.touchEnd(document);
    expect(clickOutsideHandler).toHaveBeenCalledTimes(1);
  });
  it("should not call the callback when clicked on the dropdown", () => {
    const clickOutsideHandler = jest.fn();
    const Component = createChildComponent(clickOutsideHandler);
    render(<Component />);
    const content = screen.getByRole("article");
    fireEvent.click(content);
    expect(clickOutsideHandler).not.toHaveBeenCalledTimes(1);
  });
});
