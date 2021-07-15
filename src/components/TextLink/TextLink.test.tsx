import { fireEvent, render, screen } from "@testing-library/react";
import { TextLink, ButtonTextLink } from ".";

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
  it("should have dangerous styles if dangerous variant", () => {
    render(
      <TextLink href='#' variant='dangerous'>
        Hi! I am a link
      </TextLink>
    );
    const link = screen.getByRole("link", { name: "Hi! I am a link" });
    fireEvent.click(link);
    expect(link).toBeInTheDocument();
    expect(link.getAttribute("class")?.includes("text-error")).toBe(true);
  });
  it("should have secondary styles if secondary variant", () => {
    render(
      <TextLink href='#' variant='secondary'>
        Hi! I am a link
      </TextLink>
    );
    const link = screen.getByRole("link", { name: "Hi! I am a link" });
    fireEvent.click(link);
    expect(link).toBeInTheDocument();
    expect(link.getAttribute("class")?.includes("text-gray-500")).toBe(true);
  });
});

describe("ButtonTextLink component", () => {
  it("should work like a normal button", () => {
    const handleClick = jest.fn();
    render(
      <ButtonTextLink onClick={handleClick}>Hi! I am a button</ButtonTextLink>
    );
    const buttton = screen.getByRole("button", { name: "Hi! I am a button" });
    fireEvent.click(buttton);
    expect(buttton).toBeInTheDocument();
    expect(handleClick).toHaveBeenCalled();
  });
  it("should have dangerous styles if dangerous variant", () => {
    render(
      <ButtonTextLink href='#' variant='dangerous'>
        Hi! I am a button
      </ButtonTextLink>
    );
    const button = screen.getByRole("button", { name: "Hi! I am a button" });
    fireEvent.click(button);
    expect(button).toBeInTheDocument();
    expect(button.getAttribute("class")?.includes("text-error")).toBe(true);
  });
  it("should have secondary styles if secondary variant", () => {
    render(
      <ButtonTextLink href='#' variant='secondary'>
        Hi! I am a button
      </ButtonTextLink>
    );
    const button = screen.getByRole("button", { name: "Hi! I am a button" });
    fireEvent.click(button);
    expect(button).toBeInTheDocument();
    expect(button.getAttribute("class")?.includes("text-gray-500")).toBe(true);
  });
});
