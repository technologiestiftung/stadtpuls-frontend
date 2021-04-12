import { fireEvent, render, screen } from "@testing-library/react";
import { TextLink } from ".";

describe("TextLink component", () => {
  it("should work like a normal anchor", () => {
    const handleClick = jest.fn();
    render(
      <TextLink href='#' onClick={handleClick}>
        Hi! I am a link
      </TextLink>
    );
    const link = screen.getByText("Hi! I am a link");
    fireEvent.click(link);
    expect(link).toBeInTheDocument();
    expect(handleClick).toHaveBeenCalled();
  });
});
