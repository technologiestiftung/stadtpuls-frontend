import { render, screen } from "@testing-library/react";
import { Button, Submit } from ".";

describe("Button component", () => {
  it("should have a button type", () => {
    render(<Button>Button</Button>);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button.getAttribute("type")).toBe("button");
  });
  it("should render its children", () => {
    render(<Button>Button</Button>);
    const button = screen.getByText("Button");
    expect(button).toBeInTheDocument();
  });
  it("should have basic styles", () => {
    render(<Button>Button</Button>);
    const button = screen.getByRole("button");
    expect(button.getAttribute("class")?.includes("transition")).toBe(true);
  });
  it("should have non disabled styles when not disabled", () => {
    render(<Button>Button</Button>);
    const button = screen.getByRole("button");
    expect(button.getAttribute("class")?.includes("cursor-pointer")).toBe(true);
  });
  it("should have disabled styles when disabled", () => {
    render(<Button disabled>Button</Button>);
    const button = screen.getByRole("button");
    expect(button.getAttribute("class")?.includes("cursor-default")).toBe(true);
  });
  it("should have outline styles when outline", () => {
    render(<Button outline>Button</Button>);
    const button = screen.getByRole("button");
    expect(button.getAttribute("class")?.includes("cursor-pointer")).toBe(true);
  });
});

describe("Submit component", () => {
  it("should have a submit type", () => {
    render(<Submit>Submit</Submit>);
    const submit = screen.getByText("Submit");
    expect(submit).toBeInTheDocument();
    expect(submit.getAttribute("type")).toBe("submit");
  });
  it("should render its children", () => {
    render(<Submit>Submit</Submit>);
    const submit = screen.getByText("Submit");
    expect(submit).toBeInTheDocument();
  });
  it("should have basic styles", () => {
    render(<Submit>Submit</Submit>);
    const submit = screen.getByText("Submit");
    expect(submit.getAttribute("class")?.includes("transition")).toBe(true);
  });
  it("should have non disabled styles when not disabled", () => {
    render(<Submit>Submit</Submit>);
    const submit = screen.getByText("Submit");
    expect(submit.getAttribute("class")?.includes("cursor-pointer")).toBe(true);
  });
  it("should have disabled styles when disabled", () => {
    render(<Submit disabled>Submit</Submit>);
    const submit = screen.getByText("Submit");
    expect(submit.getAttribute("class")?.includes("cursor-default")).toBe(true);
  });
});
