import { render, screen } from "@testing-library/react";
import { Button, Submit, AnchorButton } from ".";

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
  it("should have default styles when default", () => {
    render(<Button>Button</Button>);
    const button = screen.getByRole("button");
    expect(button.getAttribute("class")?.includes("cursor-pointer")).toBe(true);
  });
  it("should have primary styles when primary", () => {
    render(<Button variant='primary'>Button</Button>);
    const button = screen.getByRole("button");
    expect(button.getAttribute("class")?.includes("bg-purple")).toBe(true);
  });
  it("should have dangerous styles when dangerous", () => {
    render(<Button variant='dangerous'>Button</Button>);
    const button = screen.getByRole("button");
    expect(button.getAttribute("class")?.includes("border-error")).toBe(true);
  });
  it("should have default disabled styles when default disabled", () => {
    render(<Button disabled>Button</Button>);
    const button = screen.getByRole("button");
    expect(button.getAttribute("class")?.includes("border-gray-400")).toBe(
      true
    );
  });
  it("should have primary disabled styles when primary disabled", () => {
    render(
      <Button variant='primary' disabled>
        Button
      </Button>
    );
    const button = screen.getByRole("button");
    expect(button.getAttribute("class")?.includes("bg-gray-200")).toBe(true);
  });
  it("should have dangerous disabled styles when dangerous disabled", () => {
    render(
      <Button variant='dangerous' disabled>
        Button
      </Button>
    );
    const button = screen.getByRole("button");
    expect(button.getAttribute("class")?.includes("border-error")).toBe(true);
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
  it("should have default styles when default", () => {
    render(<Submit>Submit</Submit>);
    const submit = screen.getByText("Submit");
    expect(submit.getAttribute("class")?.includes("cursor-pointer")).toBe(true);
  });
  it("should have primary styles when primary", () => {
    render(<Submit variant='primary'>Submit</Submit>);
    const submit = screen.getByText("Submit");
    expect(submit.getAttribute("class")?.includes("bg-purple")).toBe(true);
  });
  it("should have dangerous styles when dangerous", () => {
    render(<Submit variant='dangerous'>Submit</Submit>);
    const submit = screen.getByText("Submit");
    expect(submit.getAttribute("class")?.includes("border-error")).toBe(true);
  });
  it("should have default disabled styles when default disabled", () => {
    render(<Submit disabled>Submit</Submit>);
    const submit = screen.getByText("Submit");
    expect(submit.getAttribute("class")?.includes("cursor-default")).toBe(true);
  });
});

describe("Anchor component", () => {
  it("should render a link", () => {
    render(<AnchorButton href='/'>Some link</AnchorButton>);
    const anchor = screen.getByRole("link", { name: /Some link/g });
    expect(anchor).toBeInTheDocument();
  });
  it("should have basic styles", () => {
    render(<AnchorButton href='/'>Some link</AnchorButton>);
    const anchor = screen.getByRole("link", { name: /Some link/g });
    expect(anchor.getAttribute("class")?.includes("transition")).toBe(true);
  });
  it("should have default styles when default", () => {
    render(<AnchorButton href='/'>Some link</AnchorButton>);
    const anchor = screen.getByRole("link", { name: /Some link/g });
    expect(anchor.getAttribute("class")?.includes("cursor-pointer")).toBe(true);
  });
  it("should have primary styles when primary", () => {
    render(
      <AnchorButton variant='primary' href='/'>
        Some link
      </AnchorButton>
    );
    const anchor = screen.getByRole("link", { name: /Some link/g });
    expect(anchor.getAttribute("class")?.includes("bg-purple")).toBe(true);
  });
  it("should have open-in-new-tab attributes when provided", () => {
    render(
      <AnchorButton href='/' target='_blank' rel='noopener noreferrer'>
        Some link
      </AnchorButton>
    );
    const anchor = screen.getByRole("link", { name: /Some link/g });
    expect(anchor.getAttribute("target")).toBe("_blank");
    expect(anchor.getAttribute("rel")).toBe("noopener noreferrer");
  });
});
