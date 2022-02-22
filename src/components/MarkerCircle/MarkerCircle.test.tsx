import { fireEvent, render, screen } from "@testing-library/react";
import { MarkerCircle } from ".";

describe("MarkerCircle component", () => {
  it("should call handlers when interacted with", () => {
    const clickHandler = jest.fn();
    const mouseEnterHandler = jest.fn();
    const mouseLeaveHandler = jest.fn();
    render(
      <MarkerCircle
        isActive
        clickHandler={clickHandler}
        mouseEnterHandler={mouseEnterHandler}
        mouseLeaveHandler={mouseLeaveHandler}
      >
        CHILD HERE
      </MarkerCircle>
    );
    const markerCircle = screen.getByText(/CHILD HERE/g);

    fireEvent.mouseEnter(markerCircle);
    fireEvent.click(markerCircle);
    fireEvent.mouseLeave(markerCircle);

    expect(clickHandler).toHaveBeenCalled();
    expect(mouseEnterHandler).toHaveBeenCalled();
    expect(mouseLeaveHandler).toHaveBeenCalled();
  });
  describe("Active color", () => {
    it("should be blue if active", () => {
      render(<MarkerCircle isActive={true}>CHILD HERE</MarkerCircle>);
      const bgBlue = document.getElementsByClassName("bg-blue");
      expect(bgBlue.length).toBe(1);
    });
    it("should be gray if not active", () => {
      render(<MarkerCircle isActive={false}>CHILD HERE</MarkerCircle>);
      const bgGray = document.getElementsByClassName("bg-gray-400");
      expect(bgGray.length).toBe(1);
    });
  });
  describe("Cursor style", () => {
    it("should have a default cursor if has no handler", () => {
      render(<MarkerCircle />);
      const defaultCursor = document.getElementsByClassName("cursor-default");
      const pointerCursor = document.getElementsByClassName("cursor-pointer");
      expect(defaultCursor.length).toBe(1);
      expect(pointerCursor.length).toBe(0);
    });
    it("should have a pointer cursor if has a click handler", () => {
      const clickHandler = jest.fn();

      render(<MarkerCircle clickHandler={clickHandler} />);
      const defaultCursor = document.getElementsByClassName("cursor-default");
      const pointerCursor = document.getElementsByClassName("cursor-pointer");
      expect(defaultCursor.length).toBe(0);
      expect(pointerCursor.length).toBe(1);
    });
    it("should have a pointer cursor if has a mouseEnter handler", () => {
      const mouseEnterHandler = jest.fn();

      render(<MarkerCircle mouseEnterHandler={mouseEnterHandler} />);
      const defaultCursor = document.getElementsByClassName("cursor-default");
      const pointerCursor = document.getElementsByClassName("cursor-pointer");
      expect(defaultCursor.length).toBe(0);
      expect(pointerCursor.length).toBe(1);
    });
    it("should have a pointer cursor if has a mouseLeave handler", () => {
      const mouseLeaveHandler = jest.fn();

      render(<MarkerCircle mouseLeaveHandler={mouseLeaveHandler} />);
      const defaultCursor = document.getElementsByClassName("cursor-default");
      const pointerCursor = document.getElementsByClassName("cursor-pointer");
      expect(defaultCursor.length).toBe(0);
      expect(pointerCursor.length).toBe(1);
    });
  });
  describe("Pulsating animation", () => {
    it("should include the pulsating div if isPulsating = true", () => {
      render(<MarkerCircle isPulsating={true} />);
      const pulsating = document.getElementsByClassName(
        "motion-safe:animate-ping"
      );
      expect(pulsating.length).toBe(1);
    });
    it("should not include the pulsating div if isPulsating = false", () => {
      render(<MarkerCircle isPulsating={false} />);
      const pulsating = document.getElementsByClassName(
        "motion-safe:animate-ping"
      );
      expect(pulsating.length).toBe(0);
    });
  });
});
