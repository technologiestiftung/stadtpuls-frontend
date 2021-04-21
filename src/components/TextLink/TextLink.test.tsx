import { fireEvent, render, screen } from "@testing-library/react";
import { TextLink, TextLinkButton } from ".";

describe("TextLink component", () => {
  it("should work like a normal anchor", () => {
    const handleClick = jest.fn();
    render(
      <TextLink href='#' onClick={handleClick}>
        Hi! I am a link
      </TextLink>
    );
    const link = screen.getByRole("link", { name: "Hi! I am a link" });
    fireEvent.click(link);
    expect(link).toBeInTheDocument();
    expect(handleClick).toHaveBeenCalled();
  });
});

describe("TextLinkButton component", () => {
  it("should work like a normal button", () => {
    const handleClick = jest.fn();
    render(
      <TextLinkButton onClick={handleClick}>Hi! I am a button</TextLinkButton>
    );
    const buttton = screen.getByRole("button", { name: "Hi! I am a button" });
    fireEvent.click(buttton);
    expect(buttton).toBeInTheDocument();
    expect(handleClick).toHaveBeenCalled();
  });
});
